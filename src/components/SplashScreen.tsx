
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  // Particle count for the background effect
  const particleCount = 15;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center overflow-hidden">
      {/* Background animated particles */}
      {Array.from({ length: particleCount }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute rounded-full bg-white/20"
          style={{
            width: Math.random() * 40 + 10,
            height: Math.random() * 40 + 10,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            opacity: [0, 0.7, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* Container for the animated logo */}
      <div className="relative z-10">
        {/* Outer animated rings */}
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={`circle-large-${index}`}
            className="absolute rounded-full border border-white/30"
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
              rotate: [0, 360],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + index * 2,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          />
        ))}
        
        {/* Animated circles around the text */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`circle-${index}`}
            className="absolute rounded-full border-2 border-white/70"
            style={{
              width: 150 + index * 30,
              height: 150 + index * 30,
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + index * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Main circle background with gradient and shadow effect */}
        <motion.div
          className="relative w-40 h-40 rounded-full bg-gradient-to-br from-white to-orange-50 flex items-center justify-center shadow-lg"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: 0,
            boxShadow: [
              '0px 0px 0px rgba(255,255,255,0.3)',
              '0px 0px 50px rgba(255,255,255,0.8)',
              '0px 0px 20px rgba(255,255,255,0.5)'
            ]
          }}
          transition={{
            duration: 1.5,
            boxShadow: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }
          }}
        >
          {/* Logo text "dam" */}
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-br from-orange-600 to-orange-800 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: [0.9, 1.1, 0.9],
              textShadow: [
                '0px 0px 0px rgba(236,117,0,0)',
                '0px 0px 10px rgba(236,117,0,0.5)',
                '0px 0px 0px rgba(236,117,0,0)'
              ]
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              },
              textShadow: {
                repeat: Infinity,
                duration: 2.5,
                ease: "easeInOut"
              }
            }}
          >
            dam
          </motion.h1>
        </motion.div>
      </div>
      
      {/* Advanced loading indicator */}
      <div className="absolute bottom-24">
        <div className="flex flex-col items-center">
          <motion.div
            className="relative w-48 h-2 bg-white/20 rounded-full overflow-hidden mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-white/50 via-white to-white/50 rounded-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          
          <motion.p
            className="text-white/80 text-sm font-light tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              times: [0, 0.5, 1]
            }}
          >
            جاري التحميل
          </motion.p>
        </div>
      </div>
      
      {/* Animated app name at the bottom */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2 className="text-lg text-white/90 font-medium tracking-wide">
          تطبيق دام - توصيل كل شيء
        </h2>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
