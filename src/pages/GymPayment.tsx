
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Check, CreditCard, Loader2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/DatePicker';
import { toast } from 'sonner';
import { addDays, format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useCreateSubscription } from '@/hooks/useGymData';
import { useAuth } from '@/context/AuthContext';

interface PaymentMethod {
  id: string;
  type: string;
  last4?: string;
}

interface GymPaymentProps {
  location: {
    state?: {
      gymId?: string;
      gymName?: string;
      plan?: 'monthly' | 'quarterly' | 'yearly';
      price?: number;
    }
  }
}

const getPlanName = (plan: string): string => {
  switch (plan) {
    case 'monthly':
      return 'شهري';
    case 'quarterly':
      return 'ربع سنوي';
    case 'yearly':
      return 'سنوي';
    default:
      return 'غير معروف';
  }
};

const getPlanDuration = (plan: string, startDate: Date): Date => {
  switch (plan) {
    case 'monthly':
      return addDays(startDate, 30);
    case 'quarterly':
      return addDays(startDate, 90);
    case 'yearly':
      return addDays(startDate, 365);
    default:
      return addDays(startDate, 30);
  }
};

const GymPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const createSubscription = useCreateSubscription();
  
  const gymData = location.state || {};
  const { gymId, gymName, plan = 'monthly', price = 0 } = gymData;
  
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card1');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Mock payment methods (in a real app, these would be fetched from the database)
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card1',
      type: 'visa',
      last4: '4242',
    },
    {
      id: 'card2',
      type: 'mastercard',
      last4: '1234',
    }
  ];
  
  // If there's no gym data in location state, redirect to the gym page
  if (!gymId || !gymName) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <p className="mb-4">لم يتم تحديد بيانات النادي</p>
          <Link to="/gym">
            <Button>العودة إلى صفحة النوادي</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handlePayment = async () => {
    if (!user) {
      toast.error('يجب تسجيل الدخول للاشتراك');
      navigate('/login');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const endDate = format(getPlanDuration(plan, startDate), 'yyyy-MM-dd');
      
      // إنشاء اشتراك جديد
      await createSubscription.mutateAsync({
        gym_id: gymId,
        gym_name: gymName,
        plan_name: getPlanName(plan),
        start_date: format(startDate, 'yyyy-MM-dd'),
        end_date: endDate,
        price: price,
        status: 'active'
      });
      
      toast.success('تم الاشتراك بنجاح');
      
      // التوجيه إلى صفحة النجاح
      navigate('/gym/success', {
        state: {
          gymName,
          planName: getPlanName(plan),
          startDate: format(startDate, 'dd-MM-yyyy'),
          endDate: format(getPlanDuration(plan, startDate), 'dd-MM-yyyy'),
          price
        }
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error('حدث خطأ أثناء إنشاء الاشتراك');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      <div className="bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Link to={`/gym/${gymId}`} className="text-brand-600">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold mx-auto">اشتراك جديد</h1>
            <div className="w-6"></div> {/* للمحاذاة */}
          </div>
        </div>
        
        {/* Gym & Plan Info */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg mb-1">{gymName}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 ml-1" />
              <span className="text-sm">خطة {getPlanName(plan)}</span>
            </div>
            <span className="font-bold text-brand-600">{price.toFixed(0)} ر.س</span>
          </div>
        </div>
        
        {/* Start Date */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium mb-3">تاريخ بدء الاشتراك</h3>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-brand-500 ml-2" />
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              locale={ar}
              className="bg-gray-50 border border-gray-200 p-2 rounded-lg w-full"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            ينتهي الاشتراك في {format(getPlanDuration(plan, startDate), 'dd/MM/yyyy', { locale: ar })}
          </p>
        </div>
        
        {/* Payment Methods */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium mb-3">طريقة الدفع</h3>
          
          <RadioGroup
            value={selectedPaymentMethod}
            onValueChange={setSelectedPaymentMethod}
          >
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center border rounded-lg p-3">
                  <RadioGroupItem value={method.id} id={method.id} className="border-brand-400 text-brand-500" />
                  <div className="mr-2 flex items-center justify-between w-full">
                    <Label htmlFor={method.id} className="font-medium flex items-center">
                      <span className={`w-10 h-6 rounded mr-2 flex items-center justify-center ${method.type === 'visa' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {method.type === 'visa' ? 'Visa' : 'MC'}
                      </span>
                      بطاقة تنتهي بـ {method.last4}
                    </Label>
                    {selectedPaymentMethod === method.id && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
              
              <div className="border border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-gray-400 ml-2" />
                <span className="text-gray-500">إضافة بطاقة جديدة</span>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        {/* Summary & Submit */}
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">المبلغ</span>
            <span>{price.toFixed(0)} ر.س</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">ضريبة القيمة المضافة (15%)</span>
            <span>{(price * 0.15).toFixed(0)} ر.س</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-3 border-t pt-3">
            <span>الإجمالي</span>
            <span className="text-brand-600">{(price * 1.15).toFixed(0)} ر.س</span>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="fixed bottom-0 right-0 left-0 p-4 bg-white border-t border-gray-200">
        <Button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-brand-500 hover:bg-brand-600 h-14 text-lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin ml-2" />
              جاري معالجة الدفع...
            </>
          ) : (
            'إتمام الدفع'
          )}
        </Button>
      </div>
    </div>
  );
};

export default GymPayment;
