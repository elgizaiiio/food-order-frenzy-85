
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">الصفحة غير موجودة</h2>
        <p className="text-gray-500 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
        
        <Link to="/">
          <Button className="bg-primary text-white flex items-center gap-2">
            <Home className="w-4 h-4" />
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
