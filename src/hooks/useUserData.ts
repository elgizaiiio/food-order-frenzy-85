import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  fetchUserAddresses, 
  addUserAddress,
  deleteUserAddress,
  setDefaultAddress, 
  fetchUserPaymentMethods, 
  addPaymentMethod, 
  setDefaultPaymentMethod,
  deletePaymentMethod,
  UserAddress,
  PaymentMethod
} from '@/services/userService';
import { getUserProfile, updateUserProfile, UserProfile, clearProfileCache } from '@/services/userProfileService';
import { addProfileImage } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';

// Constants for cache configuration
const USER_DATA_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const USER_DATA_GC_TIME = 10 * 60 * 1000; // 10 minutes

// تنفيذ نظام متطور للتخزين المؤقت لتحسين الأداء
export function useUserAddresses() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-addresses', user?.id],
    queryFn: fetchUserAddresses,
    staleTime: USER_DATA_STALE_TIME,
    gcTime: USER_DATA_GC_TIME,
    enabled: !!user?.id,
    // تحسين تجربة المستخدم
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useAddUserAddress() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: addUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
    },
  });
}

export function useDeleteUserAddress() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: deleteUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-addresses', user?.id] });
    },
  });
}

export function useUserPaymentMethods() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-payment-methods', user?.id],
    queryFn: fetchUserPaymentMethods,
    staleTime: USER_DATA_STALE_TIME,
    gcTime: USER_DATA_GC_TIME,
    enabled: !!user?.id,
    // Optimize for better user experience
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useAddPaymentMethod() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: addPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-payment-methods', user?.id] });
    },
  });
}

export function useSetDefaultPaymentMethod() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: setDefaultPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-payment-methods', user?.id] });
    },
  });
}

export function useDeletePaymentMethod() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: deletePaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-payment-methods', user?.id] });
    },
  });
}

export function useUserProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: getUserProfile,
    staleTime: USER_DATA_STALE_TIME / 2, // نصف الوقت للتأكد من تحديث البيانات
    gcTime: USER_DATA_GC_TIME,
    enabled: !!user?.id,
    retry: 2,
    refetchOnWindowFocus: false, 
    // تعطيل التحميل التلقائي عند تفعيل النافذة لمنع التأثير على الأداء
    refetchOnMount: true, // تحديث البيانات عند تحميل المكون
    meta: {
      onError: (error: any) => {
        console.error('خطأ في استرجاع بيانات الملف الشخصي:', error);
      }
    }
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedProfile) => {
      console.log('تم تحديث الملف الشخصي بنجاح:', updatedProfile);
      
      // مسح الكاش لضمان تحديث البيانات
      clearProfileCache();
      
      // تحديث البيانات المخزنة مؤقتاً
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
      
      // تحديث جميع الاستعلامات المتعلقة بالمستخدم
      queryClient.invalidateQueries({ 
        predicate: (query) => (query.queryKey[0] as string).startsWith('user-')
      });
    },
    // إظهار التحديثات المتفائلة لتحسين الأداء المتصور
    onMutate: async (newData) => {
      // إلغاء أي استعلامات خارجية
      await queryClient.cancelQueries({ queryKey: ['user-profile', user?.id] });
      
      // لقطة للقيمة السابقة
      const previousProfile = queryClient.getQueryData(['user-profile', user?.id]);
      
      // تحديث متفائل
      queryClient.setQueryData(['user-profile', user?.id], (old: any) => ({
        ...old,
        ...newData
      }));
      
      // إرجاع كائن السياق مع القيمة التي تم التقاطها
      return { previousProfile };
    },
    onError: (err, newProfile, context) => {
      console.error('خطأ في تحديث الملف الشخصي:', err);
      if (context?.previousProfile) {
        // إذا كان هناك خطأ، قم بالتراجع
        queryClient.setQueryData(
          ['user-profile', user?.id],
          context.previousProfile
        );
      }
    },
    onSettled: () => {
      // إعادة طلب البيانات المحدثة بعد نجاح أو فشل التحديث
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    }
  });
}

/**
 * Hook لرفع صورة الملف الشخصي
 */
export function useUploadProfileImage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: addProfileImage,
    onSuccess: (data) => {
      console.log('تم رفع الصورة بنجاح، تحديث ذاكرة التخزين المؤقت', data);
      
      // مسح الكاش لضمان تحديث البيانات
      clearProfileCache();
      
      // تحديث ذاكرة التخزين المؤقت للملف الشخصي
      queryClient.setQueryData(['user-profile', user?.id], (oldData: UserProfile | undefined) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          profile_image: data.image_url
        };
      });
      
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    },
    onError: (error) => {
      console.error('خطأ في رفع صورة الملف الشخصي:', error);
    }
  });
}
