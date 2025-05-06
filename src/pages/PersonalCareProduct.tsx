
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Share, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { toast } from 'sonner';

const PersonalCareProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = usePersonalCareCart();

  // Mock product data - in a real app, this would come from an API or database
  const product = {
    id: Number(productId) || 1,
    name: 'عطر فلورا الفاخر',
    description: 'عطر فاخر بتركيبة فريدة تدوم طويلاً',
    price: 245,
    discountPrice: 199,
    rating: 4.7,
    reviewCount: 124,
    images: [
      'https://images.unsplash.com/photo-1592945403359-fd1c452a0a59?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616485546097-659fca3a3814?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=400&auto=format&fit=crop',
    ],
    brand: 'دار العطور',
    inStock: true,
    variants: ['50ml', '100ml', '200ml'],
    details: `
      <p>عطر فلورا الفاخر هو مزيج رائع من النوتات العطرية:</p>
      <ul>
        <li>النوتة العليا: برتقال، ليمون، توت</li>
        <li>النوتة المتوسطة: ياسمين، ورد، زهر البرتقال</li>
        <li>النوتة القاعدية: عنبر، مسك، فانيليا</li>
      </ul>
      <p>تدوم رائحة العطر من 8-10 ساعات على البشرة.</p>
    `,
    ingredients: `
      <p>الكحول، ماء، عطور، ليناليل، ليمونين، سيترال، جيرانيول، سترونيلول، كومارين، بنزيل بنزوات.</p>
      <p class="text-sm text-red-500 mt-2">تنبيه: يحتوي على مواد قد تسبب حساسية لدى بعض الأشخاص. يرجى اختبار العطر على منطقة صغيرة من الجلد قبل الاستخدام.</p>
    `,
    reviews: [
      { user: 'سارة م.', rating: 5, comment: 'عطر رائع ويدوم طويلاً، أستخدمه يومياً.', date: 'منذ أسبوع' },
      { user: 'أحمد ك.', rating: 4, comment: 'رائحة جميلة لكن الزجاجة أصغر مما توقعت.', date: 'منذ شهر' },
      { user: 'ليلى س.', rating: 5, comment: 'تلقيت الكثير من الإطراء عندما استخدمته.', date: 'منذ شهرين' },
    ]
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(
      isFavorite ? "تم إزالة المنتج من المفضلة" : "تمت إضافة المنتج للمفضلة"
    );
  };

  const handleAddToCart = () => {
    // Create product object with the correct price (use discountPrice if available)
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
    };
    
    // Add the product to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    
    toast(`تم إضافة ${quantity} من ${product.name} إلى السلة بنجاح.`);
  };

  // Generate stars for ratings
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`h-4 w-4 ${i <= rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 shadow-sm">
          <Link to="/personal-care/category/perfumes" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={toggleFavorite}>
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
            <button>
              <Share className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Product Images Carousel */}
        <div className="mb-4 relative">
          <div className="overflow-x-scroll snap-x flex hide-scrollbar">
            {product.images.map((image, index) => (
              <div key={index} className="min-w-full snap-center">
                <img 
                  src={image} 
                  alt={`${product.name} - صورة ${index + 1}`}
                  className="w-full h-72 object-cover"
                />
              </div>
            ))}
          </div>
          {/* Image indicators */}
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex justify-center gap-1">
              {product.images.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`}
                ></div>
              ))}
            </div>
          </div>
          {/* Discount badge if applicable */}
          {product.discountPrice && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              خصم {Math.round(100 - (product.discountPrice / product.price) * 100)}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-4">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold mb-1">{product.name}</h1>
                <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
              </div>
              <div className="text-left">
                {product.discountPrice ? (
                  <>
                    <div className="font-bold text-xl">{product.discountPrice} ريال</div>
                    <div className="text-gray-500 line-through text-sm">{product.price} ريال</div>
                  </>
                ) : (
                  <div className="font-bold text-xl">{product.price} ريال</div>
                )}
              </div>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex">
                {renderRatingStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600 mr-2">{product.rating} ({product.reviewCount} تقييم)</span>
            </div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">الحجم:</h3>
              <div className="flex gap-2">
                {product.variants.map((variant, index) => (
                  <Button 
                    key={index} 
                    variant={index === 1 ? "default" : "outline"}
                    className={index === 1 ? "bg-brand-500" : ""}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Product Description */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">الوصف:</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">الكمية:</h3>
            <div className="flex items-center border rounded-md w-min">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-2 border-l"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 min-w-[40px] text-center">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-2 border-r"
                disabled={quantity >= 10}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="mb-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="details">التفاصيل</TabsTrigger>
              <TabsTrigger value="ingredients">المكونات</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <div dangerouslySetInnerHTML={{ __html: product.details }} />
            </TabsContent>
            <TabsContent value="ingredients" className="pt-4">
              <div dangerouslySetInnerHTML={{ __html: product.ingredients }} />
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{review.user}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex my-1">
                      {renderRatingStars(review.rating)}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">عرض المزيد من التقييمات</Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Similar Products Preview */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">منتجات مشابهة قد تعجبك:</h3>
            <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
              {[1, 2, 3, 4].map((item) => (
                <Link
                  key={item}
                  to={`/personal-care/product/${product.id + item}`}
                  className="min-w-[150px] border rounded-lg overflow-hidden bg-white flex-shrink-0"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${1590000000000 + item * 11111}?q=80&w=150&auto=format&fit=crop`}
                    alt={`منتج مشابه ${item}`}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <h4 className="font-medium text-sm">منتج مشابه {item}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-bold">{120 + (item * 20)} ريال</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-xs mr-1">{(4 + (item % 10) / 10).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
          <Button 
            onClick={addToCart}
            className="w-full py-6 bg-brand-500 text-white text-lg"
            disabled={!product.inStock}
          >
            {product.inStock ? 'أضف إلى السلة' : 'غير متوفر حالياً'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalCareProduct;
