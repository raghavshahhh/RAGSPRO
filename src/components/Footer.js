import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [currentWord, setCurrentWord] = useState(0)
  const words = ['build', 'create']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 1500) // Change word every 1.5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-[#000000] text-white pt-6 sm:pt-12 md:pt-16 pb-0 relative">
      {/* Blur overlay at the top of footer */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-sm pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Main Heading */}
        <div className="mb-4 sm:mb-8 mt-2 sm:mt-8">
          <h3 className="text-[44px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-normal leading-[1.1] sm:leading-[0.7] md:leading-[0.6] tracking-tight">
            <span className="text-white flex items-baseline relative z-20">
              <span className="text-white font-normal mr-4">Let's </span>
              <span className="inline-block relative overflow-hidden h-[1.2em] min-w-[120px] sm:min-w-[160px] md:min-w-[200px] align-baseline" style={{ transform: 'translateY(10px)' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={{
                      y: 60,
                      opacity: 0,
                      filter: "blur(8px)",
                      scale: 0.8
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                      scale: 1
                    }}
                    exit={{
                      y: -60,
                      opacity: 0,
                      filter: "blur(8px)",
                      scale: 1.1
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 0.2 },
                      filter: { duration: 0.3 }
                    }}
                    className="absolute inset-0 flex items-center text-white font-normal"
                    style={{ transform: 'translateY(36px)' }}
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
            <br />
            <span className="text-[#888888] font-normal">your startup together.</span>
          </h3>
        </div>

        {/* Contact & Partnership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-12 mb-6 sm:mb-10 md:mb-12 mt-3 sm:mt-6">
          {/* Email Section */}
          <div className="text-left">
            <h3 className="text-[#888888] text-[11px] mb-3 uppercase tracking-wide font-medium">Contact</h3>
            <a
              href="mailto:ragsproai@gmail.com"
              className="text-[#FFFFFF] text-[18px] font-normal hover:text-[#888888] transition-colors duration-300 block"
            >
              ragsproai@gmail.com
            </a>
          </div>

          {/* Partner Section */}
          <div className="text-left md:text-right">
            <h3 className="text-[#888888] text-[11px] mb-3 uppercase tracking-wide font-medium">Raghav Shah • Delhi, India</h3>
            <button
              onClick={() => {
                const event = new CustomEvent('openQuoteForm')
                window.dispatchEvent(event)
              }}
              className="text-[#FFFFFF] text-[18px] font-normal hover:text-[#888888] transition-colors duration-300 bg-transparent border-none cursor-pointer p-0"
            >
              Talk to us
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#222222] mb-4 sm:mb-6"></div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-3 sm:mb-6">
          {/* Instagram */}
          <a
            href="https://instagram.com/ragspro.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#888888] transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/ragspro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#888888] transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918826073013"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#888888] transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
            </svg>
          </a>

          {/* Gmail */}
          <a
            href="mailto:ragsproai@gmail.com"
            className="text-white hover:text-[#888888] transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/raghavshahhh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#888888] transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        {/* Legal Links & Bottom Info Combined */}
        <div className="flex flex-col items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
          {/* Legal Links */}
          <div className="flex justify-center gap-4 sm:gap-6">
            <a
              href="/our-story"
              className="text-[#888888] text-[13px] hover:text-white transition-colors duration-300"
            >
              Our Story
            </a>
            <a
              href="/blog"
              className="text-[#888888] text-[13px] hover:text-white transition-colors duration-300"
            >
              Blog
            </a>
            <a
              href="/privacy-policy"
              className="text-[#888888] text-[13px] hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-[#888888] text-[13px] hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </a>
            <button
              onClick={() => {
                const event = new CustomEvent('openLoginModal')
                window.dispatchEvent(event)
              }}
              className="text-[#888888] text-[13px] hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              Admin
            </button>
          </div>

          {/* Bottom Info */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[13px]">
            <p className="text-[#888888]">Based in Delhi, India</p>
            <span className="hidden md:block text-[#444444]">•</span>
            <p className="text-[#888888]">© {currentYear} RAGSPRO. All rights reserved.</p>
          </div>
        </div>

        {/* START TODAY - Single Line */}
        <div className="-mt-2 text-center relative overflow-hidden pb-4 sm:pb-6">
          <h3 className="text-[60px] sm:text-[80px] md:text-[130px] lg:text-[160px] font-normal text-white leading-none tracking-tight whitespace-nowrap">
            START TODAY
          </h3>
        </div>
      </div>

      {/* Bottom half blur overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 via-black/10 to-transparent backdrop-blur-md pointer-events-none"></div>
    </footer>
  )
}