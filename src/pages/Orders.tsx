
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Star, Clock, ShoppingBag, Repeat, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { fetchUserOrders, rateOrder, reorder, Order } from '@/api/orders';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>("all");

  // استعلام لجلب طلبات المستخدم
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['userOrders'],
    queryFn: fetchUserOrders
  });

  // استخدام useMutation لتقييم طلب
  const rateMutation = useMutation({
    mutationFn: ({ orderId, rating }: { orderId: string, rating: number }) => 
      rateOrder(orderId, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
      toast.success('شكرًا لتقييمك!');
    },
    onError: () => {
      toast.error('حدث خطأ أثناء إرسال التقييم');
    }
  });

  // استخدام useMutation لإعادة طلب
  const reorderMutation = useMutation({
    mutationFn: (orderId: string) => reorder(orderId),
    onSuccess: (data) => {
      if (data.success && data.cartUrl) {
        toast.success('تم إضافة العناصر إلى السلة');
        navigate(data.cartUrl);
      }
    },
    onError: () => {
      toast.error('حدث خطأ أثناء إعادة الطلب');
    }
  });

  // تصفية الطلبات حسب التبويب النشط
  const filteredOrders = React.useMemo(() => {
    if (!orders) return [];
    if (activeTab === "all") return orders;
    
    if (activeTab === "active") {
      return orders.filter(order => 
        order.status === 'قيد التجهيز' || order.status === 'جاري التوصيل'
      );
    }
    
    if (activeTab === "completed") {
      return orders.filter(order => order.status === 'تم التوصيل');
    }
    
    return orders;
  }, [orders, activeTab]);

  // إنشاء مؤشر للتحميل
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
        <div className="flex items-center mb-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="ml-3 flex-1">
            <Skeleton className="h-5 w-36 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex justify-between">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    ));
  };

  const handleRate = (orderId: string, rating: number) => {
    rateMutation.mutate({ orderId, rating });
  };

  const handleReorder = (orderId: string) => {
    reorderMutation.mutate(orderId);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'تم التوصيل':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'جاري التوصيل':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'قيد التجهيز':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'تم الإلغاء':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // عنصر تقييم النجوم
  const StarRating = ({ orderId, initialRating }: { orderId: string; initialRating?: number }) => {
    const [rating, setRating] = useState<number>(initialRating || 0);
    const [hover, setHover] = useState<number>(0);
    const [hasRated, setHasRated] = useState<boolean>(!!initialRating);
    
    const handleRatingClick = (value: number) => {
      if (hasRated) return;
      setRating(value);
      setHasRated(true);
      handleRate(orderId, value);
    };
    
    return (
      <div className="flex items-center">
        <p className="text-sm text-gray-500 ml-2">{hasRated ? 'تقييمك:' : 'قيّم:'}</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`${
                star <= (hover || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              } focus:outline-none ${!hasRated ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => !hasRated && setHover(star)}
              onMouseLeave={() => !hasRated && setHover(0)}
              disabled={hasRated}
            >
              <Star
                className={`w-5 h-5 ${star <= (hover || rating) ? 'fill-yellow-400' : ''}`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // رسالة الخطأ
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">تعذر تحميل الطلبات</h2>
        <p className="text-gray-500 text-center mb-6">حدث خطأ أثناء تحميل طلباتك. يرجى المحاولة مرة أخرى لاحقًا.</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['userOrders'] })}>
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  // قائمة فارغة
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ShoppingBag className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-bold mb-2">لا توجد طلبات</h2>
      <p className="text-gray-500 text-center mb-6">
        لم تقم بطلب أي وجبات بعد.
        <br />اكتشف افضل المطاعم وابدأ بالطلب!
      </p>
      <Link to="/restaurants">
        <Button>تصفح المطاعم</Button>
      </Link>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="text-gray-700">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">طلباتي</h1>
            <div className="w-6"></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="p-4">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 mb-2">
              <TabsTrigger value="all" className="data-[state=active]:bg-brand-100 data-[state=active]:text-brand-700">الكل</TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-brand-100 data-[state=active]:text-brand-700">نشط</TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-brand-100 data-[state=active]:text-brand-700">مكتمل</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-2">
              {isLoading ? (
                renderSkeletons()
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map(order => renderOrderCard(order))
              ) : (
                renderEmptyState()
              )}
            </TabsContent>

            <TabsContent value="active" className="mt-2">
              {isLoading ? (
                renderSkeletons()
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map(order => renderOrderCard(order))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">لا توجد طلبات نشطة</h2>
                  <p className="text-gray-500 text-center mb-6">
                    ليس لديك أي طلبات قيد التجهيز أو التوصيل حاليًا
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-2">
              {isLoading ? (
                renderSkeletons()
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map(order => renderOrderCard(order))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">لا توجد طلبات مكتملة</h2>
                  <p className="text-gray-500 text-center mb-6">
                    لم تقم بإتمام أي طلبات بعد
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );

  function renderOrderCard(order: Order) {
    return (
      <div 
        key={order.id}
        className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm border border-gray-100"
      >
        {/* Restaurant info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center">
            <img 
              src={order.restaurantLogo} 
              alt={order.restaurantName}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
            <div className="mr-3 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{order.restaurantName}</h3>
                <Badge className={`font-medium border ${getStatusColor(order.status)}`}>
                  {order.status}
                </Badge>
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500">{order.date}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{order.id}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order details */}
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <div className="space-y-1">
            {order.items.slice(0, 2).map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="text-sm">
                  {item.quantity} × {item.name}
                </span>
                <span className="text-sm font-medium">{item.price} ج.م</span>
              </div>
            ))}
            
            {order.items.length > 2 && (
              <div className="text-sm text-gray-500">
                + {order.items.length - 2} عناصر أخرى
              </div>
            )}
            
            <div className="flex justify-between pt-2 mt-2 border-t border-dashed border-gray-200">
              <span className="font-bold">الإجمالي</span>
              <span className="font-bold">{order.total} ج.م</span>
            </div>
          </div>
        </div>
        
        {/* Address */}
        <div className="p-4 flex items-center text-sm text-gray-600 border-b border-gray-100">
          <MapPin className="w-4 h-4 ml-2 text-gray-400 flex-shrink-0" />
          <span className="line-clamp-1">{order.address}</span>
        </div>
        
        {/* Actions */}
        <div className="p-4 flex flex-wrap gap-3 justify-between items-center">
          {/* عرض التقييم إذا تم التوصيل */}
          {order.status === 'تم التوصيل' && (
            <StarRating orderId={order.id} initialRating={order.rating} />
          )}
          
          {/* عرض زمن التوصيل المقدر إذا كان الطلب نشطًا */}
          {(order.status === 'جاري التوصيل' || order.status === 'قيد التجهيز') && order.estimatedDelivery && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 ml-1 text-brand-500" />
              <span className="text-sm">{order.estimatedDelivery}</span>
            </div>
          )}
          
          <div className="flex gap-2">
            {/* تتبع الطلب إذا كان قيد التوصيل */}
            {order.status === 'جاري التوصيل' && order.trackingUrl && (
              <Link to={order.trackingUrl}>
                <Button variant="outline" size="sm">
                  تتبع الطلب
                </Button>
              </Link>
            )}
            
            {/* طلب مرة أخرى */}
            {(order.status === 'تم التوصيل' || order.status === 'تم الإلغاء') && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => handleReorder(order.id)}
                disabled={reorderMutation.isPending}
                className="bg-brand-500 hover:bg-brand-600"
              >
                <Repeat className="w-4 h-4 ml-1" />
                طلب مرة أخرى
              </Button>
            )}
            
            {/* عرض التفاصيل */}
            <Link to={`/orders/${order.id}`}>
              <Button variant="outline" size="sm">
                التفاصيل <ChevronRight className="w-4 h-4 mr-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Orders;
