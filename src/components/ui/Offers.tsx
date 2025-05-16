
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useHomeOffers } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';

const Offers: React.FC = () => {
  const { data: offers, isLoading } = useHomeOffers();
  
  return (
    <div className="px-4 mb-8 animate-fade-in animate-delay-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-900">عروض خاصة</h2>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-mr-2 ml-2">
          {isLoading ? (
            // عرض Skeleton أثناء التحميل
            Array(3).fill(0).map((_, i) => (
              <CarouselItem key={i} className="pl-2 basis-9/10 sm:basis-3/4 lg:basis-1/2">
                <Card className="overflow-hidden border-none">
                  <CardContent className="p-0">
                    <Skeleton className="h-52 w-full" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : offers && offers.length > 0 ? (
            offers.map(offer => (
              <CarouselItem key={offer.id} className="pl-2 basis-9/10 sm:basis-3/4 lg:basis-1/2">
                <Link to={offer.link}>
                  <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0 relative">
                      <div className="relative group h-52">
                        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        <div className={`absolute inset-0 bg-gradient-to-t ${offer.gradient} opacity-75`}>
                          <div className="absolute top-4 left-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-md">
                              <Tag size={14} className="text-blue-600 mr-1" />
                              <span className="font-bold text-xs text-blue-700">{offer.title}</span>
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
            ))
          ) : (
            <CarouselItem className="pl-2 basis-full">
              <div className="w-full h-32 flex items-center justify-center border border-dashed border-blue-300 rounded-lg">
                <p className="text-blue-500">لا توجد عروض متاحة حاليًا</p>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="bg-white/70 backdrop-blur-sm hover:bg-white border-blue-100 text-blue-700" />
          <CarouselNext className="bg-white/70 backdrop-blur-sm hover:bg-white border-blue-100 text-blue-700" />
        </div>
      </Carousel>
    </div>
  );
};

export default Offers;
