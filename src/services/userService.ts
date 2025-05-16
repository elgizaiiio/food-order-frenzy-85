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

// تحسين أداء طلبات العناوين باستخدام التخزين المؤقت
let addressesCache: Record<string, { data: UserAddress[], timestamp: number }> = {};
let paymentMethodsCache: Record<string, { data: PaymentMethod[], timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * جلب عناوين المستخدم
 */
export async function fetchUserAddresses(): Promise<UserAddress[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    // Check if we have a valid cache
    const now = Date.now();
    const cachedData = addressesCache[user.id];
    if (cachedData && (now - cachedData.timestamp < CACHE_DURATION)) {
      return cachedData.data;
    }
    
    const { data, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    
    if (error) throw error;
    
    // Update cache
    addressesCache[user.id] = { data: data || [], timestamp: now };
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
      .from('user_addresses')
      .insert({
        ...address,
        user_id: user.id
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Invalidate cache
    delete addressesCache[user.id];
    
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
      .from('user_addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    // Invalidate cache
    delete addressesCache[user.id];
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
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
    
    // ثم تعيين العنوان المحدد كعنوان افتراضي
    const { error } = await supabase
      .from('user_addresses')
      .update({ is_default: true })
      .eq('id', addressId)
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    // Invalidate cache
    delete addressesCache[user.id];
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
    
    // Check if we have a valid cache
    const now = Date.now();
    const cachedData = paymentMethodsCache[user.id];
    if (cachedData && (now - cachedData.timestamp < CACHE_DURATION)) {
      return cachedData.data;
    }
    
    const { data, error } = await supabase
      .from('user_payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    
    if (error) throw error;
    
    // Update cache
    paymentMethodsCache[user.id] = { data: data || [], timestamp: now };
    return data || [];
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
      .from('user_payment_methods')
      .insert({
        user_id: user.id,
        type: method.type,
        last4: method.last4,
        is_default: method.is_default
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Invalidate cache
    delete paymentMethodsCache[user.id];
    
    return data;
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
      .from('user_payment_methods')
      .update({ is_default: false })
      .eq('user_id', user.id);
    
    // ثم تعيين طريقة الدفع المحددة كطريقة افتراضية
    const { error } = await supabase
      .from('user_payment_methods')
      .update({ is_default: true })
      .eq('id', methodId)
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    // Invalidate cache
    delete paymentMethodsCache[user.id];
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
      .from('user_payment_methods')
      .delete()
      .eq('id', methodId)
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    // Invalidate cache
    delete paymentMethodsCache[user.id];
  } catch (error) {
    console.error('خطأ في حذف طريقة الدفع:', error);
    throw error;
  }
}

// Implementing memoization for user profile
let profileCache: Record<string, { data: any, timestamp: number }> = {};

/**
 * الحصول على معلومات الملف الشخصي
 * سيتم استخدام الملف الموجود أو إنشاء ملف شخصي جديد إذا لم يكن موجودًا
 */
export async function getUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    // Check for cached data
    const now = Date.now();
    const cachedData = profileCache[user.id];
    if (cachedData && (now - cachedData.timestamp < CACHE_DURATION)) {
      return cachedData.data;
    }
    
    // محاولة جلب الملف الشخصي الحالي
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
      
    if (error) {
      console.error('خطأ في جلب الملف الشخصي:', error);
      // تحقق من نوع الخطأ للمعالجة الخاصة
      if (error.code === '42501') { // خطأ في سياسة الأمان RLS
        return {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email?.split('@')[0] || '',
          username: user.email?.split('@')[0] || ''
        };
      }
      throw error;
    }
    
    // إذا لم يكن المستخدم موجودًا، نعيد معلومات أساسية
    if (!data) {
      return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        username: user.email?.split('@')[0] || ''
      };
    }
    
    // Update cache
    profileCache[user.id] = { data: data, timestamp: now };
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
    
    // خطوة 1: محاولة تحديث بيانات المستخدم
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) {
      // إذا كان الخطأ بسبب عدم وجود المستخدم، سنقوم بإنشائه
      if (error.code === 'PGRST204' || error.message?.includes('No rows found')) {
        // محاولة إنشاء ملف جديد
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            name: updates.name || user.user_metadata?.name || user.email?.split('@')[0] || '',
            username: user.email?.split('@')[0] || '',
            ...updates
          })
          .select()
          .single();
        
        if (insertError) {
          console.error('خطأ في إنشاء ملف جديد:', insertError);
          throw insertError;
        }
        
        // Invalidate cache
        delete profileCache[user.id];
        
        return newUser;
      } else {
        console.error('خطأ في تحديث الملف الشخصي:', error);
        throw error;
      }
    }
    
    // Invalidate cache
    delete profileCache[user.id];
    
    return data;
  } catch (error) {
    console.error('خطأ في تحديث معلومات الملف الشخصي:', error);
    throw error;
  }
}
