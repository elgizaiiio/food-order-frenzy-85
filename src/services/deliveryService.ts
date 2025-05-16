
import { supabase } from '@/integrations/supabase/client';

export interface DeliveryRequest {
  id?: string;
  user_id?: string;
  pickup_address: string;
  delivery_address: string;
  items_description: string;
  estimated_value?: number;
  payment_method_id?: string;
  status?: 'pending' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';
  driver_id?: string;
  driver_name?: string;
  driver_phone?: string;
  driver_photo?: string;
  vehicle_details?: string;
  created_at?: string;
  estimated_delivery_time?: string;
  estimated_price?: number;
  distance?: number;
  notes?: string;
}

// استعلام طلبات التوصيل للمستخدم الحالي
export const fetchUserDeliveryRequests = async (): Promise<DeliveryRequest[]> => {
  console.log('Fetching user delivery requests');
  
  const { data: userId } = await supabase.auth.getSession();
  if (!userId?.session?.user?.id) {
    throw new Error("يجب تسجيل الدخول لعرض طلبات التوصيل");
  }

  const { data, error } = await supabase
    .from('delivery_requests')
    .select('*')
    .eq('user_id', userId.session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching delivery requests:', error);
    throw new Error('حدث خطأ أثناء استرجاع طلبات التوصيل');
  }

  return data || [];
};

// إنشاء طلب توصيل جديد
export const createDeliveryRequest = async (requestData: DeliveryRequest): Promise<DeliveryRequest> => {
  console.log('Creating new delivery request:', requestData);
  
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session?.user?.id) {
    throw new Error("يجب تسجيل الدخول لإنشاء طلب توصيل");
  }

  // إضافة معرف المستخدم للطلب
  const request = {
    ...requestData,
    user_id: sessionData.session.user.id,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('delivery_requests')
    .insert([request])
    .select()
    .single();

  if (error) {
    console.error('Error creating delivery request:', error);
    throw new Error('حدث خطأ أثناء إنشاء طلب التوصيل');
  }

  return data;
};

// تحديث حالة طلب التوصيل
export const updateDeliveryRequestStatus = async (requestId: string, status: string): Promise<void> => {
  console.log(`Updating delivery request status: ${requestId} to ${status}`);
  
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session?.user?.id) {
    throw new Error("يجب تسجيل الدخول لتحديث حالة الطلب");
  }

  const { error } = await supabase
    .from('delivery_requests')
    .update({ status })
    .eq('id', requestId)
    .eq('user_id', sessionData.session.user.id);

  if (error) {
    console.error('Error updating delivery request:', error);
    throw new Error('حدث خطأ أثناء تحديث حالة طلب التوصيل');
  }
};

// تقدير سعر التوصيل (محاكاة)
export const estimateDeliveryPrice = async (
  pickupAddress: string,
  deliveryAddress: string
): Promise<{ price: number; time: string; distance: number }> => {
  // هذه وظيفة محاكاة لتقدير سعر وزمن ومسافة التوصيل
  // في التطبيق الحقيقي، يجب استخدام خدمة خرائط مثل Google Maps API
  
  // محاكاة تأخير الشبكة
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // سعر عشوائي بين 15 و 45 ريال
  const price = Math.floor(Math.random() * 30) + 15;
  
  // وقت توصيل عشوائي بين 20 و 60 دقيقة
  const minutes = Math.floor(Math.random() * 40) + 20;
  
  // مسافة عشوائية بين 3 و 15 كم
  const distance = Math.floor(Math.random() * 12) + 3;
  
  return {
    price,
    time: `${minutes} دقيقة`,
    distance
  };
};

// إلغاء طلب التوصيل
export const cancelDeliveryRequest = async (requestId: string): Promise<void> => {
  console.log(`Cancelling delivery request: ${requestId}`);
  
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session?.user?.id) {
    throw new Error("يجب تسجيل الدخول لإلغاء الطلب");
  }

  const { error } = await supabase
    .from('delivery_requests')
    .update({ status: 'cancelled' })
    .eq('id', requestId)
    .eq('user_id', sessionData.session.user.id);

  if (error) {
    console.error('Error cancelling delivery request:', error);
    throw new Error('حدث خطأ أثناء إلغاء طلب التوصيل');
  }
};

// الحصول على تفاصيل طلب توصيل محدد
export const getDeliveryRequestDetails = async (requestId: string): Promise<DeliveryRequest> => {
  console.log(`Getting details for delivery request: ${requestId}`);
  
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session?.user?.id) {
    throw new Error("يجب تسجيل الدخول لعرض تفاصيل الطلب");
  }

  const { data, error } = await supabase
    .from('delivery_requests')
    .select('*')
    .eq('id', requestId)
    .eq('user_id', sessionData.session.user.id)
    .single();

  if (error) {
    console.error('Error fetching delivery request details:', error);
    throw new Error('حدث خطأ أثناء استرجاع تفاصيل طلب التوصيل');
  }

  if (!data) {
    throw new Error('لم يتم العثور على طلب التوصيل');
  }

  return data;
};
