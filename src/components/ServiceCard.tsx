
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgClass?: string;
  onClick?: () => void;
  badge?: string;
  special?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  bgClass = "bg-white", 
  onClick,
  badge,
  special = false
}) => {
  // التنسيق الأساسي لجميع البطاقات
  const baseCardClass = `border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-xl ${bgClass} cursor-pointer`;
  
  // تنسيق خاص للبطاقات المميزة
  const specialCardClass = special 
    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white" 
    : "";
  
  return (
    <Card 
      className={`${baseCardClass} ${specialCardClass}`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col">
        <div className={`w-12 h-12 rounded-full ${special ? 'bg-white/20' : 'bg-orange-500'} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <h3 className={`text-base font-bold mb-1 ${special ? 'text-white' : ''}`}>{title}</h3>
        <p className={`text-sm ${special ? 'text-orange-100' : 'text-gray-500'}`}>{description}</p>
        
        {badge && (
          <Badge className="mt-2 self-start bg-orange-500 hover:bg-orange-600">
            {badge}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
