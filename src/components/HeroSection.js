'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import MetricBadge from './MetricBadge'

const projects = [
  { 
    id: 1, 
    name: 'Lead Generator', 
    image: '/images/projects/lead-generator.jpg', 
    url: 'https://lead-0ku8.onrender.com',
    metrics: {
      conversionRate: '6.2%',
      userGrowth: '400+ leads',
      timeSaved: '150+ hrs'
    }
  },
  { 
    id: 2, 
    name: 'LAWAI', 
    image: '/images/projects/lawai.jpg', 
    url: 'https://lawai.ragspro.com',
    metrics: {
      userGrowth: '300+ users',
      revenue: '$8k/month',
      conversionRate: '4.5%'
    }
  },
  { 
    id: 3, 
    name: 'Subtitle Generator', 
    image: '/images/projects/subtitle.jpg', 
    url: 'https://subtitle-rho.vercel.app',
    metrics: {
      userGrowth: '250+ users',
      timeSaved: '200+ hrs',
      conversionRate: '3.9%'
    }
  },
  { 
    id: 4, 
    name: 'Maid Agency Premium', 
    image: '/images/projects/maid-premium.jpg', 
    url: 'https://www.babysitterdelhi.in',
    metrics: {
      conversionRate: '7.1%',
      revenue: '₹30-40k',
      userGrowth: '180+ bookings'
    }
  }
]

