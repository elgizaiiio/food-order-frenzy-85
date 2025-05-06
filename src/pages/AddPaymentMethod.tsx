
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form schema for validation
const formSchema = z.object({
  cardNumber: z.string().min(16, "رقم البطاقة يجب أن يكون 16 رقم على الأقل"),
  cardHolder: z.string().min(2, "اسم حامل البطاقة مطلوب"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "الصيغة المطلوبة: شش/سس"),
  cvv: z.string().length(3, "الـ CVV يجب أن يكون 3 أرقام")
});

const AddPaymentMethod: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDefault, setIsDefault] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulating API call - in a real app, this would call your payment API
    setTimeout(() => {
      const lastFourDigits = data.cardNumber.slice(-4);
      
      // Update your local state or send to backend API
      const newCard = {
        id: Date.now().toString(),
        cardNumber: `•••• •••• •••• ${lastFourDigits}`,
        expiryDate: data.expiryDate,
        cardHolder: data.cardHolder,
        isDefault: isDefault
      };
      
      // Show success message
      toast({
        title: "تم إضافة البطاقة بنجاح",
        description: `تم إضافة البطاقة التي تنتهي بـ ${lastFourDigits}`
      });
      
      // Navigate back to payment methods page
      navigate("/payment-methods");
      setIsSubmitting(false);
    }, 1500);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2 && v.length < 5) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    
    return v;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/payment-methods" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">إضافة بطاقة جديدة</h1>
          <div className="w-6"></div>
        </div>

        {/* Card Form */}
        <div className="px-4 py-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center mr-3">
                  <CreditCard className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-medium text-lg">تفاصيل البطاقة</h3>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم البطاقة</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="0000 0000 0000 0000" 
                            {...field}
                            onChange={e => {
                              const formatted = formatCardNumber(e.target.value);
                              field.onChange(formatted);
                            }}
                            maxLength={19}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardHolder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم حامل البطاقة</FormLabel>
                        <FormControl>
                          <Input placeholder="الاسم كما هو على البطاقة" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>تاريخ الانتهاء</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="شش/سس" 
                              {...field} 
                              onChange={e => {
                                const formatted = formatExpiryDate(e.target.value);
                                field.onChange(formatted);
                              }}
                              maxLength={5}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123" 
                              {...field}
                              type="password"
                              maxLength={3}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center pt-2">
                    <input
                      type="checkbox"
                      id="defaultCard"
                      checked={isDefault}
                      onChange={() => setIsDefault(!isDefault)}
                      className="w-4 h-4 text-brand-600 border-gray-300 rounded focus:ring-brand-500"
                    />
                    <label htmlFor="defaultCard" className="mr-2 text-sm font-medium text-gray-700">
                      تعيين كبطاقة افتراضية
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-brand-500 hover:bg-brand-600 mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الحفظ..." : "إضافة البطاقة"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Security Notice */}
        <div className="px-4 py-2">
          <p className="text-xs text-gray-500 text-center">
            جميع معلومات بطاقتك آمنة ومشفرة. نحن نستخدم أحدث تقنيات التشفير لحماية بياناتك.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
