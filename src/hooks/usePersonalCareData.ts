
import { useQuery } from '@tanstack/react-query';
import { 
  fetchPersonalCareProducts, 
  fetchProductsByCategory, 
  fetchProductsByGender,
  fetchProductById,
  fetchProductCategories
} from '@/services/personalCareService';

export function usePersonalCareProducts() {
  return useQuery({
    queryKey: ['personal-care-products'],
    queryFn: fetchPersonalCareProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['personal-care-category', category],
    queryFn: () => fetchProductsByCategory(category),
    staleTime: 5 * 60 * 1000,
    enabled: !!category,
  });
}

// Alias for useProductsByCategory to match component import
export function usePersonalCareProductsByCategory(category: string) {
  return useProductsByCategory(category);
}

export function useProductsByGender(gender: string) {
  return useQuery({
    queryKey: ['personal-care-gender', gender],
    queryFn: () => fetchProductsByGender(gender),
    staleTime: 5 * 60 * 1000,
    enabled: !!gender,
  });
}

export function useProductDetails(id: string) {
  return useQuery({
    queryKey: ['personal-care-product', id],
    queryFn: () => fetchProductById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

// Alias for useProductDetails to match component import
export function usePersonalCareProduct(id: string) {
  return useProductDetails(id);
}

// New function for related products 
export function usePersonalCareRelatedProducts(productId: string) {
  return useQuery({
    queryKey: ['personal-care-related', productId],
    queryFn: () => {
      // This would typically fetch related products from a service
      // For now, we'll reuse the fetchPersonalCareProducts function and filter out the current product
      return fetchPersonalCareProducts().then(products => 
        products.filter(product => product.id !== productId).slice(0, 5)
      );
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!productId,
  });
}

export function useProductCategories() {
  return useQuery({
    queryKey: ['personal-care-categories'],
    queryFn: fetchProductCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
