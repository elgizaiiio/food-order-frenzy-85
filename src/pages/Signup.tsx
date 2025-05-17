
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Lock, Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
      valid = false;
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'كلمة المرور مطلوبة';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      valid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password, {
        name: formData.name
      });
      
      toast.success('تم إنشاء الحساب بنجاح');
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white">
        {/* هيدر */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">إنشاء حساب جديد</h1>
          <div className="w-6"></div>
        </div>
        
        {/* نموذج التسجيل */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                الاسم
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="pr-10 border border-gray-300 rounded-lg"
                  placeholder="أدخل اسمك"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="pr-10 border border-gray-300 rounded-lg"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="pr-10 border border-gray-300 rounded-lg"
                  placeholder="أدخل كلمة المرور"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Check className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="pr-10 border border-gray-300 rounded-lg"
                  placeholder="أدخل تأكيد كلمة المرور"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">◌</span>
                  جارِ إنشاء الحساب...
                </>
              ) : (
                'إنشاء الحساب'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
