
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Lock, Bell, Languages, Moon } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const handleDarkModeToggle = (checked: boolean) => {
    toast({
      title: checked ? "تم تفعيل الوضع المظلم" : "تم إلغاء الوضع المظلم",
      description: "سيتم تطبيق التغييرات قريباً",
    });
  };

  const handleNotificationToggle = (checked: boolean) => {
    toast({
      title: checked ? "تم تفعيل الإشعارات" : "تم إلغاء الإشعارات",
      description: "تم حفظ التفضيلات بنجاح",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">إعدادات الحساب</h1>
          <div className="w-6"></div>
        </div>

        {/* Profile Settings */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-semibold mb-4">المعلومات الشخصية</h3>

          <Link to="/edit-profile" className="block">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-500" />
                </div>
                <span className="font-medium">تعديل الملف الشخصي</span>
              </div>
              <span className="text-sm text-gray-400">أحمد محمد</span>
            </div>
          </Link>

          <Link to="/edit-email" className="block">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-500" />
                </div>
                <span className="font-medium">البريد الإلكتروني</span>
              </div>
              <span className="text-sm text-gray-400">ahmed@example.com</span>
            </div>
          </Link>

          <Link to="/edit-phone" className="block">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="font-medium">رقم الهاتف</span>
              </div>
              <span className="text-sm text-gray-400">055-123-4567</span>
            </div>
          </Link>

          <Link to="/change-password" className="block">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-red-500" />
                </div>
                <span className="font-medium">تغيير كلمة المرور</span>
              </div>
            </div>
          </Link>
        </div>

        {/* App Settings */}
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold mb-4">إعدادات التطبيق</h3>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Bell className="w-4 h-4 text-purple-500" />
              </div>
              <span className="font-medium">الإشعارات</span>
            </div>
            <Switch onCheckedChange={handleNotificationToggle} />
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <Languages className="w-4 h-4 text-indigo-500" />
              </div>
              <span className="font-medium">اللغة</span>
            </div>
            <span className="text-sm text-gray-400">العربية</span>
          </div>

          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Moon className="w-4 h-4 text-gray-500" />
              </div>
              <span className="font-medium">الوضع المظلم</span>
            </div>
            <Switch onCheckedChange={handleDarkModeToggle} />
          </div>
        </div>

        {/* Support & Info */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-semibold mb-4">الدعم والمعلومات</h3>
          
          <Link to="/support" className="block">
            <div className="p-4 text-center">
              <span className="text-brand-600">مركز المساعدة</span>
            </div>
          </Link>
          
          <Link to="/terms" className="block">
            <div className="p-4 text-center">
              <span className="text-brand-600">شروط الخدمة</span>
            </div>
          </Link>
          
          <div className="p-4 text-center">
            <button 
              className="text-red-500 font-medium"
              onClick={() => {
                toast({
                  title: "تم تسجيل الخروج",
                  description: "نتمنى رؤيتك مرة أخرى قريباً",
                });
              }}
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
