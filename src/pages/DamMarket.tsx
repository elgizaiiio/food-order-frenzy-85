
import React, { useCallback, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Share, ShoppingCart, MapPin, ChevronDown, Package, Clock, Filter, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCategories, useOffers, usePopularProducts } from '@/hooks/useMarketData';
import { MarketCartProvider, useMarketCart } from '@/context/MarketCartContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// تحسين الأداء باستخدام الهوك المخصص للفلترة
const useFilteredProducts = (products, searchQuery) => {
  return React.useMemo(() => {
    if (!products || !searchQuery.trim()) return products;
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);
};

const LazyImage = ({ src, alt, className, fallback }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  return (
    <div className={`relative overflow-hidden ${className} ${!loaded && !error ? 'bg-gradient-to-r from-orange-50 to-orange-100 animate-pulse' : ''}`}>
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-orange-50 text-orange-300">
          {fallback || '🖼️'}
        </div>
      )}
    </div>
  );
};

const DamMarketContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('شارع التحرير، القاهرة');
  const savedAddresses = ['شارع التحرير، القاهرة', 'ميدان رمسيس', 'المعادي'];

  // حالة البيانات
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useCategories();
  const {
    data: offers,
    isLoading: offersLoading,
    error: offersError
  } = useOffers();
  const {
    data: popularProducts,
    isLoading: productsLoading,
    error: productsError
  } = usePopularProducts();
  
  const {
    addToCart,
    itemCount,
    totalPrice
  } = useMarketCart();

  // تصفية المنتجات حسب البحث للتحسين
  const filteredProducts = useFilteredProducts(popularProducts, searchQuery);

  // مع معالج التغييرات في البحث لتحسين الأداء
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // مُعالج إضافة إلى السلة مع تعزيز
  const handleAddToCart = useCallback((product) => {
    if (product.inStock) {
      addToCart(product);
    }
  }, [addToCart]);

  // التحقق من وجود أخطاء
  const hasError = categoriesError || offersError || productsError;

  return <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24 shadow-lg">
        {/* الهيدر - تصميم محسن */}
        <div className="sticky top-0 z-10">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg">
            <div className="flex items-center justify-between p-4">
              <Link to="/" className="text-white hover:text-orange-100 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold tracking-wide">سوبر ماركت dam</h1>
              <div className="flex items-center gap-2">
                <button className="text-white hover:text-orange-100 transition-all transform hover:scale-110">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* تحديد العنوان - أفضل تنسيق */}
            <div className="flex items-center gap-2 px-4 py-2 text-sm bg-orange-500">
              <MapPin className="w-4 h-4" />
              <span>التوصيل إلى:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="link" className="h-auto p-0 mx-1 flex items-center gap-1.5 text-white">
                    <span className="font-medium">{selectedAddress}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60" align="start">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-orange-900">العناوين المحفوظة</h4>
                    {savedAddresses.map((addr, idx) => (
                      <Button 
                        key={idx} 
                        variant="ghost" 
                        className="w-full justify-start text-sm hover:bg-orange-50 hover:text-orange-700" 
                        onClick={() => setSelectedAddress(addr)}
                      >
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        {addr}
                      </Button>
                    ))}
                    <Button variant="outline" className="w-full text-xs mt-2 text-orange-700 border-orange-300 hover:bg-orange-50 hover:border-orange-400">
                      إضافة عنوان جديد
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* شريط البحث - تصميم محسن */}
            <div className="px-4 py-3 bg-orange-400 border-b border-orange-300">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-grow">
                  <Input 
                    type="search" 
                    placeholder="ابحث عن منتجات..." 
                    className="pr-10 bg-white/95 border-0 rounded-xl text-orange-900 placeholder:text-orange-300 focus-visible:ring-orange-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-white/80 hover:bg-white text-orange-700"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-1" />
                  <span className="text-xs">فلتر</span>
                </Button>
              </div>
              
              {/* قسم الفلترة - عند الضغط على زر الفلتر */}
              {showFilters && (
                <div className="mt-3 p-3 bg-white rounded-xl shadow-md animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-orange-900">فلترة حسب</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-orange-600 hover:text-orange-700 p-0 h-auto text-xs"
                      onClick={() => setShowFilters(false)}
                    >
                      إغلاق
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                      الأكثر مبيعاً
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                      السعر: من الأقل للأعلى
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                      السعر: من الأعلى للأقل
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50">
                      المتوفر فقط
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* رسالة خطأ - إذا كان هناك أي خطأ في تحميل البيانات */}
        {hasError && (
          <div className="text-center py-12 mx-4">
            <div className="text-red-400 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-red-800 mb-2">حدث خطأ في تحميل البيانات</h3>
            <p className="text-gray-500 mb-4">يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              إعادة المحاولة
            </Button>
          </div>
        )}

        {!hasError && (
          <>
            {/* لافتة الترحيب - تصميم محسن */}
            <div className="m-4 p-5 rounded-2xl bg-gradient-to-r from-orange-100 to-amber-50 border border-orange-200 shadow-md animate-fade-in">
              <h2 className="text-2xl font-bold text-orange-800 mb-2">توصيل سريع لمنتجاتك اليومية</h2>
              <div className="flex items-center gap-2 text-sm text-orange-600">
                <Clock className="w-4 h-4" />
                <span>التوصيل خلال 45-30 دقيقة</span>
              </div>
              <div className="mt-3 bg-white/70 p-2 rounded-lg border border-orange-100">
                <div className="flex items-center gap-2 text-orange-700">
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span className="text-sm font-medium">عروض حصرية لعملائنا المميزين</span>
                </div>
              </div>
            </div>

            {/* قسم الفئات - تصميم محسن */}
            <div className="px-4 py-4">
              <h3 className="text-lg font-bold mb-4 flex items-center text-orange-800">
                <Package className="w-5 h-5 ml-2 text-orange-600" />
                الفئات
              </h3>
              
              {categoriesLoading ? (
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                    <Card key={item} className="p-2 border-0">
                      <Skeleton className="w-16 h-16 rounded-full mb-2 mx-auto" />
                      <Skeleton className="h-4 w-12 mx-auto" />
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {categories?.map(category => (
                    <Link key={category.id} to={`/market/category/${category.id}`}>
                      <Card className="flex flex-col items-center p-2 hover:shadow-md transition-all border border-orange-100 rounded-xl overflow-hidden group">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-orange-100 shadow-sm transform transition-transform group-hover:scale-105">
                          <LazyImage 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full h-full" 
                            fallback={category.name[0]}
                          />
                        </div>
                        <h4 className="text-xs font-medium text-center text-orange-800 group-hover:text-orange-600 transition-colors">{category.name}</h4>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* قسم العروض - تصميم محسن */}
            <div className="px-4 py-4 bg-gradient-to-br from-orange-50 to-amber-50">
              <h3 className="text-lg font-bold mb-4 text-orange-800 flex items-center">
                <Star className="w-5 h-5 mr-2 fill-orange-500 text-orange-500" />
                عروض خاصة
              </h3>
              
              {offersLoading ? (
                <div className="overflow-x-auto flex gap-3 pb-2">
                  {[1, 2, 3].map(item => (
                    <div key={item} className="min-w-60 flex-shrink-0">
                      <Skeleton className="h-32 rounded-xl mb-2" />
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto flex gap-3 pb-2 no-scrollbar">
                  {offers?.map(offer => (
                    <Card key={offer.id} className="min-w-60 overflow-hidden flex-shrink-0 border-0 rounded-xl shadow-lg animate-fade-in group hover:shadow-xl transition-all">
                      <div className="relative">
                        <LazyImage 
                          src={offer.image} 
                          alt={offer.title} 
                          className="w-full h-32" 
                          fallback="🎁"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <Badge className="absolute top-2 right-2 bg-red-500 border-0 text-white font-bold animate-pulse">
                          خصم {offer.discount}٪
                        </Badge>
                      </div>
                      <div className="p-3 bg-gradient-to-b from-orange-50 to-white">
                        <h4 className="font-bold text-orange-800 group-hover:text-orange-600 transition-colors">{offer.title}</h4>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{offer.description}</p>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-md transform transition-transform hover:scale-[1.02]">
                          استفد الآن
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* قسم المنتجات الشائعة - تصميم محسن */}
            <div className="px-4 py-4">
              <h3 className="text-lg font-bold mb-4 text-orange-800 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-orange-600" />
                الأكثر طلباً
              </h3>
              
              {/* حالة البحث الفارغة */}
              {searchQuery && filteredProducts?.length === 0 && (
                <div className="text-center py-8 bg-orange-50 rounded-xl">
                  <div className="text-orange-400 text-5xl mb-3">🔍</div>
                  <h3 className="text-xl font-bold text-orange-800 mb-2">لا توجد نتائج</h3>
                  <p className="text-gray-500">لم نتمكن من العثور على منتجات تطابق "{searchQuery}"</p>
                  <Button 
                    onClick={() => setSearchQuery('')}
                    variant="outline"
                    className="mt-3 border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    مسح البحث
                  </Button>
                </div>
              )}
              
              {/* حالة التحميل */}
              {productsLoading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(item => (
                    <Card key={item} className="overflow-hidden border-0 shadow-sm">
                      <Skeleton className="h-32 w-full" />
                      <div className="p-3">
                        <Skeleton className="h-5 w-20 mb-1" />
                        <Skeleton className="h-4 w-32 mb-2" />
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-8 w-16 rounded-full" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts?.map(product => (
                    <Card key={product.id} className="overflow-hidden border border-orange-100 rounded-xl shadow-sm hover:shadow-md transition-all animate-fade-in group">
                      <div className="relative">
                        <LazyImage 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-32" 
                          fallback="📦"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <span className="bg-white text-red-500 px-2 py-1 rounded-md text-xs font-bold">نفذت الكمية</span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-orange-100 text-orange-800 font-medium">
                            {product.quantity}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gradient-to-b from-orange-50 to-white">
                        <h4 className="font-medium text-sm mb-1 text-orange-800 group-hover:text-orange-600 transition-colors">{product.name}</h4>
                        <p className="text-xs text-gray-500 mb-2 opacity-80">{product.description?.substring(0, 50) || product.quantity}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-orange-700">{product.price} جنيه</span>
                          <Button 
                            onClick={() => handleAddToCart(product)} 
                            disabled={!product.inStock} 
                            size="sm" 
                            className={`rounded-full h-9 w-9 p-0 shadow-md transform transition-transform hover:scale-110 ${
                              product.inStock ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' : 'bg-gray-300'
                            }`}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* زر السلة العائم - محسن */}
        {itemCount > 0 && (
          <div className="fixed bottom-20 left-0 right-0 mx-auto w-11/12 max-w-md z-30 animate-fade-in">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg shadow-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-bold">{itemCount} منتج</span>
                </div>
                <span className="font-bold">
                  {totalPrice.toFixed(2)} جنيه
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/market" className="w-full">
                  <Button variant="outline" className="w-full bg-white text-orange-700 border-0 hover:bg-orange-50 shadow-sm">
                    إضافة المزيد
                  </Button>
                </Link>
                <Link to="/market/cart" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white border-0 shadow-md transition-all transform hover:scale-[1.02]">
                    إتمام الطلب
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>;
};

// Wrapper component with MarketCartProvider
const DamMarket: React.FC = () => {
  return <MarketCartProvider>
      <DamMarketContent />
    </MarketCartProvider>;
};

export default DamMarket;
