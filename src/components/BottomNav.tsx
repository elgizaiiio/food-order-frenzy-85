
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, UserRound, Info } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    {
      name: 'الرئيسية',
      icon: <Home className="w-6 h-6" />,
      path: '/',
      active: path === '/',
    },
    {
      name: 'الطلبات',
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
    {
      name: 'عن الموقع',
      icon: <Info className="w-6 h-6" />,
      path: '/about',
      active: path === '/about',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center h-16 px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              item.active ? 'text-brand-500 font-medium' : 'text-gray-500'
            }`}
          >
            <div className={item.active ? 'text-brand-500' : 'text-gray-500'}>
              {item.icon}
            </div>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
