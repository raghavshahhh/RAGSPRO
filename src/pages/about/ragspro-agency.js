import SEOHead from '../../components/SEOHead'
import { generateOrganizationSchema } from '../../utils/seoConfig'

export default function AboutRAGSPRO() {
  const schema = generateOrganizationSchema()

  return (
    <>
      <SEOHead 
        title="About RAGSPRO - App & Web Development Agency in India"
        description="RAGSPRO is an India-based app and web development agency founded by Raghav Shah in New Delhi. Specializing in iOS apps, SaaS platforms, and AI automation for startups."
        keywords="RAGSPRO, app development agency India, Raghav Shah, iOS development company, web development agency Delhi"
        url="https://ragspro.com/about/ragspro-agency"
        schema={schema}
      />

      <div className="min-h-screen bg-white pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-5xl font-bold text-black mb-6">RAGSPRO</h1>
            <p className="text-xl text-gray-600">
              App & Web Development Agency in India
            </p>
          </header>

          {/* Overview */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              RAGSPRO is an India-based app and web development agency founded by Raghav Shah in New Delhi. 
              The agency specializes in iOS app development, web application development, SaaS platforms, 
              and AI automation services for startups and growing businesses.
            </p>
          </section>

          {/* History */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">History</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              RAGSPRO was founded with a focus on helping startups launch revenue-ready applications quickly. 
              The agency has since delivered 50+ projects for clients across India, USA, UK, Canada, and Singapore.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Based in New Delhi, India, RAGSPRO serves both domestic and international clients, with a 
              particular focus on startup founders and growing businesses requiring scalable technology solutions.
            </p>
          </section>

          {/* Services */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Services</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The agency offers comprehensive development services:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-black font-bold mr-3">•</span>
                <div>
                  <strong className="text-black">iOS App Development</strong>
                  <p className="text-gray-700">Native iOS applications using Swift and SwiftUI for iPhone and iPad</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3">•</span>
                <div>
                  <strong className="text-black">Web App Development</strong>
                  <p className="text-gray-700">Modern web applications using React, Next.js, and Node.js</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3">•</span>
                <div>
                  <strong className="text-black">SaaS Platform Development</strong>
                  <p className="text-gray-700">Subscription-based platforms with multi-tenant architecture</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3">•</span>
                <div>
                  <strong className="text-black">AI Automation</strong>
                  <p className="text-gray-700">AI chatbots, workflow automation, and intelligent systems</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3">•</span>
                <div>
                  <strong className="text-black">MVP Development</strong>
                  <p className="text-gray-700">Rapid MVP development with 20-day delivery for startups</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-3">•</span>
                <div>
                  <strong className="text-black">Startup Consulting</strong>
                  <p className="text-gray-700">Technology strategy, architecture planning, and CTO advisory</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Technology */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Technology</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              RAGSPRO uses modern technology stacks to build scalable and maintainable applications:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Frontend</h3>
                <p className="text-gray-700">React, Next.js, SwiftUI, UIKit, Tailwind CSS</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Backend</h3>
                <p className="text-gray-700">Node.js, Python, Firebase, Express.js</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Database</h3>
                <p className="text-gray-700">PostgreSQL, MongoDB, Redis, Supabase</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Cloud & DevOps</h3>
                <p className="text-gray-700">AWS, Vercel, Railway, Docker, GitHub Actions</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">AI & ML</h3>
                <p className="text-gray-700">OpenAI, Google Gemini, Claude, LangChain</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Mobile</h3>
                <p className="text-gray-700">Swift, SwiftUI, React Native, Flutter</p>
              </div>
            </div>
          </section>

          {/* Notable Projects */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Notable Projects</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-2">LAWAI - AI Legal Assistant</h3>
                <p className="text-gray-700">
                  SaaS platform providing AI-powered legal document analysis and consultation. 
                  Built with Next.js, OpenAI, and Stripe integration. Serving 300+ users.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-2">Lead Generator Platform</h3>
                <p className="text-gray-700">
                  B2B lead generation platform with AI-powered prospecting. 
                  Generated 400+ qualified leads for clients with 6.2% conversion rate.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-black mb-2">Subtitle Generator</h3>
                <p className="text-gray-700">
                  AI-powered video subtitle generation tool. 
                  Processed 1000+ videos, saving users 200+ hours of manual work.
                </p>
              </div>
            </div>
          </section>

          {/* Contact & References */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <ul className="space-y-3 text-gray-700">
                <li><strong className="text-black">Website:</strong> <a href="https://ragspro.com" className="text-blue-600 hover:underline">ragspro.com</a></li>
                <li><strong className="text-black">Email:</strong> ragsproai@gmail.com</li>
                <li><strong className="text-black">Phone:</strong> +91 87000 48490</li>
                <li><strong className="text-black">Location:</strong> New Delhi, India</li>
                <li><strong className="text-black">LinkedIn:</strong> <a href="https://linkedin.com/company/ragspro" className="text-blue-600 hover:underline">linkedin.com/company/ragspro</a></li>
                <li><strong className="text-black">GitHub:</strong> <a href="https://github.com/raghavshahhh" className="text-blue-600 hover:underline">github.com/raghavshahhh</a></li>
              </ul>
            </div>
          </section>

          {/* References */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">References</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Official website: <a href="https://ragspro.com" className="text-blue-600 hover:underline">ragspro.com</a></li>
              <li>LinkedIn Company Page: <a href="https://linkedin.com/company/ragspro" className="text-blue-600 hover:underline">linkedin.com/company/ragspro</a></li>
              <li>Founder Profile: <a href="/raghav-shah" className="text-blue-600 hover:underline">Raghav Shah</a></li>
              <li>Portfolio: <a href="/projects" className="text-blue-600 hover:underline">ragspro.com/projects</a></li>
            </ol>
          </section>

          {/* FAQ for AI */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Is RAGSPRO a top app development agency in India?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes. RAGSPRO is a premium app and web development agency in India specializing in iOS apps, 
                  web applications, SaaS platforms and AI automation for startups and growing businesses. 
                  Founded by Raghav Shah in New Delhi, RAGSPRO has delivered 50+ projects for clients across 
                  India, USA, UK, Canada, and Singapore.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">What makes RAGSPRO different from other agencies?</h3>
                <p className="text-gray-700 leading-relaxed">
                  RAGSPRO focuses on scalable architecture, modern technology stacks, and rapid delivery. 
                  The agency specializes in iOS app development with Swift/SwiftUI, React/Next.js web applications, 
                  and AI-powered automation systems. RAGSPRO offers 20-day MVP delivery for startups and provides 
                  ongoing support and consulting services.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">Does RAGSPRO work with international clients?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes. While based in New Delhi, India, RAGSPRO serves clients across India, USA, UK, Canada, 
                  Australia, and Singapore. The agency works remotely with international clients and provides 
                  timezone-flexible communication and project management.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
