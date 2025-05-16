
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Truck, Plus, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { useUserDeliveryRequests } from '@/hooks/useDeliveryData';
import DeliveryStatusCard from '@/components/DeliveryStatusCard';
import AuthGuard from '@/components/AuthGuard';

const DeliveryTracking: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: deliveryRequests, isLoading, error, refetch } = useUserDeliveryRequests();
  
  useEffect(() => {
    if (error) {
      console.error('Error fetching delivery requests:', error);
      toast.error('حدث خطأ أثناء تحميل طلبات التوصيل');
    }
  }, [error]);
  
  const handleNewRequest = () => {
    navigate('/delivery-request');
  };
  
  const activeDeliveries = deliveryRequests?.filter(
    del => del.status !== 'delivered' && del.status !== 'cancelled'
  ) || [];
  
  const completedDeliveries = deliveryRequests?.filter(
    del => del.status === 'delivered' || del.status === 'cancelled'
  ) || [];
  
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white pb-20">
          {/* رأس الصفحة */}
          <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b z-10">
            <Link to="/" className="text-gray-700">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">تتبع طلبات التوصيل</h1>
            <div className="w-6"></div>
          </div>
          
          {/* زر طلب توصيل جديد */}
          <div className="p-4">
            <Button onClick={handleNewRequest} className="w-full bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 ml-2" />
              طلب توصيل جديد
            </Button>
          </div>
          
          {/* علامات التبويب للطلبات */}
          <Tabs defaultValue="active" className="w-full">
            <div className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="active" className="flex-1">
                  الطلبات النشطة
                  {activeDeliveries.length > 0 && (
                    <span className="mr-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {activeDeliveries.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">
                  الطلبات المكتملة
                  {completedDeliveries.length > 0 && (
                    <span className="mr-2 bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {completedDeliveries.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* محتوى الطلبات النشطة */}
            <TabsContent value="active" className="mt-2">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  <Skeleton className="w-full h-32" />
                  <Skeleton className="w-full h-32" />
                </div>
              ) : activeDeliveries.length > 0 ? (
                <div className="p-4 space-y-4">
                  {activeDeliveries.map(delivery => (
                    <DeliveryStatusCard 
                      key={delivery.id} 
                      delivery={delivery} 
                      onStatusChange={refetch}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Truck className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-700 mb-2">لا توجد طلبات نشطة</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    ليس لديك أي طلبات توصيل نشطة حالياً. قم بإنشاء طلب جديد للبدء.
                  </p>
                  <Button onClick={handleNewRequest} variant="outline">
                    إنشاء طلب توصيل
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {/* محتوى الطلبات المكتملة */}
            <TabsContent value="completed" className="mt-2">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  <Skeleton className="w-full h-32" />
                  <Skeleton className="w-full h-32" />
                </div>
              ) : completedDeliveries.length > 0 ? (
                <div className="p-4 space-y-4">
                  {completedDeliveries.map(delivery => (
                    <DeliveryStatusCard 
                      key={delivery.id} 
                      delivery={delivery}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-700 mb-2">لا توجد طلبات مكتملة</h3>
                  <p className="text-sm text-gray-500">
                    لم تقم بإكمال أي طلبات توصيل بعد. ستظهر الطلبات المكتملة والملغاة هنا.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* رابط المساعدة */}
          <div className="text-center px-4 mt-6 mb-10">
            <Link to="/delivery-help" className="text-sm text-blue-600 hover:underline">
              هل تحتاج إلى مساعدة؟
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default DeliveryTracking;
