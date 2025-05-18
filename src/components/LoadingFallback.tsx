
import React from "react";

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-orange-500 font-medium animate-pulse">جاري التحميل...</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
