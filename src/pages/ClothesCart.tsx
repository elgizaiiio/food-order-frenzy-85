
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

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
  const [cartItems, setCartItems] = useState<CartItem[]>([{
    id: 1,
    name: 'قميص أنيق',
    type: 'قميص',
    price: 150,
    size: 'M',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1583744946564-b52d01c96e19?auto=format&fit=crop&q=80&w=100&h=100'
  }, {
    id: 5,
    name: 'قميص كاجوال',
    type: 'قميص',
    price: 140,
    size: 'L',
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=100&h=100'
  }]);

  // Mock suggested products
  const suggestedProducts = [{
    id: 14,
    name: 'تيشيرت رياضي',
    price: 120,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=150&h=150'
  }, {
    id: 10,
    name: 'فستان بناتي',
    price: 150,
    image: 'https://images.unsplash.com/photo-1602250698774-469b27ce339c?auto=format&fit=crop&q=80&w=150&h=150'
  }, {
    id: 15,
    name: 'سويت شيرت',
    price: 230,
    image: 'https://images.unsplash.com/photo-1565317058474-8ef05f4ebe97?auto=format&fit=crop&q=80&w=150&h=150'
  }];

  const increaseQuantity = (id: number) => {
    setCartItems(items => items.map(item => item.id === id ? {
      ...item,
      quantity: item.quantity + 1
    } : item));
    toast.success("تم تحديث الكمية");
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(items => items.map(item => item.id === id && item.quantity > 1 ? {
      ...item,
      quantity: item.quantity - 1
    } : item));
    toast.success("تم تحديث الكمية");
  };

  const removeItem = (id: number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      setCartItems(items => items.filter(item => item.id !== id));
      toast.success(`تم إزالة ${itemToRemove.name} من السلة`);
    }
  };

  const addSuggested = (product: any) => {
    setCartItems(prev => [...prev, {
      ...product,
      quantity: 1,
      type: 'ملابس',
      size: 'M'
    }]);
    toast.success(`تمت إضافة ${product.name} إلى السلة`);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white sticky top-0 z-10 shadow-md">
          <Link to="/clothes" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة المشتريات</h1>
          <div className="w-6"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Cart Items */}
        <div className="p-5">
          {cartItems.length === 0 ? (
            <div className="text-center py-10 mt-10 animate-fade-in">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-gray-500 mb-4">السلة فارغة</p>
              <Link to="/clothes">
                <Button className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md">
                  تسوق الآن
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow animate-fade-in">
                  <div className="flex p-3 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-md border border-blue-100"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <div className="flex text-xs text-gray-500 space-x-2 space-x-reverse mt-1">
                        <span>{item.type}</span>
                        <span>•</span>
                        <span>المقاس: {item.size}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-blue-700">{item.price * item.quantity} جنيه</span>
                          {item.quantity > 1 && <span className="text-xs text-gray-500">{item.quantity} × {item.price} جنيه</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => decreaseQuantity(item.id)} 
                            className="w-7 h-7 flex items-center justify-center bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => increaseQuantity(item.id)} 
                            className="w-7 h-7 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}

              {/* Suggested Products */}
              <div className="mt-8 animate-fade-in">
                <h2 className="text-lg font-bold mb-3 flex items-center text-gray-800">
                  <span className="block w-1 h-6 bg-blue-600 ml-2"></span>
                  منتجات مقترحة
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {suggestedProducts.map(product => (
                    <Card 
                      key={product.id} 
                      className="overflow-hidden border border-blue-100 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => addSuggested(product)}
                    >
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-24 object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                        <div className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs p-1 rounded">
                          {product.price} ج
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="text-xs font-medium text-center truncate">{product.name}</h3>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <Card className="p-4 mt-6 border-none shadow-sm bg-blue-50 animate-fade-in">
                <h3 className="font-bold mb-4 text-gray-800">ملخص الطلب</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-medium">{subtotal} جنيه</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span className="font-medium">{deliveryFee} جنيه</span>
                  </div>
                  <div className="border-t pt-3 mt-2 flex justify-between font-bold">
                    <span>الإجمالي</span>
                    <span className="text-blue-700">{total} جنيه</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
        
        {/* Bottom Buttons - Fixed at bottom */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto shadow-lg mb-16">
            <Link to="/clothes/checkout">
              <Button className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white text-lg font-medium shadow-md">
                إتمام الطلب ({total} جنيه)
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothesCart;
