import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePharmacyCart } from '@/context/PharmacyCartContext';
import { CheckoutProvider, useCheckout } from '@/context/CheckoutContext';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';
import { submitPharmacyOrder } from '@/api/pharmacy';

// الواجهة الرئيسية للدفع
const PharmacyCheckoutContent: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = usePharmacyCart();
  const { selectedAddressId, addresses, paymentMethod, isAddingNewAddress, setIsAddingNewAddress, setPaymentMethod } = useCheckout();
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
        title: "فيه مشكلة في الطلب",
        description: "لازم تختار عنوان التوصيل الأول",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderItems = items.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      const result = await submitPharmacyOrder({
        items: orderItems,
        addressId: selectedAddressId,
        paymentMethod,
        phone: selectedAddress?.phone || ''
      });

      if (result.success) {
        clearCart();
        navigate('/pharmacy/tracking', { 
          state: { 
            orderId: result.orderId,
            estimatedDelivery: result.estimatedDelivery
          } 
        });
      } else {
        toast({
          title: "فيه مشكلة في الطلب",
          description: result.message || "حصل مشكلة أثناء تنفيذ الطلب",
          variant: "destructive"
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "فيه مشكلة في الطلب",
        description: "حصل مشكلة مش متوقعة. حاول تاني",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 pb-32">
      <div className="max-w-md mx-auto bg-white">
        {/* الهيدر */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-sm z-10 rounded-b-xl">
          <Link to="/pharmacy/cart" className="text-white hover:text-blue-100">
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
                  <h2 className="text-lg font-bold text-blue-800">عنوان التوصيل</h2>
                  <AddressSelector 
                    onAddNewClick={() => setIsAddingNewAddress(true)} 
                    selectedAddressId={selectedAddressId}
                    onAddressSelect={(id) => addresses.find(addr => addr.id === id)}
                  />
                </div>

                {/* قسم طريقة الدفع */}
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-blue-800">طريقة الدفع</h2>
                  <PaymentMethods 
                    selectedPaymentMethod={paymentMethod} 
                    onPaymentMethodSelect={setPaymentMethod} 
                  />
                </div>

                {/* ملخص الطلب */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-blue-800">ملخص الطلب</h3>
                  <Card className="bg-blue-50 border border-blue-100">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700">المنتجات ({items.length})</span>
                          <span className="text-blue-800 font-medium">{totalPrice.toFixed(2)} ج.م</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">رسوم التوصيل</span>
                          <span className="text-blue-800 font-medium">{deliveryFee.toFixed(2)} ج.م</span>
                        </div>
                        <div className="border-t border-blue-200 pt-2 mt-2 font-bold flex justify-between">
                          <span className="text-blue-800">المجموع</span>
                          <span className="text-blue-700">{orderTotal.toFixed(2)} ج.م</span>
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
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-blue-100 p-4 z-50 max-w-md mx-auto">
          <Button 
            variant="pharmacy"
            size="checkout" 
            className="w-full"
            onClick={handleSubmitOrder}
            disabled={isProcessing || !selectedAddressId}
          >
            {isProcessing ? "جاري تنفيذ الطلب..." : "تأكيد الطلب • " + orderTotal.toFixed(2) + " ج.م"}
          </Button>
        </div>
      )}
    </div>
  );
};

// مكون الغلاف لتوفير سياق الدفع
const PharmacyCheckout: React.FC = () => {
  const { totalPrice } = usePharmacyCart();

  return (
    <CheckoutProvider initialSubtotal={totalPrice}>
      <PharmacyCheckoutContent />
    </CheckoutProvider>
  );
};

export default PharmacyCheckout;
