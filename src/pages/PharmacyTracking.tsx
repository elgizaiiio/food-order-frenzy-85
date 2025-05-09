
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Package, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PharmacyTracking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, estimatedDelivery } = location.state || { 
    orderId: `ORD-${Math.floor(Math.random() * 100000)}`, 
    estimatedDelivery: '30-45 دقيقة' 
  };

  // محاكاة مراحل التتبع
  const trackingSteps = [
    { id: 1, title: 'تم استلام الطلب', icon: <Check className="w-5 h-5" />, completed: true, time: 'منذ 5 دقائق' },
    { id: 2, title: 'جاري تجهيز الطلب', icon: <Package className="w-5 h-5" />, completed: true, time: 'منذ 2 دقائق' },
    { id: 3, title: 'الطلب في الطريق', icon: <Truck className="w-5 h-5" />, completed: true, time: 'دلوقتي' },
    { id: 4, title: 'تم التوصيل', icon: <Home className="w-5 h-5" />, completed: false, time: 'قريباً' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* الهيدر */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تتبع الطلب</h1>
          <div className="w-6"></div>
        </div>

        {/* معلومات الطلب */}
        <div className="px-4 py-6 border-b">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">رقم الطلب:</h2>
            <span className="text-brand-500 font-medium">{orderId}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm">وقت التوصيل المتوقع:</span>
            </div>
            <span className="font-medium">{estimatedDelivery}</span>
          </div>
        </div>

        {/* حالة الطلب */}
        <div className="px-4 py-6">
          <h3 className="font-bold mb-6">حالة الطلب</h3>
          <div className="space-y-6">
            {trackingSteps.map((step, index) => (
              <div key={step.id} className="flex">
                {/* خط الحالة */}
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full ${step.completed ? 'bg-brand-500' : 'bg-gray-200'} flex items-center justify-center z-10`}>
                    {step.icon}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`absolute left-5 top-10 w-0.5 h-16 ${trackingSteps[index+1].completed ? 'bg-brand-500' : 'bg-gray-200'}`}></div>
                  )}
                </div>
                <div className="mr-4 flex-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className={`text-sm ${step.completed ? 'text-brand-500' : 'text-gray-500'}`}>
                    {step.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* أزرار العمليات */}
        <div className="px-4 py-6 mt-6 fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full border-gray-300"
              onClick={() => {}}
            >
              الاتصال بالصيدلية
            </Button>
            <Button 
              className="w-full bg-brand-500 hover:bg-brand-600"
              onClick={() => navigate('/pharmacy')}
            >
              العودة للتسوق
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyTracking;
