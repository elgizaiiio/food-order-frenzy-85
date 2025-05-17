
import React, { lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { useUserProfile } from '@/hooks/useUserData';
import { toast } from 'sonner';
import { useLazyImage } from '@/hooks/useLazyImage';

// تحميل المكونات غير الأساسية بشكل متأخر لتسريع التحميل الأولي
const LazyMenuSection = lazy(() => import('@/components/profile/MenuSection'));

// مكون الرأس للملف الشخصي - محسن للأداء
const ProfileHeader = ({ displayName, profileImage }: { displayName: string, profileImage: string | null }) => {
  const { imageSrc, isLoading } = useLazyImage({ 
    src: profileImage,
    placeholder: '', 
    priority: true // نحمل الصورة بأولوية عالية لأنها مرئية مباشرة
  });
  
  return (
    <div className="relative">
      {/* Gradient background header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-40 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-white hover:text-orange-200 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-white">الملف الشخصي</h1>
          <Link to="/settings" className="text-white hover:text-orange-200 transition-colors">
            <Settings className="w-6 h-6" />
          </Link>
        </div>
      </div>
      
      {/* Profile avatar that overlaps the gradient header */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-full" />
            ) : imageSrc ? (
              <AvatarImage 
                src={imageSrc} 
                loading="eager"
                fetchPriority="high"
                alt={displayName}
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <AvatarFallback className="bg-orange-100 text-orange-800 text-4xl font-bold">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </div>
  );
};

// مكون حالة التحميل للملف الشخصي
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <Skeleton className="h-40 w-full rounded-xl mb-16" />
      <div className="flex flex-col items-center pt-8">
        <Skeleton className="h-6 w-36 mb-2" />
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-10 w-48 rounded-full" />
      </div>
    </div>
    <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
      <Skeleton className="h-6 w-36 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center">
              <Skeleton className="h-10 w-10 rounded-full mr-3" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: userProfile, isLoading, error: profileError, refetch } = useUserProfile();
  
  // إعادة تحميل البيانات عند زيارة الصفحة - باستخدام المعرف للمكون لمنع إعادة التحميل المستمر
  React.useEffect(() => {
    // استخدم setTimeout لتأخير التحميل قليلاً حتى تتم عملية التصيير أولاً
    const timer = setTimeout(() => {
      refetch();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [refetch]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
      toast.success('تم تسجيل الخروج بنجاح');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };
  
  if (isLoading) {
    return <ProfileSkeleton />;
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
          <Button onClick={() => navigate('/')} variant="outline">
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }
  
  const displayName = userProfile?.name || user?.email?.split('@')[0] || 'المستخدم';
  const profileImage = userProfile?.profile_image || userProfile?.avatar_url || null;
  
  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header with gradient background */}
        <ProfileHeader displayName={displayName} profileImage={profileImage} />
        
        {/* User Info with spacing for the avatar */}
        <div className="pt-20 pb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{displayName}</h2>
          <p className="text-orange-600 mb-4">{user?.email}</p>
          
          <Link to="/edit-profile">
            <Button 
              variant="outline" 
              className="rounded-full border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
            >
              تعديل الملف الشخصي
            </Button>
          </Link>
        </div>
        
        {/* Divider */}
        <div className="h-2 bg-gray-100"></div>
        
        {/* استخدام Suspense لتحميل المكونات الأقل أهمية بشكل متأخر */}
        <Suspense fallback={
          <div className="p-4 space-y-4">
            <Skeleton className="h-6 w-36 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        }>
          <LazyMenuSection handleSignOut={handleSignOut} />
        </Suspense>
      </div>
    </div>
  );
};

export default Profile;
