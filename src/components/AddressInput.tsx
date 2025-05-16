
import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface AddressInputProps {
  currentAddress: string;
  setCurrentAddress: (address: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ currentAddress, setCurrentAddress }) => {
  const savedAddresses = [
    currentAddress,
    'شارع الملك فهد، الرياض',
    'شارع التخصصي، الرياض',
    'حي النخيل، جدة'
  ];

  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <div className="bg-orange-500 p-2 rounded-full">
        <MapPin className="w-4 h-4 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">التوصيل إلى</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="h-auto p-0 flex items-center text-black hover:text-orange-500">
              <span className="text-sm font-medium">{currentAddress}</span>
              <ChevronDown className="w-4 h-4 mr-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="start">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">العناوين المحفوظة</h4>
              {savedAddresses.map((addr, idx) => (
                <Button 
                  key={idx} 
                  variant="ghost" 
                  className="w-full justify-start text-sm hover:bg-orange-50"
                  onClick={() => setCurrentAddress(addr)}
                >
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  {addr}
                </Button>
              ))}
              <Button variant="outline" className="w-full text-xs mt-2 border-orange-300 text-orange-600 hover:bg-orange-50">
                إضافة عنوان جديد
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AddressInput;
