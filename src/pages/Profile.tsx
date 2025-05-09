import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Edit, Home, CreditCard, Clock, Gift, ChevronRight, User, Award, Users, Share2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import { toast } from "sonner";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'أحمد محمد',
    username: '@ahmed_dam',
    profilePicture: undefined,
    points: 235
  });

  const handleSubscribe = () => {
    // Navigate to the Dam Bro subscription page
    navigate('/dam-bro');
    toast.success('جاري تحويلك إلى صفحة الاشتراك');
  };

  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/" className="text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-zinc-950">الملف الشخصي</h1>
          <Link to="/settings" className="text-blue-600">
            <Settings className="w-6 h-6" />
          </Link>
        </div>

        {/* Profile Overview Card */}
        <div className="px-4 py-6 animate-fade-in">
          <Card className="border-none overflow-hidden shadow-md bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                  {user.profilePicture ? <AvatarImage src={user.profilePicture} alt={user.name} /> : <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-zinc-950">{user.name}</h2>
                    <Link to="/edit-profile" className="text-blue-500 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors">
                      <Edit className="w-5 h-5" />
                    </Link>
                  </div>
                  <p className="text-sm text-zinc-950">{user.username}</p>
                  <div className="mt-3 flex items-center bg-blue-50/80 rounded-full px-3 py-1 w-fit">
                    <Award className="w-4 h-4 text-blue-600 mr-1" />
                    <span className="text-sm font-medium text-zinc-950">النقاط: {user.points}</span>
                    <span className="mx-2 text-blue-300">•</span>
                    <span className="text-sm text-zinc-950">مستخدم فضي</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Section */}
        <div className="px-4 py-2 animate-fade-in" style={{
        animationDelay: "100ms"
      }}>
          <h3 className="text-lg font-semibold mb-4 text-blue-800">حسابي</h3>
          
          {/* Saved Addresses */}
          <Link to="/addresses" className="block">
            <div className="flex items-center justify-between p-4 mb-2 hover:bg-blue-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-zinc-950">العناوين المحفوظة</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
          </Link>
          
          {/* Saved Payment Methods */}
          <Link to="/payment-methods" className="block">
            <div className="flex items-center justify-between p-4 mb-2 hover:bg-blue-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-zinc-950">البطاقات المحفوظة</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
          </Link>
          
          {/* Order History */}
          <Link to="/orders" className="block">
            <div className="flex items-center justify-between p-4 mb-2 hover:bg-blue-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-zinc-950">الطلبات السابقة</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
          </Link>
          
          {/* Coupons */}
          <Link to="/coupons" className="block">
            <div className="flex items-center justify-between p-4 mb-2 hover:bg-blue-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                  <Gift className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-zinc-950">القسائم</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
          </Link>
          
          {/* Account Settings */}
          <Link to="/settings" className="block">
            <div className="flex items-center justify-between p-4 mb-2 hover:bg-blue-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-zinc-950">إعدادات الحساب</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
          </Link>

          {/* Invite Friends - New Item */}
          <Link to="/invite-friends" className="block">
            <div className="flex items-center justify-between p-4 mb-2 hover:bg-blue-50 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center shadow-sm">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-zinc-950">دعوة الأصدقاء</span>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400" />
            </div>
          </Link>
        </div>

        {/* Referral Program Card */}
        <div className="px-4 py-6 animate-fade-in" style={{
        animationDelay: "200ms"
      }}>
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold">Dam Bro</h3>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  <span>99 جنيه / شهرياً</span>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <h4 className="font-medium mb-3">مميزات الاشتراك:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                    <span>توصيل مجاني لجميع الطلبات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                    <span>خصم 10% على جميع المنتجات</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                    <span>دعم فني على مدار الساعة</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                    <span>عروض حصرية للمشتركين</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                className="w-full bg-white text-blue-600 hover:bg-blue-50"
                onClick={handleSubscribe}
              >
                اشترك الآن
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dam Bro Feature (Coming Soon) */}
        <div className="px-4 py-2 animate-fade-in" style={{
        animationDelay: "300ms"
      }}>
          <Card className="border border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            
          </Card>
        </div>
      </div>
    </div>;
};
export default Profile;
