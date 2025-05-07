
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  userAddress: string;
  setUserName: (name: string) => void;
  setUserAddress: (address: string) => void;
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

  const value = {
    userName,
    userAddress,
    setUserName,
    setUserAddress
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
