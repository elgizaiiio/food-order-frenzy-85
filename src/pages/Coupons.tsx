
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift, Copy, UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface Coupon {
  id: string;
  code: string;
  discount: string;
  expiry: string;
  details: string;
  category: 'food' | 'market' | 'pharmacy' | 'personalCare' | 'all';
  isActive: boolean;
}

const Coupons: React.FC = () => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      code: 'WELCOME25',
      discount: '25%',
      expiry: '٣٠ يونيو ٢٠٢٣',
      details: 'خصم 25% على أول طلب من المطاعم، بحد أقصى 50 ريال',
      category: 'food',
      isActive: true
    },
    {
      id: '2',
      code: 'MARKET10',
      discount: '15 ر.س',
      expiry: '١٥ يوليو ٢٠٢٣',
      details: 'خصم 15 ريال على طلبات السوبر ماركت التي تزيد عن 100 ريال',
      category: 'market',
      isActive: true
    },
    {
      id: '3',
      code: 'SUMMER50',
      discount: '50%',
      expiry: 'منتهي الصلاحية',
      details: 'خصم 50% على جميع المنتجات، بحد أقصى 75 ريال',
      category: 'all',
      isActive: false
    }
  ]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "تم نسخ الكود",
      description: `تم نسخ الكود ${code} بنجاح`
    });
  };

  const getCategoryIcon = (category: Coupon['category']) => {
    switch(category) {
      case 'food': 
        return <UtensilsCrossed className="w-4 h-4 text-red-500" />;
      case 'market': 
        return <ShoppingCart className="w-4 h-4 text-green-500" />;
      case 'all':
      default:
        return <Gift className="w-4 h-4 text-brand-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">القسائم</h1>
          <div className="w-6"></div>
        </div>

        {/* Add Coupon Section */}
        <div className="px-4 py-6">
          <Card className="border bg-gray-50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="أدخل رمز الكوبون"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <Button className="bg-brand-500 hover:bg-brand-600">تطبيق</Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Coupons */}
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold mb-4">القسائم النشطة</h3>
          <div className="space-y-4">
            {coupons.filter(coupon => coupon.isActive).map((coupon) => (
              <Card 
                key={coupon.id} 
                className="overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                  <div className="bg-brand-500 text-white text-xs font-bold py-1 px-4 rotate-[-45deg] absolute top-3 left-[-23px]">
                    {coupon.discount}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        {getCategoryIcon(coupon.category)}
                      </div>
                      <h3 className="font-semibold">{coupon.code}</h3>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-brand-600 hover:text-brand-700 hover:bg-brand-50 p-1 h-8"
                      onClick={() => copyToClipboard(coupon.code)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{coupon.details}</p>
                  
                  <div className="text-xs text-gray-500 flex items-center justify-between">
                    <span>ينتهي في: {coupon.expiry}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-gray-200 h-7"
                    >
                      استخدم الآن
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Expired Coupons */}
        {coupons.some(coupon => !coupon.isActive) && (
          <div className="px-4 py-6">
            <h3 className="text-lg font-semibold mb-4">القسائم المنتهية</h3>
            <div className="space-y-4">
              {coupons.filter(coupon => !coupon.isActive).map((coupon) => (
                <Card 
                  key={coupon.id} 
                  className="overflow-hidden bg-gray-50 border-gray-200 opacity-70"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          {getCategoryIcon(coupon.category)}
                        </div>
                        <h3 className="font-semibold">{coupon.code}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{coupon.details}</p>
                    
                    <div className="text-xs text-gray-500">
                      <span>انتهت الصلاحية في: {coupon.expiry}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupons;
