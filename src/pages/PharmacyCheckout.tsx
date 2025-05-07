
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
        title: "خطأ في الطلب",
        description: "يرجى اختيار عنوان التوصيل",
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
          title: "خطأ في الطلب",
          description: result.message || "حدث خطأ أثناء معالجة الطلب",
          variant: "destructive"
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "خطأ في الطلب",
        description: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/pharmacy/cart" className="text-gray-700">
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
                {/* Address Section */}
                <AddressSelector onAddNewClick={() => setIsAddingNewAddress(true)} />

                {/* Payment Method Section */}
                <PaymentMethods />

                {/* Order Summary */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">ملخص الطلب</h3>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>المنتجات ({items.length})</span>
                          <span>{totalPrice.toFixed(2)} ج.م</span>
                        </div>
                        <div className="flex justify-between">
                          <span>رسوم التوصيل</span>
                          <span>{deliveryFee.toFixed(2)} ج.م</span>
                        </div>
                        <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                          <span>المجموع</span>
                          <span>{orderTotal.toFixed(2)} ج.م</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Submit Order Button */}
                <Button 
                  className="w-full bg-brand-500 hover:bg-brand-600 mb-16"
                  onClick={handleSubmitOrder}
                  disabled={isProcessing || !selectedAddressId}
                >
                  {isProcessing ? "جاري تنفيذ الطلب..." : "تأكيد الطلب"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Bottom fixed button container - Adding this to maintain consistency with other checkout pages */}
      {!isAddingNewAddress && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-10 max-w-md mx-auto mb-28">
          <Button 
            className="w-full bg-brand-500 hover:bg-brand-600"
            onClick={handleSubmitOrder}
            disabled={isProcessing || !selectedAddressId}
          >
            {isProcessing ? "جاري تنفيذ الطلب..." : "تأكيد الطلب"}
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
