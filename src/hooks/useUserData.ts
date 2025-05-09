
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  fetchUserAddresses, 
  addUserAddress,
  setDefaultAddress, 
  fetchUserPaymentMethods, 
  addPaymentMethod, 
  setDefaultPaymentMethod,
  getUserProfile,
  updateUserProfile,
  UserAddress,
  PaymentMethod
} from '@/services/userService';
import { useAuth } from '@/context/AuthContext';

export function useUserAddresses() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-addresses', user?.id],
    queryFn: fetchUserAddresses,
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.id,
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
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.id,
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

export function useUserProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: getUserProfile,
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.id,
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
