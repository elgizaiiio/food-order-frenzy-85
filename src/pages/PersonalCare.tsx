
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, MessageCircle, ShoppingCart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PersonalCare: React.FC = () => {
  const [cartItems, setCartItems] = useState<number>(0);

  // Women's Categories
  const womenCategories = [
    { id: 'makeup', name: 'الميكب', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=200&auto=format&fit=crop' },
    { id: 'skincare', name: 'سكين كير', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop' },
    { id: 'accessories', name: 'اكسسوارات', image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e7e?q=80&w=200&auto=format&fit=crop' },
    { id: 'perfumes', name: 'عطور', image: 'https://images.unsplash.com/photo-1615144756134-e9e5d3244333?q=80&w=200&auto=format&fit=crop' },
    { id: 'bodycare', name: 'بادي كير', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=200&auto=format&fit=crop' },
    { id: 'nailcare', name: 'نيل كير', image: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=200&auto=format&fit=crop' }
  ];

  // Men's Categories
  const menCategories = [
    { id: 'menperfumes', name: 'عطور', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=200&auto=format&fit=crop' },
    { id: 'menaccessories', name: 'اكسسوارات', image: 'https://images.unsplash.com/photo-1588169409940-517b13d36cba?q=80&w=200&auto=format&fit=crop' },
    { id: 'shaving', name: 'الحلاقة والعناية باللحية', image: 'https://images.unsplash.com/photo-1621607242220-84722888644e?q=80&w=200&auto=format&fit=crop' },
    { id: 'menskincare', name: 'سكين كير رجالي', image: 'https://images.unsplash.com/photo-1556228841-a3c527ca8f9a?q=80&w=200&auto=format&fit=crop' },
    { id: 'deodorants', name: 'ديودرنت', image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=200&auto=format&fit=crop' },
  ];

  // Special Offers
  const specialOffers = [
    {
      id: 1,
      title: "خصم 20% على منتجات المكياج",
      description: "العرض ساري حتى نهاية الشهر",
      color: "from-pink-100 to-purple-100",
      textColor: "text-purple-700",
      image: "https://images.unsplash.com/photo-1631730359585-5e3085eb4d5b?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "اشتري 2 واحصل على 1 مجانًا",
      description: "على منتجات العناية بالبشرة",
      color: "from-blue-100 to-cyan-100",
      textColor: "text-blue-700",
      image: "https://images.unsplash.com/photo-1571781418606-70265b9cce90?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "هدية مجانية",
      description: "مع كل طلب بقيمة 300 ريال أو أكثر",
      color: "from-amber-100 to-yellow-100",
      textColor: "text-amber-700",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">العناية الشخصية</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-700">
              <Search className="w-5 h-5" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-purple-600">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle className="text-center">مساعد العناية الشخصية</DialogTitle>
                </DialogHeader>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">مرحباً! يمكنني مساعدتك في اختيار المنتجات المناسبة لبشرتك أو شعرك. ما الذي تبحث عنه؟</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="p-4 mb-2">
          <h2 className="text-lg font-medium text-gray-800">
            كل اللي محتاجاه لنفسك في مكان واحد
          </h2>
        </div>

        {/* Gender Tabs */}
        <Tabs defaultValue="women" className="w-full mb-6">
          <div className="px-4">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="women" className="text-lg">👩 للبنات</TabsTrigger>
              <TabsTrigger value="men" className="text-lg">👨 للرجال</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="women" className="mt-4">
            <div className="grid grid-cols-2 gap-4 px-4">
              {womenCategories.map(category => (
                <Link to={`/personal-care/category/${category.id}`} key={category.id}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-pink-50 to-purple-50">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover mix-blend-overlay"
                      />
                    </div>
                    <div className="p-3 text-center bg-white">
                      <h3 className="font-medium text-gray-800">{category.name}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="men" className="mt-4">
            <div className="grid grid-cols-2 gap-4 px-4">
              {menCategories.map(category => (
                <Link to={`/personal-care/category/${category.id}`} key={category.id}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover mix-blend-overlay"
                      />
                    </div>
                    <div className="p-3 text-center bg-white">
                      <h3 className="font-medium text-gray-800">{category.name}</h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Special Offers Section */}
        <div className="px-4 mb-8">
          <h2 className="text-xl font-bold mb-4 text-right">عروض خاصة ليك</h2>
          <div className="offers-container">
            {specialOffers.map(offer => (
              <div 
                key={offer.id} 
                className="offer-card relative overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${offer.color} opacity-70`}>
                    <div className="absolute bottom-4 right-4 text-right">
                      <h3 className={`text-xl font-bold ${offer.textColor}`}>{offer.title}</h3>
                      <p className="text-sm text-gray-700">{offer.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products Preview */}
        <div className="px-4 mb-12">
          <div className="flex justify-between items-center mb-4">
            <Link to="/personal-care/featured" className="text-brand-500 text-sm">عرض الكل</Link>
            <h2 className="text-xl font-bold">منتجات مميزة</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Link to={`/personal-care/product/${item}`} key={item}>
                <Card className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={`https://images.unsplash.com/photo-${1590000000000 + item * 11111}?q=80&w=200&auto=format&fit=crop`} 
                      alt={`منتج ${item}`}
                      className="w-full h-40 object-cover"
                    />
                    {item === 1 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        جديد
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium mb-1">منتج العناية {item}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{30 + (item * 10)} ريال</span>
                      <Button size="sm" className="rounded-full h-8 w-8 p-0 bg-brand-500">
                        <span className="text-lg">+</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Cart Button - Fixed */}
        {cartItems > 0 && (
          <Link to="/personal-care/cart">
            <div className="fixed bottom-5 left-0 right-0 mx-auto w-4/5 max-w-md bg-brand-500 text-white rounded-full py-3 px-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="font-bold">{cartItems} منتج</span>
              </div>
              <span className="font-bold">
                120 ريال
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PersonalCare;
