
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgClass?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  bgClass = "bg-gray-100" 
}) => {
  return (
    <Card className={`border-0 shadow-sm hover:shadow-md transition-shadow rounded-md ${bgClass}`}>
      <CardContent className="p-3 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-2">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
