
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
    }, 1500); // عرض شاشة البداية لوقت أقصر
    
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
              <Routes>
                {/* المسارات العامة */}
                <Route path="/" element={<PublicRoutes />} />
                <Route path="/onboarding/*" element={<PublicRoutes />} />
                <Route path="/login/*" element={<PublicRoutes />} />
                <Route path="/register/*" element={<PublicRoutes />} />
                <Route path="/forgot-password/*" element={<PublicRoutes />} />
                
                {/* مسارات التطبيق المختلفة */}
                <Route path="/pharmacy/*" element={<PharmacyRoutes />} />
                <Route path="/market/*" element={<MarketRoutes />} />
                <Route path="/personal-care/*" element={<PersonalCareRoutes />} />
                
                {/* المسارات المحمية الأخرى */}
                <Route path="/*" element={<ProtectedRoutes />} />
              </Routes>
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
