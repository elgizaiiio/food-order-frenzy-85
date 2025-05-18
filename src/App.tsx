
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { FirebaseProvider } from "@/context/FirebaseContext";
import BottomNav from "./components/BottomNav";
import { Suspense, lazy, useState, useEffect } from "react";
import LoadingFallback from "./components/LoadingFallback";

// استخدام التحميل الكسول للصفحات لتحسين الأداء
const SplashScreen = lazy(() => import("./components/SplashScreen"));

// استيراد مكونات التوجيه
const AppRoutes = lazy(() => import("./routes/AppRoutes"));

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
            <BrowserRouter>
              <Toaster />
              <Sonner />
              {showSplash ? (
                <Suspense fallback={<LoadingFallback />}>
                  <SplashScreen setShowSplash={setShowSplash} />
                </Suspense>
              ) : (
                <Suspense fallback={<LoadingFallback />}>
                  <AppRoutes />
                </Suspense>
              )}
              <div className={showSplash ? 'hidden' : 'block'}>
                <BottomNav />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </UserProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default App;
