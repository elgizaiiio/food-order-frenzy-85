
import React from 'react';
import { CreditCard, Wallet, DollarSign, Phone } from 'lucide-react';
import { useCheckout, PaymentMethod } from '@/context/CheckoutContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const PaymentMethods: React.FC = () => {
  const { paymentMethod, setPaymentMethod } = useCheckout();

  const payments = [
    { 
      id: 'cash', 
      name: 'الدفع عند الاستلام', 
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      description: 'ادفع كاش عند استلام طلبك'
    },
    { 
      id: 'card', 
      name: 'بطاقة ائتمان / فيزا', 
      icon: <CreditCard className="h-5 w-5 text-blue-600" />,
      description: 'فيزا، ماستركارد، ميزة'
    },
    { 
      id: 'wallet', 
      name: 'المحافظ الإلكترونية', 
      icon: <Wallet className="h-5 w-5 text-purple-600" />,
      description: 'فودافون كاش، محفظة مصر الرقمية، وي باي'
    },
    { 
      id: 'fawry', 
      name: 'فوري', 
      icon: <Phone className="h-5 w-5 text-orange-600" />,
      description: 'الدفع من خلال خدمة فوري'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-brand-500" />
          طريقة الدفع
        </h3>
      </div>

      <RadioGroup 
        value={paymentMethod} 
        onValueChange={(value) => setPaymentMethod(value as PaymentMethod)} 
        className="space-y-2"
      >
        {payments.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem
              value={option.id}
              id={`payment-${option.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`payment-${option.id}`}
              className="flex flex-col space-y-1 cursor-pointer rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-gray-200 p-1.5 bg-white">
                    {option.icon}
                  </div>
                  <div>
                    <p className="font-medium">{option.name}</p>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </div>
                {paymentMethod === option.id && (
                  <div className="h-3 w-3 rounded-full bg-brand-500"></div>
                )}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {paymentMethod === 'card' && (
        <div className="flex items-center justify-between px-2 py-3 bg-gray-50 rounded-lg">
          <div className="flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/ar/3/3d/Meeza_card_logo.jpg" alt="Meeza" className="h-6" />
          </div>
          <span className="text-xs text-gray-500">معاملات آمنة 100%</span>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
