
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

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
          <Link to="/login" className="text-orange-600 hover:text-orange-800 transition-colors">
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
            نسيت كلمة المرور
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
          {success ? (
            <motion.div 
              className="text-center py-6 space-y-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20, 
                  delay: 0.2
                }}
              >
                <CheckCircle className="h-10 w-10 text-green-500" />
              </motion.div>
              <h3 className="text-xl font-bold text-orange-800 mb-2">تم إرسال بريد إلكتروني</h3>
              <p className="text-orange-700 text-lg mb-6">
                تم إرسال رابط إعادة ضبط كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد الخاص بك.
              </p>
              <Link to="/login">
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-5 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-lg"
                >
                  العودة إلى تسجيل الدخول
                </Button>
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.p 
                className="text-orange-700 text-lg mb-8 text-center"
                variants={itemVariants}
              >
                أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة ضبط كلمة المرور.
              </motion.p>
              
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
                
                <motion.div variants={itemVariants} className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-1"
                    disabled={loading}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-300 to-transparent opacity-30 transform -skew-x-30 transition-all duration-1000 group-hover:translate-x-full"></span>
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        <span>جاري الإرسال...</span>
                      </div>
                    ) : (
                      "إرسال رابط إعادة الضبط"
                    )}
                  </Button>
                </motion.div>
              </form>
            </>
          )}
        </motion.div>
        
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <p className="text-orange-800 text-lg">
            تذكرت كلمة المرور؟{" "}
            <Link to="/login" className="text-orange-600 font-bold hover:text-orange-700 transition-colors hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
