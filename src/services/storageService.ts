
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// Upload a file to Supabase Storage
export async function uploadFile(file: File, bucket: string = 'public') {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    console.log('Uploading file:', file.name, 'to bucket:', bucket, 'as:', filePath);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Supabase storage upload error:', error);
      throw error;
    }
    
    console.log('Upload successful:', data?.path);
    
    // Get public URL for the file
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
      
    console.log('Public URL generated:', publicUrl);
    
    return {
      path: data.path,
      publicUrl
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Delete a file from Supabase Storage
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

// Upload profile image and update user data
export async function uploadProfileImage(file: File, userId: string) {
  try {
    if (!file || !userId) {
      throw new Error('File and user ID are required');
    }
    
    console.log('Starting profile image upload for user:', userId);
    
    // Upload image to Supabase storage
    const { publicUrl } = await uploadFile(file, 'avatars');
    
    console.log('Image uploaded successfully, updating user profile with URL:', publicUrl);
    
    // Update user profile with new image path
    const { error } = await supabase
      .from('users')
      .update({
        profile_image: publicUrl
      })
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
    
    console.log('User profile updated successfully');
    
    return { publicUrl };
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}
