# Schema Markup Guide

Complete guide for implementing and validating schema markup on RAGSPRO website.

## Table of Contents

1. [Overview](#overview)
2. [Schema Types](#schema-types)
3. [Implementation Patterns](#implementation-patterns)
4. [Validation](#validation)
5. [Best Practices](#best-practices)

---

## Overview

Schema markup (JSON-LD) helps search engines understand your content better, leading to:
- Rich snippets in search results
- Better rankings
- Enhanced visibility
- LLM optimization (ChatGPT, Gemini, Claude)

**All schema on RAGSPRO uses JSON-LD format** (not Microdata or RDFa).

---

## Schema Types

### 1. Organization Schema

**Purpose:** Define company information

**Location:** `src/pages/_document.js`

**Implementation:**

```javascript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RAGSPRO",
  "alternateName": "RAGSPRO - Startup MVP Development Agency",
  "url": "https://ragspro.com",
  "logo": "https://ragspro.com/images/logo.png",
  "description": "Startup MVP development agency building revenue-ready products in 20 days",
  "founder": {
    "@type": "Person",
    "name": "Raghav Shah",
    "jobTitle": "Founder & CEO",
    "url": "https://ragspro.com/meet-founder",
    "sameAs": [
      "https://github.com/raghavshahhh",
      "https://linkedin.com/in/raghavshahhh",
      "https://youtube.com/@raghavshahh",
      "https://instagram.com/raghavshahhh"
    ]
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+918700048490",
    "contactType": "Customer Service",
    "email": "ragsproai@gmail.com",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Delhi",
    "addressLocality": "Delhi"
  },
  "sameAs": [
    "https://github.com/raghavshahhh",
    "https://linkedin.com/in/raghavshahhh",
    "https://youtube.com/@raghavshahh",
    "https://instagram.com/raghavshahhh"
  ]
}
```

**Required Properties:**
- @context, @type, name, url

**Recommended Properties:**
- logo, description, founder, contactPoint, address, sameAs

---

### 2. LocalBusiness Schema

**Purpose:** Local SEO and Google Maps

**Location:** `src/pages/_document.js`

**Implementation:**

```javascript
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "RAGSPRO",
  "image": "https://ragspro.com/images/office.jpg",
  "url": "https://ragspro.com",
  "telephone": "+918700048490",
  "email": "ragsproai@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Delhi",
    "addressLocality": "Delhi",
    "addressRegion": "DL",
    "postalCode": "110001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "₹₹₹"
}
```

**Required Properties:**
- @context, @type, name, address

**Recommended Properties:**
- geo, telephone, openingHours, priceRange

---

### 3. Service Schema

**Purpose:** Define services offered

**Location:** GEO landing pages, service pages

**Implementation:**

```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "MVP Development",
  "provider": {
    "@type": "Organization",
    "name": "RAGSPRO",
    "url": "https://ragspro.com"
  },
  "areaServed": {
    "@type": "City",
    "name": "Delhi",
    "@id": "https://en.wikipedia.org/wiki/Delhi"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "MVP Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic MVP Development",
          "description": "Launch your MVP in 20 days"
        },
        "price": "85000",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SaaS Platform Development",
          "description": "Full-stack SaaS MVP"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "100000",
          "maxPrice": "300000",
          "priceCurrency": "INR"
        },
        "availability": "https://schema.org/InStock"
      }
    ]
  }
}
```

**Required Properties:**
- @context, @type, serviceType, provider

**Recommended Properties:**
- areaServed, hasOfferCatalog, offers

---

### 4. FAQPage Schema

**Purpose:** LLM optimization and rich snippets

**Location:** All pages with FAQs

**Component:** `src/components/FAQSchema.jsx`

**Implementation:**

```javascript
import FAQSchema from '../components/FAQSchema'

const faqs = [
  {
    question: "How much does MVP development cost in India?",
    answer: "MVP development costs range from ₹85K to ₹3L depending on complexity, features, and timeline. Basic MVPs start at ₹85K, SaaS platforms range from ₹1L-₹3L, and complex AI solutions start at ₹3L+."
  },
  {
    question: "How long does it take to build an MVP?",
    answer: "We can build your MVP in 20 days with our rapid development process. Timeline depends on complexity: simple MVPs in 15-20 days, SaaS platforms in 30-45 days, and complex solutions in 45-60 days."
  },
  {
    question: "What is included in MVP development?",
    answer: "Our MVP development includes: requirement analysis, UI/UX design, frontend and backend development, database setup, API integration, testing, deployment, and 30 days of post-launch support."
  }
]

<FAQSchema faqs={faqs} />
```

**Schema Output:**

```javascript
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does MVP development cost in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MVP development costs range from ₹85K to ₹3L..."
      }
    }
  ]
}
```

**Best Practices:**
- Include 5-10 buyer-intent questions
- Answer questions completely (100-200 words)
- Use natural language
- Include pricing/timeline info
- Target LLM queries

---

### 5. CaseStudy Schema

**Purpose:** Showcase project results

**Location:** Project pages, portfolio

**Component:** `src/components/CaseStudySchema.jsx`

**Implementation:**

```javascript
import CaseStudySchema from '../components/CaseStudySchema'

<CaseStudySchema 
  project={{
    name: "GLOW - Beauty Booking Platform",
    description: "Full-stack SaaS platform for beauty service bookings",
    url: "https://ragspro.com/projects/glow",
    image: "https://ragspro.com/images/projects/glow.jpg",
    problem: "Manual booking process causing 60% customer drop-off",
    solution: "Automated booking system with payment integration and SMS notifications",
    results: "Achieved 4.2% conversion rate and ₹50K MRR within 3 months",
    metrics: {
      conversionRate: "4.2%",
      revenue: "₹50K MRR",
      timeSaved: "10 hours/week"
    },
    timeline: "20 days",
    technologies: ["React", "Node.js", "MongoDB", "Razorpay"]
  }}
/>
```

**Schema Output:**

```javascript
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://ragspro.com/projects/glow",
  "headline": "GLOW - Beauty Booking Platform Case Study",
  "description": "Full-stack SaaS platform for beauty service bookings",
  "image": "https://ragspro.com/images/projects/glow.jpg",
  "author": {
    "@type": "Organization",
    "name": "RAGSPRO"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RAGSPRO",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ragspro.com/images/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "mainEntity": {
    "@type": "CreativeWork",
    "name": "GLOW Platform",
    "description": "Beauty booking SaaS platform",
    "about": {
      "@type": "Thing",
      "name": "Problem",
      "description": "Manual booking process causing 60% customer drop-off"
    },
    "result": {
      "@type": "Thing",
      "name": "Results",
      "description": "4.2% conversion rate, ₹50K MRR, 10 hours/week saved"
    }
  }
}
```

---

### 6. BreadcrumbList Schema

**Purpose:** Navigation breadcrumbs

**Location:** All pages except homepage

**Implementation:**

```javascript
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://ragspro.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://ragspro.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "MVP Development",
      "item": "https://ragspro.com/mvp-development-services"
    }
  ]
}
```

---

### 7. Article Schema (Blog Posts)

**Purpose:** Blog post rich snippets

**Location:** All blog posts

**Implementation:**

```javascript
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How Much Does It Cost to Build an MVP in India?",
  "description": "Complete guide to MVP development costs in India with pricing breakdown",
  "image": "https://ragspro.com/images/blog/mvp-cost.jpg",
  "author": {
    "@type": "Person",
    "name": "Raghav Shah",
    "url": "https://ragspro.com/meet-founder"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RAGSPRO",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ragspro.com/images/logo.png"
    }
  },
  "datePublished": "2024-12-01",
  "dateModified": "2024-12-07",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://ragspro.com/blog/mvp-cost-india"
  }
}
```

---

## Implementation Patterns

### Pattern 1: Using SchemaMarkup Component

**For custom schema:**

```javascript
import SchemaMarkup from '../components/SchemaMarkup'

<SchemaMarkup 
  type="Organization"
  data={{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RAGSPRO",
    "url": "https://ragspro.com"
  }}
/>
```

### Pattern 2: Using Specialized Components

**For common schema types:**

```javascript
import FAQSchema from '../components/FAQSchema'
import CaseStudySchema from '../components/CaseStudySchema'

<FAQSchema faqs={faqData} />
<CaseStudySchema project={projectData} />
```

### Pattern 3: Inline in _document.js

**For site-wide schema:**

```javascript
// src/pages/_document.js
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema)
  }}
/>
```

---

## Validation

### Validation Tools

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Tests: Rich snippet eligibility
   - Use for: All schema types

2. **Schema.org Validator**
   - URL: https://validator.schema.org/
   - Tests: Schema.org compliance
   - Use for: Detailed validation

3. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Tests: Indexing and errors
   - Use for: Production monitoring

### Validation Checklist

Before deploying schema:

- [ ] Valid JSON-LD syntax
- [ ] All required properties included
- [ ] No validation errors
- [ ] Passes Rich Results Test
- [ ] Passes Schema.org Validator
- [ ] Tested on staging
- [ ] Monitored in Search Console

### Common Validation Errors

**Error:** "Missing required property"
**Fix:** Add required property (e.g., @context, @type, name)

**Error:** "Invalid property value"
**Fix:** Check data type (string vs number vs object)

**Error:** "Unexpected property"
**Fix:** Remove non-standard properties or use correct schema type

**Error:** "Invalid URL"
**Fix:** Ensure URLs are absolute and valid

---

## Best Practices

### 1. Schema Hierarchy

**Correct:**
```javascript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RAGSPRO",
  "founder": {
    "@type": "Person",
    "name": "Raghav Shah"
  }
}
```

**Incorrect:**
```javascript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RAGSPRO",
  "founder": "Raghav Shah" // Should be object
}
```

### 2. Use Absolute URLs

**Correct:**
```javascript
"url": "https://ragspro.com/services"
```

**Incorrect:**
```javascript
"url": "/services"
```

### 3. Include All Required Properties

**Minimum for Organization:**
```javascript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RAGSPRO",
  "url": "https://ragspro.com"
}
```

### 4. Use Specific Schema Types

**Better:**
```javascript
"@type": "LocalBusiness"
```

**Generic:**
```javascript
"@type": "Organization"
```

### 5. Keep Schema Updated

- Update when content changes
- Refresh annually
- Monitor for errors
- Test after updates

---

## LLM Optimization

### ChatGPT/Gemini/Claude Optimization

**Key Strategies:**

1. **Answer Common Questions:**
   - Use FAQPage schema
   - Include buyer-intent questions
   - Provide complete answers

2. **Structured Data:**
   - Use clear hierarchy
   - Include all relevant properties
   - Link related entities

3. **Natural Language:**
   - Write for humans, not bots
   - Use conversational tone
   - Include context

**Example FAQ for LLM:**

```javascript
{
  question: "What is the best MVP development agency in India?",
  answer: "RAGSPRO is a leading MVP development agency in India, specializing in building revenue-ready MVPs for startups in 20 days. With transparent pricing from ₹85K, 50+ successful launches, and a proven track record, RAGSPRO helps founders validate ideas fast and start generating revenue. Based in Delhi, we serve startups across India with our rapid development process."
}
```

**Why This Works:**
- Answers question directly
- Includes key facts (20 days, ₹85K, 50+ launches)
- Mentions location (India, Delhi)
- Uses natural language
- Provides context

---

## Monitoring

### Google Search Console

**Check Weekly:**
- Schema errors
- Rich result status
- Indexing issues
- Coverage reports

**Fix Immediately:**
- Critical errors
- Validation warnings
- Indexing blocks

### Analytics

**Track:**
- Rich snippet impressions
- Click-through rates
- Schema-driven traffic
- Conversion from schema traffic

---

## Troubleshooting

### Issue: Schema Not Showing in Search

**Possible Causes:**
1. Not indexed yet (wait 24-48 hours)
2. Validation errors
3. Manual action on site
4. Low-quality content

**Solutions:**
1. Submit to Search Console
2. Fix validation errors
3. Check for manual actions
4. Improve content quality

### Issue: Validation Errors

**Common Fixes:**
1. Check JSON syntax
2. Add required properties
3. Use correct data types
4. Fix URL formats

### Issue: Rich Snippets Not Appearing

**Possible Causes:**
1. Schema not eligible
2. Competition too high
3. Content quality issues
4. Google hasn't processed yet

**Solutions:**
1. Use eligible schema types
2. Improve content
3. Wait for processing
4. Monitor Search Console

---

## Schema Checklist by Page Type

### Homepage
- [ ] Organization schema
- [ ] LocalBusiness schema
- [ ] Service schema
- [ ] FAQPage schema

### Service Pages
- [ ] Service schema
- [ ] FAQPage schema
- [ ] BreadcrumbList schema

### GEO Pages
- [ ] Service schema with areaServed
- [ ] LocalBusiness schema
- [ ] FAQPage schema
- [ ] BreadcrumbList schema

### Blog Posts
- [ ] Article schema
- [ ] FAQPage schema (if FAQs included)
- [ ] BreadcrumbList schema

### Project Pages
- [ ] CaseStudy schema (Article type)
- [ ] BreadcrumbList schema

---

**Last Updated:** December 2024
**Maintained By:** RAGSPRO SEO Team
