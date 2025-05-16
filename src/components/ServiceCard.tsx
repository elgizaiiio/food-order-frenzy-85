
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
      className={`border-none shadow-sm hover:shadow-md transition-shadow rounded-xl ${bgClass} cursor-pointer`} 
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col">
        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-3">
          {icon}
        </div>
        <h3 className="text-base font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
