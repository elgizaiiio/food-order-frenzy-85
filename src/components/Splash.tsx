
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SplashProps {
  duration?: number;
  onComplete?: () => void;
}

const Splash: React.FC<SplashProps> = ({ duration = 2000, onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else {
        navigate('/');
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, navigate, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-brand-500 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative"
      >
        <img 
          src="/dam-logo.png" 
          alt="Dam Logo" 
          className="w-32 h-32"
          loading="eager"
          onError={(e) => {
            // Fallback if logo doesn't exist
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none'%3E%3Crect width='80' height='80' rx='40' fill='%23FF6B00'/%3E%3Cpath d='M24 40C24 35.5817 27.5817 32 32 32H48C52.4183 32 56 35.5817 56 40V40C56 44.4183 52.4183 48 48 48H32C27.5817 48 24 44.4183 24 40V40Z' fill='white'/%3E%3C/svg%3E";
          }}
        />
      </motion.div>
      <motion.h1 
        className="mt-4 text-white text-3xl font-bold"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        دام
      </motion.h1>
      <motion.div 
        className="mt-8 w-16 h-1 bg-white rounded-full overflow-hidden"
        initial={{ width: "0%", opacity: 0 }}
        animate={{ width: "4rem", opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.div 
          className="h-full bg-white"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ delay: 0.4, duration: 0.8, repeat: 1, repeatType: "loop" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Splash;
