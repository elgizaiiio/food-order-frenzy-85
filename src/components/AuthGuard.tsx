
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  // إذا لم يكن المستخدم مسجل دخول، قم بتوجيهه إلى صفحة تسجيل الدخول
  // مع حفظ المسار الذي كان يحاول الوصول إليه
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // إذا كان المستخدم مسجل دخول، اعرض المحتوى
  return <>{children}</>;
};

export default AuthGuard;
