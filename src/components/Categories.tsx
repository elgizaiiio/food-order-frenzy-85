
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, Pill, Brush, Dumbbell } from 'lucide-react';

type Category = {
  name: string;
  icon: React.ReactNode;
  color: string;
  shadow: string;
  link: string;
};

const Categories: React.FC = () => {
  const categories: Category[] = [
    { 
      name: "مطاعم", 
      icon: <UtensilsCrossed className="w-6 h-6" />, 
      color: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
      shadow: "shadow-blue-200",
      link: "/restaurants"
    },
    { 
      name: "سوبر ماركت", 
      icon: <ShoppingCart className="w-6 h-6" />, 
      color: "bg-gradient-to-br from-cyan-500 to-blue-500 text-white",
      shadow: "shadow-cyan-200",
      link: "/market" 
    },
    { 
      name: "صيدليات", 
      icon: <Pill className="w-6 h-6" />, 
      color: "bg-gradient-to-br from-sky-500 to-blue-500 text-white",
      shadow: "shadow-sky-200",
      link: "/pharmacy" 
    },
    { 
      name: "العناية الشخصية", 
      icon: <Brush className="w-6 h-6" />, 
      color: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
      shadow: "shadow-blue-200",
      link: "/personal-care" 
    },
    { 
      name: "جيم", 
      icon: <Dumbbell className="w-6 h-6" />, 
      color: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white",
      shadow: "shadow-blue-200",
      link: "/gym" 
    },
  ];

  return (
    <div className="px-4 py-2 mb-6">
      <h2 className="text-xl font-bold mb-4 text-blue-900">الخدمات</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Link 
            to={category.link} 
            key={index} 
            className="flex flex-col items-center animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center ${category.color} ${category.shadow} shadow-md hover:shadow-lg transition-all hover:scale-105`}>
              {category.icon}
            </div>
            <span className="text-sm font-medium text-blue-800 mt-2">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
