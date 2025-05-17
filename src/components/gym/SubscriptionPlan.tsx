
import React from 'react';
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SubscriptionPlanProps {
  id: string;
  title: string;
  price: number;
  description: string;
  recommended?: boolean;
}

export const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  id,
  title,
  price,
  description,
  recommended
}) => {
  return (
    <div className={`relative border rounded-lg p-4 ${recommended ? 'border-brand-400' : 'border-gray-200'}`}>
      {recommended && (
        <div className="absolute -top-2 right-3 bg-brand-500 text-white text-xs py-1 px-2 rounded-full">
          الأكثر توفيرًا
        </div>
      )}
      
      <div className="flex items-center space-x-2 space-x-reverse">
        <RadioGroupItem value={id} id={id} className="border-brand-400 text-brand-500" />
        <div className="flex flex-col mr-2">
          <Label htmlFor={id} className="font-bold text-gray-800">{title}</Label>
          <span className="text-sm text-gray-600">{description}</span>
        </div>
        <div className="mr-auto font-bold text-brand-600">
          {price.toFixed(0)} ر.س
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
