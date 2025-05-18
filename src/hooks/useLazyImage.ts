
import { useState, useEffect } from 'react';

interface UseLazyImageProps {
  src: string | null | undefined;
  placeholder?: string;
  priority?: boolean;
  quality?: 'auto' | 'low' | 'medium' | 'high';
}

/**
 * هذا الـ Hook محسن لتحميل الصور عن طريق تأخير تحميل الصور غير المرئية.
 */
export function useLazyImage({ 
  src, 
  placeholder = '', 
  priority = false,
  quality = 'auto'
}: UseLazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(priority ? src || null : placeholder);
  const [isLoading, setIsLoading] = useState(!priority && !!src);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) {
      setImageSrc(placeholder);
      setIsLoading(false);
      return;
    }

    // تحميل الصور ذات الأولوية مباشرة
    if (priority) {
      setImageSrc(src);
      return;
    }

    setIsLoading(true);

    // تحسين جودة الصور للأداء الأفضل
    let optimizedSrc = src;
    if (quality !== 'auto' && (src.includes('unsplash.com') || src.includes('cloudinary.com') || src.includes('imgix.net'))) {
      const qualityParam = quality === 'low' ? 'q=60&w=300' : 
                         quality === 'medium' ? 'q=75&w=500' : 
                         'q=90&w=800';
      const separator = src.includes('?') ? '&' : '?';
      optimizedSrc = `${src}${separator}${qualityParam}`;
    }

    const image = new Image();
    
    // تسريع تحميل الصورة باستخدام fetchpriority
    if ('fetchpriority' in image) {
      (image as any).fetchPriority = 'low';
    }
    
    // تمكين تحميل الصور بشكل غير متزامن
    image.decoding = 'async';
    image.loading = 'lazy';
    image.src = optimizedSrc;
    
    image.onload = () => {
      setImageSrc(optimizedSrc);
      setIsLoading(false);
    };
    
    image.onerror = () => {
      console.error(`خطأ في تحميل الصورة: ${optimizedSrc}`);
      setImageSrc(placeholder);
      setIsLoading(false);
      setError(new Error(`فشل تحميل الصورة: ${optimizedSrc}`));
    };
    
    return () => {
      // تنظيف حدث التحميل
      image.onload = null;
      image.onerror = null;
    };
  }, [src, placeholder, priority, quality]);

  return { imageSrc, isLoading, error };
}

// دالة مساعدة لتحسين الأداء من خلال اقتصاص المسار
export function getOptimalImageUrl(url: string, width?: number, height?: number, quality: number = 80): string {
  if (!url) return url;
  
  // تحسين روابط خدمات الصور الشائعة
  if (url.includes('unsplash.com')) {
    const sizePart = width && height ? `&w=${width}&h=${height}` : width ? `&w=${width}` : '';
    return `${url}${url.includes('?') ? '&' : '?'}q=${quality}${sizePart}&auto=format,compress`;
  }
  
  if (url.includes('cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      const transform = `q_${quality}${width ? `,w_${width}` : ''}${height ? `,h_${height}` : ''},c_limit`;
      return `${parts[0]}/upload/${transform}/${parts[1]}`;
    }
  }
  
  return url;
}
