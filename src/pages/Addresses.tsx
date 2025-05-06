
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, MapPin, Home, Briefcase, Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

type AddressType = 'home' | 'work' | 'other';

interface Address {
  id: string;
  name: string;
  address: string;
  type: AddressType;
  isDefault: boolean;
}

const Addresses: React.FC = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'المنزل',
      address: 'شارع الملك فهد، حي الورود، الرياض',
      type: 'home',
      isDefault: true
    },
    {
      id: '2',
      name: 'المكتب',
      address: 'برج المملكة، طريق الملك فهد، الرياض',
      type: 'work',
      isDefault: false
    }
  ]);

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
    toast({
      title: "تم حذف العنوان",
      description: "تم حذف العنوان بنجاح"
    });
  };

  const setAsDefault = (id: string) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
    toast({
      title: "تم تغيير العنوان الافتراضي",
      description: "تم تحديث العنوان الافتراضي بنجاح"
    });
  };

  const getAddressIcon = (type: AddressType) => {
    switch(type) {
      case 'home':
        return <Home className="w-5 h-5 text-blue-500" />;
      case 'work':
        return <Briefcase className="w-5 h-5 text-green-500" />;
      default:
        return <MapPin className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">العناوين المحفوظة</h1>
          <div className="w-6"></div>
        </div>

        {/* Add New Address Button */}
        <div className="px-4 py-6">
          <Link to="/add-address">
            <Button className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600">
              <PlusCircle className="w-5 h-5" />
              أضف عنوان جديد
            </Button>
          </Link>
        </div>

        {/* Addresses List */}
        <div className="px-4 py-2 space-y-4">
          {addresses.map((address) => (
            <Card key={address.id} className={`border ${address.isDefault ? 'border-brand-200 bg-brand-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      {getAddressIcon(address.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{address.name}</h3>
                        {address.isDefault && (
                          <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                            الافتراضي
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{address.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/edit-address/${address.id}`}>
                      <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                    </Link>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-gray-200">
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent dir="rtl">
                        <DialogHeader>
                          <DialogTitle>حذف العنوان</DialogTitle>
                          <DialogDescription>
                            هل أنت متأكد من رغبتك في حذف هذا العنوان؟
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => deleteAddress(address.id)}
                          >
                            نعم، حذف العنوان
                          </Button>
                          <Button 
                            variant="destructive"
                          >
                            إلغاء
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {!address.isDefault && (
                  <Button 
                    variant="ghost" 
                    className="mt-2 text-brand-600 hover:text-brand-700 hover:bg-brand-50 text-sm px-2 h-8"
                    onClick={() => setAsDefault(address.id)}
                  >
                    تعيين كعنوان افتراضي
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
