
import { supabase } from '@/integrations/supabase/client';

export interface Restaurant {
  id: string;
  name: string;
  logo_url: string;
  description?: string;
  delivery_fee?: number;
  delivery_time?: string;
  rating?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category: string;
  restaurant_id: string;
}

// استرجاع قائمة المطاعم
export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('rating', { ascending: false });
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('خطأ في جلب المطاعم:', error);
    throw error;
  }
}

// استرجاع تفاصيل مطعم معين
export async function fetchRestaurantDetails(restaurantId: string): Promise<Restaurant | null> {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`خطأ في جلب تفاصيل المطعم ${restaurantId}:`, error);
    throw error;
  }
}

// استرجاع قائمة طعام لمطعم معين
export async function fetchRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from('restaurant_menu')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('category');
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`خطأ في جلب قائمة الطعام للمطعم ${restaurantId}:`, error);
    throw error;
  }
}

// البحث عن مطاعم
export async function searchRestaurants(query: string): Promise<Restaurant[]> {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .ilike('name', `%${query}%`);
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('خطأ في البحث عن المطاعم:', error);
    throw error;
  }
}
