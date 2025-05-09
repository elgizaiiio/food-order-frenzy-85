
import React, { memo, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, UserRound } from 'lucide-react';
import { useTouch } from "@/hooks/use-touch";
import { useIsMobile } from '@/hooks/use-mobile';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // التحقق إذا كانت الصفحة الحالية هي صفحة دفع أو صفحات تسجيل الدخول/التسجيل
  const isCheckoutPage = path.includes('checkout');
  const isCartPage = path.includes('cart');
  const isAuthPage = path === '/login' || path === '/register' || path === '/forgot-password';

  // استخدام مستشعر السحب لإعادة إظهار الشريط عند السحب للأعلى
  const { handlers } = useTouch({
    onSwipeUp: () => {
      setIsVisible(false);
    },
    onSwipeDown: () => {
      setIsVisible(true);
    }
  });

  // إخفاء/إظهار الشريط عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      
      // نتحقق إذا كان التمرير أكثر من 10 بكسل لتجنب الإخفاء/الإظهار السريع
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;
      
      // نخفي الشريط عند التمرير للأسفل ونظهره عند التمرير للأعلى
      if (scrollingDown && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // إذا كانت الصفحة الحالية هي صفحة دفع أو صفحة مصادقة، فلا نعرض شريط التنقل السفلي
  if (isCheckoutPage || isAuthPage) {
    return null;
  }

  const navItems = [
    {
      name: 'الرئيسية',
      icon: <Home className="w-6 h-6" />,
      path: '/',
      active: path === '/',
    },
    {
      name: 'طلباتي',
      icon: <ClipboardList className="w-6 h-6" />,
      path: '/orders',
      active: path === '/orders',
    },
    {
      name: 'حسابي',
      icon: <UserRound className="w-6 h-6" />,
      path: '/profile',
      active: path === '/profile',
    },
  ];

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white shadow-lg border-t border-slate-200 transition-transform duration-300 ${!isVisible ? 'translate-y-full' : ''}`}
      {...handlers}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around items-center h-16 px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              item.active ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}
          >
            <div 
              className={`${item.active ? 'text-blue-600' : 'text-gray-500'} ${item.active ? 'scale-110' : ''} transition-transform`}
            >
              {item.icon}
            </div>
            <span className="text-xs mt-1">{item.name}</span>
            {item.active && (
              <div className="absolute bottom-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

// استخدام memo لمنع إعادة الرسم غير الضروري
export default memo(BottomNav);
