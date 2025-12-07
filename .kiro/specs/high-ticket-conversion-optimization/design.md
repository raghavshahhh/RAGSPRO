# Design Document

## Overview

This design document outlines the technical implementation strategy for transforming RAGSPRO from a generic digital agency into a high-ticket "Startup MVP Growth Agency" through strategic copy changes, SEO enhancements, schema implementations, and conversion funnel optimization. The design maintains the existing UI/UX layout while implementing data-layer improvements, content strategy shifts, and conversion optimization mechanisms.

The solution focuses on three core pillars:
1. **SEO & Discovery**: Making RAGSPRO discoverable through traditional search, local search, and LLM-based search
2. **Trust & Authority**: Building credibility through data-driven case studies, schema markup, and authority content
3. **Conversion & Qualification**: Implementing smart funnels that filter and convert high-ticket clients

## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     RAGSPRO Website                          │
│                    (Next.js 14 + React)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─── Content Layer
                              │    ├─── Copy Updates (Hero, Services, Pricing)
                              │    ├─── Blog Strategy Shift
                              │    └─── GEO Landing Pages
                              │
                              ├─── Data Layer
                              │    ├─── Schema Markup (Organization, Service, FAQ)
                              │    ├─── Case Study Schema
                              │    └─── LLM Optimization
                              │
                              ├─── Conversion Layer
                              │    ├─── Qualification Forms
                              │    ├─── AI Chatbot
                              │    └─── Calendar Integration
                              │
                              └─── External Integrations
                                   ├─── Google Business Profile
                                   ├─── Calendly/Cal.com
                                   └─── Chatbot API (Botpress/GPT)
```

### Technology Stack

**Existing Stack (No Changes):**
- Next.js 14.1.0
- React 18.2.0
- Tailwind CSS 3.3.5
- Framer Motion 12.23.24
- GSAP 3.12.2

**New Additions:**
- Schema.org structured data (JSON-LD)
- Calendly/Cal.com integration
- Chatbot integration (Botpress or GPT-3.5 API)
- Google Maps Embed API

## Components and Interfaces

### 1. Content Components (Copy Updates)

#### 1.1 HeroSection.js Updates

**Current State:**
```javascript
<h1>We build your startup in 20 days</h1>
<p>Launch your SaaS, web & AI apps fast</p>
```

**New State:**
```javascript
<h1>Launch Your Startup MVP in 20 Days</h1>
<p>Revenue-focused web apps, funnels & AI automations for founders who need users, not pretty dashboards.</p>
```

**Changes:**
- Replace generic "startup" with specific "Startup MVP"
- Add "Revenue-focused" positioning
- Target founder persona explicitly
- Emphasize outcomes over features

#### 1.2 ServicesSection.js Updates

**Current Services:**
- Mobile Apps
- Web Apps
- Landing Pages
- Data Security
- UX/UI Consultation
- 3D Design
- Brand Design

**New Service Positioning:**
- MVP Development (Mobile & Web)
- Revenue-Focused Landing Pages
- AI Automation & Integration
- Startup UX/UI Consultation
- Growth-Ready Design Systems
- Business Process Automation
- Technical Consulting for Founders

**Interface:**
```typescript
interface Service {
  title: string;
  icon: IconType;
  description: string; // NEW: Add descriptions
  targetAudience: 'startup' | 'founder' | 'business'; // NEW
  priceRange: string; // NEW: e.g., "₹85K - ₹3L"
}
```

#### 1.3 SEOHead.js Updates

**New Default Props:**
```typescript
interface SEOHeadProps {
  title?: string; // Default: "RAGSPRO | Startup MVP Development Agency | Launch in 20 Days"
  description?: string; // Default: "Build revenue-ready MVPs in 20 days. RAGSPRO helps startup founders with web apps, AI automation, and growth funnels. Delhi, India."
  keywords?: string; // Default: "startup MVP development, MVP agency India, startup development Delhi, revenue-focused MVP, AI automation for startups"
  // ... existing props
}
```

### 2. Data Layer Components (Schema Markup)

#### 2.1 SchemaMarkup Component

**New Component Structure:**
```typescript
// components/schema/SchemaMarkup.tsx
interface SchemaMarkupProps {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'CaseStudy' | 'FAQPage';
  data: Record<string, any>;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const schema = generateSchema(type, data);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### 2.2 CaseStudySchema Component

**Interface:**
```typescript
interface CaseStudy {
  name: string;
  about: string;
  client?: string;
  result: {
    metric: string; // e.g., "4.2% conversion rate"
    revenue?: string; // e.g., "$12k/month"
    timeSaved?: string; // e.g., "120+ hours"
  };
  technologies: string[];
  completionDate: string;
  url: string;
}
```

**Implementation:**
```javascript
// components/schema/CaseStudySchema.jsx
export default function CaseStudySchema({ caseStudy }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    "name": caseStudy.name,
    "about": caseStudy.about,
    "result": caseStudy.result.metric,
    "creator": {
      "@type": "Organization",
      "name": "RAGSPRO",
      "founder": "Raghav Shah"
    },
    "datePublished": caseStudy.completionDate,
    "url": caseStudy.url
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### 2.3 FAQSchema Component

**Interface:**
```typescript
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}
```

**Implementation:**
```javascript
// components/schema/FAQSchema.jsx
export default function FAQSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**Default FAQs for LLM Optimization:**
```javascript
const defaultFAQs = [
  {
    question: "How much does MVP development cost in India?",
    answer: "MVP development in India typically costs between ₹85,000 to ₹3L+ depending on complexity, features, and timeline. RAGSPRO offers transparent pricing with 20-day delivery."
  },
  {
    question: "What is the best startup agency in Delhi?",
    answer: "RAGSPRO is a leading startup MVP development agency in Delhi, specializing in revenue-focused web apps, AI automation, and growth funnels with 20-day delivery."
  },
  {
    question: "How long does it take to build an MVP?",
    answer: "RAGSPRO builds MVPs in 20 days, including design, development, testing, and deployment. This rapid timeline helps startups validate ideas quickly."
  },
  {
    question: "What services does RAGSPRO offer for startups?",
    answer: "RAGSPRO offers MVP development, AI automation, revenue-focused landing pages, growth funnels, technical consulting, and business process automation for startup founders."
  },
  {
    question: "Does RAGSPRO work with international clients?",
    answer: "Yes, RAGSPRO works with startup founders globally while being based in Delhi, India. We offer remote collaboration and timezone-flexible communication."
  }
];
```

