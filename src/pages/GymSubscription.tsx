
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Dumbbell, Check, CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGymById } from '@/services/gymService';
import { Gym } from '@/types/gym';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import SubscriptionPlan from '@/components/gym/SubscriptionPlan';

type DescriptionItemProps = {
  icon: React.ReactNode;
  text: string;
};

const DescriptionItem: React.FC<DescriptionItemProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
};

const GymSubscription = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [gym, setGym] = useState<Gym | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadGym = async () => {
      try {
        setIsLoading(true);
        if (id) {
          const gymData = await fetchGymById(id);
          setGym(gymData);
        }
      } catch (error) {
        console.error('Error loading gym details:', error);
        toast.error('حدث خطأ أثناء تحميل بيانات النادي');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadGym();
  }, [id]);

  const handleSubscribe = () => {
    if (!user) {
      toast.error('يجب تسجيل الدخول للاشتراك');
      navigate('/login', { state: { from: `/gym/${id}` } });
      return;
    }
    
    // Navigate to payment page with gym and plan details
    navigate(`/gym/payment`, { 
      state: { 
        gymId: gym?.id,
        gymName: gym?.name,
        plan: selectedPlan,
        price: calculatePrice()
      } 
    });
  };

  const calculatePrice = (): number => {
    const basePrice = gym?.price || 0;
    
    switch(selectedPlan) {
      case 'monthly':
        return basePrice;
      case 'quarterly':
        return basePrice * 3 * 0.9;
      case 'yearly':
        return basePrice * 12 * 0.75;
      default:
        return basePrice;
    }
  };

  // Display skeleton loader while loading
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen" dir="rtl">
        <div className="relative bg-white pb-6">
          {/* Header Skeleton */}
          <Skeleton className="h-56 w-full" />
          
          {/* Content Skeleton */}
          <div className="px-4 pt-4">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display message if gym not found
  if (!gym) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <p className="text-lg text-gray-700 mb-4">لم يتم العثور على النادي المطلوب</p>
          <Link to="/gym">
            <Button>العودة إلى الصفحة الرئيسية</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20" dir="rtl">
      <div className="relative">
        {/* Gym image */}
        <div className="relative h-56 w-full">
          <img src={gym.image} alt={gym.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          {/* Back button */}
          <Link to="/gym" className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          
          {/* Gym info on image */}
          <div className="absolute bottom-4 right-4 left-4 text-white">
            <h1 className="text-2xl font-bold mb-1">{gym.name}</h1>
            <div className="flex items-center text-white/90 text-sm">
              <MapPin className="h-4 w-4 ml-1" />
              <span>{gym.location}</span>
            </div>
          </div>
        </div>
        
        {/* Subscription plans */}
        <div className="p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">خطط الاشتراك</h2>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 ml-1" />
              <span className="text-sm text-gray-500">{gym.open_hours}</span>
            </div>
          </div>
          
          <RadioGroup value={selectedPlan} onValueChange={(v) => setSelectedPlan(v as 'monthly' | 'quarterly' | 'yearly')}>
            <div className="space-y-3">
              <SubscriptionPlan
                id="monthly"
                title="شهري"
                price={gym.price}
                description="اشتراك لمدة شهر واحد"
              />
              
              <SubscriptionPlan
                id="quarterly"
                title="ربع سنوي"
                price={gym.price * 3 * 0.9}
                description="اشتراك لمدة ثلاثة أشهر (خصم 10%)"
                recommended
              />
              
              <SubscriptionPlan
                id="yearly"
                title="سنوي"
                price={gym.price * 12 * 0.75}
                description="اشتراك لمدة سنة كاملة (خصم 25%)"
              />
            </div>
          </RadioGroup>
        </div>
        
        {/* Gym features */}
        <div className="p-4 mt-2 bg-white">
          <h2 className="text-xl font-bold mb-4">المميزات</h2>
          <div className="space-y-3">
            {gym.features.map((feature, index) => (
              <DescriptionItem key={index} icon={<Check className="h-5 w-5 text-green-500" />} text={feature} />
            ))}
            <DescriptionItem 
              icon={<Clock className="h-5 w-5 text-blue-500" />} 
              text={`مواعيد العمل: ${gym.open_hours}`} 
            />
            <DescriptionItem 
              icon={<Dumbbell className="h-5 w-5 text-brand-500" />} 
              text="أحدث المعدات الرياضية"
            />
            <DescriptionItem 
              icon={<CalendarDays className="h-5 w-5 text-purple-500" />} 
              text="حجز حصص مجانية أسبوعياً"
            />
          </div>
        </div>
        
        {/* Subscription button */}
        <div className="fixed bottom-0 right-0 left-0 p-4 bg-white border-t border-gray-200">
          <Button 
            onClick={handleSubscribe}
            className="w-full bg-brand-500 hover:bg-brand-600 h-14 text-lg"
          >
            اشترك الآن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GymSubscription;
