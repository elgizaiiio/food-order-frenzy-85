
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, Shirt, Pill, Brush, Dumbbell } from 'lucide-react';

type Category = {
  name: string;
  icon: React.ReactNode;
  color: string;
  link: string;
};

const Categories: React.FC = () => {
  const categories: Category[] = [
    { 
      name: "مطاعم", 
      icon: <UtensilsCrossed className="w-6 h-6" />, 
      color: "bg-blue-50 text-blue-600",
      link: "/restaurants"
    },
    { 
      name: "سوبر ماركت", 
      icon: <ShoppingCart className="w-6 h-6" />, 
      color: "bg-cyan-50 text-cyan-700",
      link: "/market" 
    },
    { 
      name: "هدوم", 
      icon: <Shirt className="w-6 h-6" />, 
      color: "bg-sky-50 text-sky-600",
      link: "/clothes" 
    },
    { 
      name: "صيدليات", 
      icon: <Pill className="w-6 h-6" />, 
      color: "bg-indigo-50 text-indigo-600",
      link: "/pharmacy" 
    },
    { 
      name: "العناية الشخصية", 
      icon: <Brush className="w-6 h-6" />, 
      color: "bg-blue-100 text-blue-700",
      link: "/personal-care" 
    },
    { 
      name: "جيم", 
      icon: <Dumbbell className="w-6 h-6" />, 
      color: "bg-sky-100 text-sky-700",
      link: "/gym" 
    },
  ];

  return (
    <div className="px-4 mb-6">
      <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="category-icon flex-shrink-0">
            <div className={`category-icon-circle ${category.color} hover:shadow-md hover:scale-105 transition-all`}>
              {category.icon}
            </div>
            <span className="text-xs font-medium text-blue-900 mt-2">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
