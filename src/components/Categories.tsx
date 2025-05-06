
import React from 'react';
import { Restaurant, ShoppingCart, Shirt, Pill, Makeup, Dumbbell, Coffee } from 'lucide-react';

type Category = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

const Categories: React.FC = () => {
  const categories: Category[] = [
    { 
      name: "مطاعم", 
      icon: <Restaurant className="w-6 h-6" />, 
      color: "bg-red-50 text-red-500" 
    },
    { 
      name: "سوبر ماركت", 
      icon: <ShoppingCart className="w-6 h-6" />, 
      color: "bg-green-50 text-green-600" 
    },
    { 
      name: "هدوم", 
      icon: <Shirt className="w-6 h-6" />, 
      color: "bg-blue-50 text-blue-500" 
    },
    { 
      name: "صيدليات", 
      icon: <Pill className="w-6 h-6" />, 
      color: "bg-indigo-50 text-indigo-500" 
    },
    { 
      name: "ميكب", 
      icon: <Makeup className="w-6 h-6" />, 
      color: "bg-pink-50 text-pink-500" 
    },
    { 
      name: "جيم", 
      icon: <Dumbbell className="w-6 h-6" />, 
      color: "bg-yellow-50 text-yellow-600" 
    },
    { 
      name: "قهوة", 
      icon: <Coffee className="w-6 h-6" />, 
      color: "bg-amber-50 text-amber-700" 
    },
  ];

  return (
    <div className="px-4 mb-6">
      <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
        {categories.map((category, index) => (
          <div key={index} className="category-icon flex-shrink-0">
            <div className={`category-icon-circle ${category.color}`}>
              {category.icon}
            </div>
            <span className="text-xs font-medium text-gray-700">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
