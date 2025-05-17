
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // التحقق مما إذا كان المستخدم قد شاهد شاشة الترحيب من قبل
    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';

    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      // بعد الانتهاء من الرسوم المتحركة، ننتقل إلى الصفحة المناسبة
      setTimeout(() => {
        if (user) {
          // إذا كان المستخدم مسجل دخول، انتقل إلى الصفحة الرئيسية
          navigate('/');
        } else if (onboardingComplete) {
          // إذا كان المستخدم قد شاهد شاشة الترحيب، انتقل إلى صفحة تسجيل الدخول
          navigate('/login');
        } else {
          // إذا كان المستخدم جديدًا، انتقل إلى شاشة الترحيب
          navigate('/onboarding');
        }
      }, 500);
    }, 2500); // عرض شاشة البداية لمدة 2.5 ثانية

    return () => clearTimeout(timer);
  }, [navigate, user]);

  return (
    <div className="h-screen w-full overflow-hidden fixed inset-0 bg-[#ea580c] flex flex-col items-center justify-center z-50">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: animationComplete ? 0.8 : 1, opacity: animationComplete ? 0 : 1 }}
        transition={{ 
          type: "spring",
          duration: 1.2,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        {/* لوجو التطبيق الجديد */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-40 h-40 flex items-center justify-center"
        >
          <img 
            src="/lovable-uploads/38d086d7-420f-49f9-9212-a4196a8e1f6d.png" 
            alt="دام" 
            className="w-40 h-40 object-contain"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }} 
          />
        </motion.div>
        
        {/* مؤثرات حركية حول اللوجو */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
          transition={{ 
            delay: 0.5,
            duration: 1.5,
            repeat: 2,
            repeatType: "reverse"
          }}
          className="absolute inset-0 rounded-full border-4 border-white/30"
        />
        
        {/* نص تحميل في الأسفل */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <div className="flex flex-col items-center">
            <div className="mt-8 w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
            <p className="mt-4 text-white/80 text-sm">جاري التحميل...</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* تأثيرات متحركة في الخلفية */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute w-20 h-20 bg-white rounded-full"
            style={{
              filter: "blur(40px)"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
