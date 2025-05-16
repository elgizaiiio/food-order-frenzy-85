
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  fetchUserDeliveryRequests, 
  createDeliveryRequest, 
  updateDeliveryRequestStatus, 
  cancelDeliveryRequest,
  getDeliveryRequestDetails,
  estimateDeliveryPrice,
  DeliveryRequest,
  DeliveryStatus
} from '@/services/deliveryService';
import { useAuth } from '@/context/AuthContext';

// ثوابت لتكوين ذاكرة التخزين المؤقت
const DELIVERY_DATA_STALE_TIME = 2 * 60 * 1000; // دقيقتان
const DELIVERY_DATA_GC_TIME = 5 * 60 * 1000; // 5 دقائق

export function useUserDeliveryRequests() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-delivery-requests', user?.id],
    queryFn: fetchUserDeliveryRequests,
    staleTime: DELIVERY_DATA_STALE_TIME,
    gcTime: DELIVERY_DATA_GC_TIME,
    enabled: !!user?.id,
    retry: 1,
    refetchOnWindowFocus: true,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching delivery requests:', error);
      }
    }
  });
}

export function useDeliveryRequestDetails(requestId: string | undefined) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['delivery-request', requestId],
    queryFn: () => requestId ? getDeliveryRequestDetails(requestId) : Promise.reject('No request ID provided'),
    staleTime: DELIVERY_DATA_STALE_TIME,
    gcTime: DELIVERY_DATA_GC_TIME,
    enabled: !!user?.id && !!requestId,
    retry: 1,
    refetchOnWindowFocus: true,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching delivery request details:', error);
      }
    }
  });
}

export function useCreateDeliveryRequest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: createDeliveryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-delivery-requests', user?.id] });
    },
  });
}

export function useUpdateDeliveryStatus() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: ({ requestId, status }: { requestId: string; status: DeliveryStatus }) => 
      updateDeliveryRequestStatus(requestId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-request', variables.requestId] });
      queryClient.invalidateQueries({ queryKey: ['user-delivery-requests', user?.id] });
    },
  });
}

export function useCancelDeliveryRequest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: cancelDeliveryRequest,
    onSuccess: (_, requestId) => {
      queryClient.invalidateQueries({ queryKey: ['delivery-request', requestId] });
      queryClient.invalidateQueries({ queryKey: ['user-delivery-requests', user?.id] });
    },
  });
}

export function useEstimateDelivery() {
  return useMutation({
    mutationFn: ({ pickupAddress, deliveryAddress }: { pickupAddress: string; deliveryAddress: string }) => 
      estimateDeliveryPrice(pickupAddress, deliveryAddress),
  });
}
