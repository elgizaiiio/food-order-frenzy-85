
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, Pill, Brush, Shirt, Dumbbell, Coffee, User } from 'lucide-react';

type Category = {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  link: string;
};

const CategoryIcons: React.FC = () => {
  const navigate = useNavigate();
  
  const categories: Category[] = [
    { 
      name: "مطاعم", 
      icon: <UtensilsCrossed className="w-6 h-6" />, 
      color: "text-restaurant",
      bgColor: "bg-red-50",
      link: "/restaurants"
    },
    { 
      name: "سوبر ماركت", 
      icon: <ShoppingCart className="w-6 h-6" />, 
      color: "text-market",
      bgColor: "bg-green-50",
      link: "/market" 
    },
    { 
      name: "صيدليات", 
      icon: <Pill className="w-6 h-6" />, 
      color: "text-pharmacy",
      bgColor: "bg-blue-50",
      link: "/pharmacy" 
    },
    { 
      name: "ميكب", 
      icon: <Brush className="w-6 h-6" />, 
      color: "text-beauty",
      bgColor: "bg-pink-50",
      link: "/personal-care" 
    },
    { 
      name: "ملابس", 
      icon: <Shirt className="w-6 h-6" />, 
      color: "text-clothes",
      bgColor: "bg-blue-50",
      link: "/clothes" 
    },
    { 
      name: "جيم", 
      icon: <Dumbbell className="w-6 h-6" />, 
      color: "text-gym",
      bgColor: "bg-yellow-50",
      link: "/gym" 
    },
    { 
      name: "قهوة", 
      icon: <Coffee className="w-6 h-6" />, 
      color: "text-coffee",
      bgColor: "bg-amber-50",
      link: "/coffee" 
    },
    { 
      name: "حسابي", 
      icon: <User className="w-6 h-6" />, 
      color: "text-profile",
      bgColor: "bg-purple-50",
      link: "/profile" 
    },
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="px-4 mb-7 animate-fade-in animate-delay-1">
      <div className="scroll-container">
        {categories.map((category, index) => (
          <div 
            key={index} 
            onClick={() => handleCategoryClick(category.link)} 
            className="category-icon flex-shrink-0 cursor-pointer"
          >
            <div className={`category-icon-circle ${category.bgColor} ${category.color}`}>
              {category.icon}
            </div>
            <span className="text-xs font-medium text-gray-700 mt-1">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIcons;
