import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, EyeOff, Eye, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, isLoading } = useAuth();
  
  const from = location.state?.from?.pathname || '/';
  
  // تعديل منطق إعادة التوجيه لمنع الحلقة اللانهائية
  useEffect(() => {
    // تجنب إعادة التوجيه أثناء تحميل حالة المستخدم
    if (isLoading) return;
    
    // فقط إذا كان المستخدم موجودًا، قم بإعادة التوجيه
    if (user && !redirecting) {
      setRedirecting(true);
      console.log("تم تسجيل الدخول بالفعل، جاري التوجيه إلى:", from);
      
      // استخدام setTimeout لتأخير إعادة التوجيه وتجنب حلقات التحديث اللانهائية
      const redirectTimer = setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [user, navigate, from, isLoading, redirecting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    
    setLoading(true);
    
    try {
      await signIn(email, password);
      toast.success('تم تسجيل الدخول بنجاح');
      // لا داعي لإعادة التوجيه هنا، useEffect سيقوم بذلك تلقائيًا
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول:', error);
      
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const logoVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };
  
  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  // الآن يمكننا إضافة رسالة تحميل بينما نقوم بالتحقق من حالة المستخدم
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-orange-600 font-medium">جاري التحقق من بيانات الدخول...</p>
      </div>
    );
  }
  
  // إذا كان المستخدم مسجل دخوله بالفعل وفي طور إعادة التوجيه
  if (user && redirecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-orange-600 font-medium">أنت مسجل دخول بالفعل، جاري إعادة التوجيه...</p>
      </div>
    );
  }
  
  // إذا كان المستخدم مسجل دخوله بالفعل، يجب عدم عرض نموذج تسجيل الدخول
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-orange-600 font-medium">أنت مسجل دخول بالفعل، جاري إعادة التوجيه...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 overflow-hidden relative" dir="rtl">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-100 opacity-40 -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-orange-100 opacity-50 -z-10 transform -translate-x-1/3 translate-y-1/4"></div>
      
      <motion.div 
        className="max-w-md mx-auto pt-8 pb-16 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-orange-600 hover:text-orange-800 transition-colors">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-white p-2 rounded-full shadow-sm"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
          </Link>
          <motion.h1 
            className="text-2xl font-bold text-orange-800 flex-1 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            تسجيل الدخول
          </motion.h1>
          <div className="w-6"></div>
        </div>
        
        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-orange-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg"
            variants={logoVariants}
          >
            <UserCheck className="w-12 h-12 text-white" />
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              className="space-y-3"
              variants={itemVariants}
            >
              <Label htmlFor="email" className="text-md font-semibold text-orange-800 block pr-1">
                البريد الإلكتروني
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-12 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-300 transition-all shadow-sm text-base"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-3"
              variants={itemVariants}
            >
              <Label htmlFor="password" className="text-md font-semibold text-orange-800 block pr-1">
                كلمة المرور
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-300 transition-all shadow-sm text-base"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-orange-500" />
                </div>
                <motion.button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-orange-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-orange-500" />
                  )}
                </motion.button>
              </div>
              <div className="text-right">
                <Link 
                  to="/forgot-password"
                  className="text-sm text-orange-600 hover:text-orange-800 hover:underline transition-colors font-medium"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="pt-2"
            >
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-1"
                disabled={loading}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-300 to-transparent opacity-30 transform -skew-x-30 transition-all duration-1000 group-hover:translate-x-full"></span>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>جاري تسجيل الدخول...</span>
                  </div>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
        
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div
            className="py-3"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Link to="/register" className="inline-block">
              <p className="text-orange-800 text-lg">
                <span className="text-orange-600 font-bold hover:text-orange-700 transition-colors">معندكش حساب؟</span>
                {" "}
                <span className="text-orange-600 font-bold hover:text-orange-700 transition-colors relative group">
                  سجل دلوقتي
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </p>
            </Link>
          </motion.div>
          
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mt-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </motion.div>
        
        <motion.div 
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="text-sm text-gray-500 text-center w-full">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
