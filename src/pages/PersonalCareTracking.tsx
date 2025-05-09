
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Truck, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PersonalCareTracking: React.FC = () => {
  // Order status simulation
  const [orderStatus, setOrderStatus] = useState<'preparing' | 'on_the_way' | 'delivered'>('preparing');
  const [progress, setProgress] = useState(33);

  // Mock order data
  const order = {
    id: 'ORD-2354789',
    estimatedTime: '30-45',
    items: [
      { name: 'عطر فلورا الفاخر', quantity: 1, price: 199 },
      { name: 'كريم مرطب للوجه', quantity: 2, price: 85 }
    ],
    subtotal: 369,
    deliveryFee: 15,
    total: 384,
    address: 'شارع الملك فهد، الرياض',
    driver: {
      name: 'أحمد محمد',
      phone: '+9665XXXXXXXX',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100&h=100'
    }
  };

  // Simulate order status changing
  useEffect(() => {
    // First status change: preparing -> on_the_way
    const firstTimeout = setTimeout(() => {
      setOrderStatus('on_the_way');
      setProgress(66);
    }, 10000); // 10 seconds

    // Second status change: on_the_way -> delivered
    const secondTimeout = setTimeout(() => {
      setOrderStatus('delivered');
      setProgress(100);
    }, 20000); // 20 seconds

    // Cleanup timeouts on component unmount
    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <Link to="/personal-care" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تتبع الطلب</h1>
          <div className="w-6"></div> {/* Empty div for flex balance */}
        </div>

        <div className="p-4">
          {/* Order Status */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <h2 className="text-lg font-bold mb-2 text-blue-800">حالة الطلب #{order.id}</h2>
            <Progress 
              value={progress} 
              className="h-2 mb-4" 
              indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-700"
            />
            <div className="flex justify-between text-sm">
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className={`w-6 h-6 ${progress >= 33 ? 'text-blue-600 fill-blue-600' : 'text-gray-300'}`} />
                <span className={progress >= 33 ? 'text-blue-800' : 'text-gray-500'}>تم الاستلام</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className={`w-6 h-6 ${progress >= 66 && progress < 100 ? 'text-blue-600' : 'text-gray-300'}`} />
                <span className={progress >= 66 && progress < 100 ? 'text-blue-800' : 'text-gray-500'}>في الطريق</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className={`w-6 h-6 ${progress === 100 ? 'text-blue-600 fill-blue-600' : 'text-gray-300'}`} />
                <span className={progress === 100 ? 'text-blue-800' : 'text-gray-500'}>تم التوصيل</span>
              </div>
            </div>
          </Card>

          {/* Estimated Time */}
          <Card className="p-4 mb-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-blue-800">الوقت المتوقع للتوصيل</h3>
                <p className="text-gray-600">{order.estimatedTime} دقيقة</p>
              </div>
              <Clock className="w-10 h-10 text-blue-600" />
            </div>
          </Card>

          {/* Delivery Person - Only show when status is on_the_way */}
          {orderStatus !== 'preparing' && (
            <Card className="p-4 mb-6 animate-fade-in border border-blue-200">
              <h3 className="text-lg font-bold mb-2 text-blue-800">مندوب التوصيل</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={order.driver.image} 
                    alt={order.driver.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div>
                    <p className="font-medium text-blue-900">{order.driver.name}</p>
                    <p className="text-sm text-gray-600">{order.driver.phone}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="personalCareOutline" 
                  className="h-10 w-10 p-0 rounded-full"
                >
                  <PhoneCall className="h-5 w-5 text-blue-600" />
                </Button>
              </div>
            </Card>
          )}

          {/* Status Message */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <div className="text-center">
              {orderStatus === 'preparing' && (
                <p className="text-blue-700">جاري تحضير منتجاتك. سيتم التوصيل قريبًا!</p>
              )}
              {orderStatus === 'on_the_way' && (
                <p className="text-blue-700">طلبك في الطريق إليك الآن مع المندوب {order.driver.name}</p>
              )}
              {orderStatus === 'delivered' && (
                <p className="text-green-600">تم توصيل طلبك بنجاح. نتمنى لك تجربة ممتعة!</p>
              )}
            </div>
          </Card>

          {/* Delivery Address */}
          <Card className="p-4 mb-6 border border-blue-200">
            <h3 className="text-lg font-bold mb-2 text-blue-800">عنوان التوصيل</h3>
            <p className="text-gray-600">{order.address}</p>
          </Card>

          {/* Order Summary */}
          <Card className="p-4 mb-6 border border-blue-200">
            <h3 className="text-lg font-bold mb-3 text-blue-800">تفاصيل الطلب</h3>
            <div className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-blue-900">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-blue-700 font-medium">{item.price * item.quantity} ريال</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t space-y-2 border-blue-100">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="text-blue-700">{order.subtotal} ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">رسوم التوصيل</span>
                <span className="text-blue-700">{order.deliveryFee} ريال</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-blue-100">
                <span className="text-blue-900">المبلغ الإجمالي</span>
                <span className="text-blue-700">{order.total} ريال</span>
              </div>
            </div>
          </Card>

          {/* Back to Home Button */}
          <Link to="/personal-care">
            <Button variant="personalCare" className="w-full">
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalCareTracking;
