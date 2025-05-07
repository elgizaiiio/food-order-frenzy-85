
import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/Header';
import CategoryIcons from '@/components/ui/CategoryIcons';
import PopularPlaces from '@/components/ui/PopularPlaces';
import Offers from '@/components/ui/Offers';
import Promos from '@/components/ui/Promos';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Changed to 4 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <img 
            src="/dam-logo.png" 
            alt="Dam Logo" 
            className="w-20 h-20 mx-auto"
            onError={(e) => {
              // Fallback if logo doesn't exist
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none'%3E%3Crect width='80' height='80' rx='40' fill='%23FF6B00'/%3E%3Cpath d='M24 40C24 35.5817 27.5817 32 32 32H48C52.4183 32 56 35.5817 56 40V40C56 44.4183 52.4183 48 48 48H32C27.5817 48 24 44.4183 24 40V40Z' fill='white'/%3E%3C/svg%3E";
            }}
          />
          <p className="mt-2 text-primary font-bold text-xl">Dam</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white pb-20">
        <Header />
        <CategoryIcons />
        <PopularPlaces />
        <Offers />
        <Promos />
      </div>
    </div>
  );
};

export default Index;
