
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Profile from '@/pages/Profile';
import PaymentMethods from '@/pages/PaymentMethods';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import AuthGuard from '@/components/AuthGuard';
import NotFound from '@/pages/NotFound';
import UnifiedCart from '@/pages/UnifiedCart';
import UnifiedCheckout from '@/pages/UnifiedCheckout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<UnifiedCart />} />
      
      <Route element={<AuthGuard />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/checkout" element={<UnifiedCheckout />} />
        
        {/* الطرق القديمة للتوافق مع التطبيق الحالي */}
        <Route path="/original-cart" element={<Cart />} />
        <Route path="/original-checkout" element={<Checkout />} />
      </Route>

      {/* 404 صفحة غير موجودة */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
