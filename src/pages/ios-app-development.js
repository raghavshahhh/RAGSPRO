import SEOHead from '../components/SEOHead'
import { useRouter } from 'next/router'
import { FaApple, FaRocket, FaCode, FaShieldAlt, FaChartLine, FaMobile } from 'react-icons/fa'
import { generateServiceSchema, generateOrganizationSchema, generateFAQSchema } from '../utils/seoConfig'

export default function iOSAppDevelopment() {
  const router = useRouter()

  const features = [
    {
      icon: <FaApple className="text-4xl text-black" />,
      title: 'Native iOS Development',
      description: 'Built with Swift & SwiftUI for optimal performance and native iOS experience'
    },
    {
      icon: <FaRocket className="text-4xl text-black" />,
      title: 'App Store Ready',
      description: 'Complete App Store submission, optimization & approval support'
    },
    {
      icon: <FaCode className="text-4xl text-black" />,
      title: 'Scalable Architecture',
      description: 'Clean code, MVVM pattern, and architecture built for growth'
    },
    {
      icon: <FaShieldAlt className="text-4xl text-black" />,
      title: 'Security First',
      description: 'End-to-end encryption, secure APIs, and data protection'
    },
    {
      icon: <FaChartLine className="text-4xl text-black" />,
      title: 'Analytics Integration',
      description: 'Firebase, Mixpanel, and custom analytics for user insights'
    },
    {
      icon: <FaMobile className="text-4xl text-black" />,
      title: 'iPhone & iPad Support',
      description: 'Universal apps optimized for all iOS devices and screen sizes'
    }
  ]

  const process = [
    { step: '1', title: 'Discovery & Planning', description: 'Understand your vision, define features, create wireframes' },
    { step: '2', title: 'UI/UX Design', description: 'iOS Human Interface Guidelines compliant design' },
    { step: '3', title: 'Development', description: 'Swift/SwiftUI development with weekly updates' },
    { step: '4', title: 'Testing & QA', description: 'Rigorous testing on real iOS devices' },
    { step: '5', title: 'App Store Launch', description: 'Submission, optimization & approval support' },
    { step: '6', title: 'Support & Updates', description: 'Post-launch support and feature updates' }
  ]

  const faqs = [
    {
      question: 'How much does iOS app development cost in India?',
      answer: 'iOS app development costs range from ₹1.5L to ₹5L+ depending on complexity. Simple apps start at ₹1.5L, while complex apps with backend, APIs, and advanced features can go up to ₹5L+. We provide transparent pricing with no hidden costs.'
    },
    {
      question: 'How long does it take to build an iOS app?',
      answer: 'Typically 4-8 weeks for a complete iOS app. Simple apps can be delivered in 3-4 weeks, while complex apps with custom features take 6-8 weeks. We follow agile development with weekly updates.'
    },
    {
      question: 'Do you build apps with Swift or SwiftUI?',
      answer: 'We primarily use SwiftUI for modern iOS apps (iOS 15+) as it offers better performance and maintainability. For apps requiring iOS 13/14 support, we use Swift with UIKit. We recommend SwiftUI for new projects.'
    },
    {
      question: 'Will my app work on both iPhone and iPad?',
      answer: 'Yes! We build universal iOS apps that work seamlessly on iPhone, iPad, and even Mac (with Mac Catalyst). The UI automatically adapts to different screen sizes while maintaining the native iOS experience.'
    },
    {
      question: 'Do you help with App Store submission?',
      answer: 'Absolutely! We handle the complete App Store submission process including app metadata, screenshots, privacy policy, and compliance. We also help with App Store Optimization (ASO) to improve discoverability.'
    },
    {
      question: 'Can you integrate payment gateways in iOS apps?',
      answer: 'Yes, we integrate Razorpay, Stripe, Apple Pay, and other payment gateways. We ensure PCI compliance and secure payment processing. In-app purchases (IAP) are also supported for subscription-based apps.'
    }
  ]

  const techStack = [
    'Swift', 'SwiftUI', 'UIKit', 'Combine', 'Core Data', 'Firebase', 
    'Alamofire', 'Kingfisher', 'Realm', 'CloudKit', 'Push Notifications'
  ]

  // Generate schemas
  const serviceSchema = generateServiceSchema(
    'iOS App Development',
    'Premium iOS app development agency in India. We build scalable iPhone apps with SwiftUI, App Store ready. Trusted by startups for iOS development.',
    'https://ragspro.com/ios-app-development'
  )

  const faqSchema = generateFAQSchema(faqs)

  const combinedSchema = [
    generateOrganizationSchema(),
    serviceSchema,
    faqSchema
  ]

  return (
    <>
      <SEOHead 
        title="iOS App Development Agency India | iPhone App Developers | RAGSPRO"
        description="Premium iOS app development agency in India. We build scalable iPhone apps with SwiftUI, App Store ready. Trusted by startups for iOS development. Get quote today."
        keywords="iOS app development agency India, iPhone app developers, SwiftUI developers, iOS app development company, mobile app development iOS, App Store development, native iOS development, Swift developers India"
        url="https://ragspro.com/ios-app-development"
        schema={combinedSchema}
      />

      <div className="min-h-screen bg-white pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaApple /> Premium iOS Development
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              iOS App Development Agency in India
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Build scalable, App Store-ready iPhone apps with RAGSPRO. We're a premium iOS development agency trusted by startups across India, USA & UK.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const event = new CustomEvent('openQuoteForm')
                  window.dispatchEvent(event)
                }}
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                Get Free Quote
              </button>
              <a
                href="https://wa.me/918826073013?text=Hi, I want to build an iOS app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black border-2 border-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose RAGSPRO for iOS Development?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50 rounded-3xl my-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our iOS App Development Process</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">iOS Technologies We Use</h2>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {techStack.map((tech, index) => (
              <span key={index} className="bg-black text-white px-6 py-3 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-black mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="bg-black text-white p-12 rounded-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your iOS App?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Get a free consultation and custom quote for your iOS app project.
            </p>
            <button
              onClick={() => {
                const event = new CustomEvent('openQuoteForm')
                window.dispatchEvent(event)
              }}
              className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              Start Your iOS Project
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
