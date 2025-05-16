
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown, HelpCircle, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const DeliveryHelp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* رأس الصفحة */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b z-10">
          <Link to="/delivery-tracking" className="text-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">المساعدة والدعم</h1>
          <div className="w-6"></div>
        </div>
        
        {/* قسم الأسئلة الشائعة */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">الأسئلة الشائعة</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b">
              <AccordionTrigger className="py-4">
                كيف يتم حساب سعر التوصيل؟
              </AccordionTrigger>
              <AccordionContent className="py-3 px-1">
                <p className="text-gray-600">
                  يتم حساب سعر التوصيل بناءً على عدة عوامل، منها:
                </p>
                <ul className="list-disc mr-5 mt-2 space-y-1 text-gray-600">
                  <li>المسافة بين نقطة الاستلام ونقطة التوصيل</li>
                  <li>وقت الطلب (ساعات الذروة قد تكون أعلى)</li>
                  <li>حجم ووزن الشحنة</li>
                  <li>تفاصيل التوصيل الخاصة (مثل التوصيل العاجل)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b">
              <AccordionTrigger className="py-4">
                كيف يمكنني إلغاء طلب التوصيل؟
              </AccordionTrigger>
              <AccordionContent className="py-3 px-1">
                <p className="text-gray-600">
                  يمكنك إلغاء طلب التوصيل من خلال الذهاب إلى صفحة "تتبع طلبات التوصيل"، ثم:
                </p>
                <ol className="list-decimal mr-5 mt-2 space-y-1 text-gray-600">
                  <li>اختر الطلب الذي ترغب في إلغائه</li>
                  <li>اضغط على زر "إلغاء الطلب"</li>
                  <li>قم بتأكيد الإلغاء</li>
                </ol>
                <p className="mt-2 text-yellow-600">
                  ملاحظة: إذا تم قبول الطلب بالفعل من قبل سائق، قد يتم تطبيق رسوم إلغاء.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b">
              <AccordionTrigger className="py-4">
                ما هي المواد التي يمكن توصيلها؟
              </AccordionTrigger>
              <AccordionContent className="py-3 px-1">
                <p className="text-gray-600">
                  يمكنك طلب توصيل العديد من المواد مثل:
                </p>
                <ul className="list-disc mr-5 mt-2 space-y-1 text-gray-600">
                  <li>المستندات والوثائق</li>
                  <li>الطرود والهدايا</li>
                  <li>المنتجات من المتاجر</li>
                  <li>الوجبات من المطاعم</li>
                  <li>المشتريات الشخصية</li>
                </ul>
                <p className="mt-2 text-yellow-600">
                  ملاحظة: لا يسمح بنقل المواد المحظورة مثل المواد الخطرة أو المحرمة قانوناً.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-b">
              <AccordionTrigger className="py-4">
                هل يمكنني تتبع سائق التوصيل؟
              </AccordionTrigger>
              <AccordionContent className="py-3 px-1">
                <p className="text-gray-600">
                  نعم، بمجرد قبول طلبك من قبل سائق، يمكنك تتبع موقعه مباشرة من صفحة تفاصيل الطلب. ستتمكن من:
                </p>
                <ul className="list-disc mr-5 mt-2 space-y-1 text-gray-600">
                  <li>رؤية موقع السائق على الخريطة</li>
                  <li>الاطلاع على الوقت المتبقي للتوصيل</li>
                  <li>التواصل مع السائق مباشرة إذا لزم الأمر</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="py-4">
                ماذا أفعل إذا تأخر طلب التوصيل؟
              </AccordionTrigger>
              <AccordionContent className="py-3 px-1">
                <p className="text-gray-600">
                  في حال تأخر طلب التوصيل عن الوقت المقدر:
                </p>
                <ol className="list-decimal mr-5 mt-2 space-y-1 text-gray-600">
                  <li>تحقق من حالة الطلب في صفحة التتبع</li>
                  <li>تواصل مع السائق مباشرة عبر الاتصال أو المراسلة</li>
                  <li>إذا استمرت المشكلة، يمكنك التواصل مع فريق خدمة العملاء للحصول على المساعدة</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <Separator />
        
        {/* قسم الاتصال بالدعم */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">تواصل مع الدعم</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-blue-100">
              <CardContent className="flex flex-col items-center justify-center p-4 pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-center mb-2">المحادثة المباشرة</h3>
                <p className="text-xs text-gray-500 text-center mb-3">
                  تواصل مباشرة مع فريق الدعم
                </p>
                <Link to="/chat-support">
                  <Button 
                    variant="outline" 
                    className="w-full text-sm border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    بدء محادثة
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-green-100">
              <CardContent className="flex flex-col items-center justify-center p-4 pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-center mb-2">اتصل بنا</h3>
                <p className="text-xs text-gray-500 text-center mb-3">
                  متاح على مدار الساعة
                </p>
                <a href="tel:920001234">
                  <Button 
                    className="w-full text-sm bg-green-500 hover:bg-green-600"
                  >
                    920001234
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* قسم الشروط والضمانات */}
        <div className="p-4 mt-2">
          <h2 className="text-lg font-semibold mb-3">شروط الخدمة والضمانات</h2>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="mt-1">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800">ضمان جودة الخدمة</h3>
                <p className="mt-1 text-sm text-blue-700">
                  نلتزم بتوفير خدمة توصيل آمنة وسريعة. في حالة عدم رضاك عن الخدمة، يرجى التواصل مع فريق الدعم لمساعدتك.
                </p>
                <Link to="/terms-and-conditions" className="text-sm text-blue-600 underline mt-2 inline-block">
                  الشروط والأحكام
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHelp;
