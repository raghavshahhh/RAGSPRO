# Testing & Validation Checklist

Complete checklist for testing and validating all features implemented in the high-ticket conversion optimization project.

## Table of Contents

1. [Schema Validation](#schema-validation)
2. [SEO Testing](#seo-testing)
3. [Conversion Funnel Testing](#conversion-funnel-testing)
4. [Mobile Testing](#mobile-testing)
5. [Performance Testing](#performance-testing)

---

## Schema Validation

### Tools Required
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Google Search Console: https://search.google.com/search-console

### Organization Schema ✅

**Pages to Test:**
- Homepage (/)
- All pages via _document.js

**Validation Steps:**
1. [ ] Open Google Rich Results Test
2. [ ] Enter URL: https://ragspro.com
3. [ ] Verify Organization schema detected
4. [ ] Check all required properties present:
   - @context ✓
   - @type ✓
   - name ✓
   - url ✓
   - logo ✓
   - founder ✓
   - contactPoint ✓
5. [ ] Verify no errors
6. [ ] Verify no warnings

**Expected Result:** ✅ Valid Organization schema with founder, contact, and social links

---

### LocalBusiness Schema ✅

**Pages to Test:**
- Homepage (/)
- GEO landing pages

**Validation Steps:**
1. [ ] Open Google Rich Results Test
2. [ ] Enter URL: https://ragspro.com
3. [ ] Verify LocalBusiness schema detected
4. [ ] Check all required properties:
   - @context ✓
   - @type ✓
   - name ✓
   - address ✓
   - geo (coordinates) ✓
   - telephone ✓
5. [ ] Verify no errors

**Expected Result:** ✅ Valid LocalBusiness schema with accurate location data

---

### Service Schema ✅

**Pages to Test:**
- /mvp-development-delhi
- /startup-development-india
- /ai-automation-delhi
- /saas-development-india
- /app-development-delhi
- /mvp-agency-delhi

**Validation Steps:**
1. [ ] Open Google Rich Results Test
2. [ ] Enter GEO page URL
3. [ ] Verify Service schema detected
4. [ ] Check required properties:
   - @context ✓
   - @type ✓
   - serviceType ✓
   - provider ✓
   - areaServed ✓
   - hasOfferCatalog ✓
5. [ ] Verify pricing information included
6. [ ] Verify geographic data (areaServed)

**Expected Result:** ✅ Valid Service schema with geographic targeting

---

### FAQPage Schema ✅

**Pages to Test:**
- Homepage (/)
- All service landing pages
- All GEO landing pages
- Blog posts with FAQs

**Validation Steps:**
1. [ ] Open Google Rich Results Test
2. [ ] Enter page URL
3. [ ] Verify FAQPage schema detected
4. [ ] Check structure:
   - @context ✓
   - @type: FAQPage ✓
   - mainEntity array ✓
   - Each question has @type: Question ✓
   - Each answer has @type: Answer ✓
5. [ ] Verify 5-10 questions included
6. [ ] Verify buyer-intent questions present

**Expected Result:** ✅ Valid FAQPage schema with buyer-intent questions

---

### CaseStudy Schema ✅

**Pages to Test:**
- Project pages (if implemented)
- Portfolio section

**Validation Steps:**
1. [ ] Open Google Rich Results Test
2. [ ] Enter project page URL
3. [ ] Verify Article schema detected (used for case studies)
4. [ ] Check properties:
   - headline ✓
   - description ✓
   - author ✓
   - publisher ✓
   - datePublished ✓
5. [ ] Verify metrics included in content

**Expected Result:** ✅ Valid case study schema with results data

---

### Article Schema (Blog Posts) ✅

**Pages to Test:**
- /blog/mvp-cost-india
- /blog/best-mvp-agency-india
- /blog/20-day-startup-launch-case-study
- /blog/ai-automation-services-startups-india
- /blog/ai-integration-startup-ideas

**Validation Steps:**
1. [ ] Open Google Rich Results Test
2. [ ] Enter blog post URL
3. [ ] Verify Article schema detected
4. [ ] Check required properties:
   - headline ✓
   - author ✓
   - publisher ✓
   - datePublished ✓
   - image ✓
5. [ ] Verify no errors

**Expected Result:** ✅ Valid Article schema for all blog posts

---

## SEO Testing

### Google Search Console Submission

**Steps:**
1. [ ] Log into Google Search Console
2. [ ] Submit new pages for indexing:
   - [ ] /mvp-development-services
   - [ ] /ai-automation-services
   - [ ] /saas-development-services
   - [ ] /startup-consulting-services
   - [ ] /mvp-development-delhi
   - [ ] /startup-development-india
   - [ ] /ai-automation-delhi
   - [ ] /saas-development-india
   - [ ] /app-development-delhi
   - [ ] /mvp-agency-delhi
   - [ ] All new blog posts
3. [ ] Request indexing for each URL
4. [ ] Monitor indexing status (24-48 hours)
5. [ ] Check for crawl errors
6. [ ] Verify sitemap updated

---

### Lighthouse SEO Audit

**Pages to Test:**
- Homepage
- All service pages
- All GEO pages
- Blog posts

**Steps:**
1. [ ] Open Chrome DevTools
2. [ ] Go to Lighthouse tab
3. [ ] Select "SEO" category
4. [ ] Run audit
5. [ ] Verify score > 95
6. [ ] Fix any issues identified

**Common Issues to Check:**
- [ ] Meta descriptions present
- [ ] Title tags optimized
- [ ] Images have alt text
- [ ] Links are crawlable
- [ ] Page is mobile-friendly
- [ ] Font sizes readable
- [ ] Tap targets sized appropriately

**Expected Result:** SEO score > 95 on all pages

---

### Keyword Rankings

**Track Rankings For:**

**Primary Keywords:**
- MVP development India
- Startup MVP development
- MVP agency India
- MVP development Delhi
- SaaS development India
- AI automation services India

**Tools:**
- Google Search Console (Position tracking)
- Ahrefs / SEMrush (Rank tracking)
- Manual searches (Incognito mode)

**Monitoring Schedule:**
- Weekly: Check Search Console
- Monthly: Full rank tracking report
- Quarterly: Competitive analysis

---

## Conversion Funnel Testing

### Qualification Form Testing

**Test Cases:**

#### Test 1: High Priority Lead ✅
**Input:**
- Name: Rahul Sharma
- Email: rahul@startup.com
- Phone: +919876543210
- Budget: ₹3L+
- Timeline: < 20 days
- Idea Validated: Yes

**Expected Behavior:**
1. [ ] Form submits successfully
2. [ ] Qualification result shows "High Priority"
3. [ ] Calendar booking link displayed
4. [ ] Priority discovery call URL used
5. [ ] Lead data stored correctly

---

#### Test 2: Medium Priority Lead ✅
**Input:**
- Name: Priya Patel
- Email: priya@example.com
- Phone: +919876543211
- Budget: ₹1L - ₹3L
- Timeline: 20-30 days
- Idea Validated: Partially

**Expected Behavior:**
1. [ ] Form submits successfully
2. [ ] Qualification result shows "Medium Priority"
3. [ ] Calendar booking link displayed
4. [ ] Standard discovery call URL used
5. [ ] Lead data stored correctly

---

#### Test 3: Low Priority Lead ✅
**Input:**
- Name: Amit Kumar
- Email: amit@example.com
- Phone: +919876543212
- Budget: ₹85K - ₹1L
- Timeline: 30-60 days
- Idea Validated: Not yet

**Expected Behavior:**
1. [ ] Form submits successfully
2. [ ] Qualification result shows "Low Priority"
3. [ ] Email follow-up message displayed
4. [ ] Resources provided
5. [ ] No calendar link shown

---

#### Test 4: Disqualified Lead ✅
**Input:**
- Name: Sneha Reddy
- Email: sneha@example.com
- Phone: +919876543213
- Budget: < ₹85K
- Timeline: > 60 days
- Idea Validated: Not yet

**Expected Behavior:**
1. [ ] Form submits successfully
2. [ ] Disqualified message displayed
3. [ ] Resource links provided
4. [ ] No calendar link shown
5. [ ] Alternative options suggested

---

### Chatbot Testing

**Test Conversation Flow:**

1. [ ] Open chatbot
2. [ ] Verify greeting message displays
3. [ ] Enter name → Verify stored
4. [ ] Select budget → Verify stored
5. [ ] Select timeline → Verify stored
6. [ ] Select validation status → Verify stored
7. [ ] Enter email → Verify validation
8. [ ] Enter phone → Verify validation
9. [ ] Verify qualification result
10. [ ] Verify appropriate next steps shown

**Test Qualification Logic:**

**High Priority:**
- [ ] Budget ≥ ₹3L → Shows calendar
- [ ] Timeline < 20 days → Adds priority
- [ ] Validated idea → Adds priority

**Medium Priority:**
- [ ] Budget ₹1L-₹3L → Shows calendar
- [ ] Timeline 20-30 days → Standard priority

**Low Priority:**
- [ ] Budget ₹85K-₹1L → Email follow-up
- [ ] Timeline 30-60 days → Resources

**Disqualified:**
- [ ] Budget < ₹85K → Resources only
- [ ] No calendar access

---

### Calendar Integration Testing

**Test Calendly Integration:**

1. [ ] Click "Book Discovery Call" button
2. [ ] Verify Calendly popup opens
3. [ ] Verify correct event type loaded:
   - High priority → Priority discovery call
   - Medium priority → Standard discovery call
4. [ ] Verify prefill data:
   - [ ] Name prefilled
   - [ ] Email prefilled
   - [ ] Phone prefilled (if supported)
5. [ ] Complete booking
6. [ ] Verify confirmation email received
7. [ ] Verify calendar event created

**Test on Multiple Devices:**
- [ ] Desktop (Chrome)
- [ ] Desktop (Safari)
- [ ] Mobile (iOS Safari)
- [ ] Mobile (Android Chrome)
- [ ] Tablet (iPad)

---

## Mobile Testing

### Mobile CTA Testing

**Test Phone CTAs:**
1. [ ] Find phone number link
2. [ ] Tap on mobile device
3. [ ] Verify phone dialer opens
4. [ ] Verify correct number: +918700048490

**Test WhatsApp CTAs:**
1. [ ] Find WhatsApp button
2. [ ] Tap on mobile device
3. [ ] Verify WhatsApp opens
4. [ ] Verify correct number
5. [ ] Verify pre-filled message (if any)

**Test Email CTAs:**
1. [ ] Find email link
2. [ ] Tap on mobile device
3. [ ] Verify email client opens
4. [ ] Verify correct email: ragsproai@gmail.com

---

### Mobile Form Testing

**Test Form Inputs:**

1. [ ] Open form on mobile
2. [ ] Test each input type:
   - [ ] Text input (name)
   - [ ] Email input (keyboard shows @)
   - [ ] Tel input (numeric keyboard)
   - [ ] Select/dropdown (budget, timeline)
3. [ ] Verify font-size ≥ 16px (no zoom)
4. [ ] Verify tap targets ≥ 48px
5. [ ] Test form submission
6. [ ] Verify validation messages visible

**Test Qualification Form:**
- [ ] All fields accessible
- [ ] Buttons easy to tap
- [ ] No horizontal scroll
- [ ] Submit button visible
- [ ] Success message displays

**Test Review Submission:**
- [ ] Modal opens correctly
- [ ] Form fields accessible
- [ ] Keyboard doesn't hide inputs
- [ ] Submit works
- [ ] Close button accessible

---

### Mobile Calendar Testing

1. [ ] Open calendar on mobile
2. [ ] Verify responsive layout
3. [ ] Test date selection
4. [ ] Test time selection
5. [ ] Complete booking
6. [ ] Verify confirmation

---

### Sticky Contact Buttons

**Test Sticky Buttons:**
1. [ ] Load page on mobile
2. [ ] Scroll down
3. [ ] Verify contact buttons remain visible
4. [ ] Verify buttons don't overlap content
5. [ ] Test button functionality while scrolling
6. [ ] Verify z-index correct

**Buttons to Test:**
- [ ] WhatsApp button (bottom-right)
- [ ] Phone button (if sticky)
- [ ] Chatbot trigger (bottom-right)

---

## Performance Testing

### Mobile Performance

**Test with Lighthouse:**

1. [ ] Open Chrome DevTools
2. [ ] Select "Mobile" device
3. [ ] Run Lighthouse Performance audit
4. [ ] Verify metrics:
   - [ ] First Contentful Paint < 1.8s
   - [ ] Speed Index < 3.4s
   - [ ] Largest Contentful Paint < 2.5s
   - [ ] Time to Interactive < 3.8s
   - [ ] Total Blocking Time < 200ms
   - [ ] Cumulative Layout Shift < 0.1

**Target:** Performance score > 90

**Pages to Test:**
- [ ] Homepage
- [ ] Service pages
- [ ] GEO pages
- [ ] Blog posts

---

### Desktop Performance

**Test with Lighthouse:**

1. [ ] Open Chrome DevTools
2. [ ] Select "Desktop" device
3. [ ] Run Lighthouse Performance audit
4. [ ] Verify score > 95

---

### Page Load Speed

**Test with PageSpeed Insights:**

1. [ ] Go to https://pagespeed.web.dev/
2. [ ] Enter page URL
3. [ ] Run test for Mobile and Desktop
4. [ ] Verify Core Web Vitals pass:
   - [ ] LCP < 2.5s
   - [ ] FID < 100ms
   - [ ] CLS < 0.1

---

## Browser Compatibility

### Desktop Browsers

Test all pages on:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

**Check:**
- [ ] Layout correct
- [ ] Forms work
- [ ] CTAs functional
- [ ] No console errors

---

### Mobile Browsers

Test all pages on:
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Samsung Internet

**Check:**
- [ ] Responsive layout
- [ ] Touch interactions
- [ ] Forms work
- [ ] CTAs functional

---

## Accessibility Testing

### WCAG Compliance

**Test with Lighthouse Accessibility:**

1. [ ] Run Lighthouse Accessibility audit
2. [ ] Verify score > 95
3. [ ] Fix any issues:
   - [ ] Color contrast
   - [ ] Alt text on images
   - [ ] Form labels
   - [ ] Keyboard navigation
   - [ ] ARIA labels

---

### Keyboard Navigation

**Test Keyboard Access:**
1. [ ] Tab through all interactive elements
2. [ ] Verify focus indicators visible
3. [ ] Test form submission with Enter
4. [ ] Test modal close with Escape
5. [ ] Verify no keyboard traps

---

## Final Checklist

### Pre-Launch

- [ ] All schema validated
- [ ] All pages submitted to Search Console
- [ ] Lighthouse scores > 95 (SEO)
- [ ] Lighthouse scores > 90 (Performance)
- [ ] Mobile testing complete
- [ ] Conversion funnels tested
- [ ] Calendar integration working
- [ ] Forms submitting correctly
- [ ] No console errors
- [ ] No broken links

### Post-Launch Monitoring

**Week 1:**
- [ ] Check Search Console for errors
- [ ] Monitor indexing status
- [ ] Track form submissions
- [ ] Monitor calendar bookings
- [ ] Check analytics setup

**Week 2-4:**
- [ ] Track keyword rankings
- [ ] Monitor conversion rates
- [ ] Analyze user behavior
- [ ] Check for technical issues
- [ ] Review performance metrics

**Monthly:**
- [ ] Full SEO audit
- [ ] Conversion funnel analysis
- [ ] Performance review
- [ ] Content updates
- [ ] Schema validation

---

## Issue Tracking

### Known Issues

| Issue | Priority | Status | Notes |
|-------|----------|--------|-------|
| - | - | - | - |

### Resolved Issues

| Issue | Resolution | Date |
|-------|------------|------|
| - | - | - |

---

**Last Updated:** December 2024
**Maintained By:** RAGSPRO QA Team
