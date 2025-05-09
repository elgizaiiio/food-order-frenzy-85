
import { supabase } from "@/integrations/supabase/client";

export interface GymItem {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  features?: string[];
  openHours?: string;
  price?: string;
}

export interface GymSubscription {
  id: string;
  user_id: string;
  gym_id: string;
  plan_name: string;
  start_date: string;
  end_date: string;
  price: number;
  status: 'active' | 'expired' | 'cancelled';
  created_at?: string;
}

/**
 * Fetch all gyms
 */
export async function fetchGyms(): Promise<GymItem[]> {
  try {
    const { data, error } = await supabase
      .from('gyms')
      .select('*');
    
    if (error) throw error;
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      image: item.image_url,
      location: item.location,
      rating: item.rating,
      features: item.features,
      openHours: item.open_hours,
      price: item.price
    })) || [];
  } catch (error) {
    console.error('Error fetching gyms:', error);
    throw error;
  }
}

/**
 * Fetch gym by ID
 */
export async function fetchGymById(id: string): Promise<GymItem> {
  try {
    const { data, error } = await supabase
      .from('gyms')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      name: data.name,
      image: data.image_url,
      location: data.location,
      rating: data.rating,
      features: data.features,
      openHours: data.open_hours,
      price: data.price
    };
  } catch (error) {
    console.error(`Error fetching gym with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch user's gym subscriptions
 */
export async function fetchUserSubscriptions(userId: string): Promise<GymSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('gym_subscriptions')
      .select('*, gyms(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching gym subscriptions:', error);
    throw error;
  }
}

/**
 * Create a new gym subscription
 */
export async function createSubscription(subscription: Omit<GymSubscription, 'id' | 'created_at'>): Promise<GymSubscription> {
  try {
    const { data, error } = await supabase
      .from('gym_subscriptions')
      .insert(subscription)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating gym subscription:', error);
    throw error;
  }
}
