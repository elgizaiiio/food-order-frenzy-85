
import React, { useMemo, useCallback } from 'react';
import { MapPin, Plus, Home, Briefcase, Edit, Check, ChevronLeft } from 'lucide-react';
import { useCheckout, Address } from '@/context/CheckoutContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface AddressSelectorProps {
  onAddNewClick: () => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ onAddNewClick }) => {
  const { addresses, selectedAddressId, selectAddress } = useCheckout();
  
  // تحسين الأداء باستخدام useMemo لمنع إعادة الحساب غير الضرورية
  const getAddressIcon = useCallback((address: Address) => {
    if (address.title === 'المنزل') return <Home className="w-4 h-4" />;
    if (address.title === 'العمل') return <Briefcase className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  }, []);

  // استخدام handleAddNewClick مع useCallback لتحسين الأداء
  const handleAddNewClick = useCallback(() => {
    onAddNewClick();
  }, [onAddNewClick]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-500" />
          عنوان التوصيل
        </h3>
      </div>

      <div className="space-y-3">
        <RadioGroup value={selectedAddressId || undefined} onValueChange={selectAddress} className="space-y-3">
          {addresses.map((address) => (
            <div key={address.id} className="relative">
              <RadioGroupItem
                value={address.id}
                id={`address-${address.id}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`address-${address.id}`}
                className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 p-1.5 rounded-full bg-gray-100">
                      {getAddressIcon(address)}
                    </div>
                    <div>
                      <p className="font-medium">{address.title}</p>
                      <p className="text-sm text-gray-500">{address.fullAddress}</p>
                      <p className="text-xs mt-1 text-gray-400">{address.phone}</p>
                    </div>
                  </div>
                  {selectedAddressId === address.id && (
                    <Check className="text-brand-500 w-5 h-5" />
                  )}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {/* زر إضافة عنوان جديد */}
        <Button 
          variant="outline" 
          onClick={handleAddNewClick}
          className="w-full flex justify-center items-center gap-2 border-dashed border-gray-300 h-16 hover:border-brand-400 hover:bg-brand-50"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عنوان جديد</span>
        </Button>
      </div>
    </div>
  );
};

// استخدام memo لمنع إعادة التقديم غير الضرورية
export default React.memo(AddressSelector);
