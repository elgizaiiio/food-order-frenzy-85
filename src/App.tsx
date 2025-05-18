
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { FirebaseProvider } from "@/context/FirebaseContext";
import BottomNav from "./components/BottomNav";
import { Suspense, lazy, useState, useEffect } from "react";
import LoadingFallback from "./components/LoadingFallback";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import PharmacyRoutes from "./routes/PharmacyRoutes";
import MarketRoutes from "./routes/MarketRoutes";
import PersonalCareRoutes from "./routes/PersonalCareRoutes";

// استخدام التحميل الكسول للصفحات لتحسين الأداء
const SplashScreen = lazy(() => import("./components/SplashScreen"));

// تبسيط مكون التطبيق الرئيسي
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  // إخفاء شاشة البداية بعد مرور وقت معين
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800); // عرض شاشة البداية لوقت أقصر
    
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
                {/* مسارات التطبيق المختلفة */}
                <Route path="/pharmacy/*" element={<PharmacyRoutes />} />
                <Route path="/market/*" element={<MarketRoutes />} />
                <Route path="/personal-care/*" element={<PersonalCareRoutes />} />
                
                {/* مسارات عامة (تشمل المصادقة والصفحات العامة) */}
                <Route path="/onboarding" element={<PublicRoutes />} />
                <Route path="/login" element={<PublicRoutes />} />
                <Route path="/register" element={<PublicRoutes />} />
                <Route path="/forgot-password" element={<PublicRoutes />} />
                
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
