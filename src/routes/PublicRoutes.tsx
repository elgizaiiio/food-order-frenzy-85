
import React, { Suspense, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LoadingFallback from "@/components/LoadingFallback";

// تحميل كسول لصفحات المصادقة
const OnboardingScreen = React.lazy(() => import("@/pages/OnboardingScreen"));
const Login = React.lazy(() => import("@/pages/Login"));
const Register = React.lazy(() => import("@/pages/Register"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const PublicRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // التوجيه المناسب عند تحميل المكون
  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    
    if (location.pathname === '/' || location.pathname === '') {
      if (onboardingComplete) {
        navigate('/login', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route
        path="/onboarding"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <OnboardingScreen />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default PublicRoutes;
