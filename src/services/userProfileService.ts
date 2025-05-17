
import { supabase } from '@/integrations/supabase/client';
import { getActiveProfileImage } from './storageService';

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
 * يستخدم الملف الشخصي الموجود أو ينشئ ملفًا شخصيًا جديدًا إذا لم يكن موجودًا
 */
export async function getUserProfile(): Promise<UserProfile> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    console.log("جلب ملف المستخدم:", user.id);
    
    // محاولة جلب الملف الشخصي الحالي
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
      
    if (error) {
      console.error('خطأ في جلب الملف الشخصي:', error);
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
    
    // الحصول على صورة الملف الشخصي النشطة
    const activeProfileImage = await getActiveProfileImage();
    
    // إذا لم يكن المستخدم موجودًا، نعيد معلومات أساسية
    if (!data) {
      const basicProfile = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        username: user.email?.split('@')[0] || '',
        profile_image: activeProfileImage || undefined
      };
      
      console.log("لم يتم العثور على ملف شخصي، استخدام ملف أساسي:", basicProfile);
      return basicProfile;
    }
    
    // إضافة صورة الملف الشخصي النشطة إلى البيانات المسترجعة
    return {
      ...data,
      profile_image: activeProfileImage || data.profile_image || data.avatar_url
    };
  } catch (error) {
    console.error('خطأ في جلب معلومات الملف الشخصي:', error);
    throw error;
  }
}

/**
 * تحديث معلومات الملف الشخصي للمستخدم الحالي
 * @param updates التحديثات المراد إجراؤها على الملف الشخصي
 */
export async function updateUserProfile(updates: Partial<UserProfile>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');
    
    console.log("تحديث ملف المستخدم:", user.id, "بالبيانات:", updates);
    
    // خطوة 1: محاولة تحديث بيانات المستخدم
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .maybeSingle();
    
    if (error) {
      console.error('خطأ في تحديث الملف الشخصي:', error);
      
      // إذا كان الخطأ بسبب عدم وجود المستخدم، سنقوم بإنشائه
      if (error.code === 'PGRST204' || error.message?.includes('No rows found')) {
        console.log("لم يتم العثور على ملف المستخدم، إنشاء ملف جديد");
        
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
        
        console.log("تم إنشاء ملف مستخدم جديد:", newUser);
        return newUser;
      } else {
        throw error;
      }
    }
    
    console.log("تم تحديث ملف المستخدم:", data);
    return data;
  } catch (error) {
    console.error('خطأ في تحديث معلومات الملف الشخصي:', error);
    throw error;
  }
}
