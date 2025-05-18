
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import LoadingFallback from "@/components/LoadingFallback";

// تحميل كسول للصفحات
const Index = React.lazy(() => import("@/pages/Index"));
const Restaurants = React.lazy(() => import("@/pages/Restaurants"));

// صفحات أخرى - يمكن إضافة المزيد حسب الحاجة
const Profile = React.lazy(() => import("@/pages/Profile"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Index />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/restaurants"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Restaurants />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Profile />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="*"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default ProtectedRoutes;
