import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';
export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // بيانات العناوين - في تطبيق حقيقي ستأتي من API
  const [address, setAddress] = useState('شارع الملك فهد');
  const [savedAddresses, setSavedAddresses] = useState(['شارع الملك فهد', 'حي النزهة، الرياض', 'برج المملكة، الرياض']);
  const navigateToProfile = () => {
    navigate('/profile');
  };
  return <div className="px-4 py-4 animate-fade-in bg-white">
      {/* تحديد العنوان */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-blue-700">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">التوصيل إلى</span>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link" className="h-auto p-0 mx-1 flex items-center gap-1.5 text-blue-900">
                <span className="font-medium">{address}</span>
                <ChevronDown className="w-4 h-4 text-blue-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60" align="start">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-blue-900">العناوين المحفوظة</h4>
                {savedAddresses.map((addr, idx) => <Button key={idx} variant="ghost" className="w-full justify-start text-sm hover:bg-blue-50 hover:text-blue-700" onClick={() => setAddress(addr)}>
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    {addr}
                  </Button>)}
                <Button variant="outline" className="w-full text-xs mt-2 text-blue-700 border-blue-300 hover:bg-blue-50 hover:border-blue-400">
                  إضافة عنوان جديد
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* شريط البحث */}
      <div className="relative mb-2">
        
        <div className="absolute inset-y-0 right-3 flex items-center">
          
        </div>
      </div>
    </div>;
};