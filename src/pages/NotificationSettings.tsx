
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, BellOff } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    orders: true,
    offers: true,
    delivery: true,
    system: false,
    marketing: false
  });
  
  const handleNotificationChange = (type: string, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [type]: checked }));
    
    toast.success(
      checked ? "تم تفعيل الإشعارات" : "تم إلغاء الإشعارات", 
      {
        description: `تم تحديث إعدادات ${getNotificationTypeName(type)}`
      }
    );
  };
  
  const getNotificationTypeName = (type: string): string => {
    const types: Record<string, string> = {
      orders: "الطلبات",
      offers: "العروض",
      delivery: "التوصيل",
      system: "النظام",
      marketing: "التسويق"
    };
    return types[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/settings" className="text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-zinc-950">إعدادات الإشعارات</h1>
          <div className="w-6"></div>
        </div>

        <div className="px-4 py-6">
          <Alert className="mb-6 bg-blue-50 border-blue-100">
            <AlertDescription className="text-blue-800">
              يمكنك تخصيص أنواع الإشعارات التي تريد استلامها من تطبيق dam
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border-b border-blue-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">إشعارات الطلبات</h3>
                  <p className="text-sm text-gray-500">تحديثات حول حالة طلباتك</p>
                </div>
              </div>
              <Switch 
                checked={notifications.orders} 
                onCheckedChange={(checked) => handleNotificationChange('orders', checked)} 
              />
            </div>
            
            <div className="flex justify-between items-center p-4 border-b border-blue-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">إشعارات العروض</h3>
                  <p className="text-sm text-gray-500">خصومات وعروض خاصة</p>
                </div>
              </div>
              <Switch 
                checked={notifications.offers} 
                onCheckedChange={(checked) => handleNotificationChange('offers', checked)} 
              />
            </div>
            
            <div className="flex justify-between items-center p-4 border-b border-blue-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">إشعارات التوصيل</h3>
                  <p className="text-sm text-gray-500">تنبيهات عند وصول طلباتك</p>
                </div>
              </div>
              <Switch 
                checked={notifications.delivery} 
                onCheckedChange={(checked) => handleNotificationChange('delivery', checked)} 
              />
            </div>
            
            <div className="flex justify-between items-center p-4 border-b border-blue-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium">إشعارات النظام</h3>
                  <p className="text-sm text-gray-500">تحديثات أمنية ومهمة</p>
                </div>
              </div>
              <Switch 
                checked={notifications.system} 
                onCheckedChange={(checked) => handleNotificationChange('system', checked)} 
              />
            </div>
            
            <div className="flex justify-between items-center p-4 border-b border-blue-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <BellOff className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">إشعارات تسويقية</h3>
                  <p className="text-sm text-gray-500">رسائل ترويجية وتسويقية</p>
                </div>
              </div>
              <Switch 
                checked={notifications.marketing} 
                onCheckedChange={(checked) => handleNotificationChange('marketing', checked)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
