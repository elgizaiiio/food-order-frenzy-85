
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

interface TopBarProps {
  userName?: string;
  address?: string;
}

const TopBar: React.FC<TopBarProps> = ({ userName = "محمد", address = "شارع مصطفى النحاس، مدينة نصر" }) => {
  return (
    <div className="bg-brand-500 text-white pt-4 pb-6 px-4 rounded-b-3xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Dam</h1>
        </div>
        <Link to="/search" className="p-2 bg-white/20 rounded-full">
          <Search className="w-5 h-5 text-white" />
        </Link>
      </div>
      
      <div className="mt-3">
        <div className="flex items-center text-white/90 text-sm mb-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span>التوصيل إلى</span>
        </div>
        <Link to="/addresses" className="flex items-center justify-between">
          <span className="font-medium truncate">{address}</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">تغيير</span>
        </Link>
        
        <div className="mt-4 text-lg font-medium">
          أهلا بيك {userName} 👋
        </div>
      </div>
    </div>
  );
};

export default TopBar;
