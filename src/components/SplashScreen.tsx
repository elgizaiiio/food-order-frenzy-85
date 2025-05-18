
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Star } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';

    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      setTimeout(() => {
        if (user) {
          navigate('/');
        } else if (onboardingComplete) {
          navigate('/login');
        } else {
          navigate('/onboarding');
        }
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 60 }).map((_, index) => (
            <motion.div
              key={`star-${index}`}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
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
        </div>
        
        {/* Animated nebula-like shapes */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 6 }).map((_, index) => {
            const size = Math.random() * 300 + 200;
            return (
              <motion.div
                key={`nebula-${index}`}
                className="absolute rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-300 blur-3xl"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.2
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 20 + 10,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
        
        {/* Animated shooting stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, index) => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const angle = Math.random() * 60 - 30;
            const distance = Math.random() * 30 + 20;
            const endX = startX + distance * Math.cos(angle * Math.PI / 180);
            const endY = startY + distance * Math.sin(angle * Math.PI / 180);
            
            return (
              <motion.div
                key={`shooting-${index}`}
                className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  width: Math.random() * 30 + 20,
                  left: `${startX}%`,
                  top: `${startY}%`,
                  rotate: `${angle}deg`,
                  originX: 0,
                  opacity: 0
                }}
                animate={{
                  opacity: [0, 1, 0],
                  left: [`${startX}%`, `${endX}%`],
                  top: [`${startY}%`, `${endY}%`],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: index * 3 + Math.random() * 2,
                  ease: "easeOut",
                  repeatDelay: Math.random() * 5 + 10
                }}
              />
            );
          })}
        </div>
        
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-500/10"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        {/* Logo container */}
        <div className="relative mb-12">
          {/* Glowing rings */}
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={`ring-${index}`}
              className="absolute rounded-full border border-white/20"
              style={{
                width: 200 + index * 40,
                height: 200 + index * 40,
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 3 + index,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Animated sparkles around logo */}
          {Array.from({ length: 8 }).map((_, index) => {
            const angle = (index * 45 * Math.PI) / 180;
            const distance = 120;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            return (
              <motion.div
                key={`sparkle-${index}`}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  x: x,
                  y: y,
                }}
              >
                <motion.div
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: index * 0.25,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="text-white/80" size={index % 2 === 0 ? 16 : 12} />
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Main logo */}
          <motion.div
            className="relative w-40 h-40 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1 
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1
            }}
          >
            {/* Glass effect background */}
            <div className="absolute inset-0 rounded-full backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
            
            {/* Inner gradient background */}
            <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
            
            {/* Logo content */}
            <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
              {/* Subtle animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                  repeatDelay: 1
                }}
              />
              
              {/* Logo text */}
              <motion.h1
                className="text-6xl font-black text-white tracking-wide"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255,255,255,0.5)',
                    '0 0 20px rgba(255,255,255,0.7)',
                    '0 0 10px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                DAM
              </motion.h1>
            </div>
          </motion.div>
        </div>
        
        {/* App name */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-white text-center"
            animate={{
              textShadow: [
                '0 0 8px rgba(255,255,255,0.3)',
                '0 0 12px rgba(255,255,255,0.4)',
                '0 0 8px rgba(255,255,255,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            دام
          </motion.h2>
        </motion.div>
        
        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-xl text-white/90 mb-12 font-light tracking-wide text-center relative z-10"
        >
          خدمة التوصيل الأسرع في المملكة
        </motion.p>
        
        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-16 h-16">
            {/* Animated loading ring */}
            <motion.div
              className="absolute w-full h-full rounded-full border-t-2 border-r-2 border-white/80"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Inner animated loading ring */}
            <motion.div
              className="absolute w-10 h-10 m-3 rounded-full border-b-2 border-l-2 border-purple-300/80"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Glowing center */}
            <motion.div
              className="absolute w-4 h-4 m-6 rounded-full bg-white"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
                boxShadow: [
                  '0 0 10px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(255,255,255,0.7)',
                  '0 0 10px rgba(255,255,255,0.5)'
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <motion.div
            className="mt-6 text-white/80 text-sm font-light flex items-center gap-2"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>جاري التحميل</span>
            <motion.span
              animate={{
                opacity: [0, 1, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                repeatType: "loop"
              }}
            >
              ...
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
