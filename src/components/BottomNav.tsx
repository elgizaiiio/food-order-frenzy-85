
import React, { memo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, UserRound } from 'lucide-react';
import { useTouch } from "@/hooks/use-touch";
import { useIsMobile } from '@/hooks/use-mobile';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const isMobile = useIsMobile();

  // التحقق إذا كانت الصفحة الحالية هي صفحة دفع أو صفحات تسجيل الدخول/التسجيل
  const isAuthPage = path === '/login' || path === '/register' || path === '/forgot-password';

  // إعداد حركات التمرير للتنقل
  const { handlers } = useTouch({
    onSwipeLeft: () => {
      // التنقل للأمام عند التمرير لليسار
      if (path === '/') navigate('/orders');
      else if (path === '/orders' || path.includes('/order')) navigate('/profile');
    },
    onSwipeRight: () => {
      // التنقل للخلف عند التمرير لليمين
      if (path === '/profile' || path.includes('/edit-profile')) navigate('/orders');
      else if (path === '/orders' || path.includes('/order')) navigate('/');
    }
  }, 75);

  // إضافة استماع لأحداث الشاشة لإخفاء شريط العنوان عند التمرير للأسفل
  useEffect(() => {
    if (!isMobile) return;
    
    let lastScrollY = window.scrollY;
    const nav = document.getElementById('mobile-bottom-nav');
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // التمرير للأسفل - إخفاء الشريط
        nav?.classList.add('nav-hidden');
      } else {
        // التمرير للأعلى - إظهار الشريط
        nav?.classList.remove('nav-hidden');
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // عدم إظهار الشريط في صفحات المصادقة فقط
  if (isAuthPage) {
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
      active: path === '/orders' || path.includes('/order'),
    },
    {
      name: 'حسابي',
      icon: <UserRound className="w-6 h-6" />,
      path: '/profile',
      active: path === '/profile' || path.includes('/edit-profile'),
    },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50"
      {...handlers}
    >
      <nav 
        id="mobile-bottom-nav"
        className="bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] border-t border-gray-100 max-w-md mx-auto transition-transform duration-300"
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        }}
      >
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-5 relative transition-all duration-300 ${
                item.active ? 'text-orange-600' : 'text-gray-500'
              }`}
              aria-label={item.name}
            >
              {item.active && (
                <div className="absolute -top-1 w-12 h-1 bg-orange-500 rounded-full animate-fade-in" />
              )}
              <div 
                className={`
                  ${item.active ? 'text-orange-600 scale-110' : 'text-gray-500'} 
                  transition-all duration-300
                `}
              >
                {item.icon}
              </div>
              <span className={`text-xs mt-1 ${item.active ? 'font-medium' : ''}`}>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

// استخدام memo لمنع إعادة الرسم غير الضروري
export default memo(BottomNav);
