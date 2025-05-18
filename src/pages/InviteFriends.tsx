
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Copy, Share2, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from '@/hooks/useViewport';

const InviteFriends: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "AHMED50"; // This would typically come from the user's profile
  const referralLink = `https://dambro.com/signup?ref=${referralCode}`;
  const isMobile = useIsMobile();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        toast({
          title: "تم النسخ",
          description: "تم نسخ الرابط بنجاح",
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء نسخ الرابط",
          variant: "destructive",
        });
        console.error('Failed to copy: ', err);
      });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'انضم إلى Dam Bro',
          text: 'استخدم كود الدعوة واحصل على خصم 50 جنيه على أول طلب من Dam!',
          url: referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard(referralLink);
    }
  };

  // Classes optimized for mobile
  const cardClass = "border-none shadow-sm mb-4";
  const titleClass = isMobile ? "text-lg font-semibold mb-2" : "text-xl font-bold mb-3";
  const subtitleClass = isMobile ? "text-base font-medium mb-1" : "text-lg font-semibold mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-zinc-950">دعوة الأصدقاء</h1>
          <div className="w-6"></div>
        </div>

        {/* Hero Section */}
        <div className="px-4 py-6">
          <div className="flex flex-col items-center text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className={titleClass}>دعوة الأصدقاء</h2>
            <p className="text-gray-600 max-w-xs">
              ادعوا أصدقائك للانضمام إلى Dam واحصل على 50 نقطة لكل صديق ينضم باستخدام رابط الدعوة الخاص بك!
            </p>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <Card className="border-none shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <p className="text-gray-600 text-sm mb-1">الأصدقاء المنضمون</p>
                <h3 className="text-2xl font-bold text-blue-700">3</h3>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <p className="text-gray-600 text-sm mb-1">النقاط المكتسبة</p>
                <h3 className="text-2xl font-bold text-blue-700">150</h3>
              </CardContent>
            </Card>
          </div>

          {/* Referral Link */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Card className="border-none overflow-hidden shadow-md rounded-xl">
              <CardContent className={`p-${isMobile ? '4' : '5'}`}>
                <h3 className={subtitleClass}>رابط الدعوة الخاص بك</h3>
                <div className="flex items-center mb-4">
                  <Input 
                    value={referralLink}
                    readOnly
                    className="border-blue-200 rounded-r-none text-sm"
                  />
                  <Button 
                    onClick={() => copyToClipboard(referralLink)}
                    className="rounded-r-md rounded-l-none bg-blue-600 hover:bg-blue-700"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <div className={`flex items-center ${isMobile ? 'flex-col space-y-3' : 'justify-between'}`}>
                  <div>
                    <p className="text-sm font-medium mb-1">كود الدعوة</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-700">{referralCode}</span>
                      <button
                        onClick={() => copyToClipboard(referralCode)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <Button 
                    onClick={handleShare}
                    variant="outline"
                    className={`border-blue-300 text-blue-700 ${isMobile ? 'w-full mt-2' : ''}`}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    مشاركة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h3 className="text-lg font-semibold mb-4 text-blue-800">كيف تعمل الدعوات؟</h3>
            <Card className={cardClass}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600 text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-zinc-950">شارك رابط الدعوة</h4>
                    <p className="text-sm text-gray-600">أرسل رابط الدعوة الخاص بك لأصدقائك عبر الرسائل أو وسائل التواصل الاجتماعي</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={cardClass}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600 text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-zinc-950">الانضمام والتسجيل</h4>
                    <p className="text-sm text-gray-600">عندما ينضم صديقك باستخدام رابط الدعوة، سيحصل على خصم 50 جنيه على أول طلب</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={cardClass}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-blue-600 text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-zinc-950">اربح النقاط</h4>
                    <p className="text-sm text-gray-600">بمجرد إكمال صديقك لأول طلب، ستحصل على 50 نقطة يمكنك استبدالها لاحقاً</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dam Bro Subscription Promo */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Card className="border-none overflow-hidden shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl">
              <CardContent className={`p-${isMobile ? '5' : '6'}`}>
                <h3 className={titleClass}>Dam Bro</h3>
                <p className="text-sm mb-4 text-blue-100">اشترك الآن واحصل على ضعف النقاط عند دعوة الأصدقاء!</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-2xl">99 جنيه</span>
                  <span className="text-sm text-blue-200">شهرياً</span>
                </div>
                <Button className="w-full bg-white hover:bg-blue-50 text-blue-600">
                  اشترك الآن
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
