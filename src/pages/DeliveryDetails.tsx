
import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Package, 
  MapPin, 
  Clock, 
  DollarSign, 
  FileText,
  Phone,
  User,
  X,
  MessageCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  useDeliveryRequestDetails,
  useCancelDeliveryRequest
} from '@/hooks/useDeliveryData';
import DeliveryTrackingMap from '@/components/DeliveryTrackingMap';
import AuthGuard from '@/components/AuthGuard';

// حالات التوصيل بالعربية
const statusSteps = [
  { key: 'pending', title: 'بانتظار سائق', icon: Package, color: 'text-yellow-500' },
  { key: 'accepted', title: 'تم قبول الطلب', icon: User, color: 'text-blue-500' },
  { key: 'picked_up', title: 'تم استلام الشحنة', icon: Package, color: 'text-purple-500' },
  { key: 'delivered', title: 'تم التوصيل', icon: MapPin, color: 'text-green-500' }
];

const DeliveryDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    data: delivery, 
    isLoading, 
    error,
    refetch 
  } = useDeliveryRequestDetails(id);
  const cancelDelivery = useCancelDeliveryRequest();
  
  useEffect(() => {
    if (error) {
      console.error('Error fetching delivery details:', error);
      toast.error('حدث خطأ أثناء تحميل تفاصيل الطلب');
      navigate('/delivery-tracking');
    }
  }, [error, navigate]);
  
  const handleCancelDelivery = async () => {
    try {
      if (!id) return;
      
      await cancelDelivery.mutateAsync(id);
      toast.success("تم إلغاء طلب التوصيل بنجاح");
      refetch();
    } catch (error) {
      console.error('Error cancelling delivery:', error);
      toast.error("حدث خطأ أثناء إلغاء الطلب");
    }
  };
  
  // حساب الخطوة الحالية في مسار التوصيل
  const getCurrentStepIndex = () => {
    if (!delivery || !delivery.status) return 0;
    
    if (delivery.status === 'cancelled') return -1;
    
    const index = statusSteps.findIndex(step => step.key === delivery.status);
    return index >= 0 ? index : 0;
  };
  
  const currentStep = getCurrentStepIndex();
  const isDeliveryActive = delivery?.status !== 'delivered' && delivery?.status !== 'cancelled';
  
  const formattedDate = delivery?.created_at 
    ? new Date(delivery.created_at).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';
  
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white pb-20">
          {/* رأس الصفحة */}
          <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b z-10">
            <Link to="/delivery-tracking" className="text-gray-700">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">تفاصيل الطلب</h1>
            <div className="w-6"></div>
          </div>
          
          {isLoading ? (
            <div className="p-4 space-y-4">
              <Skeleton className="w-full h-48" />
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-32" />
            </div>
          ) : delivery ? (
            <>
              {/* معلومات الحالة */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">حالة الطلب</h2>
                  <span className="text-sm text-gray-500">{formattedDate}</span>
                </div>
                
                {delivery.status === 'cancelled' ? (
                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <X className="w-6 h-6 text-gray-600" />
                      </div>
                      <h3 className="font-medium text-gray-700">تم إلغاء الطلب</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        تم إلغاء هذا الطلب وإغلاقه.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="relative">
                    {/* مسار خط التقدم */}
                    <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 z-0" />
                    
                    {/* خطوات التقدم */}
                    <div className="relative z-10 flex justify-between">
                      {statusSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        const isCompleted = index <= currentStep;
                        const isCurrent = index === currentStep;
                        
                        return (
                          <div key={step.key} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                              ${isCompleted ? 'bg-blue-100' : 'bg-gray-100'}
                              ${isCurrent ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
                            `}>
                              <StepIcon className={`w-6 h-6 ${isCompleted ? step.color : 'text-gray-400'}`} />
                            </div>
                            <p className={`mt-2 text-xs font-medium text-center max-w-[75px] 
                              ${isCompleted ? 'text-blue-700' : 'text-gray-500'}`
                            }>
                              {step.title}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* خريطة التتبع */}
              {delivery.status !== 'cancelled' && (
                <div className="p-4">
                  <DeliveryTrackingMap delivery={delivery} />
                </div>
              )}
              
              {/* تفاصيل الشحنة */}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3">تفاصيل الشحنة</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Package className="w-5 h-5 text-blue-600 mt-1 ml-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">المحتويات</p>
                      <p className="font-medium">{delivery.items_description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-green-600 mt-1 ml-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">عنوان الاستلام</p>
                      <p className="font-medium">{delivery.pickup_address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-red-600 mt-1 ml-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">عنوان التوصيل</p>
                      <p className="font-medium">{delivery.delivery_address}</p>
                    </div>
                  </div>
                  
                  {delivery.estimated_price && (
                    <div className="flex items-start">
                      <DollarSign className="w-5 h-5 text-yellow-600 mt-1 ml-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">التكلفة التقديرية</p>
                        <p className="font-medium">{delivery.estimated_price} ريال</p>
                      </div>
                    </div>
                  )}
                  
                  {delivery.estimated_delivery_time && (
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-purple-600 mt-1 ml-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">وقت التوصيل المتوقع</p>
                        <p className="font-medium">{delivery.estimated_delivery_time}</p>
                      </div>
                    </div>
                  )}
                  
                  {delivery.notes && (
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 text-gray-600 mt-1 ml-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">ملاحظات</p>
                        <p className="font-medium">{delivery.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              {/* معلومات السائق */}
              {delivery.driver_name && (
                <>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-3">معلومات السائق</h2>
                    
                    <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        {delivery.driver_photo ? (
                          <img 
                            src={delivery.driver_photo} 
                            alt={delivery.driver_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      
                      <div className="mr-3 flex-grow">
                        <p className="font-medium">{delivery.driver_name}</p>
                        {delivery.vehicle_details && (
                          <p className="text-sm text-gray-600">{delivery.vehicle_details}</p>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 space-x-reverse">
                        {delivery.driver_phone && (
                          <a 
                            href={`tel:${delivery.driver_phone}`}
                            className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full text-green-700"
                          >
                            <Phone className="w-5 h-5" />
                          </a>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="w-10 h-10 rounded-full"
                        >
                          <MessageCircle className="w-5 h-5 text-blue-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                </>
              )}
              
              {/* الإجراءات */}
              {isDeliveryActive && (
                <div className="p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        disabled={cancelDelivery.isPending || delivery.status === 'picked_up'}
                      >
                        <X className="w-5 h-5 ml-2" />
                        إلغاء الطلب
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%] max-w-md">
                      <DialogHeader>
                        <DialogTitle>تأكيد إلغاء طلب التوصيل</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-sm text-gray-600">
                          هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.
                        </p>
                        {delivery.status === 'accepted' && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-4">
                            <p className="text-sm text-yellow-800">
                              تم قبول الطلب بالفعل من قبل سائق. قد يتم تطبيق رسوم إلغاء.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end space-x-2 space-x-reverse">
                        <DialogClose asChild>
                          <Button variant="outline" size="sm">إلغاء</Button>
                        </DialogClose>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={handleCancelDelivery}
                          disabled={cancelDelivery.isPending}
                        >
                          {cancelDelivery.isPending ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-1"></div>
                              <span>جاري الإلغاء...</span>
                            </div>
                          ) : (
                            'تأكيد الإلغاء'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              
              {/* رابط المساعدة */}
              <div className="text-center px-4 mt-6 mb-10">
                <Link to="/delivery-help" className="text-sm text-blue-600 hover:underline">
                  هل تحتاج إلى مساعدة؟
                </Link>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">لم يتم العثور على تفاصيل الطلب</p>
              <Button 
                onClick={() => navigate('/delivery-tracking')} 
                variant="outline"
                className="mt-4"
              >
                العودة إلى طلباتي
              </Button>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default DeliveryDetails;
