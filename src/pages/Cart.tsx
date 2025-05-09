
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";

const Cart: React.FC = () => {
  // بيانات السلة المحاكاة مع useState للتفاعلية
  const [cartItems, setCartItems] = useState([{
    id: 1,
    name: "شاورما فراخ سبيشال",
    price: 25,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
  }, {
    id: 2,
    name: "سلطة الشيف",
    price: 15,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
  }]);

  // حساب المجموع
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems => prevItems.map(item => item.id === id ? {
      ...item,
      quantity: Math.max(1, item.quantity + change)
    } : item));
  };
  
  const removeItem = (id: number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      toast.success(`تم إزالة ${itemToRemove.name} من سلتك`);
    }
  };
  
  const subtotal = calculateSubtotal();
  const deliveryFee = 10;
  const total = subtotal + deliveryFee;
  
  return <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* الهيدر */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-l from-blue-600 to-blue-800 text-white sticky top-0 z-10 shadow-md">
          <Link to="/restaurant/1" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">السلة</h1>
          <div className="w-6"></div>
        </div>

        {/* محتويات السلة */}
        <div className="p-4">
          <div>
            {cartItems.length > 0 ? (
              <>
                <div className="mb-2">
                  <h2 className="text-lg font-bold text-blue-800">منتجات السلة</h2>
                </div>
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 mb-2 border border-blue-100 hover:bg-blue-50 transition-colors rounded-lg shadow-sm animate-fade-in">
                    <div className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-lg shadow-md border border-blue-100" 
                      />
                      <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-blue-600 font-medium">{item.price} ج.م</p>
                        <div className="flex items-center gap-3 mt-2 bg-white rounded-full border border-blue-200 shadow-sm p-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-gray-800 w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                {/* زر إضافة المزيد */}
                <Link to="/restaurant/1" className="block mb-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                  >
                    إضافة منتجات أخرى
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
                <Link to="/restaurant/1">
                  <Button className="bg-gradient-to-l from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg">
                    ابدأ التسوق
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* زر إتمام الطلب العائم في الأسفل */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-3 z-50 max-w-md mx-auto shadow-lg">
            <Link to="/checkout">
              <Button className="w-full bg-gradient-to-l from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md text-lg">
                إتمام الطلب • {total} ج.م
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>;
};
export default Cart;
