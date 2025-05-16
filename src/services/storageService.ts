
import { supabase } from '@/integrations/supabase/client';

/**
 * التأكد من وجود دلو التخزين أو إنشائه إذا لم يكن موجوداً
 * @param bucketName اسم دلو التخزين
 * @returns وعد يحل إلى حالة نجاح أو فشل العملية
 */
export const ensureStorageBucket = async (bucketName: string): Promise<boolean> => {
  try {
    console.log(`التحقق من وجود البكت: ${bucketName}`);
    
    // محاولة جلب معلومات البكت للتحقق من وجوده
    const { data, error } = await supabase.storage.getBucket(bucketName);
    
    // إذا لم يكن البكت موجوداً، نقوم بإنشائه
    if (error && error.message?.includes('not found')) {
      console.log(`البكت ${bucketName} غير موجود، سيتم إنشائه`);
      
      const { data: newBucket, error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024 // 5MB
      });
      
      if (createError) {
        console.error('خطأ في إنشاء البكت:', createError);
        return false;
      }
      
      console.log(`تم إنشاء البكت ${bucketName} بنجاح`);
      
      // إنشاء سياسات أمان للبكت تسمح بالقراءة والكتابة للمستخدمين المسجلين
      try {
        // هذه العملية قد تحتاج صلاحيات خاصة وقد لا تعمل مباشرة من الواجهة الأمامية
        console.log('سيتم محاولة إنشاء سياسات RLS للبكت');
      } catch (policyError) {
        console.error('تم إنشاء البكت لكن قد تكون هناك حاجة لضبط سياسات RLS يدوياً');
      }
      
      return true;
    } else if (error) {
      console.error('خطأ غير متوقع أثناء التحقق من البكت:', error);
      return false;
    }
    
    console.log(`البكت ${bucketName} موجود بالفعل`);
    return true;
  } catch (error) {
    console.error('خطأ في التحقق من البكت:', error);
    return false;
  }
};

/**
 * رفع ملف إلى التخزين مع التحقق من وجود دلو التخزين
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
    // التأكد من وجود البكت أولاً
    const bucketReady = await ensureStorageBucket(bucketName);
    if (!bucketReady) {
      throw new Error("فشل في إعداد مساحة التخزين");
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
      throw error;
    }

    // الحصول على URL العام للملف
    const { data: publicURL } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicURL.publicUrl;
  } catch (error) {
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
