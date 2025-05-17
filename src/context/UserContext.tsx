
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
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
  
  // تحسين استرجاع بيانات المستخدم مع منع الطلبات غير الضرورية
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      console.log("استرجاع بيانات المستخدم:", userId);
      const { data, error } = await supabase
        .from('users')
        .select('name')
        .eq('id', userId)
        .single();
        
      if (!error && data && data.name) {
        setUserName(data.name);
        console.log("تم تعيين اسم المستخدم من قاعدة البيانات:", data.name);
        return true;
      }
      return false;
    } catch (error) {
      console.error("خطأ في استرجاع بيانات المستخدم:", error);
      return false;
    }
  }, []);

  // استعلم عن اسم المستخدم عندما يتغير حالة الاتصال
  useEffect(() => {
    let isMounted = true;
    
    // التحقق من جلسة المستخدم الحالية عند بدء التطبيق
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      
      if (data.session?.user) {
        const userId = data.session.user.id;
        
        // محاولة استرجاع بيانات المستخدم من قاعدة البيانات أولاً
        const fetchedFromDB = await fetchUserProfile(userId);
        
        // إذا لم تنجح محاولة استرجاع البيانات من قاعدة البيانات، استخدم بيانات المستخدم من الجلسة
        if (!fetchedFromDB && isMounted) {
          if (data.session.user.user_metadata?.name) {
            setUserName(data.session.user.user_metadata.name);
            console.log("تم تعيين اسم المستخدم من بيانات الجلسة:", data.session.user.user_metadata.name);
          }
        }
      }
    };
    
    checkUserSession();
    
    // الاستماع لتغييرات حالة الاتصال
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        if (event === 'SIGNED_IN' && session?.user) {
          // محاولة استرجاع بيانات المستخدم من قاعدة البيانات أولاً
          const fetchedFromDB = await fetchUserProfile(session.user.id);
          
          // إذا لم تنجح محاولة استرجاع البيانات من قاعدة البيانات، استخدم بيانات المستخدم من الجلسة
          if (!fetchedFromDB && isMounted) {
            if (session.user.user_metadata?.name) {
              setUserName(session.user.user_metadata.name);
              console.log("تم تعيين اسم المستخدم من بيانات الجلسة بعد تسجيل الدخول:", session.user.user_metadata.name);
            }
          }
        } else if (event === 'USER_UPDATED' && session?.user) {
          // محاولة استرجاع بيانات المستخدم من قاعدة البيانات أولاً
          const fetchedFromDB = await fetchUserProfile(session.user.id);
          
          // إذا لم تنجح محاولة استرجاع البيانات من قاعدة البيانات، استخدم بيانات المستخدم من الجلسة
          if (!fetchedFromDB && isMounted) {
            if (session.user.user_metadata?.name) {
              setUserName(session.user.user_metadata.name);
              console.log("تم تعيين اسم المستخدم من بيانات الجلسة بعد تحديث بيانات المستخدم:", session.user.user_metadata.name);
            }
          }
        } else if (event === 'SIGNED_OUT' && isMounted) {
          setUserName("محمد");
          setVerified(false);
          setBroMember(false);
          console.log("تم إعادة تعيين بيانات المستخدم بعد تسجيل الخروج");
        }
      }
    );
    
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

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
