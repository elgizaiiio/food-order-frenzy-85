
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useViewport } from '@/hooks/useViewport';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [animationComplete, setAnimationComplete] = useState(false);
  const { isMobile } = useViewport();
  
  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    
    // تسريع وقت ظهور الشاشة المبدئية
    const splashTimeout = isMobile ? 1500 : 2000;

    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      setTimeout(() => {
        if (user) {
          navigate('/', { replace: true });
        } else if (onboardingComplete) {
          navigate('/login', { replace: true });
        } else {
          navigate('/onboarding', { replace: true });
        }
      }, 200); // تسريع وقت الانتقال
    }, splashTimeout);

    return () => clearTimeout(timer);
  }, [navigate, user, isMobile]);

  // تبسيط المكونات لتحسين الأداء
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 flex items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <motion.div
          className="mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className={`${isMobile ? 'w-32 h-32' : 'w-40 h-40'} rounded-full bg-white flex items-center justify-center shadow-lg`}
          >
            <motion.h1
              className={`${isMobile ? 'text-6xl' : 'text-7xl'} font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent`}
            >
              دام
            </motion.h1>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.p
            className={`text-white ${isMobile ? 'text-lg' : 'text-xl'} font-medium tracking-wide`}
          >
            مع دام كل حاجه بقت سهله
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(SplashScreen);
