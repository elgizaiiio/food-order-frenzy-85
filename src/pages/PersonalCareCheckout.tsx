
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { CheckoutProvider, useCheckout } from '@/context/CheckoutContext';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';
import { submitOrder } from '@/api/checkout';

const PersonalCareCheckoutContent: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = usePersonalCareCart();
  const { selectedAddressId, addresses, paymentMethod, isAddingNewAddress, setIsAddingNewAddress } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  // رسوم التوصيل والإجمالي
  const deliveryFee = 15;
  const orderTotal = totalPrice + deliveryFee;

  // التأكد من اختيار عنوان
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  // تقديم الطلب
  const handleSubmitOrder = async () => {
    if (!selectedAddressId) {
      toast({
        title: "تحتاج إلى اختيار عنوان",
        description: "يرجى اختيار عنوان التوصيل قبل إتمام الطلب",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const result = await submitOrder({
        items: orderItems,
        addressId: selectedAddressId,
        paymentMethod,
        orderType: 'personal_care',
        total: orderTotal,
        phone: selectedAddress?.phone || ''
      });

      if (result.success) {
        clearCart();
        navigate('/personal-care/tracking', { 
          state: { 
            orderId: result.orderId,
            estimatedDelivery: '30-45 دقيقة'
          } 
        });
      } else {
        toast({
          title: "فشل تقديم الطلب",
          description: result.message || "حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى",
          variant: "destructive"
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ غير متوقع أثناء تقديم الطلب. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 pb-32">
      <div className="max-w-md mx-auto bg-white">
        {/* الهيدر */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm z-10 rounded-b-xl">
          <Link to="/personal-care/cart" className="text-white hover:text-pink-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">إتمام الطلب</h1>
          <div className="w-6"></div>
        </div>

        <div className="px-4 py-4">
          {isAddingNewAddress ? (
            <NewAddressForm onCancel={() => setIsAddingNewAddress(false)} />
          ) : (
            <>
              <div className="space-y-6">
                {/* قسم العنوان */}
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-pink-800">عنوان التوصيل</h2>
                  <AddressSelector onAddNewClick={() => setIsAddingNewAddress(true)} />
                </div>

                {/* قسم طريقة الدفع */}
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-pink-800">طريقة الدفع</h2>
                  <PaymentMethods />
                </div>

                {/* ملخص الطلب */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-pink-800">ملخص الطلب</h3>
                  <Card className="bg-pink-50 border border-pink-100">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-pink-700">المنتجات ({items.length})</span>
                          <span className="text-pink-800 font-medium">{totalPrice.toFixed(2)} ج.م</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-pink-700">رسوم التوصيل</span>
                          <span className="text-pink-800 font-medium">{deliveryFee.toFixed(2)} ج.م</span>
                        </div>
                        <div className="border-t border-pink-200 pt-2 mt-2 font-bold flex justify-between">
                          <span className="text-pink-800">المجموع</span>
                          <span className="text-pink-700">{orderTotal.toFixed(2)} ج.م</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* زر تأكيد الطلب العائم */}
      {!isAddingNewAddress && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-pink-100 p-4 z-50 max-w-md mx-auto">
          <Button 
            className="w-full py-3 px-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={handleSubmitOrder}
            disabled={isProcessing || !selectedAddressId}
          >
            {isProcessing ? "جاري تنفيذ الطلب..." : `تأكيد الطلب • ${orderTotal.toFixed(2)} ج.م`}
          </Button>
        </div>
      )}
    </div>
  );
};

const PersonalCareCheckout: React.FC = () => {
  const { totalPrice } = usePersonalCareCart();

  return (
    <CheckoutProvider initialSubtotal={totalPrice}>
      <PersonalCareCheckoutContent />
    </CheckoutProvider>
  );
};

export default PersonalCareCheckout;
