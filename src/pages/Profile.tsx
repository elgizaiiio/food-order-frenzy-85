
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Settings, MapPin, CreditCard, Package, Ticket, MessageSquare, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useUserProfile } from '@/hooks/useUserData';
import { toast } from 'sonner';

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
      <div className="min-h-screen bg-gray-50 flex justify-center items-center" dir="rtl">
        <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  const displayName = userProfile?.name || user?.email?.split('@')[0] || 'المستخدم';
  const profileImage = userProfile?.profile_image || userProfile?.avatar_url || null;
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white sticky top-0 z-10 shadow-md">
          <Link to="/" className="text-white hover:text-brand-200">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الملف الشخصي</h1>
          <Link to="/settings" className="text-white hover:text-brand-200">
            <Settings className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Profile Info */}
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Avatar className="h-20 w-20 border-4 border-white shadow-md">
              {profileImage ? (
                <AvatarImage src={profileImage} />
              ) : null}
              <AvatarFallback className="bg-brand-100 text-brand-800 text-xl">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="mr-4">
              <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
              <p className="text-brand-600">{user?.email}</p>
            </div>
          </div>
          
          <Link to="/edit-profile">
            <Button 
              className="w-full mb-6 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white"
            >
              تعديل الملف الشخصي
            </Button>
          </Link>
          
          {/* Menu Options */}
          <div className="space-y-1">
            <Link to="/addresses">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-gray-900">العناوين</span>
                </div>
                <span className="text-gray-400">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </span>
              </div>
            </Link>
            
            <Link to="/payment-methods">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-gray-900">طرق الدفع</span>
                </div>
                <span className="text-gray-400">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </span>
              </div>
            </Link>
            
            <Link to="/orders">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                    <Package className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-gray-900">الطلبات السابقة</span>
                </div>
                <span className="text-gray-400">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </span>
              </div>
            </Link>
            
            <Link to="/coupons">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                    <Ticket className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-gray-900">الكوبونات</span>
                </div>
                <span className="text-gray-400">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </span>
              </div>
            </Link>
            
            <Link to="/chat-support">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                    <MessageSquare className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-gray-900">الدعم الفني</span>
                </div>
                <span className="text-gray-400">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </span>
              </div>
            </Link>
            
            <Link to="/invite-friends">
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center mr-3">
                    <UserPlus className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-gray-900">دعوة الأصدقاء</span>
                </div>
                <span className="text-gray-400">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </span>
              </div>
            </Link>
            
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors text-right"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-red-600">تسجيل الخروج</span>
              </div>
              <span className="text-red-300">
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
