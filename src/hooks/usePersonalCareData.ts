
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

export function useProductCategories() {
  return useQuery({
    queryKey: ['personal-care-categories'],
    queryFn: fetchProductCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
