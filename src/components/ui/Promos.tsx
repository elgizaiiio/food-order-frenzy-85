
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Brush, ShoppingCart, Pill } from 'lucide-react';
import { useHomePromos } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';

const Promos: React.FC = () => {
  const navigate = useNavigate();
  const { data: promos, isLoading } = useHomePromos();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="h-6 w-6" />;
      case 'Dumbbell':
        return <Dumbbell className="h-6 w-6" />;
      case 'Brush':
        return <Brush className="h-6 w-6" />;
      case 'ShoppingCart':
        return <ShoppingCart className="h-6 w-6" />;
      case 'Pill':
        return <Pill className="h-6 w-6" />;
      default:
        return <Home className="h-6 w-6" />;
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="talabat-section animate-fade-in animate-delay-3">
      <div className="flex justify-between items-center mb-5">
        <h2 className="talabat-section-title">خدماتنا المميزة</h2>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          // عرض Skeleton أثناء التحميل
          Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))
        ) : promos && promos.length > 0 ? (
          promos.map((promo, index) => (
            <div 
              key={promo.id} 
              onClick={() => handleNavigate(promo.link)} 
              className="block cursor-pointer animate-slide-in" 
              style={{animationDelay: `${index * 100 + 300}ms`}}
            >
              <div className={`rounded-xl shadow-sm hover:shadow-md bg-gradient-to-r ${promo.gradient} transition-all duration-300 hover:scale-[1.01]`}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex flex-col ml-4 text-right">
                    <h3 className={`text-lg font-bold ${promo.textColor}`}>{promo.title}</h3>
                    <p className={`${promo.textColor} opacity-90 text-sm`}>{promo.description}</p>
                  </div>
                  <div className={`${promo.iconBg} p-3 rounded-full shadow-sm`}>
                    {getIcon(promo.icon)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-32 flex items-center justify-center border border-dashed border-orange-300 rounded-lg">
            <p className="text-orange-500">لا توجد عروض ترويجية متاحة حاليًا</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Promos;
