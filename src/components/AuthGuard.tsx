
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
    console.log("AuthGuard: المستخدم:", user?.email, "جاري التحميل:", isLoading, "المسار:", location.pathname);
  }, [user, isLoading, location]);

  // تقليل وقت الانتظار - عرض شاشة التحميل فقط إذا كان الوقت أكثر من 1 ثانية
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-orange-600 font-medium">جاري تحميل البيانات...</p>
      </div>
    );
  }

  // إذا لم يكن المستخدم مصادقًا، إعادة التوجيه إلى تسجيل الدخول
  if (!user) {
    console.log("AuthGuard: جاري التوجيه إلى صفحة تسجيل الدخول. لم يتم العثور على مستخدم. المسار الحالي:", location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // إذا وصلنا هنا، فالمستخدم مصادق ويمكننا عرض المحتوى المحمي
  return <>{children}</>;
};

export default AuthGuard;
