
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";

interface TopBarProps {
  userName?: string;
  address?: string;
}

const TopBar: React.FC<TopBarProps> = ({
  userName,
  address = "شارع مصطفى النحاس، مدينة نصر"
}) => {
  const { userName: contextUserName, isVerified, isBroMember, isLoggedIn, setBroMember, setVerified, setUserName } = useUser();
  const navigate = useNavigate();
  const displayName = contextUserName || userName;

  const handleLogout = () => {
    // تنفيذ عملية تسجيل الخروج
    setUserName("محمد");
    setVerified(false);
    setBroMember(false);
    toast.success("تم تسجيل الخروج بنجاح");
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
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2 mx-[6px]">
              <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                مرحباً، {displayName}
              </span>
              {isVerified && (
                <span className="text-xs text-blue-200">حساب موثق</span>
              )}
              {isBroMember && (
                <span className="text-xs text-yellow-300">Bro</span>
              )}
            </div>
          </Link>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-blue-500 hover:text-white"
            onClick={handleLogin}
          >
            <LogIn className="w-4 h-4 mr-2" />
            <span>تسجيل الدخول</span>
          </Button>
        )}
        
        {/* Address */}
        <div className="flex items-center text-sm text-blue-100">
          {isLoggedIn && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-100 hover:bg-blue-500 hover:text-white p-1"
              onClick={handleLogout}
            >
              تسجيل الخروج
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
