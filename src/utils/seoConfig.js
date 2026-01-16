// Advanced SEO Configuration for RAGSPRO
// Premium App & Web Development Agency

export const siteConfig = {
  name: 'RAGSPRO',
  title: 'iOS & Web App Development Agency in India | RAGSPRO',
  description: 'RAGSPRO is a premium app & web development agency helping startups build iOS apps, web apps, SaaS products & AI-powered solutions. Trusted by founders across India, USA, UK.',
  url: 'https://ragspro.com',
  ogImage: 'https://ragspro.com/images/og-image.png',
  logo: 'https://ragspro.com/images/logo.png',
  founder: 'Raghav Shah',
  email: 'ragsproai@gmail.com',
  phone: '+918826073013',
  location: {
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    region: 'IN-DL',
    coordinates: {
      lat: 28.7041,
      lng: 77.1025
    }
  },
  social: {
    instagram: 'https://instagram.com/ragspro.ai',
    linkedin: 'https://linkedin.com/in/raghavshahhh',
    github: 'https://github.com/raghavshahhh',
    twitter: 'https://twitter.com/ragspro',
    youtube: 'https://www.youtube.com/@raghavshahh'
  },
  services: [
    'iOS App Development',
    'Web App Development',
    'SaaS Development',
    'AI Automation',
    'MVP Development',
    'Startup Consulting'
  ],
  areasServed: ['India', 'USA', 'UK', 'Canada', 'Australia', 'Singapore']
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'iOS & Web App Development Agency in India | RAGSPRO',
    description: 'RAGSPRO builds revenue-ready iOS apps, web applications & SaaS platforms for startups. Premium app development agency trusted by founders. 20-day delivery.',
    keywords: 'iOS app development agency, web development agency India, startup app developers, SaaS development company, AI automation agency, mobile app development India, app development agency Delhi',
    canonical: 'https://ragspro.com'
  },
  
  iosAppDevelopment: {
    title: 'iOS App Development Agency India | iPhone App Developers | RAGSPRO',
    description: 'Premium iOS app development agency in India. We build scalable iPhone apps with SwiftUI, App Store ready. Trusted by startups for iOS development.',
    keywords: 'iOS app development agency India, iPhone app developers, SwiftUI developers, iOS app development company, mobile app development iOS, App Store development',
    canonical: 'https://ragspro.com/ios-app-development'
  },
  
  webAppDevelopment: {
    title: 'Web App Development Agency | Custom Web Applications | RAGSPRO',
    description: 'Build scalable web applications with RAGSPRO. Expert web app development agency specializing in React, Next.js, Node.js. SaaS & enterprise solutions.',
    keywords: 'web app development agency, custom web application development, React development company, Next.js developers, SaaS development, progressive web apps',
    canonical: 'https://ragspro.com/web-app-development'
  },
  
  saasDevelopment: {
    title: 'SaaS Development Company India | Build SaaS Products | RAGSPRO',
    description: 'Launch your SaaS product with RAGSPRO. Full-stack SaaS development company building subscription platforms, dashboards & multi-tenant applications.',
    keywords: 'SaaS development company, SaaS product development, subscription platform development, multi-tenant SaaS, SaaS dashboard development India',
    canonical: 'https://ragspro.com/saas-development-services'
  },
  
  aiAutomation: {
    title: 'AI Automation Agency | Business Process Automation | RAGSPRO',
    description: 'Automate your business with AI. RAGSPRO builds AI chatbots, workflow automation, document processing & intelligent systems for businesses.',
    keywords: 'AI automation agency, business process automation, AI chatbot development, workflow automation, intelligent automation, AI integration services',
    canonical: 'https://ragspro.com/ai-automation-services'
  },
  
  mvpDevelopment: {
    title: 'MVP Development Agency | Build Startup MVP in 20 Days | RAGSPRO',
    description: 'Launch your startup MVP in 20 days. RAGSPRO is a premium MVP development agency helping founders validate ideas with revenue-ready products.',
    keywords: 'MVP development agency, startup MVP development, rapid prototyping, minimum viable product development, startup app development, 20 day MVP',
    canonical: 'https://ragspro.com/mvp-development-services'
  },
  
  startupConsulting: {
    title: 'Startup Consulting Services | Tech Strategy & Development | RAGSPRO',
    description: 'Get expert startup consulting from RAGSPRO. Tech strategy, product roadmap, architecture planning & development guidance for founders.',
    keywords: 'startup consulting services, tech consulting for startups, CTO as a service, startup technology advisor, product development consulting',
    canonical: 'https://ragspro.com/startup-consulting-services'
  },
  
  pricing: {
    title: 'App Development Pricing | Transparent Costs | RAGSPRO',
    description: 'Transparent app development pricing. iOS apps, web apps, SaaS platforms starting from ₹85K. No hidden costs. Get custom quote for your project.',
    keywords: 'app development cost India, iOS app development pricing, web app development cost, SaaS development pricing, MVP development cost',
    canonical: 'https://ragspro.com/pricing'
  },
  
  projects: {
    title: 'Our Portfolio | Apps & Web Projects Built by RAGSPRO',
    description: 'See apps and web platforms built by RAGSPRO. Real projects, real results. iOS apps, SaaS products, AI automation systems for startups.',
    keywords: 'app development portfolio, iOS app examples, web app portfolio, SaaS products built, startup apps portfolio',
    canonical: 'https://ragspro.com/projects'
  },
  
  blog: {
    title: 'Startup Development Blog | App Development Insights | RAGSPRO',
    description: 'Learn about app development, startup growth, MVP building & tech trends. Expert insights from RAGSPRO founders and developers.',
    keywords: 'startup development blog, app development insights, MVP development guide, SaaS development tips, startup tech blog',
    canonical: 'https://ragspro.com/blog'
  }
}

