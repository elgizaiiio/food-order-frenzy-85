
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, ChevronDown, ChevronUp, Star, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersonalCareCart } from '@/context/PersonalCareCartContext';
import { usePersonalCareProduct, usePersonalCareRelatedProducts } from '@/hooks/usePersonalCareData';
import { Skeleton } from '@/components/ui/skeleton';

const DetailItem = ({ title, value }: { title: string, value: string }) => (
  <div className="flex justify-between items-center py-2 px-1 border-b border-pink-100 last:border-0">
    <span className="text-sm text-gray-600">{title}</span>
    <span className="text-sm font-medium text-pink-800">{value}</span>
  </div>
);

const PersonalCareProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = usePersonalCareProduct(productId || "");
  const { data: relatedProducts, isLoading: relatedLoading } = usePersonalCareRelatedProducts(productId || "");
  const { addToCart, items, increaseQuantity } = usePersonalCareCart();
  
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const productInCart = items.find(item => item.id === productId);
  const cartQuantity = productInCart?.quantity || 0;

  const increaseQty = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        gender: product.gender,
        stock: product.stock,
        image: product.image_url || 'https://via.placeholder.com/300?text=Beauty+Product',
        image_url: product.image_url
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto pb-20">
          {/* Skeleton Header */}
          <div className="flex items-center justify-between p-4 bg-gray-100">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-6" />
          </div>
          
          {/* Skeleton Image */}
          <Skeleton className="w-full h-72" />
          
          {/* Skeleton Content */}
          <div className="p-4 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex justify-between mt-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-xs">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-8 w-8 text-pink-500" />
          </div>
          <h2 className="text-xl font-bold text-pink-800 mb-2">المنتج غير موجود</h2>
          <p className="text-gray-600 mb-4">لم نتمكن من العثور على المنتج المطلوب</p>
          <Link to="/personal-care">
            <Button className="bg-pink-600 hover:bg-pink-700 text-white">
              العودة للتسوق
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // تقييمات وهمية
  const reviews = [
    { id: 1, name: "سارة محمد", rating: 5, comment: "منتج رائع جدا وفعال، أنصح به بشدة لمن يعاني من البشرة الجافة.", date: "منذ 3 أيام" },
    { id: 2, name: "أحمد علي", rating: 4, comment: "جودة ممتازة ولكن السعر مرتفع قليلاً مقارنة بالمنتجات المماثلة.", date: "منذ أسبوع" },
    { id: 3, name: "نورا حسن", rating: 5, comment: "أفضل منتج استخدمته للعناية بالبشرة، النتائج ملحوظة من أول استخدام.", date: "منذ شهر" },
    { id: 4, name: "محمد سامي", rating: 3, comment: "منتج جيد ولكن ليس كما كنت أتوقع، يحتاج لوقت أطول لرؤية النتائج.", date: "منذ شهرين" }
  ];

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2);
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white z-10 shadow-md">
          <Link to="/personal-care" className="text-white hover:text-pink-100">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تفاصيل المنتج</h1>
          <Link to="/personal-care/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-white" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-pink-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>

        {/* صورة المنتج */}
        <div className="relative">
          <img 
            src={product.image_url || 'https://via.placeholder.com/500?text=Product+Image'} 
            alt={product.name} 
            className="w-full h-80 object-cover"
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-pink-500 rounded-full w-10 h-10 shadow-md"
          >
            <Heart className="h-5 w-5" />
          </Button>
          
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-red-500 px-4 py-2 rounded-md">نفذت الكمية</span>
            </div>
          )}
          
          {product.gender && (
            <Badge className="absolute bottom-4 right-4 bg-white/80 text-pink-800 border-0 text-sm px-3 py-1">
              {product.gender === 'female' ? 'منتج نسائي' : product.gender === 'male' ? 'منتج رجالي' : 'للجميع'}
            </Badge>
          )}
        </div>

        {/* تفاصيل المنتج */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-pink-900">{product.name}</h2>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <div className="flex items-center text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-yellow-400' : ''}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600 mr-1">({reviews.length} تقييم)</span>
            </div>
            <span className="text-xl font-bold text-pink-700">{product.price} ج.م</span>
          </div>
          
          {/* وصف المنتج */}
          <div className="mt-4">
            <div className="text-gray-700 text-sm mt-2">
              {showFullDescription ? product.description : `${product.description?.substring(0, 100)}${product.description && product.description.length > 100 ? '...' : ''}`}
            </div>
            {product.description && product.description.length > 100 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 text-pink-600 hover:text-pink-700 hover:bg-pink-50 p-0 h-auto"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? (
                  <div className="flex items-center">
                    <span>عرض أقل</span>
                    <ChevronUp className="w-4 h-4 mr-1" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>اقرأ المزيد</span>
                    <ChevronDown className="w-4 h-4 mr-1" />
                  </div>
                )}
              </Button>
            )}
          </div>
          
          {/* الكمية */}
          <div className="flex items-center justify-between mt-6 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium ml-2">الكمية:</span>
              <div className="flex items-center gap-2 bg-white rounded-full border border-pink-200 shadow-sm p-1">
                <button 
                  onClick={decreaseQty} 
                  className="w-8 h-8 flex items-center justify-center rounded-full border-0 bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-pink-900 w-6 text-center">{quantity}</span>
                <button 
                  onClick={increaseQty}
                  className="w-8 h-8 flex items-center justify-center rounded-full border-0 bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                  disabled={quantity >= (product.stock || 10)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">المتوفر: </span>
              <span className={`font-medium ${product.stock > 5 ? 'text-green-600' : 'text-orange-600'}`}>
                {product.stock} قطعة
              </span>
            </div>
          </div>
          
          {/* أزرار الإضافة للسلة والشراء */}
          <div className={`grid ${cartQuantity > 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-3 mt-2`}>
            {cartQuantity > 0 ? (
              <Link to="/personal-care/cart" className="block">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 shadow-md"
                >
                  في السلة ({cartQuantity}) • إتمام الشراء
                </Button>
              </Link>
            ) : null}
            <Button 
              onClick={handleAddToCart} 
              className={`w-full shadow-md ${cartQuantity > 0 ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
              disabled={product.stock <= 0}
            >
              {product.stock <= 0 ? 'نفذت الكمية' : cartQuantity > 0 ? 'إضافة المزيد' : 'أضف إلى السلة'}
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* التفاصيل والتقييمات */}
        <div className="px-4">
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-2 bg-pink-50">
              <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">التفاصيل</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">التقييمات</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <div className="bg-pink-50 rounded-lg p-4">
                <h3 className="font-bold text-pink-800 mb-3">مميزات المنتج</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                    <span>يعمل على ترطيب البشرة بعمق</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                    <span>مستخلص من مكونات طبيعية 100%</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                    <span>خالي من البارابين والكحول</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                    <span>مناسب لجميع أنواع البشرة</span>
                  </li>
                </ul>
                
                <h3 className="font-bold text-pink-800 mt-4 mb-3">معلومات إضافية</h3>
                <div className="bg-white rounded-lg p-3">
                  <DetailItem title="الماركة" value="بيوديرما" />
                  <DetailItem title="بلد المنشأ" value="فرنسا" />
                  <DetailItem title="حجم العبوة" value="200 مل" />
                  <DetailItem title="صلاحية المنتج" value="36 شهر" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-yellow-400' : ''}`} />
                      ))}
                    </div>
                    <span className="font-bold text-lg text-gray-700">{averageRating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500">({reviews.length} تقييم)</span>
                </div>

                {visibleReviews.map((review) => (
                  <div key={review.id} className="bg-pink-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{review.name}</h4>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mt-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}

                {reviews.length > 2 && (
                  <Button
                    variant="outline"
                    className="w-full border-pink-200 text-pink-700 hover:bg-pink-50 mt-2"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? 'عرض أقل' : `عرض جميع التقييمات (${reviews.length})`}
                  </Button>
                )}

                <div className="mt-4">
                  <Button className="bg-pink-600 hover:bg-pink-700 w-full">
                    أكتب تقييماً
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* المنتجات المشابهة */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-6 px-4">
            <h3 className="font-bold text-lg text-pink-800 mb-3 flex items-center">
              <div className="w-1 h-6 bg-pink-600 ml-2 rounded-full"></div>
              منتجات مشابهة
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id} 
                  className="flex-shrink-0 w-36 border border-pink-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                  onClick={() => {
                    if (relatedProduct.id !== productId) {
                      navigate(`/personal-care/product/${relatedProduct.id}`);
                    }
                  }}
                >
                  <div className="relative">
                    <img 
                      src={relatedProduct.image_url || 'https://via.placeholder.com/200?text=Related+Product'} 
                      alt={relatedProduct.name} 
                      className="w-full h-32 object-cover"
                    />
                    {relatedProduct.stock <= 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs bg-red-500 px-2 py-0.5 rounded">نفذ</span>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h4 className="font-medium text-sm line-clamp-1">{relatedProduct.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-pink-700">{relatedProduct.price} ج.م</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={relatedProduct.stock <= 0}
                        className="h-7 w-7 p-0 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          increaseQuantity(relatedProduct.id);
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalCareProduct;
