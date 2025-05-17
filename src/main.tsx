
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import App from './App.tsx'
import './index.css'

// إنشاء عميل استعلام لـ React Query مع تحسينات أداء
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      // تحسينات ذاكرة التخزين المؤقت لتقليل طلبات الشبكة
      staleTime: 1000 * 60 * 5, // 5 دقائق
      gcTime: 1000 * 60 * 30, // 30 دقيقة (بديل عن cacheTime)
      // تحسين استجابة واجهة المستخدم
      refetchOnMount: true,
      // منع الإعادة المفرطة للطلبات
      refetchInterval: false,
      // تجنب تأثير طلبات الواجهة المتعددة في وقت واحد
      networkMode: 'offlineFirst',
    },
    mutations: {
      // تسريع تحديثات واجهة المستخدم
      networkMode: 'offlineFirst',
    }
  },
});

// معالجة التحميل الأولي وإزالة شاشة التحميل المؤقتة في HTML
document.addEventListener('DOMContentLoaded', () => {
  // إخفاء شاشة التحميل الأولية وإظهار التطبيق
  const splashLoader = document.querySelector('.loading-container');
  if (splashLoader && splashLoader.parentNode) {
    setTimeout(() => {
      splashLoader.classList.add('fade-out');
      setTimeout(() => {
        if (splashLoader.parentNode) {
          splashLoader.parentNode.removeChild(splashLoader);
        }
      }, 300);
    }, 200);
  }
});

// استخدام createRoot بدلاً من ReactDOM.render للأداء الأفضل
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <App />
          <Toaster 
            position="top-center" 
            richColors 
            closeButton 
            // تحسين الأداء عن طريق جعل الرسائل تظهر فقط لمدة 3 ثوانٍ
            duration={3000}
            // تحسين أداء الرسوم المتحركة
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

// تحسين الأداء من خلال تسجيل Service Worker (اختياري)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.log('خطأ في تسجيل Service Worker:', error);
    });
  });
}