// Schema.org structured data generators
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareCompany',
  name: siteConfig.name,
  alternateName: 'RAGSPRO App Development Agency',
  url: siteConfig.url,
  logo: siteConfig.logo,
  description: siteConfig.description,
  founder: {
    '@type': 'Person',
    name: siteConfig.founder,
    jobTitle: 'Founder & CEO'
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.state,
    addressCountry: siteConfig.location.country
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.location.coordinates.lat,
    longitude: siteConfig.location.coordinates.lng
  },
  areaServed: siteConfig.areasServed.map(area => ({
    '@type': 'Country',
    name: area
  })),
  sameAs: Object.values(siteConfig.social),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: 'Customer Service',
    areaServed: 'Worldwide',
    availableLanguage: ['English', 'Hindi']
  },
  offers: {
    '@type': 'AggregateOffer',
    offerCount: siteConfig.services.length,
    offers: siteConfig.services.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name
        }
      }
    }))
  }
})

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.url}/#localbusiness`,
  name: `${siteConfig.name} - App Development Agency`,
  image: siteConfig.logo,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.state,
    addressCountry: siteConfig.location.country
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.location.coordinates.lat,
    longitude: siteConfig.location.coordinates.lng
  },
  url: siteConfig.url,
  openingHours: 'Mo-Fr 09:00-18:00',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer, UPI, Cryptocurrency',
  currenciesAccepted: 'INR, USD'
})

export const generateServiceSchema = (serviceName, serviceDescription, serviceUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: serviceDescription,
  url: serviceUrl,
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url
  },
  areaServed: siteConfig.areasServed,
  serviceType: serviceName,
  category: 'Software Development'
})

export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export const generateArticleSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.excerpt,
  image: article.image || siteConfig.ogImage,
  datePublished: article.publishedDate,
  dateModified: article.modifiedDate || article.publishedDate,
  author: {
    '@type': 'Person',
    name: siteConfig.founder,
    url: siteConfig.url
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.logo
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url
  }
})

export const generateFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
})
