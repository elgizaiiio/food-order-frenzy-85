
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Award, Users, Clock, Star, Info, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

// Import Apple logo SVG
const AppleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

const DamBro: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<'features' | 'faq'>('features');
  const [selectedPayment, setSelectedPayment] = useState<'visa' | 'vodafone' | 'apple' | null>(null);
  
  const handleSubscribe = () => {
    if (!selectedPayment) {
      toast.error('يرجى اختيار وسيلة دفع');
      return;
    }
    
    toast.success('تم الاشتراك بنجاح! شكراً لاختيارك Dam Bro');
    
    // Navigate after showing the thank you message
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-indigo-700 to-blue-900 text-white z-10 shadow-lg">
          <Link to="/profile" className="text-white hover:text-blue-200 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold font-tajawal">اشتراك Dam Bro</h1>
          <button className="text-white hover:text-blue-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Banner */}
        <div className="relative">
          <div className="h-56 bg-gradient-to-r from-indigo-600 to-blue-700 overflow-hidden sm:h-64">
            <div className="absolute inset-0 opacity-15">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
            </div>
            <div className="flex flex-col justify-center items-center h-full text-white p-4">
              <div className="animate-bounce-in">
                <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center mb-3 shadow-lg border border-white/50">
                  <span className="text-3xl font-bold">Dam</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2 animate-fade-in">Dam Bro</h2>
              <p className="text-xl opacity-90 mb-3 animate-fade-in">اشتراك شهري حصري</p>
              <div className="flex items-center bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-md animate-fade-in">
                <Award className="w-4 h-4 ml-1" />
                <span>العضوية الذهبية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="px-4 -mt-10">
          <Card className="border-none overflow-hidden shadow-xl bg-white rounded-3xl animate-fade-in">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-900 font-tajawal">اشتراك شهري</h3>
                  <p className="text-indigo-700 font-tajawal">حصريا لعملاء Dam</p>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  99 جنيه/شهر
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="mb-6 bg-indigo-50 rounded-2xl p-4">
                <h4 className="font-semibold text-indigo-900 mb-3">اختر وسيلة الدفع</h4>
                
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 transition-all ${selectedPayment === 'visa' ? 'border-indigo-600 bg-indigo-100' : 'border-gray-200 hover:border-indigo-400'}`}
                    onClick={() => setSelectedPayment('visa')}
                  >
                    <CreditCard className="w-8 h-8 text-indigo-700 mb-2" />
                    <span className="text-sm font-medium text-indigo-900">فيزا/ماستر</span>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 transition-all ${selectedPayment === 'vodafone' ? 'border-indigo-600 bg-indigo-100' : 'border-gray-200 hover:border-indigo-400'}`}
                    onClick={() => setSelectedPayment('vodafone')}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mb-2">
                      <span className="text-white font-bold text-xs">فودافون</span>
                    </div>
                    <span className="text-sm font-medium text-indigo-900">فودافون كاش</span>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 transition-all ${selectedPayment === 'apple' ? 'border-indigo-600 bg-indigo-100' : 'border-gray-200 hover:border-indigo-400'}`}
                    onClick={() => setSelectedPayment('apple')}
                  >
                    <div className="text-black mb-2">
                      <AppleLogo />
                    </div>
                    <span className="text-sm font-medium text-indigo-900">أبل باي</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white py-6 text-lg font-medium shadow-lg rounded-2xl transition-all transform hover:scale-[1.02]"
                onClick={handleSubscribe}
              >
                اشترك الآن
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                يمكنك إلغاء الاشتراك في أي وقت
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="px-4 mt-8">
          <div className="flex border-b border-indigo-100">
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${currentTab === 'features' ? 'text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setCurrentTab('features')}
            >
              المميزات
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center transition-colors ${currentTab === 'faq' ? 'text-indigo-700 border-b-2 border-indigo-600' : 'text-gray-500'}`}
              onClick={() => setCurrentTab('faq')}
            >
              الأسئلة الشائعة
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="px-4 py-6">
          {currentTab === 'features' ? (
            <div className="animate-fade-in space-y-6">
              <div className="bg-indigo-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-indigo-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-indigo-900 mb-2">عروض حصرية للمشتركين</h4>
                    <p className="text-indigo-800">احصل على عروض وخصومات حصرية بشكل دوري كعميل مميز</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-blue-900 mb-2">دعم فني على مدار الساعة</h4>
                    <p className="text-blue-800">تواصل مع فريق الدعم المخصص لك في أي وقت من اليوم</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-indigo-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-indigo-900 mb-2">أولوية في الخدمة</h4>
                    <p className="text-indigo-800">استمتع بأولوية في تنفيذ الطلبات والتوصيل قبل العملاء العاديين</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-blue-900 mb-2">إشعارات مسبقة بالعروض</h4>
                    <p className="text-blue-800">كن أول من يعلم بالعروض والمنتجات الجديدة قبل الجميع</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <h4 className="font-bold text-indigo-900 mb-2">كيف أشترك في Dam Bro؟</h4>
                  <p className="text-indigo-800">يمكنك الاشتراك بالضغط على "اشترك الآن" واختيار وسيلة الدفع المناسبة لك، وستتم معالجة الدفع وتفعيل اشتراكك فورا.</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <h4 className="font-bold text-indigo-900 mb-2">متى يتم تجديد الاشتراك؟</h4>
                  <p className="text-indigo-800">يتم تجديد الاشتراك تلقائيا كل شهر إلا إذا قمت بإلغائه قبل موعد التجديد بـ 24 ساعة على الأقل.</p>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <h4 className="font-bold text-indigo-900 mb-2">كيف يمكنني إلغاء الاشتراك؟</h4>
                  <p className="text-indigo-800">يمكنك إلغاء الاشتراك في أي وقت من خلال الذهاب إلى صفحة الإعدادات ثم اشتراكاتي، ثم الضغط على إلغاء الاشتراك.</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <h4 className="font-bold text-indigo-900 mb-2">هل المزايا تشمل كافة الخدمات في التطبيق؟</h4>
                  <p className="text-indigo-800">نعم، يشمل الاشتراك كافة الخدمات والمزايا المتاحة في التطبيق بدون استثناء.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Referral Section */}
        <div className="px-4 py-6">
          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">قم بدعوة أصدقائك</h3>
              <p className="text-blue-100 mb-4">احصل على شهر مجاني لكل صديق يشترك في Dam Bro من خلال رابط الدعوة الخاص بك</p>
              
              <Link to="/invite-friends">
                <Button className="w-full bg-white border-none text-indigo-700 hover:bg-blue-50 font-bold rounded-xl py-3">
                  دعوة الأصدقاء الآن
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DamBro;
