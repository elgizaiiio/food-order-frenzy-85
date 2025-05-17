
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DeliveryTime: React.FC = () => {
  const [deliveryTime, setDeliveryTime] = useState({
    min: 30,
    max: 45
  });
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
          <Clock className="w-5 h-5 text-blue-600" />
          وقت التوصيل المتوقع
        </h3>
      </div>

      <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100">
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600">هيوصل في حوالي</p>
              <p className="text-lg font-bold text-blue-700">
                {deliveryTime.min} - {deliveryTime.max} دقيقة
              </p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full shadow-sm">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryTime;
