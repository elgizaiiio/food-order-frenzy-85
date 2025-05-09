
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PharmacyProduct } from '@/types/pharmacy';

// Function to fetch pharmacy categories
const fetchPharmacyCategories = async () => {
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
};

// Function to fetch pharmacy products by category
const fetchPharmacyCategoryProducts = async (categoryId: string) => {
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
};

// Function to fetch recommended products
const fetchRecommendedProducts = async () => {
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
};

// Use this hook to get pharmacy categories
export function usePharmacyCategories() {
  return useQuery({
    queryKey: ['pharmacy', 'categories'],
    queryFn: fetchPharmacyCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Use this hook to get products for a specific category
export function usePharmacyCategoryProducts(categoryId: string) {
  return useQuery({
    queryKey: ['pharmacy', 'category', categoryId],
    queryFn: () => fetchPharmacyCategoryProducts(categoryId),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Use this hook to get recommended products
export function useRecommendedProducts() {
  return useQuery({
    queryKey: ['pharmacy', 'recommended'],
    queryFn: fetchRecommendedProducts,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
}

// Order confirmation interface
export interface OrderConfirmation {
  success: boolean;
  orderId?: string;
  message?: string;
  estimatedDelivery?: string;
  trackingUrl?: string;
}

// Pharmacy order interface
export interface PharmacyOrder {
  items: Array<{
    id: string;
    quantity: number;
  }>;
  addressId: string;
  paymentMethod: string;
  phone: string;
}

// Function to submit a pharmacy order
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
