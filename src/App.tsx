
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<OrderTracking />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/pharmacy/cart" element={<PharmacyCart />} />
          <Route path="/pharmacy/checkout" element={<PharmacyCheckout />} />
          <Route path="/pharmacy/tracking" element={<PharmacyTracking />} />
          <Route path="/market" element={<DamMarket />} />
          <Route path="/market/category/:id" element={<MarketCategory />} />
          <Route path="/market/cart" element={<MarketCart />} />
          <Route path="/market/checkout" element={<MarketCheckout />} />
          <Route path="/market/tracking" element={<MarketTracking />} />
          {/* Personal Care Routes */}
          <Route path="/personal-care" element={<PersonalCare />} />
          <Route path="/personal-care/category/:categoryId" element={<PersonalCareCategory />} />
          <Route path="/personal-care/product/:productId" element={<PersonalCareProduct />} />
          <Route path="/personal-care/cart" element={<PersonalCareCart />} />
          <Route path="/personal-care/checkout" element={<PersonalCareCheckout />} />
          <Route path="/personal-care/tracking" element={<PersonalCareTracking />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
