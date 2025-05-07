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

  // Food category data with colors
  const foodCategories = [{
    id: 1,
    name: "حلويات",
    color: "bg-pink-500 text-white"
  }, {
    id: 2,
    name: "شاورما",
    color: "bg-amber-500 text-white"
  }, {
    id: 3,
    name: "برجر",
    color: "bg-red-500 text-white"
  }, {
    id: 4,
    name: "ساندوتشات",
    color: "bg-green-500 text-white"
  }, {
    id: 5,
    name: "بيتزا",
    color: "bg-blue-500 text-white"
  }, {
    id: 6,
    name: "كافيه",
    color: "bg-purple-500 text-white"
  }, {
    id: 7,
    name: "دجاج",
    color: "bg-orange-500 text-white"
  }, {
    id: 8,
    name: "عصائر",
    color: "bg-cyan-500 text-white"
  }, {
    id: 9,
    name: "كريب",
    color: "bg-indigo-500 text-white"
  }, {
    id: 10,
    name: "دجاج مقلي",
    color: "bg-lime-500 text-white"
  }, {
    id: 11,
    name: "إفطار",
    color: "bg-yellow-500 text-black"
  }, {
    id: 12,
    name: "أخرى",
    color: "bg-gray-500 text-white"
  }];

  // Filter options
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
  return <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with back button and address */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <button onClick={() => navigate('/')} className="text-gray-700">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold mx-[92px] px-[5px]">كل المطاعم</h1>
            
          </div>
          
          {/* Delivery Address */}
          
        </div>

        {/* Food Categories - Updated to text-only with different colors */}
        <div className="px-4 py-3 border-b">
          <div className="flex overflow-x-auto gap-4 pb-3 no-scrollbar">
            {foodCategories.map(category => <div key={category.id} className="flex-shrink-0 cursor-pointer transition-all" onClick={() => toggleCategoryFilter(category.id)}>
                <div className={`px-4 py-2 rounded-lg ${category.color} transition-colors ${activeFilterCategory === category.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                  <span className="font-medium">{category.name}</span>
                </div>
              </div>)}
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b">
          {filters.map(filter => <Button key={filter.id} variant={activeSortFilter === filter.id ? "default" : "outline"} size="sm" className={`rounded-full whitespace-nowrap ${activeSortFilter === filter.id ? 'bg-primary' : ''}`} onClick={() => handleSortFilter(filter.id)}>
              {filter.name}
            </Button>)}
        </div>

        {/* Restaurant List or Empty State */}
        <div className="px-4 py-3">
          {isFiltering ? <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">مفيش مطاعم بالشروط دي</h3>
              <p className="text-sm text-gray-600 mb-4">جرّب تشيل الفلاتر أو تدور على حاجة تانية</p>
              <Button variant="outline" onClick={() => {
            setActiveFilterCategory(null);
            setFilteredRestaurants(restaurants);
            setIsFiltering(false);
          }}>
                عرض كل المطاعم
              </Button>
            </div> : filteredRestaurants.map(restaurant => <div key={restaurant.id} className="block cursor-pointer hover:scale-[1.01] transition-transform" onClick={() => handleNavigateToRestaurant(restaurant.id)}>
                <Card className="mb-4 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img src={restaurant.cover} alt={restaurant.name} className="w-full h-40 object-cover" />
                    {restaurant.promo && <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        {restaurant.promo}
                      </Badge>}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={restaurant.logo} alt="logo" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div>
                          <h3 className="font-bold text-lg">{restaurant.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {restaurant.tags && restaurant.tags.map((tag, idx) => <span key={idx} className="text-xs text-gray-500">
                                {tag}{idx !== restaurant.tags.length - 1 && ' • '}
                              </span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{restaurant.deliveryTime} دقيقة</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        التوصيل: {restaurant.deliveryFee}
                      </div>
                    </div>
                    <Button className="w-full mt-3 rounded-xl" size="sm">
                      ادخل المطعم
                    </Button>
                  </div>
                </Card>
              </div>)}
        </div>
      </div>
    </div>;
};
export default Restaurants;