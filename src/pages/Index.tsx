
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import Categories from '@/components/Categories';
import Offers from '@/components/ui/Offers';
import PopularPlaces from '@/components/PopularPlaces';
import Promos from '@/components/Promos';

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">مرحباً {user?.email?.split('@')[0]}!</h1>
              <p className="text-blue-100">ماذا تريد اليوم؟</p>
            </div>
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                {user?.email ? (
                  <span className="text-white font-bold">{user.email.charAt(0).toUpperCase()}</span>
                ) : (
                  <span className="text-white font-bold">?</span>
                )}
              </div>
            </Link>
          </div>
        </div>
        
        {/* Main Categories */}
        <Categories />
        
        {/* Offers Section */}
        <Offers />
        
        {/* Popular Places */}
        <PopularPlaces />
        
        {/* Promotional Cards */}
        <Promos />
      </div>
    </div>
  );
};

export default Index;
