
import React, { Suspense, lazy } from 'react';
import { useUser } from '@/context/UserContext';
import TopBar from '@/components/TopBar';
import Categories from '@/components/Categories';

// استخدام التحميل المتأخر للمكونات الثقيلة
const Offers = lazy(() => import('@/components/Offers'));
const PopularPlaces = lazy(() => import('@/components/PopularPlaces'));
const Promos = lazy(() => import('@/components/Promos'));

// مكون تحميل بسيط
const LoadingFallback = () => (
  <div className="p-4 flex justify-center">
    <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Index: React.FC = () => {
  const { userName, userAddress } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Top Bar */}
        <TopBar userName={userName} address={userAddress} />
        
        {/* Main Content */}
        <div className="mt-6">
          <Categories />
          
          <Suspense fallback={<LoadingFallback />}>
            <Offers />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <PopularPlaces />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Promos />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Index;
