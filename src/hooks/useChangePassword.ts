
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون على الأقل 6 أحرف');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // الحصول على المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('يجب تسجيل الدخول أولاً');
      }

      // تغيير كلمة المرور
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) throw error;

      toast.success('تم تغيير كلمة المرور بنجاح');
      return true;
    } catch (err: any) {
      console.error('خطأ في تغيير كلمة المرور:', err);
      
      if (err.message.includes('auth')) {
        setError('كلمة المرور الحالية غير صحيحة');
      } else {
        setError(err.message || 'حدث خطأ أثناء تغيير كلمة المرور');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changePassword,
    isLoading,
    error,
  };
}
