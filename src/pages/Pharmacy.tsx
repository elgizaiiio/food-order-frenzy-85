import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, MessageCircle, PlusCircle, ShoppingCart, Pill, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { usePharmacyCategories, usePharmacyCategoryProducts } from '@/hooks/usePharmacyData';
import { PharmacyCartProvider, usePharmacyCart } from '@/context/PharmacyCartContext';
const PharmacyContent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('painkillers');
  const {
    data: categories,
    isLoading: categoriesLoading
  } = usePharmacyCategories();
  const {
    data: products,
    isLoading: productsLoading
  } = usePharmacyCategoryProducts(activeCategory);
  const {
    addToCart,
    itemCount,
    totalPrice
  } = usePharmacyCart();
  return <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="px-4 pt-6 pb-2">
          {/* Delivery Address */}
          <div className="flex items-center justify-start mb-4 text-sm">
            <div className="flex items-center gap-1 text-gray-700">
              <MapPin className="w-4 h-4 text-brand-500" />
              <span className="font-medium">التوصيل إلى</span>
            </div>
            <div className="flex items-center gap-1 mx-1">
              <span className="font-medium text-brand-700">شارع الملك فهد</span>
              <ChevronDown className="w-4 h-4 text-brand-500" />
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Input type="search" placeholder="ابحث عن الأدوية والمنتجات" className="w-full py-6 pl-4 pr-10 rounded-full bg-gray-100 border-none text-right" />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Page Title and AI Assistant */}
        <div className="flex items-center justify-between px-4 mb-4">
          <h1 className="text-2xl font-bold">الصيدليات</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="rounded-full p-2 h-auto">
                <MessageCircle className="h-6 w-6 text-brand-500" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-center">المساعد الشخصي</DialogTitle>
              </DialogHeader>
              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <p className="text-gray-600">
                  مرحبًا! يمكنني مساعدتك في اختيار الدواء المناسب لك. ما هي الأعراض التي تشعر بها؟
                </p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="اكتب استفسارك هنا..." className="flex-1 text-right" />
                <Button className="bg-brand-500 hover:bg-brand-600">إرسال</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Tabs */}
        <div className="mb-4">
          <div className="overflow-x-auto no-scrollbar">
            <div className="inline-flex gap-3 px-4 pb-2" style={{
            minWidth: '100%'
          }}>
              {categoriesLoading ? Array(8).fill(0).map((_, index) => <div key={index} className="flex flex-col items-center min-w-16">
                    <Skeleton className="w-12 h-12 rounded-full mb-1" />
                    <Skeleton className="w-12 h-3" />
                  </div>) : categories?.map(category => <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex flex-col items-center min-w-16 ${activeCategory === category.id ? 'text-brand-500' : 'text-gray-500'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${activeCategory === category.id ? 'bg-brand-100 border-2 border-brand-500' : 'bg-gray-100'}`}>
                      <Pill className={`w-6 h-6 ${activeCategory === category.id ? 'text-brand-500' : 'text-gray-500'}`} />
                    </div>
                    <span className="text-xs text-center">{category.name}</span>
                  </button>)}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">
            {categoriesLoading ? <Skeleton className="h-6 w-32" /> : categories?.find(c => c.id === activeCategory)?.name}
          </h2>
          
          {productsLoading ? <div className="grid grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, index) => <Card key={index} className="overflow-hidden">
                  <Skeleton className="w-full h-32" />
                  <div className="p-3">
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </div>
                </Card>)}
            </div> : <div className="grid grid-cols-2 gap-4">
              {products?.map(product => <Card key={product.id} className="overflow-hidden shadow-sm hover:shadow-md transition-all rounded-xl">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                    {!product.inStock && <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <span className="bg-white text-red-500 px-2 py-1 rounded-md text-xs font-bold">نفذت الكمية</span>
                      </div>}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm">{product.name}</h3>
                    <p className="text-gray-500 text-xs mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-700">{product.price} ريال</span>
                      <Button onClick={() => product.inStock && addToCart(product)} disabled={!product.inStock} size="sm" className={`rounded-full h-8 w-8 p-0 ${product.inStock ? 'bg-brand-500 hover:bg-brand-600' : 'bg-gray-300'}`}>
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>)}
            </div>}
        </div>

        {/* Cart Button - Fixed */}
        {itemCount > 0 && <Link to="/pharmacy/cart">
            <div className="fixed bottom-5 left-0 right-0 mx-auto w-4/5 max-w-md bg-brand-500 text-white rounded-full py-3 px-5 flex items-center justify-between shadow-lg animate-fade-in my-[51px]">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="font-bold">{itemCount} منتج</span>
              </div>
              <span className="font-bold">
                {totalPrice.toFixed(2)} ريال
              </span>
            </div>
          </Link>}
      </div>
    </div>;
};

// Wrapper component with PharmacyCartProvider
const Pharmacy: React.FC = () => {
  return <PharmacyCartProvider>
      <PharmacyContent />
    </PharmacyCartProvider>;
};
export default Pharmacy;