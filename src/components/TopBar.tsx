import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, User } from 'lucide-react';
interface TopBarProps {
  userName?: string;
  address?: string;
}
const TopBar: React.FC<TopBarProps> = ({
  userName = "محمد",
  address = "شارع مصطفى النحاس، مدينة نصر"
}) => {
  return <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3">
      <div className="flex items-center justify-between">
        {/* User Profile Link */}
        <Link to="/profile" className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2 mx-[6px]">
            <User className="w-5 h-5" />
          </div>
          <span className="font-medium text-sm">
            مرحباً، {userName}
          </span>
        </Link>
        
        {/* Address */}
        <div className="flex items-center text-sm text-blue-100">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate max-w-[150px]">{address}</span>
        </div>
      </div>
    </div>;
};
export default TopBar;