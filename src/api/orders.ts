
// واجهة طلب المستخدم
export interface Order {
  id: string;
  restaurantName: string;
  restaurantLogo: string;
  status: 'قيد التجهيز' | 'جاري التوصيل' | 'تم التوصيل' | 'تم الإلغاء';
  date: string;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  address: string;
  paymentMethod: string;
  estimatedDelivery?: string;
  rating?: number;
  trackingUrl?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  options?: string[];
}

// محاكاة طلب API لاسترداد الطلبات
export async function fetchUserOrders(): Promise<Order[]> {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const orders: Order[] = [
    {
      id: 'ORD-457812',
      restaurantName: 'ماكدونالدز',
      restaurantLogo: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=200&h=200',
      status: 'تم التوصيل',
      date: '٢٦ أبريل، ٢٠٢٥',
      items: [
        { id: 1, name: 'بيج ماك', quantity: 2, price: 65 },
        { id: 2, name: 'بطاطس كبير', quantity: 1, price: 25 },
        { id: 3, name: 'كوكا كولا', quantity: 2, price: 15 },
      ],
      total: 185,
      deliveryFee: 15,
      address: 'شارع التحرير، وسط البلد، القاهرة',
      paymentMethod: 'كاش',
      rating: 4
    },
    {
      id: 'ORD-452391',
      restaurantName: 'برجر كينج',
      restaurantLogo: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80&w=200&h=200',
      status: 'جاري التوصيل',
      date: '٢ مايو، ٢٠٢٥',
      items: [
        { id: 1, name: 'واپر', quantity: 1, price: 90 },
        { id: 2, name: 'اونيون رينجز', quantity: 1, price: 35 },
      ],
      total: 140,
      deliveryFee: 15,
      address: 'شارع مصطفى النحاس، مدينة نصر، القاهرة',
      paymentMethod: 'فودافون كاش',
      estimatedDelivery: '١٥ دقيقة',
      trackingUrl: '/tracking'
    },
    {
      id: 'ORD-448726',
      restaurantName: 'بيتزا هت',
      restaurantLogo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200&h=200',
      status: 'قيد التجهيز',
      date: '٢ مايو، ٢٠٢٥',
      items: [
        { id: 1, name: 'بيتزا سوبريم كبيرة', quantity: 1, price: 180 },
        { id: 2, name: 'كوكا كولا عائلي', quantity: 1, price: 30 },
        { id: 3, name: 'خبز بالثوم', quantity: 2, price: 45 },
      ],
      total: 300,
      deliveryFee: 0,
      address: 'شارع ٩، المعادي، القاهرة',
      paymentMethod: 'كاش',
      estimatedDelivery: '٤٥ دقيقة'
    },
    {
      id: 'ORD-446512',
      restaurantName: 'كنتاكي',
      restaurantLogo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=200&h=200',
      status: 'تم الإلغاء',
      date: '١ مايو، ٢٠٢٥',
      items: [
        { id: 1, name: 'وجبة دجاج عائلية', quantity: 1, price: 220 },
      ],
      total: 235,
      deliveryFee: 15,
      address: 'شارع مكرم عبيد، مدينة نصر، القاهرة',
      paymentMethod: 'كاش',
    },
    {
      id: 'ORD-442198',
      restaurantName: 'بابا جونز',
      restaurantLogo: 'https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&q=80&w=200&h=200',
      status: 'تم التوصيل',
      date: '٣٠ أبريل، ٢٠٢٥',
      items: [
        { id: 1, name: 'بيتزا ببروني متوسطة', quantity: 2, price: 140 },
        { id: 2, name: 'كوكا كولا', quantity: 2, price: 15 },
      ],
      total: 310,
      deliveryFee: 15,
      address: 'شارع جامعة الدول العربية، المهندسين، الجيزة',
      paymentMethod: 'فوري',
      rating: 5
    },
  ];

  return orders;
}

// محاكاة API لتقييم طلب
export async function rateOrder(orderId: string, rating: number): Promise<{ success: boolean }> {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // محاكاة نجاح 95% من الوقت
  const success = Math.random() < 0.95;
  
  return { success };
}

// محاكاة API لإعادة طلب
export async function reorder(orderId: string): Promise<{ success: boolean, cartUrl?: string }> {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // محاكاة نجاح 95% من الوقت
  const success = Math.random() < 0.95;
  
  return success 
    ? { success: true, cartUrl: '/cart' }
    : { success: false };
}
