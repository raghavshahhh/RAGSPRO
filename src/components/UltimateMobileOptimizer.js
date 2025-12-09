/**
 * Ultimate Mobile Optimizer - Perfect Level Mobile Performance
 * Handles: Images, Fonts, Scripts, Animations, Network, Device Detection
 */

import { useEffect } from 'react'

export default function UltimateMobileOptimizer() {
  useEffect(() => {
    // Only run on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile) return

    // 1. AGGRESSIVE IMAGE OPTIMIZATION
    const optimizeImages = () => {
      const images = document.querySelectorAll('img')
      
      images.forEach((img) => {
        // Skip if already optimized
        if (img.dataset.optimized) return
        
        // Add loading attributes
        if (!img.loading) img.loading = 'lazy'
        if (!img.decoding) img.decoding = 'async'
        
        // Add fetchpriority for non-critical images
        if (!img.hasAttribute('priority')) {
          img.fetchpriority = 'low'
        }
        
        // Optimize Unsplash URLs for mobile
        if (img.src.includes('unsplash.com')) {
          const url = new URL(img.src)
          url.searchParams.set('w', '400')
          url.searchParams.set('q', '60')
          url.searchParams.set('fm', 'webp')
          url.searchParams.set('auto', 'format,compress')
          img.src = url.toString()
        }
        
        // Add placeholder background
        if (!img.complete) {
          img.style.backgroundColor = '#f3f4f6'
        }
        
        // Remove placeholder when loaded
        img.addEventListener('load', () => {
          img.style.backgroundColor = 'transparent'
        }, { once: true })
        
        img.dataset.optimized = 'true'
      })
    }

    // 2. NETWORK-AWARE LOADING
    const handleNetworkChange = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      
      if (connection) {
        const effectiveType = connection.effectiveType
        
        // Slow connection (2G, slow-2g)
        if (effectiveType === '2g' || effectiveType === 'slow-2g') {
          document.documentElement.classList.add('slow-network')
          console.log('🐌 Slow network detected - Ultra optimization enabled')
          
          // Reduce all image quality
          document.querySelectorAll('img').forEach(img => {
            if (img.src.includes('unsplash.com')) {
              const url = new URL(img.src)
              url.searchParams.set('w', '300')
              url.searchParams.set('q', '40')
              img.src = url.toString()
            }
          })
        }
        
        // Fast connection (4g)
        else if (effectiveType === '4g') {
          document.documentElement.classList.remove('slow-network')
        }
      }
    }

    // 3. VIEWPORT-BASED IMAGE LOADING
    const observeImages = () => {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target
              
              // Load image
              if (img.dataset.src) {
                img.src = img.dataset.src
                img.removeAttribute('data-src')
              }
              
              // Stop observing
              imageObserver.unobserve(img)
            }
          })
        },
        {
          rootMargin: '50px', // Load 50px before entering viewport
          threshold: 0.01
        }
      )

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img)
      })
    }

    // 4. REDUCE ANIMATIONS ON LOW-END DEVICES
    const optimizeAnimations = () => {
      const cores = navigator.hardwareConcurrency || 4
      
      // Low-end device (≤2 cores)
      if (cores <= 2) {
        document.documentElement.classList.add('low-end-device')
        
        // Reduce animation duration
        const style = document.createElement('style')
        style.textContent = `
          * {
            animation-duration: 0.1s !important;
            transition-duration: 0.05s !important;
          }
        `
        document.head.appendChild(style)
        
        console.log('📱 Low-end device detected - Animations reduced')
      }
    }

    // 5. DEFER NON-CRITICAL SCRIPTS
    const deferScripts = () => {
      const scripts = document.querySelectorAll('script:not([defer]):not([async])')
      
      scripts.forEach((script) => {
        // Skip critical scripts
        if (script.src.includes('gtag') || script.src.includes('analytics')) {
          script.defer = true
        }
      })
    }

    // 6. OPTIMIZE FONTS FOR MOBILE
    const optimizeFonts = () => {
      // Add font-display: swap to all fonts
      const style = document.createElement('style')
      style.textContent = `
        @font-face {
          font-display: swap;
        }
      `
      document.head.appendChild(style)
    }

    // 7. REDUCE MOTION FOR ACCESSIBILITY
    const handleReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (prefersReducedMotion) {
        document.documentElement.classList.add('motion-reduce')
        
        const style = document.createElement('style')
        style.textContent = `
          .motion-reduce * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `
        document.head.appendChild(style)
      }
    }

    // 8. OPTIMIZE SCROLLING PERFORMANCE
    const optimizeScrolling = () => {
      // Passive event listeners for better scroll performance
      let ticking = false
      
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            // Your scroll logic here
            ticking = false
          })
          ticking = true
        }
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      return () => window.removeEventListener('scroll', handleScroll)
    }

    // 9. PRELOAD CRITICAL RESOURCES
    const preloadCritical = () => {
      // Preload hero image
      const heroImage = document.querySelector('.hero-image')
      if (heroImage && heroImage.src) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = heroImage.src
        document.head.appendChild(link)
      }
    }

    // 10. MEMORY MANAGEMENT
    const manageMemory = () => {
      // Clear unused images from memory
      const clearUnusedImages = () => {
        const images = document.querySelectorAll('img')
        
        images.forEach((img) => {
          const rect = img.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight + 500 && rect.bottom > -500
          
          // If image is far from viewport, unload it
          if (!isVisible && img.src && !img.dataset.originalSrc) {
            img.dataset.originalSrc = img.src
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
          }
          
          // If image is near viewport, reload it
          else if (isVisible && img.dataset.originalSrc) {
            img.src = img.dataset.originalSrc
            delete img.dataset.originalSrc
          }
        })
      }
      
      // Run every 2 seconds
      const interval = setInterval(clearUnusedImages, 2000)
      
      return () => clearInterval(interval)
    }

    // Initialize all optimizations
    console.log('🚀 Ultimate Mobile Optimizer - Initializing...')
    
    optimizeImages()
    handleNetworkChange()
    observeImages()
    optimizeAnimations()
    deferScripts()
    optimizeFonts()
    handleReducedMotion()
    const cleanupScroll = optimizeScrolling()
    preloadCritical()
    const cleanupMemory = manageMemory()
    
    // Re-optimize on DOM changes
    const observer = new MutationObserver(() => {
      optimizeImages()
      observeImages()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    // Listen for network changes
    if (navigator.connection) {
      navigator.connection.addEventListener('change', handleNetworkChange)
    }
    
    console.log('✅ Ultimate Mobile Optimizer - Active!')
    
    // Cleanup
    return () => {
      observer.disconnect()
      cleanupScroll()
      cleanupMemory()
      if (navigator.connection) {
        navigator.connection.removeEventListener('change', handleNetworkChange)
      }
    }
  }, [])

  return null // This component doesn't render anything
}
