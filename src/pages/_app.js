import '../styles/globals.css'
import { useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import Layout from '../components/Layout'
import MobilePerformanceOptimizer from '../components/MobilePerformanceOptimizer'

// Lazy load heavy components
const CustomCursor = lazy(() => import('../components/CustomCursor'))
const SmoothScroll = lazy(() => import('../components/SmoothScroll'))

import { initProjectsAnimation } from '../utils/projectsAnimation'

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    // Performance optimization - defer non-critical operations
    const timeoutId = setTimeout(() => {
      // Add custom cursor class to body
      if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        document.body.classList.add('custom-cursor-active')
      }
    }, 100)

    // Initialize floating projects animation - deferred
    let cleanup
    const animationTimeout = setTimeout(() => {
      cleanup = initProjectsAnimation()
    }, 500);
    
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
      <SmoothScroll>
        <CustomCursor />
        <MobilePerformanceOptimizer />
        <AnimatePresence mode="wait">
          <Layout key={router.route}>
            <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
      </SmoothScroll>
    </>
  )
}