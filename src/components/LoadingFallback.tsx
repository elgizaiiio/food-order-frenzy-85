
import React from "react";

const LoadingFallback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingFallback;