export default function HeroSection() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [targets, setTargets] = useState([])
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleProjectClick = (url) => {
    window.open(url, '_blank')
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  // Lower the hero stack beneath projects after landing
  const heroZ = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [20, 20, 1, -1])

  useEffect(() => {
    const readTargets = () => {
      const published = window.__projectTargets
      if (!published || !published.targets) return
      setTargets(published.targets)

      // Track scroll direction
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      setLastScrollY(currentScrollY)
    }

    readTargets()
    window.addEventListener('resize', readTargets)
    window.addEventListener('scroll', readTargets)

    return () => {
      window.removeEventListener('resize', readTargets)
      window.removeEventListener('scroll', readTargets)
    }
  }, [lastScrollY])

  return (
    <section
      ref={containerRef}
      className="min-h-screen sm:h-[120vh] md:h-[140vh] lg:h-[200vh] bg-white relative z-0 main-section"
    >
      <div ref={canvasRef} className="relative sm:sticky top-0 min-h-screen flex items-start overflow-visible pt-[20px] sm:pt-[30px] md:pt-[0px] lg:pt-[0px] pb-4 sm:pb-4 md:pb-6 lg:pb-20" style={{ zIndex: isMobileDevice ? 1 : heroZ }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4 md:gap-6 lg:gap-8 items-start">
          <div className="max-w-full md:max-w-3xl pt-0 sm:pt-4 md:pt-6 lg:pt-8 relative" style={{ zIndex: 2000 }}>
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-3 py-1 sm:py-1.5 md:py-1.5 bg-white border border-gray-200 rounded-full text-[10px] sm:text-[11px] md:text-xs mb-2 sm:mb-3 md:mb-4"
            >
              <span className="w-1.5 sm:w-1.5 h-1.5 sm:h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700 font-medium">50+ STARTUPS LAUNCHED</span>
            </motion.div>

            {/* Main Headline - Fluid Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-[clamp(28px,8vw,68px)] sm:text-[clamp(24px,5vw,32px)] md:text-[clamp(32px,4vw,48px)] lg:text-[clamp(48px,4vw,68px)] font-normal leading-[1.1] tracking-tight mb-3 sm:mb-4 md:mb-6"
            >
              <span className="text-gray-400">Launch Your</span>
              <br />
              <span className="text-black">Startup in 20 Days</span>
            </motion.h1>

            {/* Subheading */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="text-[12px] sm:text-[13px] md:text-sm lg:text-base text-gray-700 mb-3 sm:mb-4 md:mb-6 font-normal leading-relaxed"
            >
              Revenue-focused web apps, funnels & AI automations for founders who need users, not pretty dashboards.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              className="text-[11px] sm:text-[12px] md:text-sm lg:text-base text-gray-700 mb-4 sm:mb-5 md:mb-8 leading-relaxed"
            >
              <span className="text-black font-semibold">Yes, it's true.</span> RAGSPRO helps startup founders build complete revenue-ready products with AI integration & business automation — all within 20 days. End-to-end development by Raghav Shah, your trusted startup growth partner.
            </motion.p>

            {/* CTA Button with Avatars */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
              onClick={() => {
                window.location.href = '/get-quote'
              }}
              className="group inline-flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 px-4 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-2.5 md:py-3 lg:py-3 bg-black text-white rounded-full font-medium hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-lg mb-2 sm:mb-6 md:mb-8 lg:mb-12 text-xs sm:text-xs md:text-sm lg:text-sm mt-2 sm:mt-4"
            >
              <div className="flex -space-x-1 sm:-space-x-1 md:-space-x-2 relative">
                {/* User 1 Circle - Indian Male */}
                <div className="w-6 sm:w-5 md:w-6 lg:w-8 h-6 sm:h-5 md:h-6 lg:h-8 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=entropy&auto=format&q=75&zoom=0.7"
                    alt="Indian Startup Founder"
                    className="w-full h-full object-cover"
                    loading="eager"
                    width="32"
                    height="32"
                    style={{display: 'block', objectFit: 'cover'}}
                  />
                </div>

                {/* User 2 Circle - Indian Female */}
                <div className="w-6 sm:w-5 md:w-6 lg:w-8 h-6 sm:h-5 md:h-6 lg:h-8 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=entropy&auto=format&q=75&zoom=0.7"
                    alt="Indian Entrepreneur"
                    className="w-full h-full object-cover"
                    loading="eager"
                    width="32"
                    height="32"
                    style={{display: 'block', objectFit: 'cover'}}
                  />
                </div>

                {/* '+ you' Circle - Appears on hover */}
                <div className="w-6 sm:w-5 md:w-6 lg:w-8 h-6 sm:h-5 md:h-6 lg:h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center group-hover:scale-100 group-hover:opacity-100 opacity-0 scale-0 transition-all duration-300 flex-shrink-0">
                  <span className="text-black text-[6px] sm:text-[5px] md:text-[6px] lg:text-[8px] font-bold">+ you</span>
                </div>
              </div>

              <span className="text-white">Get Your Project Roadmap</span>
            </motion.button>

            {/* Social Proof - Desktop Only */}
            <div className="hidden sm:flex items-center justify-start gap-3 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8 lg:mb-12 mt-0 sm:mt-0 md:-mt-4 lg:-mt-6 w-full">
              <div className="flex -space-x-1.5">
                <div className="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop&crop=entropy&auto=format&q=75"
                    alt="Indian Client 1"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    width="20"
                    height="20"
                    style={{display: 'block', objectPosition: 'center 30%'}}
                  />
                </div>
                <div className="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&crop=entropy&auto=format&q=75"
                    alt="Indian Client 2"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    width="20"
                    height="20"
                    style={{display: 'block', objectPosition: 'center 30%'}}
                  />
                </div>
                <div className="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=entropy&auto=format&q=75"
                    alt="Indian Client 3"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    width="20"
                    height="20"
                    style={{display: 'block', objectPosition: 'center 30%'}}
                  />
                </div>
                <div className="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&h=120&fit=crop&crop=entropy&auto=format&q=75"
                    alt="Indian Client 4"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    width="20"
                    height="20"
                    style={{display: 'block', objectPosition: 'center 30%'}}
                  />
                </div>
                <div className="w-5 md:w-6 lg:w-7 h-5 md:h-6 lg:h-7 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=entropy&auto=format&q=75"
                    alt="Indian Client 5"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    width="20"
                    height="20"
                    style={{display: 'block', objectPosition: 'center 30%'}}
                  />
                </div>
              </div>
              <div className="text-left ml-1.5">
                <div
                  className="flex gap-0 sm:gap-0.5 justify-start mb-0 sm:mb-0.5 cursor-pointer testimonial-area"
                  onClick={() => {
                    const testimonialsSection = document.querySelector('#testimonials') || document.querySelector('[class*="testimonial"]')
                    if (testimonialsSection) {
                      testimonialsSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-yellow-500 hover:scale-110 transition-transform text-xs md:text-sm lg:text-base">★</span>
                  ))}
                </div>
                <p className="text-[10px] md:text-xs lg:text-sm text-gray-700 font-medium mt-0 sm:mt-0.5">50+ Startup Founders</p>
              </div>
            </div>


          </div>

          {/* Right Column - Floating Project Cards - Desktop Only */}
          <div className="relative w-full h-[200px] sm:h-[180px] md:h-[240px] lg:h-[350px] xl:h-[600px] pt-1 sm:pt-2 md:pt-4 hidden lg:block" style={{ perspective: '1500px', zIndex: 1000 }}>
            {/* White background placeholder - matches website theme */}
            <div className="absolute inset-0 bg-white rounded-2xl" style={{ zIndex: 1 }}></div>
            {projects.map((project, index) => {
              // Use state-based mobile detection
              const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024

              const start = {
                x: isMobileDevice ? -10 + (index % 2) * 80 : isTablet ? 20 + (index % 2) * 20 : 40 + (index % 2) * 40,
                y: isMobileDevice ? 20 + Math.floor(index / 2) * 35 : isTablet ? 30 + index * 15 : 80 + index * 40,
                s: 0.85
              }
              const t = targets[index]
              // More aggressive scroll range for mobile
              const scrollRange = isMobileDevice ? [0, 0.3, 0.8] : [0, 0.6, 1]
              const p = useTransform(scrollYProgress, scrollRange, [0, 1, 1])

              // Fixed positioning for mobile to land properly
              let targetX, alignedY

              if (isMobileDevice) {
                // Use same target system as laptop but with tighter mobile spacing
                const isLeftCard = index % 2 === 0
                const offsetX = isLeftCard ? -110 : -70  // Move cards even more to the left
                targetX = t ? t.cx - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0) + offsetX : start.x

                const isTopRow = index < 2
                const offsetY = -160  // Closer to text
                const baseY = t ? t.cy + offsetY : start.y
                const gap = -180  // Proper spacing between top and bottom cards
                alignedY = isTopRow ? baseY : baseY + gap
              } else {
                // Original logic for tablet/desktop
                const offsetX = isTablet ? -80 : -250
                targetX = t ? t.cx - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0) + offsetX : start.x

                const isTopRow = index < 2
                const offsetY = isTablet ? -100 : -260
                const baseY = t ? t.cy + offsetY : start.y
                const gap = isTablet ? -10 : -30
                alignedY = isTopRow ? baseY : baseY + gap
              }

              const x = useTransform(p, [0, 0.8, 1], [start.x, targetX, targetX])
              const y = useTransform(p, [0, 0.8, 1], [start.y, alignedY, alignedY])
              const scaleCard = useTransform(p, [0, 1], [start.s, 1])
              const rotateY = useTransform(p, [0, 1], [8, 0])
              const rotateX = useTransform(p, [0, 1], [0, 0])
              // Keep cards always visible
              const cardOpacity = 1

              return (
                <motion.div
                  key={project.id}
                  style={{
                    y,
                    x,
                    rotateY,
                    rotateX,
                    scale: scaleCard,
                    opacity: cardOpacity,
                    zIndex: 1500 + index,
                    transformStyle: 'preserve-3d'
                  }}
                  className="absolute top-0 left-0 w-[160px] sm:w-[150px] md:w-[200px] lg:w-[280px] xl:w-[450px] h-[96px] sm:h-[90px] md:h-[120px] lg:h-[170px] xl:h-[280px] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl cursor-pointer project-card"
                  onClick={() => handleProjectClick(project.url)}
                  data-project="true"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} - SaaS built by RAGSPRO`}
                      fill
                      className="object-cover"
                      priority={index < 2}
                      quality={75}
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, (max-width: 1024px) 280px, 450px"
                    />
                  </motion.div>
                  <div className="absolute bottom-0.5 sm:bottom-1 md:bottom-2 lg:bottom-3 left-0.5 sm:left-1 md:left-2 lg:left-3 right-0.5 sm:right-1 md:right-2 lg:right-3">
                    <div className="bg-black/80 backdrop-blur-sm px-0.5 sm:px-1 md:px-2 lg:px-3 py-0.5 sm:py-0.5 md:py-1 lg:py-1.5 rounded-sm sm:rounded-md md:rounded-lg">
                      <p className="text-white text-[6px] sm:text-[8px] md:text-xs lg:text-sm font-semibold mb-1">{project.name}</p>
                      {project.metrics && (
                        <div className="flex flex-wrap gap-1">
                          {project.metrics.conversionRate && (
                            <MetricBadge value={project.metrics.conversionRate} />
                          )}
                          {project.metrics.revenue && (
                            <MetricBadge value={project.metrics.revenue} />
                          )}
                          {project.metrics.timeSaved && (
                            <MetricBadge value={project.metrics.timeSaved} />
                          )}
                          {project.metrics.userGrowth && (
                            <MetricBadge value={project.metrics.userGrowth} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tech Stack Section - Mobile: Compact, Desktop: Full Width */}
      <div className="w-full py-4 lg:py-2 bg-white mt-8 lg:-mt-36 xl:-mt-40" style={{ overflow: 'hidden' }}>
        <div
          className="flex tech-logos-scroll gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center hover:pause-animation"
          style={{
            width: 'max-content',
            animation: 'scrollLogos 40s linear infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running'
          }}
        >
          {/* Tech logos - Optimized for mobile */}
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="lazy" width="24" height="24" style={{display: 'block'}} fetchpriority="low" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue.js" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" alt="Angular" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" alt="Netlify" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="eager" width="24" height="24" style={{display: 'block'}} />

          {/* Duplicate for seamless loop */}
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue.js" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" alt="Angular" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" alt="Netlify" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" loading="eager" width="20" height="20" style={{display: 'block'}} />
        </div>
      </div>

      {/* Latest Projects Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-normal text-black tracking-tight mt-8 sm:mt-12 md:-mt-8 lg:-mt-12 xl:mt-0 relative px-4 sm:px-4 md:px-6 lg:px-8"
        style={{
          zIndex: 3000,
          position: 'relative'
        }}
      >
        Our Latest Projects
      </motion.h2>

      {/* Static Project Cards for Mobile & Tablet - Horizontal Carousel */}
      <div className="block lg:hidden mt-6 pb-4 w-full">
        <div 
          id="mobile-projects-carousel"
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'scroll',
            overflowY: 'hidden',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            touchAction: 'pan-x',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '8px',
            width: '100vw',
            marginLeft: '-16px',
            marginRight: '-16px'
          }}
        >
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                flexShrink: 0,
                width: 'calc(100vw - 80px)',
                minWidth: 'calc(100vw - 80px)',
                maxWidth: 'calc(100vw - 80px)',
                height: '180px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                backgroundColor: '#f3f4f6',
                position: 'relative',
                display: 'block',
                textDecoration: 'none',
                scrollSnapAlign: 'center'
              }}
            >
              {/* Background */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)'
              }} />
              
              {/* Image */}
              <img
                src={project.image}
                alt={project.name}
                loading={index < 2 ? "eager" : "lazy"}
                draggable="false"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none'
                }}
              />
              
              {/* Info Overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                padding: '12px',
                pointerEvents: 'none'
              }}>
                <p style={{
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {project.name}
                </p>
                {project.metrics && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    {project.metrics.conversionRate && (
                      <span style={{ fontSize: '10px', color: '#4ade80' }}>
                        {project.metrics.conversionRate}
                      </span>
                    )}
                    {project.metrics.userGrowth && (
                      <span style={{ fontSize: '10px', color: '#60a5fa' }}>
                        {project.metrics.userGrowth}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {/* External Link Icon */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '24px',
                height: '24px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <p style={{
          textAlign: 'center',
          fontSize: '10px',
          color: '#9ca3af',
          marginTop: '12px',
          userSelect: 'none'
        }}>
          ← Swipe left or right →
        </p>
        
        {/* Hide Scrollbar */}
        <style jsx>{`
          #mobile-projects-carousel::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section >
  )
}