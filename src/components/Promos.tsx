
import React from 'react';
import { Home, Dumbbell, Brush } from 'lucide-react';

const Promos: React.FC = () => {
  const promos = [
    {
      id: 1,
      title: "محتاج تجيب حاجات البيت؟",
      description: "خصم 50 جنيه على أول طلب",
      icon: <Home className="h-8 w-8" />,
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-700"
    },
    {
      id: 2,
      title: "عاوز تروح الجيم؟",
      description: "اشتراك شهري بـ 300 جنيه",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "from-yellow-50 to-yellow-100",
      textColor: "text-yellow-700"
    },
    {
      id: 3,
      title: "عايزة تجيبي ميكب؟",
      description: "خصم 20% على كل المنتجات",
      icon: <Brush className="h-8 w-8" />,
      color: "from-pink-50 to-pink-100",
      textColor: "text-pink-700"
    }
  ];

  return (
    <div className="px-4 mb-12">
      <div className="grid grid-cols-1 gap-4">
        {promos.map(promo => (
          <div 
            key={promo.id} 
            className={`bg-gradient-to-r ${promo.color} p-4 rounded-xl shadow-sm flex items-center justify-between`}
          >
            <div className={`${promo.textColor} bg-white p-2 rounded-full shadow-sm`}>
              {promo.icon}
            </div>
            <div className="text-right">
              <h3 className={`text-lg font-bold ${promo.textColor}`}>{promo.title}</h3>
              <p className="text-sm text-gray-600">{promo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promos;
