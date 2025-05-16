
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  MapPin, Search, TrendingUp, Clock, Utensils, ShoppingBag, 
  Pill, Brush, Dumbbell, ChevronDown, Bell, PackageCheck, 
  ScanLine, Award, Gift, UtensilsCrossed
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useHomeCategories, useHomeOffers, usePopularPlaces } from '@/hooks/useHomeData';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [currentAddress, setCurrentAddress] = useState('شارع التحرير');
  
  const {
    data: homeCategories,
    isLoading: categoriesLoading
  } = useHomeCategories();
  
  const {
    data: homeOffers,
    isLoading: offersLoading
  } = useHomeOffers();
  
  const {
    data: popularPlaces,
    isLoading: placesLoading
  } = usePopularPlaces();
  
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
        {/* رأس الصفحة - مستوحى من مرسول */}
        <header className="sticky top-0 z-30 bg-white">
          {/* شريط العنوان */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <MapPin className="w-5 h-5 text-lime-600" />
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
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
              </Link>
              <Link to="/profile" className="relative">
                <Avatar className="w-8 h-8 border border-gray-200">
                  {user?.email ? (
                    <AvatarImage src="" />
                  ) : null}
                  <AvatarFallback className="bg-lime-100 text-lime-800 text-sm">
                    {firstName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
          
          {/* شريط البحث */}
          <div className="px-4 pb-2">
            <div className="relative">
              <Input 
                type="text"
                placeholder="ابحث عن مطعم أو بقالة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-gray-100 border-0 rounded-xl focus-visible:ring-lime-500"
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
        
        {/* قسم البانرات */}
        <section className="px-4 pt-4 pb-2">
          <div className="overflow-x-auto flex gap-3 no-scrollbar pb-2">
            <Card className="min-w-[80%] h-36 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 border-0 overflow-hidden flex-shrink-0 animate-fade-in">
              <CardContent className="p-0 relative h-full">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop"
                  alt="عروض خاصة"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">خصم 30% على أول طلب</h3>
                  <p className="text-sm mb-3">استمتع بتخفيضات حصرية على أشهر المطاعم</p>
                  <Button className="w-max bg-white text-lime-700 hover:bg-gray-100 rounded-full px-5">
                    اطلب الآن
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="min-w-[80%] h-36 rounded-xl overflow-hidden flex-shrink-0 border-0 animate-fade-in" style={{animationDelay: "100ms"}}>
              <CardContent className="p-0 relative h-full">
                <img
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500&auto=format&fit=crop"
                  alt="توصيل سريع"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-bold">توصيل سريع خلال 30 دقيقة</h3>
                  <p className="text-sm opacity-90">من أقرب المطاعم والمتاجر إليك</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* فئات الرئيسية */}
        <section className="px-4 py-5">
          <h2 className="text-lg font-bold mb-4">اختر من الفئات</h2>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex flex-col items-center">
                  <Skeleton className="w-14 h-14 rounded-full mb-2" />
                  <Skeleton className="w-10 h-3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              <Link to="/restaurants" className="flex flex-col items-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-1 shadow-sm">
                  <UtensilsCrossed className="w-7 h-7 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-center">مطاعم</span>
              </Link>
              
              <Link to="/market" className="flex flex-col items-center animate-fade-in" style={{animationDelay: "50ms"}}>
                <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center mb-1 shadow-sm">
                  <ShoppingBag className="w-7 h-7 text-lime-600" />
                </div>
                <span className="text-xs font-medium text-center">بقالة</span>
              </Link>
              
              <Link to="/pharmacy" className="flex flex-col items-center animate-fade-in" style={{animationDelay: "100ms"}}>
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-1 shadow-sm">
                  <Pill className="w-7 h-7 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-center">صيدليات</span>
              </Link>
              
              <Link to="/personal-care" className="flex flex-col items-center animate-fade-in" style={{animationDelay: "150ms"}}>
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-1 shadow-sm">
                  <Brush className="w-7 h-7 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-center">مستلزمات</span>
              </Link>
            </div>
          )}
        </section>
        
        {/* قسم الإعلانات المدفوعة */}
        <section className="py-4 bg-gray-50">
          <div className="px-4 mb-3">
            <h2 className="text-lg font-bold">ترشيحات خاصة لك</h2>
          </div>
          <div className="px-4 overflow-x-auto flex gap-3 no-scrollbar pb-2">
            {offersLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="min-w-[250px] border-0 shadow-sm flex-shrink-0">
                  <CardContent className="p-0">
                    <Skeleton className="h-32 w-full" />
                    <div className="p-3">
                      <Skeleton className="h-5 w-28 mb-1" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : homeOffers && homeOffers.length > 0 ? (
              homeOffers.map((offer, index) => (
                <Card 
                  key={offer.id} 
                  className="min-w-[250px] border-0 shadow-sm rounded-xl overflow-hidden flex-shrink-0 animate-fade-in" 
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="w-full h-32 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-lime-500 border-0 text-white">
                        خصم 25%
                      </Badge>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800">{offer.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{offer.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="w-full py-6 text-center text-gray-500">
                <p>لا توجد عروض حالياً</p>
              </div>
            )}
          </div>
        </section>
        
        {/* الأقسام السريعة */}
        <section className="px-4 py-5">
          <h2 className="text-lg font-bold mb-3">دلوقتي على طول</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-0 shadow-sm bg-red-50 rounded-xl hover:shadow-md transition-shadow animate-fade-in">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <TrendingUp className="w-8 h-8 text-red-500 mb-2" />
                <h3 className="text-sm font-medium text-gray-800">الأكثر شعبية</h3>
                <p className="text-xs text-gray-500 mt-1">الأعلى تقييماً</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm bg-amber-50 rounded-xl hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "50ms"}}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Clock className="w-8 h-8 text-amber-500 mb-2" />
                <h3 className="text-sm font-medium text-gray-800">توصيل سريع</h3>
                <p className="text-xs text-gray-500 mt-1">خلال 30 دقيقة</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm bg-blue-50 rounded-xl hover:shadow-md transition-shadow animate-fade-in" style={{animationDelay: "100ms"}}>
              <CardContent className="p-4 flex flex-col items-center text-center">
                <PackageCheck className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="text-sm font-medium text-gray-800">طلبات سابقة</h3>
                <p className="text-xs text-gray-500 mt-1">اطلب مجدداً</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* المطاعم المميزة */}
        <section className="px-4 py-5">
          <div className="flex justify-between items-center mb-4">
            <Link to="/restaurants" className="text-lime-600 text-sm font-medium">
              عرض الكل
            </Link>
            <h2 className="text-lg font-bold">مطاعم موصى بها</h2>
          </div>
          
          {placesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(item => (
                <Card key={item} className="border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex">
                      <Skeleton className="h-24 w-24" />
                      <div className="p-3 flex-1">
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : popularPlaces && popularPlaces.length > 0 ? (
            <div className="space-y-3">
              {popularPlaces.map((place, index) => (
                <Card
                  key={place.id}
                  className="border-0 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all animate-fade-in"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-24 h-24 overflow-hidden">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">{place.name}</h3>
                          <div className="flex items-center bg-green-100 rounded-lg px-1.5 py-0.5">
                            <span className="text-xs font-medium text-green-700">{place.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{place.category}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {place.deliveryTime}
                          </span>
                          <span className="text-xs text-gray-500">
                            {place.deliveryFee}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>لا توجد مطاعم قريبة حالياً</p>
            </div>
          )}
        </section>
        
        {/* عروض إعلانية إضافية */}
        <section className="px-4 py-5 bg-gray-50">
          <h2 className="text-lg font-bold mb-3">عروض يومية</h2>
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden animate-fade-in">
            <CardContent className="p-0 relative h-40">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop"
                alt="عروض خاصة"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="text-xl font-bold mb-1">خصم 30% على أول طلب</h3>
                <p className="text-sm">احصل على توصيل مجاني للطلبات أكثر من 100 ج.م</p>
                <Button className="w-max mt-3 bg-white text-lime-700 hover:bg-gray-100">
                  استفد الآن
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* المتاجر الشعبية */}
        <section className="px-4 py-5">
          <div className="flex justify-between items-center mb-4">
            <Link to="/market" className="text-lime-600 text-sm font-medium">
              عرض الكل
            </Link>
            <h2 className="text-lg font-bold">بقالة وسوبر ماركت</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-0 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all animate-fade-in">
              <CardContent className="p-0">
                <div className="relative h-28">
                  <img
                    src="https://images.unsplash.com/photo-1604719312566-8912e9667857?q=80&w=300&auto=format&fit=crop"
                    alt="سوبر ماركت"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-green-700">30 د</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800">سوبر ماركت الميدان</h3>
                  <p className="text-xs text-gray-500 mt-1">بقالة، فواكه، خضروات</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all animate-fade-in" style={{animationDelay: "50ms"}}>
              <CardContent className="p-0">
                <div className="relative h-28">
                  <img
                    src="https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=300&auto=format&fit=crop"
                    alt="هايبر ماركت"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-lg px-2 py-1">
                    <span className="text-xs font-medium text-green-700">25 د</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800">هايبر ماركت مصر</h3>
                  <p className="text-xs text-gray-500 mt-1">بقالة، منتجات منزلية</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-4">
            <Card className="border-0 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all bg-gradient-to-r from-lime-600 to-lime-500 animate-fade-in" style={{animationDelay: "100ms"}}>
              <CardContent className="p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1">نزل تطبيق مرسول</h3>
                    <p className="text-sm">واحصل على كوبونات وخصومات حصرية</p>
                  </div>
                  <ScanLine className="w-12 h-12" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
