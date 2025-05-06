
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Dumbbell, Brush } from 'lucide-react';

type Promo = {
  id: number;
  title: string;
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
  link: string;
};

const Promos: React.FC = () => {
  const promos: Promo[] = [
    {
      id: 1,
      title: "محتاج تشتري حاجات البيت؟",
      icon: <Home className="h-8 w-8" />,
      gradient: "from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      link: "/market"
    },
    {
      id: 2,
      title: "محتاج تروح الجيم؟",
      icon: <Dumbbell className="h-8 w-8" />,
      gradient: "from-yellow-50 to-yellow-100",
      textColor: "text-yellow-700",
      link: "/gym"
    },
    {
      id: 3,
      title: "محتاجه تجيبي ميكب؟",
      icon: <Brush className="h-8 w-8" />,
      gradient: "from-pink-50 to-pink-100",
      textColor: "text-pink-700",
      link: "/personal-care"
    }
  ];

  return (
    <div className="px-4 mb-12 animate-fade-in animate-delay-3">
      <div className="space-y-3">
        {promos.map(promo => (
          <Link
            key={promo.id}
            to={promo.link}
            className="block"
          >
            <div className={`promo-card bg-gradient-to-br ${promo.gradient} flex items-center justify-end`}>
              <div className="flex items-center gap-3 text-right">
                <h3 className={`text-lg font-bold ${promo.textColor}`}>{promo.title}</h3>
                <div className={`${promo.textColor} bg-white p-2 rounded-full shadow-sm`}>
                  {promo.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Promos;
