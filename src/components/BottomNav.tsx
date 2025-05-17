
import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Motorcycle, UserRound } from 'lucide-react';
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
      icon: <Home className="w-5 h-5" />,
      path: '/',
      active: path === '/',
    },
    {
      name: 'طلباتي',
      icon: <ClipboardList className="w-5 h-5" />,
      path: '/orders',
      active: path === '/orders' || path.includes('/order'),
    },
    {
      name: 'توصيل',
      icon: <Motorcycle className="w-5 h-5" />,
      path: '/delivery-request',
      active: path.includes('/delivery'),
    },
    {
      name: 'حسابي',
      icon: <UserRound className="w-5 h-5" />,
      path: '/profile',
      active: path === '/profile' || path.includes('/edit-profile'),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav 
        className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-gray-200 max-w-md mx-auto"
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      >
        <div className="flex justify-around items-center h-16 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all 
                ${item.active ? 'text-orange-600 bg-orange-50' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <div 
                className={`${item.active ? 'text-orange-600' : 'text-gray-500'} ${item.active ? 'scale-110' : ''} transition-transform`}
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
