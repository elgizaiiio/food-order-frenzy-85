
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Pill, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePharmacyCategories, useRecommendedProducts } from '@/hooks/usePharmacyData';
import { usePharmacyCart } from '@/context/PharmacyCartContext';
import { PharmacyProduct } from '@/types/pharmacy';

const Pharmacy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const {
    data: categories,
    isLoading: categoriesLoading
  } = usePharmacyCategories();
  
  const {
    data: recommendedProducts,
    isLoading: productsLoading
  } = useRecommendedProducts();
  
  const {
    addToCart,
    itemCount,
    totalPrice
  } = usePharmacyCart();

  // Handle scroll event to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setHeaderVisible(false);
      } else {
        // Scrolling up or at the top
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const getCategoryIcon = (iconName: string) => {
    // تنفيذ بسيط للأيقونات، في تطبيق حقيقي يمكن استخدام مكتبة أيقونات كاملة
    return <Pill className="h-5 w-5 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with gradient - now with transition for showing/hiding */}
        <div 
          className={`sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 z-10 shadow-md rounded-b-2xl transition-transform duration-300 ${
            headerVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">الصيدلية</h1>
            <Link to="/pharmacy/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Search */}
          <div className="px-4 pb-6">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="ابحث عن الأدوية والمنتجات" 
                className="pl-10 pr-4 py-2 rounded-full border-blue-100 bg-white/90 backdrop-blur-sm text-gray-700 shadow-md" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Search className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            
            {/* زر "عايز حاجة معينة؟" */}
            <Button 
              variant="outlineBlue"
              onClick={() => setShowCategories(!showCategories)} 
              className="w-full mt-3 flex items-center justify-between text-blue-700 backdrop-blur-sm bg-white/90 hover:bg-blue-50"
            >
              <span>عايز حاجة معينة؟</span>
              {showCategories ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Categories - تظهر فقط عند الضغط على الزر */}
        {showCategories && (
          <div className="px-4 py-4 border-b bg-white/95 backdrop-blur-sm animate-fade-in">
            <h2 className="text-lg font-bold mb-4 text-blue-800">الفئات</h2>
            {categoriesLoading ? (
              <div className="flex justify-center py-4">
                <p className="text-blue-600">جاري التحميل...</p>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3">
                {categories?.map(category => (
                  <Link 
                    key={category.id} 
                    to={`/pharmacy/category/${category.id}`} 
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-1 shadow-sm hover:shadow-md transition-all hover:scale-105 border border-blue-100">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <span className="text-xs text-center text-blue-800">{category.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recommended Products */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-4 text-blue-800">منتجات موصى بها</h2>
          {productsLoading ? (
            <div className="flex justify-center py-8">
              <p className="text-blue-600">جاري التحميل...</p>
            </div>
          ) : !recommendedProducts || recommendedProducts.length === 0 ? (
            <div className="text-center py-8 border rounded-lg border-dashed border-blue-200">
              <p className="text-blue-500">لا توجد منتجات حالياً</p>
              <p className="text-blue-400 text-sm mt-2">يمكنك إضافة منتجات من لوحة التحكم</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {recommendedProducts?.map((product: PharmacyProduct) => (
                <Card key={product.id} className="overflow-hidden border border-blue-100 shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                  <div className="p-3">
                    <div className="bg-blue-50 rounded-lg overflow-hidden">
                      <img 
                        src={product.image_url || 'https://via.placeholder.com/200?text=Medicine'} 
                        alt={product.name} 
                        className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <h3 className="font-medium mt-2 line-clamp-1 text-blue-800">{product.name}</h3>
                    <p className="text-xs text-blue-600 line-clamp-2 h-8">{product.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-blue-700">{product.price} ج.م</span>
                      <Button 
                        size="sm" 
                        variant="pharmacy"
                        onClick={() => addToCart(product as any)} 
                        className="text-xs px-3"
                      >
                        إضافة
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* زر إتمام الطلب - يظهر فقط عند وجود منتجات في السلة */}
        {itemCount > 0 && (
          <div className="fixed bottom-20 left-0 right-0 max-w-md z-10 mb-16 px-4 mx-auto">
            <Link to="/pharmacy/cart">
              <Button 
                variant="pharmacy" 
                size="checkout"
                className="w-full py-3 shadow-lg rounded-xl font-bold"
              >
                إتمام الطلب ({totalPrice.toFixed(2)} ج.م)
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pharmacy;
