
import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ChevronLeft, Star, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useHomeOffers } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';

const Offers: React.FC = () => {
  const { data: offers, isLoading, error } = useHomeOffers();

  // إذا كان هناك خطأ في تحميل العروض، نعرض رسالة الخطأ
  if (error) {
    return (
      <div className="talabat-section mb-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-500">
          <p>عذراً، حدث خطأ أثناء تحميل العروض. حاول مرة أخرى.</p>
        </div>
      </div>
    );
  }

  const staticOffers = [
    {
      id: 1,
      title: "مطعم شاورما العربي",
      description: "خصم 30% على جميع الوجبات",
      color: "from-orange-600/90 to-orange-800/70",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=500&auto=format&fit=crop",
      link: "/restaurant/1",
      rating: 4.8,
      deliveryTime: "20-30 دقيقة",
      discount: "خصم 30%",
      isFeatured: true
    },
    {
      id: 2,
      title: "كافيه لاتيه",
      description: "اشترِ 1 واحصل على 1 مجاناً",
      color: "from-orange-500/90 to-orange-700/70",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=500&auto=format&fit=crop",
      link: "/restaurant/2",
      rating: 4.5,
      deliveryTime: "15-25 دقيقة",
      discount: "1+1 مجاناً",
      isFeatured: true
    }
  ];

  // استخدم البيانات من API أو البيانات الثابتة إذا لم تكن البيانات جاهزة
  const displayOffers = offers && offers.length > 0 ? offers : staticOffers;
  
  // تصفية العروض المميزة
  const featuredOffers = displayOffers.filter((offer: any) => offer.isFeatured);

  return (
    <div className="talabat-section animate-fade-in animate-delay-2 bg-white rounded-xl shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <Link to="/offers" className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1">
          عرض الكل <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="flex items-center gap-2">
          <h2 className="talabat-section-title font-bold text-lg flex items-center">
            العروض المميزة
          </h2>
          <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 text-xs">
            <Tag className="h-3 w-3 ml-1" />
            حصري
          </Badge>
        </div>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-mr-2 ml-2">
          {isLoading ? (
            // عرض Skeleton أثناء التحميل
            Array(3).fill(0).map((_, i) => (
              <CarouselItem key={i} className="pl-2 basis-9/10 sm:basis-3/4 lg:basis-1/2">
                <Card className="overflow-hidden border-none shadow-md">
                  <CardContent className="p-0 relative">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full mt-2" />
                      <div className="flex justify-between mt-3">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            displayOffers.map((offer: any) => (
              <CarouselItem key={offer.id} className="pl-2 basis-9/10 sm:basis-3/4 lg:basis-1/2">
                <Link to={offer.link} className="block">
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-xl">
                    <CardContent className="p-0 relative">
                      <div className="relative group h-48">
                        <img 
                          src={offer.image} 
                          alt={offer.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          loading="lazy" 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${offer.color}`}>
                          {offer.discount && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-orange-500 hover:bg-orange-600 text-xs font-bold px-2 py-1">
                                {offer.discount}
                              </Badge>
                            </div>
                          )}
                          <div className="absolute bottom-0 right-0 left-0 p-4 text-white text-right">
                            <h3 className="text-xl font-bold drop-shadow-md">{offer.title}</h3>
                            <p className="text-sm drop-shadow-md max-w-xs mt-1">{offer.description}</p>
                            
                            <div className="flex justify-between items-center mt-3">
                              <Badge variant="outline" className="border-white/30 text-white flex items-center gap-1 bg-black/20 backdrop-blur-sm">
                                <Clock className="h-3 w-3" /> {offer.deliveryTime}
                              </Badge>
                              
                              {offer.rating && (
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-bold">{offer.rating}</span>
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="bg-white/80 backdrop-blur-sm hover:bg-white border-orange-100 text-orange-600" />
          <CarouselNext className="bg-white/80 backdrop-blur-sm hover:bg-white border-orange-100 text-orange-600" />
        </div>
      </Carousel>
      
      {/* Featured Offers Gallery */}
      {featuredOffers.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 p-0 flex items-center gap-1">
              عرض جميع العروض <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-sm font-bold text-gray-700">أفضل العروض</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featuredOffers.map((offer: any) => (
              <Link key={`featured-${offer.id}`} to={offer.link} className="block">
                <div className="relative rounded-xl overflow-hidden h-24 shadow-sm hover:shadow-md transition-all group">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${offer.color}`}>
                    {offer.discount && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px] py-0 px-1.5">
                          {offer.discount}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-0 p-2 text-white text-right w-full">
                      <h4 className="text-sm font-bold line-clamp-1">{offer.title}</h4>
                      <p className="text-xs line-clamp-1 text-white/90">{offer.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50 text-xs flex items-center gap-1 mx-auto">
              تصفح جميع العروض <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;
