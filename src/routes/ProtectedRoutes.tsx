
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";

// مكون للتحميل للصفحات
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// تحميل كسول لصفحات التوصيل
const DeliveryRequest = React.lazy(() => import("@/pages/DeliveryRequest"));
const DeliveryTracking = React.lazy(() => import("@/pages/DeliveryTracking"));
const DeliveryDetails = React.lazy(() => import("@/pages/DeliveryDetails"));
const DeliveryHelp = React.lazy(() => import("@/pages/DeliveryHelp"));

// تحميل كسول لصفحات الصالة الرياضية
const Gym = React.lazy(() => import("@/pages/Gym"));
const GymSubscription = React.lazy(() => import("@/pages/GymSubscription"));
const GymPayment = React.lazy(() => import("@/pages/GymPayment"));
const GymSuccess = React.lazy(() => import("@/pages/GymSuccess"));
const GymSubscriptions = React.lazy(() => import("@/pages/GymSubscriptions"));

// تحميل كسول لصفحات الملف الشخصي
const Profile = React.lazy(() => import("@/pages/Profile"));
const EditProfile = React.lazy(() => import("@/pages/EditProfile"));
const Settings = React.lazy(() => import("@/pages/Settings"));
const EditContactInfo = React.lazy(() => import("@/pages/EditContactInfo"));
const ChangePassword = React.lazy(() => import("@/pages/ChangePassword"));
const NotificationSettings = React.lazy(() => import("@/pages/NotificationSettings"));
const Addresses = React.lazy(() => import("@/pages/Addresses"));
const AddAddress = React.lazy(() => import("@/pages/AddAddress"));
const EditAddress = React.lazy(() => import("@/pages/EditAddress"));
const PaymentMethods = React.lazy(() => import("@/pages/PaymentMethods"));
const AddPaymentMethod = React.lazy(() => import("@/pages/AddPaymentMethod"));
const Orders = React.lazy(() => import("@/pages/Orders"));
const Coupons = React.lazy(() => import("@/pages/Coupons"));
const ChatSupport = React.lazy(() => import("@/pages/ChatSupport"));
const InviteFriends = React.lazy(() => import("@/pages/InviteFriends"));
const DamBro = React.lazy(() => import("@/pages/DamBro"));
const Index = React.lazy(() => import("@/pages/Index"));
const Restaurants = React.lazy(() => import("@/pages/Restaurants"));
const RestaurantMenu = React.lazy(() => import("@/pages/RestaurantMenu"));
const Cart = React.lazy(() => import("@/pages/Cart"));
const Checkout = React.lazy(() => import("@/pages/Checkout"));
const OrderTracking = React.lazy(() => import("@/pages/OrderTracking"));

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

      {/* مسارات التوصيل */}
      <Route
        path="/delivery-request"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <DeliveryRequest />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/delivery-tracking"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <DeliveryTracking />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/delivery-tracking/:id"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <DeliveryDetails />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/delivery-help"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <DeliveryHelp />
            </Suspense>
          </AuthGuard>
        }
      />

      {/* Gym Routes */}
      <Route
        path="/gym"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Gym />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/gym/:id/subscribe"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <GymSubscription />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/gym/payment"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <GymPayment />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/gym/success"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <GymSuccess />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/gym/subscriptions"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <GymSubscriptions />
            </Suspense>
          </AuthGuard>
        }
      />

      {/* مسارات الملف الشخصي */}
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
        path="/edit-profile"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <EditProfile />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Settings />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/edit-contact-info"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <EditContactInfo />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/change-password"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <ChangePassword />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/notification-settings"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <NotificationSettings />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/addresses"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Addresses />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/add-address"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <AddAddress />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/edit-address/:addressId"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <EditAddress />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/payment-methods"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <PaymentMethods />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/add-payment-method"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <AddPaymentMethod />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/orders"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Orders />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/coupons"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Coupons />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/chat-support"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <ChatSupport />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/invite-friends"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <InviteFriends />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/dam-bro"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <DamBro />
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
        path="/restaurant-menu/:id"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <RestaurantMenu />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/cart"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Cart />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/checkout"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <Checkout />
            </Suspense>
          </AuthGuard>
        }
      />
      <Route
        path="/order-tracking"
        element={
          <AuthGuard>
            <Suspense fallback={<LoadingFallback />}>
              <OrderTracking />
            </Suspense>
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default ProtectedRoutes;
