
import React from "react";

const LoadingFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-orange-500 font-medium text-lg animate-pulse">جاري التحميل...</p>
        <p className="text-gray-400 text-sm mt-2">يرجى الانتظار قليلا</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
