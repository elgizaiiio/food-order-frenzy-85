
import { Link } from 'react-router-dom';
import { MapPin, Plus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UserAddress } from '@/services/userService';
import { useUserAddresses } from '@/hooks/useUserData';

export interface AddressSelectorProps {
  onAddNewClick: () => void;
  addresses?: UserAddress[];
  selectedAddressId: string | null;
  onAddressSelect: (id: string) => void;
}

const AddressSelector = ({ 
  onAddNewClick, 
  addresses: propAddresses, 
  selectedAddressId, 
  onAddressSelect 
}: AddressSelectorProps) => {
  // استخدام العناوين من الخاصية إذا توفرت، وإلا استخدام العناوين من القاعدة البيانات
  const { data: hookAddresses, isLoading } = useUserAddresses();
  const addresses = propAddresses || hookAddresses || [];

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          عناويني
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600 hover:text-blue-800"
          onClick={onAddNewClick}
        >
          <Plus className="w-4 h-4 mr-1" /> 
          عنوان جديد
        </Button>
      </div>
      
      <RadioGroup value={selectedAddressId || undefined} onValueChange={onAddressSelect}>
        <div className="space-y-3">
          {addresses && addresses.length > 0 ? (
            addresses.map((address) => (
              <div key={address.id} className="relative">
                <RadioGroupItem
                  value={address.id}
                  id={`address-${address.id}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`address-${address.id}`}
                  className="flex flex-col gap-1 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{address.label}</span>
                      {address.is_default && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                          افتراضي
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{address.full_address}</p>
                  <p className="text-xs text-gray-500">{address.phone_number}</p>
                </Label>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500 bg-gray-50 rounded-lg">
              لا توجد عناوين محفوظة
            </div>
          )}
        </div>
      </RadioGroup>

      {addresses && addresses.length > 0 && (
        <Link to="/profile/addresses" className="text-sm text-blue-600 hover:text-blue-800 flex justify-center mt-2">
          إدارة العناوين
        </Link>
      )}
    </div>
  );
};

export default AddressSelector;
