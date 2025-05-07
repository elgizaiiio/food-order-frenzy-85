
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryIcons: React.FC = () => {
  const categories = [
    {
      name: 'مطاعم',
      icon: '/icons/food-icon.png',
      path: '/restaurants',
      color: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
    {
      name: 'ماركت',
      icon: '/icons/market-icon.png',
      path: '/market',
      color: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      name: 'صيدلية',
      icon: '/icons/pharmacy-icon.png',
      path: '/pharmacy',
      color: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      name: 'العناية الشخصية',
      icon: '/icons/personal-care-icon.png',
      path: '/personal-care',
      color: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      name: 'ملابس',
      icon: '/icons/clothes-icon.png',
      path: '/clothes',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-700',
    },
    {
      name: 'جيم',
      icon: '/icons/gym-icon.png',
      path: '/gym',
      color: 'bg-red-50',
      textColor: 'text-red-700',
    }
  ];

  // Render the categories with icons
  return (
    <div className="py-6">
      <h2 className="text-lg font-bold mb-4 px-4">التصنيفات</h2>
      
      <div className="scroll-container overflow-x-auto pb-3 mx-4">
        <div className="flex gap-6 rtl:space-x-reverse">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={category.path}
              className="flex flex-col items-center min-w-[80px]"
            >
              <span className={`text-sm font-medium ${category.textColor} mb-2`}>
                {category.name}
              </span>
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center shadow-sm hover:shadow-md transition-all overflow-hidden`}>
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    // Fallback to realistic image URLs from Unsplash if icon fails to load
                    const fallbackImages = {
                      'مطاعم': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop',
                      'ماركت': 'https://images.unsplash.com/photo-1543168256-418811576931?w=400&h=400&fit=crop',
                      'صيدلية': 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop',
                      'العناية الشخصية': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
                      'ملابس': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
                      'جيم': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop'
                    };
                    e.currentTarget.src = fallbackImages[category.name] || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop";
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryIcons;