### 3. GEO Landing Pages

#### 3.1 Page Structure

**New Pages to Create:**
```
/mvp-development-delhi
/startup-development-india
/ai-automation-delhi
/saas-development-india
/app-development-delhi
/mvp-agency-delhi
```

#### 3.2 GEO Page Component

**Template Structure:**
```typescript
interface GeoPageProps {
  location: string; // "Delhi" or "India"
  service: string; // "MVP Development", "AI Automation", etc.
  content: {
    hero: string;
    description: string;
    benefits: string[];
    testimonials: Testimonial[];
    cta: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}
```

**Component Layout:**
```javascript
// pages/mvp-development-delhi.js
export default function MVPDevelopmentDelhi() {
  return (
    <>
      <SEOHead
        title="MVP Development Agency in Delhi | RAGSPRO | 20-Day Launch"
        description="Leading MVP development agency in Delhi. Build revenue-ready startups in 20 days. AI automation, web apps, and growth funnels for founders."
        keywords="MVP development Delhi, startup agency Delhi, MVP builder Delhi, app development Delhi"
      />
      
      <ServiceSchema location="Delhi" service="MVP Development" />
      <FAQSchema faqs={delhiMVPFAQs} />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <h1>MVP Development Agency in Delhi</h1>
          <p>Build Your Startup MVP in 20 Days</p>
          
          {/* 700+ words content */}
          <div className="prose">
            {/* Location-specific content */}
          </div>
          
          {/* Google Maps Embed */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
              width="100%"
              height="450"
              loading="lazy"
            />
          </div>
          
          {/* Local Testimonials */}
          <TestimonialsSection filter="Delhi" />
          
          {/* CTAs */}
          <div className="cta-section">
            <a href="tel:+918700048490">Call Now</a>
            <a href="https://wa.me/918700048490">WhatsApp</a>
            <button onClick={openCalendar}>Book Consultation</button>
          </div>
        </div>
      </section>
    </>
  );
}
```

#### 3.3 Service Schema for GEO Pages

