
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Phone, MessageSquare, Map, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface OrderStatus {
  step: number;
  status: string;
  time: string;
  message: string;
  isComplete: boolean;
}

const PharmacyTracking: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    estimatedDelivery: string;
  } | null>(null);

  const [deliveryStatus, setDeliveryStatus] = useState<{
    step: number;
    progressPercent: number;
    estimatedArrival: string;
  }>({
    step: 1,
    progressPercent: 25,
    estimatedArrival: '30-45 دقيقة',
  });

  const [statusTimeline, setStatusTimeline] = useState<OrderStatus[]>([
    {
      step: 1,
      status: 'تم استلام الطلب',
      time: 'الآن',
      message: 'تم استلام طلبك وجاري تجهيزه',
      isComplete: true,
    },
    {
      step: 2,
      status: 'جاري تجهيز الطلب',
      time: '3 دقائق',
      message: 'الصيدلية تقوم بتجهيز طلبك الآن',
      isComplete: false,
    },
    {
      step: 3,
      status: 'الطلب في الطريق',
      time: '10 دقائق',
      message: 'السائق في طريقه إليك',
      isComplete: false,
    },
    {
      step: 4,
      status: 'تم التوصيل',
      time: '35 دقيقة',
      message: 'تم توصيل طلبك بنجاح',
      isComplete: false,
    },
  ]);

  // محاكاة تقدم الطلب
  useEffect(() => {
    const storedOrder = sessionStorage.getItem('pharmacyOrderDetails');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    }

    // محاكاة تحديث حالة الطلب كل 30 ثانية
    const interval = setInterval(() => {
      setDeliveryStatus(prev => {
        // تقدم تدريجي في الخطوات
        if (prev.step < 4) {
          const nextStep = prev.step + 1;
          const progressPercent = nextStep * 25;
          
          // تحديث حالة خط الزمن
          setStatusTimeline(prevTimeline => 
            prevTimeline.map(item => 
              item.step === nextStep ? { ...item, isComplete: true } : item
            )
          );
          
          return {
            ...prev,
            step: nextStep,
            progressPercent,
            estimatedArrival: nextStep === 3 ? '15-20 دقيقة' : 
                             nextStep === 4 ? 'تم التوصيل' : prev.estimatedArrival
          };
        }
        return prev;
      });
    }, 30000); // كل 30 ثانية

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تتبع الطلب</h1>
          <div className="w-6"></div> {/* Empty div for flex balance */}
        </div>

        {/* Order Status Card */}
        <div className="p-4">
          <Card className="border-0 shadow-md rounded-xl overflow-hidden mb-6">
            <div className="p-5 bg-gradient-to-r from-brand-500 to-brand-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">رقم الطلب: #{orderDetails?.orderId || '123456'}</h2>
                  <p className="text-sm text-white/80">
                    {deliveryStatus.step < 4 ? `الوصول المتوقع: ${deliveryStatus.estimatedArrival}` : 'تم التوصيل بنجاح'}
                  </p>
                </div>
                {deliveryStatus.step === 4 ? (
                  <div className="bg-white rounded-full p-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                ) : (
                  <div className="bg-white/20 rounded-full p-2">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              
              <Progress 
                value={deliveryStatus.progressPercent} 
                className="h-2 bg-white/30" 
                indicatorClassName="bg-white" 
              />
            </div>

            <div className="p-4">
              {/* Delivery Man Details */}
              {deliveryStatus.step >= 2 && deliveryStatus.step < 4 && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3">
                      <img 
                        src="https://randomuser.me/api/portraits/men/32.jpg" 
                        alt="السائق" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">أحمد محمد</p>
                      <p className="text-xs text-gray-500">السائق</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Status Timeline */}
              <div className="space-y-4 mt-4">
                {statusTimeline.map((status, index) => (
                  <div key={status.step} className="flex items-start">
                    <div className="mr-3 relative">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        status.isComplete ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {status.isComplete ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <div className={`w-2 h-2 rounded-full ${
                            deliveryStatus.step === status.step ? 'bg-brand-500' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                      {index < statusTimeline.length - 1 && (
                        <div className={`absolute top-6 bottom-0 left-3 w-0.5 h-12 ${
                          status.isComplete ? 'bg-green-200' : 'bg-gray-100'
                        }`} />
                      )}
                    </div>
                    <div className={`flex-1 pb-5 ${status.isComplete ? 'opacity-100' : 'opacity-60'}`}>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{status.status}</p>
                        <span className="text-xs text-gray-500">{status.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">{status.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Map Card */}
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-white border-b">
              <h2 className="font-bold flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-500" />
                موقع التوصيل
              </h2>
            </div>
            <div className="h-48 bg-gray-100 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">خريطة التتبع</p>
              </div>
            </div>
          </Card>

          {/* Order Details Summary */}
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-brand-50 to-white border-b">
              <h2 className="font-bold flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-500" />
                تفاصيل الطلب
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">طريقة الدفع</span>
                  <span>الدفع عند الاستلام</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span>60 ريال</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">رسوم التوصيل</span>
                  <span>10 ريال</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>المبلغ الإجمالي</span>
                  <span className="text-brand-700">70 ريال</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Help Button */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-2">هل تحتاج إلى مساعدة؟</p>
            <Button variant="outline" className="w-full">الاتصال بالدعم</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyTracking;
