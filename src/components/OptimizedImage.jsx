import Image from 'next/image'
import { useState } from 'react'

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className = '',
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && !error && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          quality={85}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setError(true)
            setIsLoading(false)
          }}
          {...props}
        />
      ) : (
        <div 
          className="flex items-center justify-center bg-gray-100 text-gray-400"
          style={{ width, height }}
        >
          <span>Image not available</span>
        </div>
      )}
    </div>
  )
}

// Shimmer effect for loading
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)
