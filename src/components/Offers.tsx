import React from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
const Offers: React.FC = () => {
  const offers = [{
    id: 1,
    title: "خصم 30%",
    description: "على جميع الوجبات من ماكدونالدز",
    color: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=500&auto=format&fit=crop",
    link: "/restaurant/1"
  }, {
    id: 2,
    title: "اشترِ 1 واحصل على 1 مجاناً",
    description: "من ستاربكس على جميع المشروبات",
    color: "from-green-500 to-emerald-600",
    image: "https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=500&auto=format&fit=crop",
    link: "/restaurant/2"
  }, {
    id: 3,
    title: "توصيل مجاني",
    description: "لأول طلب من التطبيق",
    color: "from-blue-500 to-indigo-600",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=500&auto=format&fit=crop",
    link: "/promotions"
  }];
  return <div className="px-4 mb-8 animate-fade-in animate-delay-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">العروض المميزة</h2>
        
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {offers.map(offer => <CarouselItem key={offer.id} className="pl-2 md:pl-4 basis-9/10 sm:basis-3/4 lg:basis-1/2">
              <Link to={offer.link}>
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0 relative">
                    <div className="relative group h-48">
                      <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${offer.color} opacity-70`}>
                        <div className="absolute top-4 left-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-md">
                            <Tag size={14} className="text-brand-500 mr-1" />
                            <span className="font-bold text-xs text-brand-700">{offer.title}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 right-4 text-white text-right">
                          <h3 className="text-xl font-bold drop-shadow-md">{offer.title}</h3>
                          <p className="text-sm drop-shadow-md">{offer.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>
    </div>;
};
export default Offers;