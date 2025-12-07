import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="author" content="Raghav Shah, RAGSPRO" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Primary Keywords */}
        <meta name="keywords" content="ragspro, raghav shah, digital agency, startup development, web development, mobile app development, AI solutions, business automation, delhi startup agency, india digital agency, 20 days startup, rapid development, mvp development, business consulting, growth hacking, digital transformation" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RAGSPRO" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ragspro" />
        <meta name="twitter:site" content="@ragspro" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="your-google-search-console-verification-code" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RAGSPRO",
              "alternateName": "RAGSPRO Startup MVP Development Agency",
              "url": "https://ragspro.com",
              "logo": "https://ragspro.com/logo.png",
              "description": "RAGSPRO is a startup MVP development agency in Delhi, India. We help founders build revenue-ready MVPs with AI automation in 20 days.",
              "founder": {
                "@type": "Person",
                "name": "Raghav Shah",
                "jobTitle": "Founder & CEO"
              },
              "sameAs": [
                "https://instagram.com/raghavshahhh",
                "https://linkedin.com/in/raghavshahhh",
                "https://www.youtube.com/@raghavshahh"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Delhi",
                "addressCountry": "India"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "knowsAbout": [
                "MVP Development",
                "Startup Development",
                "AI Automation",
                "Web Application Development",
                "Mobile App Development"
              ]
            })
          }}
        />
        
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "RAGSPRO Startup MVP Development Agency",
              "image": "https://ragspro.com/images/logo.png",
              "telephone": "+918700048490",
              "email": "ragsproai@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Delhi",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.7041,
                "longitude": 77.1025
              },
              "url": "https://ragspro.com",
              "priceRange": "$$",
              "openingHours": "Mo-Fr 09:00-18:00",
              "description": "Leading startup MVP development agency in Delhi, India. Raghav Shah and team specialize in revenue-ready MVPs, AI automation, and 20-day launches for founders.",
              "priceRange": "₹₹₹",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
              "currenciesAccepted": "INR, USD"
            })
          }}
        />
        
        {/* Structured Data - Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Startup MVP Development in 20 Days",
              "description": "Revenue-ready MVP development including web apps, mobile apps, AI automation, and growth funnels delivered in 20 days by RAGSPRO team led by Raghav Shah.",
              "provider": {
                "@type": "Organization",
                "name": "RAGSPRO",
                "founder": "Raghav Shah"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Digital Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Application Development"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mobile App Development"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "AI & Automation Solutions"
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}