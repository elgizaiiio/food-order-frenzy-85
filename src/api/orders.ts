
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
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    // Fetch orders from Supabase
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        user_addresses!left(full_address)
      `)
      .order('created_at', { ascending: false })
      .eq('user_id', user.id);
    
    if (ordersError) throw ordersError;
    if (!ordersData) return [];
    
    // Format the orders to match the expected Order interface
    const formattedOrders: Order[] = await Promise.all(ordersData.map(async (order) => {
      // Get restaurant info if it's a restaurant order
      let restaurantName = "الدكان";
      let restaurantLogo = "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=200&h=200";
      
      if (order.order_type === 'restaurant' && order.items) {
        // Safely extract items and check if they're in the expected format
        const orderItems = Array.isArray(order.items) ? order.items : [order.items];
        
        // Safely access the restaurant ID from the first item
        if (orderItems.length > 0 && typeof orderItems[0] === 'object' && orderItems[0] !== null) {
          const firstItem = orderItems[0] as Record<string, any>;
          
          if (firstItem.restaurant_id) {
            const { data: restaurantData } = await supabase
              .from('restaurants')
              .select('name, logo_url')
              .eq('id', firstItem.restaurant_id)
              .single();
              
            if (restaurantData) {
              restaurantName = restaurantData.name;
              restaurantLogo = restaurantData.logo_url || restaurantLogo;
            }
          }
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
      
      // Format order items - safely handle potential JSON structure
      const itemsArray = typeof order.items === 'object' && Array.isArray(order.items) 
        ? order.items 
        : typeof order.items === 'string' 
          ? JSON.parse(order.items) 
          : [];
      
      const items: OrderItem[] = itemsArray.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        options: item.options
      }));
      
      // Get payment method
      let paymentMethod = 'كاش';
      
      // Fetch payment method details separately to avoid the join error
      if (order.payment_method_id) {
        const { data: paymentMethodData } = await supabase
          .from('user_payment_methods')
          .select('type, last4')
          .eq('id', order.payment_method_id)
          .single();
          
        if (paymentMethodData) {
          paymentMethod = paymentMethodData.type === 'card' 
            ? `بطاقة ****${paymentMethodData.last4}` 
            : paymentMethodData.type || 'كاش';
        }
      }
      
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
        paymentMethod,
        estimatedDelivery: status === 'جاري التوصيل' ? '١٥ دقيقة' : undefined,
        trackingUrl: status === 'جاري التوصيل' || status === 'قيد التجهيز' ? '/tracking' : undefined
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
    // Use a separate update object that matches the expected schema
    const updateData = {
      status: 'completed' // We can update the status when rating
    };
    
    // Store the rating in a separate call or use a custom endpoint
    // For now, we'll log it but not store it since the schema doesn't support it
    console.log(`Rating order ${orderId} with ${rating} stars`);
    
    const { error } = await supabase
      .from('orders')
      .update(updateData)
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
    
    if (orderError || !order) throw orderError;
    
    // Store the items in session storage for the cart to pick up
    sessionStorage.setItem('reorderItems', JSON.stringify(order.items));
    
    // Return the appropriate cart URL based on order type
    let cartUrl = '/cart';
    if (order.order_type === 'market') {
      cartUrl = '/market/cart';
    } else if (order.order_type === 'pharmacy') {
      cartUrl = '/pharmacy/cart';
    } else if (order.order_type === 'personal_care') {
      cartUrl = '/personal-care/cart';
    } else if (order.order_type === 'gym') {
      cartUrl = '/gym/tracking';
    }
    
    return { success: true, cartUrl };
  } catch (error) {
    console.error('Error reordering:', error);
    return { success: false };
  }
}
