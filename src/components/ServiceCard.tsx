
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgClass?: string;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  bgClass = "bg-white", 
  onClick
}) => {
  return (
    <Card 
      className={`border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-lg ${bgClass} cursor-pointer`} 
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-3">
          {icon}
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
