
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Package, Truck, Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PersonalCareTracking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, estimatedDelivery } = location.state || { 
    orderId: `ORD-${Math.floor(Math.random() * 100000)}`, 
    estimatedDelivery: '30-45 دقيقة' 
  };

  // عنوان التوصيل (سيأتي من الـ API في التطبيق الحقيقي)
  const deliveryAddress = "شارع محمد نجيب، المعادي، القاهرة";

  // حالة الطلب - عادة تأتي من الخادم
  const orderStatus = "onway"; // preparing, onway, delivered

  // خطوات تتبع الطلب
  const trackingSteps = [
    { id: 1, title: 'تم استلام الطلب', icon: <Check className="w-5 h-5" />, completed: true, time: 'منذ 5 دقائق' },
    { id: 2, title: 'جاري تجهيز الطلب', icon: <Package className="w-5 h-5" />, completed: orderStatus !== "preparing", time: 'منذ 2 دقائق' },
    { id: 3, title: 'الطلب في الطريق', icon: <Truck className="w-5 h-5" />, completed: orderStatus === "delivered", active: orderStatus === "onway", time: 'الآن' },
    { id: 4, title: 'تم التوصيل', icon: <Home className="w-5 h-5" />, completed: orderStatus === "delivered", time: 'قريباً' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* الهيدر */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm z-10 rounded-b-xl">
          <Link to="/" className="text-white hover:text-pink-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تتبع الطلب</h1>
          <div className="w-6"></div>
        </div>

        <div className="p-6">
          {/* معلومات الطلب */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <img src="https://via.placeholder.com/100?text=Beauty" alt="Beauty" className="w-16 h-16 rounded-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-pink-800 mb-2">منتجات العناية الشخصية</h2>
            <p className="text-gray-600">رقم الطلب: {orderId}</p>
          </div>

          {/* وقت التوصيل المتوقع */}
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-pink-800">{estimatedDelivery}</h3>
            <p className="text-gray-500 mt-1">وقت التوصيل المتوقع</p>
          </div>

          {/* مراحل التتبع */}
          <div className="mb-10 relative">
            {/* خط التقدم */}
            <div className="absolute top-0 bottom-0 right-[19px] w-1 bg-gray-200"></div>

            {/* الخطوات */}
            <div className="space-y-8">
              {trackingSteps.map((step) => (
                <div key={step.id} className="flex items-center gap-4">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      step.completed 
                        ? 'bg-green-500' 
                        : step.active 
                        ? 'bg-pink-600 animate-pulse' 
                        : 'bg-gray-200'
                    }`}
                  >
                    {step.completed ? (
                      <Check className="text-white w-5 h-5" />
                    ) : (
                      <div className={`w-5 h-5 flex items-center justify-center ${step.active ? 'text-white' : 'text-gray-400'}`}>
                        {step.icon}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold ${!step.completed && !step.active ? 'text-gray-400' : 'text-gray-800'}`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm ${step.active ? 'text-pink-600 font-medium' : 'text-gray-500'}`}>
                      {step.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* عنوان التوصيل */}
          <div className="mb-8 bg-pink-50 p-4 rounded-lg border border-pink-100">
            <h3 className="font-bold mb-2 text-pink-800">عنوان التوصيل</h3>
            <p className="text-gray-700">{deliveryAddress}</p>
          </div>

          {/* معلومات إضافية */}
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full border-pink-200 text-pink-700 hover:bg-pink-50 flex items-center justify-center gap-2"
              onClick={() => {/* اتصال بالدعم */}}
            >
              <Phone className="w-4 h-4" />
              اتصل بخدمة العملاء
            </Button>

            <Button 
              variant="outline"
              className="w-full border-pink-200 text-pink-700 hover:bg-pink-50"
              onClick={() => navigate('/orders')}
            >
              عرض جميع الطلبات
            </Button>
          </div>

          {orderStatus === "delivered" && (
            <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg text-center">
              <h3 className="text-green-700 font-bold text-lg mb-2">تم توصيل الطلب بنجاح!</h3>
              <p className="text-green-600">شكرًا لاختيارك منتجاتنا. نتمنى لك تجربة رائعة!</p>
              <Button 
                className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate('/personal-care')}
              >
                العودة للتسوق
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalCareTracking;
