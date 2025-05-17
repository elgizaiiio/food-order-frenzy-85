
// Service Worker مُحسّن لتسريع الأداء
const CACHE_NAME = 'dam-delivery-cache-v2';

// الملفات التي سيتم تخزينها مؤقتًا للوصول السريع
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/dam-logo.png',
  '/src/index.css',
  '/src/main.tsx'
];

// القائمة السوداء للروابط التي لا يجب تخزينها
const blacklist = [
  /\/api\//,
  /supabase/,
  /firebase/
];

// تثبيت Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  // تسريع تثبيت Service Worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح ذاكرة التخزين المؤقت');
        return cache.addAll(urlsToCache);
      })
  );
});

// تحسين استراتيجية التخزين المؤقت: الذاكرة المؤقتة أولاً ثم الشبكة للتحميل السريع
self.addEventListener('fetch', event => {
  // تجاوز طلبات API وأي طلبات في القائمة السوداء
  if (blacklist.some(pattern => pattern.test(event.request.url))) {
    return;
  }
  
  // تجاهل طلبات غير GET
  if (event.request.method !== 'GET') {
    return;
  }

  // استراتيجية الذاكرة المؤقتة أولاً ثم الشبكة للتسريع
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إرجاع النسخة المخزنة مؤقتًا إذا كانت موجودة
        if (response) {
          // تحديث الذاكرة المؤقتة في الخلفية
          fetch(event.request)
            .then(newResponse => {
              if (newResponse && newResponse.ok) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, newResponse));
              }
            })
            .catch(() => {});
            
          return response;
        }

        // طلب من الشبكة إذا لم يكن مخزنًا مؤقتًا
        return fetch(event.request)
          .then(newResponse => {
            // لا نخزن الاستجابات الخاطئة
            if (!newResponse || !newResponse.ok) {
              return newResponse;
            }

            // تخزين نسخة من الاستجابة في الذاكرة المؤقتة
            const responseToCache = newResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return newResponse;
          });
      })
  );
});

// تنظيف ذاكرة التخزين المؤقت القديمة وتسريع الأداء
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // تأكيد التنشيط المباشر للخدمة دون انتظار تحديث الصفحة
      return self.clients.claim();
    })
  );
});

// تحسين شبكة الاتصال الضعيفة
self.addEventListener('fetch', event => {
  // استراتيجية البديل للصور
  if (event.request.destination === 'image') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // استخدام صورة احتياطية للصور التي فشل تحميلها
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#999">صورة غير متوفرة</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        })
    );
  }
});

// تسريع التحميل المسبق للصفحات
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PREFETCH') {
    const urls = event.data.urls;
    if (urls && Array.isArray(urls)) {
      caches.open(CACHE_NAME).then(cache => {
        urls.forEach(url => {
          fetch(url).then(response => {
            if (response.ok) {
              cache.put(url, response);
            }
          }).catch(() => {});
        });
      });
    }
  }
});
