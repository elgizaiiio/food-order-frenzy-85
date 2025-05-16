
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Package, Truck, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type OrderStatus = 'preparing' | 'onway' | 'delivered';

interface Order {
  id: string;
  status: OrderStatus;
  estimatedDelivery: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  address: {
    name: string;
    street: string;
    area: string;
    city: string;
    phone: string;
  };
  deliveryPerson?: {
    name: string;
    phone: string;
    image: string;
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const PersonalCareTracking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [progress, setProgress] = useState(0);

  // تحويل الحالة إلى نسبة مئوية
  const getStatusProgress = (status: OrderStatus) => {
    if (status === 'preparing') return 33;
    if (status === 'onway') return 66;
    if (status === 'delivered') return 100;
    return 0;
  };

  // تحويل الحالة إلى نص بالعربية
  const getStatusText = (status: OrderStatus) => {
    if (status === 'preparing') return 'جاري تجهيز الطلب';
    if (status === 'onway') return 'الطلب في الطريق';
    if (status === 'delivered') return 'تم التوصيل';
    return '';
  };

  useEffect(() => {
    // لو كان هناك بيانات في location.state، استخدمها
    if (location.state && location.state.orderId) {
      // في تطبيق حقيقي، سنقوم بجلب تفاصيل الطلب من الخادم
      // هنا نستخدم بيانات وهمية للعرض التوضيحي
      const demoOrder: Order = {
        id: location.state.orderId,
        status: 'onway', // preparing, onway, delivered
        estimatedDelivery: location.state.estimatedDelivery || '30-45 دقيقة',
        items: [
          { name: 'كريم مرطب للوجه', quantity: 1, price: 120 },
          { name: 'مزيل مكياج', quantity: 1, price: 85 },
          { name: 'ماسك للبشرة', quantity: 2, price: 95 }
        ],
        address: {
          name: 'محمد أحمد',
          street: 'شارع النيل، عمارة 5، شقة 10',
          area: 'المعادي',
          city: 'القاهرة',
          phone: '01012345678'
        },
        deliveryPerson: {
          name: 'أحمد محمود',
          phone: '01098765432',
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        subtotal: 395,
        deliveryFee: 20,
        total: 415
      };
      setOrder(demoOrder);
      setProgress(getStatusProgress(demoOrder.status));
    } else {
      // لو لم يكن هناك بيانات، انتقل لصفحة السلة
      navigate('/personal-care/cart');
    }
    
    // محاكاة تحديث حالة الطلب
    const interval = setInterval(() => {
      setOrder(prevOrder => {
        if (!prevOrder) return null;
        
        // هذه محاكاة بسيطة: إذا كان الطلب في "preparing"، فبعد فترة يصبح "onway"
        if (prevOrder.status === 'preparing') {
          const newOrder = { ...prevOrder, status: 'onway' as OrderStatus };
          setProgress(getStatusProgress(newOrder.status));
          return newOrder;
        }
        // وإذا كان "onway"، فبعد فترة يصبح "delivered"
        else if (prevOrder.status === 'onway') {
          // لن نغير الحالة هنا لإبقاء المحاكاة أقصر
        }
        
        return prevOrder;
      });
    }, 15000); // كل 15 ثانية تحقق
    
    return () => clearInterval(interval);
  }, [location.state, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-pink-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* الهيدر */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-md z-10">
          <div className="flex items-center justify-between">
            <Link to="/personal-care" className="text-white hover:text-pink-100 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">تتبع الطلب</h1>
            <div className="w-6"></div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/80 text-sm">رقم الطلب</span>
                <p className="text-white font-bold">#{order.id}</p>
              </div>
              <div className="text-right">
                <span className="text-white/80 text-sm">الوقت المتوقع للوصول</span>
                <p className="text-white font-bold">{order.estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        {/* حالة الطلب */}
        <div className="p-4">
          <Card className="border-pink-100 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-bold text-pink-800 text-lg">حالة الطلب</h2>
                  <div className="text-sm font-medium px-3 py-1 rounded-full bg-pink-100 text-pink-700">
                    {getStatusText(order.status)}
                  </div>
                </div>
                
                <Progress value={progress} className="h-2 bg-gray-200" indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600" />
                
                <div className="flex justify-between mt-3 text-xs text-gray-600">
                  <div className={`text-center ${progress >= 33 ? 'text-pink-700 font-medium' : ''}`}>
                    <Package className={`mx-auto h-5 w-5 mb-1 ${progress >= 33 ? 'text-pink-600' : 'text-gray-400'}`} />
                    قيد التجهيز
                  </div>
                  <div className={`text-center ${progress >= 66 ? 'text-pink-700 font-medium' : ''}`}>
                    <Truck className={`mx-auto h-5 w-5 mb-1 ${progress >= 66 ? 'text-pink-600' : 'text-gray-400'}`} />
                    في الطريق
                  </div>
                  <div className={`text-center ${progress >= 100 ? 'text-pink-700 font-medium' : ''}`}>
                    <CheckCircle className={`mx-auto h-5 w-5 mb-1 ${progress >= 100 ? 'text-pink-600' : 'text-gray-400'}`} />
                    تم التوصيل
                  </div>
                </div>
              </div>
              
              {order.status === 'onway' && order.deliveryPerson && (
                <div className="p-4 border-t border-pink-100">
                  <h3 className="font-medium text-gray-700 mb-3">مندوب التوصيل</h3>
                  <div className="flex items-center">
                    <img 
                      src={order.deliveryPerson.image} 
                      alt={order.deliveryPerson.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-pink-200"
                    />
                    <div className="mr-4">
                      <p className="font-medium">{order.deliveryPerson.name}</p>
                      <div className="flex gap-4 mt-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white text-xs px-3">
                          <Phone className="h-3 w-3 ml-1" />
                          اتصال
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs px-3 border-pink-200 text-pink-700 hover:bg-pink-50">
                          <MessageSquare className="h-3 w-3 ml-1" />
                          رسالة
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {order.status === 'delivered' && (
                <div className="p-4 border-t border-pink-100 bg-green-50">
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <p className="font-medium text-green-700">تم توصيل طلبك بنجاح</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* عنوان التوصيل */}
        <div className="px-4 mb-4">
          <Card className="border-pink-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-pink-800 flex items-center">
                  <MapPin className="h-5 w-5 inline-block ml-1 text-pink-600" />
                  عنوان التوصيل
                </h3>
                <Button variant="ghost" className="text-xs h-7 text-pink-600 hover:bg-pink-50 hover:text-pink-700 p-0">
                  تغيير
                </Button>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="font-medium">{order.address.name}</p>
                <p className="text-sm text-gray-600 mt-1">{order.address.street}</p>
                <p className="text-sm text-gray-600">{order.address.area}، {order.address.city}</p>
                <div className="flex items-center mt-2 text-sm text-pink-700">
                  <Phone className="h-4 w-4 ml-1" />
                  {order.address.phone}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* منتجات الطلب */}
        <div className="px-4 mb-4">
          <Card className="border-pink-100">
            <CardContent className="p-4">
              <h3 className="font-bold text-pink-800 mb-3 flex items-center">
                <Package className="h-5 w-5 inline-block ml-1 text-pink-600" />
                المنتجات ({order.items.length})
              </h3>
              
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="bg-pink-100 text-pink-800 w-6 h-6 rounded-full flex items-center justify-center text-sm ml-3">
                        {item.quantity}
                      </span>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    <span className="text-pink-700">{item.price * item.quantity} ج.م</span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-3 bg-pink-100" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span>{order.subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">رسوم التوصيل</span>
                  <span>{order.deliveryFee} ج.م</span>
                </div>
                <div className="flex justify-between font-bold pt-1">
                  <span>المجموع</span>
                  <span className="text-pink-700">{order.total} ج.م</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* أزرار التحكم */}
        <div className="px-4 mt-6 space-y-3">
          <Button 
            variant="outline" 
            className="w-full border-pink-200 text-pink-700 hover:bg-pink-50"
            onClick={() => navigate('/personal-care')}
          >
            العودة للمتجر
          </Button>
          
          {order.status === 'onway' && (
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Phone className="w-4 h-4 ml-2" />
              اتصال بخدمة العملاء
            </Button>
          )}
          
          {order.status === 'delivered' && (
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              onClick={() => navigate('/personal-care')}
            >
              تسوق مرة أخرى
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalCareTracking;
