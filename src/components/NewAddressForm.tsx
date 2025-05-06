
import React from 'react';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCheckout } from '@/context/CheckoutContext';
import { useForm } from 'react-hook-form';

interface NewAddressFormProps {
  onCancel: () => void;
}

interface AddressFormData {
  title: string;
  fullAddress: string;
  phone: string;
}

const NewAddressForm: React.FC<NewAddressFormProps> = ({ onCancel }) => {
  const { addAddress } = useCheckout();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddressFormData>({
    defaultValues: {
      title: '',
      fullAddress: '',
      phone: ''
    }
  });

  const onSubmit = (data: AddressFormData) => {
    addAddress({
      ...data,
      isDefault: false
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onCancel} className="text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold">إضافة عنوان جديد</h3>
        <div className="w-5"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">اسم العنوان (المنزل، العمل، ...)</Label>
          <Input 
            id="title"
            placeholder="مثال: المنزل، العمل، ..."
            {...register("title", { required: "هذا الحقل مطلوب" })}
            className="focus:border-brand-500"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullAddress" className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            العنوان التفصيلي
          </Label>
          <Input 
            id="fullAddress"
            placeholder="مثال: شارع الملك فهد، حي الورود، الرياض"
            {...register("fullAddress", { required: "هذا الحقل مطلوب" })}
            className="focus:border-brand-500"
          />
          {errors.fullAddress && (
            <p className="text-red-500 text-xs">{errors.fullAddress.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            رقم الهاتف
          </Label>
          <Input 
            id="phone"
            type="tel"
            placeholder="05xxxxxxxx"
            {...register("phone", { 
              required: "هذا الحقل مطلوب",
              pattern: {
                value: /^(05)[0-9]{8}$/,
                message: "الرجاء إدخال رقم هاتف صحيح"
              }
            })}
            className="focus:border-brand-500"
            dir="ltr"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>

        <div className="pt-2 flex gap-3">
          <Button 
            type="submit" 
            className="flex-1 bg-brand-500 hover:bg-brand-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'جارٍ الحفظ...' : 'حفظ العنوان'}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewAddressForm;
