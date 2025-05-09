
import { supabase } from '@/integrations/supabase/client';
import { PharmacyProduct, PharmacyCategory } from '@/types/pharmacy';

// جلب الفئات من API
export async function fetchPharmacyCategories(): Promise<PharmacyCategory[]> {
  const { data, error } = await supabase
    .from('pharmacy_categories')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) {
    console.error('Error fetching pharmacy categories:', error);
    throw error;
  }
  
  return data?.map(item => ({
    id: item.id,
    name: item.name,
    icon: item.icon || 'pill'
  })) || [];
}

// جلب المنتجات حسب الفئة من API
export async function fetchPharmacyCategoryProducts(categoryId: string): Promise<PharmacyProduct[]> {
  const { data, error } = await supabase
    .from('pharmacy_products')
    .select('*')
    .eq('category', categoryId);
    
  if (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
  
  // Transform the data to match our UI expectations
  return data?.map(item => ({
    ...item,
    inStock: item.stock > 0,
    image: item.image_url
  })) || [];
}

// جلب المنتجات الموصى بها
export async function fetchRecommendedProducts(): Promise<PharmacyProduct[]> {
  const { data, error } = await supabase
    .from('pharmacy_products')
    .select('*')
    .eq('is_recommended', true)
    .limit(6);
    
  if (error) {
    console.error('Error fetching recommended products:', error);
    throw error;
  }
  
  // Transform the data to match our UI expectations
  return data?.map(item => ({
    ...item,
    inStock: item.stock > 0,
    image: item.image_url
  })) || [];
}

// واجهة تفاصيل الطلب
export interface PharmacyOrder {
  items: Array<{
    id: string;
    quantity: number;
  }>;
  addressId: string;
  paymentMethod: string;
  phone: string;
}

// واجهة استجابة تأكيد الطلب
export interface OrderConfirmation {
  success: boolean;
  orderId?: string;
  message?: string;
  estimatedDelivery?: string;
  trackingUrl?: string;
}

// إرسال طلب إلى API
export async function submitPharmacyOrder(order: PharmacyOrder): Promise<OrderConfirmation> {
  try {
    // Create a new order in the orders table
    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_type: 'pharmacy',
        items: order.items,
        delivery_address_id: order.addressId,
        payment_method_id: order.paymentMethod,
        total_amount: 0, // We'll calculate this on the server side
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      success: true,
      orderId: data.id,
      estimatedDelivery: '30-45 دقيقة',
      trackingUrl: '/pharmacy/tracking'
    };
  } catch (error) {
    console.error('Error submitting order:', error);
    return {
      success: false,
      message: 'حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى.'
    };
  }
}
