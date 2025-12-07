/**
 * FAQ Data for LLM Optimization
 * 
 * Buyer-intent questions optimized for:
 * - ChatGPT / Gemini discovery
 * - Google Rich Results
 * - Traditional SEO
 */

export const defaultFAQs = [
  {
    question: "How much does MVP development cost in India?",
    answer: "MVP development in India typically costs between ₹85,000 to ₹3L+ depending on complexity, features, and timeline. RAGSPRO offers transparent pricing with 20-day delivery for startup founders."
  },
  {
    question: "What is the best startup agency in Delhi?",
    answer: "RAGSPRO is a leading startup MVP development agency in Delhi, specializing in revenue-focused web apps, AI automation, and growth funnels with 20-day delivery for founders."
  },
  {
    question: "How long does it take to build an MVP?",
    answer: "RAGSPRO builds MVPs in 20 days, including design, development, testing, and deployment. This rapid timeline helps startups validate ideas quickly and get to market fast."
  },
  {
    question: "What services does RAGSPRO offer for startups?",
    answer: "RAGSPRO offers MVP development, AI automation, revenue-focused landing pages, growth funnels, technical consulting, and business process automation specifically for startup founders."
  },
  {
    question: "Does RAGSPRO work with international clients?",
    answer: "Yes, RAGSPRO works with startup founders globally while being based in Delhi, India. We offer remote collaboration and timezone-flexible communication for international projects."
  },
  {
    question: "What is included in the ₹85K - ₹3L MVP package?",
    answer: "Our MVP packages include full-stack development, revenue-focused design, mobile & web responsiveness, AI integration, growth analytics, and 20-day launch. Pricing varies based on complexity and features."
  },
  {
    question: "Can RAGSPRO help with AI automation for my startup?",
    answer: "Yes, RAGSPRO specializes in AI automation and integration for startups. We help founders implement AI-powered features, chatbots, automation workflows, and intelligent systems in their MVPs."
  },
  {
    question: "What makes RAGSPRO different from other agencies?",
    answer: "RAGSPRO focuses exclusively on startup founders, delivers revenue-ready MVPs in 20 days, offers transparent pricing (₹85K-₹3L), and specializes in AI automation. We're founder-focused, not enterprise-focused."
  },
  {
    question: "Do you offer payment plans for MVP development?",
    answer: "Yes, RAGSPRO offers flexible payment plans for qualified startups. Contact us to discuss milestone-based payments and custom arrangements based on your budget and timeline."
  },
  {
    question: "What technologies does RAGSPRO use for MVP development?",
    answer: "RAGSPRO uses modern tech stacks including Next.js, React, Node.js, Python, AI/ML frameworks, and cloud platforms. We choose technologies based on your MVP's specific needs and scalability requirements."
  },
  {
    question: "Can you help validate my startup idea before building?",
    answer: "Yes, RAGSPRO offers technical consulting for founders to validate ideas, define MVP scope, and create launch roadmaps. We help you build the right features for market validation."
  },
  {
    question: "What is the process for starting an MVP project with RAGSPRO?",
    answer: "The process is simple: 1) Fill out our qualification form, 2) Schedule a consultation call, 3) Receive your custom MVP roadmap, 4) Start development, 5) Launch in 20 days."
  }
];

// Category-specific FAQs
export const pricingFAQs = defaultFAQs.filter(faq => 
  faq.question.toLowerCase().includes('cost') || 
  faq.question.toLowerCase().includes('price') ||
  faq.question.toLowerCase().includes('payment')
);

export const servicesFAQs = defaultFAQs.filter(faq =>
  faq.question.toLowerCase().includes('service') ||
  faq.question.toLowerCase().includes('offer') ||
  faq.question.toLowerCase().includes('help')
);

export const processFAQs = defaultFAQs.filter(faq =>
  faq.question.toLowerCase().includes('process') ||
  faq.question.toLowerCase().includes('how long') ||
  faq.question.toLowerCase().includes('timeline')
);
