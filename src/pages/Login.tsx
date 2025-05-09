
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Apple } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// تعريف مخطط التحقق من البيانات
const loginSchema = z.object({
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صالح"
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل"
  })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState({
    email: false,
    google: false,
    apple: false
  });
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const {
    setUserName,
    setVerified,
    setBroMember,
    isLoggedIn
  } = useUser();
  
  // إعداد نموذج تسجيل الدخول باستخدام React Hook Form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // معالجة تسجيل الدخول بالبريد الإلكتروني
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading({
        ...loading,
        email: true
      });

      // هنا يمكن إضافة معالجة تسجيل الدخول الفعلي عند ربط التطبيق بقاعدة بيانات
      console.log("بيانات تسجيل الدخول:", data);

      // محاكاة تسجيل الدخول الناجح - في التطبيق الحقيقي سيتم استبدالها بـ API
      setTimeout(() => {
        toast.success("تم تسجيل الدخول بنجاح");
        setUserName("أحمد محمد"); // تعيين اسم المستخدم
        setVerified(true); // تعيين حالة التوثيق
        setBroMember(true); // تعيين حالة العضوية
        setLoading({
          ...loading,
          email: false
        });
        navigate("/"); // التوجيه إلى الصفحة الرئيسية
      }, 1000);
    } catch (error) {
      setLoading({
        ...loading,
        email: false
      });
      toast.error("حدث خطأ أثناء تسجيل الدخول");
      console.error(error);
    }
  };

  // تسجيل الدخول باستخدام جوجل
  const handleGoogleLogin = async () => {
    try {
      setLoading({
        ...loading,
        google: true
      });
      // استخدام supabase في المستقبل
      // محاكاة تسجيل الدخول الناجح
      setTimeout(() => {
        toast.success("تم تسجيل الدخول بنجاح باستخدام Google");
        setUserName("مستخدم Google");
        setVerified(true);
        setLoading({
          ...loading,
          google: false
        });
        navigate("/");
      }, 1000);
    } catch (error) {
      setLoading({
        ...loading,
        google: false
      });
      toast.error("حدث خطأ أثناء تسجيل الدخول باستخدام Google");
      console.error(error);
    }
  };

  // تسجيل الدخول باستخدام أبل
  const handleAppleLogin = async () => {
    try {
      setLoading({
        ...loading,
        apple: true
      });
      // استخدام supabase في المستقبل
      // محاكاة تسجيل الدخول الناجح
      setTimeout(() => {
        toast.success("تم تسجيل الدخول بنجاح باستخدام Apple");
        setUserName("مستخدم Apple");
        setVerified(true);
        setLoading({
          ...loading,
          apple: false
        });
        navigate("/");
      }, 1000);
    } catch (error) {
      setLoading({
        ...loading,
        apple: false
      });
      toast.error("حدث خطأ أثناء تسجيل الدخول باستخدام Apple");
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Make sure we put this after all hooks are called
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-brand-400/95 via-brand-500 to-brand-600 flex flex-col items-center justify-center p-4" 
      dir="rtl"
      style={{ 
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)'
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-24 h-24 rounded-full bg-gradient-to-br from-white to-white/90 text-brand-600 flex items-center justify-center mb-6 shadow-2xl shadow-brand-700/20 animate-bounce-in">
            <span className="text-3xl font-bold">دام</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 animate-fade-in drop-shadow-md">مرحباً بك مجدداً!</h1>
          <p className="text-white/90 text-lg animate-fade-in delay-100">يرجى تسجيل الدخول للاستمتاع بتجربتنا</p>
        </div>
        
        <Card className="border-none shadow-[0_15px_35px_-15px_rgba(0,0,0,0.3)] bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden transform transition-transform hover:scale-[1.01] animate-fade-in delay-200">
          <div className="h-2.5 bg-gradient-to-l from-brand-300 to-brand-500"></div>
          <CardContent className="pt-8 px-8 pb-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="email" render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Input 
                          placeholder="أدخل بريدك الإلكتروني" 
                          className="pl-10 h-14 bg-gray-50/80 border-gray-200 rounded-xl group-hover:border-brand-400 group-hover:shadow-md focus:border-brand-400 focus:ring-brand-400 transition-all" 
                          {...field}
                          autoComplete="email"
                          inputMode="email"
                          type="email"
                        />
                        <Mail className="absolute right-4 top-4.5 h-5 w-5 text-brand-500/70" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-right mr-1" />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="password" render={({field}) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="text-gray-700 font-semibold">كلمة المرور</FormLabel>
                      <Link to="/forgot-password" className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">
                        نسيت كلمة المرور؟
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative group">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="أدخل كلمة المرور" 
                          className="pl-10 h-14 bg-gray-50/80 border-gray-200 rounded-xl group-hover:border-brand-400 group-hover:shadow-md focus:border-brand-400 focus:ring-brand-400 transition-all"
                          autoComplete="current-password"
                          {...field} 
                        />
                        <Lock className="absolute right-4 top-4.5 h-5 w-5 text-brand-500/70" />
                        <button 
                          type="button" 
                          onClick={togglePasswordVisibility} 
                          className="absolute left-3 top-4.5 text-gray-500 hover:text-brand-500 transition-colors touch-manipulation"
                          aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                        >
                          {showPassword ? 
                            <EyeOff className="h-5 w-5" /> : 
                            <Eye className="h-5 w-5" />
                          }
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-right mr-1" />
                  </FormItem>
                )} />
                
                <Button 
                  type="submit" 
                  className="w-full h-14 mt-6 bg-gradient-to-l from-brand-500 to-brand-400 hover:from-brand-600 hover:to-brand-500 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 active:scale-[0.99] transition-all" 
                  disabled={loading.email}
                >
                  {loading.email ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري تسجيل الدخول...
                    </span>
                  ) : "تسجيل الدخول"}
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-8">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link to="/register" className="text-brand-600 hover:text-brand-700 font-bold transition-colors">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center items-center my-8">
          <hr className="flex-grow border-t border-white/40" />
          <span className="px-4 text-white text-sm font-medium">أو استمر بواسطة</span>
          <hr className="flex-grow border-t border-white/40" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-12 border-white/50 bg-white/90 hover:bg-white text-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all touch-manipulation active:scale-[0.98]" 
            onClick={handleGoogleLogin} 
            disabled={loading.google}
          >
            {loading.google ? (
              <svg className="animate-spin h-5 w-5 text-brand-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
                <span>Google</span>
              </div>
            )}
          </Button>
          <Button 
            variant="outline" 
            className="h-12 border-white/50 bg-white/90 hover:bg-white text-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all touch-manipulation active:scale-[0.98]" 
            onClick={handleAppleLogin} 
            disabled={loading.apple}
          >
            {loading.apple ? (
              <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Apple className="w-5 h-5" />
                <span>Apple</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
