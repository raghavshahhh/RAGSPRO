import Layout from '../components/Layout'
import TransactionalLandingPage from '../components/TransactionalLandingPage'
import { FaRobot, FaClock, FaMoneyBillWave, FaChartLine, FaCog, FaLightbulb } from 'react-icons/fa'

export default function AIAutomationServices() {
  const pageData = {
    service: "AI Automation Services",
    title: "AI Automation That Saves 20+ Hours Per Week",
    subtitle: "Custom AI solutions for startups. Automate repetitive tasks and focus on growth.",
    description: "Professional AI automation services for Indian startups. We build custom AI solutions that save 20+ hours per week. From ChatGPT integrations to workflow automation, transparent pricing starting at ₹85,000.",
    
    benefits: [
      {
        icon: FaRobot,
        title: "Custom AI Solutions",
        description: "Tailored AI automation for your specific business needs. No generic templates."
      },
      {
        icon: FaClock,
        title: "Save 20+ Hours/Week",
        description: "Automate repetitive tasks. Free up your team to focus on revenue-generating work."
      },
      {
        icon: FaMoneyBillWave,
        title: "ROI in 30 Days",
        description: "See measurable time and cost savings within the first month of deployment."
      },
      {
        icon: FaChartLine,
        title: "Scale Without Hiring",
        description: "Handle 10x more work without adding headcount. AI scales with you."
      },
      {
        icon: FaCog,
        title: "Easy Integration",
        description: "Works with your existing tools. Slack, Gmail, Notion, Airtable, and more."
      },
      {
        icon: FaLightbulb,
        title: "Startup-Focused",
        description: "Built for lean teams. Simple, powerful, and affordable AI automation."
      }
    ],

    pricing: {
      range: "₹85K - ₹2.5L",
      description: "Transparent pricing based on automation complexity. No hidden costs.",
      note: "Most projects: ₹1.2L - ₹1.8L",
      includes: [
        "Custom AI automation solution",
        "ChatGPT/Claude API integration",
        "Workflow automation setup",
        "Integration with existing tools",
        "Training & documentation",
        "30 days of optimization support",
        "Source code & deployment",
        "Monthly usage monitoring"
      ]
    },

    process: [
      {
        title: "Audit",
        description: "Analyze your workflows. Identify tasks that can be automated with AI."
      },
      {
        title: "Design",
        description: "Create automation blueprint. Define triggers, actions, and AI prompts."
      },
      {
        title: "Build",
        description: "Develop custom AI solution. Integrate with your tools and test thoroughly."
      },
      {
        title: "Deploy",
        description: "Launch automation. Train your team and monitor performance."
      }
    ],

    faqs: [
      {
        question: "What can AI automation do for my startup?",
        answer: "Automate customer support, content generation, data entry, email responses, lead qualification, report generation, and more. We analyze your workflows and identify the best automation opportunities."
      },
      {
        question: "Do I need technical knowledge to use AI automation?",
        answer: "No! We build user-friendly solutions that anyone on your team can use. We provide training and documentation for everything."
      },
      {
        question: "What AI models do you use?",
        answer: "We use the best AI for each task: ChatGPT-4, Claude, Gemini, or custom models. We choose based on your needs and budget."
      },
      {
        question: "How much can I save with AI automation?",
        answer: "Most startups save 20-40 hours per week, which translates to ₹50K-₹1L per month in labor costs. ROI typically achieved in 30-60 days."
      },
      {
        question: "What if the AI makes mistakes?",
        answer: "We build in human review checkpoints for critical tasks. Plus, we provide 30 days of optimization to fine-tune the AI based on real usage."
      }
    ],

    cta: {
      primary: "Get AI Automation Audit",
      secondary: "Chat on WhatsApp"
    }
  }

  return (
    <Layout
      seoProps={{
        title: "AI Automation Services India | Save 20+ Hours/Week | ₹85K-₹2.5L",
        description: "Custom AI automation services for startups. Automate repetitive tasks with ChatGPT, Claude, and custom AI solutions. Transparent pricing, 30-day ROI guarantee.",
        keywords: "ai automation services, chatgpt integration, ai automation india, business process automation, ai for startups india"
      }}
    >
      <TransactionalLandingPage {...pageData} />
    </Layout>
  )
}
