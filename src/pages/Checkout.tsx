
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import { useUserAddresses, useUserPaymentMethods } from '@/hooks/useUserData';
import PaymentMethods from '@/components/PaymentMethods';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import { submitOrder } from '@/api/checkout';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, clearCart } = useCart();
  const { data: addresses, isLoading: addressesLoading } = useUserAddresses();
  const { data: paymentMethods, isLoading: paymentsLoading } = useUserPaymentMethods();
  
  // State
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>('cash-default');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  
  // Calculations
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;
  
  // Set default address when addresses are loaded
  React.useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find(addr => addr.is_default);
      setSelectedAddressId(defaultAddress ? defaultAddress.id : addresses[0].id);
    }
  }, [addresses]);
  
  // Set default payment method when methods are loaded
  React.useEffect(() => {
    if (paymentMethods && paymentMethods.length > 0) {
      const defaultMethod = paymentMethods.find(method => method.is_default);
      setSelectedPaymentMethod(defaultMethod ? defaultMethod.id : paymentMethods[0].id);
    }
  }, [paymentMethods]);

  // Handle order submission
  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast({
        title: 'خطأ في الطلب',
        description: 'يرجى اختيار عنوان للتوصيل',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const orderItems = items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      
      const selectedAddress = addresses?.find(addr => addr.id === selectedAddressId);
      
      const result = await submitOrder({
        addressId: selectedAddressId,
        phone: selectedAddress?.phone_number || '',
        paymentMethod: selectedPaymentMethod || 'cash-default',
        items: orderItems,
        total,
        orderType: 'restaurant'
      });
      
      if (result.success) {
        clearCart();
        toast({
          title: 'تم تقديم الطلب بنجاح',
          description: `رقم الطلب: ${result.orderId}`,
        });
        navigate('/tracking', { state: { orderId: result.orderId } });
      } else {
        toast({
          title: 'خطأ في الطلب',
          description: result.message || 'حدث خطأ أثناء معالجة الطلب',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('خطأ في تقديم الطلب:', error);
      toast({
        title: 'خطأ غير متوقع',
        description: 'حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (addressesLoading || paymentsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 pb-24" dir="rtl">
      <div className="max-w-lg mx-auto bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
          <Link to="/cart" className="text-white hover:text-blue-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">إتمام الطلب</h1>
          <div className="w-6"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Address Section */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              عنوان التوصيل
            </h2>
            
            {isAddingAddress ? (
              <NewAddressForm onCancel={() => setIsAddingAddress(false)} />
            ) : (
              <Card className="p-4 border-blue-100">
                <AddressSelector
                  onAddNewClick={() => setIsAddingAddress(true)}
                  selectedAddressId={selectedAddressId}
                  onAddressSelect={setSelectedAddressId}
                />
              </Card>
            )}
          </div>

          {/* Payment Method Section */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              طريقة الدفع
            </h2>
            
            <Card className="p-4 border-blue-100">
              <PaymentMethods
                paymentMethods={paymentMethods}
                selectedPaymentMethod={selectedPaymentMethod}
                onPaymentMethodSelect={setSelectedPaymentMethod}
              />
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-blue-800">ملخص الطلب</h2>
            <Card className="p-4 border-blue-100">
              {/* Items */}
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={`${item.id}-${item.type}`} className="flex justify-between items-center py-2 border-b border-blue-100">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{(item.price * item.quantity).toFixed(2)} ج.م</span>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <span>إجمالي المنتجات</span>
                  <span>{subtotal.toFixed(2)} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم التوصيل</span>
                  <span>{deliveryFee.toFixed(2)} ج.م</span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2 font-bold flex justify-between">
                  <span>المجموع</span>
                  <span className="text-blue-700">{total.toFixed(2)} ج.م</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 max-w-lg mx-auto">
          <Button 
            onClick={handleCheckout} 
            disabled={!selectedAddressId || isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري إتمام الطلب...
              </span>
            ) : (
              `إتمام الطلب - ${total.toFixed(2)} ج.م`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
