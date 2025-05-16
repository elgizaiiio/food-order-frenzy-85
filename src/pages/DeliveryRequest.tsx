
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileText, Truck } from 'lucide-react';
import DeliveryRequestForm from '@/components/DeliveryRequestForm';
import AuthGuard from '@/components/AuthGuard';

const DeliveryRequest: React.FC = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white pb-20">
          {/* رأس الصفحة */}
          <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b z-10">
            <Link to="/" className="text-gray-700">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">طلب توصيل جديد</h1>
            <div className="w-6"></div>
          </div>
          
          {/* وصف مختصر */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 mb-4">
            <div className="flex items-start">
              <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                <Truck className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-900">توصيل سريع وآمن</h2>
                <p className="text-sm text-blue-700 mt-1">
                  نوفر لك خدمة توصيل موثوقة للمستندات والطرود والطلبات بأسعار منافسة وسرعة عالية.
                </p>
              </div>
            </div>
          </div>
          
          {/* نموذج طلب التوصيل */}
          <div className="px-4 py-2">
            <DeliveryRequestForm />
          </div>
          
          {/* معلومات مساعدة */}
          <div className="px-4 mt-6 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-blue-600 mr-2" />
                <div>
                  <h3 className="font-medium text-blue-800">معلومات هامة</h3>
                  <ul className="list-disc mr-5 mt-2 text-sm text-blue-700 space-y-1">
                    <li>يمكنك تتبع طلبك مباشرةً بعد قبوله من أحد السائقين</li>
                    <li>يمكنك إلغاء الطلب مجاناً قبل قبوله من السائق</li>
                    <li>للاستفسارات، يرجى التواصل مع فريق الدعم</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
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

export default DeliveryRequest;
