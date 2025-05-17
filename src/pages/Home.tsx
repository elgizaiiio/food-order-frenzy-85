
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Settings, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-blue-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* هيدر */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">الصفحة الرئيسية</h1>
            <div className="flex gap-4">
              <Link to="/cart" className="relative">
                <ShoppingBag className="w-6 h-6 text-white" />
              </Link>
              <Link to="/profile">
                <User className="w-6 h-6 text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* محتوى الصفحة */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link 
              to="/restaurant"
              className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow flex flex-col items-center justify-center h-32"
            >
              <div className="bg-blue-200 rounded-full p-3 mb-2">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-bold">المطاعم</span>
            </Link>
            <Link 
              to="/market"
              className="bg-green-100 text-green-800 p-4 rounded-lg shadow flex flex-col items-center justify-center h-32"
            >
              <div className="bg-green-200 rounded-full p-3 mb-2">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <span className="font-bold">السوبر ماركت</span>
            </Link>
            <Link 
              to="/pharmacy"
              className="bg-red-100 text-red-800 p-4 rounded-lg shadow flex flex-col items-center justify-center h-32"
            >
              <div className="bg-red-200 rounded-full p-3 mb-2">
                <ShoppingBag className="w-6 h-6 text-red-600" />
              </div>
              <span className="font-bold">الصيدليات</span>
            </Link>
            <Link 
              to="/personal-care"
              className="bg-purple-100 text-purple-800 p-4 rounded-lg shadow flex flex-col items-center justify-center h-32"
            >
              <div className="bg-purple-200 rounded-full p-3 mb-2">
                <ShoppingBag className="w-6 h-6 text-purple-600" />
              </div>
              <span className="font-bold">العناية الشخصية</span>
            </Link>
          </div>
          
          {!user ? (
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/login" className="w-full">
                <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
                  تسجيل الدخول
                </button>
              </Link>
              <Link to="/signup" className="w-full">
                <button className="w-full bg-white border border-blue-600 text-blue-600 p-3 rounded-lg font-bold hover:bg-blue-50 transition">
                  إنشاء حساب جديد
                </button>
              </Link>
            </div>
          ) : (
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h2 className="font-bold mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-700" />
                مرحباً بك
              </h2>
              <p className="text-sm text-blue-800 mb-4">
                يمكنك الآن طلب ما تريده من أقسام الموقع المختلفة
              </p>
              <Link to="/profile">
                <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  إدارة الحساب
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
