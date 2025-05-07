
import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة، الرياض', 'برج المملكة، الرياض']);

  const navigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="px-4 pt-6 pb-2 animate-fade-in bg-white">
      {/* App Name and Profile Button */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold text-primary">
          <span className="text-gray-800">dam</span>
        </h1>
        <Button variant="ghost" size="icon" className="rounded-full" onClick={navigateToProfile}>
          <User className="h-5 w-5" />
        </Button>
      </div>

      {/* Delivery Address */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center gap-1 text-gray-700">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">التوصيل إلى</span>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="h-auto p-0 mx-1 flex items-center gap-1">
                <span className="font-medium text-gray-900">{address}</span>
                <ChevronDown className="w-4 h-4 text-primary" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60" align="start">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">العناوين المحفوظة</h4>
                {savedAddresses.map((addr, idx) => (
                  <Button key={idx} variant="ghost" className="w-full justify-start text-sm" onClick={() => setAddress(addr)}>
                    <MapPin className="w-4 h-4 mr-2" />
                    {addr}
                  </Button>
                ))}
                <Button variant="outline" className="w-full text-xs mt-2">
                  إضافة عنوان جديد
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Input 
          type="search" 
          placeholder="دور على المطاعم والي انت عايزه" 
          className="w-full py-6 pl-4 pr-10 rounded-full bg-gray-50 border-none shadow-sm text-right" 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)} 
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Header;
