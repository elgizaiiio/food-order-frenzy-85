
// هذا ملف مؤقت لخدمة الصالات الرياضية
// عندما يتم إنشاء جداول الصالات الرياضية في قاعدة البيانات، يمكن تحديث هذا الملف

import { supabase } from '@/integrations/supabase/client';

export interface Gym {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  features: string[];
  open_hours: string;
  price: number;
}

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

// حجز اشتراك في صالة رياضية
export async function bookGymMembership(
  gymId: string,
  membershipType: string,
  startDate: string,
  paymentMethodId: string
): Promise<{ success: boolean; orderId?: string; message?: string }> {
  try {
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return {
        success: false,
        message: 'يجب تسجيل الدخول لحجز اشتراك'
      };
    }
    
    const gym = MOCK_GYMS.find(g => g.id === gymId);
    if (!gym) {
      return {
        success: false,
        message: 'لم يتم العثور على الصالة الرياضية'
      };
    }
    
    // إنشاء بيانات الاشتراك
    const membershipData = {
      gym_id: gymId,
      gym_name: gym.name,
      membership_type: membershipType,
      start_date: startDate,
      price: gym.price,
      user_id: user.id
    };
    
    // في المستقبل، سنقوم بإدراج هذه البيانات في جدول الاشتراكات
    console.log('Membership data:', membershipData);
    
    // إنشاء طلب في جدول الطلبات
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_type: 'gym',
        items: [{
          gym_id: gymId,
          membership_type: membershipType,
          name: `اشتراك في ${gym.name}`,
          quantity: 1,
          price: gym.price
        }],
        total_amount: gym.price,
        payment_method_id: paymentMethodId,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating gym membership order:', error);
      return {
        success: false,
        message: 'حدث خطأ أثناء إنشاء الطلب'
      };
    }
    
    return {
      success: true,
      orderId: data.id,
      message: 'تم حجز الاشتراك بنجاح'
    };
  } catch (error) {
    console.error('Error booking gym membership:', error);
    return {
      success: false,
      message: 'حدث خطأ أثناء حجز الاشتراك'
    };
  }
}
