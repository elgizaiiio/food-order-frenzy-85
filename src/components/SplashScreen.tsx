
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

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
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  // Array of motivational phrases in Egyptian dialect
  const motivationalPhrases = [
    "خليك جاهز للي جاي",
    "هنوصلك لأبعد مكان",
    "النجاح رحلة مش وجهة",
    "كل يوم خطوة للأمام",
    "معاك في كل مكان"
  ];
  
  // Randomly select one phrase
  const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center overflow-hidden">
      {/* Subtle background pulse effect */}
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0.5 }}
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] bg-center" />
      </motion.div>
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Main Dam text with slow zoom out effect */}
        <motion.div
          className="mb-16"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            className="w-44 h-44 rounded-full bg-white flex items-center justify-center shadow-lg"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(255, 255, 255, 0.4)",
                "0 0 50px rgba(255, 255, 255, 0.7)",
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
              className="text-7xl font-bold bg-gradient-to-br from-purple-600 to-indigo-800 bg-clip-text text-transparent"
              animate={{ 
                scale: [1, 1.1, 1],
                textShadow: [
                  "0px 0px 0px rgba(79, 70, 229, 0)",
                  "0px 0px 10px rgba(79, 70, 229, 0.7)",
                  "0px 0px 0px rgba(79, 70, 229, 0)",
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
        
        {/* Motivational phrase with animation */}
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.p
            className="text-white text-xl font-medium tracking-wide"
            animate={{ 
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {randomPhrase}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
