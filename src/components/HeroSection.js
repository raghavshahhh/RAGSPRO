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
  
  // Mobile-specific scroll progress
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  
  useEffect(() => {
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
      className="h-[110vh] sm:h-[120vh] md:h-[140vh] lg:h-[200vh] bg-white relative z-0 main-section"
    >
      <div ref={canvasRef} className="sticky top-0 h-screen flex items-start overflow-visible pt-1 sm:pt-4 md:pt-6 lg:pt-12 pb-1 sm:pb-4 md:pb-6 lg:pb-20" style={{ zIndex: heroZ }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-start">
          <div className="max-w-full md:max-w-3xl pt-16 sm:pt-1 md:pt-2 lg:pt-4 relative" style={{ zIndex: 2000 }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-2 md:px-3 py-1 sm:py-1 md:py-1.5 bg-white border border-gray-200 rounded-full text-[10px] sm:text-[10px] md:text-xs mb-3 sm:mb-3 md:mb-6 mt-2 sm:mt-2 md:mt-4">
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-green-500 rounded-full"></span>
              <span className="text-gray-700 font-medium">50+ STARTUPS LAUNCHED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[44px] sm:text-[24px] md:text-[32px] lg:text-[48px] xl:text-[68px] font-normal leading-[1.05] tracking-tight mb-3 sm:mb-3 md:mb-6">
              <span className="text-gray-400">Launch Your</span>
              <br />
              <span className="text-black">Startup in 20 Days</span>
            </h1>

            {/* Subheading */}
            <h2 className="text-[11px] sm:text-[12px] md:text-xs lg:text-sm text-gray-700 mb-3 sm:mb-4 md:mb-8 mt-4 sm:mt-2 font-normal">
              Revenue-focused web apps, funnels & AI automations for founders who need users, not pretty dashboards.
            </h2>
            <p className="text-[11px] sm:text-[12px] md:text-xs lg:text-sm text-gray-700 mb-3 sm:mb-4 md:mb-8 mt-4 sm:mt-2">
              <span className="text-black font-semibold">Yes, it's true.</span> RAGSPRO helps startup founders build complete revenue-ready products with AI integration & business automation — all within 20 days. End-to-end development by Raghav Shah, your trusted startup growth partner.
            </p>

            {/* CTA Button with Avatars */}
            <button
              onClick={() => {
                // Trigger the quote form in ServicesSection
                const event = new CustomEvent('openQuoteForm')
                window.dispatchEvent(event)
              }}
              className="group inline-flex items-center gap-2 sm:gap-2 md:gap-3 lg:gap-4 px-2 sm:px-2 md:px-3 lg:px-4 py-2 sm:py-1.5 md:py-2 lg:py-2.5 bg-black text-white rounded-full font-medium hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-lg mb-6 sm:mb-6 md:mb-8 lg:mb-16 text-[10px] sm:text-[10px] md:text-xs lg:text-sm mt-4 sm:mt-6"
            >
              <div className="flex -space-x-0.5 sm:-space-x-1 md:-space-x-2 relative">
                {/* User 1 Circle */}
                <div className="w-4 sm:w-5 md:w-6 lg:w-8 h-4 sm:h-5 md:h-6 lg:h-8 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=75"
                    alt="User 1"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="32"
                    height="32"
                  />
                </div>

                {/* User 2 Circle */}
                <div className="w-4 sm:w-5 md:w-6 lg:w-8 h-4 sm:h-5 md:h-6 lg:h-8 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face&auto=format&q=75"
                    alt="User 2"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="32"
                    height="32"
                  />
                </div>

                {/* '+ you' Circle - Appears on hover */}
                <div className="w-4 sm:w-5 md:w-6 lg:w-8 h-4 sm:h-5 md:h-6 lg:h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center group-hover:scale-100 group-hover:opacity-100 opacity-0 scale-0 transition-all duration-300">
                  <span className="text-black text-[4px] sm:text-[5px] md:text-[6px] lg:text-[8px] font-bold">+ you</span>
                </div>
              </div>

              <span className="text-white">Get Your Project Roadmap</span>
            </button>

            {/* Social Proof - Compact for mobile */}
            <div className="flex items-center gap-2 sm:gap-1 md:gap-2 mb-3 sm:mb-4 md:mb-8 lg:mb-12 -mt-2 sm:mt-0">
              <div className="flex -space-x-0.5">
                <div className="w-3 sm:w-3 md:w-4 lg:w-5 h-3 sm:h-3 md:h-4 lg:h-5 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=75"
                    alt="Client 1"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </div>
                <div className="w-3 sm:w-3 md:w-4 lg:w-5 h-3 sm:h-3 md:h-4 lg:h-5 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format&q=75"
                    alt="Client 2"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </div>
                <div className="w-3 sm:w-3 md:w-4 lg:w-5 h-3 sm:h-3 md:h-4 lg:h-5 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face&auto=format&q=75"
                    alt="Client 3"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </div>
                <div className="w-3 sm:w-3 md:w-4 lg:w-5 h-3 sm:h-3 md:h-4 lg:h-5 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face&auto=format&q=75"
                    alt="Client 4"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </div>
                <div className="w-3 sm:w-3 md:w-4 lg:w-5 h-3 sm:h-3 md:h-4 lg:h-5 rounded-full overflow-hidden border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face&auto=format&q=75"
                    alt="Client 5"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
              <div className="text-left ml-1.5">
                <div
                  className="flex gap-0 sm:gap-0.5 justify-center sm:justify-start mb-0 sm:mb-0.5 cursor-pointer testimonial-area"
                  onClick={() => {
                    const testimonialsSection = document.querySelector('#testimonials') || document.querySelector('[class*="testimonial"]')
                    if (testimonialsSection) {
                      testimonialsSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-black hover:scale-110 transition-transform text-[8px] sm:text-[5px] md:text-[6px] lg:text-[8px]">★</span>
                  ))}
                </div>
                <p className="text-[7px] sm:text-[6px] md:text-[8px] lg:text-[10px] text-gray-700 font-medium -mt-8 sm:mt-0">50+ Startup Founders</p>
              </div>
            </div>


          </div>

          {/* Right Column - Floating Project Cards - Hidden on Mobile */}
          <div className="relative w-full h-[200px] sm:h-[180px] md:h-[240px] lg:h-[350px] xl:h-[600px] pt-1 sm:pt-2 md:pt-4 hidden md:block" style={{ perspective: '1500px', zIndex: 1000 }}>
            {/* Placeholder for faster perceived loading */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse" style={{ zIndex: 1 }}></div>
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

      {/* Tech Stack Section - Full Width */}
      <div className="w-full -mt-[15rem] sm:-mt-32 md:-mt-40 lg:-mt-48 xl:-mt-56 py-0.5 sm:py-1 md:py-2 overflow-hidden">
        <div
          className="flex tech-logos-scroll gap-3 sm:gap-6 md:gap-8 lg:gap-12 items-center hover:pause-animation"
          style={{
            width: 'max-content',
            animation: 'scrollLogos 15s linear infinite'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running'
          }}
        >
          {/* Tech logos */}
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" loading="lazy" width="24" height="24" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue.js" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" alt="Angular" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" alt="Netlify" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="h-3 sm:h-4 md:h-5 lg:h-6 w-3 sm:w-4 md:w-5 lg:w-6 opacity-100 hover:scale-110 transition-all" />

          {/* Duplicate for seamless loop */}
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue.js" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" alt="Angular" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" alt="Netlify" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="h-2 sm:h-3 md:h-4 lg:h-5 w-2 sm:w-3 md:w-4 lg:w-5 opacity-100 hover:scale-110 transition-all" />
        </div>
      </div>

      {/* Latest Projects Heading */}
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-normal text-black tracking-tight mt-4 sm:mt-2 md:mt-4 lg:mt-6 xl:mt-16 relative px-2 sm:px-4 md:px-6 lg:px-8"
        style={{
          zIndex: 3000,
          position: 'relative'
        }}
      >
        Our Latest Projects
      </h2>

      {/* Static Project Cards for Mobile - Optimized */}
      <div className="block sm:hidden px-4 mt-6">
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.url)}
              className="w-full h-24 rounded-lg overflow-hidden shadow-lg cursor-pointer bg-gray-100 relative group active:scale-95 transition-transform duration-200"
            >
              {/* Placeholder background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
              
              {/* Optimized image for mobile */}
              <img
                src={`${project.image}?w=400&q=60&fm=webp&auto=format,compress`}
                alt={project.name}
                className="w-full h-full object-cover group-active:scale-110 transition-transform duration-200 relative z-10"
                loading="lazy"
                decoding="async"
                width="200"
                height="112"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 z-20">
                <p className="text-white text-xs font-semibold truncate">{project.name}</p>
              </div>
              {/* Click indicator */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity duration-200 z-20">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}