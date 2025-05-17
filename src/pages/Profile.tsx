
import React, { lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Settings, MapPin, CreditCard, Package, Ticket, MessageSquare, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { useUserProfile } from '@/hooks/useUserData';
import { toast } from 'sonner';

// Menu item component for better performance
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

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: userProfile, isLoading } = useUserProfile();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
      toast.success('تم تسجيل الخروج بنجاح');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center" dir="rtl">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-orange-600 font-medium">جاري التحميل...</p>
      </div>
    );
  }
  
  const displayName = userProfile?.name || user?.email?.split('@')[0] || 'المستخدم';
  const profileImage = userProfile?.profile_image || userProfile?.avatar_url || null;
  
  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with gradient background */}
        <div className="relative">
          {/* Gradient background header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-40 rounded-b-3xl shadow-md">
            <div className="flex items-center justify-between p-4">
              <Link to="/" className="text-white hover:text-orange-200 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold text-white">الملف الشخصي</h1>
              <Link to="/settings" className="text-white hover:text-orange-200 transition-colors">
                <Settings className="w-6 h-6" />
              </Link>
            </div>
          </div>
          
          {/* Profile avatar that overlaps the gradient header */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                {profileImage ? (
                  <AvatarImage 
                    src={profileImage} 
                    loading="lazy"
                    alt={displayName}
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <AvatarFallback className="bg-orange-100 text-orange-800 text-4xl font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>
        </div>
        
        {/* User Info with spacing for the avatar */}
        <div className="pt-20 pb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{displayName}</h2>
          <p className="text-orange-600 mb-4">{user?.email}</p>
          
          <Link to="/edit-profile">
            <Button 
              variant="outline" 
              className="rounded-full border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
            >
              تعديل الملف الشخصي
            </Button>
          </Link>
        </div>
        
        {/* Divider */}
        <div className="h-2 bg-gray-100"></div>
        
        {/* Menu Options with improved styling */}
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
      </div>
    </div>
  );
};

export default Profile;
