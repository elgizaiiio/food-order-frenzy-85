
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  MapPin, Search, UtensilsCrossed, ShoppingBag, 
  Pill, Brush, Dumbbell, ChevronDown, Bell
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useHomeCategories, useHomeOffers, usePopularPlaces } from '@/hooks/useHomeData';
import Categories from '@/components/Categories';
import Offers from '@/components/Offers';
import PopularPlaces from '@/components/ui/PopularPlaces';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Promos from '@/components/ui/Promos';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentAddress, setCurrentAddress] = useState('شارع التحرير');
  
  // تخصيص الأقسام حسب التبويب النشط
  const mainCategories = [
    { id: 'all', name: 'الكل' },
    { id: 'restaurants', name: 'مطاعم' },
    { id: 'market', name: 'بقالة' },
    { id: 'pharmacy', name: 'صيدليات' },
    { id: 'personal-care', name: 'مستلزمات' }
  ];

  // الحصول على اسم المستخدم
  const firstName = user?.email ? user.email.split('@')[0] : 'صديقي';
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* رأس الصفحة */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          {/* شريط العنوان */}
          <div className="flex items-center justify-between p-4 animate-fade-in">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 rounded-full bg-lime-50 flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5 text-lime-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">توصيل إلى</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{currentAddress}</span>
                  <ChevronDown className="w-4 h-4 mr-1 text-lime-600" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <Link to="/notifications" className="relative">
                <div className="w-10 h-10 rounded-full bg-lime-50 flex items-center justify-center shadow-sm">
                  <Bell className="w-5 h-5 text-lime-600" />
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">2</span>
              </Link>
              <Link to="/profile">
                <Avatar className="w-10 h-10 border-2 border-lime-100 shadow-sm">
                  {user?.email ? (
                    <AvatarImage src="" />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-lime-500 to-green-600 text-white text-sm">
                    {firstName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
          
          {/* شريط البحث */}
          <div className="px-4 pb-3 animate-fade-in" style={{animationDelay: "100ms"}}>
            <div className="relative">
              <Input 
                type="text"
                placeholder="ابحث عن مطعم أو بقالة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-12 bg-gray-100 border-0 rounded-xl focus-visible:ring-lime-500 shadow-sm"
              />
              <button className="absolute top-1/2 right-3 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* شريط التبويبات */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto no-scrollbar px-4">
              {mainCategories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-3 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                    activeTab === category.id 
                      ? 'border-lime-500 text-lime-600'
                      : 'border-transparent text-gray-500'
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </header>
        
        {/* المحتوى الرئيسي */}
        <main className="px-4">
          {/* قسم البانرات */}
          <section className="pt-4 pb-2 animate-fade-in" style={{animationDelay: "200ms"}}>
            <div className="overflow-x-auto flex gap-3 no-scrollbar pb-4">
              <Card className="min-w-[80%] h-40 rounded-2xl bg-gradient-to-r from-lime-500 to-green-600 border-0 overflow-hidden flex-shrink-0">
                <CardContent className="p-0 relative h-full">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop"
                    alt="عروض خاصة"
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">خصم 30% على أول طلب</h3>
                    <p className="text-sm mb-3 opacity-90">استمتع بتخفيضات حصرية على أشهر المطاعم</p>
                    <Button className="w-max bg-white text-lime-700 hover:bg-gray-100 rounded-full px-5 shadow-md font-medium">
                      اطلب الآن
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="min-w-[80%] h-40 rounded-2xl overflow-hidden flex-shrink-0 border-0" style={{animationDelay: "300ms"}}>
                <CardContent className="p-0 relative h-full">
                  <img
                    src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500&auto=format&fit=crop"
                    alt="توصيل سريع"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-5 text-white">
                    <h3 className="text-xl font-bold mb-1">توصيل سريع خلال 30 دقيقة</h3>
                    <p className="text-sm opacity-90 mb-2">من أقرب المطاعم والمتاجر إليك</p>
                    <Badge className="w-max bg-lime-500 hover:bg-lime-600 text-white border-0 px-3">جديد</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* فئات الرئيسية */}
          <Categories />
          
          {/* عروض خاصة */}
          <Offers />
          
          {/* الأقسام السريعة */}
          <section className="py-6 animate-fade-in" style={{animationDelay: "400ms"}}>
            <h2 className="text-xl font-bold mb-4 text-gray-800">دلوقتي على طول</h2>
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-0 shadow-md bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-xl hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                    <UtensilsCrossed className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">الأكثر شعبية</h3>
                  <p className="text-xs text-gray-500">الأعلى تقييماً</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl hover:shadow-lg transition-shadow" style={{animationDelay: "450ms"}}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <ShoppingBag className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">توصيل سريع</h3>
                  <p className="text-xs text-gray-500">خلال 30 دقيقة</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl hover:shadow-lg transition-shadow" style={{animationDelay: "500ms"}}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Pill className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">طلبات سابقة</h3>
                  <p className="text-xs text-gray-500">اطلب مجدداً</p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* المطاعم المميزة */}
          <PopularPlaces />
          
          {/* عروض ترويجية */}
          <Promos />
          
          {/* بقالة وسوبر ماركت */}
          <section className="py-6 animate-fade-in" style={{animationDelay: "600ms"}}>
            <div className="flex justify-between items-center mb-4">
              <Link to="/market" className="text-lime-600 text-sm font-medium">
                عرض الكل
              </Link>
              <h2 className="text-xl font-bold text-gray-800">بقالة وسوبر ماركت</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="relative h-32">
                    <img
                      src="https://images.unsplash.com/photo-1604719312566-8912e9667857?q=80&w=300&auto=format&fit=crop"
                      alt="سوبر ماركت"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-white text-lime-700 hover:bg-white hover:text-lime-800">
                      30 دقيقة
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800">سوبر ماركت الميدان</h3>
                    <p className="text-xs text-gray-500 mt-1">بقالة، فواكه، خضروات</p>
                    <Badge variant="outline" className="mt-2 bg-lime-50 text-lime-700 border-lime-200 hover:bg-lime-100">
                      توصيل مجاني
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-0">
                  <div className="relative h-32">
                    <img
                      src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=300&auto=format&fit=crop"
                      alt="هايبر ماركت"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-white text-lime-700 hover:bg-white hover:text-lime-800">
                      25 دقيقة
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800">هايبر ماركت مصر</h3>
                    <p className="text-xs text-gray-500 mt-1">بقالة، منتجات منزلية</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                        خصم 15%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-5 border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all bg-gradient-to-r from-lime-600 to-green-600">
              <CardContent className="p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">حمّل تطبيق مرسول</h3>
                    <p className="text-sm opacity-90">واحصل على كوبونات وخصومات حصرية</p>
                    <Button className="mt-3 bg-white text-lime-700 hover:bg-gray-100 shadow-md">
                      تحميل الآن
                    </Button>
                  </div>
                  <div className="bg-lime-400/20 backdrop-blur-sm p-4 rounded-xl">
                    <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="4" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
                      <path d="M10 4H14V6H10V4Z" fill="currentColor" />
                      <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
