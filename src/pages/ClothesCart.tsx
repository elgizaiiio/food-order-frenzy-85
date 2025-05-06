
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

const ClothesCart: React.FC = () => {
  // Mock cart items - in a real app, this would come from context or state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { 
      id: 1, 
      name: 'قميص أنيق', 
      type: 'قميص', 
      price: 150, 
      size: 'M', 
      quantity: 1, 
      image: 'https://images.unsplash.com/photo-1583744946564-b52d01c96e19?auto=format&fit=crop&q=80&w=100&h=100' 
    },
    { 
      id: 5, 
      name: 'قميص كاجوال', 
      type: 'قميص', 
      price: 140, 
      size: 'L', 
      quantity: 2, 
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=100&h=100' 
    }
  ]);

  // Mock suggested products
  const suggestedProducts = [
    { id: 14, name: 'تيشيرت رياضي', price: 120, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: 10, name: 'فستان بناتي', price: 150, image: 'https://images.unsplash.com/photo-1602250698774-469b27ce339c?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: 15, name: 'سويت شيرت', price: 230, image: 'https://images.unsplash.com/photo-1565317058474-8ef05f4ebe97?auto=format&fit=crop&q=80&w=150&h=150' },
  ];

  const increaseQuantity = (id: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/clothes" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة الطلبات</h1>
          <div className="w-6"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Cart Items */}
        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">السلة فارغة</p>
              <Link to="/clothes">
                <Button className="bg-blue-500">تسوق الآن</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border rounded-lg p-3 relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.type} - {item.size}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold">{item.price * item.quantity} ريال</p>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)}
                          className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {/* Order Summary */}
              <Card className="p-4 mt-6">
                <h3 className="font-bold mb-4">ملخص الطلب</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم التوصيل</span>
                    <span>{deliveryFee} ريال</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>الإجمالي</span>
                    <span>{total} ريال</span>
                  </div>
                </div>
              </Card>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <Link to="/clothes" className="flex-1">
                  <Button variant="outline" className="w-full border-blue-500 text-blue-500">
                    أضف المزيد
                  </Button>
                </Link>
                <Link to="/clothes/checkout" className="flex-1">
                  <Button className="w-full bg-blue-500">
                    تابع الدفع
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Products */}
        {cartItems.length > 0 && (
          <div className="px-4 mt-8">
            <h3 className="font-bold mb-4">منتجات ممكن تعجبك</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {suggestedProducts.map((product) => (
                <div key={product.id} className="min-w-[150px] border rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-sm font-bold mt-1">{product.price} ريال</p>
                    <Button 
                      size="sm" 
                      className="w-full mt-2 text-xs py-1 bg-blue-500"
                    >
                      أضف إلى السلة
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothesCart;
