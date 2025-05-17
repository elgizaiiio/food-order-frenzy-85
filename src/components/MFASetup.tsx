
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface MFASetupProps {
  onComplete?: () => void;
}

const MFASetup: React.FC<MFASetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'initial' | 'scan' | 'verify' | 'success'>('initial');
  const [qrCode, setQrCode] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { setupMFA, verifyMFA } = useAuth();

  const handleSetupMFA = async () => {
    setIsLoading(true);
    try {
      const qrCodeData = await setupMFA();
      setQrCode(qrCodeData);
      setStep('scan');
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء إعداد المصادقة الثنائية');
      console.error('Error setting up MFA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyMFA = async () => {
    if (verificationCode.length !== 6) {
      toast.error('يرجى إدخال رمز صالح مكون من 6 أرقام');
      return;
    }

    setIsLoading(true);
    try {
      const isVerified = await verifyMFA(verificationCode);
      if (isVerified) {
        toast.success('تم تفعيل المصادقة الثنائية بنجاح');
        setStep('success');
        onComplete?.();
      } else {
        toast.error('الرمز غير صالح، يرجى المحاولة مرة أخرى');
      }
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء التحقق من رمز المصادقة');
      console.error('Error verifying MFA code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >
      {step === 'initial' && (
        <>
          <motion.div variants={itemVariants} className="text-center mb-6">
            <div className="bg-orange-100 p-4 inline-block rounded-full mb-4">
              <KeyRound className="h-10 w-10 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">تفعيل المصادقة الثنائية</h2>
            <p className="text-gray-600">
              تعزيز أمان حسابك باستخدام المصادقة الثنائية. ستحتاج إلى تطبيق المصادقة على هاتفك مثل Google Authenticator أو Authy.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleSetupMFA}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  <span>جاري الإعداد...</span>
                </div>
              ) : (
                "بدء الإعداد"
              )}
            </Button>
          </motion.div>
        </>
      )}

      {step === 'scan' && (
        <>
          <motion.div variants={itemVariants} className="text-center mb-6">
            <div className="bg-orange-100 p-4 inline-block rounded-full mb-4">
              <QrCode className="h-10 w-10 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">مسح رمز QR</h2>
            <p className="text-gray-600 mb-4">
              استخدم تطبيق المصادقة على هاتفك لمسح رمز QR التالي
            </p>
            {qrCode && (
              <div className="bg-white p-2 rounded-lg border border-gray-200 mb-4 mx-auto inline-block">
                <img src={qrCode} alt="QR Code for MFA" className="mx-auto" width={200} height={200} />
              </div>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              onClick={() => setStep('verify')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-md"
            >
              التالي
            </Button>
          </motion.div>
        </>
      )}

      {step === 'verify' && (
        <>
          <motion.div variants={itemVariants} className="text-center mb-6">
            <div className="bg-orange-100 p-4 inline-block rounded-full mb-4">
              <KeyRound className="h-10 w-10 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">أدخل رمز التحقق</h2>
            <p className="text-gray-600 mb-4">
              أدخل الرمز المعروض في تطبيق المصادقة
            </p>
            <div className="flex justify-center mb-4">
              <InputOTP 
                maxLength={6} 
                value={verificationCode}
                onChange={(code) => setVerificationCode(code)}
                dir="ltr"
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot index={0} className="border-orange-300 focus:border-orange-500" />
                  <InputOTPSlot index={1} className="border-orange-300 focus:border-orange-500" />
                  <InputOTPSlot index={2} className="border-orange-300 focus:border-orange-500" />
                  <InputOTPSlot index={3} className="border-orange-300 focus:border-orange-500" />
                  <InputOTPSlot index={4} className="border-orange-300 focus:border-orange-500" />
                  <InputOTPSlot index={5} className="border-orange-300 focus:border-orange-500" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleVerifyMFA}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow-md"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  <span>جاري التحقق...</span>
                </div>
              ) : (
                "تحقق"
              )}
            </Button>
          </motion.div>
        </>
      )}

      {step === 'success' && (
        <>
          <motion.div variants={itemVariants} className="text-center mb-6">
            <div className="bg-green-100 p-4 inline-block rounded-full mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">تم التفعيل بنجاح!</h2>
            <p className="text-gray-600">
              تم تفعيل المصادقة الثنائية بنجاح. حسابك الآن أكثر أمانًا.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              onClick={onComplete}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow-md"
            >
              تم
            </Button>
          </motion.div>
        </>
      )}

      <motion.div 
        variants={itemVariants}
        className="mt-4 text-center text-sm text-gray-500"
      >
        <p className="flex items-center justify-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          قم بحفظ رموز الاسترداد في حال فقدت هاتفك
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MFASetup;
