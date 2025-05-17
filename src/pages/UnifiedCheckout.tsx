import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Clock, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';
import { submitOrder, getDeliveryEstimate } from '@/api/checkout';
import { useCart } from '@/context/CartContext';
import { useUserAddresses, useUserPaymentMethods } from '@/hooks/useUserData';
import { UserAddress } from '@/services/userService';

// مكون ملخص الطلب
const OrderSummary: React.FC<{
  subtotal: number;
  deliveryFee: number;
  orderTotal: number;
}> = ({ subtotal, deliveryFee, orderTotal }) => {
  return (
    <div className="space-y-2">
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
    </div>
  );
};

// مكون وقت التوصيل
const DeliveryTime: React.FC<{ orderType: string }> = ({ orderType }) => {
  const [deliveryTime, setDeliveryTime] = useState({
    min: 30,
    max: 45
  });
  
  // تحديث تقدير وقت التوصيل بناءً على نوع الطلب
  useEffect(() => {
    const updateEstimate = async () => {
      const estimate = await getDeliveryEstimate(orderType);
      const [min, max] = estimate.split(' - ')[0].split(' - ');
      setDeliveryTime({
        min: parseInt(min, 10),
        max: parseInt(max, 10)
      });
    };
    
    updateEstimate();
  }, [orderType]);
  
  return (
    <div className="space-y-2">
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
    </div>
  );
};

const UnifiedCheckout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get('type') || 'restaurant';
  const { items, getItemsByType, clearCartByType } = useCart();
  const { data: addresses, isLoading: addressesLoading } = useUserAddresses();
  const { data: paymentMethods, isLoading: paymentsLoading } = useUserPaymentMethods();
  
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // فلترة العناصر حسب نوع الطلب
  const cartItems = getItemsByType(orderType);
  
  // حساب المبالغ
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 15;
  const orderTotal = subtotal + deliveryFee;
  
  // تعيين القيم الافتراضية عند تحميل البيانات
  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find(addr => addr.is_default) || addresses[0];
      setSelectedAddressId(defaultAddress.id);
    }
    
    if (paymentMethods && paymentMethods.length > 0) {
      const defaultPayment = paymentMethods.find(pm => pm.is_default) || paymentMethods[0];
      setPaymentMethod(defaultPayment.id);
    }
  }, [addresses, paymentMethods]);
  
  // التأكد من وجود عناصر في السلة
  useEffect(() => {
    if (cartItems.length === 0 && !addressesLoading) {
      toast.error("سلة التسوق فارغة");
      navigate(`/cart`);
    }
  }, [cartItems, navigate, addressesLoading]);
  
  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);
  };
  
  const handlePaymentMethodSelect = (id: string) => {
    setPaymentMethod(id);
  };
  
  const handleAddNewAddress = () => {
    setIsAddingNewAddress(true);
  };
  
  const handleCancelAddAddress = () => {
    setIsAddingNewAddress(false);
  };
  
  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast.error("يجب اختيار عنوان للتوصيل");
      return;
    }
    
    if (!paymentMethod) {
      toast.error("يجب اختيار وسيلة دفع");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const selectedAddress = addresses?.find(addr => addr.id === selectedAddressId);
      
      if (!selectedAddress) {
        throw new Error("العنوان المحدد غير موجود");
      }
      
      // تحضير تفاصيل الطلب
      const orderDetails = {
        addressId: selectedAddressId,
        phone: selectedAddress.phone_number || '',
        paymentMethod: paymentMethod,
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: orderTotal,
        orderType: orderType as any,
        restaurantId: cartItems.length > 0 && cartItems[0].restaurant_id ? cartItems[0].restaurant_id : undefined
      };

      // إرسال الطلب
      const response = await submitOrder(orderDetails);
      
      if (response.success) {
        // مسح سلة التسوق بعد تقديم الطلب بنجاح
        clearCartByType(orderType);
        
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
      console.error("خطأ في تقديم الطلب:", error);
      toast.error("حصلت مشكلة غير متوقعة. حاول مرة تانية.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (addressesLoading || paymentsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-28">
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
        <div className="p-4 space-y-4">
          {/* قسم العناوين */}
          <Card className="border border-blue-100 shadow-sm">
            <CardContent className="p-4">
              {isAddingNewAddress ? (
                <NewAddressForm onCancel={handleCancelAddAddress} />
              ) : (
                <AddressSelector 
                  onAddNewClick={handleAddNewAddress}
                  addresses={addresses as UserAddress[]} 
                  selectedAddressId={selectedAddressId}
                  onAddressSelect={handleAddressSelect}
                />
              )}
            </CardContent>
          </Card>
          
          {/* قسم وقت التوصيل */}
          <Card className="border border-blue-100 shadow-sm">
            <CardContent className="p-4">
              <DeliveryTime orderType={orderType} />
            </CardContent>
          </Card>
          
          {/* قسم طرق الدفع */}
          <Card className="border border-blue-100 shadow-sm">
            <CardContent className="p-4">
              <PaymentMethods 
                paymentMethods={paymentMethods || []}
                selectedPaymentMethod={paymentMethod}
                onPaymentMethodSelect={handlePaymentMethodSelect}
              />
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
                  {cartItems.map(item => (
                    <div key={`${item.type}-${item.id}`} className="flex justify-between text-sm">
                      <span className="text-blue-800 font-medium">{item.name} × {item.quantity}</span>
                      <span className="text-blue-700 font-medium">{item.price * item.quantity} ج.م</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="bg-blue-100" />
                
                {/* ملخص الأسعار */}
                <OrderSummary 
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  orderTotal={orderTotal}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* شريط الدفع السفلي الثابت */}
          <div className="fixed bottom-16 left-0 right-0 shadow-lg border-t p-3 z-40 max-w-md mx-auto bg-white">
            <Button 
              onClick={handleCheckout} 
              disabled={isSubmitting} 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg"
            >
              {isSubmitting ? "جاري تأكيد الطلب..." : `تأكيد الطلب • ${orderTotal} ج.م`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedCheckout;
