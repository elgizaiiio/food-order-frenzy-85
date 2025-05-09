
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { MarketCartProvider } from "@/context/MarketCartContext";
import { PharmacyCartProvider } from "@/context/PharmacyCartContext";
import { PersonalCareCartProvider } from "@/context/PersonalCareCartContext";
import BottomNav from "./components/BottomNav";
import AuthGuard from "./components/AuthGuard";
// Personal Care Section
import PersonalCare from "./pages/PersonalCare";
import PersonalCareCategory from "./pages/PersonalCareCategory";
import PersonalCareProduct from "./pages/PersonalCareProduct";
import PersonalCareCart from "./pages/PersonalCareCart";
import PersonalCareCheckout from "./pages/PersonalCareCheckout";
import PersonalCareTracking from "./pages/PersonalCareTracking";
// Clothes Section
import Clothes from "./pages/Clothes";
import ClothesCategory from "./pages/ClothesCategory";
import ClothesCart from "./pages/ClothesCart";
import ClothesCheckout from "./pages/ClothesCheckout";
// Gym Section
import Gym from "./pages/Gym";
import GymSubscription from "./pages/GymSubscription";
import GymPayment from "./pages/GymPayment";
import GymSuccess from "./pages/GymSuccess";
import GymSubscriptions from "./pages/GymSubscriptions";
// User Profile Section
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import EditContactInfo from "./pages/EditContactInfo";
import ChangePassword from "./pages/ChangePassword";
import NotificationSettings from "./pages/NotificationSettings";
import Addresses from "./pages/Addresses";
import PaymentMethods from "./pages/PaymentMethods";
import AddPaymentMethod from "./pages/AddPaymentMethod";
import Orders from "./pages/Orders";
import Coupons from "./pages/Coupons";
import About from "./pages/About";
import ChatSupport from "./pages/ChatSupport";
import InviteFriends from "./pages/InviteFriends";
import DamBro from "./pages/DamBro";
// Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Index from "./pages/Index";
import Restaurants from "./pages/Restaurants";
import RestaurantMenu from "./pages/RestaurantMenu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import Pharmacy from "./pages/Pharmacy";
import PharmacyCart from "./pages/PharmacyCart";
import PharmacyCheckout from "./pages/PharmacyCheckout";
import PharmacyTracking from "./pages/PharmacyTracking";
import DamMarket from "./pages/DamMarket";
import MarketCategory from "./pages/MarketCategory";
import MarketCart from "./pages/MarketCart";
import MarketCheckout from "./pages/MarketCheckout";
import MarketTracking from "./pages/MarketTracking";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Create wrapper components for cart contexts
const PharmacyRoutes = () => (
  <PharmacyCartProvider>
    <Routes>
      <Route path="/" element={<AuthGuard><Pharmacy /></AuthGuard>} />
      <Route path="/cart" element={<AuthGuard><PharmacyCart /></AuthGuard>} />
      <Route path="/checkout" element={<AuthGuard><PharmacyCheckout /></AuthGuard>} />
      <Route path="/tracking" element={<AuthGuard><PharmacyTracking /></AuthGuard>} />
    </Routes>
  </PharmacyCartProvider>
);

const MarketRoutes = () => (
  <MarketCartProvider>
    <Routes>
      <Route path="/" element={<AuthGuard><DamMarket /></AuthGuard>} />
      <Route path="/category/:id" element={<AuthGuard><MarketCategory /></AuthGuard>} />
      <Route path="/cart" element={<AuthGuard><MarketCart /></AuthGuard>} />
      <Route path="/checkout" element={<AuthGuard><MarketCheckout /></AuthGuard>} />
      <Route path="/tracking" element={<AuthGuard><MarketTracking /></AuthGuard>} />
    </Routes>
  </MarketCartProvider>
);

