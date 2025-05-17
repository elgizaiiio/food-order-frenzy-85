
// تنفيذ تحميل الصور المتأخر للمتصفحات القديمة
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  // تنفيذ المراقب الخاص
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute('data-src');
            imageObserver.unobserve(lazyImage);
          }
        }
      });
    }, { rootMargin: "200px" });
    
    // إضافة المراقب لجميع الصور الكسولة
    lazyImages.forEach(function(lazyImage) {
      imageObserver.observe(lazyImage);
    });
  } else {
    // الاحتياطات للمتصفحات القديمة
    let active = false;
    
    const lazyLoad = function() {
      if (active === false) {
        active = true;
        
        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && 
                getComputedStyle(lazyImage).display !== "none" && 
                lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');
              
              if (lazyImages.length === 0) { 
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationChange", lazyLoad);
              }
            }
          });
          
          active = false;
        }, 200);
      }
    };
    
    // إضافة مستمعي الأحداث
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationChange", lazyLoad);
    window.addEventListener("load", lazyLoad);
  }
});

// تحسين تحميل الصور في الخلفية
window.addEventListener('load', function() {
  setTimeout(() => {
    const images = document.querySelectorAll('img[data-srcset]');
    images.forEach(img => {
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        img.removeAttribute('data-srcset');
      }
    });
  }, 1000);
});

// تسريع إظهار المحتوى
document.fonts.ready.then(() => {
  document.body.classList.add('fonts-loaded');
});
