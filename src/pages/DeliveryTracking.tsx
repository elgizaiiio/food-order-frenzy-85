
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Package, User, Phone, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const DeliveryTracking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('searching');
  
  // استخراج البيانات المتمررة من صفحة طلب التوصيل
  const { 
    pickupAddress = 'شارع الملك فهد',
    deliveryAddress = 'المركز التجاري', 
    packageDetails = 'شحنة عادية',
    deliveryType = 'standard', 
    orderId = '123456'
  } = location.state || {};

  // محاكاة تحديثات حالة التوصيل
  useEffect(() => {
    const statusSequence = [
      { status: 'searching', progress: 0, delay: 2000 },
      { status: 'found', progress: 25, delay: 3000 },
      { status: 'picking', progress: 50, delay: 5000 },
      { status: 'delivering', progress: 75, delay: 4000 },
      { status: 'delivered', progress: 100, delay: 0 }
    ];
    
    let currentIndex = 0;
    
    const updateStatus = () => {
      if (currentIndex < statusSequence.length) {
        const { status, progress } = statusSequence[currentIndex];
        setStatus(status);
        setProgress(progress);
        currentIndex++;
        
        if (currentIndex < statusSequence.length) {
          setTimeout(updateStatus, statusSequence[currentIndex - 1].delay);
        }
      }
    };
    
    // بدء التحديثات
    setTimeout(updateStatus, 1000);
    
    return () => {
      // تنظيف (لا حاجة هنا لأننا نستخدم setTimeout وليس interval)
    };
  }, []);

  // الحصول على نص الحالة بناءً على حالة التوصيل
  const getStatusText = () => {
    switch (status) {
      case 'searching':
        return 'جاري البحث عن سائق...';
      case 'found':
        return 'تم العثور على سائق';
      case 'picking':
        return 'السائق في طريقه للاستلام';
      case 'delivering':
        return 'جاري توصيل الطلب';
      case 'delivered':
        return 'تم التوصيل بنجاح';
      default:
        return 'جاري تتبع الطلب...';
    }
  };

  // بيانات السائق الوهمية
  const driver = {
    name: 'أحمد محمد',
    phone: '+201234567890',
    rating: 4.8,
    vehicle: 'تويوتا كورولا',
    plate: 'ق ط ب 1234',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* الهيدر */}
        <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-b-3xl shadow-xl py-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">تتبع التوصيل</h1>
            <div className="w-6"></div> {/* لعنصر فارغ للمباعدة */}
          </div>
          
          <p className="text-white/90 text-sm">
            رقم الطلب: #{orderId}
          </p>
        </header>
        
        {/* حالة التوصيل */}
        <div className="px-4 py-6">
          <Card className="mb-6 overflow-hidden border border-orange-100">
            <div className="bg-orange-50 p-4">
              <h2 className="text-lg font-bold text-orange-800">{getStatusText()}</h2>
              <div className="mt-3">
                <Progress value={progress} className="h-2" />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>الاستلام</span>
                <span>التسليم</span>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-4">
              {/* الوقت المقدر للوصول */}
              {status !== 'delivered' && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-600 ml-2" />
                    <span className="text-sm font-medium">الوقت المقدر للوصول</span>
                  </div>
                  <Badge variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                    {status === 'searching' ? '-- : --' : '15-20 دقيقة'}
                  </Badge>
                </div>
              )}
              
              {/* عنوان الاستلام */}
              <div className="flex items-start">
                <div className="ml-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">عنوان الاستلام</h3>
                  <p className="text-sm text-gray-600">{pickupAddress}</p>
                </div>
              </div>
              
              {/* خط الفصل المنقط */}
              <div className="flex items-center">
                <div className="ml-2">
                  <div className="w-[3px] h-10 bg-gray-300 mx-auto dashed-line"></div>
                </div>
                <div className="flex-1">
                  <Separator />
                </div>
              </div>
              
              {/* عنوان التوصيل */}
              <div className="flex items-start">
                <div className="ml-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">عنوان التوصيل</h3>
                  <p className="text-sm text-gray-600">{deliveryAddress}</p>
                </div>
              </div>
              
              {/* تفاصيل الشحنة */}
              {packageDetails && (
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex items-start">
                    <Package className="w-5 h-5 text-gray-500 mt-1 ml-2" />
                    <div>
                      <h3 className="font-medium text-gray-800">تفاصيل الشحنة</h3>
                      <p className="text-sm text-gray-600">{packageDetails}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* معلومات السائق - تظهر فقط عندما يتم العثور على سائق */}
          {status !== 'searching' && (
            <Card className="mb-6 overflow-hidden border border-orange-100">
              <div className="bg-orange-50 p-4">
                <h2 className="text-lg font-bold text-orange-800">السائق</h2>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img src={driver.image} alt={driver.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{driver.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span>⭐ {driver.rating}</span>
                      <span className="mx-2">•</span>
                      <span>{driver.vehicle}</span>
                    </div>
                    <div className="mt-1">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                        {driver.plate}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* أزرار التواصل */}
                <div className="flex gap-2 mt-4">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => window.open(`tel:${driver.phone}`, '_blank')}
                  >
                    <Phone className="h-4 w-4 ml-2" />
                    اتصال
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    <MessageSquare className="h-4 w-4 ml-2" />
                    مراسلة
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* الإجراءات المتاحة */}
          <div className="space-y-3 mt-6">
            <Button 
              variant="outline" 
              className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
              onClick={() => navigate('/delivery-help')}
            >
              أحتاج مساعدة
            </Button>
            
            {status === 'delivered' && (
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => navigate('/')}
              >
                العودة للرئيسية
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;
