
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import { PersonalCareCartProvider } from "@/context/PersonalCareCartContext";

// مكون للتحميل للصفحات
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// تحميل كسول للصفحات
const PersonalCare = React.lazy(() => import("@/pages/PersonalCare"));
const PersonalCareCategory = React.lazy(() => import("@/pages/PersonalCareCategory"));
const PersonalCareProduct = React.lazy(() => import("@/pages/PersonalCareProduct"));
const PersonalCareCart = React.lazy(() => import("@/pages/PersonalCareCart"));
const PersonalCareCheckout = React.lazy(() => import("@/pages/PersonalCareCheckout"));
const PersonalCareTracking = React.lazy(() => import("@/pages/PersonalCareTracking"));

const PersonalCareRoutes: React.FC = () => {
  return (
    <PersonalCareCartProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PersonalCare />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PersonalCareCategory />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PersonalCareProduct />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PersonalCareCart />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/checkout"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PersonalCareCheckout />
              </Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/tracking"
          element={
            <AuthGuard>
              <Suspense fallback={<LoadingFallback />}>
                <PersonalCareTracking />
              </Suspense>
            </AuthGuard>
          }
        />
      </Routes>
    </PersonalCareCartProvider>
  );
};

export default PersonalCareRoutes;
