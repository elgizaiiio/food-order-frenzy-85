
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import App from './App.tsx'
import './index.css'

// تحسين إعداد React Query للأداء
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnMount: false,
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
      retry: 1,
    }
  },
});

// تسريع تحميل التطبيق باستخدام requestIdleCallback
document.addEventListener('DOMContentLoaded', () => {
  const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
  
  // تحسين إخفاء شاشة التحميل الأولية
  const splashLoader = document.querySelector('.loading-container');
  if (splashLoader && splashLoader.parentNode) {
    idleCallback(() => {
      splashLoader.classList.add('fade-out');
      setTimeout(() => {
        if (splashLoader.parentNode) {
          splashLoader.parentNode.removeChild(splashLoader);
        }
      }, 100);
    });
  }
});

// تحسين تهيئة الجذر
const container = document.getElementById("root")!;
const root = createRoot(container);

// تعزيز أداء التصيير الأولي - تم تحسين هيكل التعابير المتداخلة
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
            duration={2000}
            toastOptions={{
              style: { 
                maxWidth: '400px',
              }
            }} 
          />
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

// تبسيط تسجيل Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(error => {
        console.log('خطأ في تسجيل Service Worker:', error);
      });
  });
}
