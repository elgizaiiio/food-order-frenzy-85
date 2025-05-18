
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

    // تحسين وقت ظهور الشاشة ليكون أقصر للحصول على أداء أفضل
    const splashTimeout = isMobile ? 2000 : 2500;

    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      // تخفيض وقت الانتظار للانتقال إلى الصفحة التالية
      setTimeout(() => {
        if (user) {
          navigate('/', { replace: true });
        } else if (onboardingComplete) {
          navigate('/login', { replace: true });
        } else {
          navigate('/onboarding', { replace: true });
        }
      }, 300); // تحسين وقت الانتقال
    }, splashTimeout);

    return () => clearTimeout(timer);
  }, [navigate, user, isMobile]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 flex items-center justify-center overflow-hidden will-change-transform">
      {/* تحسين أداء الرسوم المتحركة */}
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0.5 }}
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse"
        }}
      >
        <div className="absolute w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] bg-center" />
      </motion.div>
      
      {/* تحسين أداء محتوى الشاشة الرئيسي */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        {/* تحسين أداء رسوم الشعار */}
        <motion.div
          className="mb-16"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className={`${isMobile ? 'w-36 h-36' : 'w-44 h-44'} rounded-full bg-white flex items-center justify-center shadow-lg will-change-transform`}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(255, 255, 255, 0.4)",
                "0 0 40px rgba(255, 255, 255, 0.6)",
                "0 0 20px rgba(255, 255, 255, 0.4)",
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          >
            <motion.h1
              className={`${isMobile ? 'text-6xl' : 'text-7xl'} font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent`}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            >
              دام
            </motion.h1>
          </motion.div>
        </motion.div>
        
        {/* تحسين أداء رسوم الجملة التحفيزية */}
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.p
            className={`text-white ${isMobile ? 'text-lg' : 'text-xl'} font-medium tracking-wide will-change-opacity`}
            animate={{ 
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          >
            مع دام كل حاجه بقت سهله
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(SplashScreen);
