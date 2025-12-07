# Component Usage Guide

Complete guide for using all custom components in the RAGSPRO website.

## Table of Contents

1. [Conversion Components](#conversion-components)
2. [Schema Components](#schema-components)
3. [Landing Page Components](#landing-page-components)
4. [Blog Components](#blog-components)
5. [UI Components](#ui-components)

---

## Conversion Components

### QualificationForm

Smart form that qualifies leads based on budget, timeline, and idea validation.

**Location:** `src/components/QualificationForm.jsx`

**Usage:**

```jsx
import QualificationForm from '../components/QualificationForm'

<QualificationForm 
  onQualified={(leadData) => {
    // Handle qualified lead
    console.log('Qualified lead:', leadData)
  }}
  onDisqualified={(leadData) => {
    // Handle disqualified lead
    console.log('Disqualified lead:', leadData)
  }}
/>
```

**Props:**
- `onQualified` (function): Callback when lead qualifies (budget ≥ ₹85K)
- `onDisqualified` (function): Callback when lead doesn't qualify

**Qualification Logic:**
- **High Priority:** Budget ≥ ₹3L, Timeline ≤ 20 days, Idea validated
- **Medium Priority:** Budget ₹1L-₹3L, Timeline ≤ 30 days
- **Low Priority:** Budget < ₹85K or Timeline > 60 days

**Form Fields:**
- Name (required)
- Email (required)
- Phone (required)
- Budget range (required)
- Timeline (required)
- Idea validation status (required)
- Project description (optional)

---

### QualificationResult

Displays qualification result with next steps.

**Location:** `src/components/QualificationResult.jsx`

**Usage:**

```jsx
import QualificationResult from '../components/QualificationResult'

<QualificationResult 
  result={{
    qualified: true,
    priority: 'high',
    message: 'Great! You qualify for our MVP development program.',
    nextSteps: ['Book a discovery call', 'Get MVP roadmap', 'Start in 3 days']
  }}
  leadData={{
    name: 'John Doe',
    email: 'john@example.com',
    budget: '₹3L+',
    timeline: '20 days'
  }}
/>
```

**Props:**
- `result` (object): Qualification result with priority and message
- `leadData` (object): Lead information

---

### AIChatbot

AI-powered chatbot for lead qualification.

**Location:** `src/components/AIChatbot.jsx`

**Usage:**

```jsx
import AIChatbot from '../components/AIChatbot'

<AIChatbot />
```

**Features:**
- 7-step qualification flow
- Smart conversation logic
- Lead scoring algorithm
- Calendar booking integration
- Resource recommendations

**Conversation Flow:**
1. Greeting & name collection
2. Budget inquiry
3. Timeline inquiry
4. Idea validation check
5. Email collection
6. Phone collection
7. Qualification result & next steps

**No props needed** - fully self-contained.

---

### ChatbotTrigger

Floating button to open chatbot.

**Location:** `src/components/ChatbotTrigger.jsx`

**Usage:**

```jsx
import ChatbotTrigger from '../components/ChatbotTrigger'

<ChatbotTrigger />
```

**Features:**
- Floating button (bottom-right)
- Pulse animation
- Opens chatbot on click
- Mobile-optimized positioning

---

### ReviewSubmissionBox

Modal for users to submit reviews.

**Location:** `src/components/ReviewSubmissionBox.jsx`

**Usage:**

```jsx
import ReviewSubmissionBox from '../components/ReviewSubmissionBox'

const [showModal, setShowModal] = useState(false)
const [editData, setEditData] = useState(null)

<ReviewSubmissionBox 
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onReviewSubmit={(reviewData) => {
    console.log('Review submitted:', reviewData)
    // Add review to list
  }}
  editData={editData} // Optional: for editing existing review
/>
```

**Props:**
- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Callback when modal closes
- `onReviewSubmit` (function): Callback when review submitted
- `editData` (object, optional): Pre-fill data for editing

**Review Data Structure:**
```javascript
{
  name: 'John Doe',
  company: 'TechStart',
  role: 'Founder',
  email: 'john@example.com',
  review: 'Great service!',
  rating: 5
}
```

---

## Schema Components

### SchemaMarkup

Base component for adding JSON-LD schema to pages.

**Location:** `src/components/SchemaMarkup.jsx`

**Usage:**

```jsx
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

**Props:**
- `type` (string): Schema type (Organization, LocalBusiness, etc.)
- `data` (object): Schema data in JSON-LD format

---

### FAQSchema

Generates FAQPage schema for SEO.

**Location:** `src/components/FAQSchema.jsx`

**Usage:**

```jsx
import FAQSchema from '../components/FAQSchema'

const faqs = [
  {
    question: "How much does MVP development cost?",
    answer: "MVP development costs range from ₹85K to ₹3L depending on complexity."
  },
  {
    question: "How long does it take to build an MVP?",
    answer: "We can build your MVP in 20 days with our rapid development process."
  }
]

<FAQSchema faqs={faqs} />
```

**Props:**
- `faqs` (array): Array of FAQ objects with question and answer

---

### CaseStudySchema

Generates CaseStudy schema for project pages.

**Location:** `src/components/CaseStudySchema.jsx`

**Usage:**

```jsx
import CaseStudySchema from '../components/CaseStudySchema'

<CaseStudySchema 
  project={{
    name: "GLOW - Beauty Booking Platform",
    description: "Full-stack SaaS platform",
    problem: "Manual booking process",
    solution: "Automated booking system",
    results: "4.2% conversion rate, ₹50K MRR",
    metrics: {
      conversionRate: "4.2%",
      revenue: "₹50K MRR",
      timeSaved: "10 hours/week"
    }
  }}
/>
```

**Props:**
- `project` (object): Project data with problem, solution, results

---

## Landing Page Components

### GeoLandingPage

Template for geographic SEO landing pages.

**Location:** `src/components/GeoLandingPage.jsx`

**Usage:**

```jsx
import GeoLandingPage from '../components/GeoLandingPage'

<GeoLandingPage 
  location="Delhi"
  service="MVP Development"
  coordinates={{ lat: 28.6139, lng: 77.2090 }}
/>
```

**Props:**
- `location` (string): City/region name
- `service` (string): Service being offered
- `coordinates` (object): Latitude and longitude

**Features:**
- SEO-optimized content
- Google Maps embed
- Local testimonials
- Service schema with geographic data
- Multiple CTAs

---

### TransactionalLandingPage

Template for service-specific landing pages.

**Location:** `src/components/TransactionalLandingPage.jsx`

**Usage:**

```jsx
import TransactionalLandingPage from '../components/TransactionalLandingPage'

<TransactionalLandingPage 
  service="MVP Development"
  pricing="₹85K - ₹3L"
  timeline="20 days"
/>
```

**Props:**
- `service` (string): Service name
- `pricing` (string): Price range
- `timeline` (string): Delivery timeline

**Features:**
- Hero section with service focus
- Pricing transparency
- Qualification form integration
- Calendar booking
- Case studies
- FAQ section

---

## Blog Components

### BlogCTA

Call-to-action component for blog posts.

**Location:** `src/components/blog/BlogCTA.jsx`

**Usage:**

```jsx
import BlogCTA from '../components/blog/BlogCTA'

// After introduction
<BlogCTA position="after-intro" />

// Mid-content
<BlogCTA position="mid-content" />

// End of post
<BlogCTA position="end" />
```

**Props:**
- `position` (string): CTA placement (after-intro, mid-content, end)

**CTA Types by Position:**
- **after-intro:** Calendar booking focus
- **mid-content:** Resource download or guide
- **end:** Strong conversion CTA with multiple options

---

## UI Components

### SEOHead

SEO meta tags component.

**Location:** `src/components/SEOHead.jsx`

**Usage:**

```jsx
import SEOHead from '../components/SEOHead'

<SEOHead 
  title="MVP Development Services - RAGSPRO"
  description="Build your startup MVP in 20 days. Revenue-ready MVPs from ₹85K."
  keywords="MVP development, startup MVP, MVP agency India"
  ogImage="/images/og-mvp-services.jpg"
/>
```

**Props:**
- `title` (string): Page title
- `description` (string): Meta description
- `keywords` (string, optional): SEO keywords
- `ogImage` (string, optional): Open Graph image
- `canonical` (string, optional): Canonical URL

---

### RaghavAvatar

Founder avatar component with variants.

**Location:** `src/components/RaghavAvatar.jsx`

**Usage:**

```jsx
import RaghavAvatar from '../components/RaghavAvatar'

<RaghavAvatar 
  size="md"
  variant="circle-gradient"
  priority={true}
/>
```

**Props:**
- `size` (string): sm, md, lg, xl
- `variant` (string): circle, circle-gradient, square, square-xl
- `priority` (boolean): Image loading priority

---

### FAQItem

Expandable FAQ item component.

**Location:** `src/components/FAQItem.jsx`

**Usage:**

```jsx
import FAQItem from '../components/FAQItem'

<FAQItem 
  faq={{
    question: "How much does it cost?",
    answer: "Pricing starts from ₹85K for MVP development."
  }}
  index={0}
/>
```

**Props:**
- `faq` (object): Question and answer
- `index` (number): Item index for animation

---

## Best Practices

### 1. Conversion Components

- Always handle both qualified and disqualified leads
- Provide clear next steps for all lead types
- Test qualification logic with various inputs
- Monitor conversion rates

### 2. Schema Components

- Validate all schema with Google Rich Results Test
- Keep schema data accurate and up-to-date
- Include all required properties
- Test on multiple pages

### 3. Landing Pages

- Use consistent messaging across pages
- Include multiple CTAs
- Optimize for mobile
- Test conversion funnels

### 4. Blog Components

- Place CTAs strategically (after intro, mid-content, end)
- Match CTA to content context
- Track CTA click-through rates
- A/B test different CTAs

---

## Troubleshooting

### Common Issues

**Issue:** Qualification form not submitting
**Fix:** Check form validation, ensure all required fields filled

**Issue:** Schema not showing in Rich Results
**Fix:** Validate schema, check for errors, wait 24-48 hours for indexing

**Issue:** Chatbot not opening
**Fix:** Check ChatbotTrigger is imported, verify no z-index conflicts

**Issue:** Calendar not loading
**Fix:** Check Calendly URL, verify internet connection, test on different browser

---

**Last Updated:** December 2024
**Maintained By:** RAGSPRO Development Team
