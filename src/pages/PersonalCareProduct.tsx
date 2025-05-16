
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { useProductDetails } from '@/hooks/usePersonalCareData';
import { Skeleton } from '@/components/ui/skeleton';

const PersonalCareProduct: React.FC = () => {
  const { productId = '' } = useParams<{ productId?: string }>();
  const { addToCart, itemCount } = usePersonalCareCart();
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading, isError } = useProductDetails(productId);
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.image_url || ''
      });
    }
    
    toast(`تمت إضافة ${product.name} إلى السلة`, {
      position: "top-center",
      className: "bg-pink-600 text-white border-pink-700"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-50">
        <div className="max-w-md mx-auto bg-white pb-24">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm">
            <Link to="/personal-care" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">تفاصيل المنتج</h1>
            <div className="w-6"></div>
          </div>
          
          <Skeleton className="w-full h-72" />
          
          <div className="p-4">
            <Skeleton className="h-8 w-2/3 mb-2" />
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-20 w-full mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-pink-50">
        <div className="max-w-md mx-auto bg-white pb-24">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm">
            <Link to="/personal-care" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">تفاصيل المنتج</h1>
            <div className="w-6"></div>
          </div>
          
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-xl font-bold text-pink-800 mb-2">لم يتم العثور على المنتج</h2>
            <p className="text-gray-600 mb-6">عذراً، المنتج الذي تبحث عنه غير متوفر أو تم حذفه</p>
            <Button 
              onClick={() => window.history.back()} 
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              العودة للخلف
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // منتجات موصى بها (في تطبيق حقيقي، هذه ستأتي من API)
  const recommendedProducts = [
    { 
      id: 2, 
      name: 'سيروم فيتامين سي', 
      price: 230,
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=150&auto=format&fit=crop'
    },
    { 
      id: 3, 
      name: 'مزيل مكياج', 
      price: 85,
      image: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=150&auto=format&fit=crop'
    },
    { 
      id: 4, 
      name: 'أحمر شفاه', 
      price: 75,
      image: 'https://images.unsplash.com/photo-1599733589518-2c5ee3b25b10?q=80&w=150&auto=format&fit=crop'
    },
  ];

  // مميزات المنتج (يمكن أن تأتي من API أيضاً)
  const productFeatures = [
    'مناسب لجميع أنواع البشرة',
    'خالي من البارابين والكحول',
    'مكونات طبيعية 100%',
    'يدوم لمدة 24 ساعة',
    'مضاد للأكسدة'
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/personal-care" className="text-pink-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-pink-800">تفاصيل المنتج</h1>
          <Link to="/personal-care/cart" className="relative text-pink-700">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Product Image */}
        <div className="relative">
          <img 
            src={product.image_url || 'https://via.placeholder.com/500?text=No+Image'} 
            alt={product.name}
            className="w-full h-72 object-cover"
          />
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
            <Heart className="w-5 h-5 text-pink-500" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-pink-800">{product.name}</h2>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-xs text-gray-500">(120)</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-pink-600 mt-2">{product.price} ج.م</p>
          
          <div className="mt-4">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mt-6 bg-pink-50 p-4 rounded-lg border border-pink-100">
            <span className="font-medium text-pink-800">الكمية</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={decreaseQuantity}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  quantity > 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}
                disabled={quantity <= 1}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <span className="font-bold text-lg w-5 text-center">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2 text-pink-800">مميزات المنتج</h3>
            <ul className="space-y-2">
              {productFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Products */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3 text-pink-800">منتجات ذات صلة</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {recommendedProducts.map((item) => (
                <div key={item.id} className="min-w-[150px] border border-pink-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Link to={`/personal-care/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-28 object-cover"
                    />
                  </Link>
                  <div className="p-2">
                    <Link to={`/personal-care/product/${item.id}`}>
                      <h4 className="font-medium text-sm text-pink-800">{item.name}</h4>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-pink-700">{item.price} ج.م</span>
                      <Button 
                        size="sm" 
                        className="rounded-full h-6 w-6 p-0 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image
                          });
                          toast(`تمت إضافة ${item.name} إلى السلة`, {
                            position: "top-center",
                            className: "bg-pink-600 text-white border-pink-700"
                          });
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart Button - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
          <Button 
            onClick={handleAddToCart}
            className="w-full py-3 px-4 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            إضافة إلى السلة - {(product.price * quantity).toFixed(2)} ج.م
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalCareProduct;
