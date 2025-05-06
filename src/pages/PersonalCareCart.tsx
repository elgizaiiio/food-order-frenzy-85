
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const PersonalCareCart: React.FC = () => {
  const { toast } = useToast();
  
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'عطر فلورا الفاخر',
      price: 199,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1592945403359-fd1c452a0a59?q=80&w=200&auto=format&fit=crop',
      gender: 'women',
    },
    {
      id: 2,
      name: 'كريم مرطب للوجه',
      price: 85,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=200&auto=format&fit=crop',
      gender: 'women',
    }
  ]);

  // Suggested items based on cart gender
  const suggestedItems = {
    women: [
      {
        id: 3,
        name: 'أحمر شفاه مات',
        price: 65,
        image: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: 4,
        name: 'طقم فرش مكياج',
        price: 120,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: 5,
        name: 'صابون طبيعي',
        price: 45,
        image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=200&auto=format&fit=crop',
      }
    ],
    men: [
      {
        id: 6,
        name: 'بلسم للحية',
        price: 75,
        image: 'https://images.unsplash.com/photo-1621607242220-84722888644e?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: 7,
        name: 'كريم للرجال',
        price: 90,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=200&auto=format&fit=crop',
      },
      {
        id: 8,
        name: 'عطر رجالي',
        price: 215,
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=200&auto=format&fit=crop',
      }
    ]
  };

  // Determine which suggested items to show based on cart contents
  const predominantGender = cartItems.filter(item => item.gender === 'women').length >= 
                           cartItems.filter(item => item.gender === 'men').length ? 'women' : 'men';

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
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      toast({
        title: "تمت إزالة المنتج",
        description: `تم إزالة ${itemToRemove.name} من سلتك بنجاح.`,
      });
    }
  };

  const addSuggested = (product: any) => {
    setCartItems(prev => [
      ...prev,
      { ...product, quantity: 1, gender: predominantGender }
    ]);
    
    toast({
      title: "تمت الإضافة",
      description: `تم إضافة ${product.name} إلى سلتك.`,
    });
  };

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/personal-care" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة المشتريات</h1>
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
                <Link to="/personal-care">
                  <Button className="mt-4 bg-brand-500">تصفح المنتجات</Button>
                </Link>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              {/* Add More Button */}
              <Link to="/personal-care">
                <Button variant="outline" className="w-full mb-8">
                  إضافة المزيد
                </Button>
              </Link>

              {/* Suggested Items */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-3">منتجات قد تعجبك</h2>
                <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                  {suggestedItems[predominantGender].map((item) => (
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
              <Link to="/personal-care" className="flex-1">
                <Button variant="outline" className="w-full py-6">
                  إضافة المزيد
                </Button>
              </Link>
              <Link to="/personal-care/checkout" className="flex-1">
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

export default PersonalCareCart;
