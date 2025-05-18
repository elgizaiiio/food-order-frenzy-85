
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useUserProfile } from '@/hooks/useUserData';
import Categories from '@/components/Categories';
import PopularRestaurants from '@/components/PopularRestaurants';
import Offers from '@/components/Offers';
import { MapPin, ChevronDown, ShoppingBag, Search, Bell, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useHomePromos } from '@/hooks/useHomeData';

const Index = () => {
  const { user } = useAuth();
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: promos } = useHomePromos();
  const [greeting, setGreeting] = useState('أهلاً');
  const [scrolled, setScrolled] = useState(false);
  
  // التحكم في تأثيرات التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // الحصول على اسم المستخدم من البروفايل أو البريد الإلكتروني
  const firstName = userProfile?.name || (user?.email ? user.email.split('@')[0] : 'صديقي');
  
  // بيانات العناوين - في تطبيق حقيقي ستأتي من API
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة', 'المركز التجاري']);

  // تحديد التحية بناءً على وقت اليوم
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      setGreeting('صباح الخير');
    } else if (hours >= 12 && hours < 17) {
      setGreeting('ظهر الخير');
    } else if (hours >= 17 && hours < 22) {
      setGreeting('مساء الخير');
    } else {
      setGreeting('ليلة طيبة');
    }
  }, []);

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
    <div className="min-h-screen pb-16 bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto">
        {/* Header with improved styling */}
        <header className={`${scrolled ? 'py-4' : 'pt-6 pb-6'} bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 rounded-b-3xl shadow-lg relative overflow-hidden transition-all duration-300 z-20`}>
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" className="w-full h-full transform rotate-180">
              <path fill="#ffffff" fillOpacity="0.7" 
                d="M0,200L60,186.7C120,173,240,147,360,154.7C480,163,600,205,720,202.7C840,200,960,153,1080,149.3C1200,147,1320,187,1380,207.3L1440,227L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
              </path>
            </svg>
          </div>
          
          {/* تحديد العنوان */}
          <div className={`flex items-center justify-between ${scrolled ? 'mb-2' : 'mb-3'} text-sm relative`}>
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">التوصيل إلى</span>
            </div>
            
            <div className="flex items-center justify-between w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-auto p-0 mx-1 flex items-center gap-1.5 text-white hover:text-white/90 hover:bg-white/10">
                    <span className="font-medium">{address}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64" align="start">
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
          
          <div className={`flex justify-between items-center relative z-10 ${scrolled ? 'mb-3' : 'mb-4'}`}>
            <div>
              <h1 className={`${scrolled ? 'text-xl' : 'text-2xl'} font-bold text-white mb-1 transition-all`}>{greeting} {firstName}!</h1>
              <p className={`text-white/90 ${scrolled ? 'text-xs' : 'text-sm'} transition-all`}>عايز تطلب إيه النهاردة؟</p>
            </div>
            <Link to="/profile">
              <div className="relative">
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
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white animate-pulse">
                  2
                </div>
              </div>
            </Link>
          </div>

          <div className={`flex items-center gap-2 ${scrolled ? 'mt-0' : 'mt-5'} relative z-10 transition-all`}>
            <div className="flex-1 relative">
              <Input 
                type="text" 
                placeholder="ابحث عن مطاعم، صيدليات، ..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/20 border-none pr-10 text-white placeholder:text-white/70 focus-visible:ring-white/30"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          {!scrolled && (
            <div className="flex gap-2 mt-4 relative z-10 animate-fade-in">
              <Button 
                variant="secondary"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-none shadow-none"
                onClick={() => navigate('/restaurants')}
              >
                <ShoppingBag className="w-4 h-4 mr-1" />
                اطلب طعام
              </Button>
              <Button 
                variant="secondary"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-none shadow-none"
                onClick={() => navigate('/market')}
              >
                <ShoppingBag className="w-4 h-4 mr-1" />
                سوبر ماركت
              </Button>
              <Button 
                variant="secondary"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-none shadow-none"
                onClick={() => navigate('/pharmacy')}
              >
                <ShoppingBag className="w-4 h-4 mr-1" />
                صيدلية
              </Button>
            </div>
          )}
        </header>
        
        {/* Main Content with improved styling */}
        <main className="px-4 pt-4">
          {/* الاقسام الرئيسية */}
          <Categories />
          
          {/* عروض خاصة */}
          <div className="mt-4">
            <Offers />
          </div>

          {/* Featured Promos */}
          <div className="mt-4 bg-white rounded-xl p-4 shadow-sm animate-fade-in animate-delay-3">
            <div className="flex justify-between items-center mb-4">
              <Link to="/services" className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center">
                عرض الكل <ArrowRight className="h-4 w-4 mr-1 rtl:rotate-180" />
              </Link>
              <h2 className="text-xl font-bold text-gray-800">عروض مميزة</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {(promos || []).slice(0, 4).map((promo: any, index: number) => (
                <Card 
                  key={promo.id} 
                  className="overflow-hidden border-none shadow-sm hover:shadow-md transition-duration-300 cursor-pointer animate-fade-in" 
                  style={{animationDelay: `${index * 100 + 200}ms`}}
                  onClick={() => navigate(promo.link)}
                >
                  <CardContent className="p-3 relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient} opacity-90 rounded-lg -z-10`}></div>
                    <div className={`${promo.iconBg} p-2 rounded-lg mb-2 inline-block`}>
                      {/* Icon would be dynamically rendered here */}
                    </div>
                    <h3 className={`font-bold ${promo.textColor}`}>{promo.title}</h3>
                    <p className={`text-xs ${promo.textColor} opacity-90`}>{promo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Restaurants */}
          <div className="mt-5">
            <PopularRestaurants />
          </div>
          
          {/* Delivery Section */}
          <div className="mt-5 mb-10 animate-fade-in animate-delay-4">
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 text-white">
                <h2 className="text-xl font-bold mb-1">خدمة التوصيل السريع</h2>
                <p className="text-sm text-white/90">اطلب أي شيء، نوصله لك</p>
              </div>
              <CardContent className="p-4 bg-gradient-to-b from-white to-orange-50">
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Badge className="bg-orange-500 hover:bg-orange-600 mb-2">وصل خلال 30 دقيقة</Badge>
                    <p className="text-sm text-gray-600 mb-4">نوصل لك كل طلباتك بسرعة وأمان لأي مكان</p>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => navigate('/delivery-request')}>
                      اطلب توصيل الآن
                    </Button>
                  </div>
                  <div className="w-32 h-32">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/2037/2037380.png" 
                      alt="خدمة التوصيل"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
