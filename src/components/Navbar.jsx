// Framer-Style Glassmorphism Navbar
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiPhone, FiMail, FiSettings } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  // Check if user is admin
  const isAdmin = user?.email === 'ragsproai@gmail.com'

  // Detect mobile
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Detect scroll for enhanced blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [router.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Work', href: '/projects' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Blog', href: '/blog' },
  ]

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const sectionId = href.substring(2)
      
      if (router.pathname === '/') {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        router.push(href)
      }
    }
    setIsMobileMenuOpen(false)
  }

  const handleGetStarted = () => {
    setIsMobileMenuOpen(false)
    router.push('/get-quote')
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/918700048490?text=Hi! I want to discuss a project.', '_blank')
  }

  const handleCall = () => {
    window.location.href = 'tel:+918700048490'
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <>
        <div 
          suppressHydrationWarning
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            padding: '16px',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'saturate(180%) blur(14px)',
            WebkitBackdropFilter: 'saturate(180%) blur(14px)',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06)',
            padding: '12px 24px',
            maxWidth: '1100px',
            width: '100%',
            minHeight: '64px',
            pointerEvents: 'auto',
          }} />
        </div>
        <div suppressHydrationWarning style={{ height: '96px' }} />
      </>
    )
  }

  return (
    <>
      {/* FRAMER-STYLE GLASSMORPHISM NAVBAR */}
      <nav 
        suppressHydrationWarning
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          padding: isMobile ? '12px' : '16px',
          display: 'flex',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        }}>
        <div style={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.72)' 
            : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: scrolled 
            ? 'saturate(180%) blur(20px)' 
            : 'saturate(180%) blur(14px)',
          WebkitBackdropFilter: scrolled 
            ? 'saturate(180%) blur(20px)' 
            : 'saturate(180%) blur(14px)',
          borderRadius: '100px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: scrolled 
            ? '0 2px 4px rgba(0, 0, 0, 0.04), 0 12px 32px rgba(0, 0, 0, 0.08)' 
            : '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06)',
          padding: isMobile ? '10px 12px 10px 20px' : '12px 16px 12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '8px' : '16px',
          maxWidth: '1100px',
          width: '100%',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'auto',
        }}>
          
          {/* Logo */}
          <Link href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '8px' : '10px', 
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <div style={{ 
              width: isMobile ? '32px' : '36px', 
              height: isMobile ? '32px' : '36px', 
              borderRadius: '50%', 
              overflow: 'hidden',
              backgroundColor: '#000',
              transition: 'transform 0.2s',
            }}>
              <Image
                src="/images/logo.png"
                alt="RAGSPRO"
                width={36}
                height={36}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                priority
              />
            </div>
            <span style={{ 
              fontWeight: 700, 
              fontSize: isMobile ? '15px' : '16px', 
              color: '#000',
              letterSpacing: '-0.02em',
            }}>
              RAGSPRO
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              marginLeft: 'auto',
            }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    padding: '10px 16px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#525252',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.06)'
                    e.target.style.color = '#000'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#525252'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <>
              {/* Admin Dashboard Button (only for admin) */}
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    marginLeft: '8px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#333'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#1a1a1a'
                  }}
                >
                  <FiSettings style={{ width: '14px', height: '14px' }} />
                  Admin
                </Link>
              )}
              
              <button
              onClick={handleGetStarted}
              style={{
                padding: '10px 24px',
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                marginLeft: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1a1a1a'
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#000'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              Get Started
            </button>
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: isMobileMenuOpen ? '#000' : 'rgba(0, 0, 0, 0.06)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                marginLeft: 'auto',
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX style={{ width: '20px', height: '20px', color: '#fff' }} />
              ) : (
                <FiMenu style={{ width: '20px', height: '20px', color: '#000' }} />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && isMobile && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9998,
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobile && (
        <div 
          style={{
            position: 'fixed',
            top: '80px',
            left: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'saturate(180%) blur(20px)',
            WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '20px',
            zIndex: 9999,
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Nav Links */}
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: 'block',
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: 500,
                color: '#1f2937',
                textDecoration: 'none',
                borderRadius: '16px',
                marginBottom: '6px',
                transition: 'all 0.2s',
                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
              }}
              onTouchStart={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'}
              onTouchEnd={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {link.name}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ 
            height: '1px', 
            backgroundColor: 'rgba(0, 0, 0, 0.08)', 
            margin: '16px 0' 
          }} />

          {/* Contact Options */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '10px',
            marginBottom: '16px',
          }}>
            <button
              onClick={handleWhatsApp}
              style={{
                padding: '14px',
                backgroundColor: '#25D366',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.2s',
              }}
              onTouchStart={(e) => e.target.style.transform = 'scale(0.95)'}
              onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
            >
              <FaWhatsapp style={{ width: '18px', height: '18px' }} />
              WhatsApp
            </button>
            <button
              onClick={handleCall}
              style={{
                padding: '14px',
                backgroundColor: '#3b82f6',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.2s',
              }}
              onTouchStart={(e) => e.target.style.transform = 'scale(0.95)'}
              onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
            >
              <FiPhone style={{ width: '18px', height: '18px' }} />
              Call Now
            </button>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onTouchStart={(e) => e.target.style.transform = 'scale(0.98)'}
            onTouchEnd={(e) => e.target.style.transform = 'scale(1)'}
          >
            Get Started →
          </button>

          {/* Email */}
          <a
            href="mailto:ragsproai@gmail.com"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '16px',
              padding: '12px',
              fontSize: '14px',
              color: '#6b7280',
              textDecoration: 'none',
            }}
          >
            <FiMail style={{ width: '16px', height: '16px' }} />
            ragsproai@gmail.com
          </a>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: isMobile ? '76px' : '96px' }} />

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
