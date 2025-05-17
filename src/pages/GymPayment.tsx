import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, Wallet, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import { format, addMonths, addYears } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useAuth } from '@/context/AuthContext';
import { createSubscription } from '@/services/gymService';
import { Gym } from '@/services/gymService';
import { useCreateSubscription } from '@/hooks/useGymData';

interface PaymentOptionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ id, title, icon, description }) => (
  <div className="relative">
    <RadioGroupItem value={id} id={`r-${id}`} className="peer sr-only" />
    <Label
      htmlFor={`r-${id}`}
      className="flex p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50 cursor-pointer"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ml-3">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </Label>
  </div>
);

const GymPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutateAsync: createSubscription, isPending: isSubmitting } = useCreateSubscription();
  
  // Get gym and plan details from navigation state
  const gymId = location.state?.gymId;
  const gymName = location.state?.gymName;
  const selectedPlan = location.state?.plan;
  const price = location.state?.price;
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [saveCard, setSaveCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Set document direction to right-to-left
    document.documentElement.setAttribute('dir', 'rtl');

    // Cleanup function to reset direction when component unmounts
    return () => {
      document.documentElement.removeAttribute('dir');
    };
  }, []);

  // Validation functions
  const validateCardNumber = (number: string): boolean => {
    const regex = new RegExp('^[0-9]{16}$');
    return regex.test(number.replace(/\s/g, ''));
  };

  const validateExpiryDate = (date: string): boolean => {
    const regex = new RegExp('^(0[1-9]|1[0-2])/?([0-9]{2})$');
    if (!regex.test(date)) return false;

    const [month, year] = date.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  };

  const validateCvv = (cvv: string): boolean => {
    const regex = new RegExp('^[0-9]{3}$');
    return regex.test(cvv);
  };

  // Formatting functions
  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{2,4}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }

    if (parts.length) {
      return parts.join('/');
    } else {
      return value;
    }
  };

  const formatCvv = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    return v.slice(0, 3);
  };
  
  const handlePayment = async () => {
    try {
      // Validation for card payment
      if (paymentMethod === 'card') {
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
          toast.error('يرجى إدخال جميع بيانات البطاقة');
          return;
        }
        
        if (!validateCardNumber(cardNumber)) {
          toast.error('رقم البطاقة غير صالح');
          return;
        }
        
        if (!validateExpiryDate(expiryDate)) {
          toast.error('تاريخ انتهاء البطاقة غير صالح');
          return;
        }
        
        if (!validateCvv(cvv)) {
          toast.error('رمز CVV غير صالح');
          return;
        }
      }
      
      setIsProcessing(true);
      
      // Calculate subscription dates
      const startDate = format(new Date(), 'yyyy-MM-dd');
      let endDate;
      
      switch (selectedPlan) {
        case 'monthly':
          endDate = format(addMonths(new Date(), 1), 'yyyy-MM-dd');
          break;
        case 'quarterly':
          endDate = format(addMonths(new Date(), 3), 'yyyy-MM-dd');
          break;
        case 'yearly':
          endDate = format(addYears(new Date(), 1), 'yyyy-MM-dd');
          break;
        default:
          endDate = format(addMonths(new Date(), 1), 'yyyy-MM-dd');
      }
      
      // Create subscription in database
      await createSubscription({
        user_id: user?.id || '',
        gym_id: gymId,
        gym_name: gymName,
        plan_name: selectedPlan,
        start_date: startDate,
        end_date: endDate,
        price: price,
        status: 'active'
      });
      
      // Navigate to success page
      navigate('/gym/success', { 
        state: { 
          gymId,
          gymName,
          plan: selectedPlan,
          price,
          startDate,
          endDate
        }
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('حدث خطأ أثناء معالجة الدفع. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Formatting functions
  const getPlanName = (plan: string): string => {
    switch(plan) {
      case 'monthly':
        return 'اشتراك شهري';
      case 'quarterly':
        return 'اشتراك ربع سنوي';
      case 'yearly':
        return 'اشتراك سنوي';
      default:
        return 'اشتراك';
    }
  };

  // If no gym details are provided, redirect to gyms list
  if (!gymId || !selectedPlan || !price) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50" dir="rtl">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">لم يتم العثور على تفاصيل الاشتراك</h2>
          <p className="text-gray-600 mb-6">يرجى تحديد صالة رياضية وخطة اشتراك أولاً</p>
          <Link to="/gym">
            <Button className="w-full">الذهاب إلى قائمة الصالات الرياضية</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Link to={`/gym/${gymId}`} className="ml-2">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">تأكيد الدفع</h1>
      </div>
      
      {/* Subscription summary */}
      <div className="bg-white p-4 mt-2">
        <h2 className="text-lg font-bold mb-2">ملخص الاشتراك</h2>
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">الصالة الرياضية:</span>
            <span className="font-medium">{gymName}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">خطة الاشتراك:</span>
            <span className="font-medium">{getPlanName(selectedPlan)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
            <span className="font-medium">المبلغ الإجمالي:</span>
            <span className="font-bold text-brand-600">{price.toFixed(2)} ر.س</span>
          </div>
        </div>
      </div>
      
      {/* Payment methods */}
      <div className="bg-white p-4 mt-2">
        <h2 className="text-lg font-bold mb-3">اختر طريقة الدفع</h2>
        
        <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'card' | 'wallet')}>
          <div className="space-y-3">
            <PaymentOption 
              id="card"
              title="بطاقة ائتمان/مدى"
              icon={<CreditCard className="h-5 w-5" />}
              description="الدفع باستخدام بطاقة فيزا، ماستركارد أو مدى"
            />
            
            <PaymentOption 
              id="wallet"
              title="محفظة إلكترونية"
              icon={<Wallet className="h-5 w-5" />}
              description="الدفع باستخدام Apple Pay أو STC Pay"
            />
          </div>
        </RadioGroup>
      </div>
      
      {/* Card details section (shown only for card payment) */}
      {paymentMethod === 'card' && (
        <div className="bg-white p-4 mt-2">
          <h2 className="text-lg font-bold mb-3">تفاصيل البطاقة</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">رقم البطاقة</Label>
              <input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="0000 0000 0000 0000"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                maxLength={19}
              />
            </div>
            
            <div>
              <Label htmlFor="cardName">الاسم على البطاقة</Label>
              <input
                id="cardName"
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="الاسم الكامل كما في البطاقة"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                <input
                  id="expiryDate"
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  maxLength={5}
                />
              </div>
              
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <input
                  id="cvv"
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(formatCvv(e.target.value))}
                  placeholder="123"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                  maxLength={3}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <Switch
                checked={saveCard}
                onCheckedChange={setSaveCard}
                id="save-card"
              />
              <Label htmlFor="save-card" className="mr-2">حفظ بيانات البطاقة للمرة القادمة</Label>
            </div>
          </div>
        </div>
      )}
      
      {/* Payment button */}
      <div className="fixed bottom-0 right-0 left-0 p-4 bg-white border-t border-gray-200">
        <Button 
          onClick={handlePayment}
          className="w-full bg-brand-500 hover:bg-brand-600 h-14 text-lg"
          disabled={isSubmitting || isProcessing}
        >
          {isSubmitting || isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري معالجة الدفع
            </span>
          ) : (
            <>إتمام الدفع ({price.toFixed(2)} ر.س)</>
          )}
        </Button>
      </div>
    </div>
  );
  
  function getPlanName(plan: string): string {
    switch(plan) {
      case 'monthly':
        return 'اشتراك شهري';
      case 'quarterly':
        return 'اشتراك ربع سنوي';
      case 'yearly':
        return 'اشتراك سنوي';
      default:
        return 'اشتراك';
    }
  }
};

export default GymPayment;
