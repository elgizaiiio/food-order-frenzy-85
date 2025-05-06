
import React from 'react';
import { Home, Dumbbell, Makeup } from 'lucide-react';

const Promos: React.FC = () => {
  const promos = [
    {
      id: 1,
      title: "محتاج تشتري حاجات البيت؟",
      icon: <Home className="h-8 w-8" />,
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-700"
    },
    {
      id: 2,
      title: "محتاج تروح الجيم؟",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "from-yellow-50 to-yellow-100",
      textColor: "text-yellow-700"
    },
    {
      id: 3,
      title: "محتاجه تجيبي ميكب؟",
      icon: <Makeup className="h-8 w-8" />,
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
            className={`promo-card ${promo.color} flex items-center justify-end`}
          >
            <div className="flex items-center gap-3 text-right">
              <h3 className={`text-lg font-bold ${promo.textColor}`}>{promo.title}</h3>
              <div className={`${promo.textColor} bg-white p-2 rounded-full shadow-sm`}>
                {promo.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promos;
