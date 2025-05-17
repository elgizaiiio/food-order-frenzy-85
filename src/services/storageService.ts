
import { supabase } from '@/integrations/supabase/client';

/**
 * رفع ملف إلى التخزين
 * @param bucketName اسم دلو التخزين
 * @param filePath مسار الملف ضمن الدلو
 * @param file الملف المراد رفعه
 * @param contentType نوع محتوى الملف
 * @returns وعد يحل إلى رابط الملف العام أو null في حالة الفشل
 */
export const uploadFile = async (
  bucketName: string,
  filePath: string,
  file: File,
  contentType?: string
): Promise<string | null> => {
  try {
    console.log(`محاولة رفع ملف إلى البكت ${bucketName} في المسار ${filePath}`);
    
    // التحقق من وجود البكت
    const { data: bucket, error: bucketError } = await supabase
      .storage
      .getBucket(bucketName);
    
    if (bucketError) {
      console.error('خطأ في التحقق من دلو التخزين:', bucketError);
      throw new Error(`فشل في العثور على دلو التخزين: ${bucketError.message}`);
    }
    
    // رفع الملف إلى Supabase Storage
    const { data, error } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file, {
        upsert: true,
        contentType: contentType || file.type
      });

    if (error) {
      console.error('خطأ في رفع الملف:', error);
      throw new Error(`فشل في رفع الملف: ${error.message}`);
    }

    if (!data || !data.path) {
      throw new Error('لم يتم استلام بيانات الملف المرفوع');
    }

    console.log('تم رفع الملف بنجاح:', data.path);
    
    // الحصول على URL العام للملف
    const { data: publicURL } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(data.path);

    if (!publicURL || !publicURL.publicUrl) {
      throw new Error('فشل في الحصول على الرابط العام للملف');
    }
    
    console.log('تم الحصول على الرابط العام:', publicURL.publicUrl);
    return publicURL.publicUrl;
  } catch (error: any) {
    console.error('خطأ غير متوقع أثناء رفع الملف:', error);
    throw error;
  }
};

/**
 * حذف ملف من التخزين
 * @param bucketName اسم دلو التخزين
 * @param filePath مسار الملف ضمن الدلو
 */
export const deleteFile = async (bucketName: string, filePath: string): Promise<void> => {
  try {
    const { error } = await supabase.storage.from(bucketName).remove([filePath]);
    
    if (error) {
      console.error('خطأ في حذف الملف:', error);
      throw error;
    }
  } catch (error) {
    console.error('خطأ غير متوقع أثناء حذف الملف:', error);
    throw error;
  }
};

/**
 * استخراج اسم الملف من رابط URL
 * @param url رابط الملف
 * @returns مسار الملف النسبي في البكت
 */
export const getFilePathFromUrl = (url: string): string | null => {
  try {
    if (!url) return null;
    
    // استخراج مسار الملف من URL
    const urlObj = new URL(url);
    // استخلاص جزء المسار بعد اسم البكت
    const pathParts = urlObj.pathname.split('/');
    const bucketIndex = pathParts.findIndex(part => part === 'avatars');
    
    if (bucketIndex === -1) return null;
    
    // إرجاع المسار النسبي بدءاً من الجزء بعد اسم البكت
    return pathParts.slice(bucketIndex + 1).join('/');
  } catch (error) {
    console.error('خطأ في استخراج مسار الملف:', error);
    return null;
  }
};

/**
 * إضافة صورة الملف الشخصي للمستخدم وتسجيلها في قاعدة البيانات
 * @param file ملف الصورة
 * @returns وعد يحل إلى بيانات الصورة المضافة
 */
export const addProfileImage = async (file: File): Promise<{ image_url: string, storage_path: string }> => {
  try {
    // التحقق من المستخدم الحالي
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('يجب تسجيل الدخول لإضافة صورة شخصية');
    }
    
    // إنشاء مسار فريد للملف
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    // رفع الملف
    const imageUrl = await uploadFile('avatars', fileName, file);
    
    if (!imageUrl) {
      throw new Error('فشل في رفع الصورة');
    }
    
    // إضافة سجل الصورة إلى قاعدة البيانات
    const { data, error } = await supabase
      .from('profile_images')
      .insert({
        user_id: user.id,
        image_url: imageUrl,
        storage_path: fileName,
        is_active: true
      })
      .select('*')
      .single();
    
    if (error) {
      // إذا فشل إنشاء السجل، نحذف الملف المرفوع
      await deleteFile('avatars', fileName);
      throw error;
    }
    
    // إلغاء تنشيط جميع الصور الأخرى السابقة
    await supabase
      .from('profile_images')
      .update({ is_active: false })
      .eq('user_id', user.id)
      .neq('id', data.id);
    
    return {
      image_url: imageUrl,
      storage_path: fileName
    };
  } catch (error: any) {
    console.error('خطأ في إضافة صورة الملف الشخصي:', error);
    throw error;
  }
};

/**
 * الحصول على صورة الملف الشخصي النشطة للمستخدم
 * @returns وعد يحل إلى رابط الصورة النشطة أو null إذا لم تكن موجودة
 */
export const getActiveProfileImage = async (): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profile_images')
      .select('image_url')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .maybeSingle();
    
    if (error) {
      console.error('خطأ في الحصول على صورة الملف الشخصي:', error);
      return null;
    }
    
    return data?.image_url || null;
  } catch (error) {
    console.error('خطأ غير متوقع أثناء الحصول على صورة الملف الشخصي:', error);
    return null;
  }
};
