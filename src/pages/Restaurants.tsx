
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Filter, ArrowLeft, MapPin, ChevronDown, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useRestaurants } from '@/hooks/useRestaurantData';
import { Skeleton } from '@/components/ui/skeleton';

const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const { data: restaurantsData, isLoading } = useRestaurants();

  // للعناوين
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة، الرياض', 'برج المملكة، الرياض']);
  
  // للفلتر
  const [activeFilterCategory, setActiveFilterCategory] = useState<number | null>(null);
  const [activeSortFilter, setActiveSortFilter] = useState(1);
  const [displayedRestaurants, setDisplayedRestaurants] = useState(restaurantsData || []);
  const [isFiltering, setIsFiltering] = useState(false);

  // فئات الطعام بألوان برتقالية (طلبات)
  const foodCategories = [
    { id: 1, name: "حلويات", color: "bg-orange-100 text-orange-700" },
    { id: 2, name: "شاورما", color: "bg-orange-200 text-orange-800" },
    { id: 3, name: "برجر", color: "bg-orange-300 text-orange-900" },
    { id: 4, name: "ساندوتشات", color: "bg-amber-100 text-amber-800" },
    { id: 5, name: "بيتزا", color: "bg-amber-200 text-amber-900" },
    { id: 6, name: "كافيه", color: "bg-orange-100 text-orange-800" },
    { id: 7, name: "دجاج", color: "bg-orange-50 text-orange-600" },
    { id: 8, name: "عصائر", color: "bg-amber-200 text-amber-900" },
    { id: 9, name: "كريب", color: "bg-orange-200 text-orange-900" },
    { id: 10, name: "دجاج مقلي", color: "bg-amber-200 text-amber-900" },
    { id: 11, name: "إفطار", color: "bg-orange-400 text-white" },
    { id: 12, name: "أخرى", color: "bg-slate-200 text-slate-800" }
  ];

  // خيارات الفلتر بألوان طلبات
  const filters = [
    { id: 1, name: "العروض", active: true },
    { id: 2, name: "الأعلى تقييمًا", active: false },
    { id: 3, name: "التوصيل السريع", active: false },
    { id: 4, name: "الأقرب لك", active: false }
  ];

  React.useEffect(() => {
    if (restaurantsData) {
      setDisplayedRestaurants(restaurantsData);
    }
  }, [restaurantsData]);

  const toggleCategoryFilter = (categoryId: number) => {
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
  };

  const handleSortFilter = (filterId: number) => {
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
  };

  const handleNavigateToRestaurant = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleAddressSelect = (address: string) => {
    setAddress(address);
  };

  // للبحث
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* الهيدر مع زر الرجوع والعنوان */}
        <div className="flex flex-col shadow-sm sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-orange-950">المطاعم</h1>
            <div className="w-10"></div>
          </div>
          
          {/* اختيار عنوان التوصيل */}
          <div className="px-4 py-2 flex items-center gap-2 border-b">
            <MapPin className="text-orange-500 w-5 h-5 flex-shrink-0" />
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center text-sm justify-between w-full">
                  <span className="truncate font-medium">{address}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 bg-white shadow-lg rounded-xl border-orange-100">
                <div className="p-2">
                  <h3 className="font-bold mb-2 px-2 pt-2">اختر عنوان التوصيل</h3>
                  <div className="space-y-1">
                    {savedAddresses.map((addr, i) => (
                      <div 
                        key={i}
                        className={`p-2 rounded-lg cursor-pointer ${addr === address ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}
                        onClick={() => handleAddressSelect(addr)}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${addr === address ? 'text-orange-500' : 'text-gray-400'}`} />
                          <span>{addr}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* البحث */}
          <div className="px-4 py-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                className="pr-10 bg-gray-100 border-none focus-visible:ring-orange-200 placeholder:text-gray-400 rounded-xl" 
                placeholder="ابحث عن مطاعم، وجبات..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* فئات الطعام بألوان برتقالية */}
        <div className="px-4 py-3 border-b bg-white">
          <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar">
            {foodCategories.map(category => (
              <div 
                key={category.id} 
                className="flex-shrink-0 cursor-pointer transition-all" 
                onClick={() => toggleCategoryFilter(category.id)}
              >
                <div className={`px-4 py-2 rounded-lg ${category.color} transition-colors shadow-sm ${activeFilterCategory === category.id ? 'ring-2 ring-orange-500 ring-offset-2' : ''}`}>
                  <span className="font-medium">{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* الفلاتر بألوان طلبات */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b bg-white">
          {filters.map(filter => (
            <Button 
              key={filter.id} 
              variant={activeSortFilter === filter.id ? "default" : "outline"} 
              size="sm"
              className={`rounded-full whitespace-nowrap ${activeSortFilter === filter.id ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md' : 'text-orange-700 border-orange-200 hover:border-orange-300'}`}
              onClick={() => handleSortFilter(filter.id)}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* قائمة المطاعم أو حالة عدم وجود نتائج */}
        <div className="px-4 py-3">
          {isLoading ? (
            // سكيليتون للتحميل
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="mb-4 overflow-hidden border-slate-100 shadow-md rounded-xl">
                <div className="relative">
                  <Skeleton className="w-full h-40" />
                  <div className="absolute bottom-0 right-0 p-3 transform translate-y-1/2">
                    <Skeleton className="w-14 h-14 rounded-full" />
                  </div>
                </div>
                <div className="p-4 pt-8 mt-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-16 h-8 rounded-full" />
                      <Skeleton className="w-16 h-8 rounded-full" />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : isFiltering || displayedRestaurants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                <div className="text-4xl">🍽️</div>
              </div>
              <h3 className="text-lg font-bold text-orange-900 mb-2">مفيش مطاعم بالشروط دي</h3>
              <p className="text-sm text-gray-600 mb-4">جرّب تشيل الفلاتر أو تدور على حاجة تانية</p>
              <Button 
                variant="outline" 
                className="border-orange-300 text-orange-700 hover:bg-orange-50" 
                onClick={() => {
                  setActiveFilterCategory(null);
                  setSearchQuery('');
                  setDisplayedRestaurants(restaurantsData || []);
                  setIsFiltering(false);
                }}
              >
                عرض كل المطاعم
              </Button>
            </div>
          ) : (
            displayedRestaurants.map(restaurant => (
              <div 
                key={restaurant.id} 
                className="block cursor-pointer hover:scale-[1.01] transition-transform animate-fade-in" 
                onClick={() => handleNavigateToRestaurant(restaurant.id)}
              >
                <Card className="mb-4 overflow-hidden border-slate-100 shadow-md hover:shadow-lg transition-shadow rounded-xl">
                  <div className="relative">
                    <img 
                      src={restaurant.logo_url || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=500&auto=format&fit=crop"} 
                      alt={restaurant.name} 
                      className="w-full h-40 object-cover" 
                    />
                    {restaurant.delivery_fee === 0 && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white border-0 py-1 px-2 font-medium">
                        توصيل مجاني
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={restaurant.logo_url || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=100&auto=format&fit=crop"} 
                          alt="logo" 
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg" 
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
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          <span className="text-sm font-medium">{restaurant.rating ?? "جديد"}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-gray-700">{restaurant.delivery_time || "25-35"} دقيقة</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
