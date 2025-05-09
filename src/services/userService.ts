
import { supabase } from '@/integrations/supabase/client';

export interface UserAddress {
  id: string;
  user_id: string;
  label: string;
  full_address: string;
  city: string;
  phone_number: string;
  is_default: boolean;
}

export interface PaymentMethod {
  id: string;
  user_id: string;
  type: string;
  last4?: string;
  is_default: boolean;
}

/**
 * Fetch user addresses
 */
export async function fetchUserAddresses(): Promise<UserAddress[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    return [];
  }
}

/**
 * Add a new user address
 */
export async function addUserAddress(address: Omit<UserAddress, 'id' | 'user_id'>): Promise<UserAddress> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('user_addresses')
      .insert({
        ...address,
        user_id: user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error adding user address:', error);
    throw error;
  }
}

/**
 * Set a user address as default
 */
export async function setDefaultAddress(addressId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // First, reset all addresses to non-default
    await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
    
    // Then set the selected address as default
    const { error } = await supabase
      .from('user_addresses')
      .update({ is_default: true })
      .eq('id', addressId)
      .eq('user_id', user.id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
}

/**
 * Fetch user payment methods
 */
export async function fetchUserPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('user_payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching user payment methods:', error);
    return [];
  }
}

/**
 * Add a new payment method
 */
export async function addPaymentMethod(method: Omit<PaymentMethod, 'id' | 'user_id'>): Promise<PaymentMethod> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('user_payment_methods')
      .insert({
        ...method,
        user_id: user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }
}

/**
 * Set a payment method as default
 */
export async function setDefaultPaymentMethod(methodId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // First, reset all payment methods to non-default
    await supabase
      .from('user_payment_methods')
      .update({ is_default: false })
      .eq('user_id', user.id);
    
    // Then set the selected method as default
    const { error } = await supabase
      .from('user_payment_methods')
      .update({ is_default: true })
      .eq('id', methodId)
      .eq('user_id', user.id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error setting default payment method:', error);
    throw error;
  }
}

/**
 * Get user profile data
 */
export async function getUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: Record<string, any>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}
