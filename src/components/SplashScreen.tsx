
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

  // تكوين الفقاعات المتحركة في الخلفية
  const bubbles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 overflow-hidden flex items-center justify-center"
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* فقاعات متحركة في الخلفية */}
      {bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: bubble.delay
          }}
        />
      ))}

      <motion.div 
        className="text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* لوجو التطبيق مع تأثير انبثاق */}
        <motion.div
          className="relative mb-6 mx-auto"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-2">
            <img 
              src="/lovable-uploads/38d086d7-420f-49f9-9212-a4196a8e1f6d.png" 
              alt="دام" 
              className="w-32 h-32 object-contain"
            />
          </div>
          
          {/* تأثير توهج حول الشعار */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-orange-300 -z-10 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* نبضة حول الشعار */}
          {[1, 2, 3].map((_, index) => (
            <motion.div 
              key={index}
              className="absolute inset-0 rounded-full border-2 border-white/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2],
                opacity: [0.7, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5
              }}
            />
          ))}
        </motion.div>
        
        {/* اسم التطبيق */}
        <motion.h1 
          className="text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          دام
        </motion.h1>
        
        {/* شعار التطبيق */}
        <motion.p 
          className="text-lg text-orange-50 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          خدمة التوصيل الأسرع في المملكة
        </motion.p>

        {/* مؤشر التحميل */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="relative w-12 h-12">
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-orange-200/30 border-t-white"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          <p className="mt-4 text-orange-100 text-sm font-light">جاري التحميل...</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
