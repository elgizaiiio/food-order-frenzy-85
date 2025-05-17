
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-red-500 text-4xl font-bold">404</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          الصفحة غير موجودة
        </h1>
        
        <p className="text-gray-600 mb-6">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.
        </p>
        
        <Link to="/">
          <Button className="flex items-center gap-2 mx-auto">
            <ArrowLeft className="w-4 h-4" />
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
