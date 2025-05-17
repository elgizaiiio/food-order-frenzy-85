
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useUserProfile } from '@/hooks/useUserData';
import Categories from '@/components/Categories';
import PopularRestaurants from '@/components/PopularRestaurants';
import { MapPin, ChevronDown, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user } = useAuth();
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // الحصول على اسم المستخدم من البريد الإلكتروني أو عرض تحية عامة
  const firstName = userProfile?.name || (user?.email ? user.email.split('@')[0] : 'صديقي');
  
  // بيانات العناوين - في تطبيق حقيقي ستأتي من API
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة', 'المركز التجاري']);

  const handleQuickOrder = () => {
    navigate('/restaurants');
    toast({
      title: "تم الانتقال إلى المطاعم",
      description: "يمكنك اختيار مطعمك المفضل الآن",
    });
  };
  
  // الحصول على صورة الملف الشخصي
  const profileImage = userProfile?.profile_image || userProfile?.avatar_url || null;

  return (
    <div className="min-h-screen bg-gray-50 pb-16" dir="rtl">
      <div className="max-w-md mx-auto bg-gray-50">
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
                    <Button 
                      variant="outline" 
                      className="w-full text-xs mt-2 text-orange-700 border-orange-300 hover:bg-orange-50 hover:border-orange-400"
                      onClick={() => navigate('/addresses/new')}
                    >
                      أضف عنوان جديد
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">أهلاً {firstName}!</h1>
              <p className="text-white/90 mt-1 text-sm">عايز تطلب إيه النهاردة؟</p>
            </div>
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all overflow-hidden">
                {profileLoading ? (
                  <Skeleton className="h-full w-full rounded-full" />
                ) : profileImage ? (
                  <Avatar className="h-full w-full">
                    <AvatarImage 
                      src={profileImage} 
                      alt={firstName}
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback className="text-white font-bold text-lg">
                      {firstName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="text-white font-bold text-lg bg-transparent">
                      {firstName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </Link>
          </div>

          <Button 
            variant="outline"
            className="w-full mt-4 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-medium rounded-full flex items-center justify-center gap-2"
            onClick={handleQuickOrder}
          >
            <ShoppingBag className="w-4 h-4" />
            اطلب الآن
          </Button>
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
      color: "from-orange-600 to-orange-700",
      link: "/restaurants"
    },
    {
      id: 2,
      title: "توصيل مجاني للطلبات فوق 100 ريال",
      image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=500&auto=format&fit=crop",
      color: "from-orange-500 to-orange-600",
      link: "/market"
    }
  ];
  
  return (
    <div className="py-3">
      <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {banners.map((banner, index) => (
          <Link
            key={banner.id}
            to={banner.link}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
