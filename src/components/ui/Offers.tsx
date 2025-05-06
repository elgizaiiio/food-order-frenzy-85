
import React from 'react';
import { Link } from 'react-router-dom';

type Offer = {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
  link: string;
};

const Offers: React.FC = () => {
  const offers: Offer[] = [
    {
      id: 1,
      title: "خصم 30%",
      description: "على جميع الوجبات من ماكدونالدز",
      image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=500&fit=crop",
      gradient: "from-black/60 to-transparent",
      link: "/restaurant/2"
    },
    {
      id: 2,
      title: "اشترِ 1 واحصل على 1 مجاناً",
      description: "من ستاربكس على جميع المشروبات",
      gradient: "from-black/60 to-transparent",
      image: "https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=500&fit=crop",
      link: "/restaurant/4"
    },
    {
      id: 3,
      title: "توصيل مجاني",
      description: "لأول طلب من التطبيق",
      gradient: "from-black/60 to-transparent",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=500&fit=crop",
      link: "/promotions"
    }
  ];

  return (
    <div className="px-4 mb-8 animate-fade-in animate-delay-2">
      <h2 className="text-xl font-bold mb-4 text-right">عروض مخصوص ليك</h2>
      <div className="scroll-container">
        {offers.map(offer => (
          <Link 
            key={offer.id} 
            to={offer.link}
            className="offer-card min-w-[280px] h-48"
          >
            <div className="relative h-full">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${offer.gradient}`}>
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                  <p className="text-sm">{offer.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Offers;
