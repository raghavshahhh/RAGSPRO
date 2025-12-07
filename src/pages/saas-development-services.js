import Layout from '../components/Layout'
import TransactionalLandingPage from '../components/TransactionalLandingPage'
import { FaCloud, FaRocket, FaMoneyBillWave, FaUsers, FaShieldAlt, FaChartLine } from 'react-icons/fa'

export default function SaaSDevelopmentServices() {
  const pageData = {
    service: "SaaS Development Services",
    title: "Build Your SaaS Product in 20 Days",
    subtitle: "Revenue-ready SaaS development for startups. From MVP to paying customers.",
    description: "Professional SaaS development services for Indian startups. We build scalable, revenue-ready SaaS products in 20 days. Multi-tenant architecture, subscription billing, and admin dashboards. Transparent pricing starting at ₹1.5L.",
    
    benefits: [
      {
        icon: FaCloud,
        title: "Multi-Tenant Architecture",
        description: "Built for scale from day one. Each customer gets isolated data and settings."
      },
      {
        icon: FaRocket,
        title: "20-Day Launch",
        description: "Get your SaaS MVP live with core features in just 20 days. Start getting customers fast."
      },
      {
        icon: FaMoneyBillWave,
        title: "Subscription Billing",
        description: "Stripe/Razorpay integration with recurring payments, trials, and plan management."
      },
      {
        icon: FaUsers,
        title: "User Management",
        description: "Complete user system with roles, permissions, team invites, and SSO support."
      },
      {
        icon: FaShieldAlt,
        title: "Enterprise-Ready",
        description: "Security, compliance, and performance built in. Ready for B2B customers."
      },
      {
        icon: FaChartLine,
        title: "Analytics Dashboard",
        description: "Track MRR, churn, usage, and key metrics. Make data-driven decisions."
      }
    ],

    pricing: {
      range: "₹1.5L - ₹3L",
      description: "Transparent pricing based on SaaS complexity. No hidden costs.",
      note: "Most SaaS MVPs: ₹2L - ₹2.5L",
      includes: [
        "Multi-tenant SaaS architecture",
        "Subscription billing (Stripe/Razorpay)",
        "User authentication & team management",
        "Admin dashboard with analytics",
        "API for integrations",
        "Email notifications & onboarding",
        "20 days delivery guarantee",
        "2 weeks post-launch support",
        "Source code & deployment"
      ]
    },

    process: [
      {
        title: "Planning",
        description: "Define your SaaS features, pricing tiers, and user flows. Create technical blueprint."
      },
      {
        title: "Architecture",
        description: "Design multi-tenant database, API structure, and billing logic. Get your approval."
      },
      {
        title: "Development",
        description: "Build SaaS in 2-week sprints. Weekly demos with working features."
      },
      {
        title: "Launch",
        description: "Deploy to production. Set up billing. Train you on admin panel and analytics."
      }
    ],

    faqs: [
      {
        question: "What's included in SaaS development?",
        answer: "Complete multi-tenant SaaS with subscription billing, user management, admin dashboard, API, email notifications, and analytics. Everything you need to start selling subscriptions."
      },
      {
        question: "Can you build a SaaS in 20 days?",
        answer: "Yes! We focus on core SaaS features that drive subscriptions. You can add advanced features later as you grow. 30+ SaaS products launched with us."
      },
      {
        question: "How do you handle multi-tenancy?",
        answer: "We use proven multi-tenant architecture with data isolation, tenant-specific settings, and scalable database design. Each customer's data is completely separate."
      },
      {
        question: "What about payment processing?",
        answer: "We integrate Stripe or Razorpay with full subscription management: trials, plan changes, prorations, invoicing, and webhooks. You keep 100% of revenue minus payment fees."
      },
      {
        question: "Can the SaaS scale to thousands of users?",
        answer: "Absolutely! We build on modern cloud infrastructure (Vercel/AWS) that auto-scales. Our SaaS products handle 10K+ users without issues."
      }
    ],

    cta: {
      primary: "Get Your SaaS Roadmap",
      secondary: "Chat on WhatsApp"
    }
  }

  return (
    <Layout
      seoProps={{
        title: "SaaS Development Services India | Launch in 20 Days | ₹1.5L-₹3L",
        description: "Professional SaaS development services for startups. Build scalable, revenue-ready SaaS products with subscription billing and multi-tenant architecture. 30+ successful launches.",
        keywords: "saas development services, saas development company india, build saas product, saas mvp development, multi-tenant saas development"
      }}
    >
      <TransactionalLandingPage {...pageData} />
    </Layout>
  )
}
