/**
 * Image Optimization Utility
 * Provides consistent image loading attributes across the application
 */

/**
 * Get optimized image props for standard images
 * @param {Object} options - Image options
 * @param {string} options.src - Image source URL
 * @param {string} options.alt - Alt text
 * @param {number} options.width - Image width
 * @param {number} options.height - Image height
 * @param {boolean} options.priority - Whether to prioritize loading
 * @returns {Object} Optimized image props
 */
export function getOptimizedImageProps({ src, alt, width, height, priority = false }) {
  return {
    src,
    alt,
    width,
    height,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    // Add srcset for responsive images if it's a local image
    ...(src.startsWith('/') && {
      srcSet: `${src}?w=${width} 1x, ${src}?w=${width * 2} 2x`,
    }),
  }
}

/**
 * Get optimized props for Unsplash images
 * @param {string} url - Unsplash image URL
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @param {number} quality - Image quality (1-100)
 * @returns {string} Optimized Unsplash URL
 */
export function getOptimizedUnsplashUrl(url, width = 400, height = 400, quality = 75) {
  if (!url.includes('unsplash.com')) return url
  
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}w=${width}&h=${height}&fit=crop&crop=face&auto=format&q=${quality}`
}

/**
 * Get optimized props for avatar images
 * @param {string} src - Avatar source URL
 * @param {string} alt - Alt text
 * @param {number} size - Avatar size (default: 40)
 * @returns {Object} Optimized avatar props
 */
export function getAvatarProps(src, alt, size = 40) {
  const optimizedSrc = src.includes('unsplash.com')
    ? getOptimizedUnsplashUrl(src, size, size, 75)
    : src
    
  return {
    src: optimizedSrc,
    alt,
    width: size,
    height: size,
    loading: 'lazy',
    decoding: 'async',
    className: 'rounded-full object-cover',
  }
}

/**
 * Preload critical images
 * @param {string[]} urls - Array of image URLs to preload
 */
export function preloadImages(urls) {
  if (typeof window === 'undefined') return
  
  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
  })
}

/**
 * Check if image is in viewport
 * @param {HTMLElement} element - Image element
 * @param {number} threshold - Threshold in pixels (default: 50)
 * @returns {boolean} Whether image is in viewport
 */
export function isInViewport(element, threshold = 50) {
  if (!element) return false
  
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
  )
}
