
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGyms, fetchGymById } from '@/services/gymService';
import { fetchUserSubscriptions, createSubscription } from '@/services/gymSubscriptionService';
import { GymSubscription } from '@/types/gym';
import { useAuth } from '@/context/AuthContext'; 

export function useGyms() {
  return useQuery({
    queryKey: ['gyms'],
    queryFn: fetchGyms,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useGymDetails(id: string) {
  return useQuery({
    queryKey: ['gym', id],
    queryFn: () => fetchGymById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

export function useUserSubscriptions() {
  const { user } = useAuth(); 
  
  return useQuery({
    queryKey: ['user-subscriptions', user?.id],
    queryFn: () => fetchUserSubscriptions(user?.id || ''),
    staleTime: 5 * 60 * 1000,
    enabled: !!user?.id,
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: (subscriptionData: Omit<GymSubscription, 'id' | 'created_at' | 'user_id'>) => {
      return createSubscription({
        ...subscriptionData,
        user_id: user?.id || ''
      });
    },
    onSuccess: () => {
      // Invalidate the user's subscriptions query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['user-subscriptions', user?.id] });
    },
  });
}
