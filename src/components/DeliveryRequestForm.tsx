
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Package, Truck, CreditCard, FileText, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { useUserAddresses } from '@/hooks/useUserData';
import { useCreateDeliveryRequest, useEstimateDelivery } from '@/hooks/useDeliveryData';
import { useUserPaymentMethods } from '@/hooks/useUserData';
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const DeliveryRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: addresses, isLoading: loadingAddresses } = useUserAddresses();
  const { data: paymentMethods, isLoading: loadingPaymentMethods } = useUserPaymentMethods();
  const createDeliveryRequest = useCreateDeliveryRequest();
  const estimateDelivery = useEstimateDelivery();

  const [formData, setFormData] = useState({
    pickup_address: '',
    delivery_address: '',
    items_description: '',
    estimated_value: '',
    payment_method_id: '',
    notes: '',
  });

  const [selectedPickupAddressId, setSelectedPickupAddressId] = useState<string>('');
  const [selectedDeliveryAddressId, setSelectedDeliveryAddressId] = useState<string>('');
  const [estimationData, setEstimationData] = useState<{
    price: number;
    time: string;
    distance: number;
  } | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);

  // التحقق من تسجيل الدخول
  useEffect(() => {
    if (!user) {
      toast.error("يجب تسجيل الدخول لإنشاء طلب توصيل");
      navigate('/login', { state: { from: '/delivery-request' } });
    }
  }, [user, navigate]);

  // تحديث العنوان عند تغيير الاختيار
  useEffect(() => {
    if (selectedPickupAddressId && addresses) {
      const selectedAddress = addresses.find(addr => addr.id === selectedPickupAddressId);
      if (selectedAddress) {
        setFormData(prev => ({ ...prev, pickup_address: selectedAddress.full_address }));
      }
    }
  }, [selectedPickupAddressId, addresses]);

  useEffect(() => {
    if (selectedDeliveryAddressId && addresses) {
      const selectedAddress = addresses.find(addr => addr.id === selectedDeliveryAddressId);
      if (selectedAddress) {
        setFormData(prev => ({ ...prev, delivery_address: selectedAddress.full_address }));
      }
    }
  }, [selectedDeliveryAddressId, addresses]);

  // تقدير السعر عند تحديد كلا العنوانين
  useEffect(() => {
    const getEstimate = async () => {
      if (formData.pickup_address && formData.delivery_address) {
        setIsEstimating(true);
        try {
          const result = await estimateDelivery.mutateAsync({
            pickupAddress: formData.pickup_address,
            deliveryAddress: formData.delivery_address
          });
          setEstimationData(result);
        } catch (error) {
          console.error('Error estimating delivery:', error);
        } finally {
          setIsEstimating(false);
        }
      }
    };

    getEstimate();
  }, [formData.pickup_address, formData.delivery_address, estimateDelivery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickup_address || !formData.delivery_address || !formData.items_description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    try {
      // إذا كان لدينا تقدير، نضيفه إلى الطلب
      const deliveryData = {
        ...formData,
        estimated_price: estimationData?.price,
        estimated_delivery_time: estimationData?.time,
        distance: estimationData?.distance,
      };
      
      await createDeliveryRequest.mutateAsync(deliveryData);
      toast.success("تم إنشاء طلب التوصيل بنجاح");
      navigate('/delivery-tracking');
    } catch (error) {
      console.error('Error submitting delivery request:', error);
      toast.error(error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء طلب التوصيل');
    }
  };

  const addNewAddress = () => {
    navigate('/addresses', { state: { returnTo: '/delivery-request' } });
  };

  const addNewPaymentMethod = () => {
    navigate('/add-payment-method', { state: { returnTo: '/delivery-request' } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* عنوان الاستلام */}
      <div>
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-green-600 mr-2" />
          <h2 className="text-lg font-medium">عنوان الاستلام</h2>
        </div>
        
        {loadingAddresses ? (
          <div className="space-y-2 mt-2">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        ) : (
          <>
            {addresses && addresses.length > 0 ? (
              <RadioGroup 
                value={selectedPickupAddressId} 
                onValueChange={setSelectedPickupAddressId}
                className="mt-3 space-y-3"
              >
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={address.id} id={`pickup-${address.id}`} />
                    <Label htmlFor={`pickup-${address.id}`} className="text-sm flex-grow">
                      <div className="font-medium">{address.label}</div>
                      <div className="text-gray-500 text-xs">{address.full_address}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <p className="text-sm text-gray-500 mt-1">لا توجد عناوين محفوظة</p>
            )}
            
            <div className="mt-3 flex justify-between items-center">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addNewAddress}
                className="text-xs"
              >
                إضافة عنوان جديد
              </Button>
              
              <div className="text-xs text-gray-500">أو</div>
              
              <div className="flex-grow">
                <Input
                  placeholder="أدخل عنوان الاستلام يدوياً"
                  name="pickup_address"
                  value={formData.pickup_address}
                  onChange={handleInputChange}
                  className="text-sm"
                />
              </div>
            </div>
          </>
        )}
      </div>
      
      <Separator />
      
      {/* عنوان التوصيل */}
      <div>
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-red-600 mr-2" />
          <h2 className="text-lg font-medium">عنوان التوصيل</h2>
        </div>
        
        {loadingAddresses ? (
          <div className="space-y-2 mt-2">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        ) : (
          <>
            {addresses && addresses.length > 0 ? (
              <RadioGroup 
                value={selectedDeliveryAddressId} 
                onValueChange={setSelectedDeliveryAddressId}
                className="mt-3 space-y-3"
              >
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={address.id} id={`delivery-${address.id}`} />
                    <Label htmlFor={`delivery-${address.id}`} className="text-sm flex-grow">
                      <div className="font-medium">{address.label}</div>
                      <div className="text-gray-500 text-xs">{address.full_address}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <p className="text-sm text-gray-500 mt-1">لا توجد عناوين محفوظة</p>
            )}
            
            <div className="mt-3 flex justify-between items-center">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addNewAddress}
                className="text-xs"
              >
                إضافة عنوان جديد
              </Button>
              
              <div className="text-xs text-gray-500">أو</div>
              
              <div className="flex-grow">
                <Input
                  placeholder="أدخل عنوان التوصيل يدوياً"
                  name="delivery_address"
                  value={formData.delivery_address}
                  onChange={handleInputChange}
                  className="text-sm"
                />
              </div>
            </div>
          </>
        )}
      </div>
      
      <Separator />
      
      {/* تفاصيل الشحنة */}
      <div>
        <div className="flex items-center mb-2">
          <Package className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-medium">تفاصيل الشحنة</h2>
        </div>
        
        <div className="space-y-4 mt-3">
          <div>
            <Label htmlFor="items_description" className="text-sm font-medium">
              وصف المواد المطلوب توصيلها *
            </Label>
            <Textarea
              id="items_description"
              name="items_description"
              placeholder="مثال: كتاب، طلب من متجر، مستندات..."
              value={formData.items_description}
              onChange={handleInputChange}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="estimated_value" className="text-sm font-medium">
              القيمة التقديرية للشحنة (اختياري)
            </Label>
            <Input
              id="estimated_value"
              name="estimated_value"
              type="number"
              placeholder="ريال سعودي"
              value={formData.estimated_value}
              onChange={handleInputChange}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              تساعد معرفة قيمة الشحنة في تحديد مستوى التأمين المناسب
            </p>
          </div>
          
          <div>
            <Label htmlFor="notes" className="text-sm font-medium">
              ملاحظات إضافية (اختياري)
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="أي تعليمات خاصة للسائق؟"
              value={formData.notes}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* تقدير التكلفة والوقت */}
      {isEstimating ? (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <Truck className="w-5 h-5 text-gray-400 mr-2 animate-pulse" />
            <p className="text-sm text-gray-500">جاري تقدير تفاصيل التوصيل...</p>
          </div>
          <div className="mt-3 space-y-2">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-2/3 h-6" />
          </div>
        </div>
      ) : estimationData && (
        <Card className="bg-blue-50 border-blue-200 p-4">
          <div className="flex items-center mb-3">
            <Truck className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-md font-medium">تقدير التوصيل</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="text-xs text-gray-500">السعر</div>
              <div className="font-bold text-blue-700">{estimationData.price} ريال</div>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="text-xs text-gray-500">الوقت</div>
              <div className="font-bold text-blue-700">{estimationData.time}</div>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="text-xs text-gray-500">المسافة</div>
              <div className="font-bold text-blue-700">{estimationData.distance} كم</div>
            </div>
          </div>
          
          <div className="mt-3 flex items-center">
            <AlertCircle className="w-4 h-4 text-blue-600 mr-2" />
            <p className="text-xs text-blue-700">
              قد تختلف التكلفة النهائية بناءً على الوقت الفعلي للتوصيل والمسافة
            </p>
          </div>
        </Card>
      )}
      
      {/* طريقة الدفع */}
      <div>
        <div className="flex items-center mb-2">
          <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-medium">طريقة الدفع</h2>
        </div>
        
        {loadingPaymentMethods ? (
          <div className="space-y-2 mt-2">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        ) : (
          <>
            {paymentMethods && paymentMethods.length > 0 ? (
              <RadioGroup 
                value={formData.payment_method_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, payment_method_id: value }))}
                className="mt-3 space-y-3"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                    <Label htmlFor={`payment-${method.id}`} className="text-sm flex-grow">
                      <div className="font-medium">
                        {method.type === 'card' ? `بطاقة ائتمان تنتهي بـ ${method.last4}` : 'الدفع عند الاستلام'}
                      </div>
                      {method.is_default && <span className="text-xs text-green-600">الافتراضية</span>}
                    </Label>
                  </div>
                ))}
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="cash" id="payment-cash" />
                  <Label htmlFor="payment-cash" className="text-sm flex-grow">
                    <div className="font-medium">الدفع نقداً عند الاستلام</div>
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              <div className="flex items-center space-x-2 space-x-reverse mt-2">
                <RadioGroupItem value="cash" id="payment-cash" checked />
                <Label htmlFor="payment-cash" className="text-sm flex-grow">
                  <div className="font-medium">الدفع نقداً عند الاستلام</div>
                </Label>
              </div>
            )}
            
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addNewPaymentMethod}
              className="mt-3 text-xs"
            >
              إضافة طريقة دفع جديدة
            </Button>
          </>
        )}
      </div>
      
      <Separator />
      
      {/* زر الإرسال */}
      <Button 
        type="submit" 
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6"
        disabled={createDeliveryRequest.isPending || !formData.pickup_address || !formData.delivery_address || !formData.items_description}
      >
        {createDeliveryRequest.isPending ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            <span>جاري إنشاء الطلب...</span>
          </div>
        ) : (
          "إرسال طلب التوصيل"
        )}
      </Button>
    </form>
  );
};

export default DeliveryRequestForm;
