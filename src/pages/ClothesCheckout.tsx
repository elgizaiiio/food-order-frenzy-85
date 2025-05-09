
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, MapPin, CreditCard, Banknote, CheckCircle, Plus, Apple, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface Address {
  id: string;
  title: string;
  address: string;
  phone: string;
  isDefault?: boolean;
}

type PaymentMethod = 'cash' | 'card' | 'wallet' | 'applepay';

const ClothesCheckout: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    { 
      id: '1', 
      title: 'البيت', 
      address: 'شارع الملك فهد، حي الورود، الرياض',
      phone: '05xxxxxxxx',
      isDefault: true
    },
    { 
      id: '2', 
      title: 'الشغل', 
      address: 'برج المملكة، طريق الملك فهد، الرياض',
      phone: '05xxxxxxxx',
    }
  ]);
  
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    title: '',
    address: '',
    phone: ''
  });

  // بيانات ملخص الطلب
  const orderSummary = {
    items: [
      { id: 1, name: 'قميص شيك', quantity: 1, price: 150 },
      { id: 5, name: 'قميص كاجوال', quantity: 2, price: 140 }
    ],
    subtotal: 430, // 150 + (140 * 2)
    deliveryFee: 20,
    total: 450,
  };

  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as PaymentMethod);
  };

  const handleAddAddress = () => {
    // التحقق من صحة النموذج
    if (!newAddress.title || !newAddress.address || !newAddress.phone) {
      toast.error('لازم تملي كل الحقول المطلوبة');
      return;
    }

    // إضافة عنوان جديد
    const id = Date.now().toString();
    const address: Address = {
      id,
      title: newAddress.title || '',
      address: newAddress.address || '',
      phone: newAddress.phone || '',
    };

    setAddresses([...addresses, address]);
    setSelectedAddressId(id);
    setShowAddAddress(false);
    setNewAddress({ title: '', address: '', phone: '' });
    toast.success('العنوان اتضاف بنجاح');
  };

  const handleSubmitOrder = async () => {
    if (!selectedAddressId) {
      toast.error('لازم تختار عنوان التوصيل');
      return;
    }

    setLoading(true);
    
    // محاكاة طلب API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // إظهار رسالة نجاح
      toast.success('تم تقديم طلبك بنجاح! هنتصل بيك قريب عشان نأكد طلبك.', {
        duration: 5000
      });
      
      // الانتقال إلى صفحة التتبع أو النجاح
      navigate('/tracking');
    } catch (error) {
      toast.error('حصلت مشكلة أثناء معالجة طلبك. حاول تاني.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-32">
        {/* الهيدر */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-indigo-600 text-white sticky top-0 z-10 shadow-md">
          <Link to="/clothes/cart" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
          <div className="w-6"></div> {/* عنصر فارغ للمباعدة */}
        </div>

        {/* المحتوى الرئيسي */}
        <div className="p-4 space-y-6">
          {/* قسم عنوان التوصيل */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-800">عنوان التوصيل</h2>
            </div>

            {showAddAddress ? (
              <Card className="p-4 border-none shadow-sm bg-blue-50">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm text-blue-800">اسم العنوان</Label>
                    <Input
                      id="title"
                      placeholder="مثل: البيت، الشغل، ..."
                      value={newAddress.title}
                      onChange={e => setNewAddress({...newAddress, title: e.target.value})}
                      className="mt-1 border-blue-200 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-sm text-blue-800">العنوان التفصيلي</Label>
                    <Input
                      id="address"
                      placeholder="المنطقة، الشارع، رقم العمارة"
                      value={newAddress.address}
                      onChange={e => setNewAddress({...newAddress, address: e.target.value})}
                      className="mt-1 border-blue-200 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm text-blue-800">رقم الموبايل</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="01xxxxxxxx"
                      value={newAddress.phone}
                      onChange={e => setNewAddress({...newAddress, phone: e.target.value})}
                      className="mt-1 border-blue-200 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-blue-300 text-blue-700"
                      onClick={() => setShowAddAddress(false)}
                    >
                      إلغاء
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      onClick={handleAddAddress}
                    >
                      إضافة العنوان
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-3">
                <RadioGroup value={selectedAddressId} onValueChange={handleAddressSelect}>
                  {addresses.map((address) => (
                    <div key={address.id} className="relative">
                      <RadioGroupItem
                        value={address.id}
                        id={`address-${address.id}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`address-${address.id}`}
                        className="flex items-start space-x-4 space-x-reverse p-4 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Home className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="font-medium text-blue-800">{address.title}</div>
                            {selectedAddressId === address.id && (
                              <CheckCircle className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <div className="text-gray-500 text-sm mt-1">{address.address}</div>
                          <div className="text-gray-400 text-xs mt-1">{address.phone}</div>
                        </div>
                      </label>
                    </div>
                  ))}
                </RadioGroup>

                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 border-dashed border-blue-300 text-blue-700 hover:bg-blue-50"
                  onClick={() => setShowAddAddress(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة عنوان جديد</span>
                </Button>
              </div>
            )}
          </div>

          {/* قسم طريقة الدفع */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-800">طريقة الدفع</h2>
            </div>

            <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-3">
              <div className="relative">
                <RadioGroupItem 
                  value="cash" 
                  id="payment-cash" 
                  className="peer sr-only" 
                />
                <label
                  htmlFor="payment-cash"
                  className="flex items-center justify-between p-4 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">الدفع عند الاستلام</div>
                      <div className="text-gray-500 text-xs mt-1">ادفع كاش لما تستلم الطلب</div>
                    </div>
                  </div>
                  {paymentMethod === 'cash' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </label>
              </div>

              <div className="relative">
                <RadioGroupItem 
                  value="card" 
                  id="payment-card" 
                  className="peer sr-only" 
                />
                <label
                  htmlFor="payment-card"
                  className="flex items-center justify-between p-4 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">بطاقة ائتمانية</div>
                      <div className="text-gray-500 text-xs mt-1">فيزا، ماستر كارد، مدى</div>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </label>
              </div>

              <div className="relative">
                <RadioGroupItem 
                  value="wallet" 
                  id="payment-wallet" 
                  className="peer sr-only" 
                />
                <label
                  htmlFor="payment-wallet"
                  className="flex items-center justify-between p-4 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">المحفظة الإلكترونية</div>
                      <div className="text-gray-500 text-xs mt-1">دفع بإستخدام رصيدك في المحفظة</div>
                    </div>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  )}
                </label>
              </div>

              <div className="relative">
                <RadioGroupItem 
                  value="applepay" 
                  id="payment-applepay" 
                  className="peer sr-only" 
                />
                <label
                  htmlFor="payment-applepay"
                  className="flex items-center justify-between p-4 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white">
                      <Apple className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-blue-800">Apple Pay</div>
                      <div className="text-gray-500 text-xs mt-1">دفع بإستخدام Apple Pay</div>
                    </div>
                  </div>
                  {paymentMethod === 'applepay' && (
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  )}
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* ملخص الطلب */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-800">ملخص الطلب</h2>
            </div>

            <Card className="overflow-hidden border border-blue-100 shadow-sm">
              <div className="p-4 space-y-3">
                {orderSummary.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-blue-50">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500">× {item.quantity}</div>
                    </div>
                    <div className="font-medium text-blue-700">{item.price * item.quantity} ج.م</div>
                  </div>
                ))}
                
                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span>{orderSummary.subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span>{orderSummary.deliveryFee} ج.م</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-blue-100">
                    <span className="text-blue-800">إجمالي الطلب</span>
                    <span className="text-blue-700">{orderSummary.total} ج.م</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* زر إتمام الطلب العائم */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 max-w-md mx-auto shadow-lg">
        <Button 
          onClick={handleSubmitOrder} 
          disabled={loading || !selectedAddressId} 
          className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold shadow-lg"
          size="checkout"
        >
          {loading ? "جاري تنفيذ الطلب..." : `تأكيد الطلب • ${orderSummary.total} ج.م`}
        </Button>
      </div>
    </div>
  );
};

export default ClothesCheckout;