const PersonalCareRoutes = () => (
  <PersonalCareCartProvider>
    <Routes>
      <Route path="/" element={<AuthGuard><PersonalCare /></AuthGuard>} />
      <Route path="/category/:categoryId" element={<AuthGuard><PersonalCareCategory /></AuthGuard>} />
      <Route path="/product/:productId" element={<AuthGuard><PersonalCareProduct /></AuthGuard>} />
      <Route path="/cart" element={<AuthGuard><PersonalCareCart /></AuthGuard>} />
      <Route path="/checkout" element={<AuthGuard><PersonalCareCheckout /></AuthGuard>} />
      <Route path="/tracking" element={<AuthGuard><PersonalCareTracking /></AuthGuard>} />
    </Routes>
  </PersonalCareCartProvider>
);

const AppContent = () => {
  return (
    <>
      <div className="pb-16"> {/* Add padding to the bottom to prevent content from being hidden by the navigation bar */}
        <Routes>
          {/* Authentication Routes - Not Protected */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
          <Route path="/restaurants" element={<AuthGuard><Restaurants /></AuthGuard>} />
          <Route path="/restaurant/:id" element={<AuthGuard><RestaurantMenu /></AuthGuard>} />
          <Route path="/cart" element={<AuthGuard><Cart /></AuthGuard>} />
          <Route path="/checkout" element={<AuthGuard><Checkout /></AuthGuard>} />
          <Route path="/tracking" element={<AuthGuard><OrderTracking /></AuthGuard>} />
          <Route path="/about" element={<AuthGuard><About /></AuthGuard>} />
          
          {/* Nested Route Sections */}
          <Route path="/pharmacy/*" element={<PharmacyRoutes />} />
          <Route path="/market/*" element={<MarketRoutes />} />
          <Route path="/personal-care/*" element={<PersonalCareRoutes />} />
          
          {/* Clothes Routes */}
          <Route path="/clothes" element={<AuthGuard><Clothes /></AuthGuard>} />
          <Route path="/clothes/category/:categoryId" element={<AuthGuard><ClothesCategory /></AuthGuard>} />
          <Route path="/clothes/cart" element={<AuthGuard><ClothesCart /></AuthGuard>} />
          <Route path="/clothes/checkout" element={<AuthGuard><ClothesCheckout /></AuthGuard>} />
          
          {/* Gym Routes */}
          <Route path="/gym" element={<AuthGuard><Gym /></AuthGuard>} />
          <Route path="/gym/:id/subscribe" element={<AuthGuard><GymSubscription /></AuthGuard>} />
          <Route path="/gym/payment" element={<AuthGuard><GymPayment /></AuthGuard>} />
          <Route path="/gym/success" element={<AuthGuard><GymSuccess /></AuthGuard>} />
          <Route path="/gym/subscriptions" element={<AuthGuard><GymSubscriptions /></AuthGuard>} />
          
          {/* Profile Routes */}
          <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path="/edit-profile" element={<AuthGuard><EditProfile /></AuthGuard>} />
          <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
          <Route path="/edit-contact-info" element={<AuthGuard><EditContactInfo /></AuthGuard>} />
          <Route path="/change-password" element={<AuthGuard><ChangePassword /></AuthGuard>} />
          <Route path="/notification-settings" element={<AuthGuard><NotificationSettings /></AuthGuard>} />
          <Route path="/addresses" element={<AuthGuard><Addresses /></AuthGuard>} />
          <Route path="/payment-methods" element={<AuthGuard><PaymentMethods /></AuthGuard>} />
          <Route path="/add-payment-method" element={<AuthGuard><AddPaymentMethod /></AuthGuard>} />
          <Route path="/orders" element={<AuthGuard><Orders /></AuthGuard>} />
          <Route path="/coupons" element={<AuthGuard><Coupons /></AuthGuard>} />
          <Route path="/chat-support" element={<AuthGuard><ChatSupport /></AuthGuard>} />
          <Route path="/invite-friends" element={<AuthGuard><InviteFriends /></AuthGuard>} />
          <Route path="/dam-bro" element={<AuthGuard><DamBro /></AuthGuard>} />
          
          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BottomNav />
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
