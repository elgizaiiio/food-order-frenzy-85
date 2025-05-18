import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
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
  setupMFA: () => Promise<string>;
  verifyMFA: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  // تحسين استرجاع جلسة المستخدم والاشتراك في التغييرات
  useEffect(() => {
    let mounted = true;
    
    // إعداد الاستماع لتغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (!mounted) return;
      
      if (currentSession) {
        setSession(currentSession);
        setUser(currentSession.user);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      }
    });
    
    // تحسين استرجاع الجلسة الحالية بشكل أكثر كفاءة
    const getInitialSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('خطأ في استرجاع الجلسة:', error.message);
        }
        
        if (data?.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (error) {
        console.error('خطأ غير متوقع:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
          setAuthInitialized(true);
        }
      }
    };
    
    getInitialSession();
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // تسجيل الدخول بأداء محسن
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }
      
      setSession(data.session);
      setUser(data.user);
      return;
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // إنشاء حساب جديد بفحوصات أكثر كفاءة
  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setIsLoading(true);
      
      // التحقق من قوة كلمة المرور
      if (password.length < 8) {
        throw new Error('كلمة المرور يجب أن تتكون من 8 أحرف على الأقل');
      }
      
      if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        throw new Error('كلمة المرور يجب أن تحتوي على رقم وحرف واحد على الأقل');
      }
      
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
      }
    } catch (error: any) {
      console.error('خطأ في إنشاء الحساب', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // تسجيل الخروج بشكل أكثر كفاءة
  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('خطأ في تسجيل الخروج', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // إعادة تعيين كلمة المرور
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // إعداد المصادقة الثنائية
  const setupMFA = async (): Promise<string> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
      });
      
      if (error) {
        throw error;
      }
      
      if (!data?.totp) {
        throw new Error('لم يتم إعداد المصادقة الثنائية بشكل صحيح');
      }
      
      return data.totp.qr_code;
    } catch (error) {
      console.error('خطأ في إعداد المصادقة الثنائية', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // التحقق من رمز المصادقة الثنائية
  const verifyMFA = async (code: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // First, create a challenge
      const { data, error } = await supabase.auth.mfa.challenge({
        factorId: 'totp'
      });
      
      if (error) {
        throw error;
      }
      
      // After getting the challenge, verify the code
      if (data) {
        const verifyResult = await supabase.auth.mfa.verify({
          factorId: 'totp',
          challengeId: data.id,
          code
        });
        
        if (verifyResult.error) {
          throw verifyResult.error;
        }
        
        // Fix: Check if verification was successful
        if (verifyResult.data) {
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('خطأ في التحقق من رمز المصادقة الثنائية', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // استخدام useMemo لتحسين الأداء وتقليل إعادة التقييم
  const value = useMemo(() => ({
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    setupMFA,
    verifyMFA,
  }), [user, session, isLoading]);
  
  // تحسين العرض المبدئي
  if (!authInitialized && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('يجب استخدام useAuth داخل AuthProvider');
  }
  
  return context;
};
