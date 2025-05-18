
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, useLocation } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { FirebaseProvider } from "@/context/FirebaseContext";
import BottomNav from "./components/BottomNav";
import { Suspense, lazy, useState, useEffect } from "react";
import LoadingFallback from "./components/LoadingFallback";

// استخدام التحميل الكسول للصفحات لتحسين الأداء
const SplashScreen = lazy(() => import("./components/SplashScreen"));

// استيراد مكونات التوجيه
const ProtectedRoutes = lazy(() => import("./routes/ProtectedRoutes"));
const PublicRoutes = lazy(() => import("./routes/PublicRoutes"));
const PharmacyRoutes = lazy(() => import("./routes/PharmacyRoutes"));
const MarketRoutes = lazy(() => import("./routes/MarketRoutes"));
const PersonalCareRoutes = lazy(() => import("./routes/PersonalCareRoutes"));

// تبسيط مكون التطبيق الرئيسي
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  
  // إخفاء شاشة البداية بعد مرور وقت معين
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // عرض شاشة البداية لمدة أطول قليلاً
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <FirebaseProvider>
      <AuthProvider>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {showSplash ? (
              <Suspense fallback={<LoadingFallback />}>
                <SplashScreen setShowSplash={setShowSplash} />
              </Suspense>
            ) : (
              <div className="bg-gray-50 min-h-screen">
                <Routes>
                  {/* المسارات العامة */}
                  <Route path="/" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PublicRoutes />
                    </Suspense>
                  } />
                  <Route path="/onboarding/*" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PublicRoutes />
                    </Suspense>
                  } />
                  <Route path="/login/*" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PublicRoutes />
                    </Suspense>
                  } />
                  <Route path="/register/*" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PublicRoutes />
                    </Suspense>
                  } />
                  <Route path="/forgot-password/*" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PublicRoutes />
                    </Suspense>
                  } />
                  
                  {/* مسارات التطبيق المختلفة */}
                  <Route path="/pharmacy/*" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PharmacyRoutes />
                    </Suspense>
                  } />
                  <Route path="/market/*" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <MarketRoutes />
                    </Suspense>
                  } />
                  <Route path="/personal-care/*" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <PersonalCareRoutes />
                    </Suspense>
                  } />
                  
                  {/* المسارات المحمية الأخرى */}
                  <Route path="/*" element={
                    <Suspense fallback={<LoadingFallback />}>
                      <ProtectedRoutes />
                    </Suspense>
                  } />
                </Routes>
              </div>
            )}
            <div className={showSplash ? 'hidden' : 'block'}>
              <BottomNav />
            </div>
          </TooltipProvider>
        </UserProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default App;
