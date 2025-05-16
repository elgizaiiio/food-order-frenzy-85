
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Headphones, Phone, Mail, MessageSquare, AlertTriangle, Info, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const DeliveryHelp: React.FC = () => {
  // قائمة بالأسئلة الشائعة
  const faqs = [
    {
      question: "كم من الوقت يستغرق توصيل الطلب؟",
      answer: "يعتمد وقت التوصيل على المسافة بين نقطة الاستلام ونقطة التسليم، وعادة ما يتراوح بين 30 دقيقة إلى ساعة واحدة للتوصيل العادي. يمكنك اختيار التوصيل السريع للحصول على طلبك بشكل أسرع."
    },
    {
      question: "هل يمكنني تتبع السائق في الوقت الفعلي؟",
      answer: "نعم، بمجرد أن يتم تعيين سائق لطلبك، يمكنك تتبع موقعه في الوقت الفعلي من خلال صفحة تتبع التوصيل. ستتمكن من رؤية موقع السائق على الخريطة ومعرفة الوقت المقدر للوصول."
    },
    {
      question: "ماذا أفعل إذا تأخر طلبي؟",
      answer: "إذا تأخر طلبك عن الوقت المقدر، يمكنك التواصل مباشرة مع السائق من خلال صفحة تتبع التوصيل، أو الاتصال بخدمة العملاء للمساعدة."
    },
    {
      question: "كيف أقوم بإلغاء طلب التوصيل؟",
      answer: "يمكنك إلغاء طلب التوصيل من صفحة تتبع الطلب قبل أن يتم تعيين سائق. بعد تعيين سائق، قد يتم تطبيق رسوم إلغاء وفقًا لسياسة الإلغاء."
    },
    {
      question: "هل يمكنني تغيير عنوان التوصيل بعد تأكيد الطلب؟",
      answer: "نعم، يمكنك تغيير عنوان التوصيل قبل أن يبدأ السائق في توصيل الطلب. يرجى التواصل مع دعم العملاء أو التحدث مباشرة مع السائق لتغيير العنوان."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* الهيدر */}
        <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-b-3xl shadow-xl py-4 px-4">
          <div className="flex items-center justify-between mb-2">
            <Link to="/delivery-tracking" className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">المساعدة والدعم</h1>
            <div className="w-6"></div> {/* لعنصر فارغ للمباعدة */}
          </div>
        </header>
        
        {/* المحتوى الرئيسي */}
        <div className="px-4 py-6">
          {/* قسم الدعم */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <Headphones className="w-5 h-5 ml-2 text-orange-600" />
              تواصل مع الدعم
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 hover:bg-orange-50 cursor-pointer transition-colors border-orange-100">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">اتصل بنا</h3>
                  <p className="text-xs text-gray-500 mt-1">19XXX</p>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-orange-50 cursor-pointer transition-colors border-orange-100">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">محادثة مباشرة</h3>
                  <p className="text-xs text-gray-500 mt-1">متاح 24/7</p>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-orange-50 cursor-pointer transition-colors border-orange-100">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">البريد الإلكتروني</h3>
                  <p className="text-xs text-gray-500 mt-1">support@dam.com</p>
                </div>
              </Card>
              
              <Card className="p-4 hover:bg-orange-50 cursor-pointer transition-colors border-orange-100">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-gray-800">الإبلاغ عن مشكلة</h3>
                  <p className="text-xs text-gray-500 mt-1">مشكلة طارئة</p>
                </div>
              </Card>
            </div>
          </div>
          
          {/* الأسئلة الشائعة */}
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 ml-2 text-orange-600" />
              الأسئلة الشائعة
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-medium text-right py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {/* نص مساعدة إضافي */}
            <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex">
                <Info className="w-5 h-5 text-orange-600 mt-1 ml-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-800">هل تحتاج المزيد من المساعدة؟</h3>
                  <p className="text-sm text-gray-600 mt-1">فريق الدعم الخاص بنا متاح على مدار الساعة لمساعدتك في أي استفسارات أو مشاكل قد تواجهها.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryHelp;
