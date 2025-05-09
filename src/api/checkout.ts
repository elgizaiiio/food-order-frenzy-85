
import { supabase } from '@/integrations/supabase/client';

// واجهة معلومات الطلب
export interface OrderDetails {
  addressId: string;
  phone: string;
  paymentMethod: string;
  items: Array<{
    id: number | string;
    quantity: number;
  }>;
  total: number;
  orderType: 'restaurant' | 'market' | 'pharmacy' | 'personal_care';
}

// واجهة استجابة الطلب
export interface OrderResponse {
  success: boolean;
  orderId?: string;
  message?: string;
  estimatedDelivery?: string;
  trackingUrl?: string;
}

// دالة لإرسال الطلب إلى واجهة برمجة التطبيقات
export async function submitOrder(orderDetails: OrderDetails): Promise<OrderResponse> {
  try {
    // Get the authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return {
        success: false,
        message: 'يجب تسجيل الدخول لإتمام الطلب'
      };
    }
    
    // Create the order in Supabase
    const { data, error } = await supabase
      .from('orders')
      .insert({
        items: orderDetails.items,
        total_amount: orderDetails.total,
        delivery_address_id: orderDetails.addressId,
        payment_method_id: orderDetails.paymentMethod,
        order_type: orderDetails.orderType,
        status: 'pending',
        user_id: user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Determine the tracking URL based on order type
    let trackingUrl = '/tracking';
    if (orderDetails.orderType === 'market') {
      trackingUrl = '/market/tracking';
    } else if (orderDetails.orderType === 'pharmacy') {
      trackingUrl = '/pharmacy/tracking';
    } else if (orderDetails.orderType === 'personal_care') {
      trackingUrl = '/personal-care/tracking';
    }
    
    return {
      success: true,
      orderId: data.id,
      estimatedDelivery: '30-45 دقيقة',
      trackingUrl: trackingUrl
    };
  } catch (error) {
    console.error('Error submitting order:', error);
    return {
      success: false,
      message: 'حدث خطأ أثناء معالجة الطلب. الرجاء المحاولة مرة أخرى.',
    };
  }
}

// واجهة لتهيئة الدفع عبر البطاقات
export interface CardPaymentInit {
  amount: number;
  currency: string;
  customerId?: string;
}

// تهيئة معاملة الدفع ببطاقة
export async function initializeCardPayment(paymentDetails: CardPaymentInit): Promise<{
  success: boolean;
  paymentIntentId?: string;
  clientSecret?: string;
  error?: string;
}> {
  try {
    // In a real app, this would integrate with a payment gateway API
    const { data, error } = await supabase.functions.invoke('create-payment-intent', {
      body: paymentDetails
    });
    
    if (error) throw error;
    
    return {
      success: true,
      paymentIntentId: data.paymentIntentId,
      clientSecret: data.clientSecret
    };
  } catch (error) {
    console.error('Payment initialization error:', error);
    return {
      success: false,
      error: 'حدث خطأ أثناء إعداد الدفع'
    };
  }
}

// التحقق من أن منطقة التوصيل مدعومة
export async function isDeliveryAreaSupported(address: string): Promise<boolean> {
  // For now, we'll assume all areas are supported
  return true;
}

// واجهة التوقعات لتوقيت التوصيل
export interface DeliveryEstimate {
  minMinutes: number;
  maxMinutes: number;
  fee: number;
}

// الحصول على تقدير وقت التوصيل ورسومه
export async function getDeliveryEstimate(addressId: string): Promise<DeliveryEstimate> {
  try {
    const { data, error } = await supabase
      .from('user_addresses')
      .select('city')
      .eq('id', addressId)
      .single();
    
    if (error) throw error;
    
    // Base estimate on city (simplified)
    const city = data.city.toLowerCase();
    if (city.includes('القاهرة')) {
      return {
        minMinutes: 30,
        maxMinutes: 45,
        fee: 10
      };
    } else {
      return {
        minMinutes: 45,
        maxMinutes: 60,
        fee: 15
      };
    }
  } catch (error) {
    console.error('Error getting delivery estimate:', error);
    // Fallback default
    return {
      minMinutes: 30,
      maxMinutes: 45,
      fee: 10
    };
  }
}
