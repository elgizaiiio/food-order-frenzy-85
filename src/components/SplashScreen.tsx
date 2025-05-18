
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
    }, 3500); // Extended animation time to allow for the new effects

    return () => clearTimeout(timer);
  }, [navigate, user]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800 flex items-center justify-center overflow-hidden">
      {/* Background animated particles with subtle effect */}
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute rounded-full bg-white/20"
          style={{
            width: Math.random() * 60 + 15,
            height: Math.random() * 60 + 15,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 0.8],
            opacity: [0, 0.4, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 6 + 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
      
      {/* Main animated text container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Outer expanding circles */}
        <motion.div
          className="absolute rounded-full border-2 border-white/40"
          initial={{ width: 180, height: 180, opacity: 0.7 }}
          animate={{
            width: 500,
            height: 500,
            opacity: 0,
            x: '-50%',
            y: '-50%',
          }}
          style={{
            top: '50%',
            left: '50%',
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
        
        <motion.div
          className="absolute rounded-full border-2 border-white/30"
          initial={{ width: 180, height: 180, opacity: 0.6 }}
          animate={{
            width: 400,
            height: 400,
            opacity: 0,
            x: '-50%',
            y: '-50%',
          }}
          style={{
            top: '50%',
            left: '50%',
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
            repeat: Infinity,
            delay: 0.6,
            repeatDelay: 0.5
          }}
        />
        
        {/* Central Dam text with expanding effect */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="w-44 h-44 rounded-full bg-gradient-to-br from-white to-orange-50 flex items-center justify-center shadow-lg"
            initial={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)" }}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(255, 255, 255, 0.4)",
                "0 0 60px rgba(255, 255, 255, 0.7)",
                "0 0 20px rgba(255, 255, 255, 0.4)",
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.h1
              className="text-7xl font-bold bg-gradient-to-br from-orange-600 to-orange-800 bg-clip-text text-transparent"
              initial={{ scale: 0.7 }}
              animate={{ 
                scale: [0.7, 1, 0.7],
                textShadow: [
                  "0px 0px 0px rgba(236, 117, 0, 0)",
                  "0px 0px 15px rgba(236, 117, 0, 0.7)",
                  "0px 0px 0px rgba(236, 117, 0, 0)",
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              دام
            </motion.h1>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Egyptian dialect loading indicator */}
      <div className="absolute bottom-28">
        <div className="flex flex-col items-center">
          <motion.div
            className="relative w-52 h-2 bg-white/20 rounded-full overflow-hidden mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
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
          
          <motion.div className="flex items-center justify-center">
            <motion.p
              className="text-white/90 text-sm font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, -2, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                times: [0, 0.5, 1]
              }}
            >
              استنى شوية بنحمل التطبيق
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      {/* App name at the bottom in Egyptian dialect */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <h2 className="text-xl text-white/90 font-medium tracking-wide">
          دام - هنوصلك كل حاجة لحد عندك
        </h2>
        <p className="text-white/70 text-sm mt-2 italic">
          أسرع خدمة توصيل في مصر
        </p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
