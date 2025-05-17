
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useUserAddresses } from '@/hooks/useUserData';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const UnifiedCart: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: userAddresses } = useUserAddresses();
  const { 
    items, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getItemsByType,
    isLoading 
  } = useCart();
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // تحديد التبويب النشط بناءً على محتويات السلة عند التحميل
  useEffect(() => {
    if (!isLoading && items.length > 0) {
      // ابدأ بالتبويب الذي يحتوي على عناصر
      const typesWithItems = ['restaurant', 'market', 'pharmacy', 'personal_care', 'gym']
        .filter(type => getItemsByType(type).length > 0);
      
      if (typesWithItems.length > 0) {
        setActiveTab(typesWithItems[0]);
      }
    }
  }, [isLoading, items, getItemsByType]);
  
  // تصفية العناصر للتبويب النشط
  const filteredItems = activeTab === 'all' 
    ? items 
    : getItemsByType(activeTab);
  
  // حساب المجموع الفرعي للتبويب النشط
  const calculateSubtotal = () => {
    return filteredItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const subtotal = calculateSubtotal();
  const deliveryFee = userAddresses && userAddresses.length > 0 ? 10 : 15; // رسوم توصيل أعلى إذا لم يكن هناك عنوان محفوظ
  const total = subtotal + deliveryFee;
  
  // تحديد مسار النقل إلى صفحة المنتجات حسب نوع التبويب
  const getProductsPath = () => {
    switch (activeTab) {
      case 'restaurant':
        return '/restaurant/1';
      case 'market':
        return '/market';
      case 'pharmacy':
        return '/pharmacy';
      case 'personal_care':
        return '/personal-care';
      case 'gym':
        return '/gym';
      default:
        return '/';
    }
  };
  
  // تحديد نص زر التصفح حسب نوع التبويب
  const getBrowseButtonText = () => {
    switch (activeTab) {
      case 'restaurant':
        return 'تصفح المطاعم';
      case 'market':
        return 'تصفح السوق';
      case 'pharmacy':
        return 'تصفح الصيدلية';
      case 'personal_care':
        return 'تصفح منتجات العناية';
      case 'gym':
        return 'تصفح الجيم';
      default:
        return 'متابعة التسوق';
    }
  };
  
  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* الهيدر */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-l from-blue-600 to-blue-800 text-white sticky top-0 z-10 shadow-md">
          <Link to="/" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة التسوق</h1>
          <div className="w-6"></div>
        </div>

        {/* محتويات السلة */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : items.length > 0 ? (
            <>
              {/* تبويبات أقسام السلة */}
              {items.length > 0 && (
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-6">
                  <TabsList className="grid grid-cols-5 mb-4">
                    {getItemsByType('restaurant').length > 0 && (
                      <TabsTrigger value="restaurant">المطعم</TabsTrigger>
                    )}
                    {getItemsByType('market').length > 0 && (
                      <TabsTrigger value="market">السوبرماركت</TabsTrigger>
                    )}
                    {getItemsByType('pharmacy').length > 0 && (
                      <TabsTrigger value="pharmacy">الصيدلية</TabsTrigger>
                    )}
                    {getItemsByType('personal_care').length > 0 && (
                      <TabsTrigger value="personal_care">العناية</TabsTrigger>
                    )}
                    {getItemsByType('gym').length > 0 && (
                      <TabsTrigger value="gym">الجيم</TabsTrigger>
                    )}
                  </TabsList>
                </Tabs>
              )}
              
              <div className="mb-2">
                <h2 className="text-lg font-bold text-blue-800">منتجات السلة</h2>
              </div>
              
              {filteredItems.map(item => (
                <div key={`${item.type}-${item.id}`} className="flex items-center justify-between p-3 mb-2 border border-blue-100 hover:bg-blue-50 transition-colors rounded-lg shadow-sm animate-fade-in">
                  <div className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg shadow-md border border-blue-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=صورة+غير+متوفرة';
                      }}
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-blue-600 font-medium">{item.price} ج.م</p>
                      <div className="flex items-center gap-3 mt-2 bg-white rounded-full border border-blue-200 shadow-sm p-1">
                        <button 
                          onClick={() => decreaseQuantity(item.id, item.type)} 
                          className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-gray-800 w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id, item.type)} 
                          className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.type)} 
                    className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {/* زر إضافة المزيد */}
              <Link to={getProductsPath()} className="block mb-3">
                <Button 
                  variant="outline" 
                  className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                >
                  {getBrowseButtonText()}
                </Button>
              </Link>

              {/* ملخص الطلب */}
              <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
                <h2 className="text-lg font-bold mb-3 text-blue-800">ملخص الطلب</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-medium">{subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span className="font-medium">{deliveryFee} ج.م</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-blue-200 mt-2">
                    <span>المبلغ الإجمالي</span>
                    <span className="text-blue-600">{total} ج.م</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 bg-blue-50 rounded-xl animate-fade-in">
              <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">السلة فارغة</h3>
              <p className="text-gray-500 mb-4">لم تقم بإضافة أي منتجات للسلة بعد</p>
              <Link to="/">
                <Button className="bg-gradient-to-l from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg">
                  ابدأ التسوق
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* زر إتمام الطلب العائم في الأسفل */}
        {filteredItems.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3 z-50 max-w-md mx-auto shadow-lg">
            <Link to={`/checkout?type=${activeTab}`}>
              <Button className="w-full bg-gradient-to-l from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md text-lg">
                إتمام الطلب • {total} ج.م
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedCart;
