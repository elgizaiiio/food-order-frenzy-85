
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// تعريف مخطط التحقق من البيانات
const registerSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يحتوي على 3 أحرف على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserName } = useUser();
  
  // إعداد نموذج التسجيل باستخدام React Hook Form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // معالجة التسجيل
  const onSubmit = (data: RegisterFormValues) => {
    // هنا يمكن إضافة معالجة التسجيل الفعلي عند ربط التطبيق بقاعدة بيانات
    console.log("بيانات التسجيل:", data);
    
    // محاكاة التسجيل الناجح
    toast.success("تم إنشاء الحساب بنجاح");
    setUserName(data.name); // تعيين اسم المستخدم
    navigate("/"); // التوجيه إلى الصفحة الرئيسية
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center mb-3">
            <span className="text-xl font-bold">Dam</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-900">إنشاء حساب جديد</h1>
          <p className="text-gray-600 mt-2">أهلاً بك، قم بإنشاء حسابك للاستمرار</p>
        </div>
        
        <Card className="border-none shadow-lg animate-fade-in">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">الاسم الكامل</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="أدخل اسمك الكامل" 
                            className="pl-10" 
                            {...field} 
                          />
                          <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="أدخل بريدك الإلكتروني" 
                            className="pl-10" 
                            {...field} 
                          />
                          <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">كلمة المرور</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="أدخل كلمة المرور" 
                            className="pl-10" 
                            {...field} 
                          />
                          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                          <button 
                            type="button"
                            onClick={togglePasswordVisibility} 
                            className="absolute left-3 top-2.5"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">تأكيد كلمة المرور</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="أكد كلمة المرور" 
                            className="pl-10" 
                            {...field} 
                          />
                          <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                          <button 
                            type="button"
                            onClick={toggleConfirmPasswordVisibility} 
                            className="absolute left-3 top-2.5"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-medium"
                >
                  إنشاء حساب
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                لديك حساب بالفعل؟{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500 text-sm">أو استمر بواسطة</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 border-gray-300 hover:bg-gray-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 mr-2" />
            <span>Google</span>
          </Button>
          <Button variant="outline" className="h-12 border-gray-300 hover:bg-gray-50">
            <svg className="w-5 h-5 mr-2 text-[#1877F2]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
            </svg>
            <span>Facebook</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
