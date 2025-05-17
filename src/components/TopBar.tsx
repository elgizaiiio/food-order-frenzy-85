
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface TopBarProps {
  userName?: string;
  address?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  userName,
  address = "مصطفى النحاس، مدينة نصر، القاهرة"
}) => {
  const {
    userName: contextUserName,
    isVerified,
    isBroMember,
    isLoggedIn,
    setBroMember,
    setVerified,
    setUserName
  } = useUser();
  
  const { user } = useAuth();
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  
  const navigate = useNavigate();
  const displayName = contextUserName || userName || userProfile?.name || user?.email?.split('@')[0] || "";
  const profileImage = userProfile?.profile_image || userProfile?.avatar_url || null;
  
  const handleLogout = () => {
    // تنفيذ عملية تسجيل الخروج
    setUserName("محمد");
    setVerified(false);
    setBroMember(false);
    toast.success("خرجت بنجاح من الأكونت");
    navigate('/login');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3">
      <div className="flex items-center justify-between">
        {/* User Profile Link */}
        {isLoggedIn ? (
          <Link to="/profile" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2 mx-[6px] overflow-hidden">
              {profileLoading ? (
                <Skeleton className="h-full w-full" />
              ) : profileImage ? (
                <Avatar className="h-full w-full">
                  <AvatarImage 
                    src={profileImage} 
                    alt={displayName} 
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback className="bg-blue-300 text-blue-800">
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-full w-full">
                  <AvatarFallback className="bg-blue-300 text-blue-800">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                أهلاً، {displayName}
              </span>
              {isVerified && <span className="text-xs text-blue-200">حساب متوثق</span>}
              {isBroMember && <span className="text-xs text-yellow-300">مشترك Bro</span>}
            </div>
          </Link>
        ) : (
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-500 hover:text-white" onClick={handleLogin}>
            <LogIn className="w-4 h-4 mr-2" />
            <span>تسجيل دخول</span>
          </Button>
        )}
        
        {/* Address */}
        <div className="flex items-center text-sm text-blue-100">
          {address}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
