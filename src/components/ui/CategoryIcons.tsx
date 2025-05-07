
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryIcons: React.FC = () => {
  const categories = [
    {
      name: 'مطاعم',
      icon: '/icons/restaurant.png',
      path: '/restaurants',
      color: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
    {
      name: 'ماركت',
      icon: '/icons/market.png',
      path: '/market',
      color: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      name: 'صيدلية',
      icon: '/icons/pharmacy.png',
      path: '/pharmacy',
      color: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      name: 'العناية الشخصية',
      icon: '/icons/care.png',
      path: '/personal-care',
      color: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      name: 'ملابس',
      icon: '/icons/clothes.png',
      path: '/clothes',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-700',
    },
    {
      name: 'جيم',
      icon: '/icons/gym.png',
      path: '/gym',
      color: 'bg-red-50',
      textColor: 'text-red-700',
    }
  ];

  // Render the categories with icons
  return (
    <div className="py-4">
      <h2 className="text-lg font-bold mb-3 px-4">التصنيفات</h2>
      
      <div className="scroll-container overflow-x-auto pb-2">
        <div className="flex px-4 space-x-4 rtl:space-x-reverse">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={category.path}
              className="flex flex-col items-center min-w-[70px]"
            >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-2 shadow-sm`}>
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-8 h-8"
                  onError={(e) => {
                    // Fallback icon if image fails to load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='20' height='20' x='2' y='2' rx='5' ry='5'/%3E%3Cpath d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/%3E%3Cline x1='17.5' y1='6.5' x2='17.51' y2='6.5'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <span className={`text-sm ${category.textColor} font-medium`}>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryIcons;
