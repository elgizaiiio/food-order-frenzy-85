
import { useEffect, useState } from 'react';

export function useOnboarding() {
  // حالة لتتبع ما إذا كان قد تم تحميل المعلومات من التخزين المحلي
  const [isLoaded, setIsLoaded] = useState(false);
  // حالة لتتبع ما إذا كان المستخدم جديدًا (لم يشاهد الشاشة التعريفية بعد)
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    // التحقق من التخزين المحلي لمعرفة إذا كان المستخدم قد شاهد شاشة onboarding من قبل
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete') === 'true';
    
    // إذا كان المستخدم قد شاهد شاشة onboarding من قبل، فهو ليس مستخدمًا جديدًا
    setIsNewUser(!hasCompletedOnboarding);
    // تم تحميل المعلومات من التخزين المحلي
    setIsLoaded(true);
  }, []);

  // تعيين حالة المستخدم على أنه ليس جديدًا (بعد مشاهدة شاشة onboarding)
  const setUserAsNotNew = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setIsNewUser(false);
  };

  return {
    isLoaded,
    isNewUser,
    setUserAsNotNew,
  };
}
