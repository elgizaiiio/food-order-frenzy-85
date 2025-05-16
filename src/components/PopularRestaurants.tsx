
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShoppingBag, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useHomePopularPlaces } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const PopularRestaurants: React.FC = () => {
  const { data: restaurants, isLoading, error } = useHomePopularPlaces();
  const { toast } = useToast();

  // رسائل الخطأ
  if (error) {
    console.error("خطأ في تحميل المطاعم:", error);
  }

  // بيانات المطاعم الثابتة للاستخدام في حال فشل الـAPI
  const staticRestaurants = [
    {
      id: 1,
      name: "مطعم الكشري المصري",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
      rating: 4.8,
      category: "كشري",
      deliveryTime: "25-35 دقيقة",
      deliveryFee: "مجاناً"
    },
    {
      id: 2,
      name: "كنتاكي",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=300&auto=format&fit=crop",
      rating: 4.5,
      category: "فراخ",
      deliveryTime: "15-25 دقيقة",
      deliveryFee: "10 ج.م"
    },
    {
      id: 3,
      name: "بيتزا هت",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
      rating: 4.7,
      category: "بيتزا",
      deliveryTime: "30-40 دقيقة",
      deliveryFee: "15 ج.م"
    }
  ];

  // استخدم البيانات من API أو البيانات الثابتة إذا لم تكن البيانات جاهزة
  const displayRestaurants = restaurants && restaurants.length > 0 ? restaurants : staticRestaurants;

  const handleOrder = (restaurantName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: `طلب من ${restaurantName}`,
      description: "تم إضافة الطلب بنجاح!"
    });
  };

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
              <Card className="border-none shadow-sm overflow-hidden">
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
                  <Skeleton className="h-8 w-full mt-3" />
                </div>
              </Card>
            </div>
          ))
        ) : (
          displayRestaurants.map((restaurant, index) => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
              <Card 
                className="w-64 flex-shrink-0 border-none shadow-sm hover:shadow-md transition-all animate-fade-in restaurant-card mx-1"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative h-32">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover rounded-t-xl" 
                  />
                  <div className="absolute top-3 left-3 talabat-rating">
                    <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 shadow-sm">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-xs font-medium">{restaurant.rating}</span>
                    </div>
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
                      {restaurant.deliveryTime}
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="w-3 h-3 ml-1" />
                      {restaurant.deliveryFee}
                    </div>
                  </div>
                  
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-sm"
                    onClick={(e) => handleOrder(restaurant.name, e)}
                  >
                    اطلب الآن
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularRestaurants;
