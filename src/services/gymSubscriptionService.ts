
import { supabase } from '@/integrations/supabase/client';
import { GymSubscription } from '@/types/gym';

// Fetch user subscriptions from database
export async function fetchUserSubscriptions(userId: string): Promise<GymSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('gym_subscriptions')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    // Convert the status to the proper type
    return (data || []).map(item => ({
      ...item,
      status: item.status as 'active' | 'expired' | 'cancelled'
    }));
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    return [];
  }
}

// Create a new subscription
export async function createSubscription(subscription: Omit<GymSubscription, 'id' | 'created_at'>): Promise<GymSubscription> {
  try {
    const { data, error } = await supabase
      .from('gym_subscriptions')
      .insert([subscription])
      .select()
      .single();
    
    if (error) throw error;
    
    // Convert the status to the proper type
    return {
      ...data,
      status: data.status as 'active' | 'expired' | 'cancelled'
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}
