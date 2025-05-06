
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ClothesCheckout: React.FC = () => {
  const { toast } = useToast();

  // Mock order summary data
  const orderSummary = {
    subtotal: 430, // 150 + (140 * 2)
    deliveryFee: 20,
    total: 450,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    toast({
      title: "تم تقديم الطلب بنجاح",
      description: "سنرسل لك رسالة تأكيد قريبا",
    });
    // In a real app, you would redirect to an order confirmation page
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/clothes/cart" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
          <div className="w-6"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Delivery Address */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">عنوان التوصيل</h3>
            
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input 
                id="address"
                placeholder="أدخل عنوان التوصيل الكامل"
                required
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input 
                id="phone"
                type="tel"
                placeholder="05xxxxxxxx"
                required
                className="text-right"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">طريقة الدفع</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="card-payment" 
                    name="payment-method"
                    className="w-4 h-4"
                  />
                  <Label htmlFor="card-payment" className="cursor-pointer flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span>بطاقة إئتمانية (فيزا/ماستركارد)</span>
                  </Label>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="cash-payment" 
                    name="payment-method" 
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <Label htmlFor="cash-payment" className="cursor-pointer flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-green-500" />
                    <span>الدفع عند الاستلام</span>
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="p-4">
            <h3 className="font-bold mb-4">ملخص الطلب</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{orderSummary.subtotal} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم التوصيل</span>
                <span>{orderSummary.deliveryFee} ريال</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>الإجمالي</span>
                <span>{orderSummary.total} ريال</span>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-500 py-6 text-lg"
          >
            تنفيذ الطلب
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ClothesCheckout;
