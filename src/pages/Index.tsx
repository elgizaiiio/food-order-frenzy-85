
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Bell, 
  Pill,
  Compass
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
    { id: 'pharmacy', name: 'صيدليات' }
  ];

  // أخذ التنقل إلى الصفحات
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // الحصول على اسم المستخدم
  const firstName = user?.email ? user.email.split('@')[0] : 'صديقي';
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
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
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-medium">2</span>
              </Link>
              <Link to="/profile">
                <Avatar className="w-8 h-8 border border-gray-200">
                  {user?.email ? (
                    <AvatarImage src="" />
                  ) : null}
                  <AvatarFallback className="bg-black text-white text-xs">
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
                      ? 'border-black text-black'
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
          {/* الخدمات الرئيسية */}
          <section className="pt-5 pb-2 animate-fade-in" style={{animationDelay: "200ms"}}>
            <h2 className="text-lg font-bold mb-4">اختر الخدمة</h2>
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
                icon={<Compass className="h-5 w-5 text-white" />}
                title="الجيم"
                description="اشتراكات"
                bgClass="bg-white"
                onClick={() => navigateTo('/gym')}
              />
              
              <ServiceCard
                icon={<ShoppingBag className="h-5 w-5 text-white" />}
                title="العناية"
                description="منتجات العناية"
                bgClass="bg-white"
                onClick={() => navigateTo('/personal-care')}
              />
            </div>
          </section>
          
          {/* فئات الرئيسية */}
          <Categories />
          
          {/* عروض خاصة */}
          <Offers />
          
          {/* المطاعم المميزة */}
          <PopularPlaces title="مطاعم قريبة منك" />
          
          {/* عروض ترويجية */}
          <Promos />
          
          {/* بقالة وسوبر ماركت */}
          <section className="py-5 animate-fade-in" style={{animationDelay: "600ms"}}>
            <div className="flex justify-between items-center mb-3">
              <Link to="/market" className="text-xs font-medium text-black hover:text-gray-700">
                عرض الكل
              </Link>
              <h2 className="text-lg font-bold text-black">البقالة</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">توصيل سريع</h3>
                <p className="text-xs text-gray-300 mb-3">توصيل خلال 15 دقيقة</p>
                <Badge className="bg-white text-black hover:bg-gray-100">اطلب الآن</Badge>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">صيدلية</h3>
                <p className="text-xs text-gray-500 mb-3">من أقرب صيدلية</p>
                <Badge className="bg-black text-white hover:bg-gray-900">اطلب الآن</Badge>
              </div>
            </div>
            
            <div className="mt-5 rounded-lg overflow-hidden bg-black text-white animate-fade-in" style={{animationDelay: "650ms"}}>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">أوبر وان</h3>
                  <p className="text-xs text-gray-300 mb-3">اشترك الآن واحصل على مزايا حصرية</p>
                  <Button className="bg-white text-black hover:bg-gray-100 text-xs px-3 py-1 h-auto">
                    اشترك الآن
                  </Button>
                </div>
                <div className="rounded-full bg-gray-800 p-3">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" />
                    <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16 12H8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
