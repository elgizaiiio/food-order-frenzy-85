
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useCheckout } from '@/context/CheckoutContext';

const OrderSummary: React.FC = () => {
  const {
    subtotal,
    deliveryFee,
    orderTotal
  } = useCheckout();
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">المجموع الفرعي</span>
        <span>{subtotal} ج.م</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">رسوم التوصيل</span>
        <span>{deliveryFee} ج.م</span>
      </div>
      <Separator className="my-2 bg-blue-200" />
      <div className="flex justify-between font-bold">
        <span>الإجمالي</span>
        <span className="text-blue-700">{orderTotal} ج.م</span>
      </div>
    </div>
  );
};

export default OrderSummary;
