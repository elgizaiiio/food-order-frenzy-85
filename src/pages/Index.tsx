
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
  
  // Get user's first name from email or display a generic greeting
  const firstName = user?.email ? user.email.split('@')[0] : 'الزائر';
  
  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with enhanced styling */}
        <div className="p-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-b-3xl shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">مرحباً {firstName}!</h1>
              <p className="text-blue-100 mt-1">ماذا تريد اليوم؟</p>
            </div>
            <Link to="/profile">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-inner hover:bg-white/30 transition-all">
                {user?.email ? (
                  <span className="text-white font-bold text-xl">{user.email.charAt(0).toUpperCase()}</span>
                ) : (
                  <span className="text-white font-bold">؟</span>
                )}
              </div>
            </Link>
          </div>
          
          {/* Quick Search Bar */}
          <div className="mt-4 relative">
            <input 
              type="text"
              placeholder="ابحث عن خدمة، منتج، مطعم..."
              className="w-full py-3 px-5 rounded-xl bg-white/10 text-white placeholder:text-blue-100 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="absolute top-1/2 left-4 -translate-y-1/2 text-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Main Categories with enhanced styling */}
        <Categories />
        
        {/* Offers Section */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">العروض الخاصة</h2>
          <Offers />
        </div>
        
        {/* Popular Places */}
        <div className="px-4 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-xl font-bold text-blue-900 mb-4">الأماكن الشائعة</h2>
          <PopularPlaces />
        </div>
        
        {/* Promotional Cards */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">عروض وتخفيضات</h2>
          <Promos />
        </div>
      </div>
    </div>
  );
};

export default Index;
