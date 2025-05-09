
import { useQuery } from '@tanstack/react-query';
import { PharmacyProduct } from '@/types/pharmacy';
import { 
  fetchPharmacyCategories, 
  fetchPharmacyCategoryProducts, 
  fetchRecommendedProducts,
  submitPharmacyOrder
} from '@/api/pharmacy';

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
