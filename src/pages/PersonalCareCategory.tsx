import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Star, Plus, Filter, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { toast } from 'sonner';
import { PersonalCareProduct } from '@/context/PersonalCareCartContext';
const PersonalCareCategory: React.FC = () => {
  const {
    categoryId
  } = useParams<{
    categoryId: string;
  }>();
  const {
    addToCart,
    itemCount,
    totalPrice
  } = usePersonalCareCart();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<PersonalCareProduct[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Category mapping
  const categoryMap: Record<string, {
    name: string;
    gender: 'women' | 'men';
    color: string;
    image: string;
  }> = {
    'makeup': {
      name: 'الميكب',
      gender: 'women',
      color: 'from-blue-500 to-blue-700',
      image: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=400&auto=format&fit=crop'
    },
    'skincare': {
      name: 'سكين كير',
      gender: 'women',
      color: 'from-blue-500 to-blue-700',
      image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=400&auto=format&fit=crop'
    },
    'accessories': {
      name: 'اكسسوارات',
      gender: 'women',
      color: 'from-blue-500 to-blue-700',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop'
    },
    'perfumes': {
      name: 'عطور',
      gender: 'women',
      color: 'from-blue-500 to-blue-700',
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=400&auto=format&fit=crop'
    },
    'bodycare': {
      name: 'بادي كير',
      gender: 'women',
      color: 'from-blue-500 to-blue-700',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400&auto=format&fit=crop'
    },
    'nailcare': {
      name: 'نيل كير',
      gender: 'women',
      color: 'from-blue-500 to-blue-700',
      image: 'https://images.unsplash.com/photo-1631213177572-fd7818a37d85?q=80&w=400&auto=format&fit=crop'
    },
    'menperfumes': {
      name: 'عطور',
      gender: 'men',
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=400&auto=format&fit=crop'
    },
    'menaccessories': {
      name: 'اكسسوارات',
      gender: 'men',
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=400&auto=format&fit=crop'
    },
    'shaving': {
      name: 'الحلاقة والعناية باللحية',
      gender: 'men',
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1621607514922-i9eba47788c5?q=80&w=400&auto=format&fit=crop'
    },
    'menskincare': {
      name: 'سكين كير رجالي',
      gender: 'men',
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop'
    },
    'deodorants': {
      name: 'ديودرنت',
      gender: 'men',
      color: 'from-blue-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1626818590338-bed90abab6fe?q=80&w=400&auto=format&fit=crop'
    }
  };
  const currentCategory = categoryMap[categoryId || ''] || {
    name: 'القسم',
    gender: 'women',
    color: 'from-blue-500 to-blue-700',
    image: 'https://images.unsplash.com/photo-1619451683204-a4bcd6ad008a?q=80&w=400&auto=format&fit=crop'
  };
  useEffect(() => {
    // Simulate API call to fetch products
    setLoading(true);
    setTimeout(() => {
      setProducts(generateProducts());
      setLoading(false);
    }, 800);
  }, [categoryId]);

  // Generate mock products based on category
  const generateProducts = () => {
    // This would come from the database in a real app
    const products: PersonalCareProduct[] = [];
    const count = 8; // Number of products to generate

    // Sample images by category
    const imageMap: Record<string, string[]> = {
      'makeup': ['https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1599733594230-5c61ba8de302?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1599733589518-2c5ee3b25b10?q=80&w=200&auto=format&fit=crop'],
      'skincare': ['https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1631730359585-5e3085eb4d5b?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=200&auto=format&fit=crop'],
      // Default images if specific category not found
      'default': ['https://images.unsplash.com/photo-1619451683204-a4bcd6ad008a?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1585652757173-57de5e9fab26?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1571781418606-70265b9cce90?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1571646750134-1632716adbe6?q=80&w=200&auto=format&fit=crop']
    };

    // Get images for the category or use default
    const categoryImages = imageMap[categoryId || ''] || imageMap['default'];

    // Product names by category
    const nameMap: Record<string, string[]> = {
      'makeup': ['أحمر شفاه', 'ماسكارا', 'كريم أساس', 'آيلاينر'],
      'skincare': ['كريم مرطب', 'سيروم فيتامين سي', 'ماسك للوجه', 'غسول للبشرة'],
      'menperfumes': ['عطر رجالي فاخر', 'عطر كلاسيكي', 'عطر رياضي', 'عطر خشبي'],
      'default': [`${currentCategory.name} منتج`]
    };
    const names = nameMap[categoryId || ''] || nameMap['default'];
    for (let i = 1; i <= count; i++) {
      const imageIndex = (i - 1) % categoryImages.length;
      const nameIndex = (i - 1) % names.length;
      const product: PersonalCareProduct = {
        id: i,
        name: `${names[nameIndex]} ${i}`,
        price: 30 + i * 15,
        image: categoryImages[imageIndex]
      };
      products.push(product);
    }
    return products;
  };
  const handleAddToCart = (product: PersonalCareProduct) => {
    addToCart(product);
    toast.success(`تمت إضافة ${product.name} إلى السلة`, {
      position: "top-center",
      className: "bg-blue-600 text-white border-blue-700"
    });
  };
  const filterOptions = [{
    id: 'all',
    name: 'الكل'
  }, {
    id: 'best-seller',
    name: 'الأكثر مبيعًا'
  }, {
    id: 'top-rated',
    name: 'الأعلى تقييمًا'
  }, {
    id: 'price-low',
    name: 'الأقل سعرًا'
  }, {
    id: 'price-high',
    name: 'الأعلى سعرًا'
  }];
  return <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/personal-care" className="text-blue-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">{currentCategory.name}</h1>
          <div className="flex items-center gap-4">
            <button className="text-blue-700">
              
            </button>
            <Link to="/personal-care/cart" className="relative text-blue-700">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>}
            </Link>
          </div>
        </div>

        {/* Category Banner */}
        <div className="relative h-40 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${currentCategory.color} opacity-80`}></div>
          <img src={currentCategory.image} alt={currentCategory.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <h2 className="text-2xl font-bold text-white mb-1">{currentCategory.name}</h2>
            <p className="text-sm text-white opacity-90">اختر من بين أفضل منتجات {currentCategory.name} المتوفرة</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <input type="text" placeholder={`ابحث في ${currentCategory.name}...`} className="w-full p-3 pl-10 pr-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <Search className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
          </div>
          
          {/* Filter button */}
          <div className="flex justify-between items-center">
            <Button variant="personalCareOutline" className="flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4" />
              <span>تصفية</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            
            <span className="text-sm text-gray-500">{products.length} منتج</span>
          </div>

          {/* Filter options */}
          {showFilters && <div className="bg-blue-50 p-4 rounded-lg animate-fade-in border border-blue-100">
              <h3 className="font-medium mb-3 text-blue-800">ترتيب حسب:</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map(option => <Button key={option.id} variant={activeFilter === option.id ? "personalCare" : "personalCareOutline"} size="sm" onClick={() => setActiveFilter(option.id)}>
                    {option.name}
                  </Button>)}
              </div>
              
              <h3 className="font-medium mb-3 mt-4 text-blue-800">السعر:</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="personalCareOutline" size="sm">أقل من 50 ريال</Button>
                <Button variant="personalCareOutline" size="sm">50 - 100 ريال</Button>
                <Button variant="personalCareOutline" size="sm">100+ ريال</Button>
              </div>
            </div>}
          
          {/* Horizontal Filter Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar -mx-1 px-1">
            {filterOptions.map(option => <Button key={option.id} variant={activeFilter === option.id ? "personalCare" : "personalCareOutline"} size="sm" className={`whitespace-nowrap`} onClick={() => setActiveFilter(option.id)}>
                {option.name}
              </Button>)}
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-4">
          {loading ? <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="animate-pulse">
                  <div className="bg-blue-100 h-40 rounded-lg mb-2"></div>
                  <div className="bg-blue-100 h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-blue-100 h-4 w-1/2 rounded"></div>
                </div>)}
            </div> : <div className="grid grid-cols-2 gap-4">
              {products.map(product => <Card key={product.id} className="overflow-hidden border border-blue-100 hover:shadow-md transition-shadow">
                  <Link to={`/personal-care/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
                  </Link>
                  <div className="p-3">
                    <Link to={`/personal-care/product/${product.id}`}>
                      <h3 className="font-medium text-blue-800">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                      <span className="text-xs text-gray-600">{(4 + Math.random()).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-700">{product.price} ريال</span>
                      <Button size="sm" className="rounded-full h-7 w-7 p-0 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-sm" onClick={() => handleAddToCart(product)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>)}
            </div>}
        </div>

        {/* Cart Floating Button */}
        {itemCount > 0 && <Link to="/personal-care/cart">
            <div className="fixed bottom-5 left-0 right-0 mx-auto w-4/5 max-w-md bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full py-3 px-5 flex items-center justify-between shadow-lg my-[51px]">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span className="font-bold">{itemCount} منتج</span>
              </div>
              <span className="font-bold">
                {totalPrice} ريال
              </span>
            </div>
          </Link>}
      </div>
    </div>;
};
export default PersonalCareCategory;