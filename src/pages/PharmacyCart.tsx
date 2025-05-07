
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePharmacyCart } from '@/context/PharmacyCartContext';
import { Card, CardContent } from '@/components/ui/card';

const PharmacyCart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = usePharmacyCart();

  // Calculate delivery fee and total
  const deliveryFee = 15;
  const orderTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/pharmacy" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة المشتريات</h1>
          <div className="w-6"></div>
        </div>

        {/* Cart Items */}
        <div className="px-4 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">السلة فارغة</h3>
              <p className="text-gray-500 mb-6">لم تُضِف أي منتجات إلى سلة المشتريات بعد</p>
              <Button 
                onClick={() => navigate('/pharmacy')}
                className="bg-brand-500 hover:bg-brand-600"
              >
                تصفح المنتجات
              </Button>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 mr-3">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.price} ج.م</p>
                    </div>
                    <div className="flex items-center ml-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-2 w-6 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <Card className="mt-6 bg-gray-50">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-3">ملخص الطلب</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي</span>
                      <span>{totalPrice.toFixed(2)} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رسوم التوصيل</span>
                      <span>{deliveryFee.toFixed(2)} ج.م</span>
                    </div>
                    <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                      <span>المجموع</span>
                      <span>{orderTotal.toFixed(2)} ج.م</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action buttons */}
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-brand-500 hover:bg-brand-600"
                  onClick={() => navigate('/pharmacy/checkout')}
                >
                  متابعة الطلب
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-600"
                  onClick={clearCart}
                >
                  تفريغ السلة
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyCart;
