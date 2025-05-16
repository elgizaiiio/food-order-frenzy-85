
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Brush } from 'lucide-react';
import { useHomePromos } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';

const Promos: React.FC = () => {
  const navigate = useNavigate();
  const { data: promos, isLoading } = useHomePromos();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="h-8 w-8" />;
      case 'Dumbbell':
        return <Dumbbell className="h-8 w-8" />;
      case 'Brush':
        return <Brush className="h-8 w-8" />;
      default:
        return <Home className="h-8 w-8" />;
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="px-4 py-6 mb-12 animate-fade-in animate-delay-3">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-blue-900">خدماتنا المميزة</h2>
      </div>
      
      <div className="space-y-3">
        {isLoading ? (
          // عرض Skeleton أثناء التحميل
          Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))
        ) : promos && promos.length > 0 ? (
          promos.map((promo, index) => (
            <div 
              key={promo.id} 
              onClick={() => handleNavigate(promo.link)} 
              className="block cursor-pointer animate-fade-in" 
              style={{animationDelay: `${index * 100 + 300}ms`}}
            >
              <div className={`rounded-2xl shadow-md hover:shadow-lg bg-gradient-to-r ${promo.gradient} transition-all duration-300 hover:scale-[1.01]`}>
                <div className="flex items-center justify-between p-5">
                  <div className="flex flex-col ml-4">
                    <h3 className={`text-xl font-bold mb-1 ${promo.textColor}`}>{promo.title}</h3>
                    <p className={`${promo.textColor} opacity-90 text-sm`}>{promo.description}</p>
                  </div>
                  <div className={`${promo.iconBg} p-3 rounded-full shadow-md`}>
                    {getIcon(promo.icon)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-32 flex items-center justify-center border border-dashed border-blue-300 rounded-lg">
            <p className="text-blue-500">لا توجد عروض ترويجية متاحة حاليًا</p>
          </div>
        )}
      </div>
      
      {/* Banner */}
      <div className="mt-8 rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-blue-800 to-indigo-900 text-white animate-fade-in" style={{animationDelay: '600ms'}}>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">انضم إلى عائلة dam</h3>
          <p className="text-blue-100 mb-4">احصل على خصومات حصرية وتجربة تسوق مميزة</p>
        </div>
      </div>
    </div>
  );
};

export default Promos;
