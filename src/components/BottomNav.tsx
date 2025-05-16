
import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, UserRound } from 'lucide-react';
import { useTouch } from "@/hooks/use-touch";
import { useIsMobile } from '@/hooks/use-mobile';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useIsMobile();

  // التحقق إذا كانت الصفحة الحالية هي صفحة دفع أو صفحات تسجيل الدخول/التسجيل
  const isAuthPage = path === '/login' || path === '/register' || path === '/forgot-password';

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
      className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-slate-200"
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        maxWidth: '768px', 
        margin: '0 auto'
      }}
    >
      <div className="flex justify-around items-center h-16 px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              item.active ? 'text-orange-600 font-medium' : 'text-gray-500'
            }`}
          >
            <div 
              className={`${item.active ? 'text-orange-600' : 'text-gray-500'} ${item.active ? 'scale-110' : ''} transition-transform`}
            >
              {item.icon}
            </div>
            <span className="text-xs mt-1">{item.name}</span>
            {item.active && (
              <div className="absolute bottom-1 w-1.5 h-1.5 bg-orange-600 rounded-full" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

// استخدام memo لمنع إعادة الرسم غير الضروري
export default memo(BottomNav);
