import Layout from '../components/Layout'
import TransactionalLandingPage from '../components/TransactionalLandingPage'
import { FaLightbulb, FaChartLine, FaCode, FaRocket, FaUsers, FaMoneyBillWave } from 'react-icons/fa'

export default function StartupConsultingServices() {
  const pageData = {
    service: "Startup Consulting Services",
    title: "Technical Consulting for Non-Technical Founders",
    subtitle: "Get expert guidance on tech decisions, MVP planning, and product strategy.",
    description: "Professional startup consulting services for non-technical founders in India. We help you make smart tech decisions, plan your MVP, choose the right stack, and avoid costly mistakes. Transparent pricing starting at ₹25,000.",
    
    benefits: [
      {
        icon: FaLightbulb,
        title: "Idea Validation",
        description: "Validate your startup idea with market research, competitor analysis, and feasibility assessment."
      },
      {
        icon: FaChartLine,
        title: "MVP Planning",
        description: "Define your MVP scope, features, and timeline. Get a clear roadmap to launch."
      },
      {
        icon: FaCode,
        title: "Tech Stack Selection",
        description: "Choose the right technology for your product. Avoid over-engineering and under-delivering."
      },
      {
        icon: FaRocket,
        title: "Launch Strategy",
        description: "Plan your go-to-market strategy, pricing, and early customer acquisition."
      },
      {
        icon: FaUsers,
        title: "Team Building",
        description: "Hire the right developers, designers, and contractors. Avoid bad hires."
      },
      {
        icon: FaMoneyBillWave,
        title: "Cost Optimization",
        description: "Build your MVP on a budget. Get more features for less money."
      }
    ],

    pricing: {
      range: "₹25K - ₹1L",
      description: "Flexible consulting packages based on your needs. No long-term contracts.",
      note: "Most founders: ₹50K - ₹75K",
      includes: [
        "1-on-1 consulting sessions",
        "MVP scope & feature planning",
        "Tech stack recommendations",
        "Cost & timeline estimates",
        "Vendor/developer evaluation",
        "Product roadmap creation",
        "Ongoing email support",
        "Access to startup resources"
      ]
    },

    process: [
      {
        title: "Discovery",
        description: "Understand your idea, goals, and constraints. Identify key challenges."
      },
      {
        title: "Analysis",
        description: "Research market, competitors, and technical feasibility. Create options."
      },
      {
        title: "Planning",
        description: "Define MVP scope, tech stack, timeline, and budget. Create detailed roadmap."
      },
      {
        title: "Execution",
        description: "Guide you through development. Review progress and provide ongoing advice."
      }
    ],

    faqs: [
      {
        question: "Who is this consulting for?",
        answer: "Non-technical founders who need help with tech decisions, MVP planning, developer hiring, or product strategy. Perfect if you have an idea but don't know where to start."
      },
      {
        question: "What's the difference between consulting and development?",
        answer: "Consulting is advice and planning. Development is building the actual product. Many founders start with consulting to validate their idea and plan their MVP before investing in development."
      },
      {
        question: "How long does consulting take?",
        answer: "Depends on your needs. Quick questions: 1-2 sessions. Full MVP planning: 2-4 weeks. We work at your pace."
      },
      {
        question: "Can you help me hire developers?",
        answer: "Yes! We help you write job descriptions, evaluate candidates, review portfolios, and conduct technical interviews. We can also recommend trusted development partners."
      },
      {
        question: "What if I decide to build with you after consulting?",
        answer: "Great! We credit 50% of your consulting fees toward development. So consulting is risk-free."
      }
    ],

    cta: {
      primary: "Book Free Consultation",
      secondary: "Chat on WhatsApp"
    }
  }

  return (
    <Layout
      seoProps={{
        title: "Startup Consulting Services India | For Non-Technical Founders | ₹25K+",
        description: "Professional startup consulting for non-technical founders. Get expert guidance on MVP planning, tech decisions, and product strategy. 50+ startups advised. Book free consultation.",
        keywords: "startup consulting services, technical consulting for founders, mvp consulting india, startup advisor india, non-technical founder help"
      }}
    >
      <TransactionalLandingPage {...pageData} />
    </Layout>
  )
}
