
import { useState, useEffect, useMemo } from 'react';

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
 * هوك مُحسّن لمراقبة حجم الشاشة واتجاهها مع دعم خصائص الهواتف المحمولة
 */
export function useViewport(): ViewportSize {
  // تحسين الأداء من خلال استخدام قيم افتراضية أكثر دقة
  const getInitialDimensions = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [dimensions, setDimensions] = useState(getInitialDimensions);

  // استخدام useMemo لتقليل عمليات إعادة الحساب
  const viewport = useMemo(() => {
    const { width, height } = dimensions;
    const isMobile = width < MOBILE_BREAKPOINT;
    const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;
    const isDesktop = width >= TABLET_BREAKPOINT;
    const orientation: 'landscape' | 'portrait' = width > height ? 'landscape' : 'portrait';
    
    // تحسين عملية اكتشاف notch
    const hasNotch = detectNotch();

    return {
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
      orientation,
      hasNotch
    };
  }, [dimensions]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // تحسين استدعاء كشف تغير الأبعاد
    const setCorrectViewport = () => {
      let viewportMetaTag = document.querySelector('meta[name="viewport"]');
      if (!viewportMetaTag) {
        viewportMetaTag = document.createElement('meta');
        viewportMetaTag.setAttribute('name', 'viewport');
        document.head.appendChild(viewportMetaTag);
      }
      viewportMetaTag.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    };

    // تطبيق إعدادات viewport
    setCorrectViewport();

    // استخدام debounce لتحسين أداء أحداث تغيير الحجم
    let timeoutId: number | null = null;
    const updateViewport = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 100);
    };

    // تحديث عند تحميل الصفحة
    updateViewport();

    // تحسين أداء أحداث تغيير الحجم عبر استخدام ResizeObserver إذا كان مدعوما
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(updateViewport);
      resizeObserver.observe(document.documentElement);
      
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    } else {
      // التراجع للطريقة التقليدية - تأكد من أن window موجود بشكل صريح للمترجم
      const win = window as Window;
      win.addEventListener('resize', updateViewport, { passive: true });
      win.addEventListener('orientationchange', () => {
        setTimeout(updateViewport, 100);
      });
      
      return () => {
        if (timeoutId) win.clearTimeout(timeoutId);
        win.removeEventListener('resize', updateViewport);
        win.removeEventListener('orientationchange', () => {
          setTimeout(updateViewport, 100);
        });
      };
    }
  }, []);

  return viewport;
}

// تحسين وظيفة اكتشاف notch
function detectNotch() {
  if (typeof window === 'undefined') return false;
  
  const hasEnv = CSS.supports('padding-top: env(safe-area-inset-top)');
  const isIOSWithNotch = /iPhone/.test(navigator.userAgent) && window.screen.height >= 812;
  return hasEnv || isIOSWithNotch;
}

// إضافة طريقة مختصرة محسنة للوصول إلى isMobile فقط
export function useIsMobile(): boolean {
  const { isMobile } = useViewport();
  return isMobile;
}
