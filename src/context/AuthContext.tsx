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
  setupMFA: () => Promise<string>;
  verifyMFA: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // استرجاع جلسة المستخدم عند تحميل الصفحة
    const initSession = async () => {
      setIsLoading(true);
      
      try {
        // إعداد الاستماع لتغييرات حالة المصادقة أولاً
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
          console.log("تغيير حالة المصادقة:", _event, currentSession?.user?.email);
          
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user);
          } else {
            setSession(null);
            setUser(null);
          }
          
          setIsLoading(false);
        });
        
        // ثم التحقق من وجود جلسة حالية
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('خطأ في جلب بيانات الجلسة', sessionError);
          throw sessionError;
        }
        
        console.log("جلسة المستخدم الحالية:", sessionData?.session?.user?.email);
        
        if (sessionData?.session) {
          setSession(sessionData.session);
          setUser(sessionData.session.user);
        }
        
        // إذا لم يكن هناك جلسة، نحدّث حالة التحميل
        if (!sessionData?.session) {
          setIsLoading(false);
        }

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('خطأ في تهيئة الجلسة', error);
        setIsLoading(false);
      }
    };
    
    // تنفيذ التهيئة
    initSession();
  }, []);

  // تسجيل الدخول
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }
      
      setSession(data.session);
      setUser(data.user);
      console.log("تم تسجيل الدخول بنجاح:", data.user?.email);
      return;
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // إنشاء حساب جديد
  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setIsLoading(true);
      
      // Check password strength before registration
      if (password.length < 8) {
        throw new Error('كلمة المرور يجب أن تتكون من 8 أحرف على الأقل');
      }
      
      if (!/\d/.test(password)) {
        throw new Error('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
      }
      
      if (!/[a-zA-Z]/.test(password)) {
        throw new Error('كلمة المرور يجب أن تحتوي على حرف واحد على الأقل');
      }
      
      // Common password check (simplified version)
      const commonPasswords = ['password', '12345678', 'qwerty123', '123456789'];
      if (commonPasswords.includes(password.toLowerCase())) {
        throw new Error('كلمة المرور غير آمنة وقابلة للتخمين بسهولة');
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
        console.log("تم إنشاء الحساب وتسجيل الدخول:", data.user?.email);
      }
    } catch (error: any) {
      console.error('خطأ في إنشاء الحساب', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // تسجيل الخروج
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

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    setupMFA,
    verifyMFA,
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
