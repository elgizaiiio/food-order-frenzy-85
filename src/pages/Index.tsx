
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import Categories from '@/components/Categories';
import Offers from '@/components/Offers';
import Promos from '@/components/Promos';
import PopularRestaurants from '@/components/PopularRestaurants';
import PopularPlaces from '@/components/PopularPlaces';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, UtensilsCrossed, ShoppingBag, PlusSquare, Coffee } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  
  const deliveryOptions = [
    {
      icon: <Package className="h-8 w-8 text-white" />,
      title: "توصيل طلبات",
      description: "توصيل من أي مكان إلى باب منزلك",
      color: "from-orange-600 to-orange-500",
      action: () => navigate('/delivery-request')
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-white" />,
      title: "طلب طعام",
      description: "وجبات شهية من أفضل المطاعم",
      color: "from-red-600 to-red-500",
      action: () => navigate('/restaurants')
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-white" />,
      title: "سوبر ماركت",
      description: "كل احتياجاتك اليومية",
      color: "from-blue-600 to-blue-500",
      action: () => navigate('/market')
    },
    {
      icon: <PlusSquare className="h-8 w-8 text-white" />,
      title: "صيدلية",
      description: "الأدوية والمستلزمات الطبية",
      color: "from-green-600 to-green-500",
      action: () => navigate('/pharmacy')
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar />
      <Header />

      {/* خيارات التوصيل الرئيسية */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">خدمات التوصيل</h2>
        <div className="grid grid-cols-2 gap-3">
          {deliveryOptions.map((option, index) => (
            <Card 
              key={index}
              className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
              onClick={option.action}
            >
              <div className={`bg-gradient-to-r ${option.color} p-3 flex justify-center`}>
                <div className="rounded-full bg-white/20 p-2">
                  {option.icon}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-800">{option.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{option.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <Categories />
      </div>

      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <Link to="/bro" className="text-sm font-medium text-orange-500">اشترك الآن</Link>
          <h2 className="text-xl font-bold">dam Pro</h2>
        </div>
        <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
          <div className="p-5">
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <h3 className="text-2xl font-bold mb-1">اشترك في dam Pro</h3>
                <p className="text-indigo-100 text-sm">احصل على توصيل مجاني + خصومات حصرية</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-full py-2 px-4 text-xs">
                خصم 50%
              </div>
            </div>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 w-full">
              اشترك الآن بـ 19.99 ريال/الشهر
            </Button>
          </div>
        </Card>
      </div>

      <div className="mb-4">
        <Offers />
      </div>

      <div className="mb-4">
        <PopularRestaurants />
      </div>

      <Promos />
      <PopularPlaces />
    </div>
  );
}
