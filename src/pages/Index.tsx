
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Categories from '@/components/Categories';
import Offers from '@/components/Offers';
import PopularRestaurants from '@/components/PopularRestaurants';
import Promos from '@/components/ui/Promos';
import { Search, MapPin, ChevronDown, Bell, ShoppingBag, Clock, Car } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // الحصول على اسم المستخدم من البريد الإلكتروني أو عرض تحية عامة
  const firstName = user?.email ? user.email.split('@')[0] : 'صديقي';
  
  // بيانات العناوين - في تطبيق حقيقي ستأتي من API
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة', 'المركز التجاري']);

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <div className="max-w-md mx-auto bg-gray-100 pb-20">
        {/* Header with talabat styling */}
        <header className="talabat-header">
          {/* تحديد العنوان */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">التوصيل إلى</span>
            </div>
            
            <div className="flex items-center justify-between w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="h-auto p-0 mx-1 flex items-center gap-1.5 text-white hover:text-white/90">
                    <span className="font-medium">{address}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60" align="start">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900">العناوين المحفوظة</h4>
                    {savedAddresses.map((addr, idx) => (
                      <Button 
                        key={idx} 
                        variant="ghost" 
                        className="w-full justify-start text-sm hover:bg-orange-50 hover:text-orange-700" 
                        onClick={() => setAddress(addr)}
                      >
                        <MapPin className="w-4 h-4 ml-2 text-orange-500" />
                        {addr}
                      </Button>
                    ))}
                    <Button variant="outline" className="w-full text-xs mt-2 text-orange-700 border-orange-300 hover:bg-orange-50 hover:border-orange-400">
                      أضف عنوان جديد
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* زر الإشعارات */}
              <Link to="/notifications" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20">
                <Bell className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">أهلاً {firstName}!</h1>
              <p className="text-white/90 mt-1 text-sm">عايز تطلب إيه النهاردة؟</p>
            </div>
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all">
                {user?.email ? (
                  <span className="text-white font-bold text-lg">{user.email.charAt(0).toUpperCase()}</span>
                ) : (
                  <span className="text-white font-bold">؟</span>
                )}
              </div>
            </Link>
          </div>
          
          {/* Quick Search Bar */}
          <div className="mt-3 relative">
            <Input 
              type="text"
              placeholder="مطعم، بقالة، أدوية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-4 pr-10 rounded-lg search-input"
            />
            <button className="absolute top-1/2 right-3 -translate-y-1/2 text-white">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </header>
        
        {/* الاقسام الرئيسية */}
        <div className="px-4 mt-4">
          <Categories />
        </div>
        
        {/* Main Content */}
        <main className="px-4">
          {/* Banner Slider */}
          <BannerSlider />
          
          {/* Value Proposition */}
          <ValuePropositions />
          
          {/* Offers */}
          <Offers />
          
          {/* Popular Restaurants */}
          <PopularRestaurants />
          
          {/* Promos */}
          <Promos />
          
          {/* Download App Banner */}
          <DownloadAppBanner />
        </main>
      </div>
    </div>
  );
};

// مكون شرائح البانر
const BannerSlider = () => {
  const banners = [
    {
      id: 1,
      title: "خصم 30% على كل المطاعم",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop",
      color: "from-orange-600 to-orange-700"
    },
    {
      id: 2,
      title: "توصيل مجاني للطلبات فوق 100 ريال",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=500&auto=format&fit=crop",
      color: "from-orange-500 to-orange-600"
    }
  ];
  
  return (
    <div className="py-3">
      <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {banners.map((banner, index) => (
          <div 
            key={banner.id}
            className="min-w-[280px] h-28 rounded-xl overflow-hidden relative shadow-sm flex-shrink-0 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img 
              src={banner.image} 
              alt={banner.title} 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-tr ${banner.color} opacity-75`}></div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <h3 className="text-white text-lg font-bold text-center drop-shadow-md">{banner.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// مكون القيمة المقترحة
const ValuePropositions = () => {
  const values = [
    {
      title: "توصيل سريع",
      icon: <Clock className="h-4 w-4 text-orange-500" />,
      description: "خلال 20-30 دقيقة"
    },
    {
      title: "توصيل مجاني",
      icon: <Car className="h-4 w-4 text-orange-500" />,
      description: "للطلبات أكثر من 50 ريال"
    }
  ];
  
  return (
    <div className="talabat-section">
      <div className="flex justify-between gap-3">
        {values.map((value, index) => (
          <Card key={index} className="flex-1 border-none shadow-sm animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
            <CardContent className="flex items-center p-3">
              <div className="bg-orange-100 p-2 rounded-full ml-3">
                {value.icon}
              </div>
              <div className="text-right">
                <h3 className="font-bold text-sm">{value.title}</h3>
                <p className="text-xs text-gray-600 mt-0.5">{value.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// مكون تحميل التطبيق
const DownloadAppBanner = () => {
  return (
    <Card className="border-none overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 animate-fade-in animate-delay-4 mb-6">
      <div className="p-5 text-white">
        <h3 className="text-lg font-bold mb-2">عايز تجربة أفضل؟</h3>
        <p className="text-sm mb-4">نزل التطبيق واحصل على خصومات حصرية</p>
        <Button className="bg-white text-orange-600 hover:bg-orange-50">
          تحميل التطبيق
        </Button>
      </div>
    </Card>
  );
};

// مكون المطاعم المشهورة
const PopularRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "البيك",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
      rating: 4.8,
      category: "دجاج",
      deliveryTime: "25-35 د",
      deliveryFee: "مجاناً"
    },
    {
      id: 2,
      name: "برجر كنج",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
      rating: 4.6,
      category: "برجر",
      deliveryTime: "20-30 د",
      deliveryFee: "10 ر.س"
    },
    {
      id: 3,
      name: "كودو",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=300&auto=format&fit=crop",
      rating: 4.5,
      category: "شاورما",
      deliveryTime: "15-25 د",
      deliveryFee: "مجاناً"
    }
  ];
  
  return (
    <div className="talabat-section">
      <div className="flex justify-between items-center mb-3">
        <Link to="/restaurants" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          عرض الكل
        </Link>
        <h2 className="talabat-section-title">مطاعم قريبة منك</h2>
      </div>
      
      <div className="scroll-container no-scrollbar">
        {restaurants.map((restaurant, index) => (
          <Card 
            key={restaurant.id} 
            className="w-64 flex-shrink-0 border-none shadow-sm hover:shadow-md transition-all animate-fade-in restaurant-card"
            style={{animationDelay: `${index * 100}ms`}}
          >
            <div className="relative h-32">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover rounded-t-xl" 
              />
              <div className="absolute top-3 left-3 talabat-rating">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {restaurant.rating}
              </div>
            </div>
            
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <span className="talabat-badge">{restaurant.category}</span>
                <h3 className="font-bold text-gray-900 text-right">{restaurant.name}</h3>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-600 mt-3">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 ml-1" />
                  {restaurant.deliveryTime}
                </div>
                <div className="flex items-center">
                  <ShoppingBag className="w-3 h-3 ml-1" />
                  {restaurant.deliveryFee}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
