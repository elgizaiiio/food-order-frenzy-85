
import { supabase } from '@/integrations/supabase/client';
import { Gym, GymSubscription } from '@/types/gym';

// Mock data for gyms
const MOCK_GYMS: Gym[] = [
  {
    id: '1',
    name: 'نادي اللياقة الذهبي',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    location: 'شارع التحلية، الرياض',
    rating: 4.7,
    features: ['مدربين محترفين', 'مسبح', 'ساونا', 'جاكوزي'],
    open_hours: '24 ساعة',
    price: 250
  },
  {
    id: '2',
    name: 'صالة فيتنس برو',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3ltfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    location: 'طريق الملك فهد، الرياض',
    rating: 4.5,
    features: ['معدات حديثة', 'صفوف جماعية', 'كارديو'],
    open_hours: '6:00 ص - 11:00 م',
    price: 200
  }
];

// Retrieve list of gyms
export async function fetchGyms(): Promise<Gym[]> {
  try {
    // In future, we'll query from database
    // Here we use mock data
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return MOCK_GYMS;
  } catch (error) {
    console.error('Error fetching gyms:', error);
    return [];
  }
}

// Retrieve gym by ID
export async function fetchGymById(gymId: string): Promise<Gym | null> {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return MOCK_GYMS.find(gym => gym.id === gymId) || null;
  } catch (error) {
    console.error(`Error fetching gym with ID ${gymId}:`, error);
    return null;
  }
}

// Make sure to export the GymSubscription type and fetchUserSubscriptions function
export { fetchUserSubscriptions } from '@/services/gymSubscriptionService';
export type { Gym, GymSubscription };
