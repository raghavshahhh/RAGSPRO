import '../styles/globals.css'
import '../styles/mobile-fixed.css'
import '../styles/mobile-ultra-optimized.css'
import '../styles/responsive-fixes.css'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import Layout from '../components/Layout'
import MobilePerformanceOptimizer from '../components/MobilePerformanceOptimizer'
import UltimateMobileOptimizer from '../components/UltimateMobileOptimizer'
import PerformanceOptimizer from '../components/PerformanceOptimizer'
import AccessibilityOptimizer from '../components/AccessibilityOptimizer'
import CustomCursor from '../components/CustomCursor'
import SmoothScroll from '../components/SmoothScroll'
import FloatingContactButtons from '../components/FloatingContactButtons'
import Analytics from '../components/Analytics'
import { initProjectsAnimation } from '../utils/projectsAnimation'

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    // Add custom cursor class to body
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      document.body.classList.add('custom-cursor-active')
    }

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
      document.body.classList.remove('custom-cursor-active')
      cleanup();
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
      </Head>
      <PerformanceOptimizer />
      <AccessibilityOptimizer />
      <UltimateMobileOptimizer />
      <Analytics />
      <SmoothScroll>
        <CustomCursor />
        <MobilePerformanceOptimizer />
        <AnimatePresence mode="wait">
          <Layout key={router.route}>
            <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
      </SmoothScroll>
      
      {/* GLOBAL FLOATING ELEMENTS - OUTSIDE ALL WRAPPERS */}
      <FloatingContactButtons />
    </>
  )
}