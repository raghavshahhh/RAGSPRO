import Layout from '../components/Layout'
import TransactionalLandingPage from '../components/TransactionalLandingPage'
import { FaRocket, FaClock, FaMoneyBillWave, FaCheckCircle, FaUsers, FaChartLine } from 'react-icons/fa'

export default function MVPDevelopmentServices() {
  const pageData = {
    service: "MVP Development Services",
    title: "Launch Your Startup MVP in 20 Days",
    subtitle: "Revenue-focused MVP development for startups. From idea to paying customers.",
    description: "Professional MVP development services for startups in India. We build revenue-ready MVPs in 20 days with transparent pricing starting at ₹85,000. Get your product to market fast with our proven startup-focused development process.",
    
    benefits: [
      {
        icon: FaRocket,
        title: "20-Day Launch",
        description: "Get your MVP live and ready for customers in just 20 days. No delays, no excuses."
      },
      {
        icon: FaMoneyBillWave,
        title: "Revenue-Focused",
        description: "Built for conversion. Every feature designed to help you get paying customers fast."
      },
      {
        icon: FaCheckCircle,
        title: "Startup-Proven",
        description: "50+ startup MVPs launched. We know what works and what doesn't."
      },
      {
        icon: FaUsers,
        title: "Founder-Friendly",
        description: "Direct access to developers. No account managers, no middlemen."
      },
      {
        icon: FaClock,
        title: "Agile Process",
        description: "Weekly demos, daily updates. You're always in the loop."
      },
      {
        icon: FaChartLine,
        title: "Growth-Ready",
        description: "Built to scale. Add features as you grow without rebuilding."
      }
    ],

    pricing: {
      range: "₹85K - ₹3L",
      description: "Transparent pricing based on your MVP scope. No hidden costs.",
      note: "Most MVPs: ₹1.5L - ₹2L",
      includes: [
        "Complete MVP development (web or mobile)",
        "Revenue-focused landing page",
        "User authentication & dashboard",
        "Payment integration (Stripe/Razorpay)",
        "Admin panel for management",
        "20 days delivery guarantee",
        "2 weeks post-launch support",
        "Source code & deployment"
      ]
    },

    process: [
      {
        title: "Discovery",
        description: "Understand your idea, users, and revenue model. Define MVP scope."
      },
      {
        title: "Design",
        description: "Create user flows and UI mockups. Get your approval before coding."
      },
      {
        title: "Development",
        description: "Build your MVP in 2-week sprints. Weekly demos to track progress."
      },
      {
        title: "Launch",
        description: "Deploy to production. Train you on admin panel. Hand over everything."
      }
    ],

    faqs: [
      {
        question: "What's included in MVP development?",
        answer: "Complete web or mobile app with core features, user authentication, payment integration, admin panel, and deployment. Everything you need to start getting paying customers."
      },
      {
        question: "Can you really build an MVP in 20 days?",
        answer: "Yes! We focus on core features that drive revenue. No bloat, no unnecessary features. 50+ startups have launched with us in 20 days."
      },
      {
        question: "What if I need changes after launch?",
        answer: "You get 2 weeks of post-launch support included. After that, we offer monthly retainers starting at ₹25K for ongoing development."
      },
      {
        question: "Do I own the source code?",
        answer: "100% yes. You get complete source code, deployment access, and documentation. No vendor lock-in."
      },
      {
        question: "What tech stack do you use?",
        answer: "Modern, proven stack: Next.js/React for web, React Native for mobile, Node.js backend, PostgreSQL/MongoDB database. All hosted on Vercel/AWS."
      }
    ],

    cta: {
      primary: "Get Your MVP Roadmap",
      secondary: "Chat on WhatsApp"
    }
  }

  return (
    <Layout
      seoProps={{
        title: "MVP Development Services India | Launch in 20 Days | ₹85K-₹3L",
        description: "Professional MVP development services for startups. Build revenue-ready MVPs in 20 days with transparent pricing. 50+ successful launches. Get your custom roadmap today.",
        keywords: "mvp development services, startup mvp development, mvp development company india, build mvp fast, mvp development cost india"
      }}
    >
      <TransactionalLandingPage {...pageData} />
    </Layout>
  )
}
