
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

  // تكوين المتغيرات الرسومية للتحريك
  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.8
      }
    },
    exit: { 
      scale: animationComplete ? 1.2 : 1, 
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-[#1A1F2C] via-[#221F26] to-[#1A1F2C] overflow-hidden flex items-center justify-center"
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* إضافة أشكال هندسية متحركة في الخلفية */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 12 + 4,
              height: Math.random() * 12 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 20,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}

        {/* إضافة حلقات دائرية تنتشر من المنتصف */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`ring-${index}`}
            className="absolute rounded-full border border-white/10"
            style={{
              width: 100,
              height: 100,
              left: "calc(50% - 50px)",
              top: "calc(50% - 50px)"
            }}
            animate={{
              scale: [1, 4],
              opacity: [0.2, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              delay: index * 1.3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <div className="z-10 flex flex-col items-center justify-center">
        {/* لوجو محسن */}
        <motion.div
          className="relative mb-12"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* إضافة تأثير رئيسي للوجو */}
          <div className="relative">
            {/* تأثير الهالة حول الشعار */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-[#7E69AB]/20 blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            
            {/* الدائرة الرئيسية */}
            <div className="relative w-36 h-36 bg-gradient-to-br from-[#7E69AB] to-[#6E59A5] rounded-full flex items-center justify-center shadow-lg shadow-[#7E69AB]/30">
              {/* اسم التطبيق بخط حديث وأنيق */}
              <motion.span
                className="text-5xl font-extrabold tracking-wider text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  textShadow: ["0 0 5px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,0.5)", "0 0 5px rgba(255,255,255,0.5)"]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                DAM
              </motion.span>
            </div>
            
            {/* دوائر نابضة حول الشعار */}
            {[1, 2, 3].map((_, index) => (
              <motion.div 
                key={`pulse-${index}`}
                className="absolute inset-[-5px] rounded-full border border-[#7E69AB]/40"
                animate={{
                  scale: [1, 1.6],
                  opacity: [0.7, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.6,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* شعار التطبيق */}
        <motion.h2 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold bg-gradient-to-r from-purple-100 to-purple-300 bg-clip-text text-transparent mb-4"
        >
          دام
        </motion.h2>
        
        {/* وصف التطبيق */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-[#aaadb0] mb-10 tracking-wide"
        >
          خدمة التوصيل الأسرع في المملكة
        </motion.p>
        
        {/* مؤشر التحميل المحسن */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-14 h-14">
            {/* تأثير دوران الدائرة */}
            <motion.div 
              className="absolute w-full h-full border-t-4 border-r-2 border-[#7E69AB] rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* دائرة ثانوية بسرعة مختلفة */}
            <motion.div 
              className="absolute w-10 h-10 m-2 border-b-4 border-l-2 border-white/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 1.1, duration: 2, repeat: Infinity }}
            className="mt-5 text-[#aaadb0] text-sm font-light"
          >
            جاري التحميل...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
