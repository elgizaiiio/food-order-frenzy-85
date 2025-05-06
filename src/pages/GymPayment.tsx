
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Building, Check, Home, MapPin, Phone, Wallet, Apple } from 'lucide-react';
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

type Address = {
  id: string;
  title: string;
  address: string;
  phone: string;
  isDefault?: boolean;
};

// Define the form schema
const formSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(10, { message: "رقم هاتف غير صالح" }),
  paymentMethod: z.enum(["card", "cash", "wallet", "applepay"]),
  saveCard: z.boolean().optional(),
  addressId: z.string().optional(),
});

const GymPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gym, plan } = location.state as { gym: GymInfo; plan: PlanInfo };
  const [loading, setLoading] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    { 
      id: '1', 
      title: 'المنزل', 
      address: 'شارع الملك فهد، حي الورود، الرياض',
      phone: '05xxxxxxxx',
      isDefault: true
    },
    { 
      id: '2', 
      title: 'العمل', 
      address: 'برج المملكة، طريق الملك فهد، الرياض',
      phone: '05xxxxxxxx',
    }
  ]);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      paymentMethod: "card",
      saveCard: false,
      addressId: "1",
    },
  });

  // Get form values
  const paymentMethod = form.watch("paymentMethod");
  const addressId = form.watch("addressId");

  // New address form
  const addressForm = useForm({
    defaultValues: {
      title: '',
      address: '',
      phone: ''
    }
  });

  const handleAddAddress = (data: any) => {
    const newAddress = {
      id: Date.now().toString(),
      title: data.title,
      address: data.address,
      phone: data.phone
    };
    
    setAddresses([...addresses, newAddress]);
    form.setValue("addressId", newAddress.id);
    setIsAddingAddress(false);
    toast.success("تم إضافة العنوان بنجاح");
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    
    // محاكاة طلب API
    setTimeout(() => {
      const selectedAddress = addresses.find(addr => addr.id === values.addressId);
      
      console.log({
        gym,
        plan,
        payment: values,
        address: selectedAddress
      });
      
      toast.success("تم تأكيد الطلب بنجاح!");
      
      navigate('/gym/success', {
        state: {
          gym,
          plan,
          payment: {
            ...values,
            phone: selectedAddress?.phone || values.phone
          }
        }
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white sticky top-0 z-10 shadow-md">
          <Link to={`/gym/${gym.id}/subscribe`} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الدفع</h1>
          <div className="w-6"></div> {/* Empty div for spacing */}
        </div>

        {/* Main content */}
        <div className="px-4 py-4">
          {/* Order summary card */}
          <Card className="overflow-hidden mb-6 border-0 shadow-md">
            <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-50 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">ملخص الاشتراك</h3>
                <span className="text-sm text-purple-600">{gym.name}</span>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">نوع الاشتراك</span>
                <span className="font-medium">{plan.title} ({plan.duration})</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">قيمة الاشتراك</span>
                <span className="font-medium">{plan.price} ريال</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-600">رسوم خدمة</span>
                <span>15 ريال</span>
              </div>
              <div className="flex justify-between mt-2 pb-1">
                <span className="font-bold">المجموع</span>
                <span className="font-bold text-lg text-purple-600">{plan.price + 15} ريال</span>
              </div>
            </CardContent>
          </Card>
          
          {isAddingAddress ? (
            <Card className="border-0 shadow-md mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => setIsAddingAddress(false)} 
                    className="text-gray-500"
                    type="button"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-bold">إضافة عنوان جديد</h3>
                  <div className="w-5"></div>
                </div>
                
                <form onSubmit={addressForm.handleSubmit(handleAddAddress)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">اسم العنوان</Label>
                    <Input
                      id="title"
                      placeholder="المنزل، العمل، ..."
                      {...addressForm.register('title', { required: true })}
                    />
                    {addressForm.formState.errors.title && (
                      <p className="text-red-500 text-xs">هذا الحقل مطلوب</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                      العنوان
                    </Label>
                    <Input
                      id="address"
                      placeholder="الحي، الشارع، رقم المبنى"
                      {...addressForm.register('address', { required: true })}
                    />
                    {addressForm.formState.errors.address && (
                      <p className="text-red-500 text-xs">هذا الحقل مطلوب</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-gray-500" />
                      رقم الهاتف
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      {...addressForm.register('phone', { 
                        required: true,
                        pattern: /^(05)[0-9]{8}$/ 
                      })}
                    />
                    {addressForm.formState.errors.phone && (
                      <p className="text-red-500 text-xs">رقم هاتف غير صالح</p>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500"
                    >
                      إضافة
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsAddingAddress(false)}
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Address section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                    عنوان الإشتراك
                  </h3>
                  
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <FormField
                        control={form.control}
                        name="addressId"
                        render={({ field }) => (
                          <RadioGroup 
                            value={field.value} 
                            onValueChange={field.onChange}
                            className="space-y-3"
                          >
                            {addresses.map((address) => (
                              <div key={address.id} className="relative">
                                <RadioGroupItem
                                  value={address.id}
                                  id={`address-${address.id}`}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={`address-${address.id}`}
                                  className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50"
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="flex items-center">
                                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                          <Home className="w-3 h-3 text-purple-600" />
                                        </div>
                                        <span className="font-medium">{address.title}</span>
                                      </div>
                                      <p className="text-sm text-gray-500 mt-1">{address.address}</p>
                                      <p className="text-xs text-gray-400 mt-1">{address.phone}</p>
                                    </div>
                                    {addressId === address.id && (
                                      <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-purple-600" />
                                      </div>
                                    )}
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full mt-3 border-dashed border-gray-300 hover:bg-gray-50"
                        onClick={() => setIsAddingAddress(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        إضافة عنوان جديد
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Phone number field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-purple-500" />
                        رقم الهاتف للتواصل
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="05XXXXXXXX" 
                          type="tel" 
                          className="border-gray-300 focus:border-purple-400"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Payment method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-500" />
                    طريقة الدفع
                  </h3>
                  
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-4">
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
                                <div className="relative">
                                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                                  <Label htmlFor="card" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                        <CreditCard className="w-4 h-4 text-blue-600" />
                                      </div>
                                      <div>
                                        <p className="font-medium">فيزا / ماستركارد</p>
                                        <p className="text-xs text-gray-500">الدفع بالبطاقة الائتمانية</p>
                                      </div>
                                    </div>
                                    {paymentMethod === "card" && (
                                      <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-purple-600" />
                                      </div>
                                    )}
                                  </Label>
                                </div>
                                
                                <div className="relative">
                                  <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                                  <Label htmlFor="wallet" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                        <Wallet className="w-4 h-4 text-purple-600" />
                                      </div>
                                      <div>
                                        <p className="font-medium">المحافظ الإلكترونية</p>
                                        <p className="text-xs text-gray-500">STC Pay وغيرها</p>
                                      </div>
                                    </div>
                                    {paymentMethod === "wallet" && (
                                      <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-purple-600" />
                                      </div>
                                    )}
                                  </Label>
                                </div>
                                
                                <div className="relative">
                                  <RadioGroupItem value="applepay" id="applepay" className="peer sr-only" />
                                  <Label htmlFor="applepay" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-3">
                                        <Apple className="w-4 h-4 text-white" />
                                      </div>
                                      <div>
                                        <p className="font-medium">Apple Pay</p>
                                        <p className="text-xs text-gray-500">الدفع السريع والآمن</p>
                                      </div>
                                    </div>
                                    {paymentMethod === "applepay" && (
                                      <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-purple-600" />
                                      </div>
                                    )}
                                  </Label>
                                </div>
                                
                                <div className="relative">
                                  <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                                  <Label htmlFor="cash" className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        <Building className="w-4 h-4 text-green-600" />
                                      </div>
                                      <div>
                                        <p className="font-medium">الدفع في النادي</p>
                                        <p className="text-xs text-gray-500">ادفع عند أول زيارة</p>
                                      </div>
                                    </div>
                                    {paymentMethod === "cash" && (
                                      <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-purple-600" />
                                      </div>
                                    )}
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {paymentMethod === "card" && (
                        <div className="mt-4">
                          <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                            <div className="flex gap-2">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="MasterCard" className="h-6" />
                              <img src="https://upload.wikimedia.org/wikipedia/ar/b/bd/Mada_Logo.svg" alt="Mada" className="h-6" />
                            </div>
                            <span className="text-xs text-gray-500">معاملات آمنة 100%</span>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="saveCard"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-x-reverse mt-3">
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
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md py-6"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>جاري التأكيد...</span>
                    </div>
                  ) : (
                    <>تأكيد الدفع</>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

// Missing Plus icon component
const Plus = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
};

export default GymPayment;
