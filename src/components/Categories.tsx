
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  ShoppingCart, 
  Pill, 
  Brush, 
  Dumbbell,
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
        return <UtensilsCrossed className="w-8 h-8 text-white" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-8 h-8 text-white" />;
      case 'Pill':
        return <Pill className="w-8 h-8 text-white" />;
      case 'Brush':
        return <Brush className="w-8 h-8 text-white" />;
      case 'Dumbbell':
        return <Dumbbell className="w-8 h-8 text-white" />;
      case 'Car':
        return <Car className="w-8 h-8 text-white" />;
      default:
        return <ShoppingCart className="w-8 h-8 text-white" />;
    }
  };

  return (
    <div className="py-6 mb-2 bg-white">
      <div className="flex justify-between items-center mb-4 px-4">
        <Link to="/services" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          شوف الكل
        </Link>
        <h2 className="text-xl font-bold text-gray-900">الأقسام</h2>
      </div>
      
      <div className="scroll-container overflow-x-auto pb-4 px-4 no-scrollbar">
        <div className="flex gap-4">
          {isLoading ? (
            // عرض Skeleton أثناء التحميل
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center min-w-[90px]">
                <Skeleton className="w-20 h-20 rounded-xl mb-2" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          ) : (
            categories?.map((category, index) => (
              <Link 
                to={category.link} 
                key={category.id} 
                className="flex flex-col items-center animate-fade-in min-w-[90px]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className={`w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center ${category.color} ${category.shadow} shadow-md hover:shadow-lg transition-all hover:scale-105 border-none`}>
                  {getIcon(category.icon)}
                </Card>
                <span className="text-sm font-medium text-gray-800 mt-2">{category.name}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
