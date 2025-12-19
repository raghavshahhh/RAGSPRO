'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function FixedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Work', href: '/projects' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'About', href: '/#team' },
  ]

  const handleNavClick = (href) => {
    setIsMenuOpen(false)
    if (href.startsWith('/#')) {
      const section = href.substring(2)
      if (router.pathname === '/') {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        router.push(href)
      }
    } else {
      router.push(href)
    }
  }

  const handleContactClick = () => {
    setIsMenuOpen(false)
    if (router.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#contact')
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3'
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="RAGSPRO"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl sm:text-2xl text-black">
              RAGSPRO
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm lg:text-base font-medium text-gray-700 hover:text-black transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={handleContactClick}
              className="px-6 py-2.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all text-sm lg:text-base"
            >
              Still not sure?
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={handleContactClick}
                className="px-4 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all text-center"
              >
                Still not sure?
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
