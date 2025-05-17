
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
import { getUserProfile, updateUserProfile, UserProfile } from '@/services/userProfileService';
import { addProfileImage } from '@/services/storageService';
import { useAuth } from '@/context/AuthContext';

// ثوابت لتكوين التخزين المؤقت
const USER_DATA_STALE_TIME = 5 * 60 * 1000; // 5 دقائق
const USER_DATA_GC_TIME = 10 * 60 * 1000; // 10 دقائق

export function useUserAddresses() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-addresses', user?.id],
    queryFn: fetchUserAddresses,
    staleTime: USER_DATA_STALE_TIME,
    gcTime: USER_DATA_GC_TIME,
    enabled: !!user?.id,
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
    staleTime: USER_DATA_STALE_TIME,
    gcTime: USER_DATA_GC_TIME,
    enabled: !!user?.id,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
    },
  });
}

export function useUploadProfileImage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: addProfileImage,
    onSuccess: (data) => {
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
  });
}
