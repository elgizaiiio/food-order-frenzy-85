
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PharmacyCategory, PharmacyProduct } from '@/types/pharmacy';

// Function to fetch pharmacy categories
const fetchPharmacyCategories = async (): Promise<PharmacyCategory[]> => {
  // For now, return mock categories until we create real categories in the database
  return [
    { id: 'ear-drops', name: 'قطرات الأذن', icon: 'ear' },
    { id: 'allergy', name: 'مضادات الحساسية', icon: 'allergy' },
    { id: 'mental', name: 'أدوية نفسية', icon: 'mental' },
    { id: 'skin', name: 'الجلدية', icon: 'skin' },
    { id: 'cold', name: 'البرد والإنفلونزا', icon: 'cold' },
    { id: 'immunity', name: 'الجهاز المناعي', icon: 'immunity' },
    { id: 'vaccines', name: 'اللقاحات', icon: 'vaccines' },
    { id: 'womens', name: 'صحة المرأة', icon: 'women' },
    { id: 'diabetes', name: 'السكري', icon: 'diabetes' },
    { id: 'painkillers', name: 'المسكنات', icon: 'painkillers' }
  ];
};

// Function to fetch pharmacy products by category
const fetchPharmacyCategoryProducts = async (categoryId: string): Promise<PharmacyProduct[]> => {
  const { data, error } = await supabase
    .from('pharmacy_products')
    .select('*')
    .eq('category', categoryId);
    
  if (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
  
  return data || [];
};

// Function to fetch recommended products
const fetchRecommendedProducts = async (): Promise<PharmacyProduct[]> => {
  const { data, error } = await supabase
    .from('pharmacy_products')
    .select('*')
    .limit(6);
    
  if (error) {
    console.error('Error fetching recommended products:', error);
    throw error;
  }
  
  return data || [];
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
    id: number;
    quantity: number;
  }>;
  addressId: string;
  paymentMethod: string;
  phone: string;
}

// Function to submit a pharmacy order
export async function submitPharmacyOrder(order: PharmacyOrder): Promise<OrderConfirmation> {
  // This will be implemented with Supabase when we set up the orders table
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate success (95% success rate)
  if (Math.random() > 0.05) {
    return {
      success: true,
      orderId: `ORD-${Date.now().toString().substring(6)}`,
      estimatedDelivery: '30-45 دقيقة',
      trackingUrl: '/pharmacy/tracking'
    };
  } else {
    return {
      success: false,
      message: 'حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى.',
    };
  }
}
