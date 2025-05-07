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
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="text-gray-700">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">الصيدلية</h1>
            <Link to="/pharmacy/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-brand-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>}
            </Link>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Input type="search" placeholder="ابحث عن الأدوية والمنتجات" className="pl-10 pr-4 py-2 rounded-full border-gray-300 bg-gray-50" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            {/* زر "عايز حاجة معينة؟" */}
            <Button variant="outline" className="w-full mt-3 flex items-center justify-between border-dashed" onClick={() => setShowCategories(!showCategories)}>
              <span>عايز حاجة معينة؟</span>
              {showCategories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Categories - تظهر فقط عند الضغط على الزر */}
        {showCategories && <div className="px-4 py-4 border-b">
            <h2 className="text-lg font-bold mb-4">الفئات</h2>
            {categoriesLoading ? <div className="flex justify-center py-4">
                <p>جاري التحميل...</p>
              </div> : <div className="grid grid-cols-4 gap-3">
                {categories?.map(category => <Link key={category.id} to={`/pharmacy/category/${category.id}`} className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mb-1">
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
              {recommendedProducts?.map(product => <Card key={product.id} className="overflow-hidden">
                  <div className="p-2">
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded" />
                    <h3 className="font-medium mt-2">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold">{product.price} ج.م</span>
                      <Button size="sm" onClick={() => addToCart(product)} className="bg-brand-500 hover:bg-brand-600">
                        إضافة
                      </Button>
                    </div>
                  </div>
                </Card>)}
            </div>}
        </div>

        {/* زر إتمام الطلب - يظهر فقط عند وجود منتجات في السلة */}
        {itemCount > 0 && <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto z-10 mb-16 px-0 py-0 my-0">
            <Link to="/pharmacy/cart">
              <Button className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white shadow-lg rounded-lg">
                إتمام الطلب ({totalPrice.toFixed(2)} ج.م)
              </Button>
            </Link>
          </div>}
      </div>
    </div>;
};
export default Pharmacy;