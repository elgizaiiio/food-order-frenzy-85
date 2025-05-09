
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CircleCheck, MapPin, Dumbbell, Trophy, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

// نوع البيانات للاشتراكات
type Subscription = {
  id: string;
  gymName: string;
  gymLogo: string;
  planName: string;
  startDate: string;
  endDate: string;
  remainingDays: number;
  status: 'active' | 'expired' | 'pending';
  membershipId: string;
  features: string[];
};

const GymSubscriptions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  
  // محاكاة جلب البيانات من API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        // في الحالة الحقيقية، سيتم استبدال هذا بطلب API حقيقي
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData: Subscription[] = [
          {
            id: '1',
            gymName: 'آيرون فيتنس',
            gymLogo: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=100&h=100',
            planName: 'شهري',
            startDate: '2023-05-01',
            endDate: '2023-06-01',
            remainingDays: 15,
            status: 'active',
            membershipId: '7658493',
            features: ['تدريب شخصي', 'ساونا', 'مسبح داخلي']
          },
          {
            id: '2',
            gymName: 'جولد جيم',
            gymLogo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=100&h=100',
            planName: 'ربع سنوي',
            startDate: '2023-03-15',
            endDate: '2023-06-15',
            remainingDays: 0,
            status: 'expired',
            membershipId: '5432178',
            features: ['صالة كارديو', 'يوغا', 'زومبا']
          },
          {
            id: '3',
            gymName: 'فيتنس تايم',
            gymLogo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=100&h=100',
            planName: 'سنوي',
            startDate: '2023-06-01',
            endDate: '2024-06-01',
            remainingDays: 300,
            status: 'active',
            membershipId: '9876543',
            features: ['كروس فيت', 'تمارين جماعية', 'مدربين معتمدين']
          }
        ];
        
        setSubscriptions(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        toast.error('حدث خطأ أثناء تحميل بيانات الاشتراكات');
        setLoading(false);
      }
    };
    
    fetchSubscriptions();
  }, []);
  
  // تحويل التاريخ إلى تنسيق محلي
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // تحديد لون حالة الاشتراك
  const getStatusColor = (status: 'active' | 'expired' | 'pending') => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'expired':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'pending':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  // تحديد نص حالة الاشتراك
  const getStatusText = (status: 'active' | 'expired' | 'pending') => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'expired':
        return 'منتهي';
      case 'pending':
        return 'قيد التفعيل';
      default:
        return '';
    }
  };
  
  // إلغاء الاشتراك
  const handleCancelSubscription = () => {
    if (!selectedSubscription) return;
    
    // في الحالة الحقيقية، سيتم إرسال طلب API لإلغاء الاشتراك
    toast.success('تم إلغاء الاشتراك بنجاح');
    setSubscriptions(subscriptions.filter(s => s.id !== selectedSubscription.id));
    setShowCancelDialog(false);
    setSelectedSubscription(null);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white sticky top-0 z-10 shadow-lg">
          <Link to="/gym" className="text-white hover:text-blue-200 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">اشتراكاتي</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>

        {/* Main content */}
        <div className="p-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-blue-50">
              <TabsTrigger value="active" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                نشطة
              </TabsTrigger>
              <TabsTrigger value="expired" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                منتهية
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                الكل
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {loading ? (
                <div className="mt-4 space-y-4">
                  {[1, 2].map(i => (
                    <Card key={i} className="border-0 shadow-sm animate-pulse">
                      <CardContent className="p-0">
                        <div className="h-32 bg-blue-100 rounded-t-lg"></div>
                        <div className="p-4">
                          <div className="h-5 w-3/4 bg-blue-100 rounded mb-2"></div>
                          <div className="h-4 w-1/2 bg-blue-100 rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {subscriptions.filter(sub => sub.status === 'active').length > 0 ? (
                    subscriptions
                      .filter(sub => sub.status === 'active')
                      .map(subscription => (
                        <SubscriptionCard 
                          key={subscription.id}
                          subscription={subscription}
                          onCancel={() => {
                            setSelectedSubscription(subscription);
                            setShowCancelDialog(true);
                          }}
                        />
                      ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-4">
                        <Dumbbell className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">لا توجد اشتراكات نشطة</h3>
                      <p className="text-blue-700 mb-6">لم تقم بتسجيل أي اشتراكات نشطة حتى الآن</p>
                      <Button 
                        onClick={() => navigate('/gym')} 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      >
                        تصفح النوادي
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="expired">
              {loading ? (
                <div className="mt-4 space-y-4">
                  {[1, 2].map(i => (
                    <Card key={i} className="border-0 shadow-sm animate-pulse">
                      <CardContent className="p-0">
                        <div className="h-32 bg-blue-100 rounded-t-lg"></div>
                        <div className="p-4">
                          <div className="h-5 w-3/4 bg-blue-100 rounded mb-2"></div>
                          <div className="h-4 w-1/2 bg-blue-100 rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {subscriptions.filter(sub => sub.status === 'expired').length > 0 ? (
                    subscriptions
                      .filter(sub => sub.status === 'expired')
                      .map(subscription => (
                        <SubscriptionCard 
                          key={subscription.id}
                          subscription={subscription}
                          onRenew={() => navigate('/gym')}
                        />
                      ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-4">
                        <Trophy className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">لا توجد اشتراكات منتهية</h3>
                      <p className="text-blue-700">لا توجد اشتراكات منتهية في سجلك</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all">
              {loading ? (
                <div className="mt-4 space-y-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="border-0 shadow-sm animate-pulse">
                      <CardContent className="p-0">
                        <div className="h-32 bg-blue-100 rounded-t-lg"></div>
                        <div className="p-4">
                          <div className="h-5 w-3/4 bg-blue-100 rounded mb-2"></div>
                          <div className="h-4 w-1/2 bg-blue-100 rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {subscriptions.length > 0 ? (
                    subscriptions.map(subscription => (
                      <SubscriptionCard 
                        key={subscription.id}
                        subscription={subscription}
                        onCancel={subscription.status === 'active' ? () => {
                          setSelectedSubscription(subscription);
                          setShowCancelDialog(true);
                        } : undefined}
                        onRenew={subscription.status === 'expired' ? () => navigate('/gym') : undefined}
                      />
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mb-4">
                        <Dumbbell className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-2">لا توجد اشتراكات</h3>
                      <p className="text-blue-700 mb-6">لم تقم بتسجيل أي اشتراكات حتى الآن</p>
                      <Button 
                        onClick={() => navigate('/gym')} 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      >
                        تصفح النوادي
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent className="sm:max-w-md" dir="rtl">
            <DialogHeader>
              <DialogTitle>تأكيد إلغاء الاشتراك</DialogTitle>
              <DialogDescription>
                هل أنت متأكد من رغبتك في إلغاء اشتراكك مع {selectedSubscription?.gymName}؟
              </DialogDescription>
            </DialogHeader>
            
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-800 my-4">
              <p className="text-sm">
                سيتم إلغاء اشتراكك على الفور، ولن تتمكن من الدخول إلى النادي بعد ذلك. يرجى العلم أنه لن يتم استرداد المبلغ المدفوع.
              </p>
            </div>
            
            <DialogFooter className="sm:justify-start gap-2 flex-row-reverse">
              <Button 
                variant="destructive" 
                onClick={handleCancelSubscription}
              >
                تأكيد الإلغاء
              </Button>
              <Button 
                type="button" 
                variant="outlineBlue" 
                className="text-blue-700"
                onClick={() => setShowCancelDialog(false)}
              >
                تراجع
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// مكون لعرض بطاقة الاشتراك
const SubscriptionCard = ({ 
  subscription, 
  onCancel, 
  onRenew 
}: { 
  subscription: Subscription, 
  onCancel?: () => void,
  onRenew?: () => void
}) => {
  return (
    <Card className="border border-blue-100 overflow-hidden shadow-md">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-between p-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3 border border-white/30">
              <img 
                src={subscription.gymLogo} 
                alt={subscription.gymName} 
                className="h-12 w-12 object-cover rounded-full"
              />
            </div>
            <div className="text-white">
              <h3 className="font-bold text-lg">{subscription.gymName}</h3>
              <p className="opacity-90">اشتراك {subscription.planName}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(subscription.status)}`}>
            {getStatusText(subscription.status)}
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center text-blue-700 text-sm mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span>تاريخ البدء</span>
            </div>
            <p className="font-medium text-blue-900">{formatDate(subscription.startDate)}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center text-blue-700 text-sm mb-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span>تاريخ الانتهاء</span>
            </div>
            <p className="font-medium text-blue-900">{formatDate(subscription.endDate)}</p>
          </div>
        </div>
        
        {subscription.status === 'active' && (
          <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3 mb-4">
            <div className="flex items-center text-blue-700">
              <Clock className="w-5 h-5 mr-2" />
              <span>الأيام المتبقية</span>
            </div>
            <span className="font-bold text-lg text-blue-900">{subscription.remainingDays} يوم</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-blue-800">
            <CircleCheck className="w-4 h-4 mr-1 text-blue-600" />
            <span>رقم العضوية</span>
          </div>
          <span className="font-bold text-blue-700">{subscription.membershipId}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {subscription.features.map((feature, idx) => (
            <span 
              key={idx}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <div className="mt-5 flex justify-between">
          <Button 
            variant="outlineBlue"
            className="flex items-center text-blue-700 border-blue-200"
            onClick={() => {}}
          >
            عرض التفاصيل
            <ChevronRight className="w-4 h-4 mr-1" />
          </Button>
          
          {subscription.status === 'active' && onCancel && (
            <Button 
              variant="outlineBlue"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
              onClick={onCancel}
            >
              إلغاء الاشتراك
            </Button>
          )}
          
          {subscription.status === 'expired' && onRenew && (
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              onClick={onRenew}
            >
              تجديد الاشتراك
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// وظيفة تنسيق التاريخ
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export default GymSubscriptions;
