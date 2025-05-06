
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, MessageCircle, ShoppingCart, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { Progress } from '@/components/ui/progress';

const PersonalCare: React.FC = () => {
  const { itemCount, totalPrice, addToCart } = usePersonalCareCart();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب البيانات من API
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        // في التطبيق الحقيقي، هذا سيكون استدعاء API
        setTimeout(() => {
          const mockProducts = [
            {
              id: 1,
              name: "عطر فلورا الفاخر",
              price: 199,
              image: "https://images.unsplash.com/photo-1592945403359-fd1c452a0a59?q=80&w=200&auto=format&fit=crop",
              gender: "women",
              rating: 4.8
            },
            {
              id: 2,
              name: "كريم مرطب للوجه",
              price: 85,
              image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=200&auto=format&fit=crop",
              gender: "women",
              rating: 4.5
            },
            {
              id: 3,
              name: "أحمر شفاه مات",
              price: 65,
              image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=200&auto=format&fit=crop",
              gender: "women",
              rating: 4.7
            },
            {
              id: 4,
              name: "عطر رجالي خاص",
              price: 215,
              image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=200&auto=format&fit=crop",
              gender: "men",
              rating: 4.9
            }
          ];
          setFeaturedProducts(mockProducts);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);

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

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">العناية الشخصية</h1>
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
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
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
            <TabsList className="w-full grid grid-cols-2 bg-gradient-to-br from-purple-50 to-pink-50">
              <TabsTrigger value="women" className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">👩 للبنات</TabsTrigger>
              <TabsTrigger value="men" className="text-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white">👨 للرجال</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="women" className="mt-4">
            <div className="grid grid-cols-2 gap-4 px-4">
              {womenCategories.map(category => (
                <Link to={`/personal-care/category/${category.id}`} key={category.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all transform hover:scale-105 border-0 shadow-sm">
                    <div className="h-32 bg-gradient-to-br from-pink-100 to-purple-200">
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
                  <Card className="overflow-hidden hover:shadow-lg transition-all transform hover:scale-105 border-0 shadow-sm">
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-indigo-200">
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
          <h2 className="text-xl font-bold mb-4 text-right flex items-center gap-2">
            <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"></span>
            عروض خاصة ليك
          </h2>
          <div className="offers-container space-y-3">
            {specialOffers.map(offer => (
              <div 
                key={offer.id} 
                className="offer-card relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all"
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
        <div className="px-4 mb-20">
          <div className="flex justify-between items-center mb-4">
            <Link to="/personal-care/featured" className="text-purple-600 text-sm font-medium">عرض الكل</Link>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-purple-500 to-pink-500"></span>
              منتجات مميزة
            </h2>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <div className="text-center text-sm text-gray-500">جاري تحميل المنتجات...</div>
              <Progress value={40} className="h-1 w-full" indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    {product.id === 1 && (
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
                        جديد
                      </div>
                    )}
                    <button className="absolute top-2 left-2 text-gray-600 bg-white/80 rounded-full p-1.5 backdrop-blur-sm">
                      <Heart className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-white text-xs">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium mb-1 text-gray-800">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-purple-700">{product.price} ريال</span>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        size="sm" 
                        className="rounded-full h-8 w-8 p-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-sm"
                      >
                        <span className="text-lg">+</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Cart Button - Fixed */}
        {itemCount > 0 && (
          <Link to="/personal-care/cart">
            <div className="fixed bottom-5 left-0 right-0 mx-auto w-4/5 max-w-md bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full py-3 px-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="font-bold">{itemCount} منتج</span>
              </div>
              <span className="font-bold">
                {totalPrice} ريال
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PersonalCare;
