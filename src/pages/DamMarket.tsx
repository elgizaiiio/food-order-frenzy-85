
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Share, ShoppingCart, MapPin, ChevronDown, Package, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCategories, useOffers, usePopularProducts } from '@/hooks/useMarketData';
import { MarketCartProvider, useMarketCart } from '@/context/MarketCartContext';

const DamMarketContent: React.FC = () => {
  const {
    data: categories,
    isLoading: categoriesLoading
  } = useCategories();
  const {
    data: offers,
    isLoading: offersLoading
  } = useOffers();
  const {
    data: popularProducts,
    isLoading: productsLoading
  } = usePopularProducts();
  const {
    addToCart,
    itemCount,
    totalPrice
  } = useMarketCart();

  return <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="text-white hover:text-orange-100 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">سوبر ماركت dam</h1>
            
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3 bg-orange-400">
            <div className="relative">
              <Input type="search" placeholder="ابحث عن منتجات..." className="pr-10 bg-white/95 border-0 rounded-xl text-orange-900 placeholder:text-orange-300" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Intro Banner */}
        <div className="mx-4 my-4 p-5 rounded-2xl bg-gradient-to-r from-orange-100 to-amber-50 border border-orange-200 shadow-sm">
          <h2 className="text-2xl font-bold text-orange-800 mb-2">توصيل سريع لمنتجاتك اليومية</h2>
          <div className="flex items-center gap-2 text-sm text-orange-600">
            <Clock className="w-4 h-4" />
            <span>التوصيل خلال 45-30 دقيقة</span>
          </div>
        </div>

        {/* Categories Section */}
        <div className="px-4 py-4">
          <h3 className="text-lg font-bold mb-4 flex items-center text-orange-800">
            <Package className="w-5 h-5 ml-2 text-orange-600" />
            الفئات
          </h3>
          
          {categoriesLoading ? <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map(item => <Card key={item} className="p-2">
                  <Skeleton className="w-20 h-20 rounded-full mb-2 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </Card>)}
            </div> : <div className="grid grid-cols-3 gap-3">
              {categories?.map(category => <Link key={category.id} to={`/market/category/${category.id}`}>
                  <Card className="flex flex-col items-center p-2 hover:shadow-md transition-all border border-orange-100 rounded-xl overflow-hidden">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-orange-100 shadow-sm">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-xs font-medium text-center text-orange-800">{category.name}</h4>
                  </Card>
                </Link>)}
            </div>}
        </div>

        {/* Offers Section */}
        <div className="px-4 py-4 bg-orange-50">
          <h3 className="text-lg font-bold mb-4 text-orange-800">عروض خاصة</h3>
          
          {offersLoading ? <div className="overflow-x-auto flex gap-3 pb-2">
              {[1, 2, 3].map(item => <div key={item} className="min-w-60 flex-shrink-0">
                  <Skeleton className="h-32 rounded-xl mb-2" />
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>)}
            </div> : <div className="overflow-x-auto flex gap-3 pb-2 no-scrollbar">
              {offers?.map(offer => <Card key={offer.id} className="min-w-60 overflow-hidden flex-shrink-0 border-0 rounded-xl shadow-md animate-fade-in">
                  <div className="relative">
                    <img src={offer.image} alt={offer.title} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <Badge className="absolute top-2 right-2 bg-red-500 border-0 text-white font-bold">
                      خصم {offer.discount}٪
                    </Badge>
                  </div>
                  <div className="p-3 bg-gradient-to-b from-orange-50 to-white">
                    <h4 className="font-bold text-orange-800">{offer.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{offer.description}</p>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-sm">
                      استفد الآن
                    </Button>
                  </div>
                </Card>)}
            </div>}
        </div>

        {/* Popular Products Section */}
        <div className="px-4 py-4">
          <h3 className="text-lg font-bold mb-4 text-orange-800">الأكثر طلباً</h3>
          
          {productsLoading ? <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(item => <Card key={item} className="overflow-hidden border-0 shadow-sm">
                  <Skeleton className="h-32 w-full" />
                  <div className="p-3">
                    <Skeleton className="h-5 w-20 mb-1" />
                    <Skeleton className="h-4 w-32 mb-2" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-16 rounded-full" />
                    </div>
                  </div>
                </Card>)}
            </div> : <div className="grid grid-cols-2 gap-4">
              {popularProducts?.map(product => <Card key={product.id} className="overflow-hidden border border-orange-100 rounded-xl shadow-sm hover:shadow-md transition-all animate-fade-in">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                    {!product.inStock && <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <span className="bg-white text-red-500 px-2 py-1 rounded-md text-xs font-bold">نفذت الكمية</span>
                      </div>}
                  </div>
                  <div className="p-3 bg-gradient-to-b from-orange-50 to-white">
                    <h4 className="font-medium text-sm mb-1 text-orange-800">{product.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{product.quantity}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-orange-700">{product.price} جنيه</span>
                      <Button onClick={() => product.inStock && addToCart(product)} disabled={!product.inStock} size="sm" className={`rounded-full h-9 w-9 p-0 shadow-sm ${product.inStock ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-300'}`}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>)}
            </div>}
        </div>

        {/* Cart Floating Button - Adjusted position to be above bottom nav */}
        {itemCount > 0 && <div className="fixed bottom-20 left-0 right-0 mx-auto w-11/12 max-w-md z-30">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg shadow-lg p-4 animate-fade-in">
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
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white border-0 shadow-md transition-all">
                    إتمام الطلب
                  </Button>
                </Link>
              </div>
            </div>
          </div>}
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
