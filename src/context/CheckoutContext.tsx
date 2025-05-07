
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Address {
  id: string;
  title: string;
  fullAddress: string;
  phone: string;
  isDefault?: boolean;
}

export type PaymentMethod = 'cash' | 'wallet' | 'card' | 'fawry';

interface CheckoutContextType {
  addresses: Address[];
  selectedAddressId: string | null;
  paymentMethod: PaymentMethod;
  addAddress: (address: Omit<Address, 'id'>) => void;
  selectAddress: (id: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  isAddingNewAddress: boolean;
  setIsAddingNewAddress: (value: boolean) => void;
  orderTotal: number;
  deliveryFee: number;
  subtotal: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

interface CheckoutProviderProps {
  children: ReactNode;
  initialSubtotal?: number;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ 
  children,
  initialSubtotal = 65 // قيمة افتراضية للطلب
}) => {
  const [addresses, setAddresses] = useState<Address[]>([
    { 
      id: '1', 
      title: 'البيت',
      fullAddress: 'شارع مصطفى النحاس، مدينة نصر، القاهرة',
      phone: '01xxxxxxxx',
      isDefault: true
    },
    { 
      id: '2', 
      title: 'الشغل',
      fullAddress: 'برج القاهرة، وسط البلد، القاهرة',
      phone: '01xxxxxxxx',
      isDefault: false
    }
  ]);
  
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>('1');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  
  const subtotal = initialSubtotal;
  const deliveryFee = 15;
  const orderTotal = subtotal + deliveryFee;

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(), // إنشاء معرّف فريد
    };
    
    setAddresses(prev => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
    setIsAddingNewAddress(false);
  };

  const selectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  const value = {
    addresses,
    selectedAddressId,
    paymentMethod,
    addAddress,
    selectAddress,
    setPaymentMethod,
    isAddingNewAddress,
    setIsAddingNewAddress,
    orderTotal,
    deliveryFee,
    subtotal
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
