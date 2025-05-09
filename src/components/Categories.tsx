
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, Shirt, Pill, Brush, Dumbbell, Coffee, User } from 'lucide-react';

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
      color: "bg-red-50 text-red-500",
      link: "/restaurants"
    },
    { 
      name: "سوبر ماركت", 
      icon: <ShoppingCart className="w-6 h-6" />, 
      color: "bg-green-50 text-green-600",
      link: "/market" 
    },
    { 
      name: "هدوم", 
      icon: <Shirt className="w-6 h-6" />, 
      color: "bg-blue-50 text-blue-500",
      link: "/clothes" 
    },
    { 
      name: "صيدليات", 
      icon: <Pill className="w-6 h-6" />, 
      color: "bg-indigo-50 text-indigo-500",
      link: "/pharmacy" 
    },
    { 
      name: "العناية الشخصية", 
      icon: <Brush className="w-6 h-6" />, 
      color: "bg-pink-50 text-pink-500",
      link: "/personal-care" 
    },
    { 
      name: "جيم", 
      icon: <Dumbbell className="w-6 h-6" />, 
      color: "bg-yellow-50 text-yellow-600",
      link: "/gym" 
    },
    { 
      name: "كافيهات", 
      icon: <Coffee className="w-6 h-6" />, 
      color: "bg-amber-50 text-amber-700",
      link: "/cafes" 
    },
    { 
      name: "حسابي", 
      icon: <User className="w-6 h-6" />, 
      color: "bg-purple-50 text-purple-500",
      link: "/profile" 
    },
  ];

  return (
    <div className="px-4 mb-6">
      <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="category-icon flex-shrink-0">
            <div className={`category-icon-circle ${category.color}`}>
              {category.icon}
            </div>
            <span className="text-xs font-medium text-gray-700">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
