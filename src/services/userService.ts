
import { supabase } from '@/integrations/supabase/client';

export interface UserAddress {
  id: string;
  user_id: string;
  label: string;
  city: string;
  district?: string;
  street?: string;
  building_no?: string;
  apartment_no?: string;
  floor_no?: string;
  full_address: string;
  phone_number: string;
  landmark?: string;
  is_default: boolean;
  created_at?: string;
}

export interface PaymentMethod {
  id: string;
  user_id: string;
  type: string; // card, wallet, etc.
  title: string;
  last4: string;
  saved_token: string;
  is_default: boolean;
  created_at?: string;
}

/**
 * جلب عناوين المستخدم
 */
export const fetchUserAddresses = async (): Promise<UserAddress[]> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('user_addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false });

  if (error) {
    console.error('Error fetching user addresses:', error);
    throw error;
  }

  return data;
};

/**
 * إضافة عنوان جديد للمستخدم
 */
export const addUserAddress = async (addressData: Partial<UserAddress>): Promise<UserAddress> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // إدارة حالة العنوان الافتراضي
  if (addressData.is_default) {
    // تحديث جميع العناوين لتكون غير افتراضية
    await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
  }

  // إنشاء عنوان كامل من البيانات المقدمة
  const fullAddress = `${addressData.city || ''} ${addressData.district || ''} ${addressData.street || ''} ${addressData.building_no || ''}`;

  // إعداد بيانات الإدخال مع تعيين القيم الافتراضية
  const addressInput = {
    user_id: user.id,
    label: addressData.label || 'عنوان جديد',
    city: addressData.city || 'القاهرة', // تعيين قيمة افتراضية للمدينة
    full_address: addressData.full_address || fullAddress,
    phone_number: addressData.phone_number || '01000000000', // تعيين رقم هاتف افتراضي
    is_default: addressData.is_default || false,
    district: addressData.district,
    street: addressData.street,
    building_no: addressData.building_no,
    apartment_no: addressData.apartment_no,
    floor_no: addressData.floor_no,
    landmark: addressData.landmark,
  };

  const { data, error } = await supabase
    .from('user_addresses')
    .insert(addressInput)
    .select('*')
    .single();

  if (error) {
    console.error('Error adding user address:', error);
    throw error;
  }

  return data;
};

/**
 * حذف عنوان مستخدم
 */
export const deleteUserAddress = async (addressId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('user_addresses')
    .delete()
    .eq('id', addressId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting user address:', error);
    throw error;
  }
};

/**
 * تعيين عنوان كافتراضي
 */
export const setDefaultAddress = async (addressId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // تحديث جميع العناوين لتكون غير افتراضية
  await supabase
    .from('user_addresses')
    .update({ is_default: false })
    .eq('user_id', user.id);

  // تعيين العنوان المحدد كافتراضي
  const { error } = await supabase
    .from('user_addresses')
    .update({ is_default: true })
    .eq('id', addressId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
};

/**
 * وظيفة مساعدة لإنشاء عنوان واضح لوسائل الدفع
 */
const getPaymentMethodTitle = (type: string, last4: string): string => {
  switch (type) {
    case 'visa':
      return `بطاقة فيزا تنتهي بـ ${last4}`;
    case 'mastercard':
      return `بطاقة ماستركارد تنتهي بـ ${last4}`;
    case 'mada':
      return `بطاقة مدى تنتهي بـ ${last4}`;
    case 'wallet':
      return 'محفظة إلكترونية';
    case 'cash':
      return 'الدفع عند الاستلام';
    default:
      return `بطاقة تنتهي بـ ${last4}`;
  }
};

/**
 * جلب وسائل الدفع للمستخدم
 */
export const fetchUserPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('user_payment_methods')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false });

  if (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }

  // إضافة عنوان مفهوم لكل وسيلة دفع
  return data.map((method: any) => ({
    ...method,
    title: getPaymentMethodTitle(method.type, method.last4)
  }));
};

/**
 * إضافة وسيلة دفع جديدة
 */
export const addPaymentMethod = async (paymentData: Partial<PaymentMethod>): Promise<PaymentMethod> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // إدارة حالة وسيلة الدفع الافتراضية
  if (paymentData.is_default) {
    await supabase
      .from('user_payment_methods')
      .update({ is_default: false })
      .eq('user_id', user.id);
  }

  const paymentInput = {
    user_id: user.id,
    type: paymentData.type || 'card',
    last4: paymentData.last4 || '0000',
    saved_token: paymentData.saved_token || '',
    is_default: paymentData.is_default || false
  };

  const { data, error } = await supabase
    .from('user_payment_methods')
    .insert(paymentInput)
    .select('*')
    .single();

  if (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }

  return {
    ...data,
    title: getPaymentMethodTitle(data.type, data.last4)
  };
};

/**
 * تعيين وسيلة دفع كافتراضية
 */
export const setDefaultPaymentMethod = async (paymentId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // تحديث جميع وسائل الدفع لتكون غير افتراضية
  await supabase
    .from('user_payment_methods')
    .update({ is_default: false })
    .eq('user_id', user.id);

  // تعيين وسيلة الدفع المحددة كافتراضية
  const { error } = await supabase
    .from('user_payment_methods')
    .update({ is_default: true })
    .eq('id', paymentId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error setting default payment method:', error);
    throw error;
  }
};

/**
 * حذف وسيلة دفع
 */
export const deletePaymentMethod = async (paymentId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('user_payment_methods')
    .delete()
    .eq('id', paymentId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting payment method:', error);
    throw error;
  }
};
