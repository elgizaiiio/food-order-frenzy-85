
import { useState, useEffect, useRef } from 'react';

interface UseLazyImageProps {
  src: string | null | undefined;
  placeholder?: string;
  priority?: boolean;
  quality?: 'low' | 'medium' | 'high';
  blurhash?: string;
}

/**
 * هذا الـ Hook محسن لتحميل الصور عن طريق تأخير تحميل الصور غير المرئية.
 * يستخدم Intersection Observer مع تحسينات إضافية للأداء.
 */
export function useLazyImage({ 
  src, 
  placeholder = '', 
  priority = false, 
  quality = 'medium',
  blurhash
}: UseLazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const attemptCount = useRef(0);
  const MAX_RETRY = 2;

  // استخدام محمل الصور المُحسن
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
    
    // تحسين وظيفة تحميل الصورة مع دعم إعادة المحاولة والتحسين
    const loadImage = () => {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        attemptCount.current = 0; // إعادة تعيين عداد المحاولات
      };
      
      img.onerror = () => {
        attemptCount.current += 1;
        
        if (attemptCount.current <= MAX_RETRY) {
          // إعادة المحاولة بعد تأخير متزايد
          setTimeout(() => loadImage(), attemptCount.current * 1000);
        } else {
          setIsLoading(false);
          setHasError(true);
          console.error(`فشل في تحميل الصورة بعد ${MAX_RETRY} محاولات: ${src}`);
        }
      };
      
      // تحسين تحميل الصور للمتصفحات الحديثة
      img.loading = 'lazy';
      img.decoding = 'async';
      
      // تحسين أولوية التحميل
      if ('fetchpriority' in img) {
        (img as any).fetchPriority = priority ? 'high' : 'low';
      }
      
      // تطبيق جودة الصورة المطلوبة إذا كان المصدر URL قابل للتعديل
      let optimizedSrc = src;
      
      // إضافة معلمات إلى عناوين URL الصور المدعومة
      if (src.includes('unsplash.com') || src.includes('images.pexels.com')) {
        const qualitySuffix = quality === 'low' ? '&q=60&w=300' : 
                             quality === 'medium' ? '&q=75&w=500' : 
                             '&q=90&w=800';
                             
        // تحسين عناوين URL للخدمات المعروفة
        if (!src.includes('&w=')) {
          optimizedSrc = src + qualitySuffix;
        }
      }
      
      img.src = optimizedSrc;
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
            observer.current.unobserve(currentImageRef);
            observer.current.disconnect();
          }
        }
      }, { 
        rootMargin: '300px', // زيادة هامش التحميل المسبق
        threshold: 0.01 // بدء التحميل بمجرد ظهور جزء من الصورة
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
  }, [src, placeholder, priority, quality]);

  return { imageSrc, isLoading, hasError, imageRef };
}

// مكون الصورة الكسول محسن الأداء
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  priority?: boolean;
  quality?: 'low' | 'medium' | 'high';
  onError?: () => void;
  blurhash?: string;
  width?: number;
  height?: number;
}> = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '', 
  priority = false,
  quality = 'medium',
  onError,
  blurhash,
  width,
  height
}) => {
  const { imageSrc, isLoading, hasError, imageRef } = useLazyImage({ 
    src, 
    placeholder, 
    priority,
    quality,
    blurhash
  });
  
  // تحديد الأبعاد للحفاظ على نسبة العرض إلى الارتفاع وتقليل CLS
  const aspectRatio = width && height ? { aspectRatio: `${width}/${height}` } : {};
  
  return (
    <div 
      ref={imageRef} 
      className={`relative ${className}`}
      style={{
        ...aspectRatio,
        overflow: 'hidden'
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded"></div>
      )}
      <img 
        src={hasError ? (placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSI+صورة غير متوفرة</text></c3ZnPg==') : imageSrc} 
        alt={alt} 
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        loading="lazy"
        width={width}
        height={height}
        decoding="async"
        onError={() => {
          if (onError) onError();
        }}
        // تحسينات إضافية لأداء الصورة
        fetchPriority={priority ? 'high' : 'auto'}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

// مكون BlurHash للصور (يمكن تنفيذه إذا كان مطلوبًا)
export const BlurHashImage: React.FC<{
  src: string;
  hash: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}> = ({ src, hash, alt, className, width, height }) => {
  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      placeholder={hash}
      width={width}
      height={height}
    />
  );
};
