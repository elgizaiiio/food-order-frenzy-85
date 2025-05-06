
import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type Place = {
  id: number;
  name: string;
  image: string;
  rating: number;
  category: string;
  deliveryTime: string;
  deliveryFee: string;
};

const PopularPlaces: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const places: Place[] = [
    {
      id: 1,
      name: "بيتزا هت",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&fit=crop",
      rating: 4.8,
      category: "بيتزا",
      deliveryTime: "25-35 دقيقة",
      deliveryFee: "15 ر.س"
    },
    {
      id: 2,
      name: "ماكدونالدز",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&fit=crop",
      rating: 4.6,
      category: "برجر",
      deliveryTime: "15-25 دقيقة",
      deliveryFee: "10 ر.س"
    },
    {
      id: 3,
      name: "كنتاكي",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=500&fit=crop",
      rating: 4.5,
      category: "دجاج",
      deliveryTime: "20-30 دقيقة",
      deliveryFee: "12 ر.س"
    },
    {
      id: 4,
      name: "ستاربكس",
      image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&fit=crop",
      rating: 4.7,
      category: "قهوة",
      deliveryTime: "15-20 دقيقة",
      deliveryFee: "8 ر.س"
    },
    {
      id: 5,
      name: "صب واي",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=500&fit=crop",
      rating: 4.4,
      category: "ساندويتشات",
      deliveryTime: "20-35 دقيقة",
      deliveryFee: "14 ر.س"
    }
  ];

  return (
    <div className="px-4 mb-8 animate-fade-in animate-delay-2">
      <h2 className="text-xl font-bold mb-4 text-right">يلا اكتشف الأماكن الرائجة</h2>
      <div className="scroll-container">
        {places.map((place) => (
          <Link to={`/restaurant/${place.id}`} key={place.id} className="place-card w-64">
            <div className="relative h-40">
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-0.5 text-xs font-medium shadow-sm">
                {place.category}
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{place.name}</h3>
                <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-full">
                  <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-xs font-bold">{place.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-gray-500 text-xs">
                <span>{place.deliveryTime}</span>
                <span>{place.deliveryFee}</span>
              </div>
              
              <Button 
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-white"
                size="sm"
              >
                اطلب الآن
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
