
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Pill, 
  Compass, 
  Car
} from 'lucide-react';
import { useHomeCategories } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const Categories: React.FC = () => {
  const { data: categories, isLoading } = useHomeCategories();

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-white" />;
      case 'ShoppingCart':
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-white" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-white" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-white" />;
      case 'Car':
        return <Car className="w-6 h-6 text-white" />;
      default:
        return <Car className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="py-4 mb-2 bg-white">
      <div className="flex justify-between items-center mb-3">
        <Link to="/services" className="text-xs font-medium text-black hover:text-gray-700">
          عرض الكل
        </Link>
        <h2 className="text-lg font-bold text-black">الفئات</h2>
      </div>
      
      <div className="scroll-container overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-5">
          {isLoading ? (
            // عرض Skeleton أثناء التحميل
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center min-w-[70px]">
                <Skeleton className="w-[60px] h-[60px] rounded-md mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))
          ) : (
            categories?.map((category, index) => (
              <Link 
                to={category.link} 
                key={category.id} 
                className="flex flex-col items-center animate-fade-in min-w-[70px]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className={`w-[60px] h-[60px] rounded-md overflow-hidden flex items-center justify-center bg-black shadow-md hover:shadow-xl transition-all hover:scale-105 border-none`}>
                  {getIcon(category.icon)}
                </Card>
                <span className="text-xs font-medium text-gray-800 mt-2">{category.name}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
