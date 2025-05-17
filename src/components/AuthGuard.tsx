
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children?: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // حفظ المسار الحالي ليتم إعادة التوجيه إليه بعد تسجيل الدخول
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // إذا كان الطفل محددًا، قم بإرجاع الأطفال، وإلا ارجع Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default AuthGuard;
