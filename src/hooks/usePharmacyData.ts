
import { useQuery } from '@tanstack/react-query';
import { 
  fetchPharmacyCategories, 
  fetchPharmacyCategoryProducts,
  fetchRecommendedProducts,
  PharmacyCategory,
  PharmacyProduct
} from '@/api/pharmacy';

// استخدام هذا الـ hook لجلب فئات المنتجات
export function usePharmacyCategories() {
  return useQuery({
    queryKey: ['pharmacy', 'categories'],
    queryFn: fetchPharmacyCategories,
    staleTime: 5 * 60 * 1000, // 5 دقائق
  });
}

// استخدام هذا الـ hook لجلب منتجات فئة محددة
export function usePharmacyCategoryProducts(categoryId: string) {
  return useQuery({
    queryKey: ['pharmacy', 'category', categoryId],
    queryFn: () => fetchPharmacyCategoryProducts(categoryId),
    staleTime: 2 * 60 * 1000, // دقيقتين
  });
}

// استخدام هذا الـ hook لجلب المنتجات الموصى بها
export function useRecommendedProducts() {
  return useQuery({
    queryKey: ['pharmacy', 'recommended'],
    queryFn: fetchRecommendedProducts,
    staleTime: 3 * 60 * 1000, // 3 دقائق
  });
}
