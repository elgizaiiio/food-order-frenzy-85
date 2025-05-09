
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  userName: string;
  userAddress: string;
  isVerified: boolean;
  isBroMember: boolean;
  isLoggedIn: boolean;
  setUserName: (name: string) => void;
  setUserAddress: (address: string) => void;
  setVerified: (status: boolean) => void;
  setBroMember: (status: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState<string>("محمد");
  const [userAddress, setUserAddress] = useState<string>("شارع مصطفى النحاس، مدينة نصر");
  const [isVerified, setVerified] = useState<boolean>(false);
  const [isBroMember, setBroMember] = useState<boolean>(false);
  
  // تحديد ما إذا كان المستخدم قد سجل دخوله بناءً على اسم المستخدم
  const isLoggedIn = userName !== "محمد";

  const value = {
    userName,
    userAddress,
    isVerified,
    isBroMember,
    isLoggedIn,
    setUserName,
    setUserAddress,
    setVerified,
    setBroMember
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
