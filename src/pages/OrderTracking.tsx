
import React from 'react';
import { Check } from 'lucide-react';

const OrderTracking: React.FC = () => {
  // Mock order data
  const order = {
    id: "ORD-12345",
    restaurant: "مطعم الشرق",
    logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
    estimatedTime: "30-45",
    address: "شارع الملك فهد، الرياض",
    total: 75,
    status: "preparing", // "preparing", "onway", "delivered"
  };

  const getStatusText = () => {
    switch(order.status) {
      case "preparing":
        return "طلبك وصلنا وهنشتغل عليه وهنروقلك عليه";
      case "onway":
        return "طلبك في الطريق إليك الآن";
      case "delivered":
        return "تم توصيل طلبك بنجاح";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="p-6">
          {/* Restaurant Logo & App Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
                <img 
                  src={order.logo} 
                  alt={order.restaurant} 
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 right-0 bg-brand-500 text-white text-xs rounded-full px-2 py-1">
                طلب #{order.id.split('-')[1]}
              </div>
            </div>
          </div>
          
          {/* Restaurant Name */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold">{order.restaurant}</h1>
          </div>
          
          {/* Delivery Time */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{order.estimatedTime} دقيقة</h2>
            <p className="text-gray-500 mt-1">وقت التوصيل المتوقع</p>
          </div>
          
          {/* Order Status */}
          <div className="mb-12">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-0 bottom-0 left-[19px] w-1 bg-gray-200"></div>
              
              {/* Steps */}
              <div className="space-y-8">
                {/* Step 1: Order Received */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center z-10">
                    <Check className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">تم استلام طلبك</h3>
                    <p className="text-gray-500 text-sm">تم استلام طلبك بنجاح</p>
                  </div>
                </div>
                
                {/* Step 2: Preparing */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${order.status !== "preparing" ? "bg-green-500" : "bg-brand-500 animate-pulse"} flex items-center justify-center z-10`}>
                    {order.status !== "preparing" ? 
                      <Check className="text-white w-5 h-5" /> : 
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    }
                  </div>
                  <div>
                    <h3 className="font-bold">جاري تحضير طلبك</h3>
                    <p className="text-gray-500 text-sm">{order.status === "preparing" && getStatusText()}</p>
                  </div>
                </div>
                
                {/* Step 3: On the way */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${order.status === "onway" ? "bg-brand-500 animate-pulse" : "bg-gray-200"} flex items-center justify-center z-10`}>
                    {order.status === "delivered" ? 
                      <Check className="text-white w-5 h-5" /> : 
                      <div className={`w-3 h-3 rounded-full ${order.status === "onway" ? "bg-white" : "bg-gray-400"}`}></div>
                    }
                  </div>
                  <div>
                    <h3 className={`font-bold ${order.status === "preparing" ? "text-gray-400" : ""}`}>طلبك في الطريق</h3>
                    <p className="text-gray-500 text-sm">{order.status === "onway" && "السائق في الطريق إليك الآن"}</p>
                  </div>
                </div>
                
                {/* Step 4: Delivered */}
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${order.status === "delivered" ? "bg-green-500" : "bg-gray-200"} flex items-center justify-center z-10`}>
                    {order.status === "delivered" ? 
                      <Check className="text-white w-5 h-5" /> : 
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    }
                  </div>
                  <div>
                    <h3 className={`font-bold ${order.status !== "delivered" ? "text-gray-400" : ""}`}>تم التوصيل</h3>
                    <p className="text-gray-500 text-sm">{order.status === "delivered" && "استمتع بوجبتك!"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Delivery Address */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">عنوان التوصيل</h3>
            <p>{order.address}</p>
          </div>
          
          {/* Order Info */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="font-bold">المبلغ الإجمالي</h3>
              <span className="font-bold">{order.total} ريال</span>
            </div>
            <p className="text-sm text-gray-500">الدفع: بطاقة ائتمان</p>
          </div>
          
          {/* App Branding */}
          <div className="text-center text-gray-500">
            <p className="text-sm">طلبك من تطبيق طلباتي</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
