
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
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, user]);

  return (
    <div className="fixed inset-0 bg-orange-500 flex items-center justify-center overflow-hidden">
      {/* Container for the animated logo */}
      <div className="relative">
        {/* Animated circles around the text */}
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={`circle-${index}`}
            className="absolute rounded-full border border-white"
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
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + index * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Main circle background */}
        <motion.div
          className="relative w-36 h-36 rounded-full bg-white flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            boxShadow: [
              '0px 0px 0px rgba(255,255,255,0.3)',
              '0px 0px 30px rgba(255,255,255,0.6)',
              '0px 0px 0px rgba(255,255,255,0.3)'
            ]
          }}
          transition={{
            duration: 1.5,
            boxShadow: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }
          }}
        >
          {/* Logo text "dam" */}
          <motion.h1
            className="text-5xl font-bold text-orange-500"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }
            }}
          >
            dam
          </motion.h1>
        </motion.div>
      </div>
      
      {/* Loading indicator */}
      <div className="absolute bottom-20">
        <motion.div
          className="w-16 h-1 bg-white rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 150 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
