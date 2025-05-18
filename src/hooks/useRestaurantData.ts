
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  delivery_fee: number;
  delivery_time: string;
  rating: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  restaurant_id: string;
}

// جلب جميع المطاعم من قاعدة البيانات
export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('rating', { ascending: false });
      
    if (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Could not fetch restaurants:", error);
    throw error;
  }
};

// جلب مطعم محدد حسب المعرّف
export const fetchRestaurantById = async (id: string): Promise<Restaurant> => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error("Error fetching restaurant by ID:", error);
    throw error;
  }
  
  return data;
};

// جلب قائمة الطعام للمطعم
export const fetchRestaurantMenu = async (restaurantId: string): Promise<MenuItem[]> => {
  const { data, error } = await supabase
    .from('restaurant_menu')
    .select('*')
    .eq('restaurant_id', restaurantId);
    
  if (error) {
    console.error("Error fetching restaurant menu:", error);
    throw error;
  }
  
  return data || [];
};

// هوك لاستخدام بيانات المطاعم
export const useRestaurantData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    staleTime: 5 * 60 * 1000, // 5 دقائق
  });

  return {
    restaurants: data,
    error,
    isLoading
  };
};

// هوك للحصول على تفاصيل مطعم واحد
export const useSingleRestaurant = (id: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => {
      if (!id) throw new Error('No restaurant ID provided');
      return fetchRestaurantById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 دقائق
  });

  return {
    restaurant: data,
    error,
    isLoading
  };
};

// هوك للحصول على قائمة طعام المطعم
export const useRestaurantMenu = (restaurantId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['restaurantMenu', restaurantId],
    queryFn: () => {
      if (!restaurantId) throw new Error('No restaurant ID provided');
      return fetchRestaurantMenu(restaurantId);
    },
    enabled: !!restaurantId,
    staleTime: 5 * 60 * 1000, // 5 دقائق
  });

  return {
    menuItems: data,
    error,
    isLoading
  };
};
