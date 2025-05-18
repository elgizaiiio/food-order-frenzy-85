
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import App from './App.tsx'
import './index.css'

// تحسين أداء تحميل الصفحة - إعداد عميل استعلام محسن لـ React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 دقائق
      gcTime: 1000 * 60 * 30, // 30 دقيقة
      refetchOnMount: false, // تحسين الأداء من خلال تجنب إعادة الاستعلام عند تركيب المكون
      refetchInterval: false,
      networkMode: 'offlineFirst', // تحسين أداء الشبكة
    },
    mutations: {
      networkMode: 'offlineFirst',
      retry: 1, // تقليل محاولات إعادة المحاولة
    }
  },
});

// تحسين أداء التحميل الأولي
document.addEventListener('DOMContentLoaded', () => {
  // استخدام requestIdleCallback لإعطاء الأولوية لعرض الصفحة
  const runWhenIdle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  
  // إخفاء شاشة التحميل الأولية وإظهار التطبيق
  const splashLoader = document.querySelector('.loading-container');
  if (splashLoader && splashLoader.parentNode) {
    runWhenIdle(() => {
      splashLoader.classList.add('fade-out');
      setTimeout(() => {
        if (splashLoader.parentNode) {
          splashLoader.parentNode.removeChild(splashLoader);
        }
      }, 200);
    });
  }
  
  // تحميل مسبق للموارد المهمة
  runWhenIdle(() => {
    // تحميل مسبق للصور المهمة
    const preloadImages = ['/dam-logo.png'];
    preloadImages.forEach(src => {
      const img = new Image();
      img.fetchPriority = 'low';
      img.loading = 'lazy';
      img.src = src;
    });
  });
});

// تسريع تحميل الصفحة من خلال إنشاء الجذر وتأجيل التحديثات غير الأساسية
const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <App />
          <Toaster 
            position="top-center" 
            richColors 
            closeButton 
            duration={3000}
            toastOptions={{
              style: { 
                maxWidth: '420px',
              }
            }} 
          />
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

// تحسين الأداء من خلال تسجيل Service Worker وتفعيل التخزين المؤقت
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('تم تسجيل Service Worker بنجاح:', registration.scope);
      })
      .catch(error => {
        console.log('خطأ في تسجيل Service Worker:', error);
      });
  });
}

// تحسين أداء تحميل الصور بشكل كسول
if ('loading' in HTMLImageElement.prototype) {
  // استخدام التحميل الكسول المدمج في المتصفح
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => {
    img.src = img.dataset.src || '';
  });
} else {
  // تحميل البديل للمتصفحات التي لا تدعم التحميل الكسول
  const script = document.createElement('script');
  script.src = '/lazy-loading-fallback.js';
  script.defer = true;
  document.body.appendChild(script);
}

// تسريع عملية التحميل من خلال استخدام تقنية تقسيم الرموز (Code Splitting)
// هذا سيعمل مع وجود React.lazy و Suspense في App.tsx
