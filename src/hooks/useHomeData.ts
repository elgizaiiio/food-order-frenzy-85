
import { useQuery } from '@tanstack/react-query';
import { 
  fetchHomeCategories, 
  fetchHomeOffers, 
  fetchPopularPlaces,
  fetchHomePromos
} from '@/services/homeService';

/**
 * استخدام فئات الصفحة الرئيسية
 * @returns بيانات الفئات وحالة التحميل
 */
export const useHomeCategories = () => {
  return useQuery({
    queryKey: ['homeCategories'],
    queryFn: fetchHomeCategories,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    retry: 2
  });
};

/**
 * استخدام عروض الصفحة الرئيسية
 * @returns بيانات العروض وحالة التحميل
 */
export const useHomeOffers = () => {
  return useQuery({
    queryKey: ['homeOffers'],
    queryFn: fetchHomeOffers,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    retry: 1
  });
};

/**
 * استخدام الأماكن الشائعة
 * @returns بيانات الأماكن الشائعة وحالة التحميل
 */
export const usePopularPlaces = () => {
  return useQuery({
    queryKey: ['popularPlaces'],
    queryFn: fetchPopularPlaces,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    retry: 1
  });
};

/**
 * استخدام العروض الترويجية
 * @returns بيانات العروض الترويجية وحالة التحميل
 */
export const useHomePromos = () => {
  return useQuery({
    queryKey: ['homePromos'],
    queryFn: fetchHomePromos,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    retry: 1
  });
};
