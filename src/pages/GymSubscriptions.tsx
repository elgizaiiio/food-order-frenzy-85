
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share, Clock, MapPin, Trophy, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { fetchUserSubscriptions, GymSubscription } from '@/services/gymService';
import { useAuth } from '@/context/AuthContext';

const GymSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<GymSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get the authenticated user
  
  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        if (!user?.id) {
          setSubscriptions([]);
          setLoading(false);
          return;
        }
        
        const data = await fetchUserSubscriptions(user.id);
        setSubscriptions(data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        toast.error('حدث خطأ أثناء تحميل بيانات الاشتراكات');
      } finally {
        setLoading(false);
      }
    };
    
    loadSubscriptions();
  }, [user]);
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white sticky top-0 z-10 shadow-md">
          <Link to="/gym" className="text-white hover:text-blue-200 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">اشتراكاتك</h1>
          <div className="w-6"></div>
        </div>
        
        {/* Main content */}
        <div className="p-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <Card key={i} className="overflow-hidden border-none shadow-md animate-pulse">
                  <div className="h-32 bg-blue-100"></div>
                  <div className="p-4">
                    <div className="h-6 bg-blue-100 rounded-md mb-2 w-3/4"></div>
                    <div className="h-4 bg-blue-100 rounded-md mb-4 w-1/2"></div>
                    <div className="h-10 bg-blue-100 rounded-md w-full"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">لا توجد اشتراكات</h3>
              <p className="text-blue-700 mb-6">لم تقم بالاشتراك في أي نادي حتى الآن</p>
              <Link to="/gym">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
                >
                  تصفح النوادي
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <Card 
                  key={subscription.id}
                  className="overflow-hidden border border-blue-100 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=100&h=100" 
                            alt={subscription.gym_id} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-bold text-blue-800">
                            {/* Display gym name if available, fallback to gym ID */}
                            {subscription.gym_id}
                          </h3>
                          <div className="text-xs text-blue-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>اشتراك {subscription.plan_name}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                            subscription.status === 'expired' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}
                        `}>
                          {subscription.status === 'active' ? 'نشط' : 
                            subscription.status === 'expired' ? 'منتهي' : 'ملغي'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                        <div>
                          <span className="text-blue-700">تاريخ بداية الاشتراك: </span>
                          <span className="text-blue-900 font-medium">{formatDate(subscription.start_date)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                        <div>
                          <span className="text-blue-700">تاريخ نهاية الاشتراك: </span>
                          <span className="text-blue-900 font-medium">{formatDate(subscription.end_date)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-blue-700">رقم العضوية: </span>
                        <span className="text-blue-900 font-medium">{subscription.id.split('-')[0].toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outlineBlue"
                      className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 flex items-center justify-between"
                      onClick={() => toast.info('سيتم إضافة تفاصيل الاشتراك قريباً')}
                    >
                      <span>عرض التفاصيل</span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Call to action */}
          {subscriptions.length > 0 && (
            <Link to="/gym">
              <Button
                variant="outlineBlue"
                className="w-full mt-6 border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                استكشف المزيد من النوادي
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GymSubscriptions;
