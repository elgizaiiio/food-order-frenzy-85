
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SplashProps {
  duration?: number;
  onComplete?: () => void;
  redirectPath?: string;
}

const Splash: React.FC<SplashProps> = ({ 
  duration = 2000, 
  onComplete,
  redirectPath = '/' 
}) => {
  // Use try-catch to safely use useNavigate
  // This will allow the component to work both inside and outside Router context
  let navigate: ReturnType<typeof useNavigate> | undefined;
  
  try {
    navigate = useNavigate();
  } catch (error) {
    // If useNavigate fails, we're outside Router context
    // We'll rely on onComplete callback instead
    console.log('Splash component rendered outside Router context, using onComplete callback instead');
  }

  useEffect(() => {
    // مباشرة تحميل الصفحة التالية بينما يتم عرض الـ splash
    const preloadNextRoute = () => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = redirectPath;
      document.head.appendChild(link);
    };

    preloadNextRoute();

    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else if (navigate) {
        navigate(redirectPath);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, navigate, onComplete, redirectPath]);

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-brand-500 to-brand-600 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative"
      >
        <img 
          src="/dam-logo.png" 
          alt="دام" 
          className="w-32 h-32 rounded-full shadow-lg"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none'%3E%3Crect width='80' height='80' rx='40' fill='%23ff8000'/%3E%3Cpath d='M24 40C24 35.5817 27.5817 32 32 32H48C52.4183 32 56 35.5817 56 40V40C56 44.4183 52.4183 48 48 48H32C27.5817 48 24 44.4183 24 40V40Z' fill='white'/%3E%3C/svg%3E";
          }}
        />
      </motion.div>
      <motion.h1 
        className="mt-4 text-white text-3xl font-bold drop-shadow-md"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        دام
      </motion.h1>
      <motion.p
        className="mt-2 text-orange-100 text-lg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        توصيل سريع لطلباتك
      </motion.p>
      <motion.div 
        className="mt-8 w-16 h-1.5 bg-white/50 rounded-full overflow-hidden"
        initial={{ width: "0%", opacity: 0 }}
        animate={{ width: "4rem", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <motion.div 
          className="h-full bg-white"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ delay: 0.6, duration: 1, repeat: 2, repeatType: "loop" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Splash;