```javascript
// components/schema/ServiceSchema.jsx
export default function ServiceSchema({ location, service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service} in ${location}`,
    "provider": {
      "@type": "Organization",
      "name": "RAGSPRO",
      "founder": "Raghav Shah"
    },
    "serviceArea": {
      "@type": "Place",
      "address": {
        "addressLocality": location,
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "offers": {
      "@type": "Offer",
      "priceRange": "₹85,000 - ₹3,00,000",
      "priceCurrency": "INR"
    }
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 4. Conversion Components

#### 4.1 QualificationForm Component

**Interface:**
```typescript
interface QualificationFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: '< ₹50K' | '₹50K - ₹1L' | '₹1L - ₹3L' | '₹3L+';
  timeline: '< 30 days' | '30-60 days' | '60-90 days' | '90+ days';
  ideaValidated: 'yes' | 'no' | 'partially';
  description: string;
}

interface QualificationResult {
  qualified: boolean;
  score: number;
  nextStep: 'calendar' | 'resources' | 'consultation';
  message: string;
}
```

**Qualification Logic:**
```javascript
// utils/qualificationLogic.js
export function qualifyLead(formData: QualificationFormData): QualificationResult {
  let score = 0;
  
  // Budget scoring
  if (formData.budget === '₹3L+') score += 40;
  else if (formData.budget === '₹1L - ₹3L') score += 30;
  else if (formData.budget === '₹50K - ₹1L') score += 15;
  else score += 5;
  
  // Timeline scoring
  if (formData.timeline === '< 30 days') score += 30;
  else if (formData.timeline === '30-60 days') score += 25;
  else if (formData.timeline === '60-90 days') score += 15;
  else score += 5;
  
  // Validation scoring
  if (formData.ideaValidated === 'yes') score += 30;
  else if (formData.ideaValidated === 'partially') score += 15;
  else score += 5;
  
  // Determine qualification
  if (score >= 70) {
    return {
      qualified: true,
      score,
      nextStep: 'calendar',
      message: 'Great! Let\'s schedule a call to discuss your MVP.'
    };
  } else if (score >= 40) {
    return {
      qualified: true,
      score,
      nextStep: 'consultation',
      message: 'We can help! Let\'s have a quick consultation first.'
    };
  } else {
    return {
      qualified: false,
      score,
      nextStep: 'resources',
      message: 'Check out our resources to refine your idea first.'
    };
  }
}
```

#### 4.2 CalendarIntegration Component

**Interface:**
```typescript
interface CalendarConfig {
  provider: 'calendly' | 'cal.com';
  url: string;
  prefill?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}
```

**Implementation:**
```javascript
// components/CalendarIntegration.jsx
import { useEffect } from 'react';

export default function CalendarIntegration({ config, onScheduled }) {
  useEffect(() => {
    // Load Calendly widget
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const openCalendar = () => {
    if (config.provider === 'calendly') {
      window.Calendly.initPopupWidget({
        url: config.url,
        prefill: config.prefill
      });
    }
  };
  
  return (
    <button onClick={openCalendar} className="btn-primary">
      Schedule Your MVP Consultation
    </button>
  );
}
```

#### 4.3 AI Chatbot Component

**Interface:**
```typescript
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface ChatbotConfig {
  apiKey: string;
  model: 'gpt-3.5-turbo' | 'gpt-4';
  systemPrompt: string;
  qualificationQuestions: string[];
}
```

**Implementation:**
```javascript
// components/AIChatbot.jsx
import { useState } from 'react';

export default function AIChatbot({ config }) {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [leadData, setLeadData] = useState({});
  
  const systemPrompt = `You are a pre-qualification assistant for RAGSPRO, a startup MVP development agency in Delhi, India. Your goal is to:
1. Understand the user's startup idea
2. Assess their budget (₹85K - ₹3L+)
3. Determine their timeline (20-90 days)
4. Qualify if they're ready for MVP development
5. Direct qualified leads to calendar booking

Be friendly, professional, and startup-focused. Ask one question at a time.`;

  const qualificationFlow = [
    "What stage is your startup at? (Idea, Prototype, or Launched)",
    "What's your budget range for MVP development? (₹50K-₹1L, ₹1L-₹3L, or ₹3L+)",
    "What's your ideal timeline to launch? (< 30 days, 30-60 days, or 60+ days)",
    "Have you validated your idea with potential users? (Yes/No/Partially)"
  ];
  
  const sendMessage = async (userMessage) => {
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);
    
    // Call GPT API
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: userMessage }],
        systemPrompt
      })
    });
    
    const data = await response.json();
    
    // Add assistant response
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: data.message,
      timestamp: new Date()
    }]);
    
    // Check if qualification is complete
    if (data.qualified) {
      // Show calendar booking
      showCalendarCTA();
    }
  };
  
  return (
    <div className={`chatbot-container ${isOpen ? 'open' : 'closed'}`}>
      {/* Chatbot UI */}
    </div>
  );
}
```

### 5. Blog Strategy Components

#### 5.1 BlogPost Component Updates

**New Structure:**
```typescript
interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: 'buyer-intent' | 'educational' | 'case-study';
  keywords: string[];
  cta: {
    text: string;
    action: 'calendar' | 'form' | 'whatsapp';
    position: 'after-intro' | 'mid-content' | 'end';
  };
}
```

**CTA Component:**
```javascript
// components/blog/BlogCTA.jsx
export default function BlogCTA({ type, position }) {
  if (position === 'after-intro') {
    return (
      <div className="blog-cta bg-black text-white p-6 rounded-lg my-8">
        <h3 className="text-xl font-bold mb-2">
          Building an MVP?
        </h3>
        <p className="mb-4">
          Get your 15-minute launch roadmap consultation
        </p>
        <button className="btn-primary">
          Schedule Free Consultation
        </button>
      </div>
    );
  }
  
  // Other CTA variations...
}
```

#### 5.2 New Blog Posts to Create

**Buyer-Intent Posts:**
```javascript
const buyerIntentPosts = [
  {
    title: "Best MVP Development Agency in India 2024",
    slug: "best-mvp-development-agency-india",
    keywords: ["MVP development agency", "best MVP builder India", "startup development company"],
    targetIntent: "comparison"
  },
  {
    title: "How Much Does It Cost to Build an MVP in India?",
    slug: "mvp-development-cost-india",
    keywords: ["MVP cost India", "MVP pricing", "startup development cost"],
    targetIntent: "pricing"
  },
  {
    title: "20-Day Startup Launch: Complete Case Study",
    slug: "20-day-startup-launch-case-study",
    keywords: ["rapid MVP development", "20-day launch", "startup case study"],
    targetIntent: "proof"
  },
  {
    title: "Best AI Automation Services for Startups in India",
    slug: "ai-automation-services-startups-india",
    keywords: ["AI automation India", "startup automation", "AI services Delhi"],
    targetIntent: "service-specific"
  }
];
```

## Data Models

### Project Data Model (Enhanced)

```typescript
interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  url: string;
  client?: string;
  industry: string;
  technologies: string[];
  completionDate: Date;
  
  // NEW: Metrics for case study
  metrics: {
    conversionRate?: string; // e.g., "4.2%"
    revenue?: string; // e.g., "$12k/month"
    timeSaved?: string; // e.g., "120+ hours"
    userGrowth?: string; // e.g., "500+ users in 30 days"
    customMetric?: {
      label: string;
      value: string;
    };
  };
  
  // NEW: Case study details
  caseStudy?: {
    problem: string;
    solution: string;
    results: string[];
    testimonial?: {
      text: string;
      author: string;
      role: string;
    };
  };
}
```

### Lead Data Model

```typescript
interface Lead {
  id: string;
  createdAt: Date;
  source: 'website-form' | 'chatbot' | 'whatsapp' | 'phone' | 'gmb';
  
  // Contact info
  name: string;
  email: string;
  phone: string;
  
  // Qualification data
  projectType: string;
  budget: string;
  timeline: string;
  ideaValidated: string;
  description: string;
  
  // Scoring
  qualificationScore: number;
  qualified: boolean;
  
  // Status
  status: 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'won' | 'lost';
  assignedTo?: string;
  
  // Follow-up
  nextFollowUp?: Date;
  notes: string[];
}
```

### FAQ Data Model

```typescript
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'services' | 'process' | 'technical' | 'general';
  keywords: string[];
  targetAudience: 'founder' | 'business' | 'developer';
  priority: number; // For LLM optimization
}
```

## Error Handling

### Form Validation

```javascript
// utils/validation.js
export function validateQualificationForm(data) {
  const errors = {};
  
  if (!data.name || data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!data.phone || !/^\+?[\d\s-]{10,}$/.test(data.phone)) {
    errors.phone = 'Valid phone number is required';
  }
  
  if (!data.budget) {
    errors.budget = 'Budget selection is required';
  }
  
  if (!data.timeline) {
    errors.timeline = 'Timeline selection is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

### API Error Handling

```javascript
// utils/apiErrorHandler.js
export function handleAPIError(error) {
  if (error.response) {
    // Server responded with error
    return {
      message: error.response.data.message || 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'Network error. Please check your connection.',
      status: 0
    };
  } else {
    // Something else happened
    return {
      message: 'An unexpected error occurred',
      status: -1
    };
  }
}
```

### Chatbot Fallback

```javascript
// components/AIChatbot.jsx
const handleChatbotError = (error) => {
  console.error('Chatbot error:', error);
  
  // Fallback to form
  setMessages(prev => [...prev, {
    role: 'assistant',
    content: 'I apologize, but I\'m having trouble right now. Would you like to fill out our quick form instead?',
    timestamp: new Date()
  }]);
  
  // Show form CTA
  showFallbackForm();
};
```

## Testing Strategy

### Unit Testing

**Components to Test:**
1. QualificationForm - validation logic
2. qualifyLead function - scoring algorithm
3. Schema generation functions
4. Blog CTA rendering
5. Calendar integration

**Example Test:**
```javascript
// __tests__/qualificationLogic.test.js
import { qualifyLead } from '../utils/qualificationLogic';

describe('qualifyLead', () => {
  it('should qualify high-budget, short-timeline leads', () => {
    const formData = {
      budget: '₹3L+',
      timeline: '< 30 days',
      ideaValidated: 'yes'
    };
    
    const result = qualifyLead(formData);
    
    expect(result.qualified).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.nextStep).toBe('calendar');
  });
  
  it('should not qualify low-budget leads', () => {
    const formData = {
      budget: '< ₹50K',
      timeline: '90+ days',
      ideaValidated: 'no'
    };
    
    const result = qualifyLead(formData);
    
    expect(result.qualified).toBe(false);
    expect(result.nextStep).toBe('resources');
  });
});
```

### Integration Testing

**Scenarios to Test:**
1. Form submission → Qualification → Calendar booking flow
2. Chatbot conversation → Lead capture → CRM integration
3. Blog CTA click → Form open → Submission
4. GEO page load → Schema rendering → Map display

### SEO Testing

**Tools & Checks:**
1. Google Rich Results Test - Validate schema markup
2. Schema.org Validator - Check JSON-LD syntax
3. Google Search Console - Monitor indexing
4. Lighthouse SEO audit - Score > 95
5. Mobile-friendly test - Pass all checks

### A/B Testing

**Elements to Test:**
1. Hero headline variations
2. CTA button text
3. Qualification form length
4. Blog CTA placement
5. Calendar vs. Form conversion

**Metrics to Track:**
- Conversion rate (visitor → lead)
- Qualification rate (lead → qualified)
- Booking rate (qualified → scheduled)
- Cost per qualified lead
- Time to first contact



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Service descriptions use startup-focused language

*For any* service description rendered on the website, the text should contain startup-focused keywords (MVP, founder, startup, revenue, growth) and should not contain generic agency terms (solutions, services, digital transformation)

**Validates: Requirements 1.4**

### Property 2: SEO meta tags include positioning keywords

*For any* page that generates SEO meta tags, the title or description should include either "Startup MVP" or "Growth Agency" or both

**Validates: Requirements 1.5**

### Property 3: Projects with metrics display data badges

*For any* project that has metrics data (conversion rate, revenue, or time saved), at least one metric badge should be rendered on the project card

**Validates: Requirements 2.1, 2.3**

### Property 4: Project pages include valid Case Study schema

*For any* project page that is rendered, the HTML should contain valid JSON-LD schema with @type "CaseStudy" and a result field

**Validates: Requirements 2.2, 2.4, 2.5**

### Property 5: Blog posts contain transactional keywords

*For any* blog post content, the text should include at least two transactional keywords from the set: {cost, best, agency, services, pricing, top, leading}

**Validates: Requirements 3.1, 3.4**

### Property 6: Blog posts display CTAs after introduction

*For any* blog post page, a CTA component should be rendered within the first 500 words of content

**Validates: Requirements 3.2, 3.5**

### Property 7: Blog CTAs navigate to conversion points

*For any* blog CTA that is clicked, the system should either open a calendar widget, display a qualification form, or navigate to a WhatsApp link

**Validates: Requirements 3.3**

### Property 8: GEO pages contain sufficient content

*For any* geographic landing page, the main content area should contain at least 700 words of text

**Validates: Requirements 4.2**

### Property 9: GEO pages embed Google Maps

*For any* geographic landing page, the HTML should contain an iframe element with a Google Maps embed URL

**Validates: Requirements 4.3**

### Property 10: GEO pages include required CTAs

*For any* geographic landing page, the page should contain all three elements: testimonials section, phone link (tel:), and WhatsApp link (wa.me)

**Validates: Requirements 4.5**

### Property 11: Service schema includes geographic data

*For any* Service schema generated for a GEO page, the JSON-LD should include a serviceArea object with addressLocality and addressCountry fields

**Validates: Requirements 4.4**

### Property 12: FAQ schema includes buyer-intent questions

*For any* FAQ schema generated, at least 60% of the questions should contain buyer-intent keywords (cost, price, best, how much, which, top)

**Validates: Requirements 5.1, 5.3**

### Property 13: FAQ schema follows FAQPage format

*For any* FAQ structured data, the JSON-LD should have @type "FAQPage" and mainEntity array with Question objects containing acceptedAnswer fields

**Validates: Requirements 5.2**

### Property 14: Schema markup passes validation

*For any* schema markup generated (Organization, Service, CaseStudy, FAQPage), the JSON-LD should pass schema.org validation without errors

**Validates: Requirements 5.5, 10.1, 10.2, 10.3, 10.4, 10.5**

### Property 15: Qualification forms collect required fields

*For any* qualification form submission, the data object should include all required fields: budget, timeline, and ideaValidated

**Validates: Requirements 7.1, 7.4**

### Property 16: Low-budget leads route to resources

*For any* form submission where budget is "< ₹50K" or "₹50K - ₹1L", the qualification result should have nextStep set to "resources" and qualified set to false

**Validates: Requirements 7.2**

### Property 17: High-budget leads access calendar

*For any* form submission where budget is "₹1L - ₹3L" or "₹3L+" and timeline is "< 30 days" or "30-60 days", the qualification result should provide calendar access

**Validates: Requirements 7.3, 7.5**

### Property 18: Chatbot follows qualification flow

*For any* chatbot conversation, the first three questions asked should cover startup stage, budget range, and timeline (in any order)

**Validates: Requirements 8.1**

### Property 19: Chatbot qualifies leads correctly

*For any* chatbot conversation where user indicates budget ≥ ₹1L and timeline ≤ 60 days, the chatbot should provide a calendar booking link

**Validates: Requirements 8.2**

### Property 20: Chatbot provides alternatives for disqualified leads

*For any* chatbot conversation where user indicates budget < ₹50K or timeline > 90 days, the chatbot should provide resource links instead of calendar

**Validates: Requirements 8.3**

### Property 21: Chatbot stores lead data

*For any* completed chatbot conversation, the system should store a lead record with name, contact info, and qualification responses

**Validates: Requirements 8.4**

### Property 22: Chatbot conversations end with next steps

*For any* chatbot conversation that reaches completion, the final message should include either a calendar link, form link, or resource link

**Validates: Requirements 8.5**

### Property 23: Landing pages include conversion elements

*For any* transactional landing page, the page should contain all three elements: service description, pricing information, and at least one CTA button

**Validates: Requirements 11.2**

### Property 24: Landing pages display pricing ranges

*For any* landing page with pricing information, the displayed price should be in the format "₹X - ₹Y" or "₹X+"

**Validates: Requirements 11.3**

### Property 25: Landing page CTAs navigate correctly

*For any* CTA button clicked on a landing page, the action should either open a calendar widget or display a qualification form

**Validates: Requirements 11.4**

### Property 26: Landing pages target transactional keywords

*For any* landing page content, the text should include at least three transactional keywords from the set: {cost, pricing, best, top, agency, services, development}

**Validates: Requirements 11.5**

### Property 27: Mobile CTAs use direct action links

*For any* CTA rendered on a mobile viewport (width < 768px), phone CTAs should use "tel:" protocol and WhatsApp CTAs should use "wa.me" or "api.whatsapp.com" URLs

**Validates: Requirements 12.1**

### Property 28: Mobile forms use optimized inputs

*For any* form rendered on a mobile viewport, email inputs should have type="email", phone inputs should have type="tel", and all inputs should have font-size ≥ 16px

**Validates: Requirements 12.2**

### Property 29: Mobile maintains sticky contact buttons

*For any* page scrolled on a mobile viewport, contact buttons should remain visible with position: fixed or position: sticky

**Validates: Requirements 12.4**

### Property 30: Mobile pages load quickly

*For any* page loaded on a mobile device or simulated mobile viewport, the Time to Interactive (TTI) should be less than 3 seconds on a 4G connection

**Validates: Requirements 12.5**

