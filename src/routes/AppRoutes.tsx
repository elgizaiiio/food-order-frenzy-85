
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingFallback from "@/components/LoadingFallback";

// استيراد مكونات التوجيه
const ProtectedRoutes = React.lazy(() => import("./ProtectedRoutes"));
const PublicRoutes = React.lazy(() => import("./PublicRoutes"));
const PharmacyRoutes = React.lazy(() => import("./PharmacyRoutes"));
const MarketRoutes = React.lazy(() => import("./MarketRoutes"));
const PersonalCareRoutes = React.lazy(() => import("./PersonalCareRoutes"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* المسارات العامة - catch root path and redirects appropriately */}
      <Route 
        path="/" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PublicRoutes />
          </Suspense>
        } 
      />
      
      {/* Handle specific public routes */}
      <Route 
        path="/onboarding/*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PublicRoutes />
          </Suspense>
        } 
      />
      <Route 
        path="/login/*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PublicRoutes />
          </Suspense>
        } 
      />
      <Route 
        path="/register/*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PublicRoutes />
          </Suspense>
        } 
      />
      <Route 
        path="/forgot-password/*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PublicRoutes />
          </Suspense>
        } 
      />
      
      {/* مسارات التطبيق المختلفة */}
      <Route 
        path="/pharmacy/*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PharmacyRoutes />
          </Suspense>
        } 
      />
      <Route 
        path="/market/*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <MarketRoutes />
          </Suspense>
        } 
      />
      <Route 
        path="/personal-care/*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <PersonalCareRoutes />
          </Suspense>
        } 
      />
      
      {/* المسارات المحمية الأخرى */}
      <Route 
        path="*" 
        element={
          <Suspense fallback={<LoadingFallback />}>
            <ProtectedRoutes />
          </Suspense>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
