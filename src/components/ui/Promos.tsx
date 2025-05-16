
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  Brush, 
  ShoppingCart, 
  Pill, 
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useHomePromos } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const Promos: React.FC = () => {
  const navigate = useNavigate();
  const { data: promos, isLoading } = useHomePromos();
  const isMobile = useIsMobile();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="h-6 w-6 text-white" />;
      case 'Dumbbell':
        return <Dumbbell className="h-6 w-6 text-white" />;
      case 'Brush':
        return <Brush className="h-6 w-6 text-white" />;
      case 'ShoppingCart':
        return <ShoppingCart className="h-6 w-6 text-white" />;
      case 'Pill':
        return <Pill className="h-6 w-6 text-white" />;
      case 'Clock':
        return <Clock className="h-6 w-6 text-white" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-6 w-6 text-white" />;
      default:
        return <Home className="h-6 w-6 text-white" />;
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Custom service gradients for a more vibrant UI
  const serviceGradients: Record<string, string> = {
    'restaurants': 'from-orange-500 to-red-600',
    'market': 'from-emerald-500 to-emerald-700',
    'pharmacy': 'from-sky-500 to-blue-700',
    'personal-care': 'from-pink-400 to-purple-600',
    'gym': 'from-indigo-500 to-indigo-700'
  };
  
  // Custom icon background colors for visual harmony
  const serviceIconBgs: Record<string, string> = {
    'restaurants': 'bg-orange-400/30',
    'market': 'bg-emerald-400/30',
    'pharmacy': 'bg-sky-400/30',
    'personal-care': 'bg-pink-400/30',
    'gym': 'bg-indigo-400/30'
  };

  return (
    <div className="talabat-section animate-fade-in animate-delay-3">
      <div className="flex justify-between items-center mb-5">
        <span className="text-xs text-orange-500 font-semibold tracking-wider bg-orange-50 px-2 py-1 rounded-full">خصومات حصرية</span>
        <h2 className="talabat-section-title font-bold text-lg md:text-xl">خدماتنا المميزة</h2>
      </div>
      
      {isLoading ? (
        // Enhanced loading state with more appropriate skeleton sizes for mobile/desktop
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array(isMobile ? 4 : 6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-36 md:h-44 rounded-xl" />
          ))}
        </div>
      ) : promos && promos.length > 0 ? (
        // Responsive grid design that adapts better to different screen sizes
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {promos.map((promo, index) => {
            // Determine the appropriate gradient and icon background based on service type
            const path = promo.link.split('/').filter(p => p).pop() || '';
            const gradient = serviceGradients[path as keyof typeof serviceGradients] || 'from-orange-500 to-orange-700';
            const iconBg = serviceIconBgs[path as keyof typeof serviceIconBgs] || 'bg-white/30';
            
            return (
              <Card
                key={promo.id}
                className={`group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] animate-slide-in h-full`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
                onClick={() => handleNavigate(promo.link)}
              >
                <CardContent className="p-0 relative h-full">
                  {/* Enhanced gradient with improved opacity for better text contrast */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-90 rounded-xl`}></div>
                  
                  <div className="relative p-4 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`${iconBg} p-2.5 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        {getIcon(promo.icon)}
                      </div>
                      
                      <Badge variant="secondary" className="bg-white/20 text-white border-none">
                        عرض خاص
                      </Badge>
                    </div>
                    
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 line-clamp-1">{promo.title}</h3>
                    <p className="text-white/90 text-xs md:text-sm mb-auto line-clamp-2">{promo.description}</p>
                    
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="bg-white/30 hover:bg-white/50 transition-colors text-white border-none group-hover:translate-x-1 transition-transform duration-300 mt-3 w-full md:w-auto md:self-start text-xs md:text-sm py-1"
                    >
                      استكشف <ArrowRight className="mr-1 h-3 w-3 rtl:rotate-180" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
