
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Cart: React.FC = () => {
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "شاورما دجاج سبيشال",
      price: 25,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "سلطة الشيف",
      price: 15,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    }
  ];

  // Suggested items
  const suggestedItems = [
    {
      id: 3,
      name: "كوكا كولا",
      price: 5,
      image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "بطاطس مقلية",
      price: 12,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "سلطة سيزر",
      price: 18,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    }
  ];

  // Calculate total
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 10;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/restaurant/1" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة المشتريات</h1>
          <div className="w-6"></div> {/* Empty div for flex balance */}
        </div>

        {/* Cart Items */}
        <div className="p-4">
          <div className="mb-6">
            {cartItems.map((item) => (
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
                      <button className="w-6 h-6 flex items-center justify-center rounded-full border">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span>{item.quantity}</span>
                      <button className="w-6 h-6 flex items-center justify-center rounded-full border">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add More Button */}
          <Link to="/restaurant/1">
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
                      <Button size="sm" variant="outline" className="h-7 text-xs rounded-full">
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
        </div>

        {/* Bottom Buttons - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
          <div className="flex gap-3">
            <Link to="/restaurant/1" className="flex-1">
              <Button variant="outline" className="w-full py-6">
                إضافة المزيد
              </Button>
            </Link>
            <Link to="/checkout" className="flex-1">
              <Button className="w-full py-6 bg-brand-500">
                تابع الدفع
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
