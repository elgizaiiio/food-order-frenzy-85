import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CreditCard, Phone, Apple, Wallet, DollarSign, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
type PaymentMethod = 'cash' | 'card' | 'wallet' | 'applepay';
const PersonalCareCheckout: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    totalPrice,
    clearCart
  } = usePersonalCareCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [saveCardInfo, setSaveCardInfo] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // نموذج إضافة عنوان جديد
  const newAddressForm = useForm({
    defaultValues: {
      title: "",
      phone: "",
      fullAddress: ""
    }
  });

  // محاكاة عناوين المستخدم
  const addresses = [{
    id: '1',
    title: 'المنزل',
    fullAddress: 'شارع الملك فهد، حي الورود، الرياض',
    phone: '05xxxxxxxx',
    isDefault: true
  }, {
    id: '2',
    title: 'العمل',
    fullAddress: 'برج المملكة، طريق الملك فهد، الرياض',
    phone: '05xxxxxxxx',
    isDefault: false
  }];

  // وقت التوصيل المتوقع
  const deliveryTime = {
    min: 30,
    max: 45
  };

  // رسوم التوصيل
  const deliveryFee = 15;
  const total = totalPrice + deliveryFee;

  // إضافة عنوان جديد
  const handleAddNewAddress = (data: any) => {
    console.log("تم إضافة عنوان جديد:", data);
    toast("تم إضافة العنوان بنجاح", {
      position: "top-center",
      className: "bg-blue-600 text-white border-blue-700"
    });
    setIsAddingNewAddress(false);
    // في التطبيق الحقيقي، سيتم إضافة العنوان إلى قاعدة البيانات
  };

  // إلغاء إضافة عنوان جديد
  const handleCancelAddAddress = () => {
    setIsAddingNewAddress(false);
    newAddressForm.reset();
  };

  // إرسال الطلب
  const handleSubmitOrder = () => {
    if (!selectedAddressId) {
      toast.error("الرجاء اختيار عنوان التوصيل");
      return;
    }
    setIsSubmitting(true);

    // محاكاة الاتصال بالخادم
    const interval = setInterval(() => {
      setLoadingProgress(oldProgress => {
        const newProgress = Math.min(oldProgress + 25, 100);
        if (newProgress === 100) {
          clearInterval(interval);

          // انتظر لحظة ثم انتقل إلى صفحة التتبع
          setTimeout(() => {
            toast.success("تم تقديم طلبك بنجاح!", {
              position: "top-center",
              className: "bg-blue-600 text-white border-blue-700"
            });
            clearCart();
            navigate('/personal-care/tracking');
          }, 500);
        }
        return newProgress;
      });
    }, 500);
  };
  return <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-28">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md sticky top-0 z-10">
          <Link to="/personal-care/cart" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
          <div className="w-6"></div> {/* Empty div for flex balance */}
        </div>

        <div className="p-4">
          {/* Address Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-800">
              <MapPin className="w-5 h-5 text-blue-600" />
              عنوان التوصيل
            </h2>

            {isAddingNewAddress ? <Card className="border-0 shadow-sm overflow-hidden border border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={handleCancelAddAddress} className="text-blue-500">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h3 className="text-md font-bold text-blue-800">إضافة عنوان جديد</h3>
                    <div className="w-5"></div>
                  </div>

                  <Form {...newAddressForm}>
                    <form onSubmit={newAddressForm.handleSubmit(handleAddNewAddress)} className="space-y-4">
                      <FormField control={newAddressForm.control} name="title" render={({
                    field
                  }) => <FormItem className="space-y-2">
                            <FormLabel className="text-blue-800">اسم العنوان (المنزل، العمل، ...)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="مثال: المنزل، العمل، ..." className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={newAddressForm.control} name="phone" render={({
                    field
                  }) => <FormItem className="space-y-2">
                            <FormLabel className="flex items-center gap-1 text-blue-800">
                              <Phone className="w-4 h-4 text-blue-600" />
                              رقم الهاتف
                            </FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" placeholder="05xxxxxxxx" className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" dir="ltr" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <FormField control={newAddressForm.control} name="fullAddress" render={({
                    field
                  }) => <FormItem className="space-y-2">
                            <FormLabel className="flex items-center gap-1 text-blue-800">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              العنوان التفصيلي
                            </FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="مثال: شارع الملك فهد، حي الورود، الرياض" className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />

                      <div className="pt-2 flex gap-3">
                        <Button type="button" variant="personalCareOutline" className="flex-1" onClick={handleCancelAddAddress}>
                          إلغاء
                        </Button>
                        <Button type="submit" variant="personalCare" className="flex-1">
                          حفظ العنوان
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card> : <Card className="border-0 shadow-sm overflow-hidden border border-blue-100">
                <CardContent className="p-4">
                  <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="space-y-3">
                    {addresses.map(address => <div key={address.id} className="relative">
                        <RadioGroupItem value={address.id} id={`address-${address.id}`} className="peer sr-only" />
                        <Label htmlFor={`address-${address.id}`} className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-blue-200 p-4 hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-blue-800">{address.title}</p>
                              <p className="text-sm text-gray-500">{address.fullAddress}</p>
                              <p className="text-xs mt-1 text-gray-400">{address.phone}</p>
                            </div>
                            {selectedAddressId === address.id && <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>}
                          </div>
                        </Label>
                      </div>)}
                  </RadioGroup>
                  
                  {/* Add New Address Button */}
                  <Button variant="personalCareOutline" onClick={() => setIsAddingNewAddress(true)} className="w-full mt-3 flex justify-center items-center gap-2 border-dashed h-14 hover:border-blue-400 hover:bg-blue-50">
                    <span className="text-2xl">+</span>
                    <span>إضافة عنوان جديد</span>
                  </Button>
                </CardContent>
              </Card>}
          </div>

          {/* Delivery Time Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-800">
              <Clock className="w-5 h-5 text-blue-600" />
              وقت التوصيل المتوقع
            </h2>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">وقت الوصول المتوقع</p>
                    <p className="text-lg font-bold text-blue-700">
                      {deliveryTime.min} - {deliveryTime.max} دقيقة
                    </p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm border border-blue-100">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-800">
              <CreditCard className="w-5 h-5 text-blue-600" />
              طريقة الدفع
            </h2>

            <Card className="border-0 shadow-sm border border-blue-100">
              <CardContent className="p-4">
                <RadioGroup value={selectedPayment} onValueChange={value => setSelectedPayment(value as PaymentMethod)} className="space-y-3">
                  {/* Cash on Delivery */}
                  <div className="relative">
                    <RadioGroupItem value="cash" id="payment-cash" className="peer sr-only" />
                    <Label htmlFor="payment-cash" className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-blue-200 p-4 hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full border border-blue-200 p-1.5 bg-white">
                            <DollarSign className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">الدفع عند الاستلام</p>
                            <p className="text-xs text-gray-500">ادفع نقدًا عند استلام طلبك</p>
                          </div>
                        </div>
                        {selectedPayment === 'cash' && <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>}
                      </div>
                    </Label>
                  </div>

                  {/* Credit Card */}
                  <div className="relative">
                    <RadioGroupItem value="card" id="payment-card" className="peer sr-only" />
                    <Label htmlFor="payment-card" className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-blue-200 p-4 hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full border border-blue-200 p-1.5 bg-white">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">بطاقة ائتمان / مدى</p>
                            <p className="text-xs text-gray-500">فيزا، ماستركارد، مدى</p>
                          </div>
                        </div>
                        {selectedPayment === 'card' && <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>}
                      </div>
                    </Label>
                  </div>

                  {/* Electronic Wallets */}
                  <div className="relative">
                    <RadioGroupItem value="wallet" id="payment-wallet" className="peer sr-only" />
                    <Label htmlFor="payment-wallet" className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-blue-200 p-4 hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full border border-blue-200 p-1.5 bg-white">
                            <Wallet className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">المحافظ الإلكترونية</p>
                            <p className="text-xs text-gray-500">STC Pay، Apple Pay، وغيرها</p>
                          </div>
                        </div>
                        {selectedPayment === 'wallet' && <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>}
                      </div>
                    </Label>
                  </div>

                  {/* Apple Pay */}
                  <div className="relative">
                    <RadioGroupItem value="applepay" id="payment-applepay" className="peer sr-only" />
                    <Label htmlFor="payment-applepay" className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-blue-200 p-4 hover:bg-blue-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full border border-blue-200 p-1.5 bg-white">
                            <Apple className="h-5 w-5 text-black" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">Apple Pay</p>
                            <p className="text-xs text-gray-500">الدفع السريع عبر Apple Pay</p>
                          </div>
                        </div>
                        {selectedPayment === 'applepay' && <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>}
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card Icons for Credit Card Option */}
                {selectedPayment === 'card' && <div className="flex items-center justify-between px-2 py-3 mt-3 bg-blue-50 rounded-lg">
                    <div className="flex gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/ar/b/bd/Mada_Logo.svg" alt="Mada" className="h-6" />
                    </div>
                    <span className="text-xs text-gray-500">معاملات آمنة 100%</span>
                  </div>}

                {/* Card Details Form */}
                {selectedPayment === 'card' && <div className="mt-4 space-y-4 border-t pt-4 border-blue-100">
                    <div className="space-y-2">
                      <Label htmlFor="card-number" className="text-blue-800">رقم البطاقة</Label>
                      <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-date" className="text-blue-800">تاريخ الانتهاء</Label>
                        <Input id="expiry-date" placeholder="MM/YY" className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-blue-800">CVV</Label>
                        <Input id="cvv" placeholder="XXX" className="border-blue-200 focus:border-blue-400 focus:ring-blue-400" />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="save-card" checked={saveCardInfo} onChange={() => setSaveCardInfo(!saveCardInfo)} className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500" />
                      <label htmlFor="save-card" className="mr-2 text-sm text-gray-600">
                        حفظ بيانات البطاقة للطلبات القادمة
                      </label>
                    </div>
                  </div>}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-800">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              ملخص الطلب
            </h2>

            <Card className="border-0 shadow-sm border border-blue-100">
              <CardContent className="p-4">
                {/* Items List */}
                <div className="space-y-2 mb-4">
                  {items.map(item => <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-blue-900">{item.name} × {item.quantity}</span>
                      <span className="font-medium text-blue-700">{item.price * item.quantity} ريال</span>
                    </div>)}
                </div>

                <Separator className="my-3 bg-blue-200" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span>{totalPrice} ريال</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span>{deliveryFee} ريال</span>
                  </div>
                  <div className="flex justify-between font-bold pt-3 border-t border-blue-100 mt-2">
                    <span className="text-blue-900">الإجمالي</span>
                    <span className="text-blue-700">{total} ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Loading Progress */}
          {isSubmitting && <div className="mb-6">
              <p className="text-center text-sm text-gray-600 mb-2">جاري معالجة طلبك...</p>
              <Progress value={loadingProgress} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-700" />
            </div>}

          {/* Submit Button - Fixed at Bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto shadow-lg my-[112px]">
            <Button type="button" onClick={handleSubmitOrder} disabled={isSubmitting} variant="personalCare" size="checkout" className="w-full">
              {isSubmitting ? "جاري تنفيذ الطلب..." : `تأكيد الطلب · ${total} ريال`}
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default PersonalCareCheckout;