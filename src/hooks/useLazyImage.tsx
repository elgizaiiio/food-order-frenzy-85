
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

    setIsLoading(true);
    setHasError(false);
    
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      console.error(`Failed to load image: ${src}`);
    };
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholder]);

  return { imageSrc, isLoading, hasError };
}
