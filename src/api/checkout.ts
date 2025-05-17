
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface OrderDetails {
  addressId: string;
  phone: string;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
  orderType: 'restaurant' | 'market' | 'pharmacy' | 'personal_care' | 'gym';
  restaurantId?: string;
  notes?: string;
}

export interface OrderItem {
  id: number | string;
  quantity: number;
  price?: number;
  options?: Record<string, any>[];
}

export interface CheckoutResponse {
  success: boolean;
  message?: string;
  orderId?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
}

/**
 * تقديم طلب جديد
 * @param orderDetails تفاصيل الطلب
 * @returns استجابة تأكيد الطلب
 */
export const submitOrder = async (orderDetails: OrderDetails): Promise<CheckoutResponse> => {
  try {
    // التحقق من تسجيل الدخول
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        success: false,
        message: 'يجب تسجيل الدخول لإتمام الطلب'
      };
    }
    
    // إنشاء كائن الطلب الجديد
    const order = {
      user_id: user.id,
      status: 'pending',
      items: JSON.stringify(orderDetails.items),
      total_amount: orderDetails.total,
      delivery_address_id: orderDetails.addressId,
      payment_method_id: orderDetails.paymentMethod,
      order_type: orderDetails.orderType,
      restaurant_id: orderDetails.restaurantId,
      notes: orderDetails.notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // إدخال الطلب في قاعدة البيانات
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select('id')
      .single();
      
    if (error) {
      console.error('خطأ في إنشاء الطلب:', error);
      return {
        success: false,
        message: 'حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.'
      };
    }
    
    // الحصول على وقت التوصيل المقدر
    const estimatedTime = await getDeliveryEstimate(orderDetails.orderType);
    
    return {
      success: true,
      message: 'تم تقديم طلبك بنجاح',
      orderId: data.id,
      trackingUrl: `/tracking/${data.id}`,
      estimatedDelivery: estimatedTime
    };
  } catch (error) {
    console.error('خطأ غير متوقع أثناء تقديم الطلب:', error);
    return {
      success: false,
      message: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
    };
  }
};

/**
 * الحصول على تقدير وقت التوصيل بناءً على نوع الطلب
 */
export const getDeliveryEstimate = async (orderType: string): Promise<string> => {
  // يمكن استبدال هذا بمنطق حقيقي للتقدير بناءً على الموقع والمسافة
  const estimates = {
    restaurant: '30 - 45 دقيقة',
    market: '45 - 60 دقيقة',
    pharmacy: '20 - 30 دقيقة',
    personal_care: '45 - 60 دقيقة',
    gym: '30 - 45 دقيقة'
  };
  
  return estimates[orderType as keyof typeof estimates] || '30 - 45 دقيقة';
};

/**
 * معالجة الدفع (يمكن تطويرها لتكامل مع بوابات الدفع)
 */
export const processPayment = async (paymentMethodId: string, amount: number): Promise<boolean> => {
  try {
    // هنا يمكن إضافة تكامل مع بوابة دفع حقيقية
    // حالياً، نفترض أن جميع المدفوعات ناجحة
    return true;
  } catch (error) {
    console.error('خطأ في معالجة الدفع:', error);
    return false;
  }
};
