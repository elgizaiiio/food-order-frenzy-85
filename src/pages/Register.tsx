
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  
  useEffect(() => {
    if (user) {
      console.log("Register page: User already logged in, redirecting to home");
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
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
      // إرسال الاسم مع بيانات المستخدم
      await signUp(email, password, { name: name });
      toast.success('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول');
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message && error.message.includes('already registered')) {
        toast.error('البريد الإلكتروني مسجل بالفعل');
      } else {
        toast.error('حدث خطأ أثناء التسجيل');
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
        staggerChildren: 0.15
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
  
  const formSectionVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  // تأثيرات التحريك للخلفية
  const backgroundDecorations = [
    { top: "10%", right: "10%", delay: 0.2, size: "100px" },
    { bottom: "20%", left: "5%", delay: 0.5, size: "80px" },
    { top: "40%", right: "15%", delay: 0.8, size: "60px" },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden relative" dir="rtl">
      {/* زخارف الخلفية المتحركة */}
      {backgroundDecorations.map((item, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-20 bg-gradient-to-r from-orange-300 to-orange-500"
          style={{ 
            width: item.size, 
            height: item.size,
            top: item.top,
            right: item.right,
            bottom: item.bottom,
            left: item.left
          }}
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1.2, 1],
            opacity: [0, 0.2, 0.15]
          }}
          transition={{ 
            delay: item.delay, 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: Math.random() * 2
          }}
        />
      ))}
      
      <motion.div 
        className="max-w-md mx-auto pt-8 pb-16 px-4 relative z-10"
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
            إنشاء حساب جديد
          </motion.h1>
          <div className="w-6"></div>
        </div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative"
          variants={formSectionVariants}
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
            <User className="w-12 h-12 text-white" />
          </motion.div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div 
              className="space-y-2"
              variants={itemVariants}
            >
              <label htmlFor="name" className="text-sm font-medium text-orange-800 block">
                الاسم
              </label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-lg border-orange-200 focus:border-orange-400 focus:ring-orange-300 transition-all"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <User className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </motion.div>
            
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
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              variants={itemVariants}
            >
              <label htmlFor="confirmPassword" className="text-sm font-medium text-orange-800 block">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="أعد إدخال كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-lg border-orange-200 focus:border-orange-400 focus:ring-orange-300 transition-all"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-lg shadow-md relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-1"
                disabled={loading}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-300 to-transparent opacity-30 transform -skew-x-30 transition-all duration-1000 group-hover:translate-x-full"></span>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>جاري إنشاء الحساب...</span>
                  </div>
                ) : (
                  "إنشاء حساب"
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
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-orange-600 font-medium hover:underline transition-colors">
              تسجيل الدخول
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

export default Register;
