import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Clock, Package, Truck, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { CheckoutProvider, useCheckout } from '@/context/CheckoutContext';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';
import { submitOrder } from '@/api/checkout';

const PersonalCareCheckoutContent: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = usePersonalCareCart();
  const { selectedAddressId, addresses, paymentMethod, isAddingNewAddress, setIsAddingNewAddress, setPaymentMethod } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  // رسوم التوصيل والإجمالي
  const deliveryFee = 15;
  const orderTotal = totalPrice + deliveryFee;

  // التأكد من اختيار عنوان
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  // مواعيد التوصيل
  const deliveryTimes = [
    { id: 1, time: 'أسرع وقت (30-45 دقيقة)', isDefault: true },
    { id: 2, time: 'خلال ساعة إلى ساعتين', isDefault: false },
    { id: 3, time: 'مساء اليوم (5-9 مساءً)', isDefault: false },
  ];

  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(deliveryTimes[0]);

  // تقديم الطلب
  const handleSubmitOrder = async () => {
    if (!selectedAddressId) {
      toast({
        title: "تحتاج إلى اختيار عنوان",
        description: "يرجى اختيار عنوان التوصيل قبل إتمام الطلب",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const result = await submitOrder({
        items: orderItems,
        addressId: selectedAddressId,
        paymentMethod,
        orderType: 'personal_care',
        total: orderTotal,
        phone: selectedAddress?.phone || ''
      });

      if (result.success) {
        clearCart();
        navigate('/personal-care/tracking', { 
          state: { 
            orderId: result.orderId,
            estimatedDelivery: '30-45 دقيقة'
          } 
        });
      } else {
        toast({
          title: "فشل تقديم الطلب",
          description: result.message || "حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى",
          variant: "destructive"
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ غير متوقع أثناء تقديم الطلب. يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pb-32">
      <div className="max-w-md mx-auto bg-white">
        {/* الهيدر */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md z-10 rounded-b-xl">
          <Link to="/personal-care/cart" className="text-white hover:text-pink-100">
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
                  <h2 className="text-lg font-bold text-pink-800 flex items-center">
                    <MapPin className="w-5 h-5 ml-2 text-pink-600" />
                    عنوان التوصيل
                  </h2>
                  <AddressSelector 
                    onAddNewClick={() => setIsAddingNewAddress(true)} 
                    selectedAddressId={selectedAddressId}
                    onAddressSelect={(id) => addresses.find(addr => addr.id === id)}
                  />
                </div>

                {/* وقت التوصيل */}
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-pink-800 flex items-center">
                    <Clock className="w-5 h-5 ml-2 text-pink-600" />
                    وقت التوصيل المفضل
                  </h2>
                  <Card className="border-pink-100">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-2">
                        {deliveryTimes.map(option => (
                          <div 
                            key={option.id}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedDeliveryTime.id === option.id
                                ? 'bg-pink-50 border border-pink-200'
                                : 'bg-white border border-gray-200 hover:bg-pink-50/50'
                            }`}
                            onClick={() => setSelectedDeliveryTime(option)}
                          >
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full border ${
                                selectedDeliveryTime.id === option.id
                                  ? 'border-pink-600'
                                  : 'border-gray-300'
                              } flex items-center justify-center mr-3`}>
                                {selectedDeliveryTime.id === option.id && (
                                  <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                                )}
                              </div>
                              <span className="text-sm">{option.time}</span>
                            </div>
                            {option.isDefault && (
                              <span className="text-xs text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">موصى به</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* قسم طريقة الدفع */}
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-pink-800 flex items-center">
                    <CreditCard className="w-5 h-5 ml-2 text-pink-600" />
                    طريقة الدفع
                  </h2>
                  <PaymentMethods 
                    selectedPaymentMethod={paymentMethod}
                    onPaymentMethodSelect={setPaymentMethod}
                  />
                </div>

                {/* ملخص الطلب */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-pink-800 flex items-center">
                    <Package className="w-5 h-5 ml-2 text-pink-600" />
                    ملخص الطلب
                  </h3>
                  <Card className="bg-gradient-to-br from-pink-50 to-white border border-pink-100">
                    <CardContent className="p-4">
                      {/* المنتجات */}
                      <div className="mb-4 space-y-2">
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="bg-pink-100 text-pink-800 w-6 h-6 rounded-full flex items-center justify-center text-xs ml-2">
                                {item.quantity}
                              </span>
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <span className="text-sm font-medium text-pink-700">
                              {(item.price * item.quantity).toFixed(2)} ج.م
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* ملخص الأسعار */}
                      <div className="space-y-2 text-sm border-t border-pink-200 pt-3 mt-2">
                        <div className="flex justify-between">
                          <span className="text-pink-700">المنتجات ({items.length})</span>
                          <span className="text-pink-800 font-medium">{totalPrice.toFixed(2)} ج.م</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-pink-700">رسوم التوصيل</span>
                          <span className="text-pink-800 font-medium">{deliveryFee.toFixed(2)} ج.م</span>
                        </div>
                        <div className="border-t border-pink-200 pt-2 mt-2 font-bold flex justify-between">
                          <span className="text-pink-800">المجموع</span>
                          <span className="text-pink-800 text-lg">{orderTotal.toFixed(2)} ج.م</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* معلومات التوصيل والشحن */}
                  <Card className="bg-blue-50 border border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-1">معلومات التوصيل</h4>
                          <p className="text-sm text-blue-700">سيتم التواصل معك فور الانتهاء من تجهيز طلبك لتأكيد وقت التوصيل.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* معلومات ا��ضمان */}
                  <Card className="bg-green-50 border border-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Shield className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800 mb-1">ضمان جودة المنتجات</h4>
                          <p className="text-sm text-green-700">جميع المنتجات أصلية ومضمونة وتشمل الضمان لمدة سنتين.</p>
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
        <div className="fixed bottom-16 left-0 right-0 bg-white shadow-lg border-t border-pink-100 p-4 z-50 max-w-md mx-auto">
          <Button 
            className="w-full py-3 px-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg"
            onClick={handleSubmitOrder}
            disabled={isProcessing || !selectedAddressId}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                <span>جاري تنفيذ الطلب...</span>
              </div>
            ) : (
              `تأكيد الطلب • ${orderTotal.toFixed(2)} ج.م`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

const PersonalCareCheckout: React.FC = () => {
  const { totalPrice } = usePersonalCareCart();

  return (
    <CheckoutProvider initialSubtotal={totalPrice}>
      <PersonalCareCheckoutContent />
    </CheckoutProvider>
  );
};

export default PersonalCareCheckout;
