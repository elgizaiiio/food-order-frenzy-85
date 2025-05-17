
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface OrderTrackingState {
  status: string;
  estimatedDeliveryTime: string | null;
  driver: {
    name: string | null;
    phone: string | null;
    location: { lat: number; lng: number } | null;
  };
  updates: Array<{
    timestamp: string;
    message: string;
    status: string;
  }>;
}

export function useOrderTracking(orderId: string) {
  const [orderState, setOrderState] = useState<OrderTrackingState>({
    status: 'pending',
    estimatedDeliveryTime: null,
    driver: {
      name: null,
      phone: null,
      location: null
    },
    updates: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // جلب معلومات الطلب الأولية
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();
          
        if (error) throw error;
        
        // تحديث حالة الطلب
        if (data) {
          // Handle order data mapping based on the actual schema
          // The order table doesn't have driver fields, so we initialize with defaults
          setOrderState(prevState => ({
            ...prevState,
            status: data.status || 'pending',
            // Use empty values since these fields don't exist in the current schema
            estimatedDeliveryTime: null,
            driver: {
              ...prevState.driver,
              name: null,
              phone: null
            }
          }));
        }
        
      } catch (err) {
        console.error('خطأ في جلب تفاصيل الطلب:', err);
        setError(err instanceof Error ? err : new Error('خطأ غير معروف'));
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // الاشتراك في التحديثات المباشرة للطلب
  useEffect(() => {
    // تكوين قناة الاشتراك المباشر
    const channel = supabase
      .channel(`order_${orderId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'orders',
        filter: `id=eq.${orderId}`
      }, payload => {
        const data = payload.new;
        
        setOrderState(prevState => ({
          ...prevState,
          status: data.status || prevState.status,
          // We don't update the estimated delivery time or driver info since the schema doesn't have these fields
          updates: [
            {
              timestamp: new Date().toISOString(),
              message: getStatusMessage(data.status || 'pending'),
              status: data.status || 'pending'
            },
            ...prevState.updates
          ]
        }));
      })
      .subscribe();
      
    // إلغاء الاشتراك عند تفكيك المكون
    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  // وظيفة مساعدة للحصول على رسائل الحالات
  const getStatusMessage = (status: string) => {
    switch(status) {
      case 'pending': return 'تم استلام طلبك وهو قيد التجهيز';
      case 'preparing': return 'جاري تجهيز طلبك';
      case 'ready': return 'طلبك جاهز للتوصيل';
      case 'delivery': return 'جاري توصيل طلبك';
      case 'completed': return 'تم توصيل طلبك بنجاح';
      case 'cancelled': return 'تم إلغاء الطلب';
      default: return 'حالة الطلب تم تحديثها';
    }
  };

  return { orderState, loading, error };
}
