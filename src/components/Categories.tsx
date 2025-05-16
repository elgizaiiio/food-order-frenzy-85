
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  ShoppingCart, 
  Pill, 
  Brush, 
  Dumbbell,
  Heart,
  Coffee,
  Gift
} from 'lucide-react';
import { useHomeCategories } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';

const Categories: React.FC = () => {
  const { data: categories, isLoading } = useHomeCategories();

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="h-6 w-6 text-white" />;
      case 'ShoppingCart':
        return <ShoppingCart className="h-6 w-6 text-white" />;
      case 'Pill':
        return <Pill className="h-6 w-6 text-white" />;
      case 'Brush':
        return <Brush className="h-6 w-6 text-white" />;
      case 'Dumbbell':
        return <Dumbbell className="h-6 w-6 text-white" />;
      case 'Heart':
        return <Heart className="h-6 w-6 text-white" />;
      case 'Coffee':
        return <Coffee className="h-6 w-6 text-white" />;
      case 'Gift':
        return <Gift className="h-6 w-6 text-white" />;
      default:
        return <UtensilsCrossed className="h-6 w-6 text-white" />;
    }
  };

  return (
    <div className="py-4 bg-white rounded-xl mb-3 shadow-sm">
      <div className="flex justify-between items-center mb-2 px-4">
        <Link to="/services" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          عرض الكل
        </Link>
        <h2 className="text-xl font-bold text-gray-800">التصنيفات</h2>
      </div>
      
      <div className="scroll-container overflow-x-auto pb-2 px-4 no-scrollbar">
        <div className="flex gap-4">
          {isLoading ? (
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center min-w-[80px]">
                <Skeleton className="w-16 h-16 rounded-full mb-2" />
                <Skeleton className="h-3 w-14" />
              </div>
            ))
          ) : (
            categories?.map((category, index) => (
              <Link 
                to={category.link} 
                key={category.id} 
                className="flex flex-col items-center animate-fade-in min-w-[80px]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br ${category.color} shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-white`}>
                  {getIcon(category.icon)}
                </div>
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
