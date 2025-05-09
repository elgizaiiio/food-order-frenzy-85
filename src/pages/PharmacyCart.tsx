
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePharmacyCart } from '@/context/PharmacyCartContext';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PharmacyCart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = usePharmacyCart();

  // Calculate delivery fee and total
  const deliveryFee = 15;
  const orderTotal = totalPrice + deliveryFee;

  // Suggested products
  const suggestedProducts = [
    {
      id: "sugg-1",
      name: "فيتامين سي",
      price: 35,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100"
    },
    {
      id: "sugg-2",
      name: "شامبو طبي",
      price: 45,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=100"
    },
    {
      id: "sugg-3",
      name: "كريم مرطب",
      price: 30,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100"
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-md mx-auto bg-white pb-20 shadow-md">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md z-10">
          <Link to="/pharmacy" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">سلة المشتريات</h1>
          <div className="w-6"></div>
        </div>

        {/* Cart Items */}
        <div className="px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-800">السلة فارغة</h3>
              <p className="text-gray-500 mb-6">لم تُضِف أي منتجات إلى سلة المشتريات بعد</p>
              <Button 
                onClick={() => navigate('/pharmacy')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
              >
                تصفح المنتجات
              </Button>
            </div>
          ) : (
            <>
              {/* Items list */}
              <div className="divide-y divide-blue-100">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex items-center hover:bg-blue-50 rounded-lg px-2 animate-fade-in">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-lg shadow-sm border border-blue-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=صورة+غير+متوفرة';
                      }}
                    />
                    <div className="flex-1 mr-3">
                      <h3 className="font-medium text-blue-800">{item.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{item.price} ج.م</p>
                    </div>
                    <div className="flex items-center ml-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 rounded-full border border-blue-200 hover:bg-blue-100"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus className="h-3 w-3 text-blue-700" />
                      </Button>
                      <span className="mx-2 w-6 text-center font-medium">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2 text-gray-400 hover:text-red-500 hover:bg-transparent"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Products */}
              <div className="mt-8 mb-6 animate-fade-in">
                <h3 className="font-bold mb-3 text-blue-800 flex items-center">
                  <div className="w-1 h-5 bg-blue-600 ml-2"></div>
                  منتجات قد تعجبك
                </h3>
                <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
                  {suggestedProducts.map(product => (
                    <Card key={product.id} className="min-w-[130px] flex-shrink-0 border border-blue-100 overflow-hidden hover:shadow-md transition-all">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=صورة+غير+متوفرة';
                        }}
                      />
                      <CardContent className="p-2 bg-gradient-to-b from-blue-50 to-white">
                        <p className="text-sm font-medium text-blue-800">{product.name}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-blue-600 font-bold">{product.price} ج.م</span>
                          <Button 
                            size="sm" 
                            className="h-6 w-6 p-0 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <Card className="mt-6 bg-blue-50 border border-blue-100 animate-fade-in">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-3 text-blue-800">ملخص الطلب</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المجموع الفرعي</span>
                      <span className="font-medium">{totalPrice.toFixed(2)} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">رسوم التوصيل</span>
                      <span className="font-medium">{deliveryFee.toFixed(2)} ج.م</span>
                    </div>
                    <Separator className="my-2 bg-blue-200" />
                    <div className="pt-2 font-bold flex justify-between">
                      <span>المجموع</span>
                      <span className="text-blue-700">{orderTotal.toFixed(2)} ج.م</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action buttons */}
              <div className="mt-6 space-y-3 mb-16">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md py-6"
                  onClick={() => navigate('/pharmacy/checkout')}
                >
                  متابعة الطلب
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-700"
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
