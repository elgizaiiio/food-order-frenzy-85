
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
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated stars */}
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={`star-${index}`}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 3 + 2,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Animated geometric shapes */}
        {Array.from({ length: 10 }).map((_, index) => {
          const shapes = ["rounded-full", "rounded-md", "rounded"];
          const colors = [
            "bg-purple-500/10", 
            "bg-indigo-500/10", 
            "bg-blue-500/10",
            "bg-violet-500/10"
          ];
          
          return (
            <motion.div
              key={`shape-${index}`}
              className={`absolute ${shapes[index % shapes.length]} ${colors[index % colors.length]} backdrop-blur-sm`}
              style={{
                width: Math.random() * 80 + 40,
                height: Math.random() * 80 + 40,
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`,
                filter: "blur(8px)",
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                rotate: [0, Math.random() * 90 - 45],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 15 + 15,
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            />
          );
        })}
        
        {/* Expanding rings */}
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={`ring-${index}`}
            className="absolute rounded-full border border-purple-500/20"
            style={{
              width: 100,
              height: 100,
              left: "calc(50% - 50px)",
              top: "calc(50% - 50px)",
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{
              scale: [1, 4],
              opacity: [0.2, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              delay: index * 1,
              ease: "easeOut",
              repeatDelay: 0
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="z-20 flex flex-col items-center justify-center px-6">
        {/* Logo container with enhanced design */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1
            }
          }}
          exit={{ 
            scale: animationComplete ? 1.2 : 1, 
            opacity: 0,
            transition: { duration: 0.5 }
          }}
        >
          {/* Glass effect background */}
          <motion.div 
            className="absolute inset-[-10px] rounded-full backdrop-blur-md bg-white/5 border border-white/10"
            animate={{ 
              boxShadow: ["0 0 20px rgba(167, 139, 250, 0.3)", "0 0 40px rgba(167, 139, 250, 0.5)", "0 0 20px rgba(167, 139, 250, 0.3)"] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Main logo with gradient */}
          <div className="relative w-40 h-40 overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 opacity-80" />
            
            <div className="absolute inset-1 rounded-full bg-black/20 backdrop-blur-sm" />
            
            <motion.div 
              className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-500 flex items-center justify-center"
              animate={{ 
                background: [
                  "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  "linear-gradient(225deg, #8b5cf6 0%, #6366f1 100%)",
                  "linear-gradient(315deg, #8b5cf6 0%, #6366f1 100%)",
                  "linear-gradient(45deg, #8b5cf6 0%, #6366f1 100%)"
                ],
                boxShadow: [
                  "inset 0 0 20px rgba(0,0,0,0.3)",
                  "inset 0 0 30px rgba(0,0,0,0.5)",
                  "inset 0 0 20px rgba(0,0,0,0.3)"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="text-6xl font-extrabold text-white tracking-wider flex items-center justify-center w-full h-full"
                animate={{ 
                  textShadow: [
                    "0 0 8px rgba(255,255,255,0.6)", 
                    "0 0 16px rgba(255,255,255,0.8)", 
                    "0 0 8px rgba(255,255,255,0.6)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                DAM
              </motion.div>
            </motion.div>
          </div>
          
          {/* Animated particles around logo */}
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute w-2 h-2 rounded-full bg-purple-400"
              style={{
                top: "50%",
                left: "50%"
              }}
              animate={{
                x: [0, Math.cos(index * (Math.PI / 4)) * 100],
                y: [0, Math.sin(index * (Math.PI / 4)) * 100],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* App name with animated text effect */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 text-center"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "linear" 
            }}
          >
            دام
          </motion.h2>
        </motion.div>
        
        {/* Tagline with animated fade in */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl text-gray-300 mb-12 tracking-wide text-center"
        >
          خدمة التوصيل الأسرع في المملكة
        </motion.p>
        
        {/* Enhanced loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-16 h-16">
            {/* Outer spinning circle */}
            <motion.div 
              className="absolute w-full h-full rounded-full border-t-4 border-r-2 border-purple-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Middle spinning circle */}
            <motion.div 
              className="absolute w-12 h-12 m-2 rounded-full border-b-4 border-l-2 border-indigo-400"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Inner pulsing circle */}
            <motion.div
              className="absolute w-6 h-6 m-5 rounded-full bg-violet-500/30"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <motion.p 
            className="mt-6 text-gray-400 text-sm font-light"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              y: [0, -2, 0]
            }}
            transition={{ 
              duration: 1.8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            جاري التحميل...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
