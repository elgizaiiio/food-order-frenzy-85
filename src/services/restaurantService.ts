
import { supabase } from "@/integrations/supabase/client";

export interface Restaurant {
  id: string;
  name: string;
  logo_url: string;
  description?: string;
  delivery_fee: number;
  rating: number;
  delivery_time?: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image_url?: string;
}

/**
 * Fetch all restaurants
 */
export async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*');
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}

/**
 * Fetch restaurant by ID
 */
export async function fetchRestaurantById(id: string): Promise<Restaurant> {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch restaurant menu
 */
export async function fetchRestaurantMenu(restaurantId: string): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from('restaurant_menu')
      .select('*')
      .eq('restaurant_id', restaurantId);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching menu for restaurant ID ${restaurantId}:`, error);
    throw error;
  }
}

/**
 * Fetch restaurant menu items by category
 */
export async function fetchMenuItemsByCategory(
  restaurantId: string, 
  category: string
): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from('restaurant_menu')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('category', category);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching menu items for category ${category}:`, error);
    throw error;
  }
}
