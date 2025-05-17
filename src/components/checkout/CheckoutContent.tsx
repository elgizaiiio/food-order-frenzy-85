
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCheckout } from '@/context/CheckoutContext';
import AddressSelector from '@/components/AddressSelector';
import NewAddressForm from '@/components/NewAddressForm';
import PaymentMethods from '@/components/PaymentMethods';
import DeliveryTime from './DeliveryTime';
import OrderSummary from './OrderSummary';

// محاكاة للمنتجات في سلة المشتريات
const cartItems = [{
  id: 1,
  name: "شاورما فراخ سبيشال",
  price: 25,
  quantity: 2
}, {
  id: 2,
  name: "سلطة الشيف",
  price: 15,
  quantity: 1
}];

const CheckoutContent: React.FC = () => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const {
    setIsAddingNewAddress
  } = useCheckout();
  
  const handleAddNewAddress = () => {
    setIsAddingAddress(true);
    setIsAddingNewAddress(true);
  };
  
  const handleCancelAddAddress = () => {
    setIsAddingAddress(false);
    setIsAddingNewAddress(false);
  };
  
  return (
    <div className="space-y-4">
      {/* قسم العناوين */}
      <Card className="border border-blue-100 shadow-sm">
        <CardContent className="p-4">
          {isAddingAddress ? <NewAddressForm onCancel={handleCancelAddAddress} /> : <AddressSelector onAddNewClick={handleAddNewAddress} />}
        </CardContent>
      </Card>
      
      {/* قسم وقت التوصيل */}
      <Card className="border border-blue-100 shadow-sm">
        <CardContent className="p-4">
          <DeliveryTime />
        </CardContent>
      </Card>
      
      {/* قسم طرق الدفع */}
      <Card className="border border-blue-100 shadow-sm">
        <CardContent className="p-4">
          <PaymentMethods />
        </CardContent>
      </Card>
      
      {/* قسم ملخص الطلب */}
      <Card className="border border-blue-100 shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                ملخص الطلب
              </h3>
            </div>
            
            {/* عناصر السلة */}
            <div className="space-y-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-blue-800 font-medium">{item.name} × {item.quantity}</span>
                  <span className="text-blue-700 font-medium">{item.price * item.quantity} ج.م</span>
                </div>
              ))}
            </div>
            
            <Separator className="bg-blue-100" />
            
            {/* ملخص الأسعار */}
            <OrderSummary />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutContent;
