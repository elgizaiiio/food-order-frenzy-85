
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronDown, Search, MessageCircle, PlusCircle, ShoppingCart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for products
const categories = [
  { id: 'ear-drops', name: 'قطرات الأذن', icon: 'ear' },
  { id: 'allergy', name: 'مضادات الحساسية', icon: 'allergy' },
  { id: 'mental', name: 'أدوية نفسية', icon: 'mental' },
  { id: 'skin', name: 'الجلدية', icon: 'skin' },
  { id: 'cold', name: 'البرد والإنفلونزا', icon: 'cold' },
  { id: 'immunity', name: 'الجهاز المناعي', icon: 'immunity' },
  { id: 'vaccines', name: 'اللقاحات', icon: 'vaccines' },
  { id: 'womens', name: 'صحة المرأة', icon: 'women' },
  { id: 'diabetes', name: 'السكري', icon: 'diabetes' },
  { id: 'urology', name: 'المسالك البولية', icon: 'urology' },
  { id: 'digestion', name: 'الهضم', icon: 'digestion' },
  { id: 'sleep', name: 'الإرق', icon: 'sleep' },
  { id: 'oral', name: 'مطهرات الفم', icon: 'oral' },
  { id: 'bones', name: 'العظام', icon: 'bones' },
  { id: 'hair', name: 'العناية بالشعر', icon: 'hair' },
  { id: 'skincare', name: 'البشرة', icon: 'skincare' },
  { id: 'fitness', name: 'اللياقة', icon: 'fitness' },
  { id: 'sexual', name: 'الصحة الجنسية', icon: 'sexual' },
  { id: 'personal', name: 'العناية الشخصية', icon: 'personal' },
  { id: 'devices', name: 'الأجهزة الطبية', icon: 'devices' },
  { id: 'daily', name: 'العناية اليومية', icon: 'daily' },
  { id: 'beauty', name: 'الجمال', icon: 'beauty' },
  { id: 'vitamins', name: 'الفيتامينات', icon: 'vitamins' },
  { id: 'antibiotics', name: 'المضادات الحيوية', icon: 'antibiotics' },
  { id: 'painkillers', name: 'المسكنات', icon: 'painkillers' },
  { id: 'smoking', name: 'الإقلاع عن التدخين', icon: 'smoking' },
  { id: 'heart', name: 'القلب والضغط', icon: 'heart' },
  { id: 'hemorrhoids', name: 'البواسير', icon: 'hemorrhoids' },
  { id: 'hormones', name: 'الهرمونات', icon: 'hormones' },
];

// Mock products
const products = {
  'painkillers': [
    {
      id: 1,
      name: 'باراسيتامول',
      description: 'مسكن ألم سريع المفعول',
      price: 15,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'ايبوبروفين',
      description: 'مضاد للالتهاب ومسكن للألم',
      price: 22,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'اسبرين',
      description: 'مسكن للألم ومضاد للالتهاب',
      price: 12,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ],
  'cold': [
    {
      id: 4,
      name: 'كونجستال',
      description: 'لعلاج احتقان الأنف',
      price: 18,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 5,
      name: 'مضاد هستامين',
      description: 'لعلاج الحساسية والزكام',
      price: 25,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ],
  'vitamins': [
    {
      id: 6,
      name: 'فيتامين C',
      description: 'لدعم المناعة',
      price: 30,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 7,
      name: 'فيتامين D',
      description: 'لصحة العظام',
      price: 35,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ],
  'allergy': [
    {
      id: 8,
      name: 'كلارينت',
      description: 'مضاد للهستامين',
      price: 28,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ]
};

// For other categories (this would come from Supabase in a real app)
for (const category of categories) {
  if (!products[category.id]) {
    products[category.id] = [
      {
        id: Math.floor(Math.random() * 1000),
        name: `منتج ${category.name}`,
        description: 'وصف المنتج',
        price: Math.floor(Math.random() * 30) + 10,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: Math.floor(Math.random() * 1000),
        name: `${category.name} متميز`,
        description: 'وصف المنتج المتميز',
        price: Math.floor(Math.random() * 40) + 20,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      }
    ];
  }
}

const Pharmacy: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('painkillers');
  const [cart, setCart] = useState<any[]>([]);
  const { toast } = useToast();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prevCart, {...product, quantity: 1}];
      }
    });
    
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تم إضافة ${product.name} إلى سلة المشتريات.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
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
            <Input 
              type="search"
              placeholder="ابحث عن الأدوية والمنتجات"
              className="w-full py-6 pl-4 pr-10 rounded-full bg-gray-100 border-none text-right"
            />
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
                <Input 
                  placeholder="اكتب استفسارك هنا..." 
                  className="flex-1 text-right"
                />
                <Button>إرسال</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Tabs */}
        <div className="mb-4">
          <div className="overflow-x-auto no-scrollbar">
            <div className="inline-flex gap-4 px-4 pb-2" style={{ minWidth: '100%' }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center min-w-16 ${
                    activeCategory === category.id ? 'text-brand-500' : 'text-gray-500'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                    activeCategory === category.id 
                      ? 'bg-brand-100 border-2 border-brand-500' 
                      : 'bg-gray-100'
                  }`}>
                    <Pill className={`w-6 h-6 ${
                      activeCategory === category.id ? 'text-brand-500' : 'text-gray-500'
                    }`} />
                  </div>
                  <span className="text-xs text-center">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">{categories.find(c => c.id === activeCategory)?.name}</h2>
          <div className="grid grid-cols-2 gap-4">
            {products[activeCategory]?.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{product.price} ريال</span>
                    <Button 
                      onClick={() => addToCart(product)}
                      size="sm" 
                      className="rounded-full h-8 w-8 p-0 bg-brand-500"
                    >
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Button - Fixed */}
        {cart.length > 0 && (
          <Link to="/pharmacy/cart">
            <div className="fixed bottom-5 left-0 right-0 mx-auto w-4/5 max-w-md bg-brand-500 text-white rounded-full py-3 px-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="font-bold">{cart.reduce((sum, item) => sum + item.quantity, 0)} منتج</span>
              </div>
              <span className="font-bold">
                {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)} ريال
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pharmacy;
