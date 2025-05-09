
import React from 'react';
import { Star, Clock, BadgePercent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Place = {
  id: number;
  name: string;
  image: string;
  rating: number;
  category: string;
  deliveryTime: string;
  deliveryFee: string;
  discount?: string;
  isNew?: boolean;
};

const PopularPlaces: React.FC = () => {
  const navigate = useNavigate();
  
  // بيانات الأماكن الرائجة - في تطبيق حقيقي ستأتي من API
  const places: Place[] = [
    {
      id: 1,
      name: "بيتزا هت",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&fit=crop",
      rating: 4.8,
      category: "بيتزا",
      deliveryTime: "25-35 دقيقة",
      deliveryFee: "15 ج.م",
      discount: "خصم 20%"
    },
    {
      id: 2,
      name: "ماكدونالدز",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&fit=crop",
      rating: 4.6,
      category: "برجر",
      deliveryTime: "15-25 دقيقة",
      deliveryFee: "10 ج.م"
    },
    {
      id: 3,
      name: "كنتاكي",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=500&fit=crop",
      rating: 4.5,
      category: "دجاج",
      deliveryTime: "20-30 دقيقة",
      deliveryFee: "12 ج.م",
      isNew: true
    },
    {
      id: 4,
      name: "ستاربكس",
      image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&fit=crop",
      rating: 4.7,
      category: "قهوة",
      deliveryTime: "15-20 دقيقة",
      deliveryFee: "8 ج.م"
    },
    {
      id: 5,
      name: "صب واي",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=500&fit=crop",
      rating: 4.4,
      category: "ساندويتشات",
      deliveryTime: "20-35 دقيقة",
      deliveryFee: "14 ج.م",
      discount: "توصيل مجاني"
    }
  ];

  const navigateToRestaurant = (id: number) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="px-4 mb-8 animate-fade-in animate-delay-2">
      <div className="flex justify-between items-center mb-4">
        <button className="text-sm text-blue-600 font-medium hover:underline">عرض الكل</button>
        <h2 className="text-xl font-bold text-right text-blue-900">الأماكن الرائجة</h2>
      </div>
      
      <div className="scroll-container">
        {places.map((place, index) => (
          <Card 
            key={place.id} 
            onClick={() => navigateToRestaurant(place.id)}
            className="w-72 cursor-pointer overflow-hidden border-blue-100 hover:border-blue-300 hover:shadow-md shadow-sm transition-all duration-300 flex-shrink-0 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-44">
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {place.discount && (
                <Badge className="absolute top-3 left-3 bg-blue-600 text-white border-0">
                  <BadgePercent className="w-3.5 h-3.5 mr-1" /> {place.discount}
                </Badge>
              )}
              {place.isNew && (
                <Badge className="absolute top-3 left-3 bg-green-600 text-white border-0">
                  جديد
                </Badge>
              )}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-medium text-blue-800 shadow-sm">
                {place.category}
              </div>
            </div>
            
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-0.5 bg-blue-50 px-2 py-0.5 rounded-full">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-xs font-bold text-blue-900">{place.rating}</span>
                </div>
                <h3 className="text-lg font-medium text-blue-800">{place.name}</h3>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-blue-600 text-xs">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{place.deliveryTime}</span>
                </div>
                <span className="font-medium">{place.deliveryFee}</span>
              </div>
              
              <Button 
                className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-sm"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToRestaurant(place.id);
                }}
              >
                اطلب الآن
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
