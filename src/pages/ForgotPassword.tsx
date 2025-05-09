
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('يرجى إدخال البريد الإلكتروني');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setSuccess(true);
      toast.success('تم إرسال بريد إلكتروني لإعادة ضبط كلمة المرور');
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء إرسال بريد إعادة ضبط كلمة المرور');
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto pt-8 pb-16 px-4">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 flex-1 text-center">نسيت كلمة المرور</h1>
          <div className="w-6"></div> {/* For layout balance */}
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">تم إرسال بريد إلكتروني</h3>
              <p className="text-blue-700 mb-6">
                تم إرسال رابط إعادة ضبط كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك.
              </p>
              <Link to="/login">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  العودة إلى تسجيل الدخول
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <p className="text-blue-700 mb-6">
                أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة ضبط كلمة المرور.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-blue-800 block">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg border-blue-200 focus:border-blue-400 focus:ring-blue-300"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 shadow-md"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>جاري الإرسال...</span>
                    </div>
                  ) : (
                    "إرسال رابط إعادة الضبط"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-blue-800">
            تذكرت كلمة المرور؟{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
