# GEO Page Creation Guide

Step-by-step guide for creating new geographic SEO landing pages for RAGSPRO.

## Table of Contents

1. [Overview](#overview)
2. [When to Create GEO Pages](#when-to-create-geo-pages)
3. [Step-by-Step Process](#step-by-step-process)
4. [Content Guidelines](#content-guidelines)
5. [Technical Implementation](#technical-implementation)
6. [SEO Optimization](#seo-optimization)
7. [Examples](#examples)

---

## Overview

Geographic SEO landing pages help RAGSPRO rank for location-specific searches like:
- "MVP development in Delhi"
- "Startup development India"
- "SaaS development Bangalore"
- "AI automation Mumbai"

These pages target local search intent and drive high-quality leads from specific regions.

---

## When to Create GEO Pages

### Create GEO Pages For:

✅ **Major Indian Cities:**
- Delhi/NCR
- Mumbai
- Bangalore
- Hyderabad
- Pune
- Chennai
- Kolkata
- Ahmedabad

✅ **High-Demand Regions:**
- India (national)
- Specific states (if high search volume)

✅ **Service + Location Combinations:**
- MVP development + City
- Startup development + Region
- SaaS development + City
- AI automation + City
- App development + City

### Don't Create GEO Pages For:

❌ Low search volume locations
❌ Duplicate content (same service, nearby cities)
❌ Locations you don't serve
❌ Non-relevant combinations

---

## Step-by-Step Process

### Step 1: Keyword Research

**Find Target Keywords:**

1. Use Google Keyword Planner or Ahrefs
2. Search for: `[service] + [location]`
3. Check search volume (minimum 50/month)
4. Analyze competition
5. Identify primary and secondary keywords

**Example Research:**
```
Primary: "MVP development Delhi" (200 searches/month)
Secondary: 
- "MVP agency Delhi"
- "Startup development Delhi"
- "Build MVP in Delhi"
```

### Step 2: Get Location Data

**Required Information:**
- City/region name
- Geographic coordinates (latitude, longitude)
- Local landmarks/areas
- Local business ecosystem info

**Find Coordinates:**
1. Go to Google Maps
2. Search for the city
3. Right-click on the location
4. Copy coordinates (e.g., 28.6139, 77.2090)

### Step 3: Create Page File

**File Naming Convention:**
```
/pages/[service]-[location].js
```

**Examples:**
- `/pages/mvp-development-delhi.js`
- `/pages/startup-development-india.js`
- `/pages/saas-development-bangalore.js`
- `/pages/ai-automation-mumbai.js`

### Step 4: Use GeoLandingPage Component

**Basic Template:**

```jsx
import GeoLandingPage from '../components/GeoLandingPage'

export default function MVPDevelopmentDelhi() {
  return (
    <GeoLandingPage 
      location="Delhi"
      service="MVP Development"
      coordinates={{ lat: 28.6139, lng: 77.2090 }}
    />
  )
}
```

### Step 5: Customize Content

**Override Default Content:**

```jsx
import GeoLandingPage from '../components/GeoLandingPage'
import SEOHead from '../components/SEOHead'

export default function MVPDevelopmentDelhi() {
  const customContent = {
    hero: {
      title: "MVP Development in Delhi | Launch in 20 Days",
      subtitle: "Delhi's top MVP development agency for startups. Revenue-ready products from ₹85K.",
      cta: "Book Discovery Call"
    },
    about: {
      title: "Why Choose RAGSPRO for MVP Development in Delhi",
      content: `
        Based in Delhi, RAGSPRO understands the unique challenges faced by Delhi-based startups. 
        With our 20-day MVP development process, we've helped 50+ Delhi startups launch successfully.
        
        Our Delhi office is located in [Area], making it easy for local founders to meet in person 
        for discovery calls and project kickoffs.
      `
    },
    testimonials: [
      {
        quote: "RAGSPRO helped us launch our MVP in Delhi market in just 20 days.",
        name: "Rahul Sharma",
        title: "Founder, TechStart Delhi",
        location: "Delhi"
      }
    ]
  }

  return (
    <>
      <SEOHead 
        title="MVP Development Delhi | Launch in 20 Days - RAGSPRO"
        description="Build your startup MVP in Delhi. Revenue-ready products from ₹85K. Delhi's top MVP development agency. Book discovery call today."
        keywords="MVP development Delhi, startup development Delhi, MVP agency Delhi, build MVP Delhi"
      />
      <GeoLandingPage 
        location="Delhi"
        service="MVP Development"
        coordinates={{ lat: 28.6139, lng: 77.2090 }}
        customContent={customContent}
      />
    </>
  )
}
```

### Step 6: Add Local Content

**Include Delhi-Specific Information:**

1. **Local Startup Ecosystem:**
   - Mention local startup hubs
   - Reference local accelerators
   - Highlight local success stories

2. **Local Testimonials:**
   - Use Delhi-based client testimonials
   - Include company names with "Delhi" mention
   - Add local landmarks in testimonials

3. **Local Events/Community:**
   - Mention Delhi startup events
   - Reference local meetups
   - Highlight community involvement

**Example:**
```
"Located in the heart of Delhi's startup ecosystem, RAGSPRO has been serving 
Delhi-NCR founders since 2020. We've worked with startups from Connaught Place 
to Cyber City, helping them launch revenue-ready MVPs in just 20 days."
```

### Step 7: Add Schema Markup

**Service Schema with Geographic Data:**

```jsx
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "MVP Development",
  "provider": {
    "@type": "Organization",
    "name": "RAGSPRO"
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
          "name": "Basic MVP Development"
        },
        "price": "85000",
        "priceCurrency": "INR"
      }
    ]
  }
}
```

### Step 8: Embed Google Maps

**Add Map to Page:**

```jsx
<div className="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sDelhi!5e0!3m2!1sen!2sin!4v1234567890"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
```

**Get Embed Code:**
1. Go to Google Maps
2. Search for location
3. Click "Share"
4. Click "Embed a map"
5. Copy iframe code

---

## Content Guidelines

### Content Structure

```
H1: [Service] in [Location] | Launch in 20 Days

Introduction (100-150 words)
- Mention location 2-3 times
- Include primary keyword
- Add CTA

H2: Why Choose RAGSPRO for [Service] in [Location]
- Local expertise
- Success stories
- Unique advantages

H2: Our [Service] Process
- Step-by-step breakdown
- Timeline emphasis
- Deliverables

H2: [Location]-Based Success Stories
- Local client testimonials
- Case studies with metrics
- Location-specific results

H2: Transparent Pricing for [Location] Startups
- Pricing ranges
- Package details
- ROI focus

H2: Serving [Location] Startups Since [Year]
- Company background
- Local presence
- Community involvement

H2: Frequently Asked Questions
- Location-specific FAQs
- Service FAQs
- Pricing FAQs

H2: Get Started Today
- Strong CTA
- Contact information
- Next steps
```

### Word Count Requirements

- **Minimum:** 700 words
- **Recommended:** 1000-1500 words
- **Maximum:** 2000 words (avoid keyword stuffing)

### Keyword Density

- **Primary Keyword:** 1-2% (7-14 times in 1000 words)
- **Location Name:** 5-7 times naturally
- **Service Name:** 8-10 times naturally
- **LSI Keywords:** Throughout content

### Location Mentions

**Natural Integration:**
✅ "MVP development in Delhi"
✅ "Delhi-based startups"
✅ "serving Delhi founders"
✅ "Delhi's top MVP agency"

**Avoid Keyword Stuffing:**
❌ "Delhi Delhi Delhi MVP development Delhi"
❌ Forcing location in every sentence

---

## Technical Implementation

### File Structure

```
/pages/
  mvp-development-delhi.js
  startup-development-india.js
  saas-development-bangalore.js
  ai-automation-mumbai.js
  app-development-pune.js
```

### Component Props

```jsx
<GeoLandingPage 
  location="Delhi"              // City/region name
  service="MVP Development"     // Service being offered
  coordinates={{                // Geographic coordinates
    lat: 28.6139, 
    lng: 77.2090 
  }}
  customContent={{              // Optional custom content
    hero: {...},
    about: {...},
    testimonials: [...]
  }}
/>
```

### SEO Meta Tags

```jsx
<SEOHead 
  title="[Service] [Location] | Launch in 20 Days - RAGSPRO"
  description="Build your startup [service] in [location]. Revenue-ready products from ₹85K. [Location]'s top [service] agency."
  keywords="[service] [location], startup [location], [service] agency [location]"
  canonical={`https://ragspro.com/[service]-[location]`}
/>
```

---

## SEO Optimization

### On-Page SEO Checklist

- [ ] Title tag includes location + service
- [ ] Meta description includes location + CTA
- [ ] H1 includes primary keyword
- [ ] Location mentioned in first 100 words
- [ ] Service schema with geographic data
- [ ] Google Maps embedded
- [ ] Local testimonials included
- [ ] Internal links to related pages
- [ ] Images have location in alt text
- [ ] URL is SEO-friendly

### Schema Markup Checklist

- [ ] Service schema added
- [ ] areaServed property included
- [ ] Pricing information in schema
- [ ] FAQPage schema added
- [ ] LocalBusiness schema (if applicable)
- [ ] All schema validated

### Internal Linking

**Link To:**
- Homepage
- Related service pages
- Other GEO pages
- Relevant blog posts
- Pricing page

**Link From:**
- Homepage (services section)
- Service pages
- Blog posts
- Other GEO pages

**Example:**
```jsx
<p>
  Looking for <Link href="/mvp-development-services">MVP development services</Link>? 
  We also serve startups in <Link href="/mvp-development-mumbai">Mumbai</Link> and 
  <Link href="/mvp-development-bangalore">Bangalore</Link>.
</p>
```

---

## Examples

### Example 1: MVP Development Delhi

**File:** `/pages/mvp-development-delhi.js`

**URL:** `https://ragspro.com/mvp-development-delhi`

**Primary Keyword:** "MVP development Delhi"

**Content Highlights:**
- Delhi startup ecosystem mention
- Local client testimonials
- Delhi office location
- Map of Delhi
- Delhi-specific FAQs

### Example 2: Startup Development India

**File:** `/pages/startup-development-india.js`

**URL:** `https://ragspro.com/startup-development-india`

**Primary Keyword:** "Startup development India"

**Content Highlights:**
- India-wide service coverage
- Multiple city mentions
- Indian startup success stories
- India-specific pricing
- Pan-India testimonials

### Example 3: SaaS Development Bangalore

**File:** `/pages/saas-development-bangalore.js`

**URL:** `https://ragspro.com/saas-development-bangalore`

**Primary Keyword:** "SaaS development Bangalore"

**Content Highlights:**
- Bangalore tech ecosystem
- SaaS-specific case studies
- Bangalore startup community
- Local tech events
- Bangalore office details

---

## Post-Creation Checklist

After creating a new GEO page:

### Immediate Tasks

- [ ] Test page locally
- [ ] Validate schema markup
- [ ] Check mobile responsiveness
- [ ] Test Google Maps embed
- [ ] Verify all links work
- [ ] Check image loading
- [ ] Test form submissions

### SEO Tasks

- [ ] Submit to Google Search Console
- [ ] Request indexing
- [ ] Add to sitemap
- [ ] Create internal links
- [ ] Monitor in Search Console
- [ ] Track rankings

### Content Tasks

- [ ] Add to navigation (if needed)
- [ ] Link from homepage
- [ ] Link from service pages
- [ ] Mention in blog posts
- [ ] Add to footer (if applicable)

### Marketing Tasks

- [ ] Share on social media
- [ ] Add to email signature
- [ ] Include in proposals
- [ ] Update marketing materials

---

## Maintenance

### Monthly Tasks

- [ ] Check Search Console performance
- [ ] Update rankings tracking
- [ ] Refresh testimonials
- [ ] Update case studies
- [ ] Check for broken links

### Quarterly Tasks

- [ ] Refresh content (add 100-200 words)
- [ ] Update pricing (if changed)
- [ ] Add new testimonials
- [ ] Update schema markup
- [ ] Competitive analysis

### Annual Tasks

- [ ] Complete content rewrite
- [ ] Update all statistics
- [ ] Refresh all images
- [ ] Update local information
- [ ] Comprehensive SEO audit

---

## Common Mistakes to Avoid

❌ **Duplicate Content**
- Don't copy-paste same content for different locations
- Customize each page significantly

❌ **Keyword Stuffing**
- Don't force location name unnaturally
- Maintain readability

❌ **Thin Content**
- Don't create pages with <700 words
- Add substantial, valuable content

❌ **No Local Relevance**
- Don't create generic pages
- Add location-specific information

❌ **Missing Schema**
- Don't forget geographic schema
- Include areaServed property

❌ **No Internal Links**
- Don't create orphan pages
- Link from and to other pages

---

## Resources

**Tools:**
- Google Keyword Planner (keyword research)
- Google Maps (coordinates, embed codes)
- Schema.org (schema reference)
- Google Search Console (monitoring)

**References:**
- Existing GEO pages in `/pages/`
- GeoLandingPage component in `/components/`
- Content Writing Guidelines
- SEO Validation Guide

---

**Last Updated:** December 2024
**Maintained By:** RAGSPRO SEO Team
