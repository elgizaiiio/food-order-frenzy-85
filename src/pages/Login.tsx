import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
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
import { supabase } from "@/integrations/supabase/client";

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
  const {
    setUserName,
    setVerified,
    setBroMember,
    isLoggedIn
  } = useUser();

  // إذا كان المستخدم مسجل دخول بالفعل، فإننا نقوم بتوجيهه إلى الصفحة الرئيسية
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

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
  return <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl font-bold">Dam</span>
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">أهلاً بك في دام</h1>
          <p className="text-gray-600 text-lg">قم بتسجيل الدخول للاستمرار واستمتع بتجربتنا</p>
        </div>
        
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-gray-700 font-medium">البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="أدخل بريدك الإلكتروني" className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" {...field} />
                          
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={form.control} name="password" render={({
                field
              }) => <FormItem>
                      <FormLabel className="text-gray-700 font-medium">كلمة المرور</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="أدخل كلمة المرور" className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" {...field} />
                          
                          <button type="button" onClick={togglePasswordVisibility} className="absolute left-3 top-3.5">
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-medium shadow-md transition-all hover:shadow-lg" disabled={loading.email}>
                  {loading.email ? <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري تسجيل الدخول...
                    </span> : "تسجيل الدخول"}
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500 text-sm font-medium">أو استمر بواسطة</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 border-gray-300 hover:bg-gray-50 shadow-sm transition-all hover:shadow" onClick={handleGoogleLogin} disabled={loading.google}>
            {loading.google ? <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> : <>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 mr-2" />
                <span>Google</span>
              </>}
          </Button>
          <Button variant="outline" className="h-12 border-gray-300 hover:bg-gray-50 shadow-sm transition-all hover:shadow" onClick={handleAppleLogin} disabled={loading.apple}>
            {loading.apple ? <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> : <>
                <Apple className="w-5 h-5 mr-2" />
                <span>Apple</span>
              </>}
          </Button>
        </div>
      </div>
    </div>;
};
export default Login;