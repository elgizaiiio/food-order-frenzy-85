
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePharmacyCart } from '@/context/PharmacyCartContext';
import { Separator } from '@/components/ui/separator';

const PharmacyCart: React.FC = () => {
  const { 
    items, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart, 
    totalPrice 
  } = usePharmacyCart();
  
  const navigate = useNavigate();
  const deliveryFee = 10;

  // التحقق من وجود عناصر في السلة
  const isEmpty = items.length === 0;

  // التوجه إلى صفحة الدفع
  const goToCheckout = () => {
    navigate('/pharmacy/checkout');
  };

  React.useEffect(() => {
    // تحقق من وجود المنتجات في السلة عند تحميل الصفحة
    console.log("Cart items:", items);
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-l from-indigo-500 to-indigo-600 text-white z-10 shadow-md">
          <Link to="/pharmacy" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة الصيدلية</h1>
          <div className="w-6"></div>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
              <Trash2 className="w-12 h-12 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">سلة التسوق فارغة</h2>
            <p className="text-gray-500 text-center mb-8">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
            <Link to="/pharmacy">
              <Button className="bg-indigo-500 hover:bg-indigo-600">
                تصفح المنتجات
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="p-4">
              <div className="mb-6 space-y-3">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-indigo-600 font-medium">{item.price} ريال</p>
                        <div className="flex items-center gap-3 mt-2 bg-white rounded-full border shadow-sm p-1">
                          <button 
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-indigo-100 text-indigo-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => increaseQuantity(item.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-indigo-100 text-indigo-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium">{totalPrice} ريال</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">رسوم التوصيل</span>
                  <span className="font-medium">{deliveryFee} ريال</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع</span>
                  <span>{totalPrice + deliveryFee} ريال</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="fixed bottom-20 right-0 left-0 max-w-md mx-auto bg-white border-t p-4">
              <Button 
                onClick={goToCheckout} 
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-lg h-12"
              >
                إتمام الطلب ({totalPrice + deliveryFee} ريال)
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PharmacyCart;
