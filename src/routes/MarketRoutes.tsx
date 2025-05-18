
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import { MarketCartProvider } from "@/context/MarketCartContext";

// مكون للتحميل للصفحات
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// تحميل كسول للصفحات
const DamMarket = React.lazy(() => import("@/pages/DamMarket"));
const MarketCategory = React.lazy(() => import("@/pages/MarketCategory"));
const MarketCart = React.lazy(() => import("@/pages/MarketCart"));
const MarketCheckout = React.lazy(() => import("@/pages/MarketCheckout"));
const MarketTracking = React.lazy(() => import("@/pages/MarketTracking"));

const MarketRoutes: React.FC = () => {
  return (
    <MarketCartProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <DamMarket />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/category/:id"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <MarketCategory />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <MarketCart />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/checkout"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <MarketCheckout />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/tracking"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <MarketTracking />
              </Suspense>
            </AuthGuard>
          }
        />
      </Routes>
    </MarketCartProvider>
  );
};

export default MarketRoutes;
