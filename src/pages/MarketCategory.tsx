
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Share, ShoppingCart, Plus, Minus, Filter, MapPin, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useProductsByCategory, useCategories } from '@/hooks/useMarketData';
import { useMarketCart, MarketCartProvider } from '@/context/MarketCartContext';
import { toast } from 'sonner';
import { Product } from '@/services/marketService';

// Filter types
type FilterOption = 'all' | 'inStock' | 'priceAsc' | 'priceDesc';

const MarketCategoryContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = id || '';
  
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: products, isLoading: productsLoading, error } = useProductsByCategory(categoryId);
  const { addToCart, items, increaseQuantity, decreaseQuantity, itemCount, totalPrice } = useMarketCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const isLoading = categoriesLoading || productsLoading;

  // Show error toast if there's an error fetching data
  React.useEffect(() => {
    if (error) {
      toast.error("حدثت مشكلة في تحميل البيانات. يرجى المحاولة لاحقًا.");
    }
  }, [error]);

  // Current category name
  const currentCategory = categories?.find(cat => cat.id === categoryId)?.name || 'القسم';

  // Filter and search products
  const filteredProducts = React.useMemo(() => {
    if (!products) return [];
    
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply other filters
    switch (activeFilter) {
      case 'inStock':
        filtered = filtered.filter(p => p.inStock);
        break;
      case 'priceAsc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    return filtered;
  }, [products, searchQuery, activeFilter]);

  // Get cart item quantity
  const getCartItemQuantity = (productId: string) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Handle product action (add or manage quantity)
  const handleProductAction = (product: Product) => {
    if (!product.inStock) return;
    
    const quantity = getCartItemQuantity(product.id);
    if (quantity === 0) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <Link to="/market" className="text-white hover:text-orange-100">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">{currentCategory}</h1>
            <div className="flex items-center gap-3">
              <button className="text-white hover:text-orange-100">
                <Search className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-orange-100">
                <Share className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Location Bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b text-sm bg-orange-400 text-orange-100">
            <MapPin className="w-4 h-4" />
            <span>التوصيل إلى:</span>
            <div className="flex items-center">
              <span className="font-medium text-white">شارع التحرير، القاهرة</span>
              <ChevronDown className="w-4 h-4 mr-1" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3 bg-orange-300">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="ابحث في المنتجات..." 
                className="pr-10 bg-white/95 border-0 rounded-xl text-orange-900 placeholder:text-orange-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 py-2 border-b overflow-x-auto bg-white shadow-sm no-scrollbar">
            <div className="flex gap-2">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveFilter('all')}
                className={activeFilter === 'all' ? 'bg-orange-600 text-white hover:bg-orange-700' : 'text-orange-700 border-orange-200 hover:bg-orange-50'}
              >
                الكل
              </Button>
              <Button 
                variant={activeFilter === 'inStock' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveFilter('inStock')}
                className={activeFilter === 'inStock' ? 'bg-orange-600 text-white hover:bg-orange-700' : 'text-orange-700 border-orange-200 hover:bg-orange-50'}
              >
                متوفر
              </Button>
              <Button 
                variant={activeFilter === 'priceAsc' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveFilter('priceAsc')}
                className={activeFilter === 'priceAsc' ? 'bg-orange-600 text-white hover:bg-orange-700' : 'text-orange-700 border-orange-200 hover:bg-orange-50'}
              >
                السعر: من الأقل للأعلى
              </Button>
              <Button 
                variant={activeFilter === 'priceDesc' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveFilter('priceDesc')}
                className={activeFilter === 'priceDesc' ? 'bg-orange-600 text-white hover:bg-orange-700' : 'text-orange-700 border-orange-200 hover:bg-orange-50'}
              >
                السعر: من الأعلى للأقل
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-4">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-sm">
                  <Skeleton className="h-36 w-full" />
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
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">حدث خطأ في تحميل البيانات</h3>
              <p className="text-gray-500 mb-4">حدثت مشكلة أثناء الاتصال بالخادم. يرجى المحاولة لاحقًا</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                إعادة تحميل الصفحة
              </Button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-orange-400 text-5xl mb-4">😕</div>
              <h3 className="text-xl font-bold text-orange-800 mb-2">لم يتم العثور على منتجات</h3>
              <p className="text-gray-500 mb-4">جرب البحث بكلمات مختلفة أو تغيير الفلتر</p>
              <Button 
                onClick={() => {setSearchQuery(''); setActiveFilter('all');}}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                عرض كل المنتجات
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden border border-orange-100 rounded-xl shadow-sm hover:shadow-md transition-all animate-fade-in">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-36 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=صورة+غير+متوفرة';
                      }}
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <span className="bg-white text-red-500 px-2 py-1 rounded-md text-xs font-bold">نفذت الكمية</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-gradient-to-b from-orange-50 to-white">
                    <h4 className="font-medium text-sm mb-1 text-orange-800">{product.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{product.quantity}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-orange-700">{product.price} ج.م</span>
                      
                      {getCartItemQuantity(product.id) > 0 ? (
                        <div className="flex items-center gap-2">
                          <Button 
                            onClick={() => decreaseQuantity(product.id)}
                            size="sm" 
                            className="rounded-full h-7 w-7 p-0 bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-5 text-center text-orange-900">
                            {getCartItemQuantity(product.id)}
                          </span>
                          <Button 
                            onClick={() => product.inStock && increaseQuantity(product.id)}
                            disabled={!product.inStock}
                            size="sm" 
                            className="rounded-full h-7 w-7 p-0 bg-orange-600 hover:bg-orange-700 text-white shadow-sm"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleProductAction(product)}
                          disabled={!product.inStock}
                          size="sm" 
                          className={`rounded-full h-9 w-9 p-0 shadow-sm ${product.inStock ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-300'}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Cart Floating Button - Adjusted position to be above bottom nav */}
        {itemCount > 0 && (
          <div className="fixed bottom-20 left-0 right-0 mx-auto w-11/12 max-w-md z-30">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg shadow-lg p-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-bold">{itemCount} منتج</span>
                </div>
                <span className="font-bold">
                  {totalPrice.toFixed(2)} ج.م
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/market" className="w-full">
                  <Button variant="outline" className="w-full bg-white text-orange-700 border-0 hover:bg-orange-50 shadow-sm">
                    إضافة المزيد
                  </Button>
                </Link>
                <Link to="/market/cart" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-sm">
                    إتمام الطلب
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapper component with MarketCartProvider
const MarketCategory: React.FC = () => {
  return (
    <MarketCartProvider>
      <MarketCategoryContent />
    </MarketCartProvider>
  );
};

export default MarketCategory;
