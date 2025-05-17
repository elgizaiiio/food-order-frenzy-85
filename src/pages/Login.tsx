
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, isLoading } = useAuth();
  
  const from = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    if (!isLoading && user) {
      console.log("تم تسجيل الدخول بالفعل، جاري التوجيه إلى:", from);
      navigate(from, { replace: true });
    }
  }, [user, navigate, from, isLoading]);

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
  
  // متغيرات للرسوم المتحركة
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white overflow-hidden" dir="rtl">
      <motion.div 
        className="max-w-md mx-auto pt-8 pb-16 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-orange-600 hover:text-orange-800 transition-colors">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.div>
          </Link>
          <motion.h1 
            className="text-2xl font-bold text-orange-900 flex-1 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            تسجيل الدخول
          </motion.h1>
          <div className="w-6"></div>
        </div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          variants={itemVariants}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-tr from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              type: "spring",
              stiffness: 200
            }}
          >
            <Mail className="w-12 h-12 text-white" />
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              className="space-y-2"
              variants={itemVariants}
            >
              <label htmlFor="email" className="text-sm font-medium text-orange-800 block">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-lg border-orange-200 focus:border-orange-400 focus:ring-orange-300 transition-all"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              variants={itemVariants}
            >
              <label htmlFor="password" className="text-sm font-medium text-orange-800 block">
                كلمة المرور
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-lg border-orange-200 focus:border-orange-400 focus:ring-orange-300 transition-all"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-orange-500" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-orange-400 hover:text-orange-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-orange-400 hover:text-orange-600 transition-colors" />
                  )}
                </button>
              </div>
              <div className="text-right">
                <Link 
                  to="/forgot-password"
                  className="text-sm text-orange-600 hover:text-orange-800 hover:underline transition-colors"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-lg shadow-md relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-1"
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
          <p className="text-orange-800">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-orange-600 font-medium hover:underline transition-colors">
              إنشاء حساب جديد
            </Link>
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="text-xs text-gray-500 text-center w-full mb-2">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
