
import { supabase } from '@/integrations/supabase/client';

export type DeliveryStatus = 'pending' | 'accepted' | 'picked_up' | 'delivered' | 'cancelled';

export interface DeliveryRequest {
  id?: string;
  user_id?: string;
  pickup_address: string;
  delivery_address: string;
  items_description: string;
  estimated_value?: number | null;
  payment_method_id?: string | null;
  status?: DeliveryStatus;
  driver_id?: string | null;
  driver_name?: string | null;
  driver_phone?: string | null;
  driver_photo?: string | null;
  vehicle_details?: string | null;
  created_at?: string;
  estimated_delivery_time?: string | null;
  estimated_price?: number | null;
  distance?: number | null;
  notes?: string | null;
}

// Mock data for delivery requests until the table is created
const mockDeliveryRequests: DeliveryRequest[] = [
  {
    id: '1',
    user_id: 'current-user',
    pickup_address: 'شارع الملك فيصل، الرياض',
    delivery_address: 'حي النخيل، الرياض',
    items_description: 'وثائق هامة',
    status: 'pending',
    created_at: new Date().toISOString(),
    estimated_price: 25,
    distance: 5.2
  }
];

// استعلام طلبات التوصيل للمستخدم الحالي
export const fetchUserDeliveryRequests = async (): Promise<DeliveryRequest[]> => {
  console.log('Fetching user delivery requests');
  
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session?.user?.id) {
    throw new Error("يجب تسجيل الدخول لعرض طلبات التوصيل");
  }

  // Use mock data for now since delivery_requests table doesn't exist yet
  return mockDeliveryRequests.filter(req => 
    req.user_id === 'current-user' || req.user_id === sessionData.session.user.id
  );
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
    status: 'pending' as DeliveryStatus,
    created_at: new Date().toISOString(),
    id: `mock-${Date.now()}`  // Generate a mock ID for now
  };

  // Add to mock data
  mockDeliveryRequests.push(request);
  
  return request;
};

// تحديث حالة طلب التوصيل
export const updateDeliveryRequestStatus = async (requestId: string, status: DeliveryStatus): Promise<void> => {
  console.log(`Updating delivery request status: ${requestId} to ${status}`);
  
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session?.user?.id) {
    throw new Error("يجب تسجيل الدخول لتحديث حالة الطلب");
  }

  // Update in mock data
  const requestIndex = mockDeliveryRequests.findIndex(req => req.id === requestId);
  if (requestIndex !== -1) {
    mockDeliveryRequests[requestIndex].status = status;
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

  // Update in mock data
  const requestIndex = mockDeliveryRequests.findIndex(req => req.id === requestId);
  if (requestIndex !== -1) {
    mockDeliveryRequests[requestIndex].status = 'cancelled';
  }
};

// الحصول على تفاصيل طلب توصيل محدد
export const getDeliveryRequestDetails = async (requestId: string): Promise<DeliveryRequest> => {
  console.log(`Getting details for delivery request: ${requestId}`);
  
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData?.session?.user?.id) {
    throw new Error("يجب تسجيل الدخول لعرض تفاصيل الطلب");
  }

  // Find in mock data
  const request = mockDeliveryRequests.find(req => req.id === requestId);
  
  if (!request) {
    throw new Error('لم يتم العثور على طلب التوصيل');
  }

  return request;
};
