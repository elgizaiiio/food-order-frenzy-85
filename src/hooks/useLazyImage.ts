
import { useState, useEffect } from 'react';

interface UseLazyImageProps {
  src: string | null | undefined;
  placeholder?: string;
  priority?: boolean;
}

export function useLazyImage({ 
  src, 
  placeholder = '', 
  priority = false 
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

    if (priority) {
      setImageSrc(src);
      return;
    }

    setIsLoading(true);

    const image = new Image();
    image.src = src;
    
    image.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    
    image.onerror = () => {
      console.error(`Error loading image: ${src}`);
      setImageSrc(placeholder);
      setIsLoading(false);
      setError(new Error(`Failed to load image: ${src}`));
    };
    
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src, placeholder, priority]);

  return { imageSrc, isLoading, error };
}
