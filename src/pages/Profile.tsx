
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Edit, Home, CreditCard, Clock, Gift, ChevronRight, User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    name: 'أحمد محمد',
    username: '@ahmed_dam',
    profilePicture: undefined,
    points: 235
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الملف الشخصي</h1>
          <Link to="/settings" className="text-gray-700">
            <Settings className="w-6 h-6" />
          </Link>
        </div>

        {/* Profile Overview Card */}
        <div className="px-4 py-6">
          <Card className="border-none overflow-hidden shadow-md bg-gradient-to-r from-brand-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-white shadow-md">
                  {user.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-brand-400 to-brand-600 text-white text-xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <Link to="/edit-profile" className="text-brand-500 hover:text-brand-600 transition-colors">
                      <Edit className="w-5 h-5" />
                    </Link>
                  </div>
                  <p className="text-gray-500 text-sm">{user.username}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-sm font-medium text-brand-700">النقاط: {user.points}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">مستخدم فضي</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Section */}
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold mb-4">حسابي</h3>
          
          {/* Saved Addresses */}
          <Link to="/addresses" className="block">
            <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center">
                  <Home className="w-4 h-4 text-blue-500" />
                </div>
                <span className="font-medium">العناوين المحفوظة</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          
          {/* Saved Payment Methods */}
          <Link to="/payment-methods" className="block">
            <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-green-500" />
                </div>
                <span className="font-medium">البطاقات المحفوظة</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          
          {/* Order History */}
          <Link to="/orders" className="block">
            <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-50 to-purple-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-500" />
                </div>
                <span className="font-medium">الطلبات السابقة</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          
          {/* Coupons */}
          <Link to="/coupons" className="block">
            <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-50 to-yellow-100 flex items-center justify-center">
                  <Gift className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="font-medium">القسائم</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
          
          {/* Account Settings */}
          <Link to="/settings" className="block">
            <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-medium">إعدادات الحساب</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Link>
        </div>

        {/* Referral Program Card */}
        <div className="px-4 py-6">
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-brand-100 to-orange-100">
            <CardContent className="p-5 border-l-4 border-brand-500">
              <h3 className="font-bold text-lg mb-2 text-brand-800">ادعو أصحابك واربح خصومات</h3>
              <p className="text-sm text-gray-600 mb-4">اكسب 50 نقطة لكل صديق يستخدم رمز الإحالة الخاص بك</p>
              <Button variant="outline" className="bg-white border-brand-200 hover:bg-gray-50 text-brand-700 shadow-sm">
                مشاركة الرمز
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dam Bro Feature (Coming Soon) */}
        <div className="px-4 py-2">
          <Card className="border border-dashed border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">Dam Bro</h3>
                <p className="text-sm text-gray-500">ميزات حصرية قريباً</p>
              </div>
              <Button variant="secondary" disabled className="text-xs bg-white/70 shadow-sm">
                قريباً
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
