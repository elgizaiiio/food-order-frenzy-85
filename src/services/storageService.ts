
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * إضافة صورة الملف الشخصي
 * @param file ملف الصورة
 * @returns معلومات الصورة المضافة
 */
export async function addProfileImage(file: File): Promise<{ success: boolean; image_url: string; message?: string }> {
  try {
    if (!file) {
      throw new Error('لا يوجد ملف للتحميل');
    }

    // الحصول على معلومات المستخدم المسجل
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('يجب تسجيل الدخول أولاً');
    }

    // إنشاء معرف فريد للصورة
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}_${uuidv4()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    // تحميل الصورة إلى التخزين
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // الحصول على رابط العام للصورة
    const { data } = await supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    // تحديث معلومات صورة الملف الشخصي
    const { error: updateError } = await supabase
      .from('profile_images')
      .insert({
        user_id: user.id,
        image_url: publicUrl,
        storage_path: filePath
      });

    if (updateError) {
      console.error('خطأ في حفظ معلومات الصورة في قاعدة البيانات:', updateError);
    }

    // تحديث معلومات المستخدم
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({ profile_image: publicUrl })
      .eq('id', user.id);

    if (userUpdateError) {
      console.error('خطأ في تحديث صورة المستخدم:', userUpdateError);
    }

    return {
      success: true,
      image_url: publicUrl
    };
  } catch (error: any) {
    console.error('خطأ في تحميل الصورة:', error);
    return {
      success: false,
      image_url: '',
      message: error.message || 'حدث خطأ أثناء تحميل الصورة'
    };
  }
}
