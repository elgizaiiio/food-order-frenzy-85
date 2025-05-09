import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

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
        
        {/* Rest of the content */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Link 
              to="/restaurants" 
              className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200"
            >
              <div className="w-16 h-16 mb-2 rounded-full bg-amber-500 flex items-center justify-center">
                <span role="img" aria-label="food" className="text-2xl">🍔</span>
              </div>
              <span className="font-medium text-amber-900">المطاعم</span>
            </Link>
            
            <Link 
              to="/pharmacy" 
              className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
            >
              <div className="w-16 h-16 mb-2 rounded-full bg-blue-500 flex items-center justify-center">
                <span role="img" aria-label="pharmacy" className="text-2xl">💊</span>
              </div>
              <span className="font-medium text-blue-900">الصيدلية</span>
            </Link>
            
            <Link 
              to="/market" 
              className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200"
            >
              <div className="w-16 h-16 mb-2 rounded-full bg-green-500 flex items-center justify-center">
                <span role="img" aria-label="market" className="text-2xl">🛒</span>
              </div>
              <span className="font-medium text-green-900">السوبر ماركت</span>
            </Link>
            
            <Link 
              to="/personal-care" 
              className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200"
            >
              <div className="w-16 h-16 mb-2 rounded-full bg-pink-500 flex items-center justify-center">
                <span role="img" aria-label="beauty" className="text-2xl">✨</span>
              </div>
              <span className="font-medium text-pink-900">العناية الشخصية</span>
            </Link>
            
            <Link 
              to="/gym" 
              className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
            >
              <div className="w-16 h-16 mb-2 rounded-full bg-purple-500 flex items-center justify-center">
                <span role="img" aria-label="gym" className="text-2xl">💪</span>
              </div>
              <span className="font-medium text-purple-900">النوادي الرياضية</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
