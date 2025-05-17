
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// تحميل صورة إلى Supabase Storage
export async function uploadFile(file: File, bucket: string = 'public') {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
    
    if (error) {
      throw error;
    }
    
    // الحصول على URL العام للملف
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
      
    return {
      path: data.path,
      publicUrl
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// حذف ملف من Supabase Storage
export async function deleteFile(filePath: string, bucket: string = 'public') {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);
      
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// تحميل صورة ملف شخصي للمستخدم وتحديث بيانات المستخدم
export async function uploadProfileImage(file: File, userId: string) {
  try {
    // تحميل الصورة إلى تخزين Supabase
    const { publicUrl } = await uploadFile(file, 'avatars');
    
    // تحديث بيانات المستخدم بمسار الصورة الجديدة
    const { error } = await supabase
      .from('users')
      .update({
        profile_image: publicUrl
      })
      .eq('id', userId);
    
    if (error) {
      throw error;
    }
    
    return { publicUrl };
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}
