
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useViewport } from '@/hooks/useViewport';
import { useNavigate } from 'react-router-dom';

interface SplashScreenProps {
  setShowSplash: React.Dispatch<React.SetStateAction<boolean>>;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ setShowSplash }) => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const { isMobile } = useViewport();
  
  // استخدام useAuth مع التحقق من وجود AuthProvider
  const auth = useAuth();
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  
  // التحقق من حالة المستخدم
  useEffect(() => {
    if (auth.user) {
      setAuthState('authenticated');
    } else if (!auth.isLoading) {
      setAuthState('unauthenticated');
    }
  }, [auth.user, auth.isLoading]);
  
  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    
    // تحسين وقت التحميل للشاشه الافتتاحيه
    const splashTimeout = isMobile ? 1500 : 2000;

    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      setTimeout(() => {
        // تغيير طريقة التنقل لاستخدام setShowSplash أولاً
        setShowSplash(false);
        
        // توجيه المستخدم للصفحة المناسبة بعد إخفاء شاشة البداية
        if (authState === 'authenticated') {
          navigate('/', { replace: true });
        } else if (onboardingComplete) {
          navigate('/login', { replace: true });
        } else {
          navigate('/onboarding', { replace: true });
        }
      }, 300);
    }, splashTimeout);

    return () => clearTimeout(timer);
  }, [navigate, authState, isMobile, setShowSplash]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 flex items-center justify-center overflow-hidden z-50">
      <div className="relative z-10 flex flex-col items-center justify-center px-6 animate-fade-in">
        <motion.div
          className="mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className={`${isMobile ? 'w-32 h-32' : 'w-40 h-40'} rounded-full bg-white flex items-center justify-center shadow-lg`}
          >
            <motion.h1
              className={`${isMobile ? 'text-5xl' : 'text-6xl'} font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent`}
            >
              دام
            </motion.h1>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.p
            className={`text-white ${isMobile ? 'text-base' : 'text-lg'} font-medium tracking-wide`}
          >
            مع دام كل حاجة بقت سهلة
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(SplashScreen);
