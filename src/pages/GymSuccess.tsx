
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Home, Calendar, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type GymInfo = {
  id: string;
  name: string;
  image: string;
};

type PlanInfo = {
  id: string;
  title: string;
  duration: string;
  price: number;
  features: string[];
};

type PaymentInfo = {
  name: string;
  phone: string;
  paymentMethod: string;
};

const GymSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gym, plan, payment } = location.state as { 
    gym: GymInfo; 
    plan: PlanInfo;
    payment: PaymentInfo;
  };

  // Generate random access code
  const accessCode = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  // Calculate expiry date based on plan
  const today = new Date();
  let expiryDate = new Date();
  
  if (plan.id === 'monthly') {
    expiryDate.setMonth(today.getMonth() + 1);
  } else if (plan.id === 'quarterly') {
    expiryDate.setMonth(today.getMonth() + 3);
  } else if (plan.id === 'yearly') {
    expiryDate.setFullYear(today.getFullYear() + 1);
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <div className="w-6"></div> {/* Empty div for spacing */}
          <h1 className="text-xl font-bold">بطاقة العضوية</h1>
          <Link to="/gym" className="text-gray-700">
            <Home className="w-6 h-6" />
          </Link>
        </div>

        {/* Success message */}
        <div className="px-4 pt-6 pb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">تم تأكيد اشتراكك بنجاح</h2>
          <p className="text-gray-600 mt-2">يمكنك استخدام بطاقة العضوية الرقمية للوصول إلى النادي</p>
        </div>

        {/* Digital membership card */}
        <div className="px-4">
          <Card className="overflow-hidden border-2 border-brand-500">
            <div className="bg-brand-500 p-4 text-white">
              <h3 className="text-xl font-bold">{gym.name}</h3>
              <p className="text-sm opacity-90">اشتراك {plan.title}</p>
            </div>
            
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">الاسم</p>
                  <p className="font-bold">{payment.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">رمز الوصول</p>
                  <p className="font-bold text-brand-700">{accessCode}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">تاريخ البدء</p>
                  <p className="font-bold">{formatDate(today)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">تاريخ الانتهاء</p>
                  <p className="font-bold">{formatDate(expiryDate)}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 flex justify-center items-center">
                <QrCode className="w-32 h-32 text-brand-700" />
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-3">
                قم بمسح رمز QR عند بوابة النادي للدخول
              </p>
            </CardContent>
          </Card>
          
          <div className="mt-8 space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-brand-200 text-brand-700"
              onClick={() => navigate('/gym/subscriptions')}
            >
              عرض اشتراكاتي
            </Button>
            
            <Button 
              className="w-full bg-brand-500 hover:bg-brand-600"
              onClick={() => navigate('/gym')}
            >
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymSuccess;
