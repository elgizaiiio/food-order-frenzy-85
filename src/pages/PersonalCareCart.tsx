
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';

const PersonalCareCart: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice
  } = usePersonalCareCart();

  // منتجات مقترحة
  const suggestedItems = [
    {
      id: 101,
      name: "كريم يدين مرطب",
      price: 45.0,
      image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 102,
      name: "مزيل مكياج",
      price: 65.0,
      image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 103,
      name: "مرطب للبشرة",
      price: 85.0,
      image: "https://images.unsplash.com/photo-1611080541639-021b5dbdf5e9?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ];

  // رسوم التوصيل والمجموع
  const deliveryFee = 15;
  const orderTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-md mx-auto bg-white pb-24 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white sticky top-0 z-10 shadow-md rounded-b-xl">
          <Link to="/personal-care" className="text-white hover:text-pink-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">السلة</h1>
          <div className="w-6"></div> {/* عنصر فارغ للمباعدة */}
        </div>

        {/* محتويات السلة */}
        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-pink-800">السلة فارغة</h3>
              <p className="text-pink-600 mb-4">لم تضف أي منتجات إلى السلة بعد</p>
              <Button 
                onClick={() => navigate('/personal-care')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
              >
                تصفح المنتجات
              </Button>
            </div>
          ) : (
            <>
              {/* قائمة المنتجات */}
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm border border-pink-100 hover:bg-pink-50 transition-colors animate-fade-in">
                    <div className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-lg shadow-md border border-pink-100" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=صورة+غير+متوفرة';
                        }}
                      />
                      <div>
                        <h3 className="font-bold text-pink-900">{item.name}</h3>
                        <p className="text-pink-600 font-medium">{item.price} ج.م</p>
                        <div className="flex items-center gap-3 mt-2 bg-white rounded-full border border-pink-200 shadow-sm p-1">
                          <button 
                            onClick={() => decreaseQuantity(item.id)} 
                            className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-pink-900 w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => increaseQuantity(item.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* المنتجات المقترحة */}
              <div className="mt-6 mb-4">
                <h3 className="font-bold mb-3 text-pink-800 flex items-center">
                  <div className="w-1 h-5 bg-pink-600 ml-2"></div>
                  منتجات مقترحة
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {suggestedItems.map(item => (
                    <Card key={item.id} className="min-w-[150px] flex-shrink-0 border border-pink-100 overflow-hidden animate-fade-in">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-2 bg-gradient-to-b from-pink-50 to-white">
                        <p className="text-sm font-medium text-pink-800 mb-1 line-clamp-1">{item.name}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-pink-600">{item.price} ج.م</span>
                          <Button 
                            size="sm" 
                            className="h-7 w-7 p-0 rounded-full bg-pink-500 hover:bg-pink-600 text-white"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* ملخص الطلب */}
              <Card className="bg-pink-50 border border-pink-100 mt-4 animate-fade-in">
                <div className="p-4">
                  <h3 className="font-bold mb-3 text-pink-800">ملخص الطلب</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-pink-700">المجموع الفرعي</span>
                      <span className="font-medium">{totalPrice.toFixed(2)} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-pink-700">رسوم التوصيل</span>
                      <span className="font-medium">{deliveryFee.toFixed(2)} ج.م</span>
                    </div>
                    <Separator className="my-2 bg-pink-200" />
                    <div className="flex justify-between font-bold">
                      <span className="text-pink-800">المبلغ الإجمالي</span>
                      <span className="text-pink-700">{orderTotal.toFixed(2)} ج.م</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* أزرار التحكم */}
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-pink-200 text-pink-700 hover:bg-pink-50" 
                  onClick={clearCart}
                >
                  تفريغ السلة
                </Button>
              </div>
            </>
          )}
        </div>

        {/* زر إتمام الطلب العائم في الأسفل */}
        {items.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white shadow-lg border-t border-pink-100 p-4 z-50 max-w-md mx-auto">
            <Button 
              onClick={() => navigate('/personal-care/checkout')} 
              className="w-full py-3 px-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              إتمام الطلب • {orderTotal.toFixed(2)} ج.م
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalCareCart;
