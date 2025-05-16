
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Categories from '@/components/Categories';
import Offers from '@/components/ui/Offers';
import PopularPlaces from '@/components/ui/PopularPlaces';
import Promos from '@/components/ui/Promos';
import { Search, MapPin, ChevronDown, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Index = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // الحصول على اسم المستخدم من البريد الإلكتروني أو عرض تحية عامة
  const firstName = user?.email ? user.email.split('@')[0] : 'الزائر';
  
  // بيانات العناوين - في تطبيق حقيقي ستأتي من API
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة، جدة', 'حي العليا، الرياض']);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with enhanced styling */}
        <div className="p-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-b-3xl shadow-lg">
          {/* تحديد العنوان */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-1.5 text-blue-100">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">التوصيل إلى</span>
            </div>
            
            <div className="flex items-center justify-between w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="h-auto p-0 mx-1 flex items-center gap-1.5 text-white hover:text-blue-100">
                    <span className="font-medium">{address}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60" align="start">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-blue-900">العناوين المحفوظة</h4>
                    {savedAddresses.map((addr, idx) => (
                      <Button 
                        key={idx} 
                        variant="ghost" 
                        className="w-full justify-start text-sm hover:bg-blue-50 hover:text-blue-700" 
                        onClick={() => setAddress(addr)}
                      >
                        <MapPin className="w-4 h-4 ml-2 text-blue-500" />
                        {addr}
                      </Button>
                    ))}
                    <Button variant="outline" className="w-full text-xs mt-2 text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-400">
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
              <p className="text-blue-100 mt-1">ماذا تريد اليوم؟</p>
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
              placeholder="ابحث عن خدمة، منتج، مطعم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 pr-12 rounded-xl bg-white/10 text-white placeholder:text-blue-100 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="absolute top-1/2 right-4 -translate-y-1/2 text-blue-100">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Banner Slider */}
        <BannerSlider />
        
        {/* Main Categories with enhanced styling */}
        <Categories />
        
        {/* Offers Section */}
        <div className="px-4 pb-6">
          <Offers />
        </div>
        
        {/* Popular Places */}
        <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mx-4">
          <PopularPlaces />
        </div>
        
        {/* Promotional Cards */}
        <div className="px-4 py-6">
          <Promos />
        </div>
      </div>
    </div>
  );
};

// مكون شرائح البانر الجديد
const BannerSlider = () => {
  const banners = [
    {
      id: 1,
      title: "خصم 30% على جميع المطاعم",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop",
      color: "from-blue-700 to-blue-900"
    },
    {
      id: 2,
      title: "توصيل مجاني للطلبات فوق 100 ج.م",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=500&auto=format&fit=crop",
      color: "from-indigo-700 to-indigo-900"
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

export default Index;
