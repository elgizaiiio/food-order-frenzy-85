
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
    // تحسين سجلات التصحيح مع تقليل عدد السجلات لتحسين الأداء
    if (process.env.NODE_ENV === 'development') {
      console.log("AuthGuard: المستخدم:", user?.email, "التحميل:", isLoading, "المسار:", location.pathname);
    }
    
    // التحقق من المصادقة الثنائية فقط عند الحاجة
    if (requireMFA && user && !user.factors) {
      toast.warning("المصادقة الثنائية مطلوبة لهذه الصفحة. يرجى إعدادها في صفحة الإعدادات.");
    }
  }, [user, isLoading, location, requireMFA]);

  // المسارات العامة التي لا تتطلب مصادقة
  if (location.pathname === '/onboarding' || location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password') {
    return <>{children}</>;
  }

  // تحسين شاشة التحميل لتكون أسرع وأكثر سلاسة
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-3 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // إعادة التوجيه للمستخدمين غير المصادقين
  if (!user) {
    if (process.env.NODE_ENV === 'development') {
      console.log("AuthGuard: جاري التوجيه إلى صفحة تسجيل الدخول. المسار:", location.pathname);
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // التحقق من المصادقة الثنائية
  if (requireMFA && (!user.factors || Object.keys(user.factors).length === 0)) {
    return <Navigate to="/settings/security" state={{ from: location }} replace />;
  }

  // المستخدم مصادق ويمكنه الوصول للمحتوى
  return <>{children}</>;
};

export default AuthGuard;
