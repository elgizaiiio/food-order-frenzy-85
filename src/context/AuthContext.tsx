
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // استرجاع جلسة المستخدم عند تحميل الصفحة
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('خطأ في جلب بيانات الجلسة', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // تنفيذ جلب الجلسة عند التحميل
    getSession();

    // الاستماع لتغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // تسجيل الدخول
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }
      
      setSession(data.session);
      setUser(data.user);
      console.log("Signed in successfully:", data.user?.email);
      return;
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول', error);
      throw error;
    }
  };

  // إنشاء حساب جديد
  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: userData
        }
      });

      if (error) {
        throw error;
      }
      
      toast.success('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني للتأكيد.');
      
      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        console.log("Signed up and logged in:", data.user?.email);
      }
    } catch (error: any) {
      console.error('خطأ في إنشاء الحساب', error);
      throw error;
    }
  };

  // تسجيل الخروج
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('خطأ في تسجيل الخروج', error);
      throw error;
    }
  };

  // إعادة تعيين كلمة المرور
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    } catch (error) {
      console.error('خطأ في إرسال طلب إعادة تعيين كلمة المرور', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('يجب استخدام useAuth داخل AuthProvider');
  }
  
  return context;
};
