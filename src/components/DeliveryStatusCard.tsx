
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Clock, DollarSign, X, Info } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DeliveryRequest } from '@/services/deliveryService';
import { useCancelDeliveryRequest } from '@/hooks/useDeliveryData';

// تخصيص ألوان الحالات المختلفة
const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  accepted: 'bg-blue-100 text-blue-800 border-blue-200',
  picked_up: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-gray-100 text-gray-800 border-gray-200',
};

// ترجمة الحالات للغة العربية
const statusTranslation: Record<string, string> = {
  pending: 'بانتظار سائق',
  accepted: 'تم قبول الطلب',
  picked_up: 'تم الاستلام',
  delivered: 'تم التوصيل',
  cancelled: 'ملغي',
};

interface DeliveryStatusCardProps {
  delivery: DeliveryRequest;
  onStatusChange?: () => void;
}

const DeliveryStatusCard: React.FC<DeliveryStatusCardProps> = ({ 
  delivery,
  onStatusChange 
}) => {
  const navigate = useNavigate();
  const cancelDelivery = useCancelDeliveryRequest();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  // التاريخ بتنسيق مقروء
  const formattedDate = delivery.created_at 
    ? new Date(delivery.created_at).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';
  
  const handleCancelDelivery = async () => {
    try {
      if (!delivery.id) return;
      
      await cancelDelivery.mutateAsync(delivery.id);
      toast.success("تم إلغاء طلب التوصيل بنجاح");
      setShowCancelDialog(false);
      if (onStatusChange) onStatusChange();
    } catch (error) {
      console.error('Error cancelling delivery:', error);
      toast.error("حدث خطأ أثناء إلغاء الطلب");
    }
  };
  
  const handleViewDetails = () => {
    if (delivery.id) {
      navigate(`/delivery-tracking/${delivery.id}`);
    }
  };
  
  const isDeliveryActive = delivery.status !== 'delivered' && delivery.status !== 'cancelled';
  
  return (
    <Card className={`border-2 ${delivery.status ? statusColors[delivery.status].split(' ')[2] || '' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className={`${delivery.status ? statusColors[delivery.status] : ''} font-semibold`}>
            {delivery.status ? statusTranslation[delivery.status] : 'غير معروف'}
          </Badge>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
      </CardHeader>
      
      <CardContent className="py-3 space-y-3">
        <div className="flex items-start">
          <Package className="w-5 h-5 text-blue-600 mt-1 ml-2 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">المحتويات</p>
            <p className="text-sm text-gray-600 line-clamp-1">{delivery.items_description}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-green-600 mt-1 ml-2 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">من</p>
            <p className="text-sm text-gray-600 line-clamp-1">{delivery.pickup_address}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-red-600 mt-1 ml-2 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">إلى</p>
            <p className="text-sm text-gray-600 line-clamp-1">{delivery.delivery_address}</p>
          </div>
        </div>
        
        {delivery.estimated_price && (
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-yellow-600 ml-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">التكلفة التقديرية</p>
              <p className="text-sm text-gray-600">{delivery.estimated_price} ريال</p>
            </div>
          </div>
        )}
        
        {delivery.estimated_delivery_time && (
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-purple-600 ml-2 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">وقت التوصيل المتوقع</p>
              <p className="text-sm text-gray-600">{delivery.estimated_delivery_time}</p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={handleViewDetails}
        >
          <Info className="w-4 h-4 ml-1" />
          عرض التفاصيل
        </Button>
        
        {isDeliveryActive && (
          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <DialogTrigger asChild>
              <Button 
                variant="destructive" 
                size="sm" 
                className="text-xs"
                disabled={cancelDelivery.isPending || delivery.status === 'picked_up'}
              >
                <X className="w-4 h-4 ml-1" />
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
        )}
      </CardFooter>
    </Card>
  );
};

export default DeliveryStatusCard;
