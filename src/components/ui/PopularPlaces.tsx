
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { usePopularPlaces } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';
import RestaurantCard from '../RestaurantCard';

interface PopularPlacesProps {
  title?: string;
}

const PopularPlaces: React.FC<PopularPlacesProps> = ({ title = "المطاعم الأكثر شعبية" }) => {
  const { data: places, isLoading } = usePopularPlaces();

  return (
    <section className="py-4 animate-fade-in" style={{animationDelay: "450ms"}}>
      <div className="flex justify-between items-center mb-3">
        <Link to="/restaurants" className="text-xs font-medium text-black hover:text-gray-700">
          عرض الكل
        </Link>
        <h2 className="text-lg font-bold text-black">{title}</h2>
      </div>
      
      <div className="scroll-container overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-4">
          {isLoading ? (
            // Skeleton loading
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="w-[260px] flex-shrink-0">
                <Card className="border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-3 space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            places?.map((place) => (
              <div key={place.id} className="w-[260px] flex-shrink-0 animate-fade-in">
                <RestaurantCard 
                  id={place.id}
                  name={place.name}
                  image={place.image}
                  rating={place.rating}
                  category={place.category}
                  deliveryTime={place.deliveryTime}
                  deliveryFee={place.deliveryFee}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularPlaces;
