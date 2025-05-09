
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Brush, ShoppingBag, ArrowRight } from 'lucide-react';

type Promo = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  textColor: string;
  link: string;
};

const Promos: React.FC = () => {
  const navigate = useNavigate();
  
  const promos: Promo[] = [
    {
      id: 1,
      title: "سوبر ماركت",
      description: "خصم 50 جنيه على أول طلب",
      icon: <Home className="h-8 w-8" />,
      gradient: "from-blue-500 to-sky-400",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/market"
    },
    {
      id: 2,
      title: "اشتراكات الجيم",
      description: "اشتراك شهري بـ 300 جنيه",
      icon: <Dumbbell className="h-8 w-8" />,
      gradient: "from-indigo-600 to-blue-500",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/gym"
    },
    {
      id: 3,
      title: "العناية الشخصية",
      description: "خصم 20% على كل المنتجات",
      icon: <Brush className="h-8 w-8" />,
      gradient: "from-blue-700 to-blue-500",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/personal-care"
    },
    {
      id: 4,
      title: "ملابس وأزياء",
      description: "أحدث التشكيلات بأفضل الأسعار",
      icon: <ShoppingBag className="h-8 w-8" />,
      gradient: "from-blue-600 to-indigo-500",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/clothes"
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="px-4 py-6 mb-12 animate-fade-in animate-delay-3">
      <div className="flex justify-between items-center mb-5">
        <button className="text-sm text-blue-600 font-medium hover:underline flex items-center">
          عرض الكل
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
        <h2 className="text-xl font-bold text-blue-900">خدماتنا المميزة</h2>
      </div>
      
      <div className="space-y-3">
        {promos.map((promo, index) => (
          <div
            key={promo.id}
            onClick={() => handleNavigate(promo.link)}
            className="block cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100 + 300}ms` }}
          >
            <div className={`rounded-2xl shadow-md hover:shadow-lg bg-gradient-to-r ${promo.gradient} transition-all duration-300 hover:scale-[1.01]`}>
              <div className="flex items-center justify-between p-5">
                <div className="flex flex-col ml-4">
                  <h3 className={`text-xl font-bold mb-1 ${promo.textColor}`}>{promo.title}</h3>
                  <p className={`${promo.textColor} opacity-90 text-sm`}>{promo.description}</p>
                </div>
                <div className={`${promo.iconBg} p-3 rounded-full shadow-md`}>
                  {promo.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Banner */}
      <div className="mt-8 rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-blue-800 to-indigo-900 text-white animate-fade-in" style={{ animationDelay: '600ms' }}>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">انضم إلى عائلة dam</h3>
          <p className="text-blue-100 mb-4">احصل على خصومات حصرية وتجربة تسوق مميزة</p>
          <button className="bg-white text-blue-800 font-medium px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
            اشترك الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promos;
