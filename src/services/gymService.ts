
import { supabase } from '@/integrations/supabase/client';
import { Gym, GymSubscription } from '@/types/gym';

// بيانات وهمية لعرض الصالات الرياضية
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

// استرداد قائمة الصالات الرياضية
export async function fetchGyms(): Promise<Gym[]> {
  try {
    // في المستقبل، سنقوم بالاستعلام من قاعدة البيانات
    // هنا نستخدم البيانات الوهمية
    
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return MOCK_GYMS;
  } catch (error) {
    console.error('Error fetching gyms:', error);
    return [];
  }
}

// استرداد صالة رياضية بالمعرف
export async function fetchGymById(gymId: string): Promise<Gym | null> {
  try {
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return MOCK_GYMS.find(gym => gym.id === gymId) || null;
  } catch (error) {
    console.error(`Error fetching gym with ID ${gymId}:`, error);
    return null;
  }
}
