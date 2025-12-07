# Qualification Logic & Scoring Guide

Complete guide for understanding and configuring the lead qualification system in RAGSPRO website.

## Table of Contents

1. [Overview](#overview)
2. [Qualification Criteria](#qualification-criteria)
3. [Scoring Algorithm](#scoring-algorithm)
4. [Lead Routing](#lead-routing)
5. [Configuration](#configuration)
6. [Testing](#testing)

---

## Overview

The qualification system automatically filters and routes leads based on budget, timeline, and idea validation status. This ensures sales team focuses on high-value, ready-to-buy leads while providing resources to others.

**Goals:**
- Qualify leads with budget ≥ ₹85K
- Prioritize leads with validated ideas
- Route low-budget leads to self-service resources
- Provide immediate next steps for all leads

---

## Qualification Criteria

### Budget Ranges

| Range | Classification | Action |
|-------|---------------|--------|
| < ₹85K | Disqualified | Route to resources |
| ₹85K - ₹1L | Low Priority | Email follow-up |
| ₹1L - ₹3L | Medium Priority | Calendar booking |
| ₹3L+ | High Priority | Immediate calendar + priority flag |

### Timeline Ranges

| Range | Classification | Impact |
|-------|---------------|--------|
| < 20 days | Urgent | +20 priority points |
| 20-30 days | Standard | +10 priority points |
| 30-60 days | Flexible | +5 priority points |
| > 60 days | Long-term | 0 priority points |

### Idea Validation Status

| Status | Classification | Impact |
|--------|---------------|--------|
| Validated | Ready | +15 priority points |
| Partially Validated | In Progress | +8 priority points |
| Not Validated | Early Stage | 0 priority points |

---

## Scoring Algorithm

### Priority Score Calculation

```javascript
function calculatePriorityScore(leadData) {
  let score = 0
  
  // Budget scoring (0-50 points)
  if (leadData.budget >= 300000) score += 50
  else if (leadData.budget >= 100000) score += 35
  else if (leadData.budget >= 85000) score += 20
  
  // Timeline scoring (0-20 points)
  if (leadData.timeline <= 20) score += 20
  else if (leadData.timeline <= 30) score += 10
  else if (leadData.timeline <= 60) score += 5
  
  // Validation scoring (0-15 points)
  if (leadData.ideaValidated === 'yes') score += 15
  else if (leadData.ideaValidated === 'partial') score += 8
  
  return score
}
```

### Priority Levels

| Score Range | Priority | Description |
|-------------|----------|-------------|
| 70-85 | High | Budget ≥ ₹3L, Timeline ≤ 20 days, Validated |
| 50-69 | Medium | Budget ₹1L-₹3L, Timeline ≤ 30 days |
| 20-49 | Low | Budget ₹85K-₹1L, Flexible timeline |
| < 20 | Disqualified | Budget < ₹85K |

---

## Lead Routing

### High Priority Leads (Score 70-85)

**Qualification:**
- Budget ≥ ₹3L
- Timeline ≤ 20 days
- Idea validated

**Actions:**
1. Show immediate calendar booking
2. Send priority notification to sales team
3. Offer expedited discovery call
4. Provide MVP roadmap template
5. Flag for founder direct contact

**Next Steps Message:**
> "Perfect! You're an ideal fit for our 20-day MVP program. Book your discovery call now and we'll create your custom MVP roadmap within 24 hours."

### Medium Priority Leads (Score 50-69)

**Qualification:**
- Budget ₹1L - ₹3L
- Timeline ≤ 30 days
- Any validation status

**Actions:**
1. Show calendar booking
2. Send standard notification to sales team
3. Provide case studies
4. Offer pricing guide
5. Schedule follow-up email

**Next Steps Message:**
> "Great! You qualify for our MVP development program. Book a discovery call to discuss your project and get a detailed proposal."

### Low Priority Leads (Score 20-49)

**Qualification:**
- Budget ₹85K - ₹1L
- Timeline flexible
- Any validation status

**Actions:**
1. Add to email nurture sequence
2. Provide educational resources
3. Offer self-service tools
4. Schedule delayed follow-up
5. No immediate calendar access

**Next Steps Message:**
> "Thanks for your interest! We've sent you our MVP development guide and pricing information. Our team will follow up within 48 hours."

### Disqualified Leads (Score < 20)

**Qualification:**
- Budget < ₹85K
- Any timeline
- Any validation status

**Actions:**
1. Route to resource library
2. Provide DIY guides
3. Recommend alternatives
4. Add to long-term nurture
5. No sales team notification

**Next Steps Message:**
> "Thanks for reaching out! Based on your budget, we recommend starting with our free MVP framework and startup resources. When you're ready to scale, we'd love to help!"

---

## Configuration

### QualificationForm Component

**Location:** `src/components/QualificationForm.jsx`

**Configuration Options:**

```javascript
const QUALIFICATION_CONFIG = {
  // Minimum budget to qualify
  minBudget: 85000,
  
  // Budget ranges
  budgetRanges: {
    low: { min: 85000, max: 100000 },
    medium: { min: 100000, max: 300000 },
    high: { min: 300000, max: Infinity }
  },
  
  // Timeline ranges (in days)
  timelineRanges: {
    urgent: { max: 20 },
    standard: { max: 30 },
    flexible: { max: 60 },
    longTerm: { max: Infinity }
  },
  
  // Priority thresholds
  priorityThresholds: {
    high: 70,
    medium: 50,
    low: 20
  },
  
  // Calendly URLs
  calendlyUrls: {
    high: 'https://calendly.com/ragspro/priority-discovery',
    medium: 'https://calendly.com/ragspro/discovery-call',
    low: null // No calendar for low priority
  }
}
```

### Chatbot Configuration

**Location:** `src/components/AIChatbot.jsx`

**Conversation Flow:**

```javascript
const CHATBOT_FLOW = [
  {
    step: 1,
    question: "What's your name?",
    field: 'name',
    validation: 'required'
  },
  {
    step: 2,
    question: "What's your budget range?",
    field: 'budget',
    options: ['< ₹85K', '₹85K - ₹1L', '₹1L - ₹3L', '₹3L+']
  },
  {
    step: 3,
    question: "When do you need to launch?",
    field: 'timeline',
    options: ['< 20 days', '20-30 days', '30-60 days', '> 60 days']
  },
  {
    step: 4,
    question: "Have you validated your idea?",
    field: 'ideaValidated',
    options: ['Yes', 'Partially', 'Not yet']
  },
  {
    step: 5,
    question: "What's your email?",
    field: 'email',
    validation: 'email'
  },
  {
    step: 6,
    question: "What's your phone number?",
    field: 'phone',
    validation: 'phone'
  },
  {
    step: 7,
    action: 'qualify',
    message: 'Analyzing your requirements...'
  }
]
```

---

## Testing

### Test Cases

#### Test Case 1: High Priority Lead

**Input:**
```javascript
{
  name: "Rahul Sharma",
  email: "rahul@startup.com",
  phone: "+919876543210",
  budget: "₹3L+",
  timeline: "< 20 days",
  ideaValidated: "Yes",
  description: "Need SaaS MVP for validated idea"
}
```

**Expected Output:**
- Priority: High
- Score: 85
- Action: Immediate calendar booking
- Message: Priority discovery call offer

#### Test Case 2: Medium Priority Lead

**Input:**
```javascript
{
  name: "Priya Patel",
  email: "priya@example.com",
  phone: "+919876543211",
  budget: "₹1L - ₹3L",
  timeline: "20-30 days",
  ideaValidated: "Partially",
  description: "Building mobile app MVP"
}
```

**Expected Output:**
- Priority: Medium
- Score: 53
- Action: Standard calendar booking
- Message: Discovery call offer

#### Test Case 3: Low Priority Lead

**Input:**
```javascript
{
  name: "Amit Kumar",
  email: "amit@example.com",
  phone: "+919876543212",
  budget: "₹85K - ₹1L",
  timeline: "30-60 days",
  ideaValidated: "Not yet",
  description: "Exploring MVP options"
}
```

**Expected Output:**
- Priority: Low
- Score: 25
- Action: Email nurture
- Message: Resources sent, follow-up in 48 hours

#### Test Case 4: Disqualified Lead

**Input:**
```javascript
{
  name: "Sneha Reddy",
  email: "sneha@example.com",
  phone: "+919876543213",
  budget: "< ₹85K",
  timeline: "> 60 days",
  ideaValidated: "Not yet",
  description: "Just starting out"
}
```

**Expected Output:**
- Priority: Disqualified
- Score: 0
- Action: Resource library
- Message: DIY guides and alternatives

### Manual Testing Steps

1. **Test Qualification Form:**
   ```bash
   # Navigate to pricing page
   # Fill form with test data
   # Verify correct routing
   # Check calendar access
   ```

2. **Test Chatbot:**
   ```bash
   # Open chatbot
   # Complete conversation flow
   # Verify qualification logic
   # Check next steps provided
   ```

3. **Test Edge Cases:**
   - Empty fields
   - Invalid email/phone
   - Boundary budget values
   - Extreme timelines

### Automated Testing

**Test File:** `__tests__/qualification.test.js`

```javascript
import { qualifyLead } from '../utils/qualification'

describe('Lead Qualification', () => {
  test('High priority lead qualification', () => {
    const lead = {
      budget: 350000,
      timeline: 15,
      ideaValidated: 'yes'
    }
    const result = qualifyLead(lead)
    expect(result.priority).toBe('high')
    expect(result.score).toBeGreaterThanOrEqual(70)
  })
  
  test('Disqualified lead routing', () => {
    const lead = {
      budget: 50000,
      timeline: 90,
      ideaValidated: 'no'
    }
    const result = qualifyLead(lead)
    expect(result.qualified).toBe(false)
    expect(result.action).toBe('resources')
  })
})
```

---

## Monitoring & Analytics

### Key Metrics to Track

1. **Qualification Rate:**
   - % of leads that qualify (budget ≥ ₹85K)
   - Target: > 60%

2. **Priority Distribution:**
   - High: 20-30%
   - Medium: 30-40%
   - Low: 20-30%
   - Disqualified: 10-20%

3. **Conversion Rate by Priority:**
   - High: Target > 40%
   - Medium: Target > 25%
   - Low: Target > 10%

4. **Calendar Booking Rate:**
   - High priority: Target > 70%
   - Medium priority: Target > 50%

### Analytics Implementation

**Track in Google Analytics:**

```javascript
// Track qualification event
gtag('event', 'lead_qualified', {
  'event_category': 'Conversion',
  'event_label': priority,
  'value': score
})

// Track calendar booking
gtag('event', 'calendar_booked', {
  'event_category': 'Conversion',
  'event_label': priority,
  'value': 1
})
```

---

## Troubleshooting

### Common Issues

**Issue:** All leads showing as disqualified
**Fix:** Check budget parsing, ensure numeric comparison

**Issue:** Calendar not opening for qualified leads
**Fix:** Verify Calendly URL, check popup blockers

**Issue:** Chatbot not collecting all data
**Fix:** Check conversation flow, verify field mapping

**Issue:** Wrong priority assignment
**Fix:** Review scoring algorithm, check threshold values

---

## Future Enhancements

### Planned Features

1. **Machine Learning Scoring:**
   - Train model on historical conversion data
   - Predict lead quality more accurately
   - Adjust scoring dynamically

2. **A/B Testing:**
   - Test different qualification thresholds
   - Optimize conversion rates
   - Find ideal budget ranges

3. **CRM Integration:**
   - Auto-sync qualified leads to CRM
   - Track lead journey
   - Measure ROI

4. **Advanced Routing:**
   - Route by service type
   - Route by location
   - Route by industry

---

**Last Updated:** December 2024
**Maintained By:** RAGSPRO Development Team
