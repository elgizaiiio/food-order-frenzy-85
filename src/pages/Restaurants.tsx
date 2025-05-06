
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Filter, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Restaurants: React.FC = () => {
  // Food category data
  const foodCategories = [
    { id: 1, name: "حلويات", icon: "🍰" },
    { id: 2, name: "شاورما", icon: "🌯" },
    { id: 3, name: "برجر", icon: "🍔" },
    { id: 4, name: "ساندوتشات", icon: "🥪" },
    { id: 5, name: "بيتزا", icon: "🍕" },
    { id: 6, name: "كافيه", icon: "☕" },
    { id: 7, name: "دجاج", icon: "🍗" },
    { id: 8, name: "عصائر", icon: "🧃" },
    { id: 9, name: "كريب", icon: "🥞" },
    { id: 10, name: "دجاج مقلي", icon: "🍳" },
    { id: 11, name: "إفطار", icon: "🍳" },
    { id: 12, name: "أخرى", icon: "🍽️" },
  ];

  // Filter options
  const filters = [
    { id: 1, name: "العروض", active: true },
    { id: 2, name: "الأعلى تقييمًا", active: false },
    { id: 3, name: "التوصيل السريع", active: false },
  ];

  // Restaurant data
  const restaurants = [
    {
      id: 1,
      name: "مطعم الشرق",
      logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
      cover: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      deliveryTime: "25-35",
      tags: ["شاورما", "برجر", "دجاج"],
      promo: "خصم 20٪ على الطلب الأول",
    },
    {
      id: 2,
      name: "برجر كينج",
      logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
      cover: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      deliveryTime: "20-30",
      tags: ["برجر", "بطاطس", "وجبات سريعة"],
      promo: "اشترِ وجبة واحصل على الثانية مجانًا",
    },
    {
      id: 3,
      name: "بيتزا هت",
      logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
      cover: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      deliveryTime: "30-40",
      tags: ["بيتزا", "باستا", "سلطات"],
      promo: "توصيل مجاني للطلبات فوق 100 ريال",
    },
  ];

  // Promotions data
  const promotions = [
    {
      id: 1,
      title: "خصم 30٪ على البرجر",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      restaurantName: "برجر كينج",
      endDate: "ينتهي في 3 أيام",
    },
    {
      id: 2,
      title: "توصيل مجاني",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      restaurantName: "بيتزا هت",
      endDate: "ينتهي اليوم",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with back button */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">كل المطاعم</h1>
          <button className="p-2 rounded-full bg-gray-100">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Food Categories */}
        <div className="px-4 py-3">
          <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            {foodCategories.map((category) => (
              <div key={category.id} className="flex flex-col items-center flex-shrink-0">
                <div className="food-category-circle bg-gray-100 flex items-center justify-center w-16 h-16 rounded-full mb-1">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <span className="text-xs font-medium text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Promotions Section */}
        <div className="px-4 py-3">
          <h2 className="text-lg font-bold mb-3">عروض</h2>
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
            {promotions.map((promo) => (
              <div key={promo.id} className="min-w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-sm border">
                <img src={promo.image} alt={promo.title} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold">{promo.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{promo.restaurantName}</p>
                  <p className="text-xs text-red-500 mt-1">{promo.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 flex justify-around border-b">
          {filters.map((filter) => (
            <Button 
              key={filter.id} 
              variant={filter.active ? "default" : "ghost"} 
              className={`rounded-full ${filter.active ? 'bg-brand-500' : ''}`}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Restaurant List */}
        <div className="px-4 py-3">
          {restaurants.map((restaurant) => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
              <Card className="mb-4 overflow-hidden">
                <div className="relative">
                  <img src={restaurant.cover} alt={restaurant.name} className="w-full h-40 object-cover" />
                  {restaurant.promo && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      {restaurant.promo}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={restaurant.logo} alt="logo" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div>
                        <h3 className="font-bold text-lg">{restaurant.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {restaurant.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs text-gray-500">{tag}{idx !== restaurant.tags.length - 1 && ' • '}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{restaurant.deliveryTime} دقيقة</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
