import SEOHead from '../components/SEOHead'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import ProjectsSection from '../components/ProjectsSection'
import PricingSection from '../components/PricingSection'
import TeamSection from '../components/TeamSection'
import AuthoritySection from '../components/AuthoritySection'
import SectionDivider from '../components/SectionDivider'
import FAQSchema from '../components/schema/FAQSchema'
import { defaultFAQs } from '../data/faqs'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '../utils/seoConfig'

export default function Home() {
  // Generate schemas for homepage
  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema()
  ]

  return (
    <div className="bg-white page-rails">
      <SEOHead 
        title="iOS & Web App Development Agency in India | RAGSPRO"
        description="RAGSPRO is a premium app & web development agency helping startups build iOS apps, web apps, SaaS products & AI-powered solutions. Trusted by founders across India, USA, UK."
        keywords="iOS app development agency, web development agency India, startup app developers, SaaS development company, AI automation agency, mobile app development India, app development agency Delhi, iPhone app developers"
        url="https://ragspro.com"
        schema={schemas}
      />
      <FAQSchema faqs={defaultFAQs} />
      
      {/* Sticky Scroll Container */}
      <div className="relative page-canvas">
        <HeroSection />
        <ProjectsSection />
      </div>
      
      <div className="page-canvas">
        <ServicesSection />
        <SectionDivider />
        <AuthoritySection />
        <SectionDivider />
        <PricingSection />
        <SectionDivider />
        <TeamSection />
      </div>
    </div>
  )
}
