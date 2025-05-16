
import React from 'react';
import { Car, MapPin, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const DeliveryOption: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-2 border-orange-200 hover:border-orange-400 transition-all overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg">خدمة التوصيل السريع</h3>
        <p className="text-white/80 text-sm">وصل طلبك لأي مكان</p>
      </div>
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex-1 space-y-2">
            <div className="flex items-center">
              <Car className="h-5 w-5 text-orange-500 ml-2" />
              <span className="text-gray-700">توصيل سريع وآمن</span>
            </div>
            <div className="flex items-center">
              <Package className="h-5 w-5 text-orange-500 ml-2" />
              <span className="text-gray-700">متابعة مباشرة للشحنة</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-orange-500 ml-2" />
              <span className="text-gray-700">توصيل لأي مكان</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-orange-500 ml-2" />
              <span className="text-gray-700">خلال 60 دقيقة أو أقل</span>
            </div>
          </div>
          <div className="w-24 h-24 flex-shrink-0">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2037/2037380.png" 
              alt="خدمة التوصيل"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <Button 
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          onClick={() => navigate('/delivery-request')}
        >
          طلب توصيل الآن
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeliveryOption;
