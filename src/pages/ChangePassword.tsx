
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useChangePassword } from '@/hooks/useChangePassword';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { changePassword, isLoading, error } = useChangePassword();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset any previous errors
    setValidationError('');
    
    // Validate passwords
    if (newPassword.length < 6) {
      setValidationError('كلمة المرور يجب أن تكون على الأقل 6 أحرف');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setValidationError('كلمات المرور غير متطابقة');
      return;
    }
    
    // تنفيذ تغيير كلمة المرور
    const success = await changePassword(currentPassword, newPassword);
    if (success) {
      navigate('/settings');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/settings" className="text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-zinc-950">تغيير كلمة المرور</h1>
          <div className="w-6"></div>
        </div>

        <div className="px-4 py-6">
          {(validationError || error) && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{validationError || error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password Field */}
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="font-medium">كلمة المرور الحالية</label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور الحالية"
                  className="border-blue-200 focus:border-blue-400 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* New Password Field */}
            <div className="space-y-2">
              <label htmlFor="newPassword" className="font-medium">كلمة المرور الجديدة</label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور الجديدة"
                  className="border-blue-200 focus:border-blue-400 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-sm text-gray-500">يجب أن تكون كلمة المرور على الأقل 6 أحرف</p>
            </div>
            
            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="font-medium">تأكيد كلمة المرور</label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                  className="border-blue-200 focus:border-blue-400 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  <span>جاري تغيير كلمة المرور...</span>
                </div>
              ) : "تغيير كلمة المرور"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
