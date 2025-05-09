
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
 * Fetch all gyms - using mock data since the gyms table doesn't exist in Supabase yet
 */
export async function fetchGyms(): Promise<GymItem[]> {
  try {
    // Since the gyms table doesn't exist in Supabase, we'll use mock data
    const mockData: GymItem[] = [
      {
        id: 'iron-fitness',
        name: 'آيرون فيتنس',
        image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=500&h=300',
        location: 'شارع الملك فهد',
        rating: 4.8,
        features: ['تدريب شخصي', 'ساونا', 'مسبح داخلي'],
        openHours: '24 ساعة',
        price: 'من 1999 جنيه/شهر'
      },
      {
        id: 'gold-gym',
        name: 'جولد جيم',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500&h=300',
        location: 'حي النزهة',
        rating: 4.5,
        features: ['صالة كارديو', 'يوغا', 'زومبا'],
        openHours: '6:00 - 23:00',
        price: 'من 2499 جنيه/شهر'
      },
      {
        id: 'fitness-time',
        name: 'فيتنس تايم',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=500&h=300',
        location: 'طريق الشيخ زايد',
        rating: 4.7,
        features: ['كروس فيت', 'تمارين جماعية', 'مدربين معتمدين'],
        openHours: '5:00 - 23:30',
        price: 'من 2190 جنيه/شهر'
      },
      {
        id: 'power-zone',
        name: 'باور زون',
        image: 'https://images.unsplash.com/photo-1637666218229-7824d3b2ed83?auto=format&fit=crop&q=80&w=500&h=300',
        location: 'الجامعة الشرقية',
        rating: 4.4,
        features: ['أجهزة حديثة', 'تدريب قوة', 'كمال أجسام'],
        openHours: '6:00 - 22:00',
        price: 'من 1890 جنيه/شهر'
      },
    ];
    
    return mockData;
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
    // For now we'll use mock data since the gyms table doesn't exist yet in Supabase
    const mockGym: GymItem = {
      id: id,
      name: id === 'iron-fitness' ? 'آيرون فيتنس' : id === 'gold-gym' ? 'جولد جيم' : id === 'fitness-time' ? 'فيتنس تايم' : 'باور زون',
      image: `https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=500&h=300`,
      location: 'شارع الملك فهد',
      rating: 4.8,
      features: ['تدريب شخصي', 'ساونا', 'مسبح داخلي'],
      openHours: '24 ساعة',
      price: 'من 1999 جنيه/شهر'
    };
    
    return mockGym;
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
    // Return mock subscriptions since the gym_subscriptions table doesn't exist yet
    console.log('Returning mock subscriptions data since the gym_subscriptions table does not exist');
    
    // Return mock subscriptions
    return [{
      id: "1",
      user_id: userId,
      gym_id: "gold-gym",
      plan_name: "الباقة الذهبية",
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      price: 199,
      status: 'active'
    }];
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
    // Return mock subscription since the gym_subscriptions table doesn't exist yet
    console.log('Returning mock subscription data since the gym_subscriptions table does not exist');
    
    // Return mock data
    return {
      id: Math.random().toString(36).substring(7),
      ...subscription,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating gym subscription:', error);
    throw error;
  }
}
