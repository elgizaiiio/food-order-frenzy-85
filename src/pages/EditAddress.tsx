
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Briefcase, Building, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { firestore } from '@/integrations/firebase/client';

type AddressType = 'home' | 'work' | 'other';

interface AddressFormData {
  name: string;
  address: string;
  type: AddressType;
  details?: string;
  isDefault: boolean;
}

const EditAddress: React.FC = () => {
  const { addressId } = useParams<{ addressId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [addressExists, setAddressExists] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<AddressFormData>({
    defaultValues: {
      name: '',
      address: '',
      type: 'home',
      details: '',
      isDefault: false
    }
  });
  
  const selectedType = watch('type');
  const isDefault = watch('isDefault');

  useEffect(() => {
    const fetchAddress = async () => {
      if (!addressId || !user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const addressRef = doc(firestore, "addresses", addressId);
        const addressSnapshot = await getDoc(addressRef);

        if (addressSnapshot.exists()) {
          const addressData = addressSnapshot.data();
          
          // تحقق من أن العنوان ينتمي للمستخدم الحالي
          if (addressData.userId !== user.id) {
            toast.error("ليس لديك صلاحية لتعديل هذا العنوان");
            navigate('/addresses');
            return;
          }

          setAddressExists(true);
          setValue('name', addressData.name);
          setValue('address', addressData.address);
          setValue('type', addressData.type);
          setValue('details', addressData.details || '');
          setValue('isDefault', addressData.isDefault || false);
        } else {
          toast.error("لم يتم العثور على العنوان");
          navigate('/addresses');
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات العنوان:", error);
        toast.error("حدث خطأ أثناء جلب بيانات العنوان");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, [addressId, user?.id, navigate, setValue]);

  const onSubmit = async (data: AddressFormData) => {
    if (!addressId || !user?.id) {
      toast.error("معرف العنوان غير صالح");
      return;
    }

    try {
      const addressRef = doc(firestore, "addresses", addressId);
      await updateDoc(addressRef, {
        name: data.name,
        address: data.address,
        type: data.type,
        details: data.details || '',
        isDefault: data.isDefault,
        updatedAt: new Date()
      });

      toast.success("تم تحديث العنوان بنجاح");
      navigate('/addresses');
    } catch (error) {
      console.error("خطأ في تحديث العنوان:", error);
      toast.error("حدث خطأ أثناء تحديث العنوان");
    }
  };

  const handleDelete = async () => {
    if (!addressId || !user?.id) {
      toast.error("معرف العنوان غير صالح");
      return;
    }

    try {
      await deleteDoc(doc(firestore, "addresses", addressId));
      toast.success("تم حذف العنوان بنجاح");
      navigate('/addresses');
    } catch (error) {
      console.error("خطأ في حذف العنوان:", error);
      toast.error("حدث خطأ أثناء حذف العنوان");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!addressExists && !isLoading) {
    return null; // Navigate will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white z-10 shadow-md">
          <Link to="/addresses" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تعديل العنوان</h1>
          <div className="w-6"></div>
        </div>

        {/* Form */}
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">اسم العنوان</Label>
              <Input
                id="name"
                placeholder="المنزل، العمل، ..."
                {...register("name", {
                  required: "يرجى إدخال اسم للعنوان"
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>نوع العنوان</Label>
              <RadioGroup 
                value={selectedType} 
                onValueChange={(value: AddressType) => setValue('type', value)}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-full">
                    <RadioGroupItem value="home" id="home" className="peer sr-only" />
                    <Label
                      htmlFor="home"
                      className="flex flex-col items-center justify-center h-24 rounded-lg border-2 border-gray-200 p-2 hover:bg-gray-50 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50"
                    >
                      <Home className="mb-2 w-6 h-6 text-gray-600 peer-data-[state=checked]:text-brand-500" />
                      <span>المنزل</span>
                    </Label>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-full">
                    <RadioGroupItem value="work" id="work" className="peer sr-only" />
                    <Label
                      htmlFor="work"
                      className="flex flex-col items-center justify-center h-24 rounded-lg border-2 border-gray-200 p-2 hover:bg-gray-50 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50"
                    >
                      <Briefcase className="mb-2 w-6 h-6 text-gray-600 peer-data-[state=checked]:text-brand-500" />
                      <span>العمل</span>
                    </Label>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-full">
                    <RadioGroupItem value="other" id="other" className="peer sr-only" />
                    <Label
                      htmlFor="other"
                      className="flex flex-col items-center justify-center h-24 rounded-lg border-2 border-gray-200 p-2 hover:bg-gray-50 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50"
                    >
                      <Building className="mb-2 w-6 h-6 text-gray-600 peer-data-[state=checked]:text-brand-500" />
                      <span>آخر</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان التفصيلي</Label>
              <Input
                id="address"
                placeholder="الشارع، الحي، المدينة"
                {...register("address", {
                  required: "يرجى إدخال العنوان"
                })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">
                تفاصيل إضافية <span className="text-gray-500 text-sm">(اختياري)</span>
              </Label>
              <Input
                id="details"
                placeholder="رقم الشقة، الطابق، علامة مميزة..."
                {...register("details")}
              />
            </div>

            <div className="flex items-start space-x-2 space-x-reverse">
              <input
                type="checkbox" 
                id="isDefault"
                className="rounded border-gray-300 text-brand-500 shadow-sm focus:border-brand-500 focus:ring focus:ring-brand-200 focus:ring-opacity-50 mt-1"
                {...register("isDefault")} 
              />
              <Label htmlFor="isDefault" className="cursor-pointer mr-2">
                تعيين كعنوان افتراضي
              </Label>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-brand-500 hover:bg-brand-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </Button>
              
              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center gap-2 border-red-200 text-red-500 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4" />
                    <span>حذف</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>حذف العنوان</DialogTitle>
                    <DialogDescription>
                      هل أنت متأكد من رغبتك في حذف هذا العنوان؟ هذا الإجراء لا يمكن التراجع عنه.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-3 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDeleteDialog(false)}
                    >
                      إلغاء
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      حذف العنوان
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
