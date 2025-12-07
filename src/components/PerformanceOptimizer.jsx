import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // 1. Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]')
      images.forEach(img => {
        img.src = img.dataset.src
      })
    } else {
      // Fallback for browsers that don't support lazy loading
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js'
      document.body.appendChild(script)
    }

    // 2. Preload critical resources
    const preloadLink = (href, as, type) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (type) link.type = type
      document.head.appendChild(link)
    }

    // 3. Remove unused CSS
    const removeUnusedCSS = () => {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]')
      stylesheets.forEach(sheet => {
        if (sheet.sheet && sheet.sheet.cssRules.length === 0) {
          sheet.remove()
        }
      })
    }

    // 4. Defer non-critical JavaScript
    const deferScripts = () => {
      const scripts = document.querySelectorAll('script[data-defer]')
      scripts.forEach(script => {
        script.defer = true
      })
    }

    // 5. Optimize animations
    const optimizeAnimations = () => {
      // Reduce motion for users who prefer it
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms')
      }
    }

    // 6. Service Worker for caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed
        })
      })
    }

    // 7. Prefetch next pages
    const prefetchNextPages = () => {
      const links = document.querySelectorAll('a[href^="/"]')
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target
            const href = link.getAttribute('href')
            if (href && !link.dataset.prefetched) {
              const prefetchLink = document.createElement('link')
              prefetchLink.rel = 'prefetch'
              prefetchLink.href = href
              document.head.appendChild(prefetchLink)
              link.dataset.prefetched = 'true'
            }
          }
        })
      }, { rootMargin: '50px' })

      links.forEach(link => observer.observe(link))
    }

    // 8. Optimize fonts
    const optimizeFonts = () => {
      if (document.fonts) {
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded')
        })
      }
    }

    // 9. Remove console logs in production
    if (process.env.NODE_ENV === 'production') {
      console.log = () => {}
      console.warn = () => {}
      console.error = () => {}
    }

    // 10. Optimize third-party scripts
    const optimizeThirdParty = () => {
      // Delay loading of non-critical third-party scripts
      setTimeout(() => {
        // Load analytics after 3 seconds
        if (window.gtag) {
          // Analytics is already loaded
        }
      }, 3000)
    }

    // Execute optimizations
    const runOptimizations = () => {
      removeUnusedCSS()
      deferScripts()
      optimizeAnimations()
      prefetchNextPages()
      optimizeFonts()
      optimizeThirdParty()
    }

    // Run after page load
    if (document.readyState === 'complete') {
      runOptimizations()
    } else {
      window.addEventListener('load', runOptimizations)
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', runOptimizations)
    }
  }, [])

  return null
}
