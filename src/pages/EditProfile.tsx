
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { useUserProfile, useUpdateUserProfile } from '@/hooks/useUserData';
import { uploadFile } from '@/services/storageService';
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyImage } from '@/hooks/useLazyImage';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: userProfile, isLoading, error: profileError, refetch } = useUserProfile();
  const updateProfile = useUpdateUserProfile();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    imageFile: null as File | null,
    imagePreview: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // تحديث البيانات عند تحميلها
  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.name || '',
        phone: userProfile.phone || '',
        imagePreview: userProfile.profile_image || userProfile.avatar_url || '',
      }));
    }
  }, [userProfile]);

  // Use lazy loading for profile image preview
  const { imageSrc: profileImageSrc } = useLazyImage({
    src: formData.imagePreview,
    placeholder: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // Optimize image preview loading
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ 
          ...prev, 
          imageFile: file,
          imagePreview: reader.result as string 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async (file: File): Promise<string | null> => {
    try {
      if (!user?.id) {
        throw new Error("يجب تسجيل الدخول لرفع صورة");
      }
      
      // إنشاء اسم فريد للملف
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // استخدام خدمة التخزين لرفع الملف
      return await uploadFile('avatars', filePath, file);
    } catch (error) {
      console.error('خطأ غير متوقع أثناء رفع الصورة:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("يجب تسجيل الدخول لتعديل الملف الشخصي");
      return;
    }
    
    try {
      // Prevent multiple submissions
      if (isSubmitting) return;
      setIsSubmitting(true);
      
      // Show loading toast
      const loadingToast = toast.loading("جاري تحديث الملف الشخصي...");
      
      let profileImageUrl = userProfile?.profile_image || null;
      
      // رفع الصورة إذا تم اختيارها
      if (formData.imageFile) {
        try {
          const uploadedUrl = await uploadProfileImage(formData.imageFile);
          if (uploadedUrl) {
            profileImageUrl = uploadedUrl;
          }
        } catch (error: any) {
          toast.dismiss(loadingToast);
          toast.error(`حدث خطأ أثناء رفع الصورة: ${error.message || 'خطأ غير معروف'}`);
          setIsSubmitting(false);
          return;
        }
      }
      
      // تحديث بيانات الملف الشخصي
      await updateProfile.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        profile_image: profileImageUrl
      });
      
      toast.dismiss(loadingToast);
      toast.success("تم تحديث الملف الشخصي بنجاح");
      navigate('/profile');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(`حدث خطأ أثناء تحديث الملف الشخصي: ${error.message || 'خطأ غير معروف'}`);
      // Try to refetch user profile after error
      refetch();
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

  // أظهر الخطأ إذا لم يتمكن من تحميل الملف الشخصي بعد عدة محاولات
  if (profileError) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center" dir="rtl">
        <div className="text-red-500 text-xl mb-4">حدث خطأ أثناء تحميل الملف الشخصي</div>
        <p className="text-gray-600 mb-6">يرجى التأكد من تسجيل الدخول والمحاولة مرة أخرى</p>
        <div className="flex gap-4">
          <Button onClick={() => refetch()} className="bg-orange-500 hover:bg-orange-600">
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
                <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 rounded-full p-2 cursor-pointer shadow-md transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </label>
                <input 
                  type="file" 
                  id="profile-picture" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <p className="text-sm text-orange-600">اضغط على الأيقونة لتغيير الصورة الشخصية</p>
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
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl shadow-md"
              disabled={updateProfile.isPending || isSubmitting}
            >
              {updateProfile.isPending || isSubmitting ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </form>
      </div>
    </div>
  );
};

export default EditProfile;
