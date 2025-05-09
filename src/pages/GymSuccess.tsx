
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Calendar, MapPin, Trophy, ChevronLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import confetti from 'canvas-confetti';

const GymSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gym, plan, payment } = location.state || {
    gym: { name: 'النادي' },
    plan: { title: 'اشتراك', duration: 'شهري', price: 0 },
    payment: { total: 0 }
  };
  
  // إطلاق الالعاب النارية عند تحميل الصفحة
  React.useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#6366f1', '#818cf8']
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#6366f1', '#818cf8']
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);
  
  // تنسيق التاريخ
  const formattedDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };
  
  // تنسيق رقم الطلب
  const orderNumber = Math.floor(10000000 + Math.random() * 90000000);

  return (
    <div className="min-h-screen bg-gray-50 pt-6 pb-20" dir="rtl">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Success header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 bg-white/20 rounded-full backdrop-blur-sm mb-4">
            <CheckCircle size={50} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">تم تأكيد اشتراكك بنجاح!</h1>
          <p className="mt-2 opacity-90">شكرًا لاختيارك {gym.name}</p>
        </div>
        
        {/* Order info */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 text-blue-900">
            <div>
              <p className="text-sm text-blue-700">رقم الطلب</p>
              <p className="font-semibold"># {orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-700">تاريخ الطلب</p>
              <p className="font-semibold">{formattedDate()}</p>
            </div>
          </div>
          
          {/* Subscription details */}
          <Card className="mb-6 border-blue-100 bg-blue-50">
            <CardContent className="p-4">
              <h3 className="font-bold text-lg text-blue-800 mb-3">تفاصيل الاشتراك</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Trophy className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-blue-800">نوع الاشتراك</span>
                  </div>
                  <span className="font-medium text-blue-900">{plan.title}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-blue-800">المدة</span>
                  </div>
                  <span className="font-medium text-blue-900">{plan.duration}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-blue-800">النادي</span>
                  </div>
                  <span className="font-medium text-blue-900">{gym.name}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">قيمة الاشتراك</span>
                  <span className="font-medium text-blue-800">{plan.price} جنيه</span>
                </div>
                
                {payment.discount && (
                  <div className="flex justify-between items-center mt-1 text-green-600">
                    <span>خصم ({payment.discount.code})</span>
                    <span>- {(plan.price * payment.discount.percentage / 100).toFixed(0)} جنيه</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-1">
                  <span className="text-blue-800">رسوم خدمة</span>
                  <span className="text-blue-800">+ 25 جنيه</span>
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-blue-200">
                  <span className="font-bold text-blue-900">الإجمالي</span>
                  <span className="font-bold text-xl text-blue-700">{payment.total} جنيه</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Membership info */}
          <Card className="mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-none shadow-lg">
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-3">معلومات العضوية</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-blue-200" />
                  <span>يمكنك البدء في استخدام النادي من الغد</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-blue-200" />
                  <span>احضر بطاقة الهوية معك في أول زيارة</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-blue-200" />
                  <span>ستصلك رسالة تأكيد على رقم هاتفك</span>
                </div>
              </div>
              
              <div className="text-center mt-4 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-sm font-medium">رقم العضوية</p>
                <p className="text-xl font-bold tracking-wider">{Math.floor(1000000 + Math.random() * 9000000)}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Action buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/gym/subscriptions')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md py-6"
            >
              عرض اشتراكاتي
            </Button>
            
            <Button 
              variant="outlineBlue"
              onClick={() => navigate('/gym')}
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 py-6"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymSuccess;
