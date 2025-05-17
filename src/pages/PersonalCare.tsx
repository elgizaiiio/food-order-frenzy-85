
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Heart, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { usePersonalCareProducts, useProductCategories } from '@/hooks/usePersonalCareData';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const PersonalCare: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { data: products, isLoading: productsLoading } = usePersonalCareProducts();
  const { data: categories, isLoading: categoriesLoading } = useProductCategories();
  const { addToCart, itemCount, totalPrice } = usePersonalCareCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // تصفية المنتجات حسب الفئة والبحث
  const filteredProducts = products?.filter(product => {
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (product.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // تعامل مع حدث التمرير لإظهار / إخفاء الرأس
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // التمرير لأسفل وتجاوز الحد
        setHeaderVisible(false);
      } else {
        // التمرير لأعلى أو في الأعلى
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // إلغاء التصفية إذا تم النقر على نفس الفئة
    } else {
      setSelectedCategory(category);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with Gradient */}
        <motion.div 
          className={`sticky top-0 bg-gradient-to-r from-purple-600 to-pink-500 z-10 shadow-md transition-transform duration-300 ${
            headerVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <Link to="/" className="text-white hover:text-pink-100 transition-colors">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.div>
            </Link>
            <motion.h1 
              className="text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              العناية الشخصية
            </motion.h1>
            <Link to="/personal-care/cart" className="relative">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                {itemCount > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 bg-white text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {itemCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="search"
                placeholder="ابحث عن منتجات العناية الشخصية"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border-pink-100 bg-white/90 text-gray-700 shadow-md placeholder:text-pink-300"
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Search className="h-4 w-4 text-pink-500" />
              </div>
            </motion.div>
            
            {/* Filter Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="outline" 
                className="w-full mt-2 flex items-center justify-between text-pink-700 bg-white/90 hover:bg-pink-50 border-pink-200"
                onClick={() => setShowFilters(!showFilters)}
              >
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>تصفية حسب الفئات</span>
                </div>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories Filter */}
        {showFilters && (
          <motion.div 
            className="px-4 py-3 border-b border-pink-100 bg-white"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-3 gap-2">
              {categoriesLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-full" />
                ))
              ) : (
                categories?.map(category => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`rounded-full border ${
                        selectedCategory === category
                          ? 'bg-pink-600 hover:bg-pink-700 text-white border-pink-700'
                          : 'border-pink-200 hover:bg-pink-50 text-pink-800'
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="px-4 py-4">
          <motion.h2 
            className="text-lg font-bold text-pink-800 mb-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {selectedCategory ? `${selectedCategory} (${filteredProducts?.length || 0})` : `منتجات العناية الشخصية (${filteredProducts?.length || 0})`}
          </motion.h2>
          
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
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeIn}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden border border-pink-100 hover:shadow-lg transition-all rounded-xl">
                    <Link to={`/personal-care/product/${product.id}`} className="block">
                      <div className="relative">
                        <img
                          src={product.image_url || 'https://via.placeholder.com/300?text=Beauty+Product'}
                          alt={product.name}
                          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {product.stock <= 0 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-sm bg-red-500 px-3 py-1 rounded-md">نفذت الكمية</span>
                          </div>
                        )}
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
                        </motion.div>
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
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Search className="h-8 w-8 text-pink-400" />
              </motion.div>
              <h3 className="text-lg font-medium text-pink-800 mb-2">لم يتم العثور على منتجات</h3>
              <p className="text-gray-500">
                {searchTerm ? 'جرب بحثًا مختلفًا أو تصفح الفئات' : 'لا توجد منتجات متاحة حاليًا'}
              </p>
            </motion.div>
          )}
        </div>

        {/* Floating Cart Button */}
        {itemCount > 0 && (
          <motion.div 
            className="fixed bottom-16 left-0 right-0 max-w-md z-10 px-4 mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Link to="/personal-care/cart">
              <Button 
                className="w-full py-3 shadow-lg rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                عرض السلة ({itemCount}) • {totalPrice.toFixed(2)} ج.م
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PersonalCare;
