
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CreditCard, Phone, User, Apple, Wallet, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { CheckoutProvider, useCheckout } from '@/context/CheckoutContext';
import { PharmacyCartProvider, usePharmacyCart } from '@/context/PharmacyCartContext';
import { submitPharmacyOrder } from '@/api/pharmacy';

// مكون اختيار العناوين
const AddressSelector = () => {
  const { addresses, selectedAddressId, selectAddress } = useCheckout();

  const getAddressIcon = (title: string) => {
    if (title === 'المنزل') return <div className="p-1.5 rounded-full bg-brand-100"><MapPin className="w-4 h-4 text-brand-500" /></div>;
    if (title === 'العمل') return <div className="p-1.5 rounded-full bg-indigo-100"><MapPin className="w-4 h-4 text-indigo-500" /></div>;
    return <div className="p-1.5 rounded-full bg-gray-100"><MapPin className="w-4 h-4 text-gray-500" /></div>;
  };

  return (
    <div className="space-y-3">
      <RadioGroup value={selectedAddressId || undefined} onValueChange={selectAddress}>
        {addresses.map((address) => (
          <div key={address.id} className="relative">
            <RadioGroupItem
              value={address.id}
              id={`address-${address.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`address-${address.id}`}
              className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {getAddressIcon(address.title)}
                </div>
                <div>
                  <p className="font-medium">{address.title}</p>
                  <p className="text-sm text-gray-500">{address.fullAddress}</p>
                  <p className="text-xs mt-1 text-gray-400">{address.phone}</p>
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

// مكون إضافة عنوان جديد
const AddNewAddressForm = ({ onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      fullAddress: '',
      phone: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div className="space-y-2">
        <Label>اسم العنوان</Label>
        <Input 
          {...register("title", { required: "هذا الحقل مطلوب" })}
          placeholder="مثل: المنزل، العمل..."
          className="border-gray-200 focus:border-brand-500"
        />
        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          العنوان التفصيلي
        </Label>
        <Input 
          {...register("fullAddress", { required: "هذا الحقل مطلوب" })}
          placeholder="الحي، الشارع، المبنى..."
          className="border-gray-200 focus:border-brand-500"
        />
        {errors.fullAddress && <p className="text-red-500 text-xs">{errors.fullAddress.message}</p>}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-1">
          <Phone className="w-4 h-4" />
          رقم الهاتف
        </Label>
        <Input 
          {...register("phone", { 
            required: "هذا الحقل مطلوب",
            pattern: {
              value: /^(05)[0-9]{8}$/,
              message: "يرجى إدخال رقم هاتف سعودي صحيح"
            }
          })}
          placeholder="05xxxxxxxx"
          className="border-gray-200 focus:border-brand-500"
          dir="ltr"
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1 bg-brand-500 hover:bg-brand-600">حفظ العنوان</Button>
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>إلغاء</Button>
      </div>
    </form>
  );
};

// مكون طرق الدفع
const PaymentMethodSelector = () => {
  const { paymentMethod, setPaymentMethod } = useCheckout();
  
  const paymentOptions = [
    {
      id: 'cash',
      name: 'الدفع عند الاستلام',
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      description: 'ادفع نقدًا عند استلام طلبك'
    },
    {
      id: 'card',
      name: 'بطاقة ائتمان / مدى',
      icon: <CreditCard className="h-5 w-5 text-blue-600" />,
      description: 'فيزا، ماستركارد، مدى'
    },
    {
      id: 'wallet',
      name: 'المحافظ الإلكترونية',
      icon: <Wallet className="h-5 w-5 text-purple-600" />,
      description: 'STC Pay، Apple Pay، وغيرها'
    },
    {
      id: 'applepay',
      name: 'Apple Pay',
      icon: <Apple className="h-5 w-5 text-black" />,
      description: 'الدفع السريع والآمن عبر Apple Pay'
    }
  ];

  return (
    <RadioGroup 
      value={paymentMethod} 
      onValueChange={(value) => setPaymentMethod(value as any)} 
      className="space-y-2"
    >
      {paymentOptions.map((option) => (
        <div key={option.id} className="relative">
          <RadioGroupItem
            value={option.id}
            id={`payment-${option.id}`}
            className="peer sr-only"
          />
          <Label
            htmlFor={`payment-${option.id}`}
            className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-gray-200 p-1.5 bg-white">
                  {option.icon}
                </div>
                <div>
                  <p className="font-medium">{option.name}</p>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </div>
              {paymentMethod === option.id && (
                <div className="h-3 w-3 rounded-full bg-brand-500"></div>
              )}
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

// مكون محتوى صفحة الدفع
const PharmacyCheckoutContent = () => {
  const { 
    addresses, 
    selectedAddressId, 
    addAddress, 
    paymentMethod, 
    selectAddress 
  } = useCheckout();
  
  const { items, totalPrice: subtotal } = usePharmacyCart();
  const navigate = useNavigate();
  
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // حساب رسوم التوصيل والإجمالي
  const deliveryFee = 10;
  const total = subtotal + deliveryFee;
  
  const handleAddAddress = (data) => {
    addAddress({
      ...data,
      isDefault: addresses.length === 0
    });
    setShowNewAddressForm(false);
  };
  
  const handleSubmitOrder = async () => {
    if (!selectedAddressId) {
      toast.error("الرجاء اختيار عنوان للتوصيل");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // إعداد تفاصيل الطلب
      const orderDetails = {
        items: items.map(item => ({ id: item.id, quantity: item.quantity })),
        addressId: selectedAddressId,
        paymentMethod,
        phone: addresses.find(a => a.id === selectedAddressId)?.phone || ''
      };
      
      // إرسال الطلب
      const response = await submitPharmacyOrder(orderDetails);
      
      if (response.success) {
        // حفظ بيانات الطلب للتتبع
        sessionStorage.setItem('pharmacyOrderDetails', JSON.stringify({
          orderId: response.orderId,
          estimatedDelivery: response.estimatedDelivery
        }));
        
        toast.success("تم تأكيد طلبك بنجاح!");
        navigate('/pharmacy/tracking');
      } else {
        toast.error(response.message || "حدث خطأ أثناء معالجة طلبك");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-5 pb-24">
      {/* Address Section */}
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-brand-50 to-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-500" />
            عنوان التوصيل
          </h2>
        </div>
        
        <div className="p-4">
          {showNewAddressForm ? (
            <AddNewAddressForm 
              onSave={handleAddAddress}
              onCancel={() => setShowNewAddressForm(false)}
            />
          ) : (
            <>
              <AddressSelector />
              
              <Button 
                variant="outline" 
                onClick={() => setShowNewAddressForm(true)}
                className="w-full mt-3 border-dashed border-gray-300 hover:bg-brand-50 hover:border-brand-300"
              >
                إضافة عنوان جديد
              </Button>
            </>
          )}
        </div>
      </Card>
      
      {/* Delivery Time */}
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-brand-50 to-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-500" />
            وقت التوصيل
          </h2>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div>
              <p className="text-gray-500 text-sm">وقت التوصيل المتوقع</p>
              <p className="font-bold">30-45 دقيقة</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-brand-500" />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Payment Method */}
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-brand-50 to-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-500" />
            طريقة الدفع
          </h2>
        </div>
        
        <div className="p-4">
          <PaymentMethodSelector />
          
          {paymentMethod === 'card' && (
            <div className="flex items-center justify-between px-3 py-3 bg-gray-50 rounded-lg mt-3">
              <div className="flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/ar/b/bd/Mada_Logo.svg" alt="Mada" className="h-6" />
              </div>
              <span className="text-xs text-gray-500">معاملات آمنة 100%</span>
            </div>
          )}
        </div>
      </Card>
      
      {/* Order Summary */}
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <div className="p-4 border-b bg-gradient-to-r from-brand-50 to-white">
          <h2 className="text-lg font-bold">ملخص الطلب</h2>
        </div>
        
        <div className="p-4">
          <div className="space-y-2 mb-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-gray-500">x{item.quantity}</span>
                </div>
                <span className="text-sm">{(item.price * item.quantity).toFixed(2)} ريال</span>
              </div>
            ))}
          </div>
          
          <Separator className="my-3" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">المجموع الفرعي</span>
              <span>{subtotal.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">رسوم التوصيل</span>
              <span>{deliveryFee} ريال</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>الإجمالي</span>
              <span className="text-brand-700">{total.toFixed(2)} ريال</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Submit Button - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-10 max-w-md mx-auto">
        <Button 
          onClick={handleSubmitOrder}
          disabled={isSubmitting} 
          className="w-full py-6 bg-brand-500 hover:bg-brand-600 text-lg font-bold"
        >
          {isSubmitting ? "جارٍ تأكيد الطلب..." : `تنفيذ الطلب - ${total.toFixed(2)} ريال`}
        </Button>
      </div>
    </div>
  );
};

// المكون الرئيسي
const PharmacyCheckout: React.FC = () => {
  return (
    <CheckoutProvider>
      <PharmacyCartProvider>
        <div className="min-h-screen bg-gray-50" dir="rtl">
          <div className="max-w-md mx-auto bg-white">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
              <div className="flex items-center justify-between p-4">
                <Link to="/pharmacy/cart" className="text-gray-700">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
                <div className="w-6"></div> {/* Empty div for flex balance */}
              </div>
            </div>

            {/* Page Content */}
            <div className="p-4">
              <PharmacyCheckoutContent />
            </div>
          </div>
        </div>
      </PharmacyCartProvider>
    </CheckoutProvider>
  );
};

export default PharmacyCheckout;
