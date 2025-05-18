
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Filter, ArrowLeft, MapPin, ChevronDown, Search, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useRestaurants } from '@/hooks/useRestaurantData';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const { data: restaurantsData, isLoading, error } = useRestaurants();
  const { toast } = useToast();

  // للعناوين
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة، الرياض', 'برج المملكة، الرياض']);
  
  // للفلتر
  const [activeFilterCategory, setActiveFilterCategory] = useState<number | null>(null);
  const [activeSortFilter, setActiveSortFilter] = useState(1);
  const [displayedRestaurants, setDisplayedRestaurants] = useState(restaurantsData || []);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // فئات الطعام بألوان برتقالية متدرجة
  const foodCategories = [
    { id: 1, name: "حلويات", color: "bg-gradient-to-br from-orange-100 to-amber-200 text-orange-800" },
    { id: 2, name: "شاورما", color: "bg-gradient-to-br from-orange-200 to-amber-300 text-orange-900" },
    { id: 3, name: "برجر", color: "bg-gradient-to-br from-orange-300 to-amber-400 text-orange-900" },
    { id: 4, name: "ساندوتشات", color: "bg-gradient-to-br from-amber-100 to-orange-200 text-amber-800" },
    { id: 5, name: "بيتزا", color: "bg-gradient-to-br from-amber-200 to-orange-200 text-amber-900" },
    { id: 6, name: "كافيه", color: "bg-gradient-to-br from-orange-100 to-amber-100 text-orange-800" },
    { id: 7, name: "دجاج", color: "bg-gradient-to-br from-orange-50 to-amber-100 text-orange-600" },
    { id: 8, name: "عصائر", color: "bg-gradient-to-br from-amber-200 to-orange-300 text-amber-900" },
    { id: 9, name: "كريب", color: "bg-gradient-to-br from-orange-200 to-amber-300 text-orange-900" },
    { id: 10, name: "فطور", color: "bg-gradient-to-br from-amber-200 to-orange-200 text-amber-900" },
    { id: 11, name: "مأكولات بحرية", color: "bg-gradient-to-br from-orange-400 to-amber-500 text-white" },
    { id: 12, name: "أخرى", color: "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-800" }
  ];

  // خيارات الفلتر بألوان
  const filters = [
    { id: 1, name: "العروض", active: true },
    { id: 2, name: "الأعلى تقييمًا", active: false },
    { id: 3, name: "التوصيل السريع", active: false },
    { id: 4, name: "الأقرب لك", active: false }
  ];

  // تتبع التمرير لإخفاء/إظهار الرأس
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // إخفاء الرأس عند التمرير للأسفل
        setIsHeaderVisible(false);
      } else {
        // إظهاره عند التمرير للأعلى
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // تحديث المطاعم المعروضة عند تغير البيانات
  useEffect(() => {
    if (restaurantsData) {
      setDisplayedRestaurants(restaurantsData);
    }
  }, [restaurantsData]);

  // عرض رسالة خطأ إذا كانت هناك مشكلة
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "خطأ في تحميل المطاعم",
        description: "حدثت مشكلة في تحميل المطاعم، يرجى المحاولة لاحقًا"
      });
    }
  }, [error, toast]);

  // تبديل فلتر الفئة
  const toggleCategoryFilter = useCallback((categoryId: number) => {
    if (activeFilterCategory === categoryId) {
      setActiveFilterCategory(null);
      setDisplayedRestaurants(restaurantsData || []);
      setIsFiltering(false);
    } else {
      setActiveFilterCategory(categoryId);
      const category = foodCategories.find(cat => cat.id === categoryId)?.name || '';

      // فلترة المطاعم التي تحتوي على هذه الفئة في التاجات
      if (restaurantsData) {
        const filtered = restaurantsData.filter(restaurant => 
          restaurant.description?.toLowerCase().includes(category.toLowerCase())
        );
        setDisplayedRestaurants(filtered);
        setIsFiltering(filtered.length === 0);
      }
    }
  }, [activeFilterCategory, foodCategories, restaurantsData]);

  // معالجة فلتر الترتيب
  const handleSortFilter = useCallback((filterId: number) => {
    setActiveSortFilter(filterId);

    if (!restaurantsData) return;

    // تطبيق الفلتر
    switch (filterId) {
      case 2:
        // الأعلى تقييمًا
        setDisplayedRestaurants([...restaurantsData].sort((a, b) => (b.rating || 0) - (a.rating || 0)));
        break;
      case 3:
        // التوصيل السريع
        setDisplayedRestaurants([...restaurantsData].sort((a, b) => {
          const aTime = parseInt(a.delivery_time?.split('-')[0] || '30');
          const bTime = parseInt(b.delivery_time?.split('-')[0] || '30');
          return aTime - bTime;
        }));
        break;
      default:
        setDisplayedRestaurants(restaurantsData);
    }
  }, [restaurantsData]);

  // الانتقال إلى صفحة المطعم
  const handleNavigateToRestaurant = useCallback((restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  }, [navigate]);

  // اختيار العنوان
  const handleAddressSelect = useCallback((addr: string) => {
    setAddress(addr);
    toast({
      title: "تم تغيير العنوان",
      description: `سيتم التوصيل إلى: ${addr}`
    });
  }, [toast]);

  // للبحث
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!restaurantsData) return;
    
    if (query.trim() === '') {
      setDisplayedRestaurants(restaurantsData);
    } else {
      const filtered = restaurantsData.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.description?.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedRestaurants(filtered);
      setIsFiltering(filtered.length === 0);
    }
  }, [restaurantsData]);

  // إعادة تعيين الفلاتر
  const resetFilters = useCallback(() => {
    setActiveFilterCategory(null);
    setSearchQuery('');
    setDisplayedRestaurants(restaurantsData || []);
    setIsFiltering(false);
    setActiveSortFilter(1);
    
    toast({
      title: "تم إعادة تعيين الفلاتر",
      description: "تم عرض جميع المطاعم"
    });
  }, [restaurantsData, toast]);

  // معالج الطلب السريع
  const handleQuickOrder = useCallback((restaurantId: string, restaurantName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigate(`/restaurant/${restaurantId}`);
    
    toast({
      title: `طلب سريع من ${restaurantName}`,
      description: "تم الانتقال إلى صفحة المطعم"
    });
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* الهيدر مع زر الرجوع والعنوان - يختفي عند التمرير للأسفل */}
        <div 
          className={`flex flex-col shadow-md sticky z-10 transition-transform duration-300 ${
            isHeaderVisible ? 'top-0 translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm shadow-sm text-white hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">المطاعم</h1>
            <div className="w-10"></div>
          </div>
          
          {/* اختيار عنوان التوصيل - تصميم محسن */}
          <div className="px-4 py-2 flex items-center gap-2 border-b bg-orange-50">
            <MapPin className="text-orange-500 w-5 h-5 flex-shrink-0" />
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center text-sm justify-between w-full">
                  <span className="truncate font-medium">{address}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 bg-white shadow-lg rounded-xl border-orange-100 animate-fade-in">
                <div className="p-2">
                  <h3 className="font-bold mb-2 px-2 pt-2">اختر عنوان التوصيل</h3>
                  <div className="space-y-1">
                    {savedAddresses.map((addr, i) => (
                      <div 
                        key={i}
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${addr === address ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}
                        onClick={() => handleAddressSelect(addr)}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${addr === address ? 'text-orange-500' : 'text-gray-400'}`} />
                          <span>{addr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t mt-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs mt-1 text-orange-700 border-orange-300 hover:bg-orange-50"
                      onClick={() => navigate('/addresses/new')}
                    >
                      إضافة عنوان جديد
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* البحث - تصميم محسن */}
          <div className="px-4 py-3 bg-orange-100">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
              <Input 
                className="pr-10 bg-white border-none focus-visible:ring-orange-200 placeholder:text-gray-400 rounded-xl shadow-sm" 
                placeholder="ابحث عن مطاعم، وجبات..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* فئات الطعام بألوان وتصميم محسن */}
        <div className={`px-4 py-3 border-b bg-white sticky z-[5] shadow-sm transition-transform duration-300 ${
          isHeaderVisible ? 'top-[146px]' : 'top-0'
        }`}>
          <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar">
            {foodCategories.map(category => (
              <div 
                key={category.id} 
                className="flex-shrink-0 cursor-pointer transition-all animate-fade-in" 
                onClick={() => toggleCategoryFilter(category.id)}
                style={{animationDelay: `${category.id * 50}ms`}}
              >
                <div 
                  className={`px-4 py-2 rounded-lg ${category.color} transition-all shadow-sm ${
                    activeFilterCategory === category.id 
                      ? 'ring-2 ring-orange-500 ring-offset-2 scale-105' 
                      : 'hover:scale-105'
                  }`}
                >
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* الفلاتر بألوان محسنة */}
        <div className={`px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b bg-white sticky z-[5] shadow-sm transition-transform duration-300 ${
          isHeaderVisible ? 'top-[213px]' : 'top-[67px]'
        }`}>
          {filters.map(filter => (
            <Button 
              key={filter.id} 
              variant={activeSortFilter === filter.id ? "default" : "outline"} 
              size="sm"
              className={`rounded-full whitespace-nowrap transition-all ${
                activeSortFilter === filter.id 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' 
                  : 'text-orange-700 border-orange-200 hover:border-orange-300'
              }`}
              onClick={() => handleSortFilter(filter.id)}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* قائمة المطاعم أو حالة عدم وجود نتائج */}
        <div className="px-4 py-3">
          {isLoading ? (
            // سكيليتون للتحميل محسن
            <div className="space-y-4">
              {Array(3).fill(0).map((_, index) => (
                <Card key={index} className="overflow-hidden border-slate-100 shadow-md rounded-xl animate-pulse">
                  <div className="relative">
                    <Skeleton className="w-full h-40" />
                    <div className="absolute top-2 right-2">
                      <Skeleton className="w-20 h-6 rounded-full" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-14 h-14 rounded-full" />
                      <div>
                        <Skeleton className="h-6 w-32 mb-1" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-16 h-8 rounded-full" />
                        <Skeleton className="w-16 h-8 rounded-full" />
                      </div>
                      <Skeleton className="w-24 h-9 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <div className="text-4xl">⚠️</div>
              </div>
              <h3 className="text-lg font-bold text-red-800 mb-2">حدث خطأ أثناء تحميل المطاعم</h3>
              <p className="text-sm text-gray-600 mb-4">يرجى المحاولة لاحقًا أو التحقق من اتصالك بالإنترنت</p>
              <Button 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-50" 
                onClick={() => window.location.reload()}
              >
                إعادة تحميل الصفحة
              </Button>
            </div>
          ) : isFiltering || displayedRestaurants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <div className="text-4xl">🍽️</div>
              </div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">لا توجد مطاعم بالفلاتر الحالية</h3>
              <p className="text-sm text-gray-600 mb-4">جرّب تغيير الفلاتر أو البحث عن شيء آخر</p>
              <Button 
                variant="outline" 
                className="border-orange-300 text-orange-700 hover:bg-orange-50" 
                onClick={resetFilters}
              >
                عرض كل المطاعم
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedRestaurants.map((restaurant, idx) => (
                <div 
                  key={restaurant.id} 
                  className="block cursor-pointer hover:scale-[1.01] transition-transform animate-fade-in" 
                  style={{animationDelay: `${idx * 100}ms`}}
                  onClick={() => handleNavigateToRestaurant(restaurant.id)}
                >
                  <Card className="overflow-hidden border-slate-100 shadow-md hover:shadow-lg transition-all rounded-xl">
                    <div className="relative">
                      <img 
                        src={restaurant.logo_url || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=500&auto=format&fit=crop"} 
                        alt={restaurant.name} 
                        className="w-full h-40 object-cover" 
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/500x200?text=صورة+غير+متوفرة";
                        }}
                      />
                      {restaurant.delivery_fee === 0 && (
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white border-0 py-1 px-3 font-medium animate-bounce-in">
                          توصيل مجاني
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <img 
                          src={restaurant.logo_url || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=100&auto=format&fit=crop"} 
                          alt="logo" 
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg -mt-8" 
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/100?text=شعار";
                          }}
                        />
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {restaurant.description?.split(',').map((tag, idx) => (
                              <span key={idx} className="text-xs text-gray-500">
                                {tag.trim()}{idx !== restaurant.description.split(',').length - 1 && ' • '}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                            <span className="text-sm font-medium">{restaurant.rating ?? "جديد"}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-gray-700">{restaurant.delivery_time || "25-35"} دقيقة</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => handleQuickOrder(restaurant.id, restaurant.name, e)}
                          className="rounded-full bg-orange-500 hover:bg-orange-600 flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span className="text-xs">اطلب الآن</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
