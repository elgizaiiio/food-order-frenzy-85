
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

const Checkout: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'cash'>('card');

  // Form
  const form = useForm({
    defaultValues: {
      name: "محمد أحمد",
      phone: "05xxxxxxxx",
      address: "شارع الملك فهد، الرياض"
    }
  });

  // Mock order summary
  const orderSummary = {
    subtotal: 65,
    deliveryFee: 10,
    total: 75
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    // In a real app, this would process the order and redirect to the tracking page
    window.location.href = '/tracking';
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-24">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/cart" className="text-gray-700">
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
                  <div className="grid grid-cols-2 gap-3">
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
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <h2 className="text-lg font-bold mb-3">ملخص الطلب</h2>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span>{orderSummary.subtotal} ريال</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span>{orderSummary.deliveryFee} ريال</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>المبلغ الإجمالي</span>
                    <span>{orderSummary.total} ريال</span>
                  </div>
                </div>
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

export default Checkout;
