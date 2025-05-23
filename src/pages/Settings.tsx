
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Lock, Bell, Languages, ShieldCheck } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import MFASetup from '@/components/MFASetup';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [showMFADialog, setShowMFADialog] = useState(false);
  
  const handleNotificationToggle = (checked: boolean) => {
    toast({
      title: checked ? "تم تفعيل الإشعارات" : "تم إلغاء الإشعارات",
      description: "تم حفظ التفضيلات بنجاح"
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "نتمنى رؤيتك مرة أخرى قريباً"
      });
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">إعدادات الحساب</h1>
          <div className="w-6"></div>
        </div>

        {/* Profile Settings */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">المعلومات الشخصية</h3>

          <Link to="/edit-profile" className="block">
            <div className="flex items-center justify-between p-4 border-b border-blue-100 rounded-lg mb-2 hover:bg-blue-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium">تعديل الملف الشخصي</span>
              </div>
              <span className="text-sm text-gray-400">أحمد محمد</span>
            </div>
          </Link>

          <Link to="/edit-contact-info" className="block">
            <div className="flex items-center justify-between p-4 border-b border-blue-100 rounded-lg mb-2 hover:bg-blue-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium">البريد الإلكتروني</span>
              </div>
              <span className="text-sm text-gray-400">ahmed@example.com</span>
            </div>
          </Link>

          <Link to="/edit-contact-info" className="block">
            <div className="flex items-center justify-between p-4 border-b border-blue-100 rounded-lg mb-2 hover:bg-blue-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium">رقم الهاتف</span>
              </div>
              <span className="text-sm text-gray-400">055-123-4567</span>
            </div>
          </Link>

          <Link to="/change-password" className="block">
            <div className="flex items-center justify-between p-4 border-b border-blue-100 rounded-lg mb-2 hover:bg-blue-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-medium">تغيير كلمة المرور</span>
              </div>
            </div>
          </Link>

          {/* New MFA Security Section */}
          <div onClick={() => setShowMFADialog(true)} className="cursor-pointer">
            <div className="flex items-center justify-between p-4 border-b border-blue-100 rounded-lg mb-2 hover:bg-blue-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-orange-600" />
                </div>
                <span className="font-medium">المصادقة الثنائية</span>
              </div>
              <span className="text-sm text-green-500">
                {user?.factors ? "مفعّل" : "غير مفعّل"}
              </span>
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">إعدادات التطبيق</h3>

          <div className="flex items-center justify-between p-4 border-b border-blue-100 rounded-lg mb-2 hover:bg-blue-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium">الإشعارات</span>
            </div>
            <Switch onCheckedChange={handleNotificationToggle} />
          </div>

          <div className="flex items-center justify-between p-4 border-b border-blue-100 rounded-lg mb-2 hover:bg-blue-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Languages className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="font-medium">اللغة</span>
            </div>
            <span className="text-sm text-gray-400">العربية</span>
          </div>
        </div>

        {/* Support & Info */}
        <div className="px-4 py-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">الدعم والمعلومات</h3>
          
          <Link to="/chat-support" className="block">
            <div className="p-4 text-center bg-blue-50 rounded-lg mb-2 hover:bg-blue-100 transition-colors">
              <span className="text-blue-600 font-medium">مركز المساعدة</span>
            </div>
          </Link>
          
          <Link to="/terms" className="block">
            
          </Link>
          
          <div className="p-4 text-center">
            <button 
              className="text-red-500 font-medium" 
              onClick={handleSignOut}
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      {/* MFA Setup Dialog */}
      <Dialog open={showMFADialog} onOpenChange={setShowMFADialog}>
        <DialogContent className="sm:max-w-md">
          <MFASetup onComplete={() => setShowMFADialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
