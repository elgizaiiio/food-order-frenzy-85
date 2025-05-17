
import { useState, useEffect, useRef } from 'react';

interface UseLazyImageProps {
  src: string | null | undefined;
  placeholder?: string;
  priority?: boolean;
}

/**
 * هذا الـ Hook يحسن تحميل الصور عن طريق تأخير تحميل الصور غير المرئية.
 * يستخدم Intersection Observer لتحميل الصور فقط عندما تكون في نطاق الرؤية.
 * يدعم الأولوية لتحميل الصور المهمة على الفور.
 */
export function useLazyImage({ src, placeholder = '', priority = false }: UseLazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    // إذا كانت الصورة ذات أولوية، تحميلها فورًا
    if (priority) {
      setImageSrc(src);
      setIsLoading(false);
      return;
    }

    const currentImageRef = imageRef.current;
    
    // إعادة تعيين الحالات عند تغيير مصدر الصورة
    setIsLoading(true);
    setHasError(false);
    
    const loadImage = () => {
      // استخدام صورة وهمية ثم تحميل الصورة الحقيقية في الخلفية
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
        console.error(`فشل في تحميل الصورة: ${src}`);
      };
      
      // تحسين الأداء باستخدام تلميحات
      img.loading = 'lazy';
      // تسريع التنزيل للمتصفحات الحديثة
      if ('fetchpriority' in img) {
        (img as any).fetchPriority = 'low';
      }
      img.decoding = 'async';
      img.src = src;
    };

    // استخدام Intersection Observer API للتحميل المؤخر
    if ("IntersectionObserver" in window) {
      // إلغاء المراقب القديم إذا كان موجودًا
      if (observer.current) {
        observer.current.disconnect();
      }
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadImage();
          if (observer.current && currentImageRef) {
            // إلغاء المراقبة بعد التحميل
            observer.current.unobserve(currentImageRef);
            observer.current.disconnect();
          }
        }
      }, { 
        rootMargin: '200px', // تحميل الصور قبل ظهورها بـ 200 بكسل
        threshold: 0.01 // بدء التحميل بمجرد ظهور 1% من الصورة
      });
      
      if (currentImageRef) {
        observer.current.observe(currentImageRef);
      }
    } else {
      // إذا لم يكن Intersection Observer مدعومًا
      loadImage();
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [src, placeholder, priority]);

  return { imageSrc, isLoading, hasError, imageRef };
}

// مكون الصورة الكسول
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  priority?: boolean;
  onError?: () => void;
}> = ({ src, alt, className = '', placeholder = '', priority = false, onError }) => {
  const { imageSrc, isLoading, hasError, imageRef } = useLazyImage({ 
    src, 
    placeholder, 
    priority 
  });
  
  return (
    <div ref={imageRef} className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
      <img 
        src={hasError ? (placeholder || 'https://via.placeholder.com/150?text=صورة+غير+متوفرة') : imageSrc} 
        alt={alt} 
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        loading="lazy"
        onError={() => {
          if (onError) onError();
        }}
        decoding="async"
      />
    </div>
  );
};
