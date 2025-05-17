
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfileUpdate {
  name?: string;
  username?: string;
  phone?: string;
  profile_image?: string;
}

/**
 * Hook لتحديث بيانات الملف الشخصي للمستخدم
 */
export function useUpdateUserProfile() {
  return useMutation({
    mutationFn: async (profileData: UserProfileUpdate) => {
      // الحصول على المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("يجب تسجيل الدخول لتحديث الملف الشخصي");
      }
      
      // تحقق ما إذا كان المستخدم موجودًا بالفعل
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
        
      // إذا لم يكن موجودًا، قم بإنشاء مستخدم جديد
      if (!existingUser) {
        const { data, error } = await supabase
          .from('users')
          .insert([{
            id: user.id,
            ...profileData,
            email: user.email
          }])
          .select()
          .single();
          
        if (error) throw error;
        return data;
      } else {
        // تحديث البيانات الموجودة
        const { data, error } = await supabase
          .from('users')
          .update(profileData)
          .eq('id', user.id)
          .select()
          .single();
          
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      toast.success('تم تحديث الملف الشخصي بنجاح');
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('حدث خطأ أثناء تحديث الملف الشخصي');
    }
  });
}

interface AddressData {
  label: string;
  full_address: string;
  city?: string;
  phone_number?: string;
  is_default?: boolean;
}

/**
 * Hook لإضافة عنوان جديد
 */
export function useAddAddress() {
  return useMutation({
    mutationFn: async (addressData: AddressData) => {
      // الحصول على المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("يجب تسجيل الدخول لإضافة عنوان");
      }
      
      // إذا كان هذا العنوان افتراضيًا، قم بإلغاء تعيين العناوين الأخرى كافتراضية
      if (addressData.is_default) {
        await supabase
          .from('user_addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);
      }
      
      const { data, error } = await supabase
        .from('user_addresses')
        .insert([{
          user_id: user.id,
          ...addressData
        }])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('تم إضافة العنوان بنجاح');
    },
    onError: (error) => {
      console.error('Error adding address:', error);
      toast.error('حدث خطأ أثناء إضافة العنوان');
    }
  });
}

/**
 * Hook لحذف عنوان
 */
export function useDeleteAddress() {
  return useMutation({
    mutationFn: async (addressId: string) => {
      // الحصول على المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("يجب تسجيل الدخول لحذف عنوان");
      }
      
      // التحقق ما إذا كان العنوان المحذوف هو العنوان الافتراضي
      const { data: addressData } = await supabase
        .from('user_addresses')
        .select('is_default')
        .eq('id', addressId)
        .eq('user_id', user.id)
        .single();
      
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
      
      return { success: true };
    },
    onSuccess: () => {
      toast.success('تم حذف العنوان بنجاح');
    },
    onError: (error) => {
      console.error('Error deleting address:', error);
      toast.error('حدث خطأ أثناء حذف العنوان');
    }
  });
}

interface PaymentMethodData {
  type: string;
  last4?: string;
  is_default?: boolean;
}

/**
 * Hook لإضافة طريقة دفع جديدة
 */
export function useAddPaymentMethod() {
  return useMutation({
    mutationFn: async (paymentData: PaymentMethodData) => {
      // الحصول على المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("يجب تسجيل الدخول لإضافة طريقة دفع");
      }
      
      // إذا كانت هذه الطريقة افتراضية، قم بإلغاء تعيين الطرق الأخرى كافتراضية
      if (paymentData.is_default) {
        await supabase
          .from('user_payment_methods')
          .update({ is_default: false })
          .eq('user_id', user.id);
      }
      
      const { data, error } = await supabase
        .from('user_payment_methods')
        .insert([{
          user_id: user.id,
          ...paymentData
        }])
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('تم إضافة طريقة الدفع بنجاح');
    },
    onError: (error) => {
      console.error('Error adding payment method:', error);
      toast.error('حدث خطأ أثناء إضافة طريقة الدفع');
    }
  });
}

/**
 * Hook لحذف طريقة دفع
 */
export function useDeletePaymentMethod() {
  return useMutation({
    mutationFn: async (paymentId: string) => {
      // الحصول على المستخدم الحالي
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("يجب تسجيل الدخول لحذف طريقة الدفع");
      }
      
      // التحقق ما إذا كانت طريقة الدفع المحذوفة هي الطريقة الافتراضية
      const { data: paymentData } = await supabase
        .from('user_payment_methods')
        .select('is_default')
        .eq('id', paymentId)
        .eq('user_id', user.id)
        .single();
      
      const { error } = await supabase
        .from('user_payment_methods')
        .delete()
        .eq('id', paymentId)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // إذا كانت طريقة الدفع المحذوفة هي الطريقة الافتراضية، قم بتعيين أول طريقة أخرى كطريقة افتراضية
      if (paymentData?.is_default) {
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
      
      return { success: true };
    },
    onSuccess: () => {
      toast.success('تم حذف طريقة الدفع بنجاح');
    },
    onError: (error) => {
      console.error('Error deleting payment method:', error);
      toast.error('حدث خطأ أثناء حذف طريقة الدفع');
    }
  });
}
