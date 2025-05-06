
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type GymInfo = {
  id: string;
  name: string;
  image: string;
};

type PlanInfo = {
  id: string;
  title: string;
  duration: string;
  price: number;
  features: string[];
};

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب" }),
  phone: z.string().min(10, { message: "رقم هاتف غير صالح" }),
  paymentMethod: z.enum(["card", "cash"]),
  saveCard: z.boolean().optional(),
});

const GymPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gym, plan } = location.state as { gym: GymInfo; plan: PlanInfo };

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      paymentMethod: "card",
      saveCard: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("تم تأكيد الطلب بنجاح!");
    navigate('/gym/success', {
      state: {
        gym,
        plan,
        payment: values
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to={`/gym/${gym.id}/subscribe`} className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الدفع</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>

        {/* Payment form */}
        <div className="px-4 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Personal details */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">البيانات الشخصية</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input placeholder="الاسم بالكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="05XXXXXXXX" 
                          type="tel" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Payment method */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">طريقة الدفع</h3>
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse border rounded-lg p-3">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center cursor-pointer">
                              <CreditCard className="w-5 h-5 me-2" />
                              فيزا / ماستركارد
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 space-x-reverse border rounded-lg p-3">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="flex items-center cursor-pointer">
                              <Building className="w-5 h-5 me-2" />
                              الدفع في النادي
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("paymentMethod") === "card" && (
                  <FormField
                    control={form.control}
                    name="saveCard"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-x-reverse ms-6">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          حفظ بيانات البطاقة للمستقبل
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              {/* Order summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-bold">ملخص الطلب</h3>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">اشتراك {plan.title}</span>
                  <span>{plan.price} ريال</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">رسوم خدمة</span>
                  <span>15 ريال</span>
                </div>
                
                <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                  <span>المجموع</span>
                  <span>{plan.price + 15} ريال</span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-500 hover:bg-brand-600 py-6"
              >
                تأكيد الدفع
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GymPayment;
