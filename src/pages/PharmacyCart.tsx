
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const PharmacyCart: React.FC = () => {
  // Mock cart data - in a real app, this would come from a cart context or store
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'باراسيتامول',
      price: 15,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 2,
      name: 'فيتامين C',
      price: 30,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    }
  ]);

  // Suggested items
  const suggestedItems = [
    {
      id: 3,
      name: 'مضاد حيوي',
      price: 45,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 4,
      name: 'فيتامين D',
      price: 35,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    },
    {
      id: 5,
      name: 'شراب للحساسية',
      price: 28,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    }
  ];

  const { toast } = useToast();

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "تمت إزالة المنتج",
      description: "تم حذف المنتج من سلتك بنجاح.",
    });
  };

  // Calculate total
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 10;
  const total = subtotal + deliveryFee;

  const addSuggested = (product) => {
    setCartItems(prev => [
      ...prev,
      { ...product, quantity: 1 }
    ]);
    
    toast({
      title: "تمت الإضافة",
      description: `تم إضافة ${product.name} إلى سلتك.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/pharmacy" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة الصيدلية</h1>
          <div className="w-6"></div> {/* Empty div for flex balance */}
        </div>

        {/* Cart Items */}
        <div className="p-4">
          <div className="mb-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b">
                  <div className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">{item.price} ريال</p>
                      <div className="flex items-center gap-3 mt-1">
                        <button 
                          className="w-6 h-6 flex items-center justify-center rounded-full border"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          className="w-6 h-6 flex items-center justify-center rounded-full border"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400" onClick={() => removeItem(item.id)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">سلتك فارغة</p>
                <Link to="/pharmacy">
                  <Button className="mt-4 bg-brand-500">تصفح المنتجات</Button>
                </Link>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              {/* Add More Button */}
              <Link to="/pharmacy">
                <Button variant="outline" className="w-full mb-8">
                  إضافة المزيد
                </Button>
              </Link>

              {/* Suggested Items */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-3">منتجات قد تعجبك</h2>
                <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                  {suggestedItems.map((item) => (
                    <Card key={item.id} className="min-w-36 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-24 object-cover rounded-t-lg"
                      />
                      <div className="p-2">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">{item.price} ريال</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs rounded-full"
                            onClick={() => addSuggested(item)}
                          >
                            إضافة
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-3">ملخص الطلب</h2>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span>{subtotal} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span>{deliveryFee} ريال</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>المبلغ الإجمالي</span>
                    <span>{total} ريال</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Buttons - Fixed at bottom */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
            <div className="flex gap-3">
              <Link to="/pharmacy" className="flex-1">
                <Button variant="outline" className="w-full py-6">
                  إضافة المزيد
                </Button>
              </Link>
              <Link to="/pharmacy/checkout" className="flex-1">
                <Button className="w-full py-6 bg-brand-500">
                  تابع الدفع
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyCart;
