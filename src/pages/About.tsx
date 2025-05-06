
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">عن التطبيق</h1>
          <div className="w-6"></div>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-brand-500 text-3xl font-bold">طلب</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">طلب فود</h2>
            <p className="text-gray-500 text-sm mt-1">الإصدار 1.0.0</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-2">عن التطبيق</h3>
              <p className="text-gray-600">
                طلب فود هو تطبيق لتوصيل الطلبات في مصر، يوفر لك أفضل المطاعم والمتاجر والصيدليات وكل حاجة تحتاجها وتوصيلها لحد باب بيتك.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">خدماتنا</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>توصيل الطلبات من المطاعم</li>
                <li>توصيل المشتريات من السوبر ماركت</li>
                <li>توصيل الأدوية من الصيدليات</li>
                <li>توصيل مستحضرات العناية الشخصية</li>
                <li>توصيل الملابس</li>
                <li>خدمات الاشتراكات في الجيم</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">تواصل معنا</h3>
              <div className="space-y-1 text-gray-600">
                <p>البريد الإلكتروني: info@talabfood.eg</p>
                <p>رقم الهاتف: 19999</p>
                <p>العنوان: القاهرة، مصر</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">حقوق الملكية</h3>
              <p className="text-gray-600">
                © 2023-2025 طلب فود. كل الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
