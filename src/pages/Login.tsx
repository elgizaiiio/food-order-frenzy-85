
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();
  
  // الحصول على المسار السابق أو التوجيه إلى الصفحة الرئيسية
  const from = location.state?.from?.pathname || '/';
  
  // التحقق إذا كان المستخدم مسجل دخوله بالفعل
  useEffect(() => {
    if (user) {
      console.log("تم تسجيل الدخول بالفعل، جاري التوجيه إلى:", from);
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    
    setLoading(true);
    
    try {
      // استخدام دالة تسجيل الدخول من سياق المصادقة
      await signIn(email, password);
      
      // تم تسجيل الدخول بنجاح
      toast.success('تم تسجيل الدخول بنجاح');
      console.log("تم تسجيل الدخول بنجاح، جاري التوجيه إلى:", from);
      // لا حاجة للتوجيه هنا لأن useEffect سيتولى ذلك عندما يتم تحديث حالة المستخدم
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول:', error);
      
      // رسائل خطأ محددة
      if (error.message?.includes('Invalid login credentials')) {
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      } else if (error.message?.includes('Email not confirmed')) {
        toast.error('يرجى التحقق من البريد الإلكتروني لتأكيد الحساب');
      } else {
        toast.error('حدث خطأ أثناء تسجيل الدخول');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto pt-8 pb-16 px-4">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 flex-1 text-center">تسجيل الدخول</h1>
          <div className="w-6"></div> {/* For layout balance */}
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
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
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-blue-800 block">
                كلمة المرور
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border-blue-200 focus:border-blue-400 focus:ring-blue-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-500" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-blue-400 hover:text-blue-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-blue-400 hover:text-blue-600" />
                  )}
                </button>
              </div>
              <div className="text-right">
                <Link 
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>
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
                  <span>جاري تسجيل الدخول...</span>
                </div>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-blue-800">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
