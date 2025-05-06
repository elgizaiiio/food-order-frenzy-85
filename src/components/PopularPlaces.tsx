
import React from 'react';
import { Star } from 'lucide-react';

type Place = {
  id: number;
  name: string;
  image: string;
  rating: number;
  category: string;
};

const PopularPlaces: React.FC = () => {
  const places: Place[] = [
    {
      id: 1,
      name: "بيتزا هت",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
      rating: 4.8,
      category: "بيتزا"
    },
    {
      id: 2,
      name: "ماكدونالدز",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
      rating: 4.6,
      category: "برجر"
    },
    {
      id: 3,
      name: "كنتاكي",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=300&auto=format&fit=crop",
      rating: 4.5,
      category: "دجاج"
    },
    {
      id: 4,
      name: "ستاربكس",
      image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=300&auto=format&fit=crop",
      rating: 4.7,
      category: "قهوة"
    },
    {
      id: 5,
      name: "صب واي",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=300&auto=format&fit=crop",
      rating: 4.4,
      category: "ساندويتشات"
    }
  ];

  return (
    <div className="px-4 mb-8">
      <h2 className="text-xl font-bold mb-4 text-right">يلا اكتشف الأماكن الرائجة</h2>
      <div className="popular-places-scroll">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <div className="relative h-32">
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-0.5 text-xs font-medium">
                {place.category}
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-base font-medium">{place.name}</h3>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                <span className="text-sm ml-1">{place.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
