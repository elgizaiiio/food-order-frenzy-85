
import React from "react";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50" dir="rtl">
      <div className="w-24 h-24 bg-orange-100 rounded-full mb-6 flex items-center justify-center">
        <span className="text-4xl font-bold text-orange-500">404</span>
      </div>
      <h1 className="text-2xl font-bold mb-2 text-gray-800">الصفحة غير موجودة</h1>
      <p className="text-gray-600 mb-6 text-center">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
      </p>
      <Button onClick={handleGoHome} className="bg-orange-500 hover:bg-orange-600">
        العودة للصفحة الرئيسية
      </Button>
    </div>
  );
};

export default NotFound;
