
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type SubscriptionPlan = {
  id: string;
  title: string;
  duration: string;
  price: number;
  features: string[];
};

type GymInfo = {
  id: string;
  name: string;
  image: string;
};

const GymSubscription: React.FC = () => {
  // Get gym id from URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock gym data - in real app, fetch based on ID
  const gymInfo: GymInfo = {
    id: id || '',
    name: id === 'iron-fitness' ? 'آيرون فيتنس' : 
          id === 'gold-gym' ? 'جولد جيم' : 
          id === 'fitness-time' ? 'فيتنس تايم' : 'باور زون',
    image: 'https://images.unsplash.com/photo-1637666218229-7824d3b2ed83?auto=format&fit=crop&q=80&w=1000&h=400'
  };

  // Subscription plans
  const plans: SubscriptionPlan[] = [
    {
      id: 'monthly',
      title: 'شهرية',
      duration: 'اشتراك لمدة شهر',
      price: 299,
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
      price: 799,
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
      price: 2499,
      features: [
        'وصول كامل إلى صالة الألعاب الرياضية',
        'وصول كامل للفصول الجماعية',
        '٣ استشارات مجانية مع المدرب',
        'جلسة تقييم لياقة بدنية',
        'استخدام مناشف وخزانة مجانية',
        'خصم 15٪ على المشروبات في كافتيريا النادي'
      ]
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState<string>('monthly');

  const handleSubmit = () => {
    const plan = plans.find(p => p.id === selectedPlan);
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
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/gym" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">خطط الاشتراك</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>

        {/* Gym banner */}
        <div className="relative h-40">
          <img 
            src={gymInfo.image} 
            alt={gymInfo.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-4 w-full">
              <h2 className="text-white text-2xl font-bold">{gymInfo.name}</h2>
            </div>
          </div>
        </div>

        {/* Subscription plans */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-bold mb-4">اختر خطة الاشتراك</h3>
          
          <RadioGroup 
            value={selectedPlan} 
            onValueChange={setSelectedPlan}
            className="space-y-4"
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-4 transition-all ${
                  selectedPlan === plan.id 
                    ? 'border-brand-500 bg-brand-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem 
                    value={plan.id} 
                    id={plan.id} 
                    className="border-brand-500 text-brand-500"
                  />
                  <div className="w-full flex justify-between items-center">
                    <Label htmlFor={plan.id} className="font-bold text-lg cursor-pointer">
                      {plan.title}
                    </Label>
                    <span className="font-bold text-brand-700">{plan.price} ريال</span>
                  </div>
                </div>
                
                <div className="mt-2 ms-6">
                  <p className="text-gray-500 text-sm mb-2">{plan.duration}</p>
                  <ul className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="text-brand-500 w-4 h-4 me-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </RadioGroup>
          
          <div className="mt-8">
            <Button 
              className="w-full bg-brand-500 hover:bg-brand-600 py-6"
              onClick={handleSubmit}
            >
              تابع الدفع
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymSubscription;
