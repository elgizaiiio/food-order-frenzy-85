import React from 'react';
import { Check, ArrowLeft, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const OrderTracking: React.FC = () => {
  const navigate = useNavigate();
  // بيانات الطلب
  const order = {
    id: "ORD-12345",
    restaurant: "مطعم الشرق",
    logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
    estimatedTime: "30-45",
    address: "شارع الملك فهد، القاهرة",
    total: 75,
    status: "preparing" // "preparing", "onway", "delivered"
  };
  const getStatusText = () => {
    switch (order.status) {
      case "preparing":
        return "طلبك وصلنا وهنجهزه حالاً";
      case "onway":
        return "طلبك في الطريق إليك دلوقتي";
      case "delivered":
        return "تم توصيل طلبك بنجاح";
      default:
        return "";
    }
  };
  return <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white min-h-screen pb-24"> 
        {/* الهيدر */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تتبع الطلب</h1>
          <div className="w-6"></div>
        </div>
        
        <div className="p-6">
          {/* شعار المطعم وشعار التطبيق */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
                <img src={order.logo} alt={order.restaurant} className="w-16 h-16 rounded-full object-cover" />
              </div>
              <div className="absolute -bottom-2 right-0 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                طلب #{order.id.split('-')[1]}
              </div>
            </div>
          </div>
          
          {/* اسم المطعم */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold">{order.restaurant}</h1>
          </div>
          
          {/* وقت التوصيل */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{order.estimatedTime} دقيقة</h2>
            <p className="text-gray-500 mt-1">وقت التوصيل المتوقع</p>
          </div>
          
          {/* حالة الطلب */}
          <div className="mb-12">
            <div className="relative">
              {/* خط التقدم */}
              <div className="absolute top-0 bottom-0 left-[19px] w-1 bg-gray-200"></div>
              
              {/* الخطوات */}
              <div className="space-y-8">
                {/* الخطوة 1: تم استلام الطلب */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center z-10">
                    <Check className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">تم استلام طلبك</h3>
                    <p className="text-gray-500 text-sm">تم استلام طلبك بنجاح</p>
                  </div>
                </div>
                
                {/* الخطوة 2: جاري التحضير */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${order.status !== "preparing" ? "bg-green-500" : "bg-blue-600 animate-pulse"} flex items-center justify-center z-10`}>
                    {order.status !== "preparing" ? <Check className="text-white w-5 h-5" /> : <div className="w-3 h-3 rounded-full bg-white"></div>}
                  </div>
                  <div>
                    <h3 className="font-bold">جاري تحضير طلبك</h3>
                    <p className="text-gray-500 text-sm">{order.status === "preparing" && getStatusText()}</p>
                  </div>
                </div>
                
                {/* الخطوة 3: في الطريق */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${order.status === "onway" ? "bg-blue-600 animate-pulse" : "bg-gray-200"} flex items-center justify-center z-10`}>
                    {order.status === "delivered" ? <Check className="text-white w-5 h-5" /> : <div className={`w-3 h-3 rounded-full ${order.status === "onway" ? "bg-white" : "bg-gray-400"}`}></div>}
                  </div>
                  <div>
                    <h3 className={`font-bold ${order.status === "preparing" ? "text-gray-400" : ""}`}>طلبك في الطريق</h3>
                    <p className="text-gray-500 text-sm">{order.status === "onway" && "السائق في الطريق إليك دلوقتي"}</p>
                  </div>
                </div>
                
                {/* الخطوة 4: تم التوصيل */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${order.status === "delivered" ? "bg-green-500" : "bg-gray-200"} flex items-center justify-center z-10`}>
                    {order.status === "delivered" ? <Check className="text-white w-5 h-5" /> : <div className="w-3 h-3 rounded-full bg-gray-400"></div>}
                  </div>
                  <div>
                    <h3 className={`font-bold ${order.status !== "delivered" ? "text-gray-400" : ""}`}>تم التوصيل</h3>
                    <p className="text-gray-500 text-sm">{order.status === "delivered" && "بالهنا والشفا!"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* عنوان التوصيل */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">عنوان التوصيل</h3>
            <p>{order.address}</p>
          </div>
          
          {/* معلومات الطلب */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold">المبلغ الإجمالي</h3>
              <span className="font-bold">{order.total} جنيه</span>
            </div>
            <p className="text-sm text-gray-500">الدفع: بطاقة ائتمان</p>
          </div>
        </div>
        
        {/* أزرار العمليات في الاسفل */}
        
      </div>
    </div>;
};
export default OrderTracking;