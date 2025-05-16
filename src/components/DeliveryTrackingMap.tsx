
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Navigation, ChevronLeft, ChevronRight } from 'lucide-react';
import { DeliveryRequest } from '@/services/deliveryService';

interface DeliveryTrackingMapProps {
  delivery: DeliveryRequest;
}

// هذا المكون هو محاكاة بسيطة لخريطة تتبع التوصيل
// في التطبيق الحقيقي، يجب استخدام مكتبة خرائط مثل Google Maps أو Mapbox
const DeliveryTrackingMap: React.FC<DeliveryTrackingMapProps> = ({ delivery }) => {
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  
  // محاكاة حركة السائق على الخريطة
  useEffect(() => {
    let progressValue = 0;
    
    // تحديد نسبة التقدم بناءً على حالة التوصيل
    switch (delivery.status) {
      case 'accepted':
        progressValue = 10;
        break;
      case 'picked_up':
        progressValue = 50;
        break;
      case 'delivered':
        progressValue = 100;
        break;
      default:
        progressValue = 5;
    }
    
    // تحريك مؤشر التقدم تدريجياً للحصول على تأثير حركي
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress < progressValue) {
        currentProgress += 1;
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [delivery.status]);
  
  // حساب الوقت المتبقي للتوصيل (محاكاة)
  const getRemainingTime = () => {
    if (delivery.status === 'delivered') {
      return 'تم التوصيل';
    }
    if (delivery.status === 'cancelled') {
      return 'تم الإلغاء';
    }
    
    const estimatedMinutes = Math.max(5, 
      delivery.status === 'accepted' ? 15 : 
      delivery.status === 'picked_up' ? 8 : 25
    );
    
    return `${estimatedMinutes} دقيقة متبقية`;
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden ${expanded ? 'h-96' : 'h-48'}`}>
      <div className="bg-blue-50 p-3 flex justify-between items-center">
        <h3 className="text-blue-800 font-medium">تتبع الطلب</h3>
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-blue-600 p-1 rounded-full hover:bg-blue-100"
        >
          {expanded ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="relative p-4 bg-gray-100 h-full">
        {/* محاكاة الخريطة */}
        <div className="relative w-full h-full bg-blue-50 rounded-lg overflow-hidden">
          {/* خطوط الطرق */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300"></div>
          <div className="absolute top-1/3 bottom-1/3 left-1/4 w-1 bg-gray-300"></div>
          <div className="absolute top-1/3 bottom-1/3 right-1/4 w-1 bg-gray-300"></div>
          
          {/* نقطة الاستلام */}
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <p className="absolute top-5 text-xs font-medium text-green-700 whitespace-nowrap">نقطة الاستلام</p>
          </div>
          
          {/* نقطة التوصيل */}
          <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <p className="absolute top-5 text-xs font-medium text-red-700 whitespace-nowrap">نقطة التوصيل</p>
          </div>
          
          {/* موقع السائق (محاكاة) */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2" 
            style={{ left: `${progress}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center animate-pulse">
              <Navigation className="w-4 h-4" />
            </div>
          </div>
          
          {/* معلومات إضافية */}
          <div className="absolute left-0 right-0 bottom-0 bg-white bg-opacity-90 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-600 ml-1" />
                <span className="text-sm font-medium">{getRemainingTime()}</span>
              </div>
              {delivery.driver_name && (
                <span className="text-sm">
                  السائق: {delivery.driver_name}
                </span>
              )}
            </div>
            
            {expanded && (
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-green-600 mt-1 ml-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">من</p>
                    <p className="text-sm">{delivery.pickup_address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-red-600 mt-1 ml-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">إلى</p>
                    <p className="text-sm">{delivery.delivery_address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTrackingMap;
