
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PharmacyTracking: React.FC = () => {
  // Mock order data
  const orderData = {
    orderNumber: '#12345',
    status: 'processing', // processing, preparing, delivering, delivered
    estimatedTime: '30-45 دقيقة',
    address: 'شارع الملك فهد، الرياض',
    total: 70,
    pharmacyName: 'صيدلية النهدي'
  };

  // Get status text and percentage based on status
  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'processing':
        return { text: 'طلبك وصلنا وهنشتغل عليه', percentage: 25 };
      case 'preparing':
        return { text: 'جاري تجهيز طلبك', percentage: 50 };
      case 'delivering':
        return { text: 'طلبك في الطريق إليك', percentage: 75 };
      case 'delivered':
        return { text: 'تم توصيل طلبك', percentage: 100 };
      default:
        return { text: 'طلبك وصلنا', percentage: 25 };
    }
  };

  const statusDetails = getStatusDetails(orderData.status);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-brand-500 text-white p-4 pt-10 rounded-b-3xl">
          <Link to="/" className="text-white flex items-center mb-6">
            <ChevronLeft className="w-6 h-6" />
            <span className="font-medium">الرئيسية</span>
          </Link>
          
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold mb-2">تتبع طلبك</h1>
            <p className="text-sm opacity-80">رقم الطلب {orderData.orderNumber}</p>
          </div>
          
          <div className="bg-white text-gray-800 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-5 h-5 text-brand-500" />
                <span className="text-sm">الوقت المتوقع للوصول</span>
              </div>
              <span className="font-bold">{orderData.estimatedTime}</span>
            </div>
            
            <div className="h-2 w-full bg-gray-100 rounded-full mb-2">
              <div 
                className="h-2 bg-brand-500 rounded-full" 
                style={{ width: `${statusDetails.percentage}%` }}
              ></div>
            </div>
            
            <div className="text-center my-3">
              <p className="text-sm font-medium text-gray-600">{statusDetails.text}</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="p-6">
          <div className="border-b pb-4 mb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-brand-500" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{orderData.pharmacyName}</h2>
                <p className="text-sm text-gray-500">طلبك من صيدلية النهدي</p>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-brand-500" />
              <h3 className="font-bold">عنوان التوصيل</h3>
            </div>
            <p className="text-gray-600">{orderData.address}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="font-bold mb-2">تفاصيل الدفع</h3>
            <div className="flex justify-between items-center">
              <span>المبلغ الإجمالي</span>
              <span className="font-bold">{orderData.total} ريال</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-8">
              طلبك وصلنا، هيوصلك قريب جدًا وبنتمنالك شفاء قريب
            </p>
            
            <Link to="/">
              <Button className="bg-brand-500 w-full py-6">
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyTracking;
