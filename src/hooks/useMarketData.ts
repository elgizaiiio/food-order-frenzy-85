
import { useQuery } from '@tanstack/react-query';
import { getCategories, getOffers, getPopularProducts, getProductsByCategory } from '@/api/market';

export const useCategories = () => {
  return useQuery({
    queryKey: ['marketCategories'],
    queryFn: getCategories
  });
};

export const useOffers = () => {
  return useQuery({
    queryKey: ['marketOffers'],
    queryFn: getOffers
  });
};

export const usePopularProducts = () => {
  return useQuery({
    queryKey: ['marketPopularProducts'],
    queryFn: getPopularProducts
  });
};

export const useProductsByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ['marketProducts', categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId
  });
};
