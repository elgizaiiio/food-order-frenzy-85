
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { useCheckout } from '@/context/CheckoutContext';
import { submitOrder } from '@/api/checkout';

// محاكاة للمنتجات في سلة المشتريات
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

const CheckoutButton: React.FC = () => {
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
  
  return (
    <Button onClick={handleCheckout} disabled={isSubmitting} variant="gradient" size="checkout" className="w-full shadow-lg">
      {isSubmitting ? "جاري تأكيد الطلب..." : `تأكيد الطلب • ${orderTotal} ج.م`}
    </Button>
  );
};

export default CheckoutButton;
