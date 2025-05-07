
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { usePharmacyCart } from '@/context/PharmacyCartContext';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { CheckoutProvider } from '@/context/CheckoutContext';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';
import { submitPharmacyOrder } from '@/api/pharmacy';
import { Separator } from '@/components/ui/separator';

const PharmacyCheckout: React.FC = () => {
  const { items, totalPrice, clearCart } = usePharmacyCart();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const deliveryFee = 10;

  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      navigate('/pharmacy');
      toast.error("سلة التسوق فارغة");
    } else {
      console.log("Items in checkout:", items);
    }
  }, [items, navigate, isProcessing]);

  const handleCheckout = async (addressId: string, paymentMethod: string) => {
    if (items.length === 0) {
      toast.error("لا يمكن إتمام الطلب، السلة فارغة");
      navigate('/pharmacy');
      return;
    }

    setIsProcessing(true);

    try {
      const orderItems = items.map(item => ({ id: item.id, quantity: item.quantity }));
      
      const orderDetails = {
        items: orderItems,
        addressId,
        paymentMethod,
        phone: "05xxxxxxxx" // في التطبيق الحقيقي، هذا سيكون من معلومات المستخدم
      };

      const response = await submitPharmacyOrder(orderDetails);

      if (response.success) {
        clearCart();
        toast.success("تم إرسال طلبك بنجاح!");
        navigate('/pharmacy/tracking');
      } else {
        toast.error(response.message || "حدث خطأ أثناء معالجة طلبك");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("خطأ في عملية الدفع:", error);
      toast.error("حدث خطأ أثناء معالجة طلبك، يرجى المحاولة مرة أخرى");
      setIsProcessing(false);
    }
  };

  const CheckoutContent = () => {
    return (
      <div className="p-4 space-y-6">
        {isAddingAddress ? (
          <NewAddressForm onCancel={() => setIsAddingAddress(false)} />
        ) : (
          <>
            <AddressSelector onAddNewClick={() => setIsAddingAddress(true)} />
            
            <div className="mt-8">
              <PaymentMethods />
            </div>
            
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-500" />
                ملخص الطلب
              </h3>
              
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 h-6 w-6 rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.price * item.quantity} ريال</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-3" />
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium">{totalPrice} ريال</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">رسوم التوصيل</span>
                  <span className="font-medium">{deliveryFee} ريال</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2">
                  <span>المجموع</span>
                  <span>{totalPrice + deliveryFee} ريال</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <CheckoutProvider initialSubtotal={totalPrice}>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white pb-24">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
            <Link to="/pharmacy/cart" className="text-gray-700">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">إتمام الطلب</h1>
            <div className="w-6"></div>
          </div>

          <CheckoutContent />
          
          {/* Submit Order Button - Only show if not adding address and cart has items */}
          {!isAddingAddress && items.length > 0 && (
            <div className="fixed bottom-20 right-0 left-0 max-w-md mx-auto bg-white border-t p-4">
              <Button 
                onClick={() => {
                  const addressId = "1"; // في التطبيق الحقيقي، هذا سيكون من اختيار المستخدم
                  const paymentMethod = "cash"; // في التطبيق الحقيقي، هذا سيكون من اختيار المستخدم
                  handleCheckout(addressId, paymentMethod);
                }}
                disabled={isProcessing || items.length === 0}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-lg h-12"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    جاري المعالجة...
                  </span>
                ) : (
                  `تأكيد الطلب (${totalPrice + deliveryFee} ريال)`
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default PharmacyCheckout;
