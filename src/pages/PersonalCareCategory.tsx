
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Heart, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { usePersonalCareProductsByCategory } from '@/hooks/usePersonalCareData';
import { Skeleton } from '@/components/ui/skeleton';

const PersonalCareCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products, isLoading: productsLoading } = usePersonalCareProductsByCategory(categoryId || '');
  const { addToCart, itemCount, totalPrice } = usePersonalCareCart();
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // تصفية المنتجات حسب البحث
  const filteredProducts = products?.filter(product => {
    return !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // تعامل مع حدث التمرير لإظهار / إخفاء الرأس
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // الحصول على اسم الفئة
  const getCategoryName = (id: string) => {
    switch(id) {
      case "1": return "العناية بالبشرة";
      case "2": return "العناية بالشعر";
      case "3": return "مستحضرات التجميل";
      case "4": return "العناية بالجسم";
      case "5": return "العطور";
      default: return "منتجات العناية الشخصية";
    }
  };
  
  const categoryName = getCategoryName(categoryId || '');

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with Gradient */}
        <div 
          className={`sticky top-0 bg-gradient-to-r from-purple-600 to-pink-500 z-10 shadow-md transition-transform duration-300 ${
            headerVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <Link to="/personal-care" className="text-white hover:text-pink-100 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">{categoryName}</h1>
            <Link to="/personal-care/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="ابحث في منتجات العناية الشخصية"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border-pink-100 bg-white/90 text-gray-700 shadow-md placeholder:text-pink-300"
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Search className="h-4 w-4 text-pink-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold text-pink-800 mb-3">
            {`${categoryName} (${filteredProducts?.length || 0})`}
          </h2>
          
          {productsLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden border-0 shadow-sm">
                  <Skeleton className="h-40 w-full" />
                  <div className="p-3">
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-9 w-9 rounded-full" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden border border-pink-100 hover:shadow-lg transition-all hover:scale-[1.02] rounded-xl"
                >
                  <Link to={`/personal-care/product/${product.id}`} className="block">
                    <div className="relative">
                      <img
                        src={product.image_url || 'https://via.placeholder.com/300?text=Beauty+Product'}
                        alt={product.name}
                        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {product.stock <= 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-bold text-sm bg-red-500 px-3 py-1 rounded-md">نفذت الكمية</span>
                        </div>
                      )}
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white text-pink-500 rounded-full w-8 h-8 shadow-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {product.gender && (
                        <Badge className="absolute bottom-2 right-2 bg-pink-100 text-pink-800 border-0">
                          {product.gender === 'female' ? 'للنساء' : product.gender === 'male' ? 'للرجال' : 'للجميع'}
                        </Badge>
                      )}
                    </div>
                  </Link>
                  <div className="p-3 bg-gradient-to-b from-pink-50 to-white">
                    <Link to={`/personal-care/product/${product.id}`} className="block">
                      <h3 className="font-medium text-pink-800 line-clamp-1 mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2 h-9 mb-1">{product.description}</p>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-pink-700">{product.price} ج.م</span>
                      <Button
                        size="sm"
                        disabled={product.stock <= 0}
                        onClick={() => product.stock > 0 && addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          description: product.description,
                          gender: product.gender,
                          stock: product.stock,
                          image: product.image_url || 'https://via.placeholder.com/300?text=Beauty+Product',
                          image_url: product.image_url
                        })}
                        className={`rounded-full ${
                          product.stock > 0
                            ? 'bg-pink-600 hover:bg-pink-700 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {product.stock > 0 ? 'إضافة' : 'نفذ'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="h-8 w-8 text-pink-400" />
              </div>
              <h3 className="text-lg font-medium text-pink-800 mb-2">لم يتم العثور على منتجات</h3>
              <p className="text-gray-500">
                {searchTerm ? 'جرب بحثًا مختلفًا أو تصفح الفئات' : 'لا توجد منتجات متاحة حاليًا'}
              </p>
            </div>
          )}
        </div>

        {/* Floating Cart Button */}
        {itemCount > 0 && (
          <div className="fixed bottom-16 left-0 right-0 max-w-md z-10 px-4 mx-auto">
            <Link to="/personal-care/cart">
              <Button 
                className="w-full py-3 shadow-lg rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                عرض السلة ({itemCount}) • {totalPrice.toFixed(2)} ج.م
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalCareCategory;
