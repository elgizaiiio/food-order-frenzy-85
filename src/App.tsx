
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { MarketCartProvider } from "@/context/MarketCartContext";
import { PharmacyCartProvider } from "@/context/PharmacyCartContext";
import { PersonalCareCartProvider } from "@/context/PersonalCareCartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FirebaseProvider } from "@/context/FirebaseContext";
import BottomNav from "./components/BottomNav";
import AuthGuard from "./components/AuthGuard";
import { Suspense, lazy, useState, useEffect } from "react";

// استخدام التحميل الكسول للصفحات لتحسين الأداء
const OnboardingScreen = lazy(() => import("./pages/OnboardingScreen"));
const SplashScreen = lazy(() => import("./components/SplashScreen"));

// تحميل كسول لصفحات التوصيل
const DeliveryRequest = lazy(() => import("./pages/DeliveryRequest"));
const DeliveryTracking = lazy(() => import("./pages/DeliveryTracking"));
const DeliveryDetails = lazy(() => import("./pages/DeliveryDetails"));
const DeliveryHelp = lazy(() => import("./pages/DeliveryHelp"));

// تحميل كسول لصفحات العناية الشخصية
const PersonalCare = lazy(() => import("./pages/PersonalCare"));
const PersonalCareCategory = lazy(() => import("./pages/PersonalCareCategory"));
const PersonalCareProduct = lazy(() => import("./pages/PersonalCareProduct"));
const PersonalCareCart = lazy(() => import("./pages/PersonalCareCart"));
const PersonalCareCheckout = lazy(() => import("./pages/PersonalCareCheckout"));
const PersonalCareTracking = lazy(() => import("./pages/PersonalCareTracking"));

// تحميل كسول لصفحات الصالة الرياضية
const Gym = lazy(() => import("./pages/Gym"));
const GymSubscription = lazy(() => import("./pages/GymSubscription"));
const GymPayment = lazy(() => import("./pages/GymPayment"));
const GymSuccess = lazy(() => import("./pages/GymSuccess"));
const GymSubscriptions = lazy(() => import("./pages/GymSubscriptions"));

