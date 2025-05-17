
import React from 'react';
import { CreditCard, Wallet, DollarSign } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PaymentMethod } from '@/services/userService';

interface PaymentMethodsProps {
  paymentMethods?: PaymentMethod[];
  selectedPaymentMethod: string | null;
  onPaymentMethodSelect: (id: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethods = [],
  selectedPaymentMethod,
  onPaymentMethodSelect
}) => {
  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'wallet':
        return <Wallet className="w-5 h-5" />;
      case 'cash':
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          طريقة الدفع
        </h3>
      </div>
      
      <RadioGroup value={selectedPaymentMethod || undefined} onValueChange={onPaymentMethodSelect}>
        <div className="space-y-3">
          {paymentMethods && paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <div key={method.id} className="relative">
                <RadioGroupItem
                  value={method.id}
                  id={`payment-${method.id}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`payment-${method.id}`}
                  className="flex items-center gap-3 cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50"
                >
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    {getPaymentIcon(method.type)}
                  </div>
                  <div>
                    <p className="font-medium">{method.title}</p>
                  </div>
                </Label>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500 bg-gray-50 rounded-lg">
              لا توجد وسائل دفع محفوظة
            </div>
          )}

          {/* وسيلة الدفع عند الاستلام دائماً متاحة */}
          {(!paymentMethods || !paymentMethods.some(method => method.type === 'cash')) && (
            <div className="relative">
              <RadioGroupItem
                value="cash-default"
                id="payment-cash-default"
                className="peer sr-only"
              />
              <Label
                htmlFor="payment-cash-default"
                className="flex items-center gap-3 cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50"
              >
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">الدفع عند الاستلام</p>
                </div>
              </Label>
            </div>
          )}
        </div>
      </RadioGroup>
      
      <Link to="/payment-methods">
        <Button variant="outline" className="w-full mt-2">
          إضافة وسيلة دفع جديدة
        </Button>
      </Link>
    </div>
  );
};

export default PaymentMethods;
