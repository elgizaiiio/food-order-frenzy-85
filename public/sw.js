
// Service Worker مُحسّن لتسريع الأداء
const CACHE_NAME = 'dam-delivery-cache-v3';

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
  /firebase/,
  /analytics/
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

// تحديث السلوك لفتح الصفحة مباشرة، ثم تحديث الذاكرة المؤقتة
self.addEventListener('fetch', event => {
  // تجاوز طلبات API وأي طلبات في القائمة السوداء
  if (blacklist.some(pattern => pattern.test(event.request.url))) {
    return;
  }
  
  // تجاهل طلبات غير GET
  if (event.request.method !== 'GET') {
    return;
  }

  // استراتيجية "Stale While Revalidate" للتسريع
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request)
        .then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // يتم تخزين استجابات الشبكة الناجحة فقط
              if (networkResponse && networkResponse.status === 200) {
                const clonedResponse = networkResponse.clone();
                cache.put(event.request, clonedResponse);
              }
              return networkResponse;
            })
            .catch(() => {
              // استخدام صورة أو ملف احتياطي في حالة فشل الطلب
              if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
                return caches.match('/placeholder.svg');
              }
            });
          
          // الاستجابة من الذاكرة المؤقتة إذا كانت موجودة، وإلا من الشبكة
          return cachedResponse || fetchPromise;
        });
    })
  );
});

// تنظيف ذاكرة التخزين المؤقت القديمة وتسريع الأداء
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // تأكيد التنشيط المباشر للخدمة دون انتظار تحديث الصفحة
        return self.clients.claim();
      })
  );
});

// تحسين استراتيجية التخزين المؤقت للموارد الثابتة
self.addEventListener('fetch', event => {
  // استراتيجية تخزين مؤقت مختلفة لملفات JS و CSS
  if (event.request.url.match(/\.(js|css)$/)) {
    event.respondWith(
      caches.open(`${CACHE_NAME}-assets`).then(cache => {
        return fetch(event.request)
          .then(response => {
            // تخزين ناجح فقط
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => {
            return cache.match(event.request);
          });
      })
    );
  }
});

// تحسين تحميل مسبق للصفحات
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PREFETCH') {
    const urls = event.data.urls;
    if (urls && Array.isArray(urls)) {
      caches.open(CACHE_NAME).then(cache => {
        urls.forEach(url => {
          fetch(url, { credentials: 'same-origin' })
            .then(response => {
              if (response.ok) {
                cache.put(url, response);
              }
            })
            .catch(() => {});
        });
      });
    }
  }
});

// إضافة دعم لوضع عدم الاتصال
self.addEventListener('fetch', event => {
  // التعامل مع الصفحات المخزنة مؤقتًا في وضع عدم الاتصال
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/index.html');
        })
    );
  }
});
