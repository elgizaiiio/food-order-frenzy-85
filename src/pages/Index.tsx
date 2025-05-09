import React, { Suspense, lazy } from 'react';
import { useUser } from '@/context/UserContext';
import TopBar from '@/components/TopBar';
import Categories from '@/components/Categories';
import { Header } from '@/components/ui/Header';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// استخدام التحميل المتأخر للمكونات الثقيلة
const Offers = lazy(() => import('@/components/Offers'));
const PopularPlaces = lazy(() => import('@/components/ui/PopularPlaces'));
const Promos = lazy(() => import('@/components/ui/Promos'));

// مكون تحميل محسّن
const LoadingFallback = () => <div className="p-6 flex justify-center items-center">
    <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>;
const HeroSection = () => <div className="relative px-4 pt-6 pb-8 mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-b-3xl overflow-hidden">
    <div className="absolute top-0 right-0 w-full h-full opacity-10">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -mr-6 -mt-6"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-10 -mb-10"></div>
    </div>
    <h1 className="text-3xl font-bold mb-2 animate-fade-in">أهلا بيك في تطبيق دام</h1>
    <p className="text-lg text-blue-100 mb-6 max-w-xs animate-fade-in animate-delay-1">
      اطلب كل حاجة محتاجها من مكان واحد، بسرعة وسهولة
    </p>
    <div className="relative z-10 animate-fade-in animate-delay-2">
      <div className="relative">
        
        
      </div>
    </div>
  </div>;
const Index: React.FC = () => {
  const {
    userName,
    userAddress
  } = useUser();
  return <div className="min-h-screen bg-blue-50/30">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Top Bar */}
        <TopBar userName={userName} address={userAddress} />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Main Content */}
        <div className="px-4 pt-4">
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
          
          {/* Extra padding at bottom to ensure content doesn't get hidden under bottom nav */}
          
        </div>
      </div>
    </div>;
};
export default Index;