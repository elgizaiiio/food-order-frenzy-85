import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import { CheckoutProvider, useCheckout } from '@/context/CheckoutContext';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';
import { getDeliveryEstimate, submitOrder } from '@/api/checkout';

// العناصر في سلة المشتريات (كمحاكاة)
const cartItems = [{
  id: 1,
  name: "شاورما فراخ سبيشال",
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
  return <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">المجموع الفرعي</span>
        <span>{subtotal} ج.م</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">رسوم التوصيل</span>
        <span>{deliveryFee} ج.م</span>
      </div>
      <Separator className="my-2 bg-blue-200" />
      <div className="flex justify-between font-bold">
        <span>الإجمالي</span>
        <span className="text-blue-700">{orderTotal} ج.م</span>
      </div>
    </div>;
};

// مكون وقت التوصيل
const DeliveryTime = () => {
  const [deliveryTime, setDeliveryTime] = useState({
    min: 30,
    max: 45
  });
  return <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
          <Clock className="w-5 h-5 text-blue-600" />
          وقت التوصيل المتوقع
        </h3>
      </div>

      <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100">
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600">هيوصل في حوالي</p>
              <p className="text-lg font-bold text-blue-700">
                {deliveryTime.min} - {deliveryTime.max} دقيقة
              </p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full shadow-sm">
              <Clock className="w-6 h-6 text-blue-600" />
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
      toast.error("لازم تختار عنوان للتوصيل الأول");
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
        total: orderTotal,
        orderType: 'restaurant' as const
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
        toast.error(response.message || "حصلت مشكلة أثناء تقديم طلبك. حاول مرة تانية.");
      }
    } catch (error) {
      toast.error("حصلت مشكلة غير متوقعة. حاول مرة تانية.");
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Button onClick={handleCheckout} disabled={isSubmitting} variant="gradient" size="checkout" className="w-full shadow-lg">
      {isSubmitting ? "جاري تأكيد الطلب..." : `تأكيد الطلب • ${orderTotal} ج.م`}
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
  return <div className="space-y-4">
      {/* قسم العناوين */}
      <Card className="border border-blue-100 shadow-sm">
        <CardContent className="p-4">
          {isAddingAddress ? <NewAddressForm onCancel={handleCancelAddAddress} /> : <AddressSelector onAddNewClick={handleAddNewAddress} />}
        </CardContent>
      </Card>
      
      {/* قسم وقت التوصيل */}
      <Card className="border border-blue-100 shadow-sm">
        <CardContent className="p-4">
          <DeliveryTime />
        </CardContent>
      </Card>
      
      {/* قسم طرق الدفع */}
      <Card className="border border-blue-100 shadow-sm">
        <CardContent className="p-4">
          <PaymentMethods />
        </CardContent>
      </Card>
      
      {/* قسم ملخص الطلب */}
      <Card className="border border-blue-100 shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                ملخص الطلب
              </h3>
            </div>
            
            {/* عناصر السلة */}
            <div className="space-y-2">
              {cartItems.map(item => <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-blue-800 font-medium">{item.name} × {item.quantity}</span>
                  <span className="text-blue-700 font-medium">{item.price * item.quantity} ج.م</span>
                </div>)}
            </div>
            
            <Separator className="bg-blue-100" />
            
            {/* ملخص الأسعار */}
            <OrderSummary />
          </div>
        </CardContent>
      </Card>
    </div>;
};

const Checkout: React.FC = () => {
  return <CheckoutProvider>
      <div className="min-h-screen bg-blue-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white pb-24">
          {/* الرأس */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md z-20">
            <div className="flex items-center justify-between p-4">
              <Link to="/cart" className="text-white hover:text-blue-100">
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
        
        {/* شريط الدفع السفلي الثابت */}
        <div className="fixed bottom-16 left-0 right-0 shadow-lg border-t p-3 z-50 max-w-md mx-auto bg-white">
          <CheckoutButton />
        </div>
      </div>
    </CheckoutProvider>;
};

export default Checkout;
