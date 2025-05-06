
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Share, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DamMarket: React.FC = () => {
  // Mock categories data - in a real app, this would come from a database
  const categories = [
    { id: 1, name: 'المشروبات', description: 'Beverages', image: 'https://images.unsplash.com/photo-1596803244535-925769f389fc?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 2, name: 'القهوة والشاي', description: 'Coffee & Tea', image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 3, name: 'الحليب', description: 'Milk', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 4, name: 'منتجات الألبان', description: 'Dairy Products', image: 'https://images.unsplash.com/photo-1628689469838-524a4a973b8e?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 5, name: 'إضافات الطعام', description: 'Food Additives', image: 'https://images.unsplash.com/photo-1610554675846-2618e40bd49d?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 6, name: 'الجبن', description: 'Cheese', image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 7, name: 'اللحوم', description: 'Meat', image: 'https://images.unsplash.com/photo-1613454320174-7862ab285a97?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 8, name: 'منتجات الطبخ', description: 'Cooking Products', image: 'https://images.unsplash.com/photo-1620574387735-3921fa6376a8?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 9, name: 'دجاج، بيض، لحوم باردة', description: 'Chicken, Eggs, Cold Cuts', image: 'https://images.unsplash.com/photo-1569288063643-5d29ad6874f0?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 10, name: 'الماء', description: 'Water', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 11, name: 'منتجات الخبز', description: 'Bread Products', image: 'https://images.unsplash.com/photo-1605280263929-1c42c62ef169?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 12, name: 'الأطعمة المجمدة', description: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1621858170710-2e684fb6bb6e?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 13, name: 'الآيس كريم', description: 'Ice Cream', image: 'https://images.unsplash.com/photo-1565237324415-e40db5510042?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 14, name: 'منتجات الإفطار', description: 'Breakfast Items', image: 'https://images.unsplash.com/photo-1550037303-03da09fbde16?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 15, name: 'شوكولاتة وبسكويت', description: 'Chocolate & Biscuits', image: 'https://images.unsplash.com/photo-1587495153142-a9c4480d4be5?auto=format&fit=crop&q=80&w=200&h=200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">dam ماركت</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-700">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Intro Text */}
        <div className="p-4 bg-gradient-to-r from-brand-50 to-brand-100 mb-4">
          <h2 className="text-2xl font-bold text-brand-700">هنسهل عليك كل حاجة</h2>
          <p className="text-sm text-gray-600 mt-1">اطلب منتجاتك واحنا هنوصلها لحد عندك</p>
        </div>

        {/* Cart Floating Button */}
        <div className="fixed bottom-6 left-4 z-20">
          <Link to="/market/cart">
            <Button className="rounded-full w-14 h-14 bg-brand-500 hover:bg-brand-600 shadow-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </Button>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-3">الفئات</h3>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <Link key={category.id} to={`/market/category/${category.id}`}>
                <Card className="flex flex-col items-center p-2 hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xs font-medium text-center">{category.name}</h4>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Items Section */}
        <div className="p-4">
          <h3 className="text-lg font-bold mb-3">الأكثر طلباً</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${1550000000000 + item * 11111}?auto=format&fit=crop&q=80&w=300&h=200`} 
                  alt={`Popular item ${item}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <h4 className="font-medium">منتج شائع {item}</h4>
                  <p className="text-xs text-gray-500 mb-2">وصف قصير للمنتج</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{10 + item} ريال</span>
                    <Button variant="outline" size="sm" className="text-xs py-1">
                      أضف للسلة
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div className="p-4 mb-20">
          <h3 className="text-lg font-bold mb-3">عروض خاصة</h3>
          <div className="overflow-x-auto flex gap-3 pb-2">
            {[1, 2, 3, 4, 5].map((offer) => (
              <Card key={offer} className="min-w-60 overflow-hidden flex-shrink-0">
                <div className="relative">
                  <img 
                    src={`https://images.unsplash.com/photo-${1560000000000 + offer * 11111}?auto=format&fit=crop&q=80&w=300&h=150`} 
                    alt={`Offer ${offer}`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    خصم {10 + offer * 5}%
                  </div>
                </div>
                <div className="p-2">
                  <h4 className="font-medium">عرض خاص {offer}</h4>
                  <p className="text-xs text-gray-500 mb-2">اشتر واحد واحصل على الثاني مجاناً</p>
                  <Button className="w-full text-xs bg-brand-500">تصفح العرض</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamMarket;
