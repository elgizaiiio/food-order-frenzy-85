
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  id: number | string;
  name: string;
  image: string;
  rating: number;
  category: string;
  deliveryTime?: string;
  deliveryFee?: string;
  isNew?: boolean;
}

const RestaurantCard = ({ 
  id, 
  name, 
  image, 
  rating, 
  category,
  deliveryTime,
  deliveryFee,
  isNew = false
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${id}`} className="block">
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
        <CardContent className="p-0">
          {/* Restaurant Image */}
          <div className="relative h-40 w-full">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            {isNew && (
              <Badge className="absolute top-2 left-2 bg-black text-white">
                جديد
              </Badge>
            )}
          </div>
          
          {/* Restaurant Info */}
          <div className="p-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 truncate">{name}</h3>
              <div className="flex items-center gap-0.5 text-sm">
                <span className="font-medium">{rating}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mt-1 mb-2">{category}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-700">
              {deliveryTime && (
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span>{deliveryTime}</span>
                </div>
              )}
              
              <div>
                <span className="font-medium">{deliveryFee || 'مجاني'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
