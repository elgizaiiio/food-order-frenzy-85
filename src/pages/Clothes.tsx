
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Tag, Percent, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Clothes: React.FC = () => {
  // Categories for clothes
  const categories = [{
    id: 'girls',
    name: 'ملابس بناتي',
    image: 'https://images.unsplash.com/photo-1613995887374-3c9e8d49320b?auto=format&fit=crop&q=80&w=300&h=300',
    color: 'from-indigo-400 to-blue-500'
  }, {
    id: 'boys',
    name: 'ملابس ولادي',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300&h=300',
    color: 'from-blue-500 to-cyan-400'
  }, {
    id: 'kids',
    name: 'ملابس أطفال',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=300&h=300',
    color: 'from-sky-400 to-blue-500'
  }, {
    id: 'sportswear',
    name: 'ملابس رياضية',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=300&h=300',
    color: 'from-blue-400 to-indigo-500'
  }];

  // Featured products
  const featuredProducts = [{
    id: 1,
    name: 'قميص أنيق',
    price: 150,
    image: 'https://images.unsplash.com/photo-1583744946564-b52d01c96e19?auto=format&fit=crop&q=80&w=240&h=240'
  }, {
    id: 2,
    name: 'فستان بناتي',
    price: 220,
    image: 'https://images.unsplash.com/photo-1602250698774-469b27ce339c?auto=format&fit=crop&q=80&w=240&h=240'
  }, {
    id: 3,
    name: 'تيشيرت رياضي',
    price: 90,
    discount: 120,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=240&h=240'
  }];

  // Promotional banners
  const promotions = [{
    id: 1,
    title: 'خصم 30% على جميع الملابس الرياضية',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=600',
    color: 'from-blue-600 to-indigo-500'
  }, {
    id: 2,
    title: 'عروض الصيف على ملابس الأطفال',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=600',
    color: 'from-sky-500 to-blue-600'
  }];
  
  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-indigo-600 text-white sticky top-0 z-10 shadow-md">
          <Link to="/" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">dam Clothes</h1>
          <div className="flex items-center gap-4">
            <Link to="/clothes/cart" className="text-white hover:text-blue-100 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-56 overflow-hidden rounded-b-xl">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600" alt="Clothes Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-800/60 flex flex-col justify-center p-6">
            <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">تسوق بأناقة</h2>
            <p className="text-white/90 mb-4 max-w-xs animate-fade-in">أحدث صيحات الموضة العالمية وبأفضل الأسعار</p>
            <Button size="sm" variant="gradient" className="w-auto shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
              تسوق الآن
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input type="text" placeholder="ابحث عن ملابس..." className="w-full p-3 pl-10 pr-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />
            <Search className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
          </div>
        </div>

        {/* Flash Sale */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-blue-900">تخفيضات حصرية</h2>
            </div>
            <Link to="/clothes/sales" className="text-sm text-blue-600 font-medium hover:underline">
              عرض الكل
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar">
            {promotions.map(promo => (
              <div 
                key={promo.id} 
                className="relative min-w-[280px] h-32 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${promo.color} opacity-90`}></div>
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-center p-4">
                  <h3 className="text-lg font-bold text-white">{promo.title}</h3>
                  <Button size="sm" variant="outline" className="mt-2 bg-white/20 border-white text-white hover:bg-white/30 w-auto">
                    تسوق الآن
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-blue-900">التصنيفات</h2>
            </div>
            <Link to="/clothes/categories" className="text-sm text-blue-600 font-medium hover:underline">
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/clothes/category/${category.id}`} 
                className="relative rounded-xl overflow-hidden h-36 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03]"
              >
                <div className={`absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent`}></div>
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <span className={`w-12 h-1 mb-2 bg-gradient-to-r ${category.color} rounded-full`}></span>
                  <h3 className="text-lg font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src="https://img.icons8.com/fluency/48/star--v1.png" alt="Featured" className="w-5 h-5" />
              <h2 className="text-lg font-bold text-blue-900">منتجات مميزة</h2>
            </div>
            <Link to="/clothes/featured" className="text-sm text-blue-600 font-medium hover:underline">عرض الكل</Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border border-blue-100 hover:shadow-lg transition-all hover:scale-[1.02] group">
                <Link to={`/clothes/product/${product.id}`}>
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-36 object-cover group-hover:brightness-105 transition-all" />
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        خصم
                      </div>
                    )}
                    <button className="absolute top-2 left-2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className={`w-4 h-4 text-gray-600`} />
                    </button>
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/clothes/product/${product.id}`}>
                    <h3 className="font-medium text-blue-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    {product.discount ? (
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-700">{product.price} ج.م</span>
                        <span className="text-xs text-gray-500 line-through">{product.discount} ج.م</span>
                      </div>
                    ) : (
                      <span className="font-bold text-blue-700">{product.price} ج.م</span>
                    )}
                    <Button size="sm" variant="gradient" className="rounded-full h-8 w-8 p-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm hover:shadow-md transition-shadow">
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="px-4 py-6 bg-blue-50">
          <h2 className="text-lg font-bold mb-4 text-center text-blue-900">لماذا تتسوق معنا؟</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="https://img.icons8.com/color/48/truck--v1.png" alt="Delivery" className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-blue-800">توصيل سريع</h3>
              <p className="text-xs text-gray-500">توصيل خلال 1 ساعة</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="https://img.icons8.com/color/48/card-security.png" alt="Secure" className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-blue-800">دفع آمن</h3>
              <p className="text-xs text-gray-500">معاملات آمنة 100%</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all">
              <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <img src="https://img.icons8.com/color/48/24-hours-care.png" alt="Support" className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-blue-800">دعم متميز</h3>
              <p className="text-xs text-gray-500">خدمة على مدار الساعة</p>
            </div>
          </div>
        </div>

        {/* Fixed Cart Button */}
        <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto z-50 px-4">
          <Link to="/clothes/cart">
            <Button variant="gradient" className="w-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <ShoppingCart className="w-5 h-5 mr-2" />
              عرض سلة التسوق
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Clothes;
