
import React, { useMemo } from 'react';
import { Separator } from '@/components/ui/separator';
import { useCheckout } from '@/context/CheckoutContext';

const OrderSummary: React.FC = () => {
  const {
    subtotal,
    deliveryFee,
    orderTotal
  } = useCheckout();
  
  // استخدام useMemo لمنع إعادة الحساب غير الضروري
  const formattedValues = useMemo(() => {
    return {
      subtotal: `${subtotal} ج.م`,
      deliveryFee: `${deliveryFee} ج.م`,
      orderTotal: `${orderTotal} ج.م`
    };
  }, [subtotal, deliveryFee, orderTotal]);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">المجموع الفرعي</span>
        <span>{formattedValues.subtotal}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">رسوم التوصيل</span>
        <span>{formattedValues.deliveryFee}</span>
      </div>
      <Separator className="my-2 bg-blue-200" />
      <div className="flex justify-between font-bold">
        <span>الإجمالي</span>
        <span className="text-blue-700">{formattedValues.orderTotal}</span>
      </div>
    </div>
  );
};

export default React.memo(OrderSummary);
