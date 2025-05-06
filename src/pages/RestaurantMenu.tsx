import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Search, Share2, Star, Heart, Plus, Minus, ShoppingBag, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  offer?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const RestaurantMenu: React.FC = () => {
  const { id } = useParams<{ id: string; }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showQuantityDialog, setShowQuantityDialog] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(1);

  // Mock restaurant data - in a real app, this would come from an API or Supabase
  const restaurant = {
    id: parseInt(id || '1'),
    name: "مطعم الشرق",
    logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
    cover: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    deliveryTime: "25-35",
    deliveryFee: "10 ريال",
    cuisine: "شرقي، عربي، مشويات",
    categories: [{
      id: "popular",
      name: "الأكثر طلبًا"
    }, {
      id: "offers",
      name: "العروض"
    }, {
      id: "fish",
      name: "الأسماك"
    }, {
      id: "chicken",
      name: "الدجاج"
    }, {
      id: "sides",
      name: "إضافات"
    }, {
      id: "drinks",
      name: "المشروبات"
    }],
    items: [{
      id: 1,
      name: "شاورما دجاج سبيشال",
      description: "شاورما دجاج مع صوص خاص وخضروات",
      price: 25,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      category: "popular",
      popular: true
    }, {
      id: 2,
      name: "سمك مشوي",
      description: "سمك طازج مشوي مع الخضار والأرز",
      price: 45,
      image: "https://images.unsplash.com/photo-1611599538835-b52a8c2af7fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      category: "fish"
    }, {
      id: 3,
      name: "سلطة الشيف",
      description: "سلطة طازجة مع صلصة خاصة",
      price: 15,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      category: "sides"
    }, {
      id: 4,
      name: "برجر لحم مشوي",
      description: "برجر لحم مشوي مع جبن وخضروات طازجة",
      price: 30,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      category: "popular",
      popular: true,
      offer: "خصم 20٪"
    }, {
      id: 5,
      name: "دجاج مشوي",
      description: "دجاج مشوي مع الأعشاب والثوم",
      price: 40,
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
      category: "chicken"
    }, {
      id: 6,
      name: "عصير برتقال طازج",
      description: "عصير برتقال طبيعي 100٪",
      price: 12,
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      category: "drinks"
    }, {
      id: 7,
      name: "كوكا كولا",
      description: "مشروب غازي منعش",
      price: 5,
      image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      category: "drinks"
    }]
  };

  // Filter items by selected category
  const filteredItems = restaurant.items.filter(item => selectedCategory === 'popular' ? item.popular : item.category === selectedCategory);

  // Determine if the category has items
  const categoryHasItems = filteredItems.length > 0;

  // Cart functions
  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem => cartItem.id === item.id ? {
          ...cartItem,
          quantity: cartItem.quantity + 1
        } : cartItem);
      } else {
        return [...prev, {
          ...item,
          quantity: 1
        }];
      }
    });
    toast.success(`تمت إضافة ${item.name} إلى السلة`);
  };

  const openQuantityDialog = (item: MenuItem) => {
    setSelectedItem(item);
    setTempQuantity(1);
    setShowQuantityDialog(true);
  };

  const addToCartWithQuantity = () => {
    if (selectedItem && tempQuantity > 0) {
      setCartItems(prev => {
        const existingItem = prev.find(cartItem => cartItem.id === selectedItem.id);
        if (existingItem) {
          return prev.map(cartItem => cartItem.id === selectedItem.id ? {
            ...cartItem,
            quantity: cartItem.quantity + tempQuantity
          } : cartItem);
        } else {
          return [...prev, {
            ...selectedItem,
            quantity: tempQuantity
          }];
        }
      });
      toast.success(`تمت إضافة ${selectedItem.name} (${tempQuantity}) إلى السلة`);
      setShowQuantityDialog(false);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'تمت إزالة المطعم من المفضلة' : 'تمت إضافة المطعم إلى المفضلة');
  };

  const shareRestaurant = () => {
    // In a real app, this would use the Web Share API
    toast.info('تم نسخ رابط المطعم');
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Cover Image with Header */}
        <div className="relative">
          <img src={restaurant.cover} alt={restaurant.name} className="w-full h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-transparent">
            <div className="flex justify-between items-start p-4">
              <button 
                onClick={() => navigate('/restaurants')} 
                className="p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={shareRestaurant} 
                  className="p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button 
                  onClick={toggleFavorite} 
                  className="p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="relative px-4 pb-4 border-b">
          <div className="flex items-start mt-3">
            <img 
              src={restaurant.logo} 
              alt={restaurant.name} 
              className="w-20 h-20 rounded-lg border-4 border-white shadow-md object-cover -mt-10" 
            />
            <div className="ml-3 pt-1">
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{restaurant.cuisine}</p>
              <div className="flex items-center flex-wrap gap-3 mt-2">
                <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700">{restaurant.deliveryTime} دقيقة</span>
                </div>
                <div className="text-sm text-gray-700 bg-green-50 px-2 py-1 rounded-full">
                  التوصيل: {restaurant.deliveryFee}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="border-b sticky top-0 bg-white z-10 shadow-sm">
          <div className="flex overflow-x-auto gap-2 py-3 px-4 no-scrollbar">
            {restaurant.categories.map(category => (
              <Button 
                key={category.id} 
                variant={selectedCategory === category.id ? "default" : "outline"} 
                className={`whitespace-nowrap rounded-full transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md' 
                    : 'text-gray-700 border-gray-200 hover:bg-gray-50'
                }`} 
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items or Empty State */}
        <div className="px-4 py-3">
          {categoryHasItems ? (
            filteredItems.map(item => (
              <div 
                key={item.id} 
                className="flex gap-3 border-b py-4 group hover:bg-gray-50 transition-colors rounded-lg px-2"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-gray-900">{item.price} ريال</span>
                    <Button 
                      size="sm" 
                      onClick={() => openQuantityDialog(item)} 
                      className="rounded-full shadow-sm bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 group-hover:scale-105 transition-all"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      إضافة
                    </Button>
                  </div>
                </div>
                <div className="relative w-28 h-28 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow" 
                  />
                  {item.offer && (
                    <Badge className="absolute top-2 right-2 text-xs bg-gradient-to-r from-red-500 to-pink-500 shadow-sm">
                      {item.offer}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">هذا القسم فارغ حاليًا</h3>
              <p className="text-sm text-gray-600 mb-4">جرّب اختيار قسم آخر من القائمة</p>
            </div>
          )}
        </div>
        
        {/* Cart Button - Fixed at bottom */}
        {cartItems.length > 0 ? (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto shadow-lg animate-fade-in">
            <Button 
              onClick={() => navigate('/cart')} 
              className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 shadow-md hover:shadow-lg transition-shadow text-slate-800"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <ShoppingBag className="mr-2" />
                  <span>{getTotalItems()} عناصر</span>
                </div>
                <span className="font-bold">{getTotalPrice()} ريال</span>
              </div>
            </Button>
          </div>
        ) : (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
            <Button 
              className="w-full py-6 text-lg rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed" 
              disabled
            >
              <ShoppingBag className="mr-2" />
              اختر طعامك المفضل
            </Button>
          </div>
        )}
        
        {/* Quantity Dialog */}
        <Dialog open={showQuantityDialog} onOpenChange={setShowQuantityDialog}>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-center">
                {selectedItem?.name}
              </h3>
              <div className="flex items-center justify-center gap-4 py-4">
                <button 
                  onClick={() => setTempQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold">{tempQuantity}</span>
                <button 
                  onClick={() => setTempQuantity(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <Button 
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-pink-500"
                onClick={addToCartWithQuantity}
              >
                إضافة إلى السلة ({selectedItem?.price && tempQuantity * selectedItem?.price} ريال)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RestaurantMenu;
