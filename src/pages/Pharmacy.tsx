import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Pill, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePharmacyCategories, useRecommendedProducts } from '@/hooks/usePharmacyData';
import { usePharmacyCart } from '@/context/PharmacyCartContext';
const Pharmacy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
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
  const getCategoryIcon = (iconName: string) => {
    // تنفيذ بسيط للأيقونات، في تطبيق حقيقي يمكن استخدام مكتبة أيقونات كاملة
    return <Pill className="h-5 w-5" />;
  };

  // توجيه المستخدم لصفحة الدفع
  const handleCheckout = () => {
    // توجيه المستخدم إلى صفحة السلة
  };
  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-indigo-600 z-10 shadow-md rounded-b-2xl">
          <div className="flex items-center justify-between p-4 text-white">
            <Link to="/" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">الصيدلية</h1>
            <Link to="/pharmacy/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-white text-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>}
            </Link>
          </div>

          {/* Search */}
          <div className="px-4 pb-6">
            <div className="relative">
              <Input type="search" placeholder="ابحث عن الأدوية والمنتجات" className="pl-10 pr-4 py-2 rounded-full border-gray-300 bg-white/90 backdrop-blur-sm text-gray-700 shadow-md" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            {/* زر "عايز حاجة معينة؟" */}
            <Button variant="outline" onClick={() => setShowCategories(!showCategories)} className="w-full mt-3 flex items-center justify-between border-white text-white backdrop-blur-sm bg-blue-700 hover:bg-blue-600">
              <span>عايز حاجة معينة؟</span>
              {showCategories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Categories - تظهر فقط عند الضغط على الزر */}
        {showCategories && <div className="px-4 py-4 border-b bg-white/80 backdrop-blur-sm animate-fade-in">
            <h2 className="text-lg font-bold mb-4">الفئات</h2>
            {categoriesLoading ? <div className="flex justify-center py-4">
                <p>جاري التحميل...</p>
              </div> : <div className="grid grid-cols-4 gap-3">
                {categories?.map(category => <Link key={category.id} to={`/pharmacy/category/${category.id}`} className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center mb-1 shadow-sm hover:shadow-md transition-all">
                      {getCategoryIcon(category.icon)}
                    </div>
                    <span className="text-xs text-center">{category.name}</span>
                  </Link>)}
              </div>}
          </div>}

        {/* Recommended Products */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-4">منتجات موصى بها</h2>
          {productsLoading ? <div className="flex justify-center py-8">
              <p>جاري التحميل...</p>
            </div> : <div className="grid grid-cols-2 gap-4">
              {recommendedProducts?.map(product => <Card key={product.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
                  <div className="p-3">
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="font-medium mt-2 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 h-8">{product.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-blue-600">{product.price} ج.م</span>
                      <Button size="sm" onClick={() => addToCart(product)} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-xs px-3">
                        إضافة
                      </Button>
                    </div>
                  </div>
                </Card>)}
            </div>}
        </div>

        {/* زر إتمام الطلب - يظهر فقط عند وجود منتجات في السلة */}
        {itemCount > 0 && <div className="fixed bottom-20 left-0 right-0 max-w-md z-10 mb-16 px-4 mx-auto">
            <Link to="/pharmacy/cart">
              <Button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg rounded-lg">
                إتمام الطلب ({totalPrice.toFixed(2)} ج.م)
              </Button>
            </Link>
          </div>}
      </div>
    </div>;
};
export default Pharmacy;