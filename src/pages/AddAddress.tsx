
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Briefcase, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { firestore } from '@/integrations/firebase/client';

type AddressType = 'home' | 'work' | 'other';

interface AddressFormData {
  name: string;
  address: string;
  type: AddressType;
  details?: string;
}

const AddAddress: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch } = useForm<AddressFormData>({
    defaultValues: {
      name: '',
      address: '',
      type: 'home',
      details: ''
    }
  });
  
  const selectedType = watch('type');

  const onSubmit = async (data: AddressFormData) => {
    try {
      if (!user?.id) {
        toast.error("يجب تسجيل الدخول لإضافة عنوان");
        return;
      }

      // إضافة عنوان جديد إلى Firebase
      await addDoc(collection(firestore, "addresses"), {
        userId: user.id,
        name: data.name,
        address: data.address,
        type: data.type,
        details: data.details || '',
        isDefault: false,
        createdAt: serverTimestamp()
      });

      toast.success("تم إضافة العنوان بنجاح");
      navigate('/addresses');
    } catch (error) {
      console.error("خطأ في إضافة العنوان:", error);
      toast.error("حدث خطأ أثناء إضافة العنوان");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white z-10 shadow-md">
          <Link to="/addresses" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">إضافة عنوان جديد</h1>
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

            <Button 
              type="submit" 
              className="w-full bg-brand-500 hover:bg-brand-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ العنوان'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
