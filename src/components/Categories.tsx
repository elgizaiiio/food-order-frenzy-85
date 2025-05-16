
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  ShoppingCart, 
  Pill, 
  Brush, 
  Dumbbell 
} from 'lucide-react';
import { useHomeCategories } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const Categories: React.FC = () => {
  const { data: categories, isLoading } = useHomeCategories();

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-6 h-6" />;
      case 'Pill':
        return <Pill className="w-6 h-6" />;
      case 'Brush':
        return <Brush className="w-6 h-6" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6" />;
      default:
        return <ShoppingCart className="w-6 h-6" />;
    }
  };

  return (
    <div className="px-4 py-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <Link to="/services" className="text-sm font-medium text-blue-600 hover:underline">
          عرض الكل
        </Link>
        <h2 className="text-xl font-bold text-blue-900">الخدمات</h2>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {isLoading ? (
          // عرض Skeleton أثناء التحميل
          Array(8).fill(0).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="w-16 h-16 rounded-2xl mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))
        ) : (
          categories?.map((category, index) => (
            <Link 
              to={category.link} 
              key={category.id} 
              className="flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card className={`w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center ${category.color} ${category.shadow} shadow-md hover:shadow-lg transition-all hover:scale-105 border-none`}>
                {getIcon(category.icon)}
              </Card>
              <span className="text-xs font-medium text-blue-800 mt-2">{category.name}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;
