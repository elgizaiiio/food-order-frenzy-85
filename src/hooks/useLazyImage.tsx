
import { useState, useEffect } from 'react';

interface UseLazyImageProps {
  src: string | null | undefined;
  placeholder?: string;
  priority?: boolean;
}

/**
 * هذه الملف هو hook للتحميل المتأخر للصور لتحسين أداء التطبيق
 */
export function useLazyImage({ src, placeholder = '', priority = false }: UseLazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    // إذا كانت الصورة ذات أولوية، تحميلها فوراً
    if (priority) {
      setImageSrc(src);
      setIsLoading(false);
      return;
    }

    // استخدام Intersection Observer للتحميل المتأخر
    let observer: IntersectionObserver | null = null;
    const loadImage = () => {
      // Reset states when src changes
      setIsLoading(true);
      setHasError(false);
      
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
      
      // إضافة تلميح أولوية التحميل
      img.loading = 'lazy';
      img.src = src;
    };

    // إذا كان دعم Intersection Observer متوفراً، استخدمه للتحميل المتأخر
    // سيقوم بتحميل الصورة فقط عندما تكون في منطقة العرض
    if ("IntersectionObserver" in window) {
      const dummyElement = document.createElement('div');
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage();
            if (observer) {
              observer.disconnect();
              observer = null;
            }
          }
        });
      }, { rootMargin: '200px' }); // تحميل الصورة قبل ظهورها بـ 200 بكسل
      
      observer.observe(dummyElement);
    } else {
      // إذا لم يكن مدعوماً، تحميل الصورة مباشرة
      loadImage();
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, placeholder, priority]);

  return { imageSrc, isLoading, hasError };
}
