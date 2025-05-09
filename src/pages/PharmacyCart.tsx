
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

  // رسوم التوصيل والمجموع
  const deliveryFee = 15;
  const orderTotal = totalPrice + deliveryFee;

  // منتجات مقترحة
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
      <div className="max-w-md mx-auto bg-white pb-32 shadow-sm">
        {/* الهيدر */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md z-10">
          <Link to="/pharmacy" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">السلة</h1>
          <div className="w-6"></div>
        </div>

        {/* محتويات السلة */}
        <div className="px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-800">السلة فاضية</h3>
              <p className="text-blue-600 mb-6">لسه مضفتش أي حاجة للسلة</p>
              <Button 
                onClick={() => navigate('/pharmacy')}
                variant="pharmacy"
                className="shadow-md"
              >
                تصفح المنتجات
              </Button>
            </div>
          ) : (
            <>
              {/* قائمة المنتجات */}
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="py-3 px-3 flex items-center hover:bg-blue-50 rounded-lg animate-fade-in border border-blue-100">
                    <img 
                      src={item.image || item.image_url} 
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
                        variant="outlineBlue"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <Minus className="h-3 w-3 text-blue-700" />
                      </Button>
                      <span className="mx-2 w-6 text-center font-medium text-blue-800">{item.quantity}</span>
                      <Button 
                        variant="blue"
                        size="icon"
                        className="h-8 w-8 rounded-full"
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

              {/* المنتجات المقترحة */}
              <div className="mt-8 mb-6 animate-fade-in">
                <h3 className="font-bold mb-3 text-blue-800 flex items-center">
                  <div className="w-1 h-5 bg-blue-600 ml-2"></div>
                  منتجات ممكن تعجبك
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
                            variant="blue"
                            size="sm" 
                            className="h-6 w-6 p-0 rounded-full"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* ملخص الطلب */}
              <Card className="mt-6 bg-blue-50 border border-blue-100 animate-fade-in">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-3 text-blue-800">ملخص الطلب</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">المجموع الفرعي</span>
                      <span className="font-medium text-blue-800">{totalPrice.toFixed(2)} ج.م</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">رسوم التوصيل</span>
                      <span className="font-medium text-blue-800">{deliveryFee.toFixed(2)} ج.م</span>
                    </div>
                    <Separator className="my-2 bg-blue-200" />
                    <div className="pt-2 font-bold flex justify-between">
                      <span className="text-blue-800">المجموع</span>
                      <span className="text-blue-700">{orderTotal.toFixed(2)} ج.م</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* أزرار التحكم */}
              <div className="mt-6 space-y-3">
                <Button 
                  variant="outlineBlue" 
                  className="w-full"
                  onClick={clearCart}
                >
                  تفريغ السلة
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* زر إتمام الطلب العائم في أسفل الصفحة */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-blue-100 p-4 z-50 max-w-md mx-auto">
          <Button 
            variant="pharmacy"
            size="checkout" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700"
            onClick={() => navigate('/pharmacy/checkout')}
          >
            متابعة الطلب • {orderTotal.toFixed(2)} ج.م
          </Button>
        </div>
      )}
    </div>
  );
};

export default PharmacyCart;
