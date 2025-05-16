
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Package, Car, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

const DeliveryRequest: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [deliveryType, setDeliveryType] = useState('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  // أنواع التوصيل المتاحة
  const deliveryOptions = [
    { id: 'standard', name: 'توصيل عادي', time: '40-60 دقيقة', price: 15, icon: <Car className="h-5 w-5" /> },
    { id: 'express', name: 'توصيل سريع', time: '20-30 دقيقة', price: 25, icon: <Car className="h-5 w-5" /> },
    { id: 'scheduled', name: 'توصيل مجدول', time: 'حدد الوقت', price: 20, icon: <Clock className="h-5 w-5" /> }
  ];

  // العناوين المحفوظة للمستخدم
  const savedAddresses = ['شارع الملك فهد', 'حي النزهة', 'المركز التجاري'];

  // معالجة تقديم الطلب
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pickupAddress || !deliveryAddress) {
      toast({
        title: "تحقق من البيانات",
        description: "يرجى إدخال عناوين الاستلام والتوصيل",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // محاكاة طلب API 
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // نفترض أن الطلب تم بنجاح
      toast({
        title: "تم تأكيد الطلب",
        description: "سيتم التواصل معك قريبًا من قبل السائق",
      });
      
      // الانتقال إلى صفحة تتبع الطلب
      navigate('/delivery-tracking', { 
        state: { 
          pickupAddress,
          deliveryAddress,
          packageDetails,
          deliveryType,
          orderId: Math.floor(Math.random() * 1000000)
        } 
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من تأكيد طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* الهيدر */}
        <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-b-3xl shadow-xl py-4 px-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">طلب توصيل</h1>
            <div className="w-6"></div> {/* لعنصر فارغ للمباعدة */}
          </div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-white/90">
              نوصل طلبك بسرعة وأمان
            </h2>
          </div>
        </header>
        
        {/* المحتوى الرئيسي */}
        <div className="px-4 py-6">
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              {/* عنوان الاستلام */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-right">عنوان الاستلام</label>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={`w-full justify-between text-right ${!pickupAddress ? 'text-gray-500' : 'text-gray-900'}`}
                      >
                        {pickupAddress || 'حدد عنوان الاستلام'}
                        <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-72">
                      <div className="space-y-2">
                        <div className="font-medium pb-2 border-b border-gray-100">
                          العناوين المحفوظة
                        </div>
                        {savedAddresses.map((address, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center p-2 hover:bg-orange-50 rounded-md cursor-pointer"
                            onClick={() => { setPickupAddress(address); }}
                          >
                            <MapPin className="h-4 w-4 text-orange-500 ml-2" />
                            <span>{address}</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-gray-100">
                          <Button 
                            variant="ghost" 
                            className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            onClick={() => {
                              const customAddress = prompt('أدخل العنوان الجديد:');
                              if (customAddress) {
                                setPickupAddress(customAddress);
                              }
                            }}
                          >
                            + إضافة عنوان جديد
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* عنوان التوصيل */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-right">عنوان التوصيل</label>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={`w-full justify-between text-right ${!deliveryAddress ? 'text-gray-500' : 'text-gray-900'}`}
                      >
                        {deliveryAddress || 'حدد عنوان التوصيل'}
                        <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-72">
                      <div className="space-y-2">
                        <div className="font-medium pb-2 border-b border-gray-100">
                          العناوين المحفوظة
                        </div>
                        {savedAddresses.map((address, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center p-2 hover:bg-orange-50 rounded-md cursor-pointer"
                            onClick={() => { setDeliveryAddress(address); }}
                          >
                            <MapPin className="h-4 w-4 text-orange-500 ml-2" />
                            <span>{address}</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-gray-100">
                          <Button 
                            variant="ghost" 
                            className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            onClick={() => {
                              const customAddress = prompt('أدخل العنوان الجديد:');
                              if (customAddress) {
                                setDeliveryAddress(customAddress);
                              }
                            }}
                          >
                            + إضافة عنوان جديد
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* تفاصيل الشحنة */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-right">تفاصيل الشحنة</label>
                <Textarea 
                  placeholder="اكتب تفاصيل الشحنة هنا..."
                  value={packageDetails}
                  onChange={(e) => setPackageDetails(e.target.value)}
                  className="w-full text-right"
                  rows={3}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl"
                disabled={!pickupAddress || !deliveryAddress}
              >
                متابعة
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* ملخص الطلب */}
              <Card className="p-4 mb-6 bg-orange-50 border border-orange-200">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-orange-600 mt-1 ml-2" />
                    <div>
                      <h3 className="text-sm font-bold text-gray-700">عنوان الاستلام:</h3>
                      <p className="text-sm">{pickupAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-orange-600 mt-1 ml-2" />
                    <div>
                      <h3 className="text-sm font-bold text-gray-700">عنوان التوصيل:</h3>
                      <p className="text-sm">{deliveryAddress}</p>
                    </div>
                  </div>
                  
                  {packageDetails && (
                    <div className="flex items-start">
                      <Package className="w-5 h-5 text-orange-600 mt-1 ml-2" />
                      <div>
                        <h3 className="text-sm font-bold text-gray-700">تفاصيل الشحنة:</h3>
                        <p className="text-sm">{packageDetails}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
              
              {/* اختيار نوع التوصيل */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-gray-800">اختر نوع التوصيل</h3>
                <div className="space-y-3">
                  {deliveryOptions.map(option => (
                    <div 
                      key={option.id}
                      className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer ${
                        deliveryType === option.id 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                      }`}
                      onClick={() => setDeliveryType(option.id)}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          deliveryType === option.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {option.icon}
                        </div>
                        <div className="mr-3">
                          <h4 className="font-medium">{option.name}</h4>
                          <span className="text-sm text-gray-500">{option.time}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-orange-600">{option.price} ج.م</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  الرجوع
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                      <span>جاري التأكيد...</span>
                    </div>
                  ) : (
                    'تأكيد الطلب'
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryRequest;
