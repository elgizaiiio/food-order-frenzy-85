
import React from 'react';
import { useUser } from '@/context/UserContext';
import TopBar from '@/components/TopBar';
import Categories from '@/components/Categories';
import Offers from '@/components/Offers';
import PopularPlaces from '@/components/PopularPlaces';
import Promos from '@/components/Promos';

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
          <Offers />
          <PopularPlaces />
          <Promos />
        </div>
      </div>
    </div>
  );
};

export default Index;
