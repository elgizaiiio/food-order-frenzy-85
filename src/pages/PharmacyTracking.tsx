
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, MapPin, MapPinned } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const PharmacyTracking: React.FC = () => {
  const [progress, setProgress] = useState(25);
  const [status, setStatus] = useState('تم استلام طلبك');
  const [estimatedTime, setEstimatedTime] = useState('40-50 دقيقة');

  // محاكاة تقدم الطلب
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        const newProgress = Math.min(100, progress + 25);
        setProgress(newProgress);
        
        // تحديث الحالة بناءً على التقدم
        if (newProgress === 50) {
          setStatus('جاري تجهيز طلبك');
          setEstimatedTime('30-40 دقيقة');
        } else if (newProgress === 75) {
          setStatus('الطلب في الطريق');
          setEstimatedTime('15-20 دقيقة');
        } else if (newProgress === 100) {
          setStatus('تم توصيل طلبك');
          setEstimatedTime('0 دقيقة');
        }
      }
    }, 8000); // تحديث كل 8 ثواني للتجربة
    
    return () => clearTimeout(timer);
  }, [progress]);

  // تحديد مؤشر الحالة
  const getStatusIcon = () => {
    if (progress === 100) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    }
    return <Clock className="w-6 h-6 text-indigo-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/pharmacy" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تتبع الطلب</h1>
          <div className="w-6"></div>
        </div>

        {/* Order Status */}
        <div className="p-4">
          <div className="bg-indigo-50 rounded-lg p-6 relative overflow-hidden">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">طلبك في الطريق</h2>
              {getStatusIcon()}
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1 text-sm">
                <span>وقت التوصيل المتوقع</span>
                <span className="font-medium">{estimatedTime}</span>
              </div>
              <Progress value={progress} className="h-2 bg-indigo-100" />
            </div>
            
            <div className="text-indigo-600 font-medium mb-4">{status}</div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <MapPinned className="w-5 h-5" />
              <span>رقم الطلب: ORD-{Math.floor(Math.random() * 10000)}</span>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="mt-8 px-2">
            <h3 className="font-bold mb-6">مراحل طلبك</h3>
            
            <div className="space-y-6 relative">
              {/* خط متصل بين النقاط */}
              <div className="absolute right-[12px] top-2 bottom-0 w-[2px] bg-gray-200"></div>
              
              <div className="flex">
                <div className={`w-6 h-6 rounded-full ${progress >= 25 ? 'bg-indigo-500' : 'bg-gray-300'} z-10 ml-4`}></div>
                <div className="flex-1">
                  <div className="font-medium">تم استلام طلبك</div>
                  <div className="text-sm text-gray-500">تم تأكيد طلبك وسيتم تجهيزه قريبًا</div>
                </div>
              </div>
              
              <div className="flex">
                <div className={`w-6 h-6 rounded-full ${progress >= 50 ? 'bg-indigo-500' : 'bg-gray-300'} z-10 ml-4`}></div>
                <div className="flex-1">
                  <div className="font-medium">جاري تجهيز طلبك</div>
                  <div className="text-sm text-gray-500">يتم تجهيز طلبك من الصيدلية</div>
                </div>
              </div>
              
              <div className="flex">
                <div className={`w-6 h-6 rounded-full ${progress >= 75 ? 'bg-indigo-500' : 'bg-gray-300'} z-10 ml-4`}></div>
                <div className="flex-1">
                  <div className="font-medium">الطلب في الطريق</div>
                  <div className="text-sm text-gray-500">السائق في طريقه إليك</div>
                </div>
              </div>
              
              <div className="flex">
                <div className={`w-6 h-6 rounded-full ${progress >= 100 ? 'bg-indigo-500' : 'bg-gray-300'} z-10 ml-4`}></div>
                <div className="flex-1">
                  <div className="font-medium">تم التوصيل</div>
                  <div className="text-sm text-gray-500">تم توصيل طلبك بنجاح</div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-bold mb-4">عنوان التوصيل</h3>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">المنزل</p>
                <p className="text-sm text-gray-600">شارع الملك فهد، حي الورود، الرياض</p>
                <p className="text-xs text-gray-500 mt-1">05xxxxxxxx</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 border-t pt-6 pb-24">
            <h3 className="font-bold mb-4">ملخص الطلب</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>مجموع المنتجات</span>
                <span>65 ريال</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم التوصيل</span>
                <span>10 ريال</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>المجموع الكلي</span>
                <span>75 ريال</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">تم الدفع نقدًا عند الاستلام</p>
          </div>
        </div>
        
        {/* Bottom Action */}
        <div className="fixed bottom-0 right-0 left-0 max-w-md mx-auto bg-white border-t p-4">
          <Link to="/pharmacy">
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">العودة للصيدلية</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PharmacyTracking;
