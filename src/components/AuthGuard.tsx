
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("AuthGuard: User:", user?.email, "isLoading:", isLoading, "location:", location.pathname);
  }, [user, isLoading, location]);

  // أثناء التحقق من حالة المصادقة، نعرض شاشة التحميل
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // إذا لم يكن المستخدم مصادقًا، إعادة التوجيه إلى تسجيل الدخول
  if (!user) {
    console.log("AuthGuard: Redirecting to login. No user found. Current location:", location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // إذا وصلنا هنا، فالمستخدم مصادق ويمكننا عرض المحتوى المحمي
  return <>{children}</>;
};

export default AuthGuard;
