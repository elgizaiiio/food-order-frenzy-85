
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Award, Users, CheckCircle, Clock, Star, Info, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const DamBro: React.FC = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<'features' | 'faq'>('features');
  
  const handleSubscribe = () => {
    navigate('/gym');
    toast.success('جاري تحويلك إلى صفحة الاشتراك');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white z-10 shadow-lg">
          <Link to="/profile" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Dam Bro</h1>
          <button className="text-white hover:text-blue-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Banner */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
            </div>
            <div className="flex flex-col justify-center items-center h-full text-white p-4">
              <h2 className="text-3xl font-bold mb-2">Dam Bro</h2>
              <p className="text-xl opacity-90 mb-2">اشتراك شهري بـ 99 جنيه فقط</p>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full text-sm">
                <Award className="w-4 h-4 ml-1" />
                <span>الاشتراك الذهبي</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="px-4 -mt-6">
          <Card className="border-none overflow-hidden shadow-lg bg-white rounded-2xl animate-fade-in">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-800">اشتراك شهري</h3>
                  <p className="text-blue-600">حصريا لعملاء Dam</p>
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  99 جنيه/شهر
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg shadow-md"
                onClick={handleSubscribe}
              >
                اشترك الآن
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="px-4 mt-6">
          <div className="flex border-b border-blue-100">
            <button 
              className={`flex-1 py-3 font-medium text-center ${currentTab === 'features' ? 'text-blue-700 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setCurrentTab('features')}
            >
              المميزات
            </button>
            <button 
              className={`flex-1 py-3 font-medium text-center ${currentTab === 'faq' ? 'text-blue-700 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setCurrentTab('faq')}
            >
              الأسئلة الشائعة
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="px-4 py-6">
          {currentTab === 'features' ? (
            <div className="animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-900 mb-1">عروض حصرية للمشتركين</h4>
                    <p className="text-blue-800">احصل على عروض وخصومات حصرية بشكل دوري كعميل مميز</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-900 mb-1">دعم فني على مدار الساعة</h4>
                    <p className="text-blue-800">تواصل مع فريق الدعم المخصص لك في أي وقت من اليوم</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-900 mb-1">أولوية في الخدمة</h4>
                    <p className="text-blue-800">استمتع بأولوية في تنفيذ الطلبات والتوصيل قبل العملاء العاديين</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-900 mb-1">هدايا شهرية</h4>
                    <p className="text-blue-800">احصل على هدية مجانية شهرية مع كل تجديد للاشتراك</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Info className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-900 mb-1">إشعارات مسبقة بالعروض</h4>
                    <p className="text-blue-800">كن أول من يعلم بالعروض والمنتجات الجديدة قبل الجميع</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-900 mb-1">ضمان استرداد الأموال</h4>
                    <p className="text-blue-800">استرداد كامل قيمة المنتجات في حالة عدم الرضا خلال 30 يوم</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">كيف أشترك في Dam Bro؟</h4>
                  <p className="text-blue-800">يمكنك الاشتراك بالضغط على "اشترك الآن" وستتم معالجة الدفع وتفعيل اشتراكك فورا.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">متى يتم تجديد الاشتراك؟</h4>
                  <p className="text-blue-800">يتم تجديد الاشتراك تلقائيا كل شهر إلا إذا قمت بإلغائه.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">كيف يمكنني إلغاء الاشتراك؟</h4>
                  <p className="text-blue-800">يمكنك إلغاء الاشتراك في أي وقت من خلال الذهاب إلى صفحة الإعدادات ثم اشتراكاتي.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">هل يمكنني استرداد قيمة الاشتراك؟</h4>
                  <p className="text-blue-800">يمكن استرداد قيمة الاشتراك خلال 7 أيام من تاريخ الاشتراك إذا لم تستخدم أي من المزايا.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">هل المزايا تشمل كافة الخدمات في التطبيق؟</h4>
                  <p className="text-blue-800">نعم، يشمل الاشتراك كافة الخدمات المتاحة في التطبيق بدون استثناء.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Referral Section */}
        <div className="px-4 py-6">
          <Card className="overflow-hidden border-blue-200 shadow-md bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-2">قم بدعوة أصدقائك</h3>
              <p className="text-blue-700 mb-4">احصل على شهر مجاني لكل صديق يشترك في Dam Bro من خلال رابط الدعوة الخاص بك</p>
              
              <Link to="/invite-friends">
                <Button className="w-full bg-white border border-blue-200 text-blue-700 hover:bg-blue-50">
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
