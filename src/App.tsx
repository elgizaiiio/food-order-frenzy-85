
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { MarketCartProvider } from "@/context/MarketCartContext";
import { PharmacyCartProvider } from "@/context/PharmacyCartContext";
import { PersonalCareCartProvider } from "@/context/PersonalCareCartContext";
import BottomNav from "./components/BottomNav";
import Splash from "./components/Splash";
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
import Addresses from "./pages/Addresses";
import PaymentMethods from "./pages/PaymentMethods";
import AddPaymentMethod from "./pages/AddPaymentMethod";
import Orders from "./pages/Orders";
import Coupons from "./pages/Coupons";
import About from "./pages/About";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Create wrapper components for cart contexts
const PharmacyCartRoutes = () => (
  <PharmacyCartProvider>
    <Routes>
      <Route path="/" element={<Pharmacy />} />
      <Route path="/cart" element={<PharmacyCart />} />
      <Route path="/checkout" element={<PharmacyCheckout />} />
      <Route path="/tracking" element={<PharmacyTracking />} />
    </Routes>
  </PharmacyCartProvider>
);

const MarketCartRoutes = () => (
  <MarketCartProvider>
    <Routes>
      <Route path="/" element={<DamMarket />} />
      <Route path="/category/:id" element={<MarketCategory />} />
      <Route path="/cart" element={<MarketCart />} />
      <Route path="/checkout" element={<MarketCheckout />} />
      <Route path="/tracking" element={<MarketTracking />} />
    </Routes>
  </MarketCartProvider>
);

const PersonalCareRoutes = () => (
  <PersonalCareCartProvider>
    <Routes>
      <Route path="/" element={<PersonalCare />} />
      <Route path="/category/:categoryId" element={<PersonalCareCategory />} />
      <Route path="/product/:productId" element={<PersonalCareProduct />} />
      <Route path="/cart" element={<PersonalCareCart />} />
      <Route path="/checkout" element={<PersonalCareCheckout />} />
      <Route path="/tracking" element={<PersonalCareTracking />} />
    </Routes>
  </PersonalCareCartProvider>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Use useEffect to manage the splash screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 5 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {showSplash ? (
              <Splash onComplete={() => setShowSplash(false)} />
            ) : (
              <>
                <div className="pb-16"> {/* Add padding to the bottom to prevent content from being hidden by the navigation bar */}
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/splash" element={<Splash />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/restaurant/:id" element={<RestaurantMenu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/tracking" element={<OrderTracking />} />
                    <Route path="/about" element={<About />} />
                    
                    {/* Pharmacy routes with PharmacyCartProvider */}
                    <Route path="/pharmacy/*" element={<PharmacyCartRoutes />} />
                    
                    {/* Market routes with MarketCartProvider */}
                    <Route path="/market/*" element={<MarketCartRoutes />} />
                    
                    {/* Personal Care Routes with PersonalCareCartProvider */}
                    <Route path="/personal-care/*" element={<PersonalCareRoutes />} />
                    
                    {/* Clothes Routes */}
                    <Route path="/clothes" element={<Clothes />} />
                    <Route path="/clothes/category/:categoryId" element={<ClothesCategory />} />
                    <Route path="/clothes/cart" element={<ClothesCart />} />
                    <Route path="/clothes/checkout" element={<ClothesCheckout />} />
                    {/* Gym Routes */}
                    <Route path="/gym" element={<Gym />} />
                    <Route path="/gym/:id/subscribe" element={<GymSubscription />} />
                    <Route path="/gym/payment" element={<GymPayment />} />
                    <Route path="/gym/success" element={<GymSuccess />} />
                    <Route path="/gym/subscriptions" element={<GymSubscriptions />} />
                    {/* Profile Routes */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/addresses" element={<Addresses />} />
                    <Route path="/payment-methods" element={<PaymentMethods />} />
                    <Route path="/add-payment-method" element={<AddPaymentMethod />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/coupons" element={<Coupons />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <BottomNav />
              </>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