// تحميل كسول لصفحات الملف الشخصي
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const Settings = lazy(() => import("./pages/Settings"));
const EditContactInfo = lazy(() => import("./pages/EditContactInfo"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const NotificationSettings = lazy(() => import("./pages/NotificationSettings"));
const Addresses = lazy(() => import("./pages/Addresses"));
const AddAddress = lazy(() => import("./pages/AddAddress"));
const EditAddress = lazy(() => import("./pages/EditAddress"));
const PaymentMethods = lazy(() => import("./pages/PaymentMethods"));
const AddPaymentMethod = lazy(() => import("./pages/AddPaymentMethod"));
const Orders = lazy(() => import("./pages/Orders"));
const Coupons = lazy(() => import("./pages/Coupons"));
const ChatSupport = lazy(() => import("./pages/ChatSupport"));
const InviteFriends = lazy(() => import("./pages/InviteFriends"));
const DamBro = lazy(() => import("./pages/DamBro"));

// تحميل كسول لصفحات المصادقة والتطبيق الرئيسي
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Index = lazy(() => import("./pages/Index"));
const Restaurants = lazy(() => import("./pages/Restaurants"));
const RestaurantMenu = lazy(() => import("./pages/RestaurantMenu"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Pharmacy = lazy(() => import("./pages/Pharmacy"));
const PharmacyCart = lazy(() => import("./pages/PharmacyCart"));
const PharmacyCheckout = lazy(() => import("./pages/PharmacyCheckout"));
const PharmacyTracking = lazy(() => import("./pages/PharmacyTracking"));
const DamMarket = lazy(() => import("./pages/DamMarket"));
const MarketCategory = lazy(() => import("./pages/MarketCategory"));
const MarketCart = lazy(() => import("./pages/MarketCart"));
const MarketCheckout = lazy(() => import("./pages/MarketCheckout"));
const MarketTracking = lazy(() => import("./pages/MarketTracking"));

// مكون التحميل للصفحات
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// إنشاء كائن QueryClient داخل دالة المكون لتفادي مشكلة القراءة من null
const App = () => {
  // تأكد من إنشاء queryClient داخل المكون مع إعدادات تحسين الأداء
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
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash ? (
          <Routes>
            <Route path="*" element={
              <Suspense fallback={<LoadingFallback />}>
                <SplashScreen setShowSplash={setShowSplash} />
              </Suspense>
            } />
          </Routes>
        ) : (
          <AppContent />
        )}
      </TooltipProvider>
    </FirebaseProvider>
  );
};

// إنشاء مكون AppContent لتنظيم الشيفرة وفصل المكونات
const AppContent = () => {
  return (
    <>
      <div className="pb-24">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* صفحة الترحيب يمكن الوصول إليها بدون مصادقة */}
            <Route path="/onboarding" element={<OnboardingScreen />} />
            
            {/* مسارات المصادقة - لا تتطلب مصادقة */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* المسارات المحمية */}
            <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
            
            {/* مسارات التوصيل */}
            <Route path="/delivery-request" element={<AuthGuard><DeliveryRequest /></AuthGuard>} />
            <Route path="/delivery-tracking" element={<AuthGuard><DeliveryTracking /></AuthGuard>} />
            <Route path="/delivery-tracking/:id" element={<AuthGuard><DeliveryDetails /></AuthGuard>} />
            <Route path="/delivery-help" element={<AuthGuard><DeliveryHelp /></AuthGuard>} />
            
            {/* Nested Route Sections */}
            <Route path="/pharmacy/*" element={<PharmacyRoutes />} />
            <Route path="/market/*" element={<MarketRoutes />} />
            <Route path="/personal-care/*" element={<PersonalCareRoutes />} />
            
            {/* Gym Routes */}
            <Route path="/gym" element={<AuthGuard><Gym /></AuthGuard>} />
            <Route path="/gym/:id/subscribe" element={<AuthGuard><GymSubscription /></AuthGuard>} />
            <Route path="/gym/payment" element={<AuthGuard><GymPayment /></AuthGuard>} />
            <Route path="/gym/success" element={<AuthGuard><GymSuccess /></AuthGuard>} />
            <Route path="/gym/subscriptions" element={<AuthGuard><GymSubscriptions /></AuthGuard>} />
            
            {/* مسارات الملف الشخصي */}
            <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="/edit-profile" element={<AuthGuard><EditProfile /></AuthGuard>} />
            <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
            <Route path="/edit-contact-info" element={<AuthGuard><EditContactInfo /></AuthGuard>} />
            <Route path="/change-password" element={<AuthGuard><ChangePassword /></AuthGuard>} />
            <Route path="/notification-settings" element={<AuthGuard><NotificationSettings /></AuthGuard>} />
            <Route path="/addresses" element={<AuthGuard><Addresses /></AuthGuard>} />
            <Route path="/add-address" element={<AuthGuard><AddAddress /></AuthGuard>} />
            <Route path="/edit-address/:addressId" element={<AuthGuard><EditAddress /></AuthGuard>} />
            <Route path="/payment-methods" element={<AuthGuard><PaymentMethods /></AuthGuard>} />
            <Route path="/add-payment-method" element={<AuthGuard><AddPaymentMethod /></AuthGuard>} />
            <Route path="/orders" element={<AuthGuard><Orders /></AuthGuard>} />
            <Route path="/coupons" element={<AuthGuard><Coupons /></AuthGuard>} />
            <Route path="/chat-support" element={<AuthGuard><ChatSupport /></AuthGuard>} />
            <Route path="/invite-friends" element={<AuthGuard><InviteFriends /></AuthGuard>} />
            <Route path="/dam-bro" element={<AuthGuard><DamBro /></AuthGuard>} />
            
            {/* مسار التقاط الكل */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <BottomNav />
    </>
  );
};

// Create wrapper components for cart contexts
const PharmacyRoutes = () => (
  <PharmacyCartProvider>
    <Routes>
      <Route path="/" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <Pharmacy />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/cart" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PharmacyCart />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/checkout" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PharmacyCheckout />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/tracking" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PharmacyTracking />
          </Suspense>
        </AuthGuard>
      } />
    </Routes>
  </PharmacyCartProvider>
);

const MarketRoutes = () => (
  <MarketCartProvider>
    <Routes>
      <Route path="/" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <DamMarket />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/category/:id" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <MarketCategory />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/cart" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <MarketCart />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/checkout" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <MarketCheckout />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/tracking" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <MarketTracking />
          </Suspense>
        </AuthGuard>
      } />
    </Routes>
  </MarketCartProvider>
);

const PersonalCareRoutes = () => (
  <PersonalCareCartProvider>
    <Routes>
      <Route path="/" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PersonalCare />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/category/:categoryId" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PersonalCareCategory />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/product/:productId" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PersonalCareProduct />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/cart" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PersonalCareCart />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/checkout" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PersonalCareCheckout />
          </Suspense>
        </AuthGuard>
      } />
      <Route path="/tracking" element={
        <AuthGuard>
          <Suspense fallback={<LoadingFallback />}>
            <PersonalCareTracking />
          </Suspense>
        </AuthGuard>
      } />
    </Routes>
  </PersonalCareCartProvider>
);

export default App;
