# Chatbot Configuration Guide

Complete guide for configuring and customizing the AI chatbot on RAGSPRO website.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Configuration](#configuration)
4. [Conversation Flow](#conversation-flow)
5. [Customization](#customization)
6. [Integration](#integration)

---

## Overview

The AI chatbot provides automated lead qualification through conversational interface. It collects lead information, qualifies based on budget/timeline, and routes to appropriate next steps.

**Key Features:**
- 7-step qualification flow
- Smart conversation logic
- Lead scoring algorithm
- Calendar booking integration
- Resource recommendations
- Mobile-optimized UI

**Components:**
- `AIChatbot.jsx` - Main chatbot component
- `ChatbotTrigger.jsx` - Floating trigger button

---

## Architecture

### Component Structure

```
ChatbotTrigger (Floating Button)
  └── Opens AIChatbot (Modal)
      ├── Conversation Flow
      ├── Lead Data Collection
      ├── Qualification Logic
      └── Result Display
          ├── Calendar Booking (Qualified)
          └── Resource Links (Disqualified)
```

### Data Flow

```
User Input → Validation → Data Storage → Qualification → Routing → Next Steps
```

---

## Configuration

### Basic Configuration

**Location:** `src/components/AIChatbot.jsx`

```javascript
const CHATBOT_CONFIG = {
  // Bot identity
  botName: "RAGSPRO Assistant",
  botAvatar: "/images/bot-avatar.png",
  
  // Greeting message
  greeting: "Hi! I'm here to help you launch your startup MVP. Let's see if we're a good fit!",
  
  // Qualification thresholds
  minBudget: 85000,
  budgetRanges: {
    low: "< ₹85K",
    medium: "₹85K - ₹1L",
    high: "₹1L - ₹3L",
    premium: "₹3L+"
  },
  
  // Timeline options
  timelineOptions: [
    "< 20 days",
    "20-30 days",
    "30-60 days",
    "> 60 days"
  ],
  
  // Validation options
  validationOptions: [
    "Yes, validated",
    "Partially validated",
    "Not yet"
  ],
  
  // Calendar URLs
  calendlyUrl: {
    high: "https://calendly.com/ragspro/priority-discovery",
    medium: "https://calendly.com/ragspro/discovery-call"
  },
  
  // Resource URLs
  resourceUrls: {
    mvpGuide: "/resources/mvp-guide.pdf",
    pricingGuide: "/pricing",
    caseStudies: "/projects"
  }
}
```

### Advanced Configuration

```javascript
const ADVANCED_CONFIG = {
  // Typing delay (ms)
  typingDelay: 1000,
  
  // Message animation
  animateMessages: true,
  
  // Auto-scroll
  autoScroll: true,
  
  // Save conversation
  saveConversation: true,
  
  // Analytics tracking
  trackEvents: true,
  
  // Email notifications
  sendNotifications: true,
  notificationEmail: "ragsproai@gmail.com",
  
  // CRM integration
  crmIntegration: false,
  crmWebhook: null
}
```

---

## Conversation Flow

### Step-by-Step Flow

#### Step 1: Greeting & Name

**Bot Message:**
> "Hi! I'm here to help you launch your startup MVP. Let's see if we're a good fit! What's your name?"

**User Input:** Text field
**Validation:** Required, min 2 characters
**Storage:** `leadData.name`

---

#### Step 2: Budget Inquiry

**Bot Message:**
> "Nice to meet you, [Name]! What's your budget range for MVP development?"

**User Input:** Multiple choice buttons
**Options:**
- < ₹85K
- ₹85K - ₹1L
- ₹1L - ₹3L
- ₹3L+

**Storage:** `leadData.budget`

**Logic:**
```javascript
if (budget === "< ₹85K") {
  // Flag as disqualified
  disqualified = true
}
```

---

#### Step 3: Timeline Inquiry

**Bot Message:**
> "Got it! When do you need to launch your MVP?"

**User Input:** Multiple choice buttons
**Options:**
- < 20 days (Urgent)
- 20-30 days (Standard)
- 30-60 days (Flexible)
- > 60 days (Long-term)

**Storage:** `leadData.timeline`

**Scoring:**
```javascript
if (timeline === "< 20 days") score += 20
else if (timeline === "20-30 days") score += 10
else if (timeline === "30-60 days") score += 5
```

---

#### Step 4: Idea Validation

**Bot Message:**
> "Have you validated your startup idea with potential customers?"

**User Input:** Multiple choice buttons
**Options:**
- Yes, validated
- Partially validated
- Not yet

**Storage:** `leadData.ideaValidated`

**Scoring:**
```javascript
if (validated === "Yes") score += 15
else if (validated === "Partially") score += 8
```

---

#### Step 5: Email Collection

**Bot Message:**
> "Great! What's your email address?"

**User Input:** Email field
**Validation:** Valid email format
**Storage:** `leadData.email`

---

#### Step 6: Phone Collection

**Bot Message:**
> "And your phone number?"

**User Input:** Phone field
**Validation:** Valid phone format (Indian)
**Storage:** `leadData.phone`

---

#### Step 7: Qualification & Result

**Bot Message:**
> "Analyzing your requirements..."

**Processing:**
1. Calculate priority score
2. Determine qualification status
3. Generate next steps message
4. Show appropriate CTA

**Qualified Lead:**
> "Perfect! You're an ideal fit for our 20-day MVP program. Let's schedule a discovery call to discuss your project."
> 
> [Book Discovery Call Button]

**Disqualified Lead:**
> "Thanks for your interest! Based on your budget, I recommend starting with our free MVP framework and resources. When you're ready to scale, we'd love to help!"
> 
> [Download MVP Guide Button]
> [View Resources Button]

---

## Customization

### Customizing Messages

**Edit Greeting:**

```javascript
const MESSAGES = {
  greeting: "Your custom greeting message",
  namePrompt: "What should I call you?",
  budgetPrompt: "What's your budget for this project?",
  timelinePrompt: "When do you need this done?",
  validationPrompt: "Have you validated your idea?",
  emailPrompt: "Where should I send the details?",
  phonePrompt: "Best number to reach you?",
  analyzing: "Let me check if we're a good fit...",
  qualified: "Great news! You qualify for our program.",
  disqualified: "Thanks for reaching out! Here are some resources."
}
```

### Customizing Options

**Budget Options:**

```javascript
const budgetOptions = [
  { label: "< ₹50K", value: "low", qualified: false },
  { label: "₹50K - ₹1L", value: "medium", qualified: true },
  { label: "₹1L - ₹3L", value: "high", qualified: true },
  { label: "₹3L+", value: "premium", qualified: true }
]
```

**Timeline Options:**

```javascript
const timelineOptions = [
  { label: "ASAP (< 2 weeks)", value: "urgent", score: 25 },
  { label: "1 month", value: "standard", score: 15 },
  { label: "2-3 months", value: "flexible", score: 5 },
  { label: "No rush", value: "longterm", score: 0 }
]
```

### Customizing Qualification Logic

**Edit Scoring Algorithm:**

```javascript
function calculateScore(leadData) {
  let score = 0
  
  // Budget scoring (0-50 points)
  const budgetScores = {
    "< ₹85K": 0,
    "₹85K - ₹1L": 20,
    "₹1L - ₹3L": 35,
    "₹3L+": 50
  }
  score += budgetScores[leadData.budget] || 0
  
  // Timeline scoring (0-20 points)
  const timelineScores = {
    "< 20 days": 20,
    "20-30 days": 10,
    "30-60 days": 5,
    "> 60 days": 0
  }
  score += timelineScores[leadData.timeline] || 0
  
  // Validation scoring (0-15 points)
  const validationScores = {
    "Yes, validated": 15,
    "Partially validated": 8,
    "Not yet": 0
  }
  score += validationScores[leadData.ideaValidated] || 0
  
  return score
}

function determinePriority(score) {
  if (score >= 70) return "high"
  if (score >= 50) return "medium"
  if (score >= 20) return "low"
  return "disqualified"
}
```

### Customizing UI

**Colors:**

```javascript
const CHATBOT_STYLES = {
  // Primary colors
  primaryColor: "#3b82f6",
  secondaryColor: "#1e40af",
  
  // Message colors
  botMessageBg: "#f3f4f6",
  userMessageBg: "#3b82f6",
  botMessageText: "#1f2937",
  userMessageText: "#ffffff",
  
  // Button colors
  buttonBg: "#3b82f6",
  buttonHover: "#2563eb",
  buttonText: "#ffffff",
  
  // Container
  containerBg: "#ffffff",
  headerBg: "#1e40af",
  headerText: "#ffffff"
}
```

**Dimensions:**

```javascript
const CHATBOT_DIMENSIONS = {
  // Desktop
  desktop: {
    width: "400px",
    height: "600px",
    maxHeight: "80vh"
  },
  
  // Mobile
  mobile: {
    width: "100%",
    height: "100%",
    maxHeight: "100vh"
  },
  
  // Trigger button
  trigger: {
    size: "60px",
    bottom: "20px",
    right: "20px"
  }
}
```

---

## Integration

### Calendar Integration

**Calendly Setup:**

1. Create Calendly account
2. Set up event types:
   - Priority Discovery Call (30 min)
   - Standard Discovery Call (30 min)
3. Get embed URLs
4. Add to config

**Configuration:**

```javascript
const CALENDAR_CONFIG = {
  provider: "calendly", // or "cal.com"
  
  urls: {
    high: "https://calendly.com/ragspro/priority-discovery",
    medium: "https://calendly.com/ragspro/discovery-call"
  },
  
  prefill: {
    name: true,
    email: true,
    phone: true,
    customAnswers: {
      budget: true,
      timeline: true
    }
  }
}
```

**Opening Calendar:**

```javascript
function openCalendar(priority, leadData) {
  const url = CALENDAR_CONFIG.urls[priority]
  
  // Add prefill parameters
  const params = new URLSearchParams({
    name: leadData.name,
    email: leadData.email,
    a1: leadData.budget, // Custom answer 1
    a2: leadData.timeline // Custom answer 2
  })
  
  // Open in popup
  window.open(
    `${url}?${params.toString()}`,
    'calendly',
    'width=800,height=800'
  )
}
```

### Email Notifications

**Setup:**

```javascript
async function sendNotification(leadData, qualified) {
  const response = await fetch('/api/notify-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lead: leadData,
      qualified: qualified,
      timestamp: new Date().toISOString()
    })
  })
  
  return response.json()
}
```

**Email Template:**

```
Subject: New Lead from Chatbot - [Priority]

Name: [Name]
Email: [Email]
Phone: [Phone]
Budget: [Budget]
Timeline: [Timeline]
Idea Validated: [Yes/No]

Priority: [High/Medium/Low]
Score: [Score]
Qualified: [Yes/No]

Next Steps: [Calendar booked / Resources sent]
```

### CRM Integration

**Webhook Setup:**

```javascript
async function sendToCRM(leadData) {
  const response = await fetch(ADVANCED_CONFIG.crmWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contact: {
        firstName: leadData.name.split(' ')[0],
        lastName: leadData.name.split(' ').slice(1).join(' '),
        email: leadData.email,
        phone: leadData.phone
      },
      customFields: {
        budget: leadData.budget,
        timeline: leadData.timeline,
        ideaValidated: leadData.ideaValidated,
        priority: leadData.priority,
        score: leadData.score
      },
      tags: ['chatbot-lead', leadData.priority]
    })
  })
  
  return response.json()
}
```

### Analytics Tracking

**Google Analytics:**

```javascript
function trackChatbotEvent(action, label, value) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': 'Chatbot',
      'event_label': label,
      'value': value
    })
  }
}

// Track conversation start
trackChatbotEvent('conversation_started', 'Chatbot', 1)

// Track qualification
trackChatbotEvent('lead_qualified', priority, score)

// Track calendar booking
trackChatbotEvent('calendar_opened', priority, 1)
```

---

## Testing

### Manual Testing

**Test Scenarios:**

1. **High Priority Lead:**
   - Budget: ₹3L+
   - Timeline: < 20 days
   - Validated: Yes
   - Expected: Calendar booking

2. **Medium Priority Lead:**
   - Budget: ₹1L - ₹3L
   - Timeline: 20-30 days
   - Validated: Partially
   - Expected: Calendar booking

3. **Low Priority Lead:**
   - Budget: ₹85K - ₹1L
   - Timeline: 30-60 days
   - Validated: Not yet
   - Expected: Email follow-up

4. **Disqualified Lead:**
   - Budget: < ₹85K
   - Timeline: Any
   - Validated: Any
   - Expected: Resources

### Automated Testing

```javascript
describe('Chatbot Qualification', () => {
  test('High priority lead gets calendar', () => {
    const lead = {
      budget: "₹3L+",
      timeline: "< 20 days",
      ideaValidated: "Yes, validated"
    }
    
    const result = qualifyLead(lead)
    
    expect(result.priority).toBe('high')
    expect(result.qualified).toBe(true)
    expect(result.action).toBe('calendar')
  })
  
  test('Low budget lead gets resources', () => {
    const lead = {
      budget: "< ₹85K",
      timeline: "> 60 days",
      ideaValidated: "Not yet"
    }
    
    const result = qualifyLead(lead)
    
    expect(result.qualified).toBe(false)
    expect(result.action).toBe('resources')
  })
})
```

---

## Troubleshooting

### Common Issues

**Issue:** Chatbot not opening
**Fix:** Check z-index, verify ChatbotTrigger imported

**Issue:** Messages not displaying
**Fix:** Check conversation flow, verify state management

**Issue:** Calendar not opening
**Fix:** Check Calendly URL, verify popup blockers

**Issue:** Data not saving
**Fix:** Check localStorage, verify data structure

---

## Best Practices

### 1. Keep Conversation Short
- 7 steps maximum
- Essential questions only
- Clear, concise messages

### 2. Provide Clear Options
- Use buttons for choices
- Limit to 4 options max
- Make labels descriptive

### 3. Validate Input
- Check email format
- Validate phone numbers
- Require all fields

### 4. Give Immediate Feedback
- Show typing indicator
- Confirm selections
- Display progress

### 5. Personalize Experience
- Use user's name
- Reference their answers
- Tailor next steps

---

## Future Enhancements

### Planned Features

1. **AI-Powered Responses:**
   - Natural language processing
   - Dynamic conversation flow
   - Context-aware responses

2. **Multi-Language Support:**
   - Hindi translation
   - Language detection
   - Localized content

3. **Advanced Qualification:**
   - Industry-specific questions
   - Technical requirement assessment
   - Budget breakdown tool

4. **Enhanced Integration:**
   - Direct CRM sync
   - Email automation
   - SMS notifications

---

**Last Updated:** December 2024
**Maintained By:** RAGSPRO Development Team
