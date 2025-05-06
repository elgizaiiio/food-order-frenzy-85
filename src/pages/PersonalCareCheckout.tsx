
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, CreditCard, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const PersonalCareCheckout: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'cash'>('card');
  const [saveCardInfo, setSaveCardInfo] = useState(false);
  const { toast } = useToast();

  // Form
  const form = useForm({
    defaultValues: {
      name: "سارة أحمد",
      phone: "05xxxxxxxx",
      address: "شارع الملك فهد، الرياض"
    }
  });

  // Mock order summary
  const orderSummary = {
    items: [
      { name: 'عطر فلورا الفاخر', quantity: 1, price: 199 },
      { name: 'كريم مرطب للوجه', quantity: 2, price: 85 }
    ],
    subtotal: 369,
    deliveryFee: 15,
    total: 384
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    
    // Display a success toast
    toast({
      title: "تم استلام طلبك بنجاح!",
      description: "سيتم توصيل طلبك خلال 30-45 دقيقة.",
    });
    
    // In a real app, this would process the order and redirect to the tracking page
    setTimeout(() => {
      window.location.href = '/personal-care/tracking';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/personal-care/cart" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الدفع والتوصيل</h1>
          <div className="w-6"></div> {/* Empty div for flex balance */}
        </div>

        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Delivery Address */}
              <div>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  عنوان التوصيل
                </h2>
                <Card className="p-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel className="text-gray-600 flex items-center gap-1">
                          <User className="w-4 h-4" />
                          الاسم
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel className="text-gray-600 flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          رقم الهاتف
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          العنوان
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>
              </div>

              {/* Delivery Time */}
              <div>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  وقت التوصيل
                </h2>
                <Card className="p-4">
                  <p className="text-center">سيتم توصيل طلبك خلال 30-45 دقيقة</p>
                </Card>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  طريقة الدفع
                </h2>
                <Card className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Button
                      type="button"
                      variant={selectedPayment === 'card' ? 'default' : 'outline'}
                      className={`flex items-center justify-center gap-2 py-6 ${selectedPayment === 'card' ? 'bg-brand-500' : ''}`}
                      onClick={() => setSelectedPayment('card')}
                    >
                      <CreditCard className="w-5 h-5" />
                      بطاقة الائتمان
                    </Button>
                    
                    <Button
                      type="button"
                      variant={selectedPayment === 'cash' ? 'default' : 'outline'}
                      className={`flex items-center justify-center gap-2 py-6 ${selectedPayment === 'cash' ? 'bg-brand-500' : ''}`}
                      onClick={() => setSelectedPayment('cash')}
                    >
                      نقدًا عند الاستلام
                    </Button>
                  </div>
                  
                  {selectedPayment === 'card' && (
                    <div className="space-y-3">
                      <FormItem className="mb-3">
                        <FormLabel className="text-gray-600">رقم البطاقة</FormLabel>
                        <FormControl>
                          <Input placeholder="XXXX XXXX XXXX XXXX" className="border-gray-300" />
                        </FormControl>
                      </FormItem>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <FormItem>
                          <FormLabel className="text-gray-600">تاريخ الانتهاء</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" className="border-gray-300" />
                          </FormControl>
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel className="text-gray-600">رمز الأمان (CVV)</FormLabel>
                          <FormControl>
                            <Input placeholder="XXX" className="border-gray-300" />
                          </FormControl>
                        </FormItem>
                      </div>
                      
                      <div className="flex items-center mt-3">
                        <input 
                          type="checkbox" 
                          id="saveCard"
                          checked={saveCardInfo}
                          onChange={() => setSaveCardInfo(!saveCardInfo)}
                          className="w-4 h-4 text-brand-500 rounded"
                        />
                        <label htmlFor="saveCard" className="mr-2 text-sm text-gray-600">
                          حفظ معلومات البطاقة للمرة القادمة
                        </label>
                      </div>
                    </div>
                  )}
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <h2 className="text-lg font-bold mb-3">ملخص الطلب</h2>
                <Card className="p-4">
                  <div className="space-y-2 mb-3">
                    {orderSummary.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{item.price * item.quantity} ريال</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t mt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">المجموع الفرعي</span>
                        <span>{orderSummary.subtotal} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">رسوم التوصيل</span>
                        <span>{orderSummary.deliveryFee} ريال</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2">
                        <span>المبلغ الإجمالي</span>
                        <span>{orderSummary.total} ريال</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Submit Button - Fixed at Bottom */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-md mx-auto">
                <Button type="submit" className="w-full py-6 bg-brand-500 text-lg">
                  تنفيذ الطلب
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PersonalCareCheckout;
