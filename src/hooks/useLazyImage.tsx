
import { useState, useEffect } from 'react';

interface UseLazyImageProps {
  src: string | null | undefined;
  placeholder?: string;
}

/**
 * هذه الملف هو hook للتحميل المتأخر للصور لتحسين أداء التطبيق
 */
export function useLazyImage({ src, placeholder = '' }: UseLazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    setImageSrc(placeholder);
    
    // Cancel previous image loading if any
    let isMounted = true;
    
    const img = new Image();
    
    img.onload = () => {
      if (isMounted) {
        setImageSrc(src);
        setIsLoading(false);
      }
    };
    
    img.onerror = () => {
      if (isMounted) {
        setIsLoading(false);
        setHasError(true);
        console.error(`Failed to load image: ${src}`);
      }
    };
    
    // Add priority loading hint
    img.loading = 'eager';
    img.src = src;

    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholder]);

  return { imageSrc, isLoading, hasError };
}
