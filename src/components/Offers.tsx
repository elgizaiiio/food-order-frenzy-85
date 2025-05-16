
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
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
      description: "على توصيل المطاعم",
      color: "from-black to-gray-900",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=500&auto=format&fit=crop",
      link: "/restaurant/1"
    },
    {
      id: 2,
      title: "اطلب سيارة",
      description: "توصيل سريع وآمن",
      color: "from-black to-gray-900",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=500&auto=format&fit=crop",
      link: "/restaurant/2"
    },
    {
      id: 3,
      title: "أوبر سوبر",
      description: "توصيل البقالة خلال 15 دقيقة",
      color: "from-black to-gray-900",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=500&auto=format&fit=crop",
      link: "/promotions"
    }
  ];

  return (
    <div className="py-4 animate-fade-in" style={{animationDelay: "300ms"}}>
      <div className="flex justify-between items-center mb-3">
        <Link to="/offers" className="text-xs font-medium text-black hover:text-gray-700 flex items-center">
          عرض الكل <ChevronLeft className="h-3 w-3" />
        </Link>
        <h2 className="text-lg font-bold text-black">العروض</h2>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-mr-2 ml-2">
          {offers.map((offer, index) => (
            <CarouselItem key={offer.id} className="pl-2 basis-9/10 sm:basis-3/4 lg:basis-1/2">
              <Link to={offer.link}>
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0 relative">
                    <div className="relative group h-40">
                      <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        loading="lazy" 
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${offer.color} opacity-75`}>
                        <div className="absolute bottom-4 right-4 text-white text-right">
                          <h3 className="text-xl font-bold drop-shadow-md">{offer.title}</h3>
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
          <CarouselPrevious className="bg-black/70 backdrop-blur-sm hover:bg-black border-gray-700 text-white" />
          <CarouselNext className="bg-black/70 backdrop-blur-sm hover:bg-black border-gray-700 text-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default Offers;
