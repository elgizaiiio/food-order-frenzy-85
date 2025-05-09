
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// تعريف مخطط التحقق من البيانات
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صالح" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  // إعداد نموذج إعادة تعيين كلمة المرور باستخدام React Hook Form
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // معالجة طلب إعادة تعيين كلمة المرور
  const onSubmit = (data: ForgotPasswordFormValues) => {
    // هنا يمكن إضافة معالجة إعادة تعيين كلمة المرور الفعلي عند ربط التطبيق بقاعدة بيانات
    console.log("بريد إعادة تعيين كلمة المرور:", data.email);
    
    // محاكاة طلب إعادة تعيين كلمة المرور الناجح
    toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <Link to="/login" className="flex items-center text-blue-600 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>العودة إلى تسجيل الدخول</span>
        </Link>
        
        <div className="text-center mb-8">
          <div className="inline-block w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center mb-3">
            <span className="text-xl font-bold">Dam</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-900">نسيت كلمة المرور</h1>
          <p className="text-gray-600 mt-2">
            أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
          </p>
        </div>
        
        <Card className="border-none shadow-lg animate-fade-in">
          <CardContent className="pt-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">تم إرسال الرابط</h2>
                <p className="text-gray-600 mb-6">
                  تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من بريدك.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-medium"
                >
                  العودة إلى تسجيل الدخول
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-medium"
                  >
                    إرسال رابط إعادة التعيين
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
