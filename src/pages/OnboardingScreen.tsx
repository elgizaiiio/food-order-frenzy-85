
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ShieldCheck, Rocket, Smartphone } from 'lucide-react';

// تحسين بيانات المميزات 
const features = [
  {
    title: "توصيل سريع",
    description: "استلم طلباتك في أقل من 30 دقيقة",
    icon: <Rocket className="w-10 h-10 text-orange-100" />,
    color: "from-orange-600 to-orange-700"
  },
  {
    title: "خدمة متنوعة",
    description: "من المطاعم إلى البقالة والأدوية ومستلزمات التجميل",
    icon: <Heart className="w-10 h-10 text-orange-100" />,
    color: "from-orange-700 to-orange-800"
  },
  {
    title: "دفع آمن",
    description: "طرق دفع متعددة وآمنة لراحتك",
    icon: <ShieldCheck className="w-10 h-10 text-orange-100" />,
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "تطبيق محسن",
    description: "تجربة استخدام سلسة على جميع الأجهزة المحمولة",
    icon: <Smartphone className="w-10 h-10 text-orange-100" />,
    color: "from-orange-600 to-orange-500"
  }
];

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("left");
  const navigate = useNavigate();

  // وظائف التنقل
  const nextSlide = () => {
    if (currentSlide < features.length - 1) {
      setExitDirection("left");
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setExitDirection("right");
      setCurrentSlide(currentSlide - 1);
    }
  };

  // إكمال عملية التعريف
  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/login', { replace: true });
  };

  // حركات الانتقال للشرائح
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0
    })
  };

  const currentFeature = features[currentSlide];
  const isLastSlide = currentSlide === features.length - 1;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#ea580c] to-orange-800 flex flex-col items-center justify-center text-center p-6 overflow-hidden">
      {/* شعار التطبيق */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <h1 className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
            دام
          </h1>
        </div>
      </motion.div>

      {/* عنوان التطبيق */}
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="text-2xl font-bold text-white mb-10"
      >
        مرحباً بك في تطبيق دام
      </motion.h1>

      {/* عرض الميزات */}
      <div className="relative w-full max-w-md h-60 mb-6 overflow-hidden">
        <AnimatePresence custom={exitDirection} initial={false}>
          <motion.div
            key={currentSlide}
            custom={exitDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 25 },
              opacity: { duration: 0.3 }
            }}
            className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${currentFeature.color} rounded-xl p-6 shadow-lg`}
          >
            <div className="mb-4 p-3 bg-white/10 rounded-full">
              {currentFeature.icon}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{currentFeature.title}</h2>
            <p className="text-orange-100">{currentFeature.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* مؤشرات الشرائح */}
      <div className="flex justify-center space-x-2 mb-6 rtl:space-x-reverse">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setExitDirection(index < currentSlide ? "right" : "left");
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`انتقال إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>

      {/* أزرار التنقل */}
      <div className="flex justify-between w-full max-w-md">
        {currentSlide > 0 ? (
          <Button 
            variant="outline" 
            onClick={prevSlide}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            السابق
          </Button>
        ) : (
          <div></div>
        )}
        
        <Button 
          variant="default" 
          onClick={isLastSlide ? completeOnboarding : nextSlide}
          className="bg-white text-[#ea580c] px-6 hover:bg-orange-50"
        >
          {isLastSlide ? "ابدأ الآن" : "التالي"}
        </Button>
      </div>

      {/* تخطي */}
      {!isLastSlide && (
        <button
          onClick={completeOnboarding}
          className="mt-6 text-sm text-orange-200 hover:text-white transition-colors"
        >
          تخطي
        </button>
      )}
    </div>
  );
};

export default OnboardingScreen;
