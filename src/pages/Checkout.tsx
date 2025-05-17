
import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CheckoutProvider } from '@/context/CheckoutContext';

// استخدام التحميل المُتأخر للمكونات لتحسين الأداء
const CheckoutContent = lazy(() => import('@/components/checkout/CheckoutContent'));
const CheckoutButton = lazy(() => import('@/components/checkout/CheckoutButton'));

// مكون التحميل البسيط
const LoadingFallback = () => (
  <div className="animate-pulse flex flex-col space-y-4 p-4">
    <div className="h-8 bg-blue-100 rounded w-3/4 mb-2"></div>
    <div className="h-32 bg-blue-100 rounded"></div>
    <div className="h-24 bg-blue-100 rounded"></div>
  </div>
);

const Checkout: React.FC = () => {
  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-blue-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white pb-28"> {/* زيادة التباعد السفلي لمراعاة الشريط السفلي */}
          {/* الرأس */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md z-20">
            <div className="flex items-center justify-between p-4">
              <Link to="/cart" className="text-white hover:text-blue-100">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
              <div className="w-6"></div>
            </div>
          </div>

          {/* محتوى الصفحة */}
          <div className="p-4">
            <Suspense fallback={<LoadingFallback />}>
              <CheckoutContent />
            </Suspense>
          </div>
        </div>
        
        {/* شريط الدفع السفلي الثابت */}
        <div className="fixed bottom-16 left-0 right-0 shadow-lg border-t p-3 z-40 max-w-md mx-auto bg-white">
          <Suspense fallback={<div className="h-12 bg-blue-100 rounded animate-pulse"></div>}>
            <CheckoutButton />
          </Suspense>
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default Checkout;
