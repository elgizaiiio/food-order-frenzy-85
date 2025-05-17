
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CheckoutProvider } from '@/context/CheckoutContext';
import CheckoutContent from '@/components/checkout/CheckoutContent';
import CheckoutButton from '@/components/checkout/CheckoutButton';

const Checkout: React.FC = () => {
  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-blue-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white pb-28"> {/* زيادة التباعد السفلي لمراعاة الشريط السفلي */}
          {/* الرأس */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md z-20">
            <div className="flex items-center justify-between p-4">
              <Link to="/cart" className="text-white hover:text-blue-100">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
              <div className="w-6"></div>
            </div>
          </div>

          {/* محتوى الصفحة */}
          <div className="p-4">
            <CheckoutContent />
          </div>
        </div>
        
        {/* شريط الدفع السفلي الثابت */}
        <div className="fixed bottom-16 left-0 right-0 shadow-lg border-t p-3 z-40 max-w-md mx-auto bg-white">
          <CheckoutButton />
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default Checkout;
