
import { supabase } from '@/integrations/supabase/client';

// واجهة بيانات العنوان
export interface UserAddress {
  id: string;
  title: string;
  fullAddress: string;
  phone: string;
  isDefault?: boolean;
  // Add these aliases for backward compatibility
  label?: string; 
  full_address?: string;
  is_default?: boolean;
}

// واجهة بيانات طريقة الدفع
export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  isDefault?: boolean;
  // Add alias for backward compatibility
  is_default?: boolean;
}

/**
 * استرجاع عناوين المستخدم
 */
export async function fetchUserAddresses(): Promise<UserAddress[]> {
  try {
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    // جلب العناوين من سوبابيس
    const { data, error } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    
    if (error) throw error;
    
    // تحويل البيانات إلى الصيغة المطلوبة
    return data.map(address => ({
      id: address.id,
      title: address.label,
      fullAddress: address.full_address,
      label: address.label, // Add alias
      full_address: address.full_address, // Add alias
      phone: address.phone_number,
      isDefault: address.is_default,
      is_default: address.is_default // Add alias
    }));
  } catch (error) {
    console.error('خطأ في استرجاع العناوين:', error);
    throw error;
  }
}

/**
 * إضافة عنوان جديد للمستخدم
 */
export async function addUserAddress(addressData: Omit<UserAddress, 'id'>): Promise<UserAddress> {
  try {
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول لإضافة عنوان');
    
    // التحقق ما إذا كان هذا هو العنوان الافتراضي
    const isDefault = addressData.isDefault || false;
    
    // إذا كان العنوان افتراضيًا، إلغاء تعيين العناوين الأخرى كافتراضية
    if (isDefault) {
      await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);
    }
    
    // إضافة العنوان الجديد
    const { data, error } = await supabase
      .from('user_addresses')
      .insert({
        user_id: user.id,
        label: addressData.title,
        full_address: addressData.fullAddress,
        phone_number: addressData.phone,
        is_default: isDefault,
        city: addressData.fullAddress.split(',').pop()?.trim() || 'غير معروف'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.label,
      fullAddress: data.full_address,
      phone: data.phone_number,
      isDefault: data.is_default
    };
  } catch (error) {
    console.error('خطأ في إضافة العنوان:', error);
    throw error;
  }
}

/**
 * حذف عنوان للمستخدم
 */
export async function deleteUserAddress(addressId: string): Promise<void> {
  try {
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول لحذف عنوان');
    
    // تحقق إذا كان العنوان المحذوف هو العنوان الافتراضي
    const { data: addressData } = await supabase
      .from('user_addresses')
      .select('is_default')
      .eq('id', addressId)
      .eq('user_id', user.id)
      .single();
    
    // حذف العنوان
    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    // إذا كان العنوان المحذوف هو العنوان الافتراضي، قم بتعيين أول عنوان آخر كعنوان افتراضي
    if (addressData?.is_default) {
      const { data: addresses } = await supabase
        .from('user_addresses')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);
      
      if (addresses && addresses.length > 0) {
        await supabase
          .from('user_addresses')
          .update({ is_default: true })
          .eq('id', addresses[0].id);
      }
    }
  } catch (error) {
    console.error('خطأ في حذف العنوان:', error);
    throw error;
  }
}

/**
 * تعيين عنوان كعنوان افتراضي
 */
export async function setDefaultAddress(addressId: string): Promise<void> {
  try {
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول لتعيين العنوان الافتراضي');
    
    // إلغاء تعيين جميع العناوين كعناوين افتراضية
    await supabase
      .from('user_addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
    
    // تعيين العنوان المحدد كعنوان افتراضي
    const { error } = await supabase
      .from('user_addresses')
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
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    // جلب طرق الدفع من سوبابيس
    const { data, error } = await supabase
      .from('user_payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    
    if (error) throw error;
    
    // تحويل البيانات إلى الصيغة المطلوبة
    return data.map(method => ({
      id: method.id,
      type: method.type || 'card',
      last4: method.last4 || '****',
      isDefault: method.is_default
    }));
  } catch (error) {
    console.error('خطأ في استرجاع طرق الدفع:', error);
    throw error;
  }
}

/**
 * إضافة طريقة دفع جديدة
 */
export async function addPaymentMethod(methodData: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
  try {
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول لإضافة طريقة دفع');
    
    // التحقق ما إذا كان هذا هو طريقة الدفع الافتراضية
    const isDefault = methodData.isDefault || false;
    
    // إذا كانت طريقة الدفع افتراضية، إلغاء تعيين الطرق الأخرى كافتراضية
    if (isDefault) {
      await supabase
        .from('user_payment_methods')
        .update({ is_default: false })
        .eq('user_id', user.id);
    }
    
    // إضافة طريقة الدفع الجديدة
    const { data, error } = await supabase
      .from('user_payment_methods')
      .insert({
        user_id: user.id,
        type: methodData.type,
        last4: methodData.last4,
        is_default: isDefault
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      type: data.type,
      last4: data.last4,
      isDefault: data.is_default
    };
  } catch (error) {
    console.error('خطأ في إضافة طريقة الدفع:', error);
    throw error;
  }
}

/**
 * تعيين طريقة دفع كطريقة افتراضية
 */
export async function setDefaultPaymentMethod(methodId: string): Promise<void> {
  try {
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول لتعيين طريقة الدفع الافتراضية');
    
    // إلغاء تعيين جميع طرق الدفع كطرق افتراضية
    await supabase
      .from('user_payment_methods')
      .update({ is_default: false })
      .eq('user_id', user.id);
    
    // تعيين طريقة الدفع المحددة كطريقة افتراضية
    const { error } = await supabase
      .from('user_payment_methods')
      .update({ is_default: true })
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
    // الحصول على المستخدم المسجل دخوله
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول لحذف طريقة الدفع');
    
    // تحقق إذا كانت طريقة الدفع المحذوفة هي الطريقة الافتراضية
    const { data: methodData } = await supabase
      .from('user_payment_methods')
      .select('is_default')
      .eq('id', methodId)
      .eq('user_id', user.id)
      .single();
    
    // حذف طريقة الدفع
    const { error } = await supabase
      .from('user_payment_methods')
      .delete()
      .eq('id', methodId)
      .eq('user_id', user.id);
    
    if (error) throw error;
    
    // إذا كانت طريقة الدفع المحذوفة هي الطريقة الافتراضية، قم بتعيين أول طريقة أخرى كطريقة افتراضية
    if (methodData?.is_default) {
      const { data: methods } = await supabase
        .from('user_payment_methods')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);
      
      if (methods && methods.length > 0) {
        await supabase
          .from('user_payment_methods')
          .update({ is_default: true })
          .eq('id', methods[0].id);
      }
    }
  } catch (error) {
    console.error('خطأ في حذف طريقة الدفع:', error);
    throw error;
  }
}
