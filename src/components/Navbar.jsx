// Glass Rounded Navbar - Mobile Optimized & Fully Connected
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu, FiX, FiPhone, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

  // Get Started - Opens Get Quote page
  const handleGetStarted = () => {
    setIsMobileMenuOpen(false)
    router.push('/get-quote')
  }

  // WhatsApp click
  const handleWhatsApp = () => {
    window.open('https://wa.me/918700048490?text=Hi! I want to discuss a project.', '_blank')
  }

  // Call click
  const handleCall = () => {
    window.location.href = 'tel:+918700048490'
  }

  return (
    <>
      {/* NAVBAR CONTAINER */}
      <div style={{
        position: 'fixed',
        top: isMobile ? '8px' : '12px',
        left: 0,
        right: 0,
        zIndex: 2147483647,
        padding: isMobile ? '8px 12px' : '12px 16px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        {/* GLASS NAVBAR */}
        <header style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '50px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          padding: isMobile ? '6px 6px 6px 14px' : '8px 8px 8px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '4px' : '8px',
          maxWidth: '900px',
          width: '100%',
        }}>
          
          {/* Logo */}
          <Link href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '6px' : '8px', 
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            <div style={{ 
              width: isMobile ? '28px' : '32px', 
              height: isMobile ? '28px' : '32px', 
              borderRadius: '50%', 
              overflow: 'hidden',
              backgroundColor: '#000',
            }}>
              <Image
                src="/images/logo.png"
                alt="RAGSPRO"
                width={32}
                height={32}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                priority
              />
            </div>
            <span style={{ 
              fontWeight: 700, 
              fontSize: isMobile ? '14px' : '15px', 
              color: '#000' 
            }}>
              RAGSPRO
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2px',
              marginLeft: 'auto',
            }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#4b5563',
                    textDecoration: 'none',
                    borderRadius: '20px',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(0,0,0,0.05)'
                    e.target.style.color = '#000'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#4b5563'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <button
              onClick={handleGetStarted}
              style={{
                padding: '10px 20px',
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                marginLeft: '8px',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#000'}
            >
              Get Started
            </button>
          )}

          {/* Mobile - Quick Actions */}
          {isMobile && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              marginLeft: 'auto',
            }}>
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FaWhatsapp style={{ width: '18px', height: '18px', color: '#fff' }} />
              </button>

              {/* Call Button */}
              <button
                onClick={handleCall}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FiPhone style={{ width: '16px', height: '16px', color: '#fff' }} />
              </button>

              {/* Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: isMobileMenuOpen ? '#000' : 'rgba(0,0,0,0.05)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FiX style={{ width: '18px', height: '18px', color: '#fff' }} />
                ) : (
                  <FiMenu style={{ width: '18px', height: '18px', color: '#000' }} />
                )}
              </button>
            </div>
          )}
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && isMobile && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 2147483646,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobile && (
        <div 
          style={{
            position: 'fixed',
            top: '60px',
            left: '12px',
            right: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            padding: '16px',
            zIndex: 2147483647,
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
          }}
        >
          {/* Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                display: 'block',
                padding: '14px 16px',
                fontSize: '15px',
                fontWeight: 500,
                color: '#1f2937',
                textDecoration: 'none',
                borderRadius: '12px',
                marginBottom: '4px',
                transition: 'all 0.2s',
              }}
            >
              {link.name}
            </Link>
          ))}

          {/* Divider */}
          <div style={{ 
            height: '1px', 
            backgroundColor: '#e5e7eb', 
            margin: '12px 0' 
          }} />

          {/* Contact Options */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '8px',
            marginBottom: '12px',
          }}>
            <button
              onClick={handleWhatsApp}
              style={{
                padding: '12px',
                backgroundColor: '#25D366',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <FaWhatsapp style={{ width: '16px', height: '16px' }} />
              WhatsApp
            </button>
            <button
              onClick={handleCall}
              style={{
                padding: '12px',
                backgroundColor: '#3b82f6',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <FiPhone style={{ width: '16px', height: '16px' }} />
              Call Now
            </button>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
            }}
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
              gap: '6px',
              marginTop: '12px',
              padding: '10px',
              fontSize: '13px',
              color: '#6b7280',
              textDecoration: 'none',
            }}
          >
            <FiMail style={{ width: '14px', height: '14px' }} />
            ragsproai@gmail.com
          </a>
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: isMobile ? '52px' : '0px' }} />
    </>
  )
}
