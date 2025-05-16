
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
 * جلب عناوين المستخدم
 */
export async function fetchUserAddresses(): Promise<UserAddress[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('user_addresses') // استخدام اسم الجدول الصحيح
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('خطأ في جلب عناوين المستخدم:', error);
    return [];
  }
}

/**
 * إضافة عنوان جديد للمستخدم
 */
export async function addUserAddress(address: Omit<UserAddress, 'id' | 'user_id'>): Promise<UserAddress> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    const { data, error } = await supabase
      .from('user_addresses') // استخدام اسم الجدول الصحيح
      .insert({
        ...address,
        user_id: user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('خطأ في إضافة عنوان المستخدم:', error);
    throw error;
  }
}

/**
 * حذف عنوان مستخدم
 */
export async function deleteUserAddress(addressId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    const { error } = await supabase
      .from('user_addresses') // استخدام اسم الجدول الصحيح
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.id);
    
    if (error) throw error;
  } catch (error) {
    console.error('خطأ في حذف عنوان المستخدم:', error);
    throw error;
  }
}

/**
 * تعيين عنوان كعنوان افتراضي
 */
export async function setDefaultAddress(addressId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    // أولاً، إعادة تعيين جميع العناوين إلى غير افتراضي
    await supabase
      .from('user_addresses') // استخدام اسم الجدول الصحيح
      .update({ is_default: false })
      .eq('user_id', user.id);
    
    // ثم تعيين العنوان المحدد كعنوان افتراضي
    const { error } = await supabase
      .from('user_addresses') // استخدام اسم الجدول الصحيح
      .update({ is_default: true })
      .eq('id', addressId)
      .eq('user_id', user.id);
    
    if (error) throw error;
  } catch (error) {
    console.error('خطأ في تعيين العنوان الافتراضي:', error);
    throw error;
  }
}

/**
 * جلب طرق الدفع للمستخدم
 */
export async function fetchUserPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('payments')
      .select('id, user_id, method, status, is_default:COALESCE(status=\'default\', false)')
      .eq('user_id', user.id)
      .order('id', { ascending: false });
    
    if (error) throw error;
    
    // تحويل البيانات إلى التنسيق المطلوب
    return data?.map(item => ({
      id: item.id,
      user_id: item.user_id,
      type: item.method,
      is_default: item.is_default
    })) || [];
  } catch (error) {
    console.error('خطأ في جلب طرق الدفع:', error);
    return [];
  }
}

/**
 * إضافة طريقة دفع جديدة
 */
export async function addPaymentMethod(method: Omit<PaymentMethod, 'id' | 'user_id'>): Promise<PaymentMethod> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: user.id,
        method: method.type,
        status: method.is_default ? 'default' : 'active',
        amount: 0  // قيمة افتراضية مطلوبة
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      user_id: data.user_id,
      type: data.method,
      is_default: data.status === 'default'
    };
  } catch (error) {
    console.error('خطأ في إضافة طريقة دفع:', error);
    throw error;
  }
}

/**
 * تعيين طريقة دفع كطريقة افتراضية
 */
export async function setDefaultPaymentMethod(methodId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    // أولاً، إعادة تعيين جميع طرق الدفع إلى غير افتراضي
    await supabase
      .from('payments')
      .update({ status: 'active' })
      .eq('user_id', user.id)
      .neq('id', methodId);
    
    // ثم تعيين طريقة الدفع المحددة كطريقة افتراضية
    const { error } = await supabase
      .from('payments')
      .update({ status: 'default' })
      .eq('id', methodId)
      .eq('user_id', user.id);
    
    if (error) throw error;
  } catch (error) {
    console.error('خطأ في تعيين طريقة الدفع الافتراضية:', error);
    throw error;
  }
}

/**
 * حذف طريقة دفع
 */
export async function deletePaymentMethod(methodId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', methodId)
      .eq('user_id', user.id);
    
    if (error) throw error;
  } catch (error) {
    console.error('خطأ في حذف طريقة الدفع:', error);
    throw error;
  }
}

/**
 * الحصول على معلومات الملف الشخصي
 */
export async function getUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('خطأ في جلب معلومات الملف الشخصي:', error);
    throw error;
  }
}

/**
 * تحديث معلومات الملف الشخصي
 */
export async function updateUserProfile(updates: Record<string, any>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('خطأ في تحديث معلومات الملف الشخصي:', error);
    throw error;
  }
}
