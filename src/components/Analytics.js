import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Analytics() {
  const router = useRouter()

  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Get referrer
        const referrer = document.referrer || 'direct'
        
        // Track page view
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer,
          }),
        })
      } catch (error) {
        // Silent fail - don't break user experience
        console.error('Analytics error:', error)
      }
    }

    // Track initial page view
    trackPageView()

    // Track route changes
    const handleRouteChange = () => {
      trackPageView()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return null // This component doesn't render anything
}
