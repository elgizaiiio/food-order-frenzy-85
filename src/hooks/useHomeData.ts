
import { useQuery } from "@tanstack/react-query";
import { fetchHomeCategories, fetchHomeOffers, fetchPopularPlaces, fetchHomePromos } from "@/services/homeService";

// استخدام react-query لجلب بيانات الصفحة الرئيسية
export const useHomeCategories = () => {
  return useQuery({
    queryKey: ['homeCategories'],
    queryFn: fetchHomeCategories,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    refetchOnWindowFocus: false
  });
};

export const useHomeOffers = () => {
  return useQuery({
    queryKey: ['homeOffers'],
    queryFn: fetchHomeOffers,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    refetchOnWindowFocus: false
  });
};

export const useHomePopularPlaces = () => {
  return useQuery({
    queryKey: ['homePopularPlaces'],
    queryFn: fetchPopularPlaces,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    refetchOnWindowFocus: false
  });
};

export const useHomePromos = () => {
  return useQuery({
    queryKey: ['homePromos'],
    queryFn: fetchHomePromos,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    refetchOnWindowFocus: false
  });
};

// إضافة واجهة للتعريف بالفئات
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  link: string;
}
