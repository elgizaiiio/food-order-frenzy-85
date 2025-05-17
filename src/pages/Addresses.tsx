
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, MapPin, Home, Briefcase, Building, Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '@/integrations/firebase/client';
import { useAuth } from '@/context/AuthContext';

type AddressType = 'home' | 'work' | 'other';

interface Address {
  id: string;
  name: string;
  address: string;
  type: AddressType;
  details?: string;
  isDefault: boolean;
  userId: string;
}

const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      setAddresses([]);
      setLoading(false);
      return;
    }

    // استعلام عن العناوين الخاصة بالمستخدم الحالي
    const addressesRef = collection(firestore, "addresses");
    const q = query(addressesRef, where("userId", "==", user.id));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const addressesList: Address[] = [];
      querySnapshot.forEach((doc) => {
        addressesList.push({ id: doc.id, ...doc.data() } as Address);
      });
      
      // ترتيب العناوين بحيث يكون العنوان الافتراضي أولاً
      addressesList.sort((a, b) => {
        if (a.isDefault && !b.isDefault) return -1;
        if (!a.isDefault && b.isDefault) return 1;
        return 0;
      });
      
      setAddresses(addressesList);
      setLoading(false);
    }, (error) => {
      console.error("خطأ في جلب العناوين:", error);
      toast.error("حدث خطأ أثناء جلب العناوين");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.id]);

  const deleteAddress = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "addresses", id));
      toast.success("تم حذف العنوان بنجاح");
    } catch (error) {
      console.error("خطأ في حذف العنوان:", error);
      toast.error("حدث خطأ أثناء حذف العنوان");
    }
  };

  const setAsDefault = async (id: string) => {
    try {
      // تحديث جميع العناوين لتكون غير افتراضية
      const batch = [];
      for (const address of addresses) {
        if (address.isDefault) {
          batch.push(updateDoc(doc(firestore, "addresses", address.id), {
            isDefault: false
          }));
        }
      }
      await Promise.all(batch);
      
      // تعيين العنوان المحدد كعنوان افتراضي
      await updateDoc(doc(firestore, "addresses", id), {
        isDefault: true
      });
      
      toast.success("تم تعيين العنوان الافتراضي بنجاح");
    } catch (error) {
      console.error("خطأ في تعيين العنوان الافتراضي:", error);
      toast.error("حدث خطأ أثناء تعيين العنوان الافتراضي");
    }
  };

  const getAddressIcon = (type: AddressType) => {
    switch(type) {
      case 'home':
        return <Home className="w-5 h-5 text-brand-500" />;
      case 'work':
        return <Briefcase className="w-5 h-5 text-green-500" />;
      default:
        return <Building className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white z-10 shadow-md">
          <Link to="/profile" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">العناوين المحفوظة</h1>
          <div className="w-6"></div>
        </div>

        {/* Add New Address Button */}
        <div className="px-4 py-6">
          <Link to="/add-address">
            <Button className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white">
              <PlusCircle className="w-5 h-5" />
              أضف عنوان جديد
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
            <p className="mt-4 text-gray-600">جاري تحميل العناوين...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="p-3 rounded-full bg-gray-100">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mt-4 font-medium text-gray-900">لا توجد عناوين محفوظة</h3>
            <p className="mt-1 text-gray-500 max-w-xs">
              لم تقم بإضافة أي عنوان بعد. أضف عنوانًا جديدًا للاستفادة من خدمة التوصيل.
            </p>
          </div>
        )}

        {/* Addresses List */}
        {!loading && addresses.length > 0 && (
          <div className="px-4 py-2 space-y-4">
            {addresses.map((address) => (
              <Card key={address.id} className={`border ${address.isDefault ? 'border-brand-200 bg-brand-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                        {getAddressIcon(address.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{address.name}</h3>
                          {address.isDefault && (
                            <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                              الافتراضي
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{address.address}</p>
                        {address.details && (
                          <p className="text-xs text-gray-400 mt-1">{address.details}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/edit-address/${address.id}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                      </Link>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200">
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent dir="rtl">
                          <DialogHeader>
                            <DialogTitle>حذف العنوان</DialogTitle>
                            <DialogDescription>
                              هل أنت متأكد من رغبتك في حذف هذا العنوان؟
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button 
                              variant="outline" 
                              onClick={() => deleteAddress(address.id)}
                            >
                              نعم، حذف العنوان
                            </Button>
                            <DialogTrigger asChild>
                              <Button variant="destructive">
                                إلغاء
                              </Button>
                            </DialogTrigger>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {!address.isDefault && (
                    <Button 
                      variant="ghost" 
                      className="mt-2 text-brand-600 hover:text-brand-700 hover:bg-brand-50 text-sm px-2 h-8"
                      onClick={() => setAsDefault(address.id)}
                    >
                      تعيين كعنوان افتراضي
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Addresses;
