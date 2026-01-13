import '../styles/globals.css'
import '../styles/mobile-fixed.css'
import '../styles/mobile-ultra-optimized.css'
import '../styles/responsive-fixes.css'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '../components/Navbar.jsx'
import Layout from '../components/Layout'
import MobilePerformanceOptimizer from '../components/MobilePerformanceOptimizer'
import UltimateMobileOptimizer from '../components/UltimateMobileOptimizer'
import PerformanceOptimizer from '../components/PerformanceOptimizer'
import AccessibilityOptimizer from '../components/AccessibilityOptimizer'
import SmoothScroll from '../components/SmoothScroll'
import FixedContactButtons from '../components/FixedContactButtons'
import GoogleAnalytics from '../components/GoogleAnalytics'
import ErrorBoundary from '../components/ErrorBoundary'
import LoginModal from '../components/auth/LoginModal'
import { AuthProvider } from '../context/AuthContext'
import { initProjectsAnimation } from '../utils/projectsAnimation'
import { initErrorMonitoring } from '../utils/errorMonitoring'

export default function App({ Component, pageProps, router }) {
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    // Initialize error monitoring
    initErrorMonitoring()

    // Initialize floating projects animation
    const cleanup = initProjectsAnimation();
    
    // Reveal animations on scroll
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanup();
    };
  }, []);

  // Check for login query param
  useEffect(() => {
    if (router.query.login === 'true') {
      setShowLoginModal(true)
      // Remove query param
      router.replace(router.pathname, undefined, { shallow: true })
    }
  }, [router.query.login])

  // Global function to open login modal
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.openLoginModal = () => setShowLoginModal(true)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
      </Head>
      
      {/* Google Analytics */}
      <GoogleAnalytics />
      
      <AuthProvider>
        <ErrorBoundary>
          <PerformanceOptimizer />
          <AccessibilityOptimizer />
          <UltimateMobileOptimizer />
          <Analytics />
          
          {/* NAVBAR - TOP LEVEL, OUTSIDE LAYOUT */}
          <Navbar />
          
          <SmoothScroll>
            <MobilePerformanceOptimizer />
            <AnimatePresence mode="wait">
              <Layout key={router.route}>
                <Component {...pageProps} />
              </Layout>
            </AnimatePresence>
          </SmoothScroll>
          
          {/* FIXED CONTACT BUTTONS - ALWAYS VISIBLE ON DESKTOP */}
          <FixedContactButtons />
          
          {/* Login Modal */}
          <LoginModal 
            isOpen={showLoginModal} 
            onClose={() => setShowLoginModal(false)} 
          />
        </ErrorBoundary>
      </AuthProvider>
    </>
  )
}
