
import { useQuery } from '@tanstack/react-query';
import { 
  fetchRestaurants, 
  fetchRestaurantById, 
  fetchRestaurantMenu, 
  fetchMenuItemsByCategory 
} from '@/services/restaurantService';

export function useRestaurants() {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useRestaurantDetails(id: string) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => fetchRestaurantById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

export function useRestaurantMenu(restaurantId: string) {
  return useQuery({
    queryKey: ['restaurant-menu', restaurantId],
    queryFn: () => fetchRestaurantMenu(restaurantId),
    staleTime: 5 * 60 * 1000,
    enabled: !!restaurantId,
  });
}

export function useMenuItemsByCategory(restaurantId: string, category: string) {
  return useQuery({
    queryKey: ['restaurant-menu-category', restaurantId, category],
    queryFn: () => fetchMenuItemsByCategory(restaurantId, category),
    staleTime: 5 * 60 * 1000,
    enabled: !!restaurantId && !!category,
  });
}
