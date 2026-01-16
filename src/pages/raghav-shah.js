import SEOHead from '../components/SEOHead'
import Image from 'next/image'

export default function RaghavShah() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raghav Shah',
    jobTitle: 'Founder & CEO',
    worksFor: {
      '@type': 'Organization',
      name: 'RAGSPRO',
      url: 'https://ragspro.com'
    },
    url: 'https://ragspro.com/raghav-shah',
    sameAs: [
      'https://linkedin.com/in/raghavshahhh',
      'https://github.com/raghavshahhh',
      'https://twitter.com/ragspro',
      'https://instagram.com/ragspro.ai'
    ],
    knowsAbout: [
      'iOS App Development',
      'Web Application Development',
      'SaaS Architecture',
      'AI Integration',
      'Startup Technology Strategy'
    ],
    alumniOf: 'Software Engineering',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Delhi',
      addressCountry: 'India'
    }
  }

  return (
    <>
      <SEOHead 
        title="Raghav Shah - Founder of RAGSPRO | iOS & Web App Development"
        description="Raghav Shah is the founder of RAGSPRO, an app & web development agency in India focused on building scalable iOS apps and AI-powered systems for startups."
        keywords="Raghav Shah, RAGSPRO founder, iOS developer, app development agency founder, startup technology consultant"
        url="https://ragspro.com/raghav-shah"
        schema={personSchema}
      />

      <div className="min-h-screen bg-white pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-6">
          {/* Header with Photo */}
          <header className="mb-12 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-black flex items-center justify-center">
              <span className="text-white text-4xl font-bold">RS</span>
            </div>
            <h1 className="text-5xl font-bold text-black mb-4">Raghav Shah</h1>
            <p className="text-2xl text-gray-600 mb-6">Founder & CEO of RAGSPRO</p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://linkedin.com/in/raghavshahhh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-gray-300">•</span>
              <a 
                href="https://github.com/raghavshahhh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                GitHub
              </a>
              <span className="text-gray-300">•</span>
              <a 
                href="https://twitter.com/ragspro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Twitter
              </a>
            </div>
          </header>

          {/* Overview */}
          <section className="mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Raghav Shah is the founder of RAGSPRO, an app & web development agency in India focused on 
              building scalable iOS apps and AI-powered systems for startups.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Based in New Delhi, Raghav specializes in iOS app development, web application architecture, 
              and startup technology strategy. He has helped 50+ startups launch revenue-ready applications 
              across India, USA, UK, and other countries.
            </p>
          </section>

          {/* Background */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Background</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Raghav founded RAGSPRO with a vision to help startups launch revenue-ready applications quickly. 
              Under his leadership, RAGSPRO has evolved from a solo operation to a premium development agency 
              serving clients globally.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              His approach focuses on scalable architecture, modern technology stacks, and rapid delivery. 
              RAGSPRO's signature 20-day MVP delivery model has helped numerous startups validate their ideas 
              and launch to market quickly.
            </p>
          </section>

          {/* Expertise */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Expertise</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">iOS App Development</h3>
                <p className="text-gray-700">
                  Expert in Swift and SwiftUI for building native iOS applications. Specializes in 
                  App Store optimization and scalable iOS architecture.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">Web Application Architecture</h3>
                <p className="text-gray-700">
                  Proficient in React, Next.js, and Node.js for building modern web applications. 
                  Focus on performance, scalability, and user experience.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">SaaS Platform Development</h3>
                <p className="text-gray-700">
                  Experience building subscription-based platforms with multi-tenant architecture, 
                  payment integration, and admin dashboards.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">AI Integration & Automation</h3>
                <p className="text-gray-700">
                  Skilled in integrating OpenAI, Gemini, and Claude APIs. Builds AI chatbots, 
                  workflow automation, and intelligent systems.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">Startup Technology Strategy</h3>
                <p className="text-gray-700">
                  Advises startups on technology decisions, architecture planning, and MVP development. 
                  Acts as fractional CTO for early-stage companies.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-3">Full-Stack Development</h3>
                <p className="text-gray-700">
                  End-to-end development from frontend to backend, database design, cloud deployment, 
                  and DevOps automation.
                </p>
              </div>
            </div>
          </section>

          {/* Notable Projects */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Notable Projects</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-bold text-black mb-2">LAWAI - AI Legal Assistant</h3>
                <p className="text-gray-700 mb-2">
                  Built a SaaS platform providing AI-powered legal document analysis and consultation. 
                  Integrated OpenAI for intelligent document processing and Stripe for subscription management.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact:</strong> 300+ active users, $8K monthly revenue
                </p>
              </div>
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-bold text-black mb-2">Lead Generator Platform</h3>
                <p className="text-gray-700 mb-2">
                  Developed a B2B lead generation platform with AI-powered prospecting and automated outreach. 
                  Built with Next.js, Python, and multiple API integrations.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact:</strong> 400+ qualified leads generated, 6.2% conversion rate
                </p>
              </div>
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-bold text-black mb-2">Subtitle Generator</h3>
                <p className="text-gray-700 mb-2">
                  Created an AI-powered video subtitle generation tool using speech recognition and NLP. 
                  Supports multiple languages and export formats.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact:</strong> 250+ users, 200+ hours saved in manual work
                </p>
              </div>
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-bold text-black mb-2">E-commerce Platform</h3>
                <p className="text-gray-700 mb-2">
                  Built a complete e-commerce platform with inventory management, payment processing, 
                  and order fulfillment automation.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Impact:</strong> ₹30-40K monthly revenue, 180+ bookings
                </p>
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Technology Stack</h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold text-black mb-2">Languages</h3>
                  <p className="text-gray-700 text-sm">JavaScript, TypeScript, Swift, Python</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">Frontend</h3>
                  <p className="text-gray-700 text-sm">React, Next.js, SwiftUI, Tailwind CSS</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">Backend</h3>
                  <p className="text-gray-700 text-sm">Node.js, Express, Firebase, Supabase</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">Database</h3>
                  <p className="text-gray-700 text-sm">PostgreSQL, MongoDB, Redis</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">Cloud</h3>
                  <p className="text-gray-700 text-sm">AWS, Vercel, Railway, Netlify</p>
                </div>
                <div>
                  <h3 className="font-bold text-black mb-2">AI/ML</h3>
                  <p className="text-gray-700 text-sm">OpenAI, Gemini, Claude, LangChain</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Contact</h2>
            <div className="bg-black text-white p-8 rounded-xl">
              <p className="text-lg mb-6">
                Interested in working together or discussing your startup idea?
              </p>
              <ul className="space-y-3">
                <li><strong>Email:</strong> ragsproai@gmail.com</li>
                <li><strong>Phone:</strong> +91 87000 48490</li>
                <li><strong>Company:</strong> <a href="https://ragspro.com" className="text-white hover:underline">RAGSPRO</a></li>
                <li><strong>Location:</strong> New Delhi, India</li>
              </ul>
              <div className="mt-6 flex gap-4">
                <a 
                  href="https://linkedin.com/in/raghavshahhh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Connect on LinkedIn
                </a>
                <a 
                  href="https://wa.me/918826073013" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
