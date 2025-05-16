
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Bell, 
  Pill,
  Scissors,
  Star,
  Package,
  Clock,
  ChevronLeft
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Categories from '@/components/Categories';
import Offers from '@/components/Offers';
import PopularPlaces from '@/components/ui/PopularPlaces';
import Promos from '@/components/ui/Promos';
import AddressInput from '@/components/AddressInput';
import SearchInput from '@/components/SearchInput';
import ServiceCard from '@/components/ServiceCard';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentAddress, setCurrentAddress] = useState('شارع التحرير');
  
  // تخصيص الأقسام حسب التبويب النشط
  const mainCategories = [
    { id: 'all', name: 'الكل' },
    { id: 'restaurants', name: 'مطاعم' },
    { id: 'market', name: 'بقالة' },
    { id: 'pharmacy', name: 'صيدليات' },
    { id: 'gym', name: 'جيم' },
    { id: 'personal-care', name: 'العناية الشخصية' }
  ];

  // أخذ التنقل إلى الصفحات
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // الحصول على اسم المستخدم
  const firstName = user?.email ? user.email.split('@')[0] : 'صديقي';
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* رأس الصفحة */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          {/* شريط العنوان */}
          <div className="flex items-center justify-between p-4 animate-fade-in">
            <AddressInput 
              currentAddress={currentAddress}
              setCurrentAddress={setCurrentAddress}
            />
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <Link to="/notifications" className="relative">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-medium">2</span>
              </Link>
              <Link to="/profile">
                <Avatar className="w-8 h-8 border border-gray-200">
                  {user?.email ? (
                    <AvatarImage src="" />
                  ) : null}
                  <AvatarFallback className="bg-orange-500 text-white text-xs">
                    {firstName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
          
          {/* شريط البحث */}
          <div className="px-4 pb-3 animate-fade-in" style={{animationDelay: "100ms"}}>
            <SearchInput 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          
          {/* شريط التبويبات */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto no-scrollbar px-4">
              {mainCategories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-3 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                    activeTab === category.id 
                      ? 'border-orange-500 text-orange-500'
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
          {/* العروض والإعلانات المتحركة */}
          <Offers />
          
          {/* الخدمات الرئيسية */}
          <section className="pt-5 pb-2 animate-fade-in" style={{animationDelay: "200ms"}}>
            <div className="flex justify-between items-center mb-4">
              <Link to="/services" className="text-xs font-medium text-orange-500 hover:text-orange-600 flex items-center">
                عرض الكل <ChevronLeft className="h-3 w-3 mr-1" />
              </Link>
              <h2 className="text-lg font-bold">اختر الخدمة</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <ServiceCard
                icon={<UtensilsCrossed className="h-5 w-5 text-white" />}
                title="مطاعم"
                description="توصيل من مطاعمك المفضلة"
                onClick={() => navigateTo('/restaurants')}
              />
              
              <ServiceCard
                icon={<ShoppingBag className="h-5 w-5 text-white" />}
                title="بقالة"
                description="توصيل بقالة سريع"
                onClick={() => navigateTo('/market')}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-3">
              <ServiceCard
                icon={<Pill className="h-5 w-5 text-white" />}
                title="صيدليات"
                description="الأدوية"
                bgClass="bg-white"
                onClick={() => navigateTo('/pharmacy')}
              />
              
              <ServiceCard
                icon={<Star className="h-5 w-5 text-white" />}
                title="الجيم"
                description="اشتراكات"
                bgClass="bg-white"
                onClick={() => navigateTo('/gym')}
              />
              
              <ServiceCard
                icon={<Scissors className="h-5 w-5 text-white" />}
                title="العناية"
                description="منتجات العناية"
                bgClass="bg-white"
                onClick={() => navigateTo('/personal-care')}
              />
            </div>
          </section>
          
          {/* فئات الرئيسية */}
          <Categories />
          
          {/* المطاعم المميزة */}
          <PopularPlaces title="مطاعم قريبة منك" />
          
          {/* عروض ترويجية */}
          <Promos />
          
          {/* بقالة وسوبر ماركت */}
          <section className="py-5 animate-fade-in" style={{animationDelay: "600ms"}}>
            <div className="flex justify-between items-center mb-3">
              <Link to="/market" className="text-xs font-medium text-orange-500 hover:text-orange-600 flex items-center">
                عرض الكل <ChevronLeft className="h-3 w-3 mr-1" />
              </Link>
              <h2 className="text-lg font-bold">البقالة</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <ServiceCard
                icon={<Package className="h-5 w-5 text-white" />}
                title="توصيل سريع"
                description="خلال 15 دقيقة"
                special={true}
                onClick={() => navigateTo('/market')}
              />
              
              <ServiceCard
                icon={<Pill className="h-5 w-5 text-white" />}
                title="صيدلية"
                description="من أقرب صيدلية"
                special={true}
                onClick={() => navigateTo('/pharmacy')}
              />
            </div>
            
            {/* قسم الخصومات */}
            <div className="mt-5 rounded-xl overflow-hidden bg-orange-500 text-white animate-fade-in" style={{animationDelay: "650ms"}}>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">خصم 30% على أول طلب</h3>
                  <p className="text-xs text-orange-100 mb-3">احصل على خصم 30% عند تسجيلك لأول مرة</p>
                  <Button className="bg-white text-orange-600 hover:bg-gray-100 text-xs px-3 py-1 h-auto">
                    استخدم الكود: FIRST30
                  </Button>
                </div>
                <div className="rounded-full bg-white/10 p-3">
                  <Star className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            
            {/* قسم التوصيل السريع */}
            <div className="mt-3 p-4 rounded-xl bg-orange-500 text-white">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-white/20 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">توصيل الطلبات</h3>
                  <p className="text-xs text-orange-100">استلم طلبك خلال 30 دقيقة أو أقل</p>
                </div>
              </div>
              <Button className="bg-white text-orange-600 hover:bg-gray-100 w-full mt-2">
                اطلب الآن
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
