
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"
import BottomNav from './components/BottomNav';

// الصفحات
import Index from './pages/Index';
import About from './pages/About';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import LoginPage from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import DeliveryRequest from './pages/DeliveryRequest';
import DamMarket from './pages/DamMarket';
import Restaurants from './pages/Restaurants';
import RestaurantMenu from './pages/RestaurantMenu';
import Pharmacy from './pages/Pharmacy';
import PharmacyCategory from './pages/PharmacyCategory';
import PersonalCare from './pages/PersonalCare';
import Gym from './pages/Gym';

function App() {
  return (
    <>
      <div className="app-container" style={{ maxWidth: '768px', margin: '0 auto', position: 'relative', minHeight: '100dvh' }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/delivery-request" element={<DeliveryRequest />} />
          <Route path="/market" element={<DamMarket />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/pharmacy/category/:id" element={<PharmacyCategory />} />
          <Route path="/personal-care" element={<PersonalCare />} />
          <Route path="/gym" element={<Gym />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </div>
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}

export default App;
