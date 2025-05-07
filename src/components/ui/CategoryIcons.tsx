import React from 'react';
import { Link } from 'react-router-dom';
const CategoryIcons: React.FC = () => {
  const categories = [{
    name: 'مطاعم',
    path: '/restaurants',
    bgColor: 'bg-amber-500',
    textColor: 'text-white'
  }, {
    name: 'ماركت',
    path: '/market',
    bgColor: 'bg-green-500',
    textColor: 'text-white'
  }, {
    name: 'صيدلية',
    path: '/pharmacy',
    bgColor: 'bg-blue-500',
    textColor: 'text-white'
  }, {
    name: 'العناية الشخصية',
    path: '/personal-care',
    bgColor: 'bg-purple-500',
    textColor: 'text-white'
  }, {
    name: 'ملابس',
    path: '/clothes',
    bgColor: 'bg-yellow-500',
    textColor: 'text-white'
  }, {
    name: 'جيم',
    path: '/gym',
    bgColor: 'bg-red-500',
    textColor: 'text-white'
  }];

  // Render the categories as colored text buttons
  return <div className="py-0">
      <h2 className="text-lg font-bold mb-4 px-4">التصنيفات</h2>
      
      <div className="scroll-container overflow-x-auto pb-3 mx-4">
        <div className="flex gap-4 rtl:space-x-reverse">
          {categories.map(category => <Link key={category.name} to={category.path} className="min-w-fit">
              <div className={`${category.bgColor} ${category.textColor} px-4 py-2 rounded-lg font-medium text-center shadow-sm hover:shadow-md transition-all`}>
                {category.name}
              </div>
            </Link>)}
        </div>
      </div>
    </div>;
};
export default CategoryIcons;