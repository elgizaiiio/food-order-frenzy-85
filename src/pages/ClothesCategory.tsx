
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Star, Plus, Filter, ChevronDown, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ClothesProduct {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  rating: number;
  salesCount: number;
  discount?: number;
}

// Mock API function
const fetchCategoryProducts = (categoryId: string) => {
  // This would be replaced with a real API call
  return new Promise<ClothesProduct[]>((resolve) => {
    setTimeout(() => {
      const products: ClothesProduct[] = [];
      const count = 8;

      const categoryImages: Record<string, string[]> = {
        'girls': [
          'https://images.unsplash.com/photo-1613995887374-3c9e8d49320b?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1473283297141-90144560e010?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1541580621-39f717ce77cd?auto=format&fit=crop&q=80&w=240',
        ],
        'boys': [
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1502810217690-b2aa88e35100?auto=format&fit=crop&q=80&w=240',
        ],
        'kids': [
          'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1607603750909-408e193868a7?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=240',
        ],
        'sportswear': [
          'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1598346762291-aee88549193f?auto=format&fit=crop&q=80&w=240',
          'https://images.unsplash.com/photo-1567013127542-490d757e6aa4?auto=format&fit=crop&q=80&w=240',
        ],
      };

      // Default images if specific category not found
      const defaultImages = [
        'https://images.unsplash.com/photo-1619451683204-a4bcd6ad008a?auto=format&fit=crop&q=80&w=240',
        'https://images.unsplash.com/photo-1585652757173-57de5e9fab26?auto=format&fit=crop&q=80&w=240',
        'https://images.unsplash.com/photo-1571781418606-70265b9cce90?auto=format&fit=crop&q=80&w=240',
        'https://images.unsplash.com/photo-1571646750134-1632716adbe6?auto=format&fit=crop&q=80&w=240',
      ];

      // Get images for the category or use default
      const categoryImagesList = categoryImages[categoryId] || defaultImages;

      // Product types by category
      const productTypes: Record<string, string[]> = {
        'girls': ['فساتين', 'بلوزات', 'بناطيل', 'جواكيت'],
        'boys': ['قمصان', 'بناطيل', 'تيشيرتات', 'جواكيت'],
        'kids': ['ملابس أطفال', 'أحذية', 'اكسسوارات', 'بيجامات'],
        'sportswear': ['تيشيرتات رياضية', 'بناطيل رياضية', 'أحذية رياضية', 'جواكيت رياضية']
      };

      const types = productTypes[categoryId] || ['قمصان', 'بناطيل', 'تيشيرتات'];

      for (let i = 1; i <= count; i++) {
        const imageIndex = (i - 1) % categoryImagesList.length;
        const typeIndex = (i - 1) % types.length;
        const hasDiscount = Math.random() > 0.7;

        const product: ClothesProduct = {
          id: i,
          name: `${types[typeIndex]} ${i}`,
          type: types[typeIndex],
          price: 80 + (i * 20),
          image: categoryImagesList[imageIndex],
          rating: 3.5 + Math.random() * 1.5,
          salesCount: Math.floor(Math.random() * 200),
          ...(hasDiscount && { discount: 15 + Math.floor(Math.random() * 20) })
        };
        products.push(product);
      }
      resolve(products);
    }, 500);
  });
};

const ClothesCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ClothesProduct[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Category mapping
  const categoryMap: Record<string, { name: string, color: string, bgImage: string }> = {
    'girls': { 
      name: 'ملابس بناتي', 
      color: 'from-indigo-400 to-blue-500', 
      bgImage: 'https://images.unsplash.com/photo-1613995887374-3c9e8d49320b?auto=format&fit=crop&q=80&w=600'
    },
    'boys': { 
      name: 'ملابس ولادي', 
      color: 'from-blue-500 to-cyan-400', 
      bgImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600'
    },
    'kids': { 
      name: 'ملابس أطفال', 
      color: 'from-sky-400 to-blue-500', 
      bgImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=600'
    },
    'sportswear': { 
      name: 'ملابس رياضية', 
      color: 'from-blue-400 to-indigo-500', 
      bgImage: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=600'
    },
  };

  const currentCategory = categoryMap[categoryId || ''] || { 
    name: 'الملابس', 
    color: 'from-blue-600 to-indigo-600',
    bgImage: 'https://images.unsplash.com/photo-1618518507212-8dd17705afd8?auto=format&fit=crop&q=80&w=600' 
  };

  useEffect(() => {
    setLoading(true);
    fetchCategoryProducts(categoryId || '')
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [categoryId]);

  const handleAddToCart = (product: ClothesProduct) => {
    // This would integrate with a cart context in a real app
    toast.success(`تمت إضافة ${product.name} إلى السلة بنجاح.`, {
      action: {
        label: "عرض السلة",
        onClick: () => window.location.href = '/clothes/cart'
      }
    });
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        toast.info("تمت إزالة المنتج من المفضلة");
        return prev.filter(itemId => itemId !== id);
      } else {
        toast.success("تمت إضافة المنتج للمفضلة");
        return [...prev, id];
      }
    });
  };

  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-indigo-600 text-white sticky top-0 z-10 shadow-md">
          <Link to="/clothes" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">{currentCategory.name}</h1>
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-blue-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/clothes/cart" className="text-white hover:text-blue-100 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>

        {/* Category Banner */}
        <div className="relative h-40 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${currentCategory.color} opacity-90`}></div>
          <img 
            src={currentCategory.bgImage} 
            alt={currentCategory.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <h2 className="text-2xl font-bold text-white mb-1 animate-fade-in">{currentCategory.name}</h2>
            <p className="text-sm text-white/90 animate-fade-in">تسوق أحدث صيحات الموضة من {currentCategory.name}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder={`ابحث في ${currentCategory.name}...`}
              className="w-full p-3 pl-10 pr-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Search className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
          </div>
          
          {/* Filter button */}
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              className="border-blue-300 flex items-center gap-2 text-blue-700 hover:bg-blue-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              <span>تصفية</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            
            <span className="text-sm text-gray-500">{products.length} منتج</span>
          </div>
          
          {/* Filter options */}
          {showFilters && (
            <div className="bg-blue-50 p-4 rounded-lg space-y-3 animate-fade-in border border-blue-100">
              <div>
                <h3 className="font-medium mb-2 text-blue-800">السعر</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700">أقل من 100 ريال</Button>
                  <Button variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700">100 - 200 ريال</Button>
                  <Button variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700">200+ ريال</Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-blue-800">الترتيب حسب</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700">الأكثر مبيعاً</Button>
                  <Button variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700">الأحدث</Button>
                  <Button variant="outline" size="sm" className="bg-white border-blue-200 text-blue-700">السعر: من الأقل للأعلى</Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="p-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-blue-200 h-40 rounded-lg mb-2"></div>
                  <div className="bg-blue-200 h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-blue-200 h-4 w-1/2 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden border border-blue-100 hover:shadow-lg transition-all hover:scale-[1.02] group">
                  <Link to={`/clothes/product/${product.id}`} className="block relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        خصم {product.discount}%
                      </div>
                    )}
                    <button 
                      className="absolute top-2 left-2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(product.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                  </Link>
                  <div className="p-3">
                    <Link to={`/clothes/product/${product.id}`}>
                      <h3 className="font-medium text-blue-800 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.type}</p>
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                      <span className="text-xs text-gray-600">{product.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-400 mr-1">({product.salesCount})</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        {product.discount ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-blue-700">{Math.round(product.price * (1 - product.discount/100))} ريال</span>
                            <span className="text-xs text-gray-500 line-through">{product.price} ريال</span>
                          </div>
                        ) : (
                          <span className="font-bold text-blue-700">{product.price} ريال</span>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="rounded-full h-7 w-7 p-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-md transition-shadow"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothesCategory;
