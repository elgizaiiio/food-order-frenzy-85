
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Categories from '@/components/Categories';
import { Search, MapPin, ChevronDown, Bell, Clock, Car } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // الحصول على اسم المستخدم من البريد الإلكتروني أو عرض تحية عامة
  const firstName = user?.email ? user.email.split('@')[0] : 'الزائر';
  
  // بيانات العناوين - في تطبيق حقيقي ستأتي من API
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة، جدة', 'حي العليا، الرياض']);

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with talabat styling */}
        <div className="p-6 bg-orange-500 text-white rounded-b-3xl shadow-lg">
          {/* تحديد العنوان */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-orange-100">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">التوصيل إلى</span>
            </div>
            
            <div className="flex items-center justify-between w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="h-auto p-0 mx-1 flex items-center gap-1.5 text-white hover:text-orange-100">
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
                      إضافة عنوان جديد
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
              <h1 className="text-2xl font-bold">مرحباً {firstName}!</h1>
              <p className="text-orange-100 mt-1">ماذا تريد اليوم؟</p>
            </div>
            <Link to="/profile">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-inner hover:bg-white/30 transition-all">
                {user?.email ? (
                  <span className="text-white font-bold text-xl">{user.email.charAt(0).toUpperCase()}</span>
                ) : (
                  <span className="text-white font-bold">؟</span>
                )}
              </div>
            </Link>
          </div>
          
          {/* Quick Search Bar */}
          <div className="mt-4 relative">
            <Input 
              type="text"
              placeholder="ابحث عن مطعم، مقهى، وجبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 pr-12 rounded-xl bg-white/10 text-white placeholder:text-orange-100 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="absolute top-1/2 right-4 -translate-y-1/2 text-orange-100">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Banner Slider */}
        <BannerSlider />
        
        {/* Main Categories with enhanced styling */}
        <Categories />
        
        {/* Value Proposition */}
        <ValuePropositions />
        
        {/* Top Restaurants */}
        <TopRestaurants />
        
        {/* Special Offers */}
        <SpecialOffers />
      </div>
    </div>
  );
};

// مكون شرائح البانر
const BannerSlider = () => {
  const banners = [
    {
      id: 1,
      title: "خصم 30% على جميع المطاعم",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop",
      color: "from-orange-700 to-orange-900"
    },
    {
      id: 2,
      title: "توصيل مجاني للطلبات فوق 100 ج.م",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=500&auto=format&fit=crop",
      color: "from-orange-600 to-orange-800"
    }
  ];
  
  return (
    <div className="py-4 px-4">
      <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {banners.map(banner => (
          <div 
            key={banner.id}
            className="min-w-[280px] h-32 rounded-2xl overflow-hidden relative shadow-md flex-shrink-0"
          >
            <img 
              src={banner.image} 
              alt={banner.title} 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-tr ${banner.color} opacity-70`}></div>
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <h3 className="text-white text-xl font-bold text-center drop-shadow-md">{banner.title}</h3>
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
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      description: "وصول طلبك خلال 20-30 دقيقة"
    },
    {
      title: "خدمة مجانية",
      icon: <Car className="h-5 w-5 text-orange-500" />,
      description: "توصيل مجاني للطلبات فوق 50 ج.م"
    }
  ];
  
  return (
    <div className="px-4 py-3 mb-2 bg-white">
      <div className="flex justify-between gap-4">
        {values.map((value, index) => (
          <Card key={index} className="flex-1 border-none shadow-sm">
            <CardContent className="flex items-center p-3">
              <div className="bg-orange-100 p-2 rounded-full mr-3">
                {value.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm">{value.title}</h3>
                <p className="text-xs text-gray-600">{value.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// مكون المطاعم المميزة
const TopRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "مطعم المندي",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
      rating: 4.8,
      category: "مندي",
      deliveryTime: "25-35 د",
      deliveryFee: "مجاناً"
    },
    {
      id: 2,
      name: "كنتاكي",
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=300&auto=format&fit=crop",
      rating: 4.5,
      category: "دجاج",
      deliveryTime: "15-25 د",
      deliveryFee: "10 ج.م"
    },
    {
      id: 3,
      name: "برجر كينج",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
      rating: 4.6,
      category: "برجر",
      deliveryTime: "20-30 د",
      deliveryFee: "مجاناً"
    }
  ];
  
  return (
    <div className="py-6 bg-white mt-2">
      <div className="flex justify-between items-center mb-4 px-4">
        <Link to="/restaurants" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          عرض الكل
        </Link>
        <h2 className="text-xl font-bold text-gray-900">مطاعم قريبة منك</h2>
      </div>
      
      <div className="scroll-container px-4 no-scrollbar">
        {restaurants.map((restaurant, index) => (
          <Card 
            key={restaurant.id} 
            className="w-64 flex-shrink-0 border-none shadow-sm hover:shadow-md transition-all animate-fade-in"
            style={{animationDelay: `${index * 100}ms`}}
          >
            <div className="relative h-36">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover rounded-t-xl" 
              />
              <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {restaurant.rating}
              </div>
            </div>
            
            <CardContent className="p-3">
              <h3 className="font-bold text-gray-900 mb-1">{restaurant.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{restaurant.category}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 ml-1" />
                  {restaurant.deliveryTime}
                </div>
                <div>{restaurant.deliveryFee}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// مكون العروض الخاصة 
const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "خصم 30%",
      description: "على جميع الوجبات من ماكدونالدز",
      image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "اشترِ 1 واحصل على 1 مجاناً",
      description: "من بيتزا هت على جميع البيتزا",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop",
    }
  ];
  
  return (
    <div className="py-6 bg-white mt-2">
      <div className="flex justify-between items-center mb-4 px-4">
        <Link to="/offers" className="text-sm font-medium text-orange-500 hover:text-orange-600">
          عرض الكل
        </Link>
        <h2 className="text-xl font-bold text-gray-900">عروض خاصة</h2>
      </div>
      
      <div className="scroll-container px-4 no-scrollbar">
        {offers.map((offer, index) => (
          <Card 
            key={offer.id} 
            className="w-72 flex-shrink-0 border-none shadow-sm hover:shadow-md transition-all overflow-hidden animate-fade-in"
            style={{animationDelay: `${index * 100 + 300}ms`}}
          >
            <div className="relative h-40">
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-4 right-4 text-white text-right">
                  <h3 className="text-xl font-bold">{offer.title}</h3>
                  <p className="text-sm mt-1">{offer.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Download App Banner */}
      <div className="mt-8 mx-4">
        <Card className="border-none overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="p-5 text-white">
            <h3 className="text-xl font-bold mb-2">احصل على تجربة أفضل</h3>
            <p className="text-sm mb-4">حمل تطبيق طلبات الآن واستمتع بمزايا حصرية</p>
            <Button className="bg-white text-orange-600 hover:bg-orange-50">
              تحميل التطبيق
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
