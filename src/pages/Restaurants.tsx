
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useRestaurantData } from "@/hooks/useRestaurantData";

const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  
  const { restaurants, isLoading, error } = useRestaurantData();
  
  // تأثير لتتبع تمرير الصفحة لتنفيذ تأثيرات التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // قائمة فئات المطاعم
  const categories = [
    "الكل",
    "برجر",
    "بيتزا",
    "مشويات",
    "فراخ",
    "سمك",
    "كشري",
    "شرقي",
    "حلويات"
  ];
  
  // تصفية المطاعم حسب البحث والفئة
  const filteredRestaurants = React.useMemo(() => {
    if (!restaurants) return [];
    
    return restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (restaurant.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "الكل" || 
                             (restaurant.description || "").includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [restaurants, searchQuery, selectedCategory]);
  
  // التعامل مع النقر على مطعم
  const handleRestaurantClick = (id: string | number) => {
    navigate(`/restaurant-menu/${id}`);
  };
  
  // إضافة إلى المفضلة
  const handleFavorite = (e: React.MouseEvent, restaurantName: string) => {
    e.stopPropagation();
    toast({
      title: `تم إضافة ${restaurantName} للمفضلة`,
      description: "يمكنك الوصول إلى مطاعمك المفضلة من صفحة المفضلات"
    });
  };
  
  // العودة للصفحة السابقة
  const goBack = () => {
    navigate(-1);
  };
  
  // تصفية الفئات
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  
  // في حال وجود خطأ في التحميل
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <h2 className="text-xl font-bold text-red-500 mb-2">عفواً، حدث خطأ</h2>
        <p className="text-gray-600 mb-4">لم نتمكن من تحميل قائمة المطاعم</p>
        <Button onClick={() => window.location.reload()} variant="default">
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto relative">
        {/* رأس الصفحة المتغير عند التمرير */}
        <header
          className={`fixed top-0 right-0 left-0 z-10 max-w-md mx-auto transition-all duration-300 ${
            scrolled
              ? "bg-white shadow-md py-2"
              : "bg-gradient-to-b from-orange-500 to-orange-400 py-6"
          }`}
        >
          <div className="px-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                className={`${
                  scrolled ? "text-orange-500" : "text-white"
                } hover:bg-white/10`}
                onClick={goBack}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <h1
                className={`text-xl font-bold ${
                  scrolled ? "text-orange-500" : "text-white"
                }`}
              >
                المطاعم
              </h1>
              <div className="w-10" /> {/* عنصر فارغ للمحاذاة */}
            </div>

            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                    scrolled ? "text-gray-400" : "text-white/70"
                  }`}
                />
                <Input
                  type="text"
                  placeholder="ابحث عن مطعم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pr-10 ${
                    scrolled
                      ? "bg-gray-100 border-gray-200"
                      : "bg-white/20 border-transparent text-white placeholder:text-white/70"
                  }`}
                />
              </div>
              <Button
                variant={scrolled ? "outline" : "ghost"}
                size="icon"
                className={scrolled ? "border-gray-200" : "bg-white/20 text-white"}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* شريط الفئات */}
            <div className={`mt-4 overflow-x-auto no-scrollbar ${scrolled ? "" : "pb-2"}`}>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`px-3 py-1 h-auto whitespace-nowrap text-xs font-medium ${
                      selectedCategory === category
                        ? "bg-orange-500 text-white border-transparent"
                        : scrolled
                        ? "bg-white border-gray-200 text-gray-700"
                        : "bg-white/20 border-transparent text-white hover:bg-white/30"
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* المساحة الفارغة للمحتوى بحيث لا يكون خلف الهيدر */}
        <div className={scrolled ? "pt-28" : "pt-44"} />

        {/* قائمة المطاعم */}
        <main className="px-4">
          {isLoading ? (
            // هياكل تحميل للمطاعم
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="mb-4">
                  <Card className="overflow-hidden border-none shadow-sm">
                    <Skeleton className="h-40 w-full" />
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-32" />
                      </div>
                      <div className="flex justify-between mt-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-8 w-full mt-2" />
                    </CardContent>
                  </Card>
                </div>
              ))
          ) : filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="mb-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className="relative h-48">
                    <img
                      src={restaurant.logo_url || "https://picsum.photos/400/200"}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-orange-500 text-white shadow-sm border-0">
                        <Clock className="w-3 h-3 ml-1" />
                        {restaurant.delivery_time || "25-35 دقيقة"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center shadow-sm">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 ml-0.5" />
                            <span className="text-xs font-bold">
                              {restaurant.rating}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-white/90 backdrop-blur-sm text-gray-800 border-0 shadow-sm"
                        >
                          {restaurant.delivery_fee ? 
                            `توصيل: ${restaurant.delivery_fee} ر.س` : 
                            "توصيل مجاني"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant="outline"
                        className="bg-orange-50 text-orange-700 border-orange-100"
                      >
                        {restaurant.description?.split(",")[0] || "مطعم"}
                      </Badge>
                      <h3 className="text-lg font-bold text-right">
                        {restaurant.name}
                      </h3>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-xs">
                        <MapPin className="w-3.5 h-3.5 ml-1" />
                        <span>2.5 كم</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {restaurant.delivery_time || "25-35 دقيقة"}
                      </div>
                    </div>

                    <Button
                      className="w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestaurantClick(restaurant.id);
                      }}
                    >
                      <ShoppingBag className="w-4 h-4 ml-2" />
                      تصفح القائمة
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <div className="min-h-[50vh] flex flex-col items-center justify-center py-10">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                لم نجد أي مطاعم
              </h3>
              <p className="text-gray-500 text-center">
                حاول تغيير كلمات البحث أو الفئة المختارة
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("الكل");
                }}
              >
                إعادة ضبط البحث
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Restaurants;
