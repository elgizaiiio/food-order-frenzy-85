
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { useUserProfile, useUpdateUserProfile, useUploadProfileImage } from '@/hooks/useUserData';
import { useLazyImage } from '@/hooks/useLazyImage';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: userProfile, isLoading, error: profileError } = useUserProfile();
  const updateProfile = useUpdateUserProfile();
  const uploadImage = useUploadProfileImage();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // تحديث البيانات عند تحميلها
  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.name || '',
        phone: userProfile.phone || '',
      }));
      
      // تعيين صورة الملف الشخصي إذا كانت موجودة
      if (userProfile.profile_image) {
        setImagePreview(userProfile.profile_image);
      } else if (userProfile.avatar_url) {
        setImagePreview(userProfile.avatar_url);
      }
    }
  }, [userProfile]);

  // Use lazy loading for profile image preview
  const { imageSrc: profileImageSrc } = useLazyImage({
    src: imagePreview,
    placeholder: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("صيغة الملف غير مدعومة. الرجاء اختيار صورة بصيغة JPEG أو PNG أو GIF أو WEBP");
        return;
      }
      
      // Validate file size before processing
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("حجم الصورة كبير جداً. الرجاء اختيار صورة أقل من 5 ميجابايت");
        return;
      }

      try {
        // عرض الصورة مؤقتاً قبل الرفع للتحسين من تجربة المستخدم
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        
        // عرض رسالة التحميل
        const uploadToast = toast.loading("جاري رفع الصورة...");
        
        // رفع الصورة إلى السيرفر
        const result = await uploadImage.mutateAsync(file);
        
        toast.dismiss(uploadToast);
        toast.success("تم رفع الصورة بنجاح");
        
        // تحديث الصورة في الواجهة
        setImagePreview(result.image_url);
        
        // تحديث قاعدة البيانات بعنوان URL الجديد
        await updateProfile.mutateAsync({
          profile_image: result.image_url
        });
        
        console.log('تم تحديث صورة الملف الشخصي بنجاح:', result.image_url);
      } catch (error: any) {
        console.error('خطأ في رفع الصورة:', error);
        toast.error(`فشل في رفع الصورة: ${error.message || 'خطأ غير معروف'}`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("يجب تسجيل الدخول لتعديل الملف الشخصي");
      return;
    }
    
    try {
      // منع تقديم النموذج عدة مرات
      if (isSubmitting) return;
      setIsSubmitting(true);
      
      // إظهار رسالة التحميل
      const loadingToast = toast.loading("جاري تحديث الملف الشخصي...");
      
      // تحديث بيانات الملف الشخصي
      await updateProfile.mutateAsync({
        name: formData.name,
        phone: formData.phone
      });
      
      toast.dismiss(loadingToast);
      toast.success("تم تحديث الملف الشخصي بنجاح");
      navigate('/profile');
    } catch (error: any) {
      console.error('خطأ في تحديث الملف الشخصي:', error);
      toast.error(`فشل في تحديث الملف الشخصي: ${error.message || 'خطأ غير معروف'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center" dir="rtl">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-orange-600 font-medium">جاري التحميل...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center" dir="rtl">
        <div className="text-red-500 text-xl mb-4">حدث خطأ أثناء تحميل الملف الشخصي</div>
        <p className="text-gray-600 mb-6">يرجى التأكد من تسجيل الدخول والمحاولة مرة أخرى</p>
        <div className="flex gap-4">
          <Button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-600">
            إعادة المحاولة
          </Button>
          <Button onClick={() => navigate('/profile')} variant="outline">
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-gray-700">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">تعديل الملف الشخصي</h1>
          <div className="w-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  {profileImageSrc ? (
                    <AvatarImage 
                      src={profileImageSrc} 
                      alt={formData.name} 
                    />
                  ) : (
                    <AvatarFallback className="bg-orange-100 text-orange-800 text-2xl">
                      {formData.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || '؟'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label htmlFor="profile-picture" className={`absolute bottom-0 right-0 rounded-full p-2 cursor-pointer shadow-md transition-colors ${uploadImage.isPending ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'}`}>
                  {uploadImage.isPending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Camera className="w-4 h-4 text-white" />
                  )}
                </label>
                <input 
                  type="file" 
                  id="profile-picture" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadImage.isPending}
                />
              </div>
              <p className="text-sm text-orange-600">{uploadImage.isPending ? 'جاري رفع الصورة...' : 'اضغط على الأيقونة لتغيير الصورة الشخصية'}</p>
            </div>

            {/* Name Input */}
            <div className="mb-6">
              <Label htmlFor="name" className="block mb-2 text-gray-800">الاسم</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border-gray-200 focus:border-orange-400 focus:ring-orange-300"
              />
            </div>

            {/* Phone Input */}
            <div className="mb-8">
              <Label htmlFor="phone" className="block mb-2 text-gray-800">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+966 5xxxxxxxx"
                className="w-full border-gray-200 focus:border-orange-400 focus:ring-orange-300"
              />
              <p className="text-xs text-orange-500 mt-1">سيتم استخدام رقم الهاتف للتواصل بخصوص طلباتك</p>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className={`w-full text-white font-medium py-3 rounded-xl shadow-md ${isSubmitting || updateProfile.isPending ? 'bg-gray-400 hover:bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'}`}
              disabled={updateProfile.isPending || isSubmitting || uploadImage.isPending}
            >
              {updateProfile.isPending || isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </form>
      </div>
    </div>
  );
};

export default EditProfile;
