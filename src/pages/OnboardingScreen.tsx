
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ShieldCheck, Rocket, Smartphone } from 'lucide-react';

// بيانات مميزات التطبيق
const features = [
  {
    title: "توصيل سريع",
    description: "استلم طلباتك في أقل من 30 دقيقة",
    icon: <Rocket className="w-10 h-10 text-purple-300" />,
    color: "from-purple-600 to-purple-800"
  },
  {
    title: "خدمة متنوعة",
    description: "من المطاعم إلى البقالة والأدوية ومستلزمات التجميل",
    icon: <Heart className="w-10 h-10 text-pink-300" />,
    color: "from-pink-600 to-purple-700"
  },
  {
    title: "دفع آمن",
    description: "طرق دفع متعددة وآمنة لراحتك",
    icon: <ShieldCheck className="w-10 h-10 text-blue-300" />,
    color: "from-blue-600 to-indigo-700"
  },
  {
    title: "تطبيق محسن",
    description: "تجربة استخدام سلسة على جميع الأجهزة المحمولة",
    icon: <Smartphone className="w-10 h-10 text-green-300" />,
    color: "from-indigo-600 to-blue-700"
  }
];

const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("left");
  const navigate = useNavigate();

  // التحرك للشريحة التالية
  const nextSlide = () => {
    if (currentSlide < features.length - 1) {
      setExitDirection("left");
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
    }
  };

  // التحرك للشريحة السابقة
  const prevSlide = () => {
    if (currentSlide > 0) {
      setExitDirection("right");
      setCurrentSlide(currentSlide - 1);
    }
  };

  // إكمال عملية التعريف والانتقال لصفحة تسجيل الدخول
  const completeOnboarding = () => {
    // تخزين معلومة أن المستخدم قد شاهد الشاشة التعريفية
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/login');
  };

  // حركات الانتقال للشرائح
  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "right" ? -500 : 500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: string) => ({
      x: direction === "right" ? 500 : -500,
      opacity: 0
    })
  };

  const currentFeature = features[currentSlide];
  const isLastSlide = currentSlide === features.length - 1;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-800 to-purple-950 flex flex-col items-center justify-center text-center p-6">
      {/* شعار التطبيق */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <img src="/dam-logo.png" alt="دام" className="w-20 h-20 rounded-full shadow-lg" />
      </motion.div>

      {/* عنوان التطبيق */}
      <motion.h1 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-white mb-12"
      >
        مرحباً بك في تطبيق دام
      </motion.h1>

      {/* عرض الميزات */}
      <div className="relative w-full max-w-md h-64 mb-8 overflow-hidden">
        <AnimatePresence custom={exitDirection} initial={false}>
          <motion.div
            key={currentSlide}
            custom={exitDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${currentFeature.color} rounded-2xl p-6 shadow-lg`}
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mb-4 p-3 bg-white/10 rounded-full backdrop-blur-sm"
            >
              {currentFeature.icon}
            </motion.div>
            <h2 className="text-xl font-bold text-white mb-2">{currentFeature.title}</h2>
            <p className="text-purple-100">{currentFeature.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* مؤشرات الشرائح */}
      <div className="flex justify-center space-x-2 mb-8 rtl:space-x-reverse">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setExitDirection(index < currentSlide ? "right" : "left");
              setCurrentSlide(index);
            }}
            className={`w-2.5 h-2.5 rounded-full ${
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
          <div></div> // مساحة فارغة للحفاظ على المحاذاة
        )}
        
        <Button 
          variant="gradient" 
          onClick={isLastSlide ? completeOnboarding : nextSlide}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 hover:from-purple-600 hover:to-indigo-700"
        >
          {isLastSlide ? "ابدأ الآن" : "التالي"}
        </Button>
      </div>

      {/* تخطي */}
      {!isLastSlide && (
        <button
          onClick={completeOnboarding}
          className="mt-8 text-sm text-purple-300 hover:text-white transition-colors"
        >
          تخطي
        </button>
      )}
    </div>
  );
};

export default OnboardingScreen;
