
import { useQuery } from "@tanstack/react-query";
import { getHomeCategories, getHomeOffers, getHomePopularPlaces } from "@/services/homeService";

// استخدام react-query لجلب بيانات الصفحة الرئيسية
export const useHomeCategories = () => {
  return useQuery({
    queryKey: ['homeCategories'],
    queryFn: getHomeCategories,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    refetchOnWindowFocus: false
  });
};

export const useHomeOffers = () => {
  return useQuery({
    queryKey: ['homeOffers'],
    queryFn: getHomeOffers,
    staleTime: 5 * 60 * 1000, // 5 دقائق
    refetchOnWindowFocus: false
  });
};

export const useHomePopularPlaces = () => {
  return useQuery({
    queryKey: ['homePopularPlaces'],
    queryFn: getHomePopularPlaces,
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
