
import React from 'react';
import { MapPin, ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => {
  return (
    <div className="px-4 pt-6 pb-2">
      {/* Delivery Address */}
      <div className="flex items-center justify-start mb-4 text-sm">
        <div className="flex items-center gap-1 text-gray-700">
          <MapPin className="w-4 h-4 text-brand-500" />
          <span className="font-medium">التوصيل إلى</span>
        </div>
        <div className="flex items-center gap-1 mx-1">
          <span className="font-medium text-brand-700">شارع الملك فهد</span>
          <ChevronDown className="w-4 h-4 text-brand-500" />
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Input 
          type="search"
          placeholder="دور على المطاعم والي انت عايزه"
          className="w-full py-6 pl-4 pr-10 rounded-full bg-gray-100 border-none text-right"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Header;
