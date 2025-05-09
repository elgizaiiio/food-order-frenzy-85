
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, Filter, ArrowLeft, MapPin, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Restaurants: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة، الرياض', 'برج المملكة، الرياض']);
  const [activeFilterCategory, setActiveFilterCategory] = useState<number | null>(null);
  const [activeSortFilter, setActiveSortFilter] = useState(1);

  // Food category data with blue colors
  const foodCategories = [{
    id: 1,
    name: "حلويات",
    color: "bg-blue-100 text-blue-700"
  }, {
    id: 2,
    name: "شاورما",
    color: "bg-blue-200 text-blue-800"
  }, {
    id: 3,
    name: "برجر",
    color: "bg-blue-300 text-blue-900"
  }, {
    id: 4,
    name: "ساندوتشات",
    color: "bg-cyan-100 text-cyan-800"
  }, {
    id: 5,
    name: "بيتزا",
    color: "bg-sky-100 text-sky-800"
  }, {
    id: 6,
    name: "كافيه",
    color: "bg-indigo-100 text-indigo-800"
  }, {
    id: 7,
    name: "دجاج",
    color: "bg-blue-50 text-blue-600"
  }, {
    id: 8,
    name: "عصائر",
    color: "bg-cyan-200 text-cyan-900"
  }, {
    id: 9,
    name: "كريب",
    color: "bg-indigo-200 text-indigo-900"
  }, {
    id: 10,
    name: "دجاج مقلي",
    color: "bg-sky-200 text-sky-900"
  }, {
    id: 11,
    name: "إفطار",
    color: "bg-blue-400 text-white"
  }, {
    id: 12,
    name: "أخرى",
    color: "bg-slate-200 text-slate-800"
  }];

  // Filter options with blue theme
  const filters = [{
    id: 1,
    name: "العروض",
    active: true
  }, {
    id: 2,
    name: "الأعلى تقييمًا",
    active: false
  }, {
    id: 3,
    name: "التوصيل السريع",
    active: false
  }, {
    id: 4,
    name: "الأقرب لك",
    active: false
  }];

  // Restaurant data
  const restaurants = [{
    id: 1,
    name: "مطعم الشرق",
    logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
    cover: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    deliveryTime: "25-35",
    deliveryFee: "15 ج.م",
    tags: ["شاورما", "برجر", "دجاج"],
    promo: "خصم 20٪ على الطلب الأول"
  }, {
    id: 2,
    name: "برجر كينج",
    logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
    cover: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    deliveryTime: "20-30",
    deliveryFee: "20 ج.م",
    tags: ["برجر", "بطاطس", "وجبات سريعة"],
    promo: "اشترِ وجبة واحصل على الثانية مجانًا"
  }, {
    id: 3,
    name: "بيتزا هت",
    logo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
    cover: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    deliveryTime: "30-40",
    deliveryFee: "25 ج.م",
    tags: ["بيتزا", "باستا", "سلطات"],
    promo: "توصيل مجاني للطلبات فوق 100 ج.م"
  }, {
    id: 4,
    name: "مطعم السلطان",
    logo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    cover: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    deliveryTime: "35-45",
    deliveryFee: "18 ج.م",
    tags: ["شرقي", "مشاوي", "سلطات"]
  }];

  // Empty state handling
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  
  // Filter and sorting functions
  const toggleCategoryFilter = (categoryId: number) => {
    if (activeFilterCategory === categoryId) {
      setActiveFilterCategory(null);
      setFilteredRestaurants(restaurants);
      setIsFiltering(false);
    } else {
      setActiveFilterCategory(categoryId);
      const category = foodCategories.find(cat => cat.id === categoryId)?.name || '';

      // Filter restaurants that have the category in their tags
      const filtered = restaurants.filter(restaurant => restaurant.tags && restaurant.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase())));
      setFilteredRestaurants(filtered);
      setIsFiltering(filtered.length === 0);
    }
  };
  
  const handleSortFilter = (filterId: number) => {
    setActiveSortFilter(filterId);

    // In a real app, this would trigger an API call with the filter
    // For now, we'll just simulate the filtering
    switch (filterId) {
      case 2:
        // الأعلى تقييمًا
        setFilteredRestaurants([...restaurants].sort((a, b) => b.rating - a.rating));
        break;
      case 3:
        // التوصيل السريع
        setFilteredRestaurants([...restaurants].sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0]);
          const bTime = parseInt(b.deliveryTime.split('-')[0]);
          return aTime - bTime;
        }));
        break;
      default:
        setFilteredRestaurants(restaurants);
    }
  };
  
  const handleNavigateToRestaurant = (restaurantId: number) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  // Added delivery address selection
  const handleAddressSelect = (address: string) => {
    setAddress(address);
  };
  
  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with back button and address */}
        <div className="flex flex-col shadow-sm">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-sky-50">
            <button onClick={() => navigate('/')} className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-blue-700 hover:bg-blue-50 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-blue-900">كل المطاعم</h1>
            <div className="w-10"></div>
          </div>
          
          {/* Delivery Address */}
          <div className="px-4 py-3 border-b bg-white">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full flex justify-between items-center text-right p-2 rounded-xl hover:bg-blue-50 border border-blue-100">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 ml-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">توصيل إلى</p>
                      <p className="font-bold text-blue-900">{address}</p>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-2">
                <div className="space-y-2">
                  <p className="font-bold text-blue-900 mb-2">اختر موقع التوصيل</p>
                  {savedAddresses.map((addr, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${addr === address ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-50'}`}
                      onClick={() => handleAddressSelect(addr)}
                    >
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 ml-2 text-blue-600" />
                        <span>{addr}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t">
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                      + إضافة عنوان جديد
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Food Categories with blue theme */}
        <div className="px-4 py-3 border-b bg-white">
          <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar">
            {foodCategories.map(category => (
              <div 
                key={category.id} 
                className="flex-shrink-0 cursor-pointer transition-all" 
                onClick={() => toggleCategoryFilter(category.id)}
              >
                <div className={`px-4 py-2 rounded-lg ${category.color} transition-colors shadow-sm ${activeFilterCategory === category.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
                  <span className="font-medium">{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters with blue theme */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b bg-white">
          {filters.map(filter => (
            <Button 
              key={filter.id} 
              variant={activeSortFilter === filter.id ? "default" : "outline"} 
              size="sm" 
              className={`rounded-full whitespace-nowrap ${
                activeSortFilter === filter.id 
                  ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-md' 
                  : 'text-blue-700 border-blue-200 hover:border-blue-300'
              }`} 
              onClick={() => handleSortFilter(filter.id)}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Restaurant List or Empty State */}
        <div className="px-4 py-3">
          {isFiltering ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <div className="text-4xl">🍽️</div>
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">مفيش مطاعم بالشروط دي</h3>
              <p className="text-sm text-gray-600 mb-4">جرّب تشيل الفلاتر أو تدور على حاجة تانية</p>
              <Button 
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50" 
                onClick={() => {
                  setActiveFilterCategory(null);
                  setFilteredRestaurants(restaurants);
                  setIsFiltering(false);
                }}
              >
                عرض كل المطاعم
              </Button>
            </div>
          ) : (
            filteredRestaurants.map(restaurant => (
              <div 
                key={restaurant.id} 
                className="block cursor-pointer hover:scale-[1.01] transition-transform animate-fade-in" 
                onClick={() => handleNavigateToRestaurant(restaurant.id)}
              >
                <Card className="mb-4 overflow-hidden border-slate-100 shadow-md hover:shadow-lg transition-shadow rounded-xl">
                  <div className="relative">
                    <img 
                      src={restaurant.cover} 
                      alt={restaurant.name} 
                      className="w-full h-40 object-cover"
                    />
                    {restaurant.promo && (
                      <Badge className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-sky-500 text-white border-0 py-1 px-2 font-medium">
                        {restaurant.promo}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={restaurant.logo} 
                          alt="logo" 
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                        />
                        <div>
                          <h3 className="font-bold text-lg text-blue-900">{restaurant.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {restaurant.tags && restaurant.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs text-gray-500">
                                {tag}{idx !== restaurant.tags.length - 1 && ' • '}
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
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-700">{restaurant.deliveryTime} دقيقة</span>
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
