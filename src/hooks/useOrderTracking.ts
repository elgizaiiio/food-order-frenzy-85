
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
          setOrderState(prevState => ({
            ...prevState,
            status: data.status || 'pending',
            estimatedDeliveryTime: data.estimated_delivery_time || null,
            driver: {
              ...prevState.driver,
              name: data.driver_name || null,
              phone: data.driver_phone || null
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
          estimatedDeliveryTime: data.estimated_delivery_time || prevState.estimatedDeliveryTime,
          driver: {
            ...prevState.driver,
            name: data.driver_name || prevState.driver.name,
            phone: data.driver_phone || prevState.driver.phone
          },
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
