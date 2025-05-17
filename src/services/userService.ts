
import { supabase } from '@/integrations/supabase/client';

/**
 * واجهة بيانات العنوان للمستخدم
 */
export interface UserAddress {
  id: string;
  user_id: string;
  label: string;
  full_address: string;
  city?: string;
  district?: string;
  street?: string;
  building_no?: string;
  apartment_no?: string;
  floor_no?: string;
  landmark?: string;
  phone_number?: string;
  is_default: boolean;
}

/**
 * واجهة بيانات وسيلة الدفع للمستخدم
 */
export interface PaymentMethod {
  id: string;
  user_id: string;
  type: 'cash' | 'card' | 'wallet';
  title: string;
  last4?: string;
  is_default: boolean;
}

/**
 * جلب عناوين المستخدم
 */
export async function fetchUserAddresses(): Promise<UserAddress[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('يجب تسجيل الدخول لجلب العناوين');
    }
    
    const { data, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
      
    if (error) {
      console.error('خطأ في جلب عناوين المستخدم:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('خطأ في جلب عناوين المستخدم:', error);
    throw error;
  }
}

/**
 * إضافة عنوان جديد للمستخدم
 */
export async function addUserAddress(address: Omit<UserAddress, 'id' | 'user_id'>): Promise<UserAddress> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('يجب تسجيل الدخول لإضافة عنوان');
    }
    
    const { data, error } = await supabase
      .from('user_addresses')
      .insert({
        ...address,
        user_id: user.id
      })
      .select('*')
      .single();
      
    if (error) {
      console.error('خطأ في إضافة عنوان جديد:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('خطأ في إضافة عنوان جديد:', error);
    throw error;
  }
}

/**
 * حذف عنوان للمستخدم
 */
export async function deleteUserAddress(addressId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', addressId);
      
    if (error) {
      console.error('خطأ في حذف العنوان:', error);
      throw error;
    }
  } catch (error) {
    console.error('خطأ في حذف العنوان:', error);
    throw error;
  }
}

/**
 * تعيين العنوان الافتراضي
 */
export async function setDefaultAddress(addressId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('يجب تسجيل الدخول لتعيين العنوان الافتراضي');
    }
    
    // إلغاء تحديد جميع العناوين الافتراضية أولاً
    const { error: resetError } = await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
      
    if (resetError) {
      console.error('خطأ في إعادة تعيين العناوين الافتراضية:', resetError);
      throw resetError;
    }
    
    // تعيين العنوان المحدد كافتراضي
    const { error } = await supabase
      .from('user_addresses')
      .update({ is_default: true })
      .eq('id', addressId);
      
    if (error) {
      console.error('خطأ في تعيين العنوان الافتراضي:', error);
      throw error;
    }
  } catch (error) {
    console.error('خطأ في تعيين العنوان الافتراضي:', error);
    throw error;
  }
}

/**
 * جلب وسائل الدفع المخزنة للمستخدم
 */
export async function fetchUserPaymentMethods(): Promise<PaymentMethod[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('يجب تسجيل الدخول لجلب وسائل الدفع');
    }
    
    const { data, error } = await supabase
      .from('user_payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
      
    if (error) {
      console.error('خطأ في جلب وسائل الدفع:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('خطأ في جلب وسائل الدفع:', error);
    throw error;
  }
}

/**
 * إضافة وسيلة دفع جديدة
 */
export async function addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id' | 'user_id'>): Promise<PaymentMethod> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('يجب تسجيل الدخول لإضافة وسيلة دفع');
    }
    
    const { data, error } = await supabase
      .from('user_payment_methods')
      .insert({
        ...paymentMethod,
        user_id: user.id
      })
      .select('*')
      .single();
      
    if (error) {
      console.error('خطأ في إضافة وسيلة دفع جديدة:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('خطأ في إضافة وسيلة دفع جديدة:', error);
    throw error;
  }
}

/**
 * تعيين وسيلة الدفع الافتراضية
 */
export async function setDefaultPaymentMethod(paymentMethodId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('يجب تسجيل الدخول لتعيين وسيلة الدفع الافتراضية');
    }
    
    // إلغاء تحديد جميع وسائل الدفع الافتراضية أولاً
    const { error: resetError } = await supabase
      .from('user_payment_methods')
      .update({ is_default: false })
      .eq('user_id', user.id);
      
    if (resetError) {
      console.error('خطأ في إعادة تعيين وسائل الدفع الافتراضية:', resetError);
      throw resetError;
    }
    
    // تعيين وسيلة الدفع المحددة كافتراضية
    const { error } = await supabase
      .from('user_payment_methods')
      .update({ is_default: true })
      .eq('id', paymentMethodId);
      
    if (error) {
      console.error('خطأ في تعيين وسيلة الدفع الافتراضية:', error);
      throw error;
    }
  } catch (error) {
    console.error('خطأ في تعيين وسيلة الدفع الافتراضية:', error);
    throw error;
  }
}

/**
 * حذف وسيلة دفع
 */
export async function deletePaymentMethod(paymentMethodId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_payment_methods')
      .delete()
      .eq('id', paymentMethodId);
      
    if (error) {
      console.error('خطأ في حذف وسيلة الدفع:', error);
      throw error;
    }
  } catch (error) {
    console.error('خطأ في حذف وسيلة الدفع:', error);
    throw error;
  }
}
