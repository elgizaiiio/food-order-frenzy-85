
import { supabase } from '@/integrations/supabase/client';
import { GymSubscription } from '@/types/gym';

// Fetch user subscriptions
export async function fetchUserSubscriptions(userId: string): Promise<GymSubscription[]> {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    // Fetch subscriptions from Supabase
    const { data, error } = await supabase
      .from('gym_subscriptions')
      .select('*')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching gym subscriptions:', error);
      throw error;
    }
    
    // Convert database status string to the union type
    return data?.map(subscription => ({
      ...subscription,
      status: subscription.status as 'active' | 'expired' | 'cancelled'
    })) || [];
  } catch (error) {
    console.error('Error in fetchUserSubscriptions:', error);
    return [];
  }
}

// Create gym subscription
export async function createSubscription(subscriptionData: Omit<GymSubscription, 'id' | 'created_at'>): Promise<GymSubscription> {
  try {
    const { data, error } = await supabase
      .from('gym_subscriptions')
      .insert([subscriptionData])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating gym subscription:', error);
      throw error;
    }
    
    // Convert database status string to the union type
    return {
      ...data,
      status: data.status as 'active' | 'expired' | 'cancelled'
    };
  } catch (error) {
    console.error('Error in createSubscription:', error);
    throw error;
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
    
    // استرداد معلومات النادي (مثال: هنا نستخدم النوادي المخزنة مسبقًا)
    const gym = { id: gymId, name: 'نادي رياضي', price: 200 };
    
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
