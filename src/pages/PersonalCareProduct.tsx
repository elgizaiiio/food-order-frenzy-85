
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';

const PersonalCareProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart, itemCount, totalPrice } = usePersonalCareCart();
  const [quantity, setQuantity] = useState(1);
  
  // Mock product data (in a real app, this would come from an API)
  const product = {
    id: Number(productId) || 1,
    name: 'كريم مرطب للوجه',
    price: 120,
    description: 'كريم مرطب للوجه مناسب لجميع أنواع البشرة. يحتوي على مكونات طبيعية تساعد على ترطيب البشرة وحمايتها من العوامل الخارجية.',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee271b?q=80&w=500&auto=format&fit=crop',
    rating: 4.8,
    reviews: 120,
    features: [
      'مناسب لجميع أنواع البشرة',
      'خالي من البارابين والكحول',
      'مكونات طبيعية 100%',
      'يدوم لمدة 24 ساعة',
      'مضاد للأكسدة',
    ],
    recommended: [
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
    ]
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
    
    toast(`تمت إضافة ${product.name} إلى السلة`);
  };

  const handleAddRecommended = (product: { id: number; name: string; price: number; image: string }) => {
    addToCart(product);
    toast(`تمت إضافة ${product.name} إلى السلة`);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/personal-care" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تفاصيل المنتج</h1>
          <Link to="/personal-care/cart" className="relative text-gray-700">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Product Image */}
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-72 object-cover"
          />
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
            <Heart className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-600 mt-2">{product.price} ريال</p>
          
          <div className="mt-4">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mt-6 bg-gray-100 p-4 rounded-lg">
            <span className="font-medium">الكمية</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={decreaseQuantity}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  quantity > 1 ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-400'
                }`}
                disabled={quantity <= 1}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <span className="font-bold text-lg w-5 text-center">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">مميزات المنتج</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Products */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3">منتجات ذات صلة</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
              {product.recommended.map((item) => (
                <div key={item.id} className="min-w-[150px] border rounded-lg overflow-hidden">
                  <Link to={`/personal-care/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-28 object-cover"
                    />
                  </Link>
                  <div className="p-2">
                    <Link to={`/personal-care/product/${item.id}`}>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold">{item.price} ريال</span>
                      <Button 
                        size="sm" 
                        className="rounded-full h-6 w-6 p-0 bg-gradient-to-r from-purple-500 to-pink-500"
                        onClick={() => handleAddRecommended(item)}
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
            className="w-full py-6 text-lg bg-gradient-to-r from-purple-500 to-pink-500"
          >
            إضافة إلى السلة - {product.price * quantity} ريال
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalCareProduct;
