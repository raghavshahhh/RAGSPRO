// Google Analytics 4 Component
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions
export const trackConversion = (conversionId, value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: 'INR'
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName, formData = {}) => {
  event({
    action: 'form_submission',
    category: 'engagement',
    label: formName,
  })
}

// Track button clicks
export const trackButtonClick = (buttonName, location = '') => {
  event({
    action: 'button_click',
    category: 'engagement',
    label: `${buttonName}${location ? ` - ${location}` : ''}`,
  })
}

// Track outbound links
export const trackOutboundLink = (url) => {
  event({
    action: 'click',
    category: 'outbound',
    label: url,
  })
}

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  event({
    action: 'scroll',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  })
}

// Track time on page
export const trackTimeOnPage = (seconds) => {
  event({
    action: 'time_on_page',
    category: 'engagement',
    value: seconds,
  })
}

// Track ecommerce events
export const trackPurchase = (transactionId, value, items = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'INR',
      items: items
    })
  }
}

export const trackBeginCheckout = (value, items = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      value: value,
      currency: 'INR',
      items: items
    })
  }
}

// Google Analytics Component
export default function GoogleAnalytics() {
  const router = useRouter()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const handleRouteChange = (url) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  )
}

// Hook for easy analytics tracking
export function useAnalytics() {
  return {
    pageview,
    event,
    trackConversion,
    trackFormSubmission,
    trackButtonClick,
    trackOutboundLink,
    trackScrollDepth,
    trackTimeOnPage,
    trackPurchase,
    trackBeginCheckout
  }
}
