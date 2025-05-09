import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, X, Trash2, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";
import { MarketCartProvider, useMarketCart } from '@/context/MarketCartContext';
const MarketCartContent: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice
  } = useMarketCart();

  // منتجات مقترحة
  const suggestedItems = [{
    id: 4,
    name: "بيبسي",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1629203432180-71e9b1b8742c?auto=format&fit=crop&q=80&w=200&h=200"
  }, {
    id: 5,
    name: "سفن أب",
    price: 5.5,
    image: "https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?auto=format&fit=crop&q=80&w=200&h=200"
  }, {
    id: 6,
    name: "عصير تفاح",
    price: 11,
    image: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?auto=format&fit=crop&q=80&w=200&h=200"
  }];
  const removeItem = (id: number) => {
    const itemToRemove = items.find(item => item.id === id);
    if (itemToRemove) {
      removeFromCart(id);
      toast.success(`تم شيل ${itemToRemove.name} من السلة`);
    }
  };
  const addSuggested = (item: any) => {
    const productToAdd = {
      ...item,
      quantity: '',
      categoryId: 0,
      inStock: true,
      description: ''
    };
    increaseQuantity(item.id);
    toast.success(`تمت إضافة ${item.name} للسلة`);
  };

  // رسوم التوصيل والمجموع
  const deliveryFee = 10;
  const orderTotal = totalPrice + deliveryFee;
  return <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-32 shadow-md">
        {/* الهيدر */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-10 shadow-md">
          <Link to="/market" className="text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">السلة</h1>
          <div className="w-6"></div> {/* عنصر فارغ للمباعدة */}
        </div>

        {/* محتويات السلة */}
        <div className="p-5">
          <div className="mb-6">
            {items.length > 0 ? items.map(item => <div key={item.id} className="flex items-center justify-between p-4 mb-3 rounded-xl bg-white shadow-sm border border-blue-100 hover:bg-blue-50 transition-colors animate-fade-in">
                  <div className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md border border-blue-100" onError={e => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=صورة+غير+متوفرة';
              }} />
                    <div>
                      <h3 className="font-bold text-blue-900">{item.name}</h3>
                      <p className="text-blue-600 font-medium">{item.price} ج.م</p>
                      <div className="flex items-center gap-3 mt-2 bg-white rounded-full border border-blue-200 shadow-sm p-1">
                        <button onClick={() => decreaseQuantity(item.id)} className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-blue-900 w-6 text-center">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)} className="w-7 h-7 flex items-center justify-center rounded-full border-0 bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>) : <div className="text-center py-10 my-6 bg-blue-50 rounded-xl animate-fade-in">
                <div className="bg-blue-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">السلة فاضية</h3>
                <p className="text-gray-500 mb-6">مفيش منتجات في السلة</p>
                <Link to="/market">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                    ابدأ التسوق
                  </Button>
                </Link>
              </div>}
          </div>

          {items.length > 0 && <>
              {/* زر إضافة المزيد */}
              <Link to="/market">
                <Button variant="outline" className="w-full mb-8 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 py-6 text-lg shadow-sm">
                  إضافة منتجات تانية
                </Button>
              </Link>

              {/* منتجات مقترحة */}
              <div className="mb-8 animate-fade-in">
                
                
              </div>

              {/* ملخص الطلب */}
              <div className="mb-4 bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100 animate-fade-in">
                <h2 className="text-xl font-bold mb-4 text-blue-800">ملخص الطلب</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-medium">{totalPrice.toFixed(2)} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span className="font-medium">{deliveryFee.toFixed(2)} ج.م</span>
                  </div>
                  <div className="flex justify-between font-bold pt-3 border-t text-lg">
                    <span>المبلغ الإجمالي</span>
                    <span className="text-blue-600">{orderTotal.toFixed(2)} ج.م</span>
                  </div>
                </div>
              </div>

              {/* أزرار التحكم */}
              <div className="mt-6 space-y-3">
                <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-700" onClick={() => {
              clearCart();
              toast.success("تم تفريغ السلة");
            }}>
                  تفريغ السلة
                </Button>
              </div>
            </>}
        </div>

        {/* زر إتمام الطلب العائم في الأسفل */}
        {items.length > 0 && <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 max-w-md mx-auto shadow-lg my-[114px]">
            <Button onClick={() => navigate('/market/checkout')} className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-md text-lg">
              <ShoppingCart className="ml-2 h-5 w-5" />
              إتمام الطلب • {orderTotal.toFixed(2)} ج.م
            </Button>
          </div>}
      </div>
    </div>;
};
const MarketCart: React.FC = () => {
  return <MarketCartProvider>
      <MarketCartContent />
    </MarketCartProvider>;
};
export default MarketCart;