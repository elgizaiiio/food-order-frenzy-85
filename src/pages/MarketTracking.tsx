
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Truck, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const MarketTracking: React.FC = () => {
  // بيانات الطلب
  const order = {
    id: 'ORD-2354789',
    status: 'preparing', // preparing, on_the_way, delivered
    estimatedTime: '30-45',
    items: [
      { name: 'كوكاكولا', quantity: 2, price: 6 },
      { name: 'عصير برتقال', quantity: 1, price: 12 },
      { name: 'ماء معدني', quantity: 3, price: 2 }
    ],
    subtotal: 36,
    deliveryFee: 10,
    total: 46,
    address: 'شارع الملك فهد، القاهرة',
    driver: {
      name: 'أحمد محمد',
      phone: '+2012XXXXXXXX',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100&h=100'
    }
  };

  // حساب التقدم بناءً على الحالة
  const getProgress = () => {
    switch (order.status) {
      case 'preparing':
        return 33;
      case 'on_the_way':
        return 66;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* الهيدر */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/market" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تتبع الطلب</h1>
          <div className="w-6"></div> {/* عنصر فارغ للتوازن */}
        </div>

        <div className="p-4">
          {/* حالة الطلب */}
          <Card className="p-4 mb-6 bg-brand-50">
            <h2 className="text-lg font-bold mb-2">حالة الطلب #{order.id}</h2>
            <Progress value={getProgress()} className="h-2 mb-4" />
            <div className="flex justify-between text-sm">
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className={`w-6 h-6 ${getProgress() >= 33 ? 'text-brand-500' : 'text-gray-300'}`} />
                <span>تم الاستلام</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Clock className={`w-6 h-6 ${getProgress() >= 33 && getProgress() < 66 ? 'text-brand-500' : 'text-gray-300'}`} />
                <span>جاري التحضير</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className={`w-6 h-6 ${getProgress() >= 66 && getProgress() < 100 ? 'text-brand-500' : 'text-gray-300'}`} />
                <span>في الطريق</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className={`w-6 h-6 ${getProgress() === 100 ? 'text-brand-500' : 'text-gray-300'}`} />
                <span>تم التوصيل</span>
              </div>
            </div>
          </Card>

          {/* وقت التوصيل المقدر */}
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">وقت التوصيل المتوقع</h3>
                <p className="text-gray-600">{order.estimatedTime} دقيقة</p>
              </div>
              <Clock className="w-10 h-10 text-brand-500" />
            </div>
          </Card>

          {/* مندوب التوصيل */}
          <Card className="p-4 mb-6">
            <h3 className="text-lg font-bold mb-2">مندوب التوصيل</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={order.driver.image} 
                  alt={order.driver.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{order.driver.name}</p>
                  <p className="text-sm text-gray-600">{order.driver.phone}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-10 w-10 p-0">
                <PhoneCall className="h-5 w-5" />
              </Button>
            </div>
          </Card>

          {/* عنوان التوصيل */}
          <Card className="p-4 mb-6">
            <h3 className="text-lg font-bold mb-2">عنوان التوصيل</h3>
            <p className="text-gray-600">{order.address}</p>
          </Card>

          {/* تفاصيل الطلب */}
          <Card className="p-4 mb-6">
            <h3 className="text-lg font-bold mb-3">تفاصيل الطلب</h3>
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{item.price * item.quantity} جنيه</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span>{order.subtotal} جنيه</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">رسوم التوصيل</span>
                <span>{order.deliveryFee} جنيه</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span>المبلغ الإجمالي</span>
                <span>{order.total} جنيه</span>
              </div>
            </div>
          </Card>

          {/* زر العودة للرئيسية */}
          <Link to="/market">
            <Button variant="outline" className="w-full">
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketTracking;
