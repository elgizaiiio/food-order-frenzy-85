
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

  if (isLoading) {
    // أثناء التحقق من حالة المصادقة، نعرض شاشة التحميل
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    console.log("Redirecting to login. No user found.");
    // إعادة التوجيه إلى تسجيل الدخول إذا لم يكن المستخدم مصادقًا
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // إذا وصلنا هنا، فالمستخدم مصادق ويمكننا عرض المحتوى المحمي
  return <>{children}</>;
};

export default AuthGuard;
