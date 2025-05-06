
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PharmacyCartProvider, usePharmacyCart } from '@/context/PharmacyCartContext';
import { useRecommendedProducts } from '@/hooks/usePharmacyData';
import { Skeleton } from '@/components/ui/skeleton';

const PharmacyCartContent: React.FC = () => {
  const { 
    items, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart,
    addToCart, 
    itemCount,
    totalPrice 
  } = usePharmacyCart();
  
  const { data: suggestedItems, isLoading: suggestedLoading } = useRecommendedProducts();
  
  // Calculate delivery fee and total
  const deliveryFee = itemCount > 0 ? 10 : 0;
  const total = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/pharmacy" className="text-gray-700">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">سلة الصيدلية</h1>
            <div className="w-6"></div> {/* Empty div for flex balance */}
          </div>
        </div>

        {/* Cart Items */}
        <div className="p-4">
          <div className="mb-6">
            {itemCount > 0 ? (
              items.map((item) => (
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
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
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
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">سلتك فارغة</p>
                <p className="text-gray-400 text-sm mb-6">أضف بعض المنتجات إلى سلتك</p>
                <Link to="/pharmacy">
                  <Button className="bg-brand-500 hover:bg-brand-600">تصفح المنتجات</Button>
                </Link>
              </div>
            )}
          </div>

          {itemCount > 0 && (
            <>
              {/* Add More Button */}
              <Link to="/pharmacy">
                <Button 
                  variant="outline" 
                  className="w-full mb-8 border-dashed border-gray-300 hover:bg-brand-50 hover:border-brand-300 transition-colors"
                >
                  إضافة المزيد من المنتجات
                </Button>
              </Link>

              {/* Suggested Items */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-3 flex items-center justify-between">
                  <span>منتجات قد تعجبك</span>
                  <Link to="/pharmacy" className="text-sm text-brand-500 flex items-center">
                    عرض الكل
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                </h2>
                
                <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                  {suggestedLoading ? (
                    Array(3).fill(0).map((_, index) => (
                      <Card key={index} className="min-w-36 flex-shrink-0">
                        <Skeleton className="w-full h-24 rounded-t-lg" />
                        <div className="p-2">
                          <Skeleton className="h-4 w-24 mb-1" />
                          <div className="flex items-center justify-between mt-2">
                            <Skeleton className="h-4 w-10" />
                            <Skeleton className="h-7 w-12 rounded-full" />
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    suggestedItems?.map((item) => (
                      <Card key={item.id} className="min-w-36 flex-shrink-0 border-0 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-24 object-cover"
                        />
                        <div className="p-2">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-brand-700">{item.price} ريال</span>
                            <Button 
                              size="sm" 
                              className="h-7 text-xs rounded-full bg-brand-500 hover:bg-brand-600"
                              onClick={() => addToCart(item)}
                            >
                              إضافة
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-3">ملخص الطلب</h2>
                <div className="space-y-2 mb-3 bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span>{totalPrice.toFixed(2)} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span>{deliveryFee} ريال</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                    <span>المبلغ الإجمالي</span>
                    <span className="text-brand-700">{total.toFixed(2)} ريال</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Buttons - Fixed at bottom */}
        {itemCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto shadow-lg">
            <Link to="/pharmacy/checkout">
              <Button className="w-full py-6 bg-brand-500 hover:bg-brand-600 text-lg font-bold">
                تابع الدفع - {total.toFixed(2)} ريال
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapper component with PharmacyCartProvider
const PharmacyCart: React.FC = () => {
  return (
    <PharmacyCartProvider>
      <PharmacyCartContent />
    </PharmacyCartProvider>
  );
};

export default PharmacyCart;

import { ShoppingCart } from 'lucide-react';
