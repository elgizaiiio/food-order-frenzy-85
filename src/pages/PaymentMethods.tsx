
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, CreditCard, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface PaymentCard {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  isDefault: boolean;
}

const PaymentMethods: React.FC = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: '1',
      cardNumber: '•••• •••• •••• 4242',
      expiryDate: '12/25',
      cardHolder: 'أحمد محمد',
      isDefault: true
    }
  ]);

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
    toast({
      title: "تم حذف البطاقة",
      description: "تم حذف البطاقة بنجاح"
    });
  };

  const setAsDefault = (id: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
    toast({
      title: "تم تغيير البطاقة الافتراضية",
      description: "تم تحديث البطاقة الافتراضية بنجاح"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">البطاقات المحفوظة</h1>
          <div className="w-6"></div>
        </div>

        {/* Add New Card Button */}
        <div className="px-4 py-6">
          <Link to="/add-payment-method">
            <Button className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600">
              <PlusCircle className="w-5 h-5" />
              إضافة بطاقة جديدة
            </Button>
          </Link>
        </div>

        {/* Cards List */}
        <div className="px-4 py-2 space-y-4">
          {cards.map((card) => (
            <Card key={card.id} className={`overflow-hidden ${card.isDefault ? 'bg-gradient-to-r from-brand-100 to-orange-50 border-brand-200' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-5 h-5 text-brand-600" />
                      <h3 className="font-medium">{card.cardNumber}</h3>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>الاسم: {card.cardHolder}</p>
                      <p>تنتهي في: {card.expiryDate}</p>
                      {card.isDefault && (
                        <span className="inline-block mt-2 text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                          البطاقة الافتراضية
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent dir="rtl">
                      <DialogHeader>
                        <DialogTitle>حذف البطاقة</DialogTitle>
                        <DialogDescription>
                          هل أنت متأكد من رغبتك في حذف هذه البطاقة؟
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => deleteCard(card.id)}
                        >
                          نعم، حذف البطاقة
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

                {!card.isDefault && (
                  <Button 
                    variant="ghost" 
                    className="mt-3 text-brand-600 hover:text-brand-700 hover:bg-brand-50 text-sm px-2 h-8"
                    onClick={() => setAsDefault(card.id)}
                  >
                    تعيين كبطاقة افتراضية
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Text */}
        <div className="px-4 py-6">
          <p className="text-sm text-gray-500 text-center">
            جميع معلومات البطاقة مشفرة ومحمية وفقاً لأعلى معايير الأمان
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
