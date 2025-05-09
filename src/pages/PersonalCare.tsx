
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { toast } from 'sonner';

const PersonalCare: React.FC = () => {
  const { addToCart, itemCount, totalPrice } = usePersonalCareCart();

  // Women's categories
  const womenCategories = [
    { id: 'makeup', name: 'الميكب', image: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=300&auto=format&fit=crop' },
    { id: 'skincare', name: 'سكين كير', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=300&auto=format&fit=crop' },
    { id: 'accessories', name: 'اكسسوارات', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=300&auto=format&fit=crop' },
    { id: 'perfumes', name: 'عطور', image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=300&auto=format&fit=crop' },
    { id: 'bodycare', name: 'بادي كير', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=300&auto=format&fit=crop' },
    { id: 'nailcare', name: 'نيل كير', image: 'https://images.unsplash.com/photo-1631213177572-fd7818a37d85?q=80&w=300&auto=format&fit=crop' },
  ];

  // Men's categories
  const menCategories = [
    { id: 'menperfumes', name: 'عطور', image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=300&auto=format&fit=crop' },
    { id: 'menaccessories', name: 'اكسسوارات', image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=300&auto=format&fit=crop' },
    { id: 'shaving', name: 'الحلاقة والعناية باللحية', image: 'https://images.unsplash.com/photo-1621607514922-i9eba47788c5?q=80&w=300&auto=format&fit=crop' },
    { id: 'menskincare', name: 'سكين كير رجالي', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=300&auto=format&fit=crop' },
    { id: 'deodorants', name: 'ديودرنت', image: 'https://images.unsplash.com/photo-1626818590338-bed90abab6fe?q=80&w=300&auto=format&fit=crop' },
  ];

  // Featured products
  const featuredProducts = [
    { id: 1, name: 'كريم مرطب للوجه', price: 120, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'سيروم فيتامين سي', price: 230, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200&auto=format&fit=crop' },
    { id: 3, name: 'مزيل مكياج', price: 85, image: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=200&auto=format&fit=crop' },
    { id: 4, name: 'أحمر شفاه', price: 75, image: 'https://images.unsplash.com/photo-1599733589518-2c5ee3b25b10?q=80&w=200&auto=format&fit=crop' },
  ];

  // Suggested products
  const suggestedProducts = [
    { id: 5, name: 'عطر فرنسي رجالي', price: 350, image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=200&auto=format&fit=crop' },
    { id: 6, name: 'مقشر للجسم', price: 120, image: 'https://images.unsplash.com/photo-1631730359585-5e3085eb4d5b?q=80&w=200&auto=format&fit=crop' },
    { id: 7, name: 'كريم يدين', price: 45, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=200&auto=format&fit=crop' },
  ];

  const handleAddToCart = (product: { id: number; name: string; price: number; image: string }) => {
    addToCart(product);
    toast(`تمت إضافة ${product.name} إلى السلة`, {
      position: "top-center",
      className: "bg-blue-600 text-white border-blue-700"
    });
  };

  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/" className="text-blue-700 font-bold text-lg">
            dam
          </Link>
          <h1 className="text-lg font-bold">العناية الشخصية</h1>
          <div className="flex items-center gap-4">
            <button className="text-blue-600">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/personal-care/cart" className="relative text-blue-600">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-90"></div>
          <img 
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop" 
            alt="Personal Care Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h2 className="text-2xl font-bold mb-2">العناية الشخصية</h2>
            <p className="text-sm">أفضل منتجات العناية بالبشرة والشعر والجسم</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="ابحث عن منتجات العناية الشخصية..." 
              className="w-full p-3 pr-10 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
          </div>
        </div>

        {/* Women's Categories */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-blue-800">منتجات العناية النسائية</h2>
          <div className="grid grid-cols-2 gap-4">
            {womenCategories.map((category) => (
              <Link key={category.id} to={`/personal-care/category/${category.id}`}>
                <div className="relative rounded-lg overflow-hidden h-32 shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-3">
                    <h3 className="text-white font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Men's Categories */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-blue-800">منتجات العناية الرجالية</h2>
          <div className="grid grid-cols-2 gap-4">
            {menCategories.map((category) => (
              <Link key={category.id} to={`/personal-care/category/${category.id}`}>
                <div className="relative rounded-lg overflow-hidden h-32 shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-3">
                    <h3 className="text-white font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-blue-800">منتجات مميزة</h2>
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-blue-100">
                <Link to={`/personal-care/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-36 object-cover"
                  />
                </Link>
                <div className="p-3">
                  <Link to={`/personal-care/product/${product.id}`}>
                    <h3 className="font-medium text-blue-800">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-xs">{(4 + Math.random()).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-700">{product.price} ريال</span>
                    <Button 
                      size="sm" 
                      className="rounded-full h-7 w-7 p-0 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                      onClick={() => handleAddToCart(product)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggested Products */}
        <div className="px-4 mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-800">اكتشف المزيد</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {suggestedProducts.map((product) => (
              <Card key={product.id} className="min-w-[160px] overflow-hidden hover:shadow-lg transition-shadow border border-blue-100">
                <Link to={`/personal-care/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                </Link>
                <div className="p-3">
                  <Link to={`/personal-care/product/${product.id}`}>
                    <h3 className="font-medium text-sm text-blue-800">{product.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-sm text-blue-700">{product.price} ريال</span>
                    <Button 
                      size="sm" 
                      className="rounded-full h-6 w-6 p-0 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                      onClick={() => handleAddToCart(product)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Floating Button */}
        {itemCount > 0 && (
          <div className="fixed bottom-5 left-0 right-0 mx-auto w-11/12 max-w-md z-30">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-bold">{itemCount} منتج</span>
                </div>
                <span className="font-bold">
                  {totalPrice} ريال
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/personal-care" className="w-full">
                  <Button variant="outlineBlue" className="w-full">
                    إضافة المزيد
                  </Button>
                </Link>
                <Link to="/personal-care/cart" className="w-full">
                  <Button variant="personalCare" className="w-full">
                    إتمام الطلب
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalCare;
