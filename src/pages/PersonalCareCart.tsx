
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { Badge } from '@/components/ui/badge';

const PersonalCareCart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity,
    itemCount,
    totalPrice,
    addToCart 
  } = usePersonalCareCart();
  
  // معلومات التوصيل والضريبة
  const deliveryFee = 15;
  const total = totalPrice + deliveryFee;

  // منتجات مقترحة
  const suggestedItems = [
    {
      id: 10,
      name: 'أحمر شفاه مات',
      price: 65,
      image: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 11,
      name: 'طقم فرش مكياج',
      price: 120,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 12,
      name: 'صابون طبيعي',
      price: 45,
      image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=200&auto=format&fit=crop',
    }
  ];

  // تعديل الدالة لإضافة المنتج مباشرة
  const handleAddSuggested = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24 shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md sticky top-0 z-10">
          <Link to="/personal-care" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة المشتريات</h1>
          <div className="w-6"></div> {/* Empty div for flex balance */}
        </div>

        {/* Cart Items */}
        <div className="p-5">
          <div className="mb-6">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-blue-100 hover:bg-blue-50 transition-colors rounded-lg px-2 my-2 animate-fade-in">
                  <div className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg shadow-sm border border-blue-100"
                    />
                    <div>
                      <h3 className="font-medium text-blue-900">{item.name}</h3>
                      <p className="text-blue-600 font-medium">{item.price} ريال</p>
                      <div className="flex items-center gap-3 mt-1 bg-white rounded-full border border-blue-200 shadow-sm p-1">
                        <button 
                          className="w-6 h-6 flex items-center justify-center rounded-full border-0 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-gray-800 w-6 text-center">{item.quantity}</span>
                        <button 
                          className="w-6 h-6 flex items-center justify-center rounded-full border-0 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-red-500 transition-colors" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-12 h-12 text-blue-600" />
                </div>
                <p className="text-gray-500 mb-4">سلتك فارغة</p>
                <Link to="/personal-care">
                  <Button 
                    variant="personalCare" 
                    className="shadow-md"
                  >
                    تصفح المنتجات
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <>
              {/* Add More Button */}
              <Link to="/personal-care">
                <Button 
                  variant="personalCareOutline" 
                  className="w-full mb-8"
                >
                  إضافة المزيد من المنتجات
                </Button>
              </Link>

              {/* Suggested Items */}
              <div className="mb-8 animate-fade-in">
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-blue-800">
                  <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-blue-600 to-blue-800"></span>
                  منتجات قد تعجبك
                </h2>
                <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                  {suggestedItems.map((item) => (
                    <Card key={item.id} className="min-w-36 flex-shrink-0 border border-blue-100 shadow-sm hover:shadow-md transition-all">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-24 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-blue-800 text-xs text-white">
                          جديد
                        </Badge>
                      </div>
                      <div className="p-2">
                        <h3 className="text-sm font-medium text-blue-800">{item.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-blue-700">{item.price} ريال</span>
                          <Button 
                            size="sm" 
                            variant="personalCarePill" 
                            className="h-7 text-xs rounded-full"
                            onClick={() => handleAddSuggested(item)}
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
              <div className="mb-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 animate-fade-in">
                <h2 className="text-lg font-bold mb-3 text-blue-800">ملخص الطلب</h2>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-medium">{totalPrice} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span className="font-medium">{deliveryFee} ريال</span>
                  </div>
                  <Separator className="my-2 bg-blue-200" />
                  <div className="flex justify-between font-bold pt-2">
                    <span className="text-blue-900">المبلغ الإجمالي</span>
                    <span className="text-blue-700">{total} ريال</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Buttons - Fixed at bottom */}
        {items.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto shadow-lg">
            <div className="flex gap-3">
              <Link to="/personal-care" className="flex-1">
                <Button 
                  variant="personalCareOutline" 
                  className="w-full"
                >
                  إضافة المزيد
                </Button>
              </Link>
              <Link to="/personal-care/checkout" className="flex-1">
                <Button 
                  size="checkout"
                  variant="personalCare"
                  className="w-full"
                >
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
