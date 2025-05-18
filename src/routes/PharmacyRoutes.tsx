
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import { PharmacyCartProvider } from "@/context/PharmacyCartContext";

// مكون للتحميل للصفحات
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// تحميل كسول للصفحات
const Pharmacy = React.lazy(() => import("@/pages/Pharmacy"));
const PharmacyCart = React.lazy(() => import("@/pages/PharmacyCart"));
const PharmacyCheckout = React.lazy(() => import("@/pages/PharmacyCheckout"));
const PharmacyTracking = React.lazy(() => import("@/pages/PharmacyTracking"));

const PharmacyRoutes: React.FC = () => {
  return (
    <PharmacyCartProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <Pharmacy />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PharmacyCart />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/checkout"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PharmacyCheckout />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/tracking"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PharmacyTracking />
              </Suspense>
            </AuthGuard>
          }
        />
      </Routes>
    </PharmacyCartProvider>
  );
};

export default PharmacyRoutes;
