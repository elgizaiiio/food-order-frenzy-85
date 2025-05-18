
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

// We're removing the useNavigate dependency since this component might be rendered
// outside of a router context in some error scenarios
const NotFound: React.FC = () => {
  const goToHome = () => {
    // Use standard navigation instead of router's navigate
    window.location.href = '/';
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">الصفحة مش موجودة</h2>
        <p className="text-gray-500 mb-8">معلش، الصفحة اللي بتدور عليها مش موجودة.</p>
        
        <Button 
          onClick={goToHome} 
          className="bg-primary text-white flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          ارجع للصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
