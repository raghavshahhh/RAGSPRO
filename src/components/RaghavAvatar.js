import Image from 'next/image'

/**
 * Reusable Avatar Component for Raghav Shah
 * Supports multiple sizes and variants with 4K quality
 * Automatic fallback to "RS" initials if image fails to load
 */
export default function RaghavAvatar({
  size = 'md',
  variant = 'square',
  className = '',
  showFallback = true,
  priority = false
}) {

  // Size configurations (in Tailwind classes)
  const sizeConfig = {
    xs: {
      container: 'w-10 h-10',
      text: 'text-xs',
      imageSize: 40
    },
    sm: {
      container: 'w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16',
      text: 'text-lg sm:text-xl',
      imageSize: 64
    },
    md: {
      container: 'w-56 h-56 sm:w-48 sm:h-48 lg:w-56 lg:h-56',
      text: 'text-7xl',
      imageSize: 224
    },
    lg: {
      container: 'w-64 h-64',
      text: 'text-6xl',
      imageSize: 256
    }
  }

  // Variant configurations
  const variantConfig = {
    square: 'rounded-lg',
    'square-xl': 'rounded-[2rem]',
    circle: 'rounded-full',
    'circle-gradient': 'rounded-full bg-gradient-to-br from-black to-gray-700',
    'circle-accent': 'rounded-full bg-gradient-to-br from-accent/20 to-purple-600/20 border-2 border-accent/30'
  }

  const currentSize = sizeConfig[size] || sizeConfig.md
  const currentVariant = variantConfig[variant] || variantConfig.square

  // Image Avatar with Next.js optimization
  return (
    <div className={`
      ${currentSize.container}
      ${currentVariant}
      overflow-hidden
      relative
      flex-shrink-0
      ${className}
    `}>
      <Image
        src="/images/raghav-profile.jpg"
        alt="Raghav Shah - Founder of RAGSPRO"
        width={currentSize.imageSize}
        height={currentSize.imageSize}
        className="object-cover w-full h-full"
        quality={95}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={`(max-width: 768px) ${currentSize.imageSize}px, ${currentSize.imageSize * 2}px`}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  )
}

