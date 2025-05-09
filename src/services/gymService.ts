
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

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
 * Fetch all gyms from Supabase
 */
export async function fetchGyms(): Promise<GymItem[]> {
  try {
    const { data, error } = await supabase
      .from('gyms')
      .select('*');
    
    if (error) throw error;
    
    // Transform the data to match our GymItem interface
    return data.map(gym => ({
      id: gym.id,
      name: gym.name,
      image: gym.image || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=500&h=300',
      location: gym.location || '',
      rating: parseFloat(gym.rating) || 4.5,
      features: Array.isArray(gym.features) ? (gym.features as string[]) : [],
      openHours: gym.open_hours || '24 ساعة',
      price: gym.price || 'من 1999 جنيه/شهر'
    }));
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
    
    // Transform the data to match our GymItem interface
    return {
      id: data.id,
      name: data.name,
      image: data.image || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=500&h=300',
      location: data.location || '',
      rating: parseFloat(data.rating) || 4.5,
      features: Array.isArray(data.features) ? (data.features as string[]) : [],
      openHours: data.open_hours || '24 ساعة',
      price: data.price || 'من 1999 جنيه/شهر'
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
      .select(`
        *,
        gyms:gym_id (
          name,
          image
        )
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Transform the data to match our GymSubscription interface
    return data.map(subscription => ({
      id: subscription.id,
      user_id: subscription.user_id,
      gym_id: subscription.gym_id,
      plan_name: subscription.plan_name,
      start_date: subscription.start_date,
      end_date: subscription.end_date,
      price: subscription.price,
      status: subscription.status as 'active' | 'expired' | 'cancelled',
      created_at: subscription.created_at
    }));
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
      .insert([subscription])
      .select()
      .single();
    
    if (error) throw error;
    
    return data as GymSubscription;
  } catch (error) {
    console.error('Error creating gym subscription:', error);
    throw error;
  }
}
