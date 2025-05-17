
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, CreditCard, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useUserPaymentMethods, useSetDefaultPaymentMethod, useDeletePaymentMethod } from '@/hooks/useUserData';
import { PaymentMethod } from '@/services/userService';
import { useAuth } from '@/context/AuthContext';

const PaymentMethods: React.FC = () => {
  const { user } = useAuth();
  const { data: paymentMethods, isLoading, refetch } = useUserPaymentMethods();
  const setDefaultPaymentMethod = useSetDefaultPaymentMethod();
  const deletePaymentMethod = useDeletePaymentMethod();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDeleteCard = (id: string) => {
    setIsDeleting(id);
    deletePaymentMethod.mutate(id, {
      onSuccess: () => {
        toast.success("تم حذف البطاقة بنجاح");
        refetch();
      },
      onError: (error) => {
        console.error('Error deleting payment method:', error);
        toast.error("لم نتمكن من حذف البطاقة");
      },
      onSettled: () => {
        setIsDeleting(null);
      }
    });
  };

  const handleSetAsDefault = (id: string) => {
    setDefaultPaymentMethod.mutate(id, {
      onSuccess: () => {
        toast.success("تم تحديث البطاقة الافتراضية بنجاح");
        refetch();
      },
      onError: (error) => {
        console.error('Error setting default payment method:', error);
        toast.error("لم نتمكن من تحديث البطاقة الافتراضية");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center" dir="rtl">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">البطاقات المحفوظة</h1>
          <div className="w-6"></div>
        </div>

        {/* Add New Card Button */}
        <div className="px-4 py-6">
          <Link to="/add-payment-method">
            <Button className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600">
              <PlusCircle className="w-5 h-5" />
              إضافة بطاقة جديدة
            </Button>
          </Link>
        </div>

        {/* Cards List */}
        <div className="px-4 py-2 space-y-4">
          {paymentMethods && paymentMethods.length > 0 ? (
            paymentMethods.map((card) => (
              <Card key={card.id} className={`overflow-hidden ${card.isDefault ? 'bg-gradient-to-r from-brand-100 to-orange-50 border-brand-200' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-5 h-5 text-brand-600" />
                        <h3 className="font-medium">{card.type} •••• {card.last4}</h3>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        {card.isDefault && (
                          <span className="inline-block mt-2 text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                            البطاقة الافتراضية
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent dir="rtl">
                        <DialogHeader>
                          <DialogTitle>حذف البطاقة</DialogTitle>
                          <DialogDescription>
                            هل أنت متأكد من رغبتك في حذف هذه البطاقة؟
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => handleDeleteCard(card.id)}
                            disabled={isDeleting === card.id}
                          >
                            {isDeleting === card.id ? (
                              <>
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
                                جاري الحذف...
                              </>
                            ) : (
                              "نعم، حذف البطاقة"
                            )}
                          </Button>
                          <DialogClose asChild>
                            <Button variant="destructive">
                              إلغاء
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {!card.isDefault && (
                    <Button 
                      variant="ghost" 
                      className="mt-3 text-brand-600 hover:text-brand-700 hover:bg-brand-50 text-sm px-2 h-8"
                      onClick={() => handleSetAsDefault(card.id)}
                      disabled={setDefaultPaymentMethod.isPending}
                    >
                      {setDefaultPaymentMethod.isPending ? (
                        <>
                          <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></span>
                          جاري التحديث...
                        </>
                      ) : (
                        "تعيين كبطاقة افتراضية"
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <CreditCard className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <p>لا توجد بطاقات محفوظة حالياً</p>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="px-4 py-6">
          <p className="text-sm text-gray-500 text-center">
            جميع معلومات البطاقة مشفرة ومحمية وفقاً لأعلى معايير الأمان
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
