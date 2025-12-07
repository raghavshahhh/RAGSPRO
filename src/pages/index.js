import SEOHead from '../components/SEOHead'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import ProjectsSection from '../components/ProjectsSection'
import PricingSection from '../components/PricingSection'
import ContactSection from '../components/ContactSection'
import TeamSection from '../components/TeamSection'
import AuthoritySection from '../components/AuthoritySection'
import SectionDivider from '../components/SectionDivider'
import FAQSchema from '../components/schema/FAQSchema'
import { defaultFAQs } from '../data/faqs'

export default function Home() {
  return (
    <div className="bg-white page-rails">
      <SEOHead />
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
        <SectionDivider />
        <ContactSection />
      </div>
    </div>
  )
}
