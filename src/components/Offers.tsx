
import React from 'react';

const Offers: React.FC = () => {
  const offers = [
    {
      id: 1,
      title: "خصم 30%",
      description: "على جميع الوجبات من ماكدونالدز",
      color: "from-brand-100 to-brand-200",
      image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "اشترِ 1 واحصل على 1 مجاناً",
      description: "من ستاربكس على جميع المشروبات",
      color: "from-green-100 to-green-200",
      image: "https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "توصيل مجاني",
      description: "لأول طلب من التطبيق",
      color: "from-blue-100 to-blue-200",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <div className="px-4 mb-8">
      <h2 className="text-xl font-bold mb-4 text-right">العروض</h2>
      <div className="offers-container">
        {offers.map(offer => (
          <div 
            key={offer.id} 
            className="offer-card relative overflow-hidden"
          >
            <div className="relative">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-40 object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent`}>
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                  <p className="text-sm">{offer.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
