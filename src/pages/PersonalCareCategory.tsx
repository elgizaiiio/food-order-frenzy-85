
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Star, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { toast } from 'sonner';
import { PersonalCareProduct } from '@/context/PersonalCareCartContext';

const PersonalCareCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { addToCart, itemCount, totalPrice } = usePersonalCareCart();
  
  // Category mapping
  const categoryMap: Record<string, { name: string, gender: 'women' | 'men', color: string }> = {
    'makeup': { name: 'الميكب', gender: 'women', color: 'from-pink-50 to-purple-50' },
    'skincare': { name: 'سكين كير', gender: 'women', color: 'from-pink-50 to-purple-50' },
    'accessories': { name: 'اكسسوارات', gender: 'women', color: 'from-pink-50 to-purple-50' },
    'perfumes': { name: 'عطور', gender: 'women', color: 'from-pink-50 to-purple-50' },
    'bodycare': { name: 'بادي كير', gender: 'women', color: 'from-pink-50 to-purple-50' },
    'nailcare': { name: 'نيل كير', gender: 'women', color: 'from-pink-50 to-purple-50' },
    'menperfumes': { name: 'عطور', gender: 'men', color: 'from-blue-50 to-cyan-50' },
    'menaccessories': { name: 'اكسسوارات', gender: 'men', color: 'from-blue-50 to-cyan-50' },
    'shaving': { name: 'الحلاقة والعناية باللحية', gender: 'men', color: 'from-blue-50 to-cyan-50' },
    'menskincare': { name: 'سكين كير رجالي', gender: 'men', color: 'from-blue-50 to-cyan-50' },
    'deodorants': { name: 'ديودرنت', gender: 'men', color: 'from-blue-50 to-cyan-50' },
  };

  const currentCategory = categoryMap[categoryId || ''] || { name: 'القسم', gender: 'women', color: 'from-pink-50 to-purple-50' };
  
  // Generate mock products based on category
  const generateProducts = () => {
    // This would come from the database in a real app
    const products = [];
    const count = 8; // Number of products to generate
    
    // Sample images by category
    const imageMap: Record<string, string[]> = {
      'makeup': [
        'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599733594230-5c61ba8de302?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599733589518-2c5ee3b25b10?q=80&w=200&auto=format&fit=crop',
      ],
      'skincare': [
        'https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1631730359585-5e3085eb4d5b?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=200&auto=format&fit=crop',
      ],
      // Default images if specific category not found
      'default': [
        'https://images.unsplash.com/photo-1619451683204-a4bcd6ad008a?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1585652757173-57de5e9fab26?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571781418606-70265b9cce90?q=80&w=200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571646750134-1632716adbe6?q=80&w=200&auto=format&fit=crop',
      ],
    };
    
    // Get images for the category or use default
    const categoryImages = imageMap[categoryId || ''] || imageMap['default'];
    
    for (let i = 1; i <= count; i++) {
      const imageIndex = (i - 1) % categoryImages.length;
      
      const product: PersonalCareProduct = {
        id: i,
        name: `${currentCategory.name} ${i}`,
        price: 30 + (i * 15),
        image: categoryImages[imageIndex],
      };
      products.push(product);
    }
    
    return products;
  };
  
  const products = generateProducts();

  const handleAddToCart = (product: PersonalCareProduct) => {
    addToCart(product);
    toast(`تمت إضافة ${product.name} إلى السلة بنجاح.`);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/personal-care" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">{currentCategory.name}</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-700">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Banner */}
        <div className={`p-4 bg-gradient-to-r ${currentCategory.color} mb-4`}>
          <h2 className="text-xl font-bold">{currentCategory.name}</h2>
          <p className="text-sm text-gray-600">اختر من بين أفضل منتجات {currentCategory.name} المتوفرة</p>
        </div>

        {/* Product Filters */}
        <div className="px-4 mb-4">
          <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              الكل
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              الأكثر مبيعًا
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              الأعلى تقييمًا
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              أقل سعر
            </Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              أعلى سعر
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <Link to={`/personal-care/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-36 object-cover"
                  />
                </Link>
                <div className="p-3">
                  <Link to={`/personal-care/product/${product.id}`}>
                    <h3 className="font-medium">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-xs">{(4 + Math.random()).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{product.price} ريال</span>
                    <Button 
                      size="sm" 
                      className="rounded-full h-7 w-7 p-0 bg-gradient-to-r from-purple-500 to-pink-500"
                      onClick={() => handleAddToCart(product)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Floating Button */}
        {itemCount > 0 && (
          <Link to="/personal-care/cart">
            <div className="fixed bottom-5 left-0 right-0 mx-auto w-4/5 max-w-md bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-3 px-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="font-bold">{itemCount} منتج</span>
              </div>
              <span className="font-bold">
                {totalPrice} ريال
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PersonalCareCategory;
