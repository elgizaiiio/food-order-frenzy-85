import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CreditCard, Phone, Wallet, DollarSign, Apple, ShoppingBag } from 'lucide-react';
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
        <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
          <Clock className="w-5 h-5 text-blue-600" />
          وقت التوصيل المتوقع
        </h3>
      </div>

      <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100">
        <CardContent className="p-4">
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
        title: "فيه مشكلة",
        description: "لازم تختار عنوان التوصيل الأول",
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
          title: "حصلت مشكلة",
          description: response.message || "حصلت مشكلة أثناء تقديم طلبك. حاول مرة تانية",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "حصلت مشكلة",
        description: "حصل خطأ غير متوقع. حاول تاني",
        variant: "destructive"
      });
      console.error("Checkout error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Button onClick={handleCheckout} variant="gradient" size="checkout" className="w-full shadow-lg" disabled={isSubmitting || items.length === 0}>
      {isSubmitting ? "جاري تأكيد الطلب..." : `تأكيد الطلب • ${orderTotal.toFixed(2)} ج.م`}
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
        <h3 className="text-lg font-bold text-blue-800">ملخص الطلب</h3>
      </div>
      
      {/* عناصر السلة */}
      <div className="space-y-3">
        {items.map(item => <div key={item.id} className="flex justify-between items-center py-2 border-b border-blue-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 w-12 h-12 rounded-md flex items-center justify-center overflow-hidden border border-blue-100 shadow-sm">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=صورة+غير+متوفرة';
            }} />
              </div>
              <div>
                <p className="font-medium text-blue-900">{item.name}</p>
                <p className="text-sm text-gray-500">الكمية: <span className="text-blue-600 font-medium">{item.quantity}</span></p>
              </div>
            </div>
            <p className="font-medium text-blue-700">{(item.price * item.quantity).toFixed(2)} ج.م</p>
          </div>)}
      </div>
      
      {/* ملخص الأسعار */}
      <div className="space-y-2 pt-3 bg-blue-50 p-3 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">المجموع الفرعي</span>
          <span>{subtotal.toFixed(2)} ج.م</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">رسوم التوصيل</span>
          <span>{deliveryFee.toFixed(2)} ج.م</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-blue-200">
          <span>الإجمالي</span>
          <span className="text-blue-600">{total.toFixed(2)} ج.م</span>
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
        <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-blue-800">السلة فاضية</h2>
        <p className="text-gray-600 mb-6">لسه مضفتش أي منتجات للسلة</p>
        <Link to="/market">
          <Button variant="gradient" className="shadow-md">
            تصفح المنتجات
          </Button>
        </Link>
      </div>;
  }
  return <div className="space-y-6 pb-32">
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
    </div>;
};
const MarketCheckout: React.FC = () => {
  return <MarketCartProvider>
      <CheckoutProvider>
        <div className="min-h-screen bg-blue-50" dir="rtl">
          <div className="max-w-md mx-auto bg-white pb-32">
            {/* الرأس */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md z-20">
              <div className="flex items-center justify-between p-4">
                <Link to="/market/cart" className="text-white hover:text-blue-100">
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
        
        {/* زر تأكيد الطلب العائم */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-50 max-w-md mx-auto my-[240px]">
          <CheckoutButton />
        </div>
      </CheckoutProvider>
    </MarketCartProvider>;
};
export default MarketCheckout;