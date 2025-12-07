'use client'
import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTextHovering, setIsTextHovering] = useState(false)
  const [isProjectHovering, setIsProjectHovering] = useState(false)
  const [isTestimonialHovering, setIsTestimonialHovering] = useState(false)
  
  const dotRef = useRef(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window
      setIsMobile(mobile)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    if (isMobile) {
      return () => window.removeEventListener('resize', checkMobile)
    }

    const dot = dotRef.current
    if (!dot) return

    // Update target position on mouse move
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    // Smooth animation loop using RAF - slower follow for magnet effect
    const animate = () => {
      const dx = targetRef.current.x - positionRef.current.x
      const dy = targetRef.current.y - positionRef.current.y
      
      // Slower easing for magnet effect (0.15 instead of 0.2)
      positionRef.current.x += dx * 0.15
      positionRef.current.y += dy * 0.15

      // Update DOM directly for better performance
      if (dot) {
        const size = isHovering ? 24 : isTextHovering ? 12 : 16
        const offset = size / 2
        
        dot.style.transform = `translate3d(${positionRef.current.x - offset}px, ${positionRef.current.y - offset}px, 0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // Hover detection with throttling
    let hoverTimeout
    const handleMouseOver = (e) => {
      if (hoverTimeout) clearTimeout(hoverTimeout)
      
      hoverTimeout = setTimeout(() => {
        const target = e.target
        
        if (target.closest('.testimonial-area') || target.closest('[data-testimonial]')) {
          setIsTestimonialHovering(true)
          setIsProjectHovering(false)
          setIsHovering(false)
          setIsTextHovering(false)
        } else if (target.closest('.project-card') || target.dataset.project || target.closest('.group')) {
          setIsProjectHovering(true)
          setIsHovering(false)
          setIsTextHovering(false)
          setIsTestimonialHovering(false)
        } else if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea') || target.closest('select')) {
          setIsHovering(true)
          setIsTextHovering(false)
          setIsProjectHovering(false)
          setIsTestimonialHovering(false)
        } else if (target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'P' || target.tagName === 'SPAN') {
          setIsTextHovering(true)
          setIsHovering(false)
          setIsProjectHovering(false)
          setIsTestimonialHovering(false)
        } else {
          setIsHovering(false)
          setIsTextHovering(false)
          setIsProjectHovering(false)
          setIsTestimonialHovering(false)
        }
      }, 10)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('resize', checkMobile)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [isMobile, isHovering, isTextHovering, isProjectHovering, isTestimonialHovering])

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Show normal cursor + custom dot following it */}
      <style jsx global>{`
        /* Keep normal cursor visible */
        * {
          cursor: auto !important;
        }
        body {
          cursor: auto !important;
        }
        /* Specific cursor types */
        button, a, [role="button"] {
          cursor: pointer !important;
        }
        input, textarea, select {
          cursor: text !important;
        }
      `}</style>
      
      {/* Custom cursor dot - follows normal cursor with delay (magnet effect) */}
      <div
        ref={dotRef}
        className={`fixed pointer-events-none z-[9999] will-change-transform transition-all duration-200 ease-out ${
          isTestimonialHovering
            ? 'bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center whitespace-nowrap shadow-lg'
            : isProjectHovering 
            ? 'bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center whitespace-nowrap shadow-lg'
            : isHovering 
            ? 'w-6 h-6 bg-black rounded-full'
            : isTextHovering
            ? 'w-3 h-3 bg-black rounded-full'
            : 'w-4 h-4 bg-black rounded-full'
        }`}
        style={{
          left: 0,
          top: 0
        }}
      >
        {isTestimonialHovering && 'Testimonials'}
        {isProjectHovering && 'View Project'}
      </div>
    </>
  )
}
