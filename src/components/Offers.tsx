
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type Offer = {
  id: number;
  title: string;
  description: string;
  color: string;
  textColor: string;
  image: string;
  link: string;
};

const Offers: React.FC = () => {
  const offers: Offer[] = [
    {
      id: 1,
      title: "خصم 30%",
      description: "على جميع الوجبات من ماكدونالدز",
      color: "from-lime-600 to-green-700",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=500&auto=format&fit=crop",
      link: "/restaurant/1"
    },
    {
      id: 2,
      title: "اشترِ 1 واحصل على 1 مجاناً",
      description: "من ستاربكس على جميع المشروبات",
      color: "from-lime-500 to-green-600",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=500&auto=format&fit=crop",
      link: "/restaurant/2"
    },
    {
      id: 3,
      title: "توصيل مجاني",
      description: "لأول طلب من التطبيق",
      color: "from-lime-500 to-lime-600",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=500&auto=format&fit=crop",
      link: "/promotions"
    }
  ];

  return (
    <div className="py-6 animate-fade-in" style={{animationDelay: "300ms"}}>
      <div className="flex justify-between items-center mb-4">
        <Link to="/offers" className="text-sm font-medium text-lime-600 hover:text-lime-700 flex items-center">
          عرض الكل <ChevronLeft className="h-4 w-4" />
        </Link>
        <h2 className="text-xl font-bold text-gray-800">عروض خاصة</h2>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-mr-2 ml-2">
          {offers.map((offer, index) => (
            <CarouselItem key={offer.id} className="pl-2 basis-9/10 sm:basis-3/4 lg:basis-1/2">
              <Link to={offer.link}>
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0 relative">
                    <div className="relative group h-52">
                      <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        loading="lazy" 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${offer.color} opacity-75`}>
                        <div className="absolute top-4 left-4">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-md">
                            <Tag size={14} className="text-lime-600 ml-1" />
                            <span className="font-bold text-xs text-lime-700">{offer.title}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-6 right-6 text-white text-right">
                          <h3 className="text-2xl font-bold drop-shadow-md">{offer.title}</h3>
                          <p className="text-sm drop-shadow-md max-w-xs">{offer.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="bg-white/70 backdrop-blur-sm hover:bg-white border-lime-100 text-lime-700" />
          <CarouselNext className="bg-white/70 backdrop-blur-sm hover:bg-white border-lime-100 text-lime-700" />
        </div>
      </Carousel>
    </div>
  );
};

export default Offers;
