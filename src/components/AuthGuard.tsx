
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireMFA?: boolean;
}

const AuthGuard = ({ children, requireMFA = false }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("AuthGuard: المستخدم:", user?.email, "جاري التحميل:", isLoading, "المسار:", location.pathname);
    
    // Check if MFA is required but not enabled
    if (requireMFA && user && !user.factors) {
      toast.warning("المصادقة الثنائية مطلوبة لهذه الصفحة. يرجى إعدادها في صفحة الإعدادات.");
    }
  }, [user, isLoading, location, requireMFA]);

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

  // If MFA is required for this route but not enabled, redirect to MFA setup
  if (requireMFA && (!user.factors || Object.keys(user.factors).length === 0)) {
    console.log("AuthGuard: جاري التوجيه إلى صفحة إعداد المصادقة الثنائية");
    return <Navigate to="/settings/security" state={{ from: location }} replace />;
  }

  // إذا وصلنا هنا، فالمستخدم مصادق ويمكننا عرض المحتوى المحمي
  return <>{children}</>;
};

export default AuthGuard;
