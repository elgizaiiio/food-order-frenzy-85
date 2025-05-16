
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  
  // إذا كان المستخدم مسجل دخوله بالفعل، تحويله إلى الصفحة الرئيسية
  useEffect(() => {
    if (user) {
      console.log("Register page: User already logged in, redirecting to home");
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error('يرجى إدخال جميع الحقول المطلوبة');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('كلمة المرور وتأكيدها غير متطابقين');
      return;
    }
    
    if (password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    
    setLoading(true);
    
    try {
      await signUp(email, password);
      toast.success('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول');
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message.includes('already registered')) {
        toast.error('البريد الإلكتروني مسجل بالفعل');
      } else {
        toast.error('حدث خطأ أثناء التسجيل');
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
          <h1 className="text-2xl font-bold text-blue-900 flex-1 text-center">إنشاء حساب</h1>
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
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-blue-800 block">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="أعد إدخال كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border-blue-200 focus:border-blue-400 focus:ring-blue-300"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-500" />
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
                  <span>جاري إنشاء الحساب...</span>
                </div>
              ) : (
                "إنشاء حساب"
              )}
            </Button>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-blue-800">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
