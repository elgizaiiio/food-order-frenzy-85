
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // تسجيل الدخول مرة أخرى للتحقق من كلمة المرور الحالية
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !currentUser?.email) {
        throw new Error('لم يتم العثور على المستخدم. يرجى تسجيل الدخول وإعادة المحاولة.');
      }
      
      // التحقق من صحة كلمة المرور الحالية
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentUser.email,
        password: currentPassword
      });
      
      if (signInError) {
        throw new Error('كلمة المرور الحالية غير صحيحة');
      }
      
      // تحديث كلمة المرور
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (updateError) {
        throw updateError;
      }
      
      toast.success('تم تغيير كلمة المرور بنجاح');
      return true;
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تغيير كلمة المرور');
      toast.error(err.message || 'حدث خطأ أثناء تغيير كلمة المرور');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { changePassword, isLoading, error };
}
