
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchOffers, fetchPopularProducts, fetchProductsByCategory } from '@/services/marketService';

/**
 * استخدام فئات السوق
 * @returns بيانات الفئات وحالة التحميل
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['marketCategories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    retry: 2
  });
};

/**
 * استخدام عروض السوق
 * @returns بيانات العروض وحالة التحميل
 */
export const useOffers = () => {
  return useQuery({
    queryKey: ['marketOffers'],
    queryFn: fetchOffers,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    retry: 2
  });
};

/**
 * استخدام المنتجات الشائعة
 * @returns بيانات المنتجات الشائعة وحالة التحميل
 */
export const usePopularProducts = () => {
  return useQuery({
    queryKey: ['marketPopularProducts'],
    queryFn: fetchPopularProducts,
    staleTime: 3 * 60 * 1000, // 3 دقائق
    retry: 2
  });
};

/**
 * استخدام المنتجات حسب الفئة
 * @param categoryId معرّف الفئة
 * @returns بيانات المنتجات حسب الفئة وحالة التحميل
 */
export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['marketProducts', categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 2 * 60 * 1000, // 2 دقائق
    retry: 2
  });
};
