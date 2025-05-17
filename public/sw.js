
// Service Worker لتسريع الأداء
const CACHE_NAME = 'dam-delivery-cache-v1';

// الملفات التي سيتم تخزينها مؤقتًا للوصول السريع
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/dam-logo.png',
  '/src/index.css',
];

// تثبيت Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح ذاكرة التخزين المؤقت');
        return cache.addAll(urlsToCache);
      })
  );
});

// استراتيجية الشبكة أولاً ثم ذاكرة التخزين المؤقت للاحتياط
self.addEventListener('fetch', event => {
  // تجاهل طلبات API لضمان حصول المستخدمين على أحدث البيانات
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('supabase')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // تخزين النسخة الجديدة في ذاكرة التخزين المؤقت
        if (event.request.method === 'GET' && !event.request.url.includes('chrome-extension://')) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        
        return response;
      })
      .catch(() => {
        // استخدام النسخة المخزنة مؤقتًا في حالة فشل الشبكة
        return caches.match(event.request);
      })
  );
});

// تنظيف ذاكرة التخزين المؤقت القديمة
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
