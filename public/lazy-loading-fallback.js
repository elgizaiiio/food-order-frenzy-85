
// نسخة محسنة من تحميل الصور المتأخر للمتصفحات القديمة
document.addEventListener('DOMContentLoaded', function() {
  // استخدام Intersection Observer API للتحميل المتأخر للصور
  
  // تعيين حد المراقبة للصور
  const thresholds = [0, 0.25, 0.5, 0.75, 1];
  
  // تحديد الصور التي تحتاج إلى تحميل متأخر
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const lazyBackgrounds = document.querySelectorAll('[data-background]');
  
  // تكوين مراقب الظهور
  if ('IntersectionObserver' in window) {
    // إعداد مراقب للصور
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          
          // تحميل الصورة عندما تصبح مرئية
          if (lazyImage.dataset.src) {
            const img = new Image();
            img.onload = function() {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');
              lazyImage.classList.add('loaded');
            };
            img.src = lazyImage.dataset.src;
          }
          
          // تحميل مجموعة الصور الاحتياطية للأجهزة المختلفة
          if (lazyImage.dataset.srcset) {
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.removeAttribute('data-srcset');
          }
          
          // إزالة المراقبة بعد التحميل
          imageObserver.unobserve(lazyImage);
        }
      });
    }, { 
      rootMargin: "250px", // زيادة هامش التحميل المسبق
      threshold: thresholds 
    });
    
    // مراقبة جميع الصور
    lazyImages.forEach(function(lazyImage) {
      imageObserver.observe(lazyImage);
    });
    
    // مراقب للخلفيات
    const bgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyBg = entry.target;
          if (lazyBg.dataset.background) {
            lazyBg.style.backgroundImage = `url(${lazyBg.dataset.background})`;
            lazyBg.removeAttribute('data-background');
            bgObserver.unobserve(lazyBg);
          }
        }
      });
    }, { 
      rootMargin: "250px",
      threshold: thresholds 
    });
    
    // مراقبة عناصر الخلفية
    lazyBackgrounds.forEach(function(lazyBg) {
      bgObserver.observe(lazyBg);
    });
  } else {
    // الوضع التقليدي للمتصفحات القديمة
    // استخدام طريقة بديلة لتحميل الصور المتأخر باستخدام حدث التمرير
    
    let active = false;
    
    const lazyLoad = function() {
      if (active === false) {
        active = true;
        
        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight + 250 && 
                lazyImage.getBoundingClientRect().bottom >= -250) && 
                getComputedStyle(lazyImage).display !== "none" && 
                lazyImage.dataset.src) {
              
              const img = new Image();
              img.onload = function() {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.removeAttribute('data-src');
              };
              img.src = lazyImage.dataset.src;
              
              if (lazyImage.dataset.srcset) {
                lazyImage.srcset = lazyImage.dataset.srcset;
                lazyImage.removeAttribute('data-srcset');
              }
              
              // إزالة الصورة من قائمة التعقب
              lazyImage.classList.remove('lazy');
            }
          });
          
          // التعامل مع صور الخلفية
          lazyBackgrounds.forEach(function(lazyBg) {
            if ((lazyBg.getBoundingClientRect().top <= window.innerHeight + 250 && 
                lazyBg.getBoundingClientRect().bottom >= -250) && 
                getComputedStyle(lazyBg).display !== "none" && 
                lazyBg.dataset.background) {
              
              lazyBg.style.backgroundImage = `url(${lazyBg.dataset.background})`;
              lazyBg.removeAttribute('data-background');
            }
          });
          
          // إزالة أحداث الاستماع إذا تم تحميل جميع الصور
          if (lazyImages.length === 0 && lazyBackgrounds.length === 0) { 
            document.removeEventListener("scroll", lazyLoad);
            window.removeEventListener("resize", lazyLoad);
            window.removeEventListener("orientationChange", lazyLoad);
          }
          
          active = false;
        }, 200);
      }
    };
    
    // إضافة أحداث الاستماع
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationChange", lazyLoad);
    window.addEventListener("load", lazyLoad);
  }
});

// تحسين تحميل صور الرسومات المتجهة (SVG)
document.addEventListener('DOMContentLoaded', function() {
  const svgElements = document.querySelectorAll('svg[data-src]');
  
  if ('IntersectionObserver' in window) {
    const svgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const svgElement = entry.target;
          
          fetch(svgElement.dataset.src)
            .then(response => response.text())
            .then(svgText => {
              const parser = new DOMParser();
              const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
              const newSvg = svgDoc.documentElement;
              
              // نقل السمات
              Array.from(svgElement.attributes).forEach(attr => {
                if (attr.name !== 'data-src') {
                  newSvg.setAttribute(attr.name, attr.value);
                }
              });
              
              svgElement.parentNode.replaceChild(newSvg, svgElement);
            });
          
          svgObserver.unobserve(svgElement);
        }
      });
    }, { rootMargin: "200px" });
    
    svgElements.forEach(function(svgElement) {
      svgObserver.observe(svgElement);
    });
  }
});

// تحسين تحميل الخطوط
document.fonts.ready.then(() => {
  document.documentElement.classList.add('fonts-loaded');
});

// تحسين الصور عالية الدقة للشاشات المختلفة
window.addEventListener('load', function() {
  // استخدام تقنية الفاصل الزمني لتحسين الأداء
  setTimeout(() => {
    const hiDpiImages = document.querySelectorAll('img[data-srcset]');
    
    // تحديث مجموعة الصور بناءً على دقة الشاشة
    if (window.devicePixelRatio > 1) {
      hiDpiImages.forEach(img => {
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
      });
    }
  }, 1000);
});

// تسريع تحميل iframe
window.addEventListener('load', function() {
  setTimeout(() => {
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    lazyIframes.forEach(iframe => {
      if (iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute('data-src');
      }
    });
  }, 1500);
});
