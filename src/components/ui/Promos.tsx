
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Brush, ShoppingCart, Pill, ArrowRight } from 'lucide-react';
import { useHomePromos } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
        <span className="text-xs text-orange-500 font-semibold tracking-wider bg-orange-50 px-2 py-1 rounded-full">خصومات حصرية</span>
        <h2 className="talabat-section-title font-bold text-xl">خدماتنا المميزة</h2>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : promos && promos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {promos.map((promo, index) => (
            <Card
              key={promo.id}
              className={`group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-in rounded-xl`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
              onClick={() => handleNavigate(promo.link)}
            >
              <CardContent className="p-0 relative">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient} opacity-90 rounded-xl`}></div>
                
                <div className="relative p-5 flex items-start justify-between">
                  <div className="flex flex-col items-start">
                    <div className={`${promo.iconBg} p-3 rounded-xl shadow-lg mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
                      {getIcon(promo.icon)}
                    </div>
                    
                    <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-none">
                      عرض خاص
                    </Badge>
                    
                    <h3 className={`text-xl font-bold ${promo.textColor} mb-1`}>{promo.title}</h3>
                    <p className={`${promo.textColor} opacity-90 text-sm mb-3`}>{promo.description}</p>
                    
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="bg-white/30 hover:bg-white/50 transition-colors text-white border-none mt-auto group-hover:translate-x-1 transition-transform duration-300"
                    >
                      استكشف الآن <ArrowRight className="mr-1 h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="w-full py-12 flex flex-col items-center justify-center border border-dashed border-orange-300 rounded-2xl bg-orange-50/50">
          <p className="text-orange-500 font-medium mb-2">لا توجد عروض ترويجية متاحة حاليًا</p>
          <Button variant="outline" className="border-orange-200 text-orange-600 hover:text-orange-700 hover:bg-orange-50">
            تصفح الخدمات
          </Button>
        </div>
      )}
    </div>
  );
};

export default Promos;
