
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Compass, ShoppingBag } from 'lucide-react';
import { useHomePromos } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const Promos: React.FC = () => {
  const navigate = useNavigate();
  const { data: promos, isLoading } = useHomePromos();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
      case 'Car':
        return <Car className="h-6 w-6" />;
      case 'Dumbbell':
      case 'Compass':
        return <Compass className="h-6 w-6" />;
      case 'Brush':
      case 'ShoppingBag':
        return <ShoppingBag className="h-6 w-6" />;
      default:
        return <Car className="h-6 w-6" />;
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="py-6 animate-fade-in" style={{animationDelay: "550ms"}}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black">اختر الخدمة</h2>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          // عرض Skeleton أثناء التحميل
          Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-md" />
          ))
        ) : promos && promos.length > 0 ? (
          promos.map((promo, index) => (
            <div 
              key={promo.id} 
              onClick={() => handleNavigate(promo.link)} 
              className="block cursor-pointer animate-fade-in" 
              style={{animationDelay: `${index * 100 + 550}ms`}}
            >
              <div className="rounded-md shadow-sm hover:shadow-md bg-black text-white transition-all duration-300 hover:scale-[1.01]">
                <div className="flex items-center justify-between p-4">
                  <div className="flex flex-col ml-4">
                    <h3 className="text-lg font-bold mb-1">{promo.title}</h3>
                    <p className="text-gray-300 text-xs">{promo.description}</p>
                  </div>
                  <div className="p-2 rounded-full bg-gray-800">
                    {getIcon(promo.icon)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-32 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-600">لا توجد خدمات متاحة حاليًا</p>
          </div>
        )}
      </div>
      
      {/* Banner */}
      <div className="mt-8 rounded-md overflow-hidden shadow-sm bg-black text-white animate-fade-in" style={{animationDelay: "650ms"}}>
        <div className="p-5">
          <h3 className="text-lg font-bold mb-2">سجل كسائق مع أوبر</h3>
          <p className="text-gray-300 text-sm mb-4">حقق دخل إضافي واختر ساعات العمل التي تناسبك</p>
          <Button className="bg-white text-black hover:bg-gray-100 transition-colors px-4 py-2 rounded-md font-medium text-sm">
            سجل الآن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Promos;
