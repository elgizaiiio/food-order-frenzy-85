
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin, CreditCard, Package, Ticket, MessageSquare, UserPlus, LogOut } from 'lucide-react';

// مكون قائمة الإعدادات للتعامل معه بشكل منفصل
const MenuItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => (
  <Link to={to}>
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center ml-3">
          <Icon className="w-5 h-5 text-orange-600" />
        </div>
        <span className="text-gray-800 font-medium">{label}</span>
      </div>
      <ChevronLeft className="w-5 h-5 text-gray-400" />
    </div>
  </Link>
);

interface MenuSectionProps {
  handleSignOut: () => Promise<void>;
}

const MenuSection: React.FC<MenuSectionProps> = ({ handleSignOut }) => {
  return (
    <div className="p-4">
      <h3 className="font-bold text-lg mb-3 text-gray-700 pr-2">إعدادات الحساب</h3>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <MenuItem to="/addresses" icon={MapPin} label="العناوين" />
        <MenuItem to="/payment-methods" icon={CreditCard} label="طرق الدفع" />
        <MenuItem to="/orders" icon={Package} label="الطلبات السابقة" />
        <MenuItem to="/coupons" icon={Ticket} label="الكوبونات" />
      </div>
      
      <h3 className="font-bold text-lg mb-3 mt-6 text-gray-700 pr-2">المزيد</h3>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <MenuItem to="/chat-support" icon={MessageSquare} label="الدعم الفني" />
        <MenuItem to="/invite-friends" icon={UserPlus} label="دعوة الأصدقاء" />
      </div>
      
      {/* Logout button with better styling */}
      <div className="mt-6">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-center p-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-colors"
        >
          <LogOut className="w-5 h-5 ml-2" />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
};

export default MenuSection;
