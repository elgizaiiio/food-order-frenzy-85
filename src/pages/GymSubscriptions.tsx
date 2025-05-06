
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Subscription = {
  id: string;
  gymName: string;
  accessCode: string;
  planType: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

const GymSubscriptions: React.FC = () => {
  // Mock data for subscriptions
  const subscriptions: Subscription[] = [
    {
      id: 'sub-1',
      gymName: 'آيرون فيتنس',
      accessCode: 'AF729BX3',
      planType: 'شهرية',
      startDate: '١٥ يناير ٢٠٢٥',
      endDate: '١٥ فبراير ٢٠٢٥',
      isActive: true
    },
    {
      id: 'sub-2',
      gymName: 'جولد جيم',
      accessCode: 'GG125XZ8',
      planType: 'ربع سنوية',
      startDate: '١٠ نوفمبر ٢٠٢٤',
      endDate: '١٠ فبراير ٢٠٢٥',
      isActive: true
    },
    {
      id: 'sub-3',
      gymName: 'فيتنس تايم',
      accessCode: 'FT583PQ9',
      planType: 'سنوية',
      startDate: '٢٠ يونيو ٢٠٢٤',
      endDate: '٢٠ يونيو ٢٠٢٥',
      isActive: false
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/gym" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">اشتراكاتك</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>

        {/* Subscriptions list */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-bold mb-4">عضوياتك الحالية والسابقة</h3>
          
          {subscriptions.length > 0 ? (
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <Card 
                  key={sub.id} 
                  className={`border ${sub.isActive ? 'border-green-500' : 'border-gray-200'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{sub.gymName}</h4>
                      {sub.isActive ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle2 className="w-3 h-3 me-1" />
                          نشط
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <XCircle className="w-3 h-3 me-1" />
                          منتهي
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">نوع الاشتراك:</span>
                        <span className="font-medium">{sub.planType}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-500">رمز الوصول:</span>
                        <span className="font-medium">{sub.accessCode}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-500">تاريخ البدء:</span>
                        <span className="font-medium">{sub.startDate}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-500">تاريخ الانتهاء:</span>
                        <span className="font-medium">{sub.endDate}</span>
                      </div>
                    </div>
                    
                    {sub.isActive && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-brand-200 text-brand-700"
                      >
                        عرض البطاقة
                      </Button>
                    )}
                    
                    {!sub.isActive && (
                      <Button 
                        className="w-full mt-4 bg-brand-500 hover:bg-brand-600"
                      >
                        تجديد الاشتراك
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-700">لا يوجد اشتراكات حاليًا</h4>
              <p className="text-gray-500 mt-1">قم بالتسجيل في أحد النوادي المتاحة</p>
              
              <Link to="/gym">
                <Button 
                  className="mt-6 bg-brand-500 hover:bg-brand-600"
                >
                  استعراض النوادي
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GymSubscriptions;
