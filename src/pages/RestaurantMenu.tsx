
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Search, Share2, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RestaurantMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedCategory, setSelectedCategory] = useState('popular');

  // Mock restaurant data - in a real app, this would come from an API or Supabase
  const restaurant = {
    id: parseInt(id || '1'),
    name: "مطعم الشرق",
    logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
    cover: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    deliveryTime: "25-35",
    deliveryFee: "10 ريال",
    cuisine: "شرقي، عربي، مشويات",
    categories: [
      { id: "popular", name: "الأكثر طلبًا" },
      { id: "offers", name: "العروض" }, 
      { id: "fish", name: "الأسماك" }, 
      { id: "chicken", name: "الدجاج" }, 
      { id: "sides", name: "إضافات" },
    ],
    items: [
      {
        id: 1,
        name: "شاورما دجاج سبيشال",
        description: "شاورما دجاج مع صوص خاص وخضروات",
        price: 25,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        category: "popular",
        popular: true,
      },
      {
        id: 2,
        name: "سمك مشوي",
        description: "سمك طازج مشوي مع الخضار والأرز",
        price: 45,
        image: "https://images.unsplash.com/photo-1611599538835-b52a8c2af7fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
        category: "fish",
      },
      {
        id: 3,
        name: "سلطة الشيف",
        description: "سلطة طازجة مع صلصة خاصة",
        price: 15,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        category: "sides",
      },
      {
        id: 4,
        name: "برجر لحم مشوي",
        description: "برجر لحم مشوي مع جبن وخضروات طازجة",
        price: 30,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        category: "popular",
        popular: true,
        offer: "خصم 20٪",
      },
      {
        id: 5,
        name: "دجاج مشوي",
        description: "دجاج مشوي مع الأعشاب والثوم",
        price: 40,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
        category: "chicken",
      },
    ]
  };

  // Filter items by selected category
  const filteredItems = restaurant.items.filter(item => 
    selectedCategory === 'popular' ? item.popular : item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Cover Image with Header */}
        <div className="relative">
          <img 
            src={restaurant.cover} 
            alt={restaurant.name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex justify-between items-start p-4">
              <Link to="/restaurants" className="p-2 rounded-full bg-white/30 backdrop-blur-sm">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-white/30 backdrop-blur-sm">
                  <Search className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 rounded-full bg-white/30 backdrop-blur-sm">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="relative px-4 pb-3 border-b">
          <div className="flex items-start mt-3">
            <img 
              src={restaurant.logo} 
              alt={restaurant.name} 
              className="w-16 h-16 rounded-lg border-4 border-white shadow-sm object-cover -mt-8"
            />
            <div className="ml-3">
              <h1 className="text-xl font-bold">{restaurant.name}</h1>
              <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{restaurant.deliveryTime} دقيقة</span>
                </div>
                <div className="text-sm text-gray-500">
                  التوصيل: {restaurant.deliveryFee}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="border-b">
          <div className="flex overflow-x-auto gap-1 py-3 px-4 no-scrollbar">
            {restaurant.categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`whitespace-nowrap rounded-full ${selectedCategory === category.id ? 'bg-brand-500' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex gap-3 border-b py-3">
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">{item.price} ريال</span>
                  <Button size="sm" variant="outline" className="rounded-full">
                    إضافة +
                  </Button>
                </div>
              </div>
              <div className="relative w-24 h-24 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full rounded-lg object-cover" />
                {item.offer && (
                  <Badge className="absolute top-1 right-1 text-xs bg-red-500">{item.offer}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Cart Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
          <Button className="w-full py-6 text-lg rounded-xl">
            <ShoppingBag className="mr-2" />
            اطّلع على سلتك
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
