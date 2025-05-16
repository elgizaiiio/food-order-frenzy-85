
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Categories from '@/components/Categories';
import PopularRestaurants from '@/components/PopularRestaurants';
import { Search, MapPin, ChevronDown } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-gray-50 pb-20">
        {/* Header with improved styling */}
        <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-b-3xl shadow-xl py-4 px-4">
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
              
              {/* تم إزالة زر الإشعارات هنا */}
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">أهلاً {firstName}!</h1>
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
          
          {/* Improved Search Bar */}
          <div className="mt-3 relative">
            <Input 
              type="text"
              placeholder="مطعم، بقالة، أدوية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-4 pr-10 rounded-full bg-white/15 border border-white/25 text-white placeholder:text-white/70 focus:border-white/40 focus:ring-1 focus:ring-white/30"
            />
            <button className="absolute top-1/2 right-3 -translate-y-1/2 text-white/80 hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </header>
        
        {/* الاقسام الرئيسية مع أيقونات دائرية */}
        <div className="px-4 mt-6">
          <Categories />
        </div>
        
        {/* Main Content with improved styling */}
        <main className="px-4">
          {/* Banner Slider with improved styling */}
          <BannerSlider />
          
          {/* Popular Restaurants */}
          <PopularRestaurants />
        </main>
      </div>
    </div>
  );
};

// مكون شرائح البانر محسن
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
            className="min-w-[280px] h-32 rounded-2xl overflow-hidden relative shadow-md hover:shadow-lg transition-all flex-shrink-0 animate-fade-in"
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

export default Index;
