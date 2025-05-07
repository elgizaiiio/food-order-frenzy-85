
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { CheckoutProvider, useCheckout } from '@/context/CheckoutContext';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';
import { getDeliveryEstimate, submitOrder } from '@/api/checkout';

// العناصر في سلة المشتريات (كمحاكاة)
const cartItems = [{
  id: 1,
  name: "شاورما دجاج سبيشال",
  price: 25,
  quantity: 2
}, {
  id: 2,
  name: "سلطة الشيف",
  price: 15,
  quantity: 1
}];

// مكون ملخص الطلب
const OrderSummary = () => {
  const {
    subtotal,
    deliveryFee,
    orderTotal
  } = useCheckout();
  return <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">المجموع الفرعي</span>
        <span>{subtotal} ر.س</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">رسوم التوصيل</span>
        <span>{deliveryFee} ر.س</span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between font-bold">
        <span>الإجمالي</span>
        <span className="text-brand-600">{orderTotal} ر.س</span>
      </div>
    </div>;
};

// مكون وقت التوصيل
const DeliveryTime = () => {
  const [deliveryTime, setDeliveryTime] = useState({
    min: 30,
    max: 45
  });
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-500" />
          وقت التوصيل المتوقع
        </h3>
      </div>

      <Card className="overflow-hidden bg-gradient-to-r from-brand-50 to-white">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600">وقت الوصول المتوقع</p>
              <p className="text-lg font-bold text-brand-700">
                {deliveryTime.min} - {deliveryTime.max} دقيقة
              </p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-brand-100 rounded-full">
              <Clock className="w-6 h-6 text-brand-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};

// مكون زر تأكيد الطلب
const CheckoutButton = () => {
  const navigate = useNavigate();
  const {
    selectedAddressId,
    paymentMethod,
    addresses,
    orderTotal
  } = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast.error("الرجاء اختيار عنوان التوصيل");
      return;
    }
    setIsSubmitting(true);
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    try {
      // تحضير تفاصيل الطلب
      const orderDetails = {
        addressId: selectedAddressId,
        phone: selectedAddress?.phone || '',
        paymentMethod,
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity
        })),
        total: orderTotal
      };

      // إرسال الطلب إلى واجهة برمجة التطبيقات
      const response = await submitOrder(orderDetails);
      if (response.success) {
        // عرض رسالة نجاح
        toast.success("تم تقديم طلبك بنجاح!");

        // حفظ معلومات الطلب في sessionStorage لاستخدامها في صفحة التتبع
        sessionStorage.setItem('orderDetails', JSON.stringify({
          orderId: response.orderId,
          estimatedDelivery: response.estimatedDelivery
        }));

        // الانتقال إلى صفحة تتبع الطلب
        navigate(response.trackingUrl || '/tracking');
      } else {
        toast.error(response.message || "حدث خطأ أثناء تقديم طلبك. الرجاء المحاولة مرة أخرى.");
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.");
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Button onClick={handleCheckout} className="w-full py-6 text-lg font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-lg" disabled={isSubmitting}>
      {isSubmitting ? "جارٍ تأكيد الطلب..." : `تأكيد الطلب · ${orderTotal} ر.س`}
    </Button>;
};

// المكون الرئيسي لصفحة الدفع
const CheckoutContent = () => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const {
    setIsAddingNewAddress
  } = useCheckout();
  const handleAddNewAddress = () => {
    setIsAddingAddress(true);
    setIsAddingNewAddress(true);
  };
  const handleCancelAddAddress = () => {
    setIsAddingAddress(false);
    setIsAddingNewAddress(false);
  };
  return <div className="space-y-6 pb-24">
      {/* قسم العناوين */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-5">
          {isAddingAddress ? <NewAddressForm onCancel={handleCancelAddAddress} /> : <AddressSelector onAddNewClick={handleAddNewAddress} />}
        </CardContent>
      </Card>
      
      {/* قسم وقت التوصيل */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-5">
          <DeliveryTime />
        </CardContent>
      </Card>
      
      {/* قسم طرق الدفع */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-5">
          <PaymentMethods />
        </CardContent>
      </Card>
      
      {/* قسم ملخص الطلب */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-500" />
                ملخص الطلب
              </h3>
            </div>
            
            {/* عناصر السلة */}
            <div className="space-y-3 mb-4">
              {cartItems.map(item => <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{item.price * item.quantity} ر.س</span>
                </div>)}
            </div>
            
            <Separator />
            
            {/* ملخص الأسعار */}
            <OrderSummary />
          </div>
        </CardContent>
      </Card>
      
      {/* شريط الدفع السفلي الثابت */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-10 max-w-md mx-auto mb-20">
        <CheckoutButton />
      </div>
    </div>;
};
const Checkout: React.FC = () => {
  return <CheckoutProvider>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white">
          {/* الرأس */}
          <div className="sticky top-0 bg-white border-b shadow-sm z-20">
            <div className="flex items-center justify-between p-4">
              <Link to="/cart" className="text-gray-700">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
              <div className="w-6"></div>
            </div>
          </div>

          {/* محتوى الصفحة */}
          <div className="p-4">
            <CheckoutContent />
          </div>
        </div>
      </div>
    </CheckoutProvider>;
};
export default Checkout;
