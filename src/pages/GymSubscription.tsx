
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Star, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { fetchGymById, GymItem } from '@/services/gymService';
import { useAuth } from '@/context/AuthContext';

type SubscriptionPlan = {
  id: string;
  title: string;
  duration: string;
  price: number;
  features: string[];
  recommended?: boolean;
  priceDiscount?: number;
};

const GymSubscription: React.FC = () => {
  // Get gym id from URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the authenticated user
  const [loading, setLoading] = useState(true);
  const [gymInfo, setGymInfo] = useState<GymItem | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([
    {
      id: 'monthly',
      title: 'شهرية',
      duration: 'اشتراك لمدة شهر',
      price: 1999,
      features: [
        'وصول كامل إلى صالة الألعاب الرياضية',
        'وصول محدود للفصول الجماعية',
        'استخدام مناشف مجانية'
      ]
    },
    {
      id: 'quarterly',
      title: 'ربع سنوية',
      duration: 'اشتراك لمدة ٣ شهور',
      price: 4999,
      priceDiscount: 5997,
      recommended: true,
      features: [
        'وصول كامل إلى صالة الألعاب الرياضية',
        'وصول كامل للفصول الجماعية',
        'استشارة مجانية مع المدرب',
        'استخدام مناشف مجانية'
      ]
    },
    {
      id: 'yearly',
      title: 'سنوية',
      duration: 'اشتراك لمدة سنة كاملة',
      price: 14999,
      priceDiscount: 23988,
      features: [
        'وصول كامل إلى صالة الألعاب الرياضية',
        'وصول كامل للفصول الجماعية',
        '٣ استشارات مجانية مع المدرب',
        'جلسة تقييم لياقة بدنية',
        'استخدام مناشف وخزانة مجانية',
        'خصم 15٪ على المشروبات في كافتيريا النادي'
      ]
    }
  ]);
  
  // Fetch gym details from Supabase
  useEffect(() => {
    const getGymDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const gymData = await fetchGymById(id);
        setGymInfo(gymData);
      } catch (error) {
        console.error('Error fetching gym details:', error);
        toast.error('حدث خطأ أثناء تحميل بيانات النادي');
      } finally {
        setLoading(false);
      }
    };
    
    getGymDetails();
  }, [id]);

  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');

  const handleSubmit = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!user) {
      toast.error('يجب تسجيل الدخول أولاً');
      return;
    }
    
    navigate('/gym/payment', { 
      state: { 
        gym: gymInfo,
        plan: plan
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white sticky top-0 z-10 shadow-md">
          <Link to="/gym" className="text-white hover:text-blue-200 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">خطط الاشتراك</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>

        {/* Gym banner */}
        {loading || !gymInfo ? (
          <div className="relative h-48 bg-blue-100 animate-pulse"></div>
        ) : (
          <div className="relative">
            <div className="h-48">
              <img 
                src={gymInfo.image} 
                alt={gymInfo.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold">{gymInfo.name}</h2>
                  {gymInfo.location && (
                    <div className="flex items-center text-sm text-white/90 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{gymInfo.location}</span>
                    </div>
                  )}
                </div>
                {gymInfo.rating && (
                  <div className="bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm font-bold">{gymInfo.rating}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gym Info Cards */}
        {gymInfo && (
          <div className="px-4 py-4 flex justify-between gap-2">
            {gymInfo.openHours && (
              <Card className="border-0 shadow-sm flex-1 bg-blue-50 border border-blue-100">
                <CardContent className="p-3 flex flex-col items-center">
                  <Clock className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-xs text-blue-700">ساعات العمل</span>
                  <span className="text-sm font-medium text-blue-900">{gymInfo.openHours}</span>
                </CardContent>
              </Card>
            )}
            <Card className="border-0 shadow-sm flex-1 bg-blue-50 border border-blue-100">
              <CardContent className="p-3 flex flex-col items-center">
                <Users className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs text-blue-700">الأعضاء</span>
                <span className="text-sm font-medium text-blue-900">500+</span>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Subscription plans */}
        <div className="px-4 py-2">
          <h3 className="text-lg font-bold mb-4 text-blue-900">اختر خطة الاشتراك</h3>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-blue-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <RadioGroup 
              value={selectedPlan} 
              onValueChange={setSelectedPlan}
              className="space-y-4"
            >
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-xl transition-all overflow-hidden ${
                    selectedPlan === plan.id 
                      ? 'border-blue-500 ring-2 ring-blue-300 shadow-md' 
                      : 'border-gray-200'
                  } ${plan.recommended ? 'relative' : ''}`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs py-1 px-3 text-center font-medium">
                      الخيار الأفضل
                    </div>
                  )}
                  <div className={`p-4 ${plan.recommended ? 'pt-8' : ''} ${selectedPlan === plan.id ? 'bg-blue-50' : 'bg-white'}`}>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem 
                        value={plan.id} 
                        id={plan.id} 
                        className="border-blue-600 text-blue-600"
                      />
                      <div className="w-full flex justify-between items-center">
                        <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                          <div className="font-bold text-lg text-blue-800">{plan.title}</div>
                          <div className="text-sm text-blue-700">{plan.duration}</div>
                        </Label>
                        <div className="text-right">
                          <div className="font-bold text-lg text-blue-800">{plan.price} جنيه</div>
                          {plan.priceDiscount && (
                            <div className="text-xs line-through text-blue-400">{plan.priceDiscount} جنيه</div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2 pl-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="mt-0.5 min-w-4 w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                            <Check className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="text-sm text-blue-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}
          
          <Button 
            onClick={handleSubmit}
            disabled={loading || !gymInfo}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md py-6"
          >
            اختر هذه الخطة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GymSubscription;
