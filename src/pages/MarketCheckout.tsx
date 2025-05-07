import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CreditCard, Phone, Wallet, DollarSign, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMarketCart, MarketCartProvider } from '@/context/MarketCartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckoutProvider, useCheckout } from '@/context/CheckoutContext';
import { submitOrder } from '@/api/checkout';
import { useToast } from '@/hooks/use-toast';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';

// مكون وقت التوصيل
const DeliveryTime = () => {
  const [deliveryTime] = useState({
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
    toast
  } = useToast();
  const {
    items,
    clearCart
  } = useMarketCart();
  const {
    selectedAddressId,
    paymentMethod,
    addresses
  } = useCheckout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 10;
  const orderTotal = totalPrice + deliveryFee;
  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار عنوان التوصيل",
        variant: "destructive"
      });
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
        items: items.map(item => ({
          id: item.id,
          quantity: item.quantity
        })),
        total: orderTotal
      };

      // إرسال الطلب إلى واجهة برمجة التطبيقات
      const response = await submitOrder(orderDetails);
      if (response.success) {
        // عرض رسالة نجاح
        toast({
          title: "تم تقديم طلبك بنجاح!",
          description: `رقم الطلب: ${response.orderId}`
        });

        // حفظ معلومات الطلب في sessionStorage لاستخدامها في صفحة التتبع
        sessionStorage.setItem('orderDetails', JSON.stringify({
          orderId: response.orderId,
          estimatedDelivery: response.estimatedDelivery
        }));

        // تفريغ السلة بعد الطلب الناجح
        clearCart();

        // الانتقال إلى صفحة تتبع الطلب
        navigate('/market/tracking');
      } else {
        toast({
          title: "حدث خطأ",
          description: response.message || "حدث خطأ أثناء تقديم طلبك. الرجاء المحاولة مرة أخرى.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.",
        variant: "destructive"
      });
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Button onClick={handleCheckout} className="w-full py-6 text-lg font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-lg" disabled={isSubmitting || items.length === 0}>
      {isSubmitting ? "جارٍ تأكيد الطلب..." : `تأكيد الطلب · ${orderTotal} ر.س`}
    </Button>;
};

// مكون ملخص الطلب
const OrderSummary = () => {
  const {
    items
  } = useMarketCart();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 10;
  const total = subtotal + deliveryFee;
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">ملخص الطلب</h3>
      </div>
      
      {/* عناصر السلة */}
      <div className="space-y-3">
        {items.map(item => <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 w-12 h-12 rounded-md flex items-center justify-center overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
            }} />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium">{(item.price * item.quantity).toFixed(2)} ر.س</p>
          </div>)}
      </div>
      
      {/* ملخص الأسعار */}
      <div className="space-y-2 pt-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">المجموع الفرعي</span>
          <span>{subtotal.toFixed(2)} ر.س</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">رسوم التوصيل</span>
          <span>{deliveryFee.toFixed(2)} ر.س</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
          <span>الإجمالي</span>
          <span className="text-brand-500">{total.toFixed(2)} ر.س</span>
        </div>
      </div>
    </div>;
};

// المكون الرئيسي لصفحة الدفع في السوبرماركت
const MarketCheckoutContent = () => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const {
    setIsAddingNewAddress
  } = useCheckout();
  const {
    items
  } = useMarketCart();
  const handleAddNewAddress = () => {
    setIsAddingAddress(true);
    setIsAddingNewAddress(true);
  };
  const handleCancelAddAddress = () => {
    setIsAddingAddress(false);
    setIsAddingNewAddress(false);
  };
  if (items.length === 0) {
    return <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-brand-100 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-brand-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">سلة التسوق فارغة</h2>
        <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
        <Link to="/market">
          <Button className="bg-brand-500 hover:bg-brand-600">
            تصفح المنتجات
          </Button>
        </Link>
      </div>;
  }
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
          <OrderSummary />
        </CardContent>
      </Card>
      
      {/* شريط الدفع السفلي الثابت */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-10 max-w-md mx-auto mb-16 my-[52px]">
        <CheckoutButton />
      </div>
    </div>;
};
const MarketCheckout: React.FC = () => {
  return <MarketCartProvider>
      <CheckoutProvider>
        <div className="min-h-screen bg-gray-50" dir="rtl">
          <div className="max-w-md mx-auto bg-white">
            {/* الرأس */}
            <div className="sticky top-0 bg-white border-b shadow-sm z-20">
              <div className="flex items-center justify-between p-4">
                <Link to="/market/cart" className="text-gray-700">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
                <div className="w-6"></div>
              </div>
            </div>

            {/* محتوى الصفحة */}
            <div className="p-4">
              <MarketCheckoutContent />
            </div>
          </div>
        </div>
      </CheckoutProvider>
    </MarketCartProvider>;
};
export default MarketCheckout;