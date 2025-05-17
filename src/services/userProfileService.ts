
import { supabase } from '@/integrations/supabase/client';

/**
 * واجهة بيانات الملف الشخصي للمستخدم
 */
export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  username?: string;
  phone?: string;
  avatar_url?: string;
  profile_image?: string;
}

/**
 * الحصول على معلومات الملف الشخصي للمستخدم الحالي
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    // التحقق من وجود المستخدم أولاً قبل جلب البيانات
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    // استخدم maybeSingle للتعامل مع الحالة التي لا يوجد فيها ملف شخصي بعد
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
      
    if (error) {
      console.error('خطأ في جلب الملف الشخصي:', error);
      throw error;
    }
    
    // إذا لم يكن المستخدم موجودًا، نعيد معلومات أساسية
    if (!data) {
      return {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        username: user.email?.split('@')[0] || '',
      };
    }
    
    return data;
  } catch (error) {
    console.error('خطأ في جلب معلومات الملف الشخصي:', error);
    throw error;
  }
}

/**
 * تحديث معلومات الملف الشخصي للمستخدم الحالي
 * @param updates التحديثات المراد إجراؤها على الملف الشخصي
 */
export async function updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');

    // إذا تم تقديم اسم، قم أيضًا بتحديث بيانات تعريف المستخدم
    if (updates.name) {
      const { error: updateMetaError } = await supabase.auth.updateUser({
        data: { name: updates.name }
      });
      
      if (updateMetaError) {
        console.warn('تحذير: لم يتم تحديث بيانات المستخدم الوصفية:', updateMetaError);
      }
    }
    
    // أولاً، تحقق مما إذا كان المستخدم موجودًا
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();
      
    if (checkError) {
      console.error('خطأ في التحقق من وجود المستخدم:', checkError);
      throw checkError;
    }

    let result;
    
    // إذا لم يكن المستخدم موجودًا، قم بإنشائه
    if (!existingUser) {
      const userData = {
        id: user.id,
        email: user.email,
        name: updates.name || user.user_metadata?.name || user.email?.split('@')[0] || '',
        username: updates.username || user.email?.split('@')[0] || '',
        phone: updates.phone || null,
        profile_image: updates.profile_image || null,
      };
      
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();
        
      if (insertError) {
        console.error('خطأ في إنشاء ملف المستخدم:', insertError);
        throw insertError;
      }
      
      result = newUser;
    } else {
      // إذا كان المستخدم موجودًا، قم بتحديث بياناته
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
        
      if (updateError) {
        console.error('خطأ في تحديث ملف المستخدم:', updateError);
        throw updateError;
      }
      
      result = updatedUser;
    }
    
    return result;
  } catch (error) {
    console.error('خطأ في تحديث معلومات الملف الشخصي:', error);
    throw error;
  }
}

/**
 * حذف الملف الشخصي للمستخدم
 */
export async function deleteUserProfile(): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    // حذف الملف الشخصي من جدول المستخدمين
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', user.id);
      
    if (error) {
      console.error('خطأ في حذف الملف الشخصي:', error);
      throw error;
    }
  } catch (error) {
    console.error('خطأ في حذف الملف الشخصي:', error);
    throw error;
  }
}
