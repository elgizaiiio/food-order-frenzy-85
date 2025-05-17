
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  // استعلم عن اسم المستخدم عندما يتغير حالة الاتصال
  useEffect(() => {
    // التحقق من جلسة المستخدم الحالية عند بدء التطبيق
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        // استعلام عن بيانات الملف الشخصي
        const { data: userData, error } = await supabase
          .from('users')
          .select('name')
          .eq('id', data.session.user.id)
          .single();
          
        if (!error && userData && userData.name) {
          setUserName(userData.name);
        } else if (data.session.user.user_metadata?.name) {
          setUserName(data.session.user.user_metadata.name);
        }
      }
    };
    
    checkUserSession();
    
    // الاستماع لتغييرات حالة الاتصال
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // استعلام عن بيانات الملف الشخصي عند تسجيل الدخول
          const { data: userData, error } = await supabase
            .from('users')
            .select('name')
            .eq('id', session.user.id)
            .single();
            
          if (!error && userData && userData.name) {
            setUserName(userData.name);
          } else if (session.user.user_metadata?.name) {
            setUserName(session.user.user_metadata.name);
          }
        } else if (event === 'SIGNED_OUT') {
          setUserName("محمد");
          setVerified(false);
          setBroMember(false);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
