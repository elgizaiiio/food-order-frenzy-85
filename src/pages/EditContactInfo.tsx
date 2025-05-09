
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EditContactInfo: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('055-123-4567');
  const [email] = useState('ahmed@example.com');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the phone number in your backend
    toast({
      title: "تم تحديث رقم الهاتف",
      description: "تم حفظ التغييرات بنجاح",
    });
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/settings" className="text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-zinc-950">معلومات الاتصال</h1>
          <div className="w-6"></div>
        </div>

        <div className="px-4 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field - Read Only */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-500" />
                </div>
                <label htmlFor="email" className="font-medium">البريد الإلكتروني</label>
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="bg-gray-100 text-gray-500"
              />
              <p className="text-sm text-gray-500">لا يمكن تغيير البريد الإلكتروني</p>
            </div>
            
            {/* Phone Number Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-500" />
                </div>
                <label htmlFor="phone" className="font-medium">رقم الهاتف</label>
              </div>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="أدخل رقم الهاتف"
                className="border-blue-200 focus:border-blue-400"
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              حفظ التغييرات
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditContactInfo;
