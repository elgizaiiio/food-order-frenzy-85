
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, User, Package, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

const DeliveryRequest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderType, setOrderType] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const { toast } = useToast();
  
  // محاكاة تحميل السائقين القريبين
  useEffect(() => {
    if (orderType && currentStep === 2) {
      setLoading(true);
      // محاكاة تأخير الشبكة
      const timer = setTimeout(() => {
        setDrivers([
          { id: '1', name: 'أحمد محمد', rating: 4.8, vehicle: 'دراجة نارية', eta: '10-15', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
          { id: '2', name: 'خالد أحمد', rating: 4.9, vehicle: 'دراجة نارية', eta: '5-10', image: 'https://randomuser.me/api/portraits/men/44.jpg' },
          { id: '3', name: 'محمد علي', rating: 4.7, vehicle: 'سيارة', eta: '15-20', image: 'https://randomuser.me/api/portraits/men/46.jpg' },
        ]);
        setLoading(false);
        setEstimatedTime(orderType === 'food' ? '25-35' : '15-25');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [orderType, currentStep]);
  
  const handleOrderTypeSelect = (type: string) => {
    setOrderType(type);
    setCurrentStep(2);
    // محاكاة تعيين مواقع افتراضية بناءً على نوع الطلب
    if (type === 'food') {
      setPickupLocation('مطعم الشرق - شارع الملك فهد');
      setDropoffLocation('برج المملكة - طريق العليا');
    } else if (type === 'groceries') {
      setPickupLocation('سوبر ماركت لولو - حي النزهة');
      setDropoffLocation('حي السليمانية - شارع التحلية');
    } else {
      setPickupLocation('صيدلية النهدي - شارع العروبة');
      setDropoffLocation('حي الربوة - شارع الأمير سعود');
    }
  };
  
  const handleSelectDriver = (driverId: string) => {
    setSelectedDriver(driverId);
    setCurrentStep(3);
  };
  
  const handleConfirmOrder = () => {
    setLoading(true);
    // محاكاة معالجة الطلب
    setTimeout(() => {
      toast({
        title: "تم تأكيد طلبك بنجاح!",
        description: "سيصلك السائق قريباً",
      });
      setLoading(false);
      setCurrentStep(4);
    }, 1500);
  };
  
  const getOrderTypeLabel = () => {
    switch (orderType) {
      case 'food': return 'توصيل طعام';
      case 'groceries': return 'توصيل مشتريات';
      case 'pharmacy': return 'توصيل أدوية';
      default: return 'طلب توصيل';
    }
  };
  
  const getOrderTypeIcon = () => {
    switch (orderType) {
      case 'food': return <User className="w-5 h-5 mr-2" />;
      case 'groceries': return <ShoppingBag className="w-5 h-5 mr-2" />;
      case 'pharmacy': return <Package className="w-5 h-5 mr-2" />;
      default: return <Package className="w-5 h-5 mr-2" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24" dir="rtl">
      <div className="max-w-md mx-auto">
        {/* الهيدر */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="text-white hover:text-orange-100 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold tracking-wide">
              {currentStep === 1 ? 'طلب توصيل' : getOrderTypeLabel()}
            </h1>
            <div className="w-6"></div>
          </div>
        </div>
        
        {/* المحتوى الرئيسي */}
        <div className="px-4 py-6">
          {/* الخطوة 1: اختيار نوع الطلب */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6 text-orange-800">ماذا تريد أن يوصل لك السائق؟</h2>
              <div className="grid grid-cols-1 gap-4">
                <Card 
                  className="border-2 hover:border-orange-400 cursor-pointer transform transition-all hover:scale-[1.01] hover:shadow-md"
                  onClick={() => handleOrderTypeSelect('food')}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <User className="h-8 w-8 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-orange-900">توصيل طعام</h3>
                        <p className="text-sm text-gray-600">توصيل من المطاعم والكافيهات</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">30-45 دقيقة</Badge>
                  </div>
                </Card>
                
                <Card 
                  className="border-2 hover:border-orange-400 cursor-pointer transform transition-all hover:scale-[1.01] hover:shadow-md"
                  onClick={() => handleOrderTypeSelect('groceries')}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <ShoppingBag className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-blue-900">توصيل مشتريات</h3>
                        <p className="text-sm text-gray-600">توصيل من السوبر ماركت والمتاجر</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">20-30 دقيقة</Badge>
                  </div>
                </Card>
                
                <Card 
                  className="border-2 hover:border-orange-400 cursor-pointer transform transition-all hover:scale-[1.01] hover:shadow-md"
                  onClick={() => handleOrderTypeSelect('pharmacy')}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <Package className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-green-900">توصيل أدوية</h3>
                        <p className="text-sm text-gray-600">توصيل من الصيدليات والمستشفيات</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">15-25 دقيقة</Badge>
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          {/* الخطوة 2: اختيار السائق */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <div className="bg-orange-100 rounded-xl p-4 mb-6 border border-orange-200">
                <h2 className="text-lg font-bold mb-3 text-orange-800">تفاصيل التوصيل</h2>
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">موقع الاستلام:</p>
                    <p className="text-sm text-gray-700">{pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">موقع التوصيل:</p>
                    <p className="text-sm text-gray-700">{dropoffLocation}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-orange-500 mt-0.5 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">الوقت المتوقع للتوصيل:</p>
                    <p className="text-sm text-gray-700">{estimatedTime} دقيقة</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-lg font-bold mb-4 text-orange-800">اختر سائق</h2>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-orange-800">جاري البحث عن سائقين قريبين...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {drivers.map((driver) => (
                    <Card 
                      key={driver.id} 
                      className={`border-2 cursor-pointer transition-all ${selectedDriver === driver.id ? 'border-orange-500 bg-orange-50' : 'hover:border-orange-300'}`}
                      onClick={() => handleSelectDriver(driver.id)}
                    >
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-14 h-14 rounded-full overflow-hidden mr-3 border-2 border-orange-100">
                            <img 
                              src={driver.image} 
                              alt={driver.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{driver.name}</h3>
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-sm text-gray-700">{driver.rating}</span>
                            </div>
                            <p className="text-sm text-gray-500">{driver.vehicle}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge className="bg-orange-100 text-orange-800">
                            {driver.eta} دقيقة
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* الخطوة 3: تأكيد الطلب */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
                <h2 className="text-lg font-bold mb-3 text-green-800">ملخص الطلب</h2>
                
                <div className="flex items-start mb-3">
                  {getOrderTypeIcon()}
                  <div>
                    <p className="text-sm font-medium text-green-900">نوع الطلب:</p>
                    <p className="text-sm text-gray-700">{getOrderTypeLabel()}</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-900">موقع الاستلام:</p>
                    <p className="text-sm text-gray-700">{pickupLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-3">
                  <MapPin className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-900">موقع التوصيل:</p>
                    <p className="text-sm text-gray-700">{dropoffLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-3">
                  <Clock className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-900">الوقت المتوقع للتوصيل:</p>
                    <p className="text-sm text-gray-700">{estimatedTime} دقيقة</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User className="h-5 w-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-900">السائق:</p>
                    <p className="text-sm text-gray-700">{drivers.find(d => d.id === selectedDriver)?.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-100 rounded-xl p-4 mb-6 border border-orange-200">
                <h2 className="text-lg font-bold mb-2 text-orange-800">التكلفة المتوقعة</h2>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">رسوم التوصيل:</span>
                  <span className="font-bold text-orange-900">20 ريال</span>
                </div>
                {orderType === 'food' && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-700">رسوم إضافية:</span>
                    <span className="font-bold text-orange-900">5 ريال</span>
                  </div>
                )}
                <div className="border-t border-orange-200 my-3"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-orange-900">المجموع:</span>
                  <span className="font-bold text-orange-900 text-lg">{orderType === 'food' ? '25' : '20'} ريال</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg"
                onClick={handleConfirmOrder}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    جاري التأكيد...
                  </div>
                ) : (
                  'تأكيد الطلب'
                )}
              </Button>
            </div>
          )}
          
          {/* الخطوة 4: تم تأكيد الطلب */}
          {currentStep === 4 && (
            <div className="animate-fade-in text-center py-10">
              <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">تم تأكيد طلبك بنجاح!</h2>
              <p className="text-gray-600 mb-6">سيصلك السائق خلال {estimatedTime} دقيقة</p>
              <Link to="/orders" className="w-full">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-bold rounded-xl shadow-md"
                >
                  متابعة الطلب
                </Button>
              </Link>
              <Link to="/" className="block mt-4">
                <Button 
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 py-4 text-base rounded-xl"
                >
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryRequest;
