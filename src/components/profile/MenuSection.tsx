
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin, CreditCard, Package, Ticket, MessageSquare, UserPlus, LogOut, AlertCircle } from 'lucide-react';
import { useFirebase } from '@/context/FirebaseContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

// مكون قائمة الإعدادات للتعامل معه بشكل منفصل
const MenuItem = ({ to, icon: Icon, label, badge }: { to: string; icon: React.ElementType; label: string; badge?: number }) => (
  <Link to={to}>
    <div className="flex items-center justify-between p-4 border-b border-gray-100">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center ml-3">
          <Icon className="w-5 h-5 text-orange-600" />
        </div>
        <span className="text-gray-800 font-medium">{label}</span>
      </div>
      <div className="flex items-center">
        {badge && badge > 0 && (
          <Badge className="bg-red-500 text-white mr-2">{badge}</Badge>
        )}
        <ChevronLeft className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  </Link>
);

interface MenuSectionProps {
  handleSignOut: () => Promise<void>;
}

const MenuSection: React.FC<MenuSectionProps> = ({ handleSignOut }) => {
  const { user } = useAuth();
  const { getData } = useFirebase();
  const [pendingOrders, setPendingOrders] = useState(0);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // جلب بيانات الطلبات المعلقة من Firebase
  useEffect(() => {
    const fetchPendingOrders = async () => {
      if (!user?.id) return;
      
      try {
        // جلب عدد الطلبات المعلقة
        const pendingOrdersData = await getData(`users/${user.id}/orders/pending`);
        if (pendingOrdersData) {
          setPendingOrders(pendingOrdersData.count || 0);
        }
        
        // جلب حالة الإشعارات
        const notificationsData = await getData(`users/${user.id}/notifications/unread`);
        if (notificationsData) {
          setHasNotifications(notificationsData.hasUnread || false);
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات من Firebase:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPendingOrders();
  }, [user?.id, getData]);

  return (
    <div className="p-4">
      <h3 className="font-bold text-lg mb-3 text-gray-700 pr-2">إعدادات الحساب</h3>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <MenuItem to="/addresses" icon={MapPin} label="العناوين" />
        <MenuItem to="/payment-methods" icon={CreditCard} label="طرق الدفع" />
        <MenuItem to="/orders" icon={Package} label="الطلبات السابقة" badge={pendingOrders} />
        <MenuItem to="/coupons" icon={Ticket} label="الكوبونات" />
      </div>
      
      <h3 className="font-bold text-lg mb-3 mt-6 text-gray-700 pr-2">المزيد</h3>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <MenuItem 
          to="/chat-support" 
          icon={hasNotifications ? AlertCircle : MessageSquare} 
          label="الدعم الفني" 
          badge={hasNotifications ? 1 : 0}
        />
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
