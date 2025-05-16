import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useHomePopularPlaces } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';

const PopularRestaurants: React.FC = () => {
  const { data: restaurants, isLoading } = useHomePopularPlaces();

  return (
    <div className="talabat-section animate-fade-in animate-delay-3">
      <div className="flex justify-between items-center mb-3">
        <Link to="/restaurants" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          عرض الكل
        </Link>
        <h2 className="talabat-section-title">مطاعم قريبة منك</h2>
      </div>
      
      <div className="scroll-container no-scrollbar">
        {isLoading ? (
          // عرض Skeleton أثناء التحميل
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="w-64 flex-shrink-0">
              <Skeleton className="h-32 w-full rounded-t-xl" />
              <div className="pt-3 px-3">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          ))
        ) : restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant, index) => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              <Card 
                className="w-64 flex-shrink-0 border-none shadow-sm hover:shadow-md transition-all animate-fade-in restaurant-card"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative h-32">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover rounded-t-xl" 
                  />
                  <div className="absolute top-3 left-3 talabat-rating">
                    <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1">{restaurant.rating}</span>
                  </div>
                </div>
                
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <span className="talabat-badge">{restaurant.category}</span>
                    <h3 className="font-bold text-gray-900 text-right">{restaurant.name}</h3>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-600 mt-3">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 ml-1" />
                      {restaurant.deliveryTime || "25-35 د"}
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="w-3 h-3 ml-1" />
                      {restaurant.deliveryFee || "مجاناً"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="w-full h-32 flex items-center justify-center border border-dashed border-orange-300 rounded-lg">
            <p className="text-orange-500">لا توجد مطاعم متاحة حاليًا</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularRestaurants;
