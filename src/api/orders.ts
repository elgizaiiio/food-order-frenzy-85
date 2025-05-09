
import { supabase } from '@/integrations/supabase/client';

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

// استرداد الطلبات من API
export async function fetchUserOrders(): Promise<Order[]> {
  try {
    // Fetch orders from Supabase
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        user_addresses (full_address),
        user_payment_methods (type, last4)
      `)
      .order('created_at', { ascending: false });
    
    if (ordersError) throw ordersError;
    
    // Format the orders to match the expected Order interface
    const formattedOrders: Order[] = await Promise.all(ordersData.map(async (order) => {
      // Get restaurant info if it's a restaurant order
      let restaurantName = "الدكان";
      let restaurantLogo = "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=200&h=200";
      
      if (order.order_type === 'restaurant' && order.items && order.items[0]?.restaurant_id) {
        const { data: restaurantData } = await supabase
          .from('restaurants')
          .select('name, logo_url')
          .eq('id', order.items[0].restaurant_id)
          .single();
          
        if (restaurantData) {
          restaurantName = restaurantData.name;
          restaurantLogo = restaurantData.logo_url;
        }
      }
      
      // Format the date
      const date = new Date(order.created_at);
      const formattedDate = date.toLocaleDateString('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Format status
      let status: Order['status'] = 'قيد التجهيز';
      switch(order.status) {
        case 'pending': status = 'قيد التجهيز'; break;
        case 'delivery': status = 'جاري التوصيل'; break;
        case 'completed': status = 'تم التوصيل'; break;
        case 'cancelled': status = 'تم الإلغاء'; break;
      }
      
      // Format order items
      const items: OrderItem[] = order.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        options: item.options
      }));
      
      return {
        id: order.id,
        restaurantName,
        restaurantLogo,
        status,
        date: formattedDate,
        items,
        total: order.total_amount,
        deliveryFee: 15, // Hardcoded for now
        address: order.user_addresses?.full_address || 'عنوان غير معروف',
        paymentMethod: order.user_payment_methods?.type || 'كاش',
        estimatedDelivery: status === 'جاري التوصيل' ? '١٥ دقيقة' : undefined,
        trackingUrl: status === 'جاري التوصيل' || status === 'قيد التجهيز' ? '/tracking' : undefined,
        rating: order.rating
      };
    }));
    
    return formattedOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

// تقييم طلب
export async function rateOrder(orderId: string, rating: number): Promise<{ success: boolean }> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ rating })
      .eq('id', orderId);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error rating order:', error);
    return { success: false };
  }
}

// إعادة طلب
export async function reorder(orderId: string): Promise<{ success: boolean, cartUrl?: string }> {
  try {
    // Get the original order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('items, order_type')
      .eq('id', orderId)
      .single();
    
    if (orderError) throw orderError;
    
    // Store the items in session storage for the cart to pick up
    sessionStorage.setItem('reorderItems', JSON.stringify(order.items));
    
    // Return the appropriate cart URL based on order type
    let cartUrl = '/cart';
    if (order.order_type === 'market') {
      cartUrl = '/market/cart';
    } else if (order.order_type === 'pharmacy') {
      cartUrl = '/pharmacy/cart';
    }
    
    return { success: true, cartUrl };
  } catch (error) {
    console.error('Error reordering:', error);
    return { success: false };
  }
}
