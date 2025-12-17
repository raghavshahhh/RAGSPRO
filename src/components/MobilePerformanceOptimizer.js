import { useEffect } from 'react';

const MobilePerformanceOptimizer = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // 1. AGGRESSIVE IMAGE OPTIMIZATION FOR MOBILE
    if (isMobile) {
      // Lazy load all images aggressively
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Add loading lazy if not already set
        if (!img.loading) {
          img.loading = 'lazy';
        }
        
        // Add decoding async for faster rendering
        img.decoding = 'async';
        
        // Reduce quality for mobile
        if (img.src && !img.dataset.optimized) {
          const url = new URL(img.src, window.location.origin);
          
          // For Unsplash images, add mobile-specific params
          if (url.hostname.includes('unsplash.com')) {
            url.searchParams.set('w', '400'); // Max width 400px for mobile
            url.searchParams.set('q', '60'); // Lower quality for mobile
            url.searchParams.set('fm', 'webp'); // Force WebP format
            url.searchParams.set('auto', 'format,compress');
            img.src = url.toString();
            img.dataset.optimized = 'true';
          }
        }
      });
      
      // Intersection Observer for images - load only when near viewport
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px' // Start loading 50px before entering viewport
      });
      
      // Observe all images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
    
    // 2. Safari iOS specific optimizations
    let setVH = null;
    if (isSafari || isIOS) {
      // Fix viewport height issues
      setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVH();
      window.addEventListener('resize', setVH);
      window.addEventListener('orientationchange', setVH);
      
      // Optimize scrolling
      document.body.style.webkitOverflowScrolling = 'touch';
      
      // Prevent image flickering on iOS
      document.querySelectorAll('img').forEach(img => {
        img.style.webkitTransform = 'translateZ(0)';
        img.style.transform = 'translateZ(0)';
      });
    }
    
    // 3. Reduce animations on low-end devices
    if (navigator.hardwareConcurrency <= 2 || isMobile) {
      document.documentElement.style.setProperty('--animation-duration', '0.15s');
      document.documentElement.style.setProperty('--transition-duration', '0.1s');
      
      // Disable heavy animations
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 768px) {
          * {
            animation-duration: 0.15s !important;
            transition-duration: 0.1s !important;
          }
          .motion-reduce {
            animation: none !important;
            transition: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // 4. Optimize touch events
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    
    // 5. Preconnect to image CDNs for faster loading
    if (isMobile) {
      const preconnect = (href) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      };
      
      preconnect('https://images.unsplash.com');
      preconnect('https://cdn.jsdelivr.net');
    }
    
    // 6. Reduce JavaScript execution on mobile
    if (isMobile) {
      // Defer non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (!script.async && !script.defer && !script.dataset.critical) {
          script.defer = true;
        }
      });
    }
    
    // 7. Network-aware loading
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      
      // If slow connection, reduce image quality further
      if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g')) {
        document.querySelectorAll('img').forEach(img => {
          if (img.src && img.src.includes('unsplash.com')) {
            const url = new URL(img.src);
            url.searchParams.set('w', '300'); // Even smaller for slow connections
            url.searchParams.set('q', '50'); // Lower quality
            img.src = url.toString();
          }
        });
        
        // Add visual indicator for slow connection
        console.log('Slow connection detected - optimizing images');
      }
    }
    
    // 8. Cleanup
    return () => {
      if (setVH && (isSafari || isIOS)) {
        window.removeEventListener('resize', setVH);
        window.removeEventListener('orientationchange', setVH);
      }
    };
    
  }, []);

  return null;
};

export default MobilePerformanceOptimizer;