
import React from 'react';
import { Star, Clock, BadgePercent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePopularPlaces } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';

const PopularPlaces: React.FC = () => {
  const navigate = useNavigate();
  const { data: places, isLoading } = usePopularPlaces();

  const navigateToRestaurant = (id: number | string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="px-4 mb-8 animate-fade-in animate-delay-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-right text-blue-900">الأماكن الرائجة</h2>
      </div>
      
      <div className="scroll-container">
        {isLoading ? (
          // عرض Skeleton أثناء التحميل
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="w-72 overflow-hidden border-blue-100 shadow-sm flex-shrink-0">
              <Skeleton className="h-44 w-full" />
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))
        ) : places && places.length > 0 ? (
          places.map((place, index) => (
            <Card 
              key={place.id} 
              onClick={() => navigateToRestaurant(place.id)} 
              className="w-72 cursor-pointer overflow-hidden border-blue-100 hover:border-blue-300 hover:shadow-md shadow-sm transition-all duration-300 flex-shrink-0 animate-fade-in" 
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="relative h-44">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" loading="lazy" />
                {place.deliveryFee === "0 ج.م" && (
                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white border-0">
                    <BadgePercent className="w-3.5 h-3.5 mr-1" /> توصيل مجاني
                  </Badge>
                )}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-medium text-blue-800 shadow-sm">
                  {place.category}
                </div>
              </div>
              
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-0.5 bg-blue-50 px-2 py-0.5 rounded-full">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-xs font-bold text-blue-900">{place.rating}</span>
                  </div>
                  <h3 className="text-lg font-medium text-blue-800">{place.name}</h3>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-blue-600 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{place.deliveryTime}</span>
                  </div>
                  <span className="font-medium">{place.deliveryFee}</span>
                </div>
                
                <Button 
                  className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-sm" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToRestaurant(place.id);
                  }}
                >
                  اطلب الآن
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="w-full h-32 flex items-center justify-center border border-dashed border-blue-300 rounded-lg">
            <p className="text-blue-500">لا توجد أماكن شائعة متاحة حاليًا</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularPlaces;
