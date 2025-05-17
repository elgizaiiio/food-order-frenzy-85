
import { useState, useEffect } from 'react';

type ViewportSize = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  hasNotch: boolean;
};

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

/**
 * هوك مخصص لمراقبة حجم الشاشة واتجاهها مع دعم خصائص الهواتف المحمولة
 */
export function useViewport(): ViewportSize {
  const [viewport, setViewport] = useState<ViewportSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    orientation: 'portrait',
    hasNotch: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // تحقق من وجود notch (مثل iPhone X وما بعده)
    const detectNotch = () => {
      // تحقق من دعم env() CSS
      const hasEnv = CSS.supports('padding-top: env(safe-area-inset-top)');
      // تحقق مما إذا كان الجهاز يبدو أنه iPhone X وما بعده
      const isIOSWithNotch = /iPhone/.test(navigator.userAgent) && 
                            window.screen.height >= 812;

      return hasEnv || isIOSWithNotch;
    };

    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < MOBILE_BREAKPOINT;
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
      const isDesktop = width >= TABLET_BREAKPOINT;
      const orientation = width > height ? 'landscape' : 'portrait';
      const hasNotch = detectNotch();

      setViewport({
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        hasNotch
      });
    };

    // تحديث عند تحميل الصفحة
    updateViewport();

    // تحديث عند تغيير حجم النافذة
    window.addEventListener('resize', updateViewport);
    
    // تحديث عند تغيير اتجاه الجهاز
    window.addEventListener('orientationchange', () => {
      // إضافة تأخير صغير للسماح للمتصفح بإكمال تغيير الاتجاه
      setTimeout(updateViewport, 100);
    });

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  return viewport;
}
