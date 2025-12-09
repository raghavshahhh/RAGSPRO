import SEOHead from '../../components/SEOHead'
import { useRouter } from 'next/router'
import BlogCTA from '../../components/blog/BlogCTA'

export default function TwentyDayStartupLaunchCaseStudy() {
  const router = useRouter()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "20-Day Startup Launch: Complete Case Study - From Idea to ₹1.5L MRR",
    "description": "Real case study of LAW-AI: How we built and launched a legal tech startup in 20 days. Complete timeline, costs, challenges, and results.",
    "image": "https://ragspro.com/images/blog/case-study.jpg",
    "author": {
      "@type": "Person",
      "name": "Raghav Shah",
      "url": "https://ragspro.com/meet-founder"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RAGSPRO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ragspro.com/images/logo.png"
      }
    },
    "datePublished": "2025-02-03",
    "dateModified": "2025-02-03"
  }

  return (
    <>
      <SEOHead 
        title="20-Day Startup Launch Case Study: From Idea to ₹1.5L MRR | RAGSPRO"
        description="Real case study: How LAW-AI went from idea to ₹1.5L MRR in 20 days. Complete timeline, development process, costs, challenges, and results."
        keywords="startup launch case study, 20 day MVP, startup success story, MVP case study India, rapid startup launch, startup development timeline"
        url="https://ragspro.com/blog/20-day-startup-launch-case-study"
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => router.push('/blog')}
            className="text-gray-600 hover:text-black mb-8 flex items-center gap-2 transition-colors"
          >
            ← Back to Blog
          </button>

          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
                Case Study
              </span>
              <span className="text-gray-500">18 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              20-Day Startup Launch: Complete Case Study - From Idea to ₹1.5L MRR
            </h1>
            
            <div className="flex items-center gap-4 text-gray-600">
              <span>By Raghav Shah</span>
              <span>•</span>
              <time dateTime="2025-02-03">February 3, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              "Can you really launch a startup in 20 days?" Everyone asks this. So here's the complete, unfiltered case study of LAW-AI—a legal tech startup that went from idea to ₹1.5L monthly recurring revenue in just 20 days. Every detail, every challenge, every win.
            </p>

            <BlogCTA variant="default" />

            <div className="bg-gray-50 border-2 border-black rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold text-black mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Development Time</p>
                  <p className="text-2xl font-bold text-black">20 Days</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Development Cost</p>
                  <p className="text-2xl font-bold text-black">₹2,50,000</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Time to First Customer</p>
                  <p className="text-2xl font-bold text-black">Day 21</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Current MRR</p>
                  <p className="text-2xl font-bold text-black">₹1,50,000+</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-black">50+ Lawyers</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">ROI Timeline</p>
                  <p className="text-2xl font-bold text-black">60 Days</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">The Idea: Legal Research is Broken</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The founder, Amit (name changed), is a practicing lawyer in Delhi. He was spending 4-5 hours daily on legal research—reading case laws, finding precedents, analyzing judgments. It was tedious, time-consuming, and expensive.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              His idea: Use AI to automate legal research. Upload a case brief, get relevant case laws, precedents, and legal arguments in minutes instead of hours.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>The Challenge:</strong> He had zero technical background and a limited budget (₹3L total). He needed to launch fast to validate the idea before investing more.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Day 0: The Kickoff Call</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Date:</strong> January 1, 2025<br/>
              <strong>Duration:</strong> 2 hours<br/>
              <strong>Outcome:</strong> Clear scope and timeline
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We started with a detailed discovery call. Amit explained his vision, pain points, and target users. We asked tough questions:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Who exactly will use this? (Solo practitioners, law firms, corporate lawyers)</li>
              <li>What's the core value? (Save 3-4 hours daily on research)</li>
              <li>What can wait? (Mobile app, advanced analytics, multi-language)</li>
              <li>What's the budget? (₹2.5L for development, ₹50K for marketing)</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Key Decision:</strong> We decided to build a web-based MVP with 8 core features. No mobile app, no fancy design—just functional and fast.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Days 1-3: Planning & Architecture</h2>
            
            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Day 1: User Flows & Wireframes</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We mapped out 3 critical user journeys:
            </p>
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
              <li>Lawyer uploads case brief → AI analyzes → Returns relevant case laws</li>
              <li>Lawyer searches for specific legal topic → Gets precedents and arguments</li>
              <li>Lawyer saves research → Organizes in folders → Exports as PDF</li>
            </ol>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Created low-fidelity wireframes in Figma. No colors, no fancy UI—just boxes and text. Amit approved in 3 hours.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Day 2: Technical Architecture</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Tech Stack Chosen:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Frontend:</strong> Next.js 14 + React + Tailwind CSS</li>
              <li><strong>Backend:</strong> Next.js API routes + Node.js</li>
              <li><strong>Database:</strong> PostgreSQL (for structured legal data)</li>
              <li><strong>AI:</strong> OpenAI GPT-4 + Custom legal knowledge base</li>
              <li><strong>Authentication:</strong> NextAuth.js</li>
              <li><strong>Payments:</strong> Razorpay</li>
              <li><strong>Hosting:</strong> Vercel (frontend) + AWS RDS (database)</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Day 3: Development Environment Setup</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Set up Git repository</li>
              <li>Configured development and staging environments</li>
              <li>Set up database schema</li>
              <li>Integrated OpenAI API</li>
              <li>Created project documentation</li>
            </ul>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Days 4-12: Core Development Sprint</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Days 4-5: Authentication & User Management</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Built:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Email/password registration and login</li>
              <li>Email verification system</li>
              <li>Password reset functionality</li>
              <li>User profile management</li>
              <li>Session management</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Challenge:</strong> Legal data is sensitive. We implemented extra security measures—encrypted passwords, secure sessions, HTTPS only.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Days 6-8: AI Legal Research Engine</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This was the core feature. We built:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Document upload system (PDF, DOCX)</li>
              <li>Text extraction and processing</li>
              <li>GPT-4 integration for legal analysis</li>
              <li>Custom prompts for Indian legal context</li>
              <li>Case law database integration</li>
              <li>Results ranking algorithm</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Challenge:</strong> GPT-4 doesn't know Indian law well. We created a custom knowledge base with 1000+ Indian case laws and trained the AI to reference them.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Result:</strong> 85% accuracy on test cases. Good enough for MVP.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Days 9-10: Research Management & Organization</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Save research results</li>
              <li>Create folders and categories</li>
              <li>Search saved research</li>
              <li>Export to PDF with formatting</li>
              <li>Share research with colleagues</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Days 11-12: Payments & Subscriptions</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Pricing Model:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Free: 5 searches/month</li>
              <li>Pro: ₹2,999/month (unlimited searches)</li>
              <li>Firm: ₹9,999/month (5 users, unlimited searches)</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Integrated Razorpay for payments. Set up subscription management, billing portal, and invoice generation.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Days 13-16: Polish & Admin Features</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Days 13-14: Admin Dashboard</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Built admin panel for Amit to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>View all users and their activity</li>
              <li>Monitor AI usage and costs</li>
              <li>Manage subscriptions</li>
              <li>View revenue metrics</li>
              <li>Handle support tickets</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Days 15-16: Email Automation & Notifications</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Welcome email sequence</li>
              <li>Research completion notifications</li>
              <li>Subscription renewal reminders</li>
              <li>Usage limit warnings</li>
              <li>Weekly digest emails</li>
            </ul>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Days 17-19: Testing & Bug Fixes</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Day 17: Internal Testing</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our team tested every feature. Found 23 bugs—mostly UI issues and edge cases.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Day 18: Beta Testing with Real Lawyers</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Amit invited 5 lawyer friends to test. They found 8 more issues:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>PDF export formatting was broken</li>
              <li>Search was too slow (fixed with caching)</li>
              <li>Some legal terms weren't recognized</li>
              <li>Mobile view had layout issues</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Fixed all critical bugs. Documented minor issues for post-launch.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Day 19: Performance Optimization</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Optimized database queries (50% faster)</li>
              <li>Added caching for common searches</li>
              <li>Compressed images and assets</li>
              <li>Implemented lazy loading</li>
              <li>Set up CDN for static files</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Result:</strong> Page load time reduced from 3.2s to 1.1s.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Day 20: Launch Day! 🚀</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Date:</strong> January 21, 2025<br/>
              <strong>Time:</strong> 10:00 AM IST
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Morning: Final Deployment</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Deployed to production (Vercel)</li>
              <li>Configured custom domain (lawai.in)</li>
              <li>Set up SSL certificates</li>
              <li>Configured analytics (Google Analytics + Mixpanel)</li>
              <li>Set up error monitoring (Sentry)</li>
              <li>Final smoke tests</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Afternoon: Launch Announcement</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Amit announced on:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>LinkedIn (his network of 2000+ lawyers)</li>
              <li>WhatsApp groups (5 legal professional groups)</li>
              <li>Email to 150 contacts</li>
              <li>Bar Association notice board</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Evening: First Users!</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              By 6 PM, we had:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>23 signups</li>
              <li>12 active users</li>
              <li>47 searches performed</li>
              <li>3 paid subscriptions (₹8,997 revenue!)</li>
            </ul>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Post-Launch: First 60 Days</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Week 1 (Days 21-27)</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Users: 67 signups, 34 active</li>
              <li>Revenue: ₹23,991 (8 Pro, 2 Firm subscriptions)</li>
              <li>Feedback: Mostly positive, requested 5 new features</li>
              <li>Issues: 3 minor bugs fixed</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Month 1 (Days 21-50)</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Users: 156 signups, 89 active</li>
              <li>Revenue: ₹89,970 (28 Pro, 4 Firm subscriptions)</li>
              <li>Churn: 12% (acceptable for MVP)</li>
              <li>Added 2 requested features</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Month 2 (Days 51-80)</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Users: 312 signups, 187 active</li>
              <li>Revenue: ₹1,52,955 MRR (48 Pro, 7 Firm subscriptions)</li>
              <li>Churn: 8% (improving)</li>
              <li>ROI: Recovered ₹2.5L development cost!</li>
            </ul>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Complete Cost Breakdown</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Development Costs</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>RAGSPRO Development: ₹2,50,000</li>
              <li>Domain & SSL: ₹2,500</li>
              <li>Initial hosting setup: ₹0 (Vercel free tier)</li>
              <li><strong>Total Development: ₹2,52,500</strong></li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Monthly Operating Costs</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Hosting (Vercel + AWS): ₹8,000</li>
              <li>OpenAI API: ₹15,000</li>
              <li>Email service: ₹2,000</li>
              <li>Payment gateway fees: ₹4,500 (3% of revenue)</li>
              <li>Monitoring tools: ₹1,500</li>
              <li><strong>Total Monthly: ₹31,000</strong></li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Marketing Costs (First 2 Months)</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>LinkedIn ads: ₹25,000</li>
              <li>Google ads: ₹15,000</li>
              <li>Content marketing: ₹10,000</li>
              <li><strong>Total Marketing: ₹50,000</strong></li>
            </ul>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Key Challenges & How We Solved Them</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Challenge 1: AI Accuracy for Indian Law</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Problem:</strong> GPT-4 doesn't know Indian legal system well.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Solution:</strong> Created custom knowledge base with 1000+ Indian case laws. Fine-tuned prompts for Indian legal context.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Result:</strong> 85% accuracy, good enough for MVP.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Challenge 2: Slow Search Performance</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Problem:</strong> Initial searches took 8-10 seconds.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Solution:</strong> Implemented caching for common queries. Optimized database indexes.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Result:</strong> Reduced to 2-3 seconds.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Challenge 3: High AI API Costs</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Problem:</strong> OpenAI costs were ₹25K/month initially.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Solution:</strong> Optimized prompts to use fewer tokens. Implemented smart caching.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Result:</strong> Reduced to ₹15K/month.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Lessons Learned</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">1. Speed Matters More Than Perfection</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We launched with 85% accuracy, not 100%. Users were happy because it still saved them 3-4 hours daily. We improved accuracy post-launch based on real feedback.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">2. Talk to Users Early</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Beta testing on Day 18 caught 8 critical issues. Without it, we would have launched with broken features.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">3. Pricing is Hard</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We started at ₹1,999/month. Users said it was too cheap and didn't trust the quality. We raised to ₹2,999/month and conversions improved!
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">4. Focus on One Core Feature</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We almost added 5 extra features. Glad we didn't. The AI research engine alone was enough to validate the idea.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Current Status (3 Months Post-Launch)</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Users:</strong> 500+ signups, 280+ active</li>
              <li><strong>Revenue:</strong> ₹1,80,000 MRR (growing 15% monthly)</li>
              <li><strong>Churn:</strong> 6% (industry average is 10-15%)</li>
              <li><strong>Team:</strong> Amit + 1 part-time support person</li>
              <li><strong>Profitability:</strong> ₹1,20,000/month profit</li>
              <li><strong>Next Steps:</strong> Mobile app, advanced analytics, API for law firms</li>
            </ul>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Can You Replicate This?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Yes, if you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>✅ Have a clear problem to solve</li>
              <li>✅ Know your target users well</li>
              <li>✅ Can validate the idea quickly</li>
              <li>✅ Are willing to launch imperfect</li>
              <li>✅ Have ₹85K - ₹3L budget</li>
              <li>✅ Can commit to 20 days of focused work</li>
            </ul>

            <div className="bg-black text-white rounded-2xl p-8 my-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Launch Your Startup in 20 Days?</h3>
              <p className="text-gray-300 mb-6">
                We've done this 50+ times. Let's discuss your idea and create a custom 20-day launch plan. Book a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/918700048490?text=Hi, I want to launch my startup in 20 days like LAW-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  WhatsApp: +91 87000 48490
                </a>
                <button
                  onClick={() => {
                    const event = new CustomEvent('openQuoteForm')
                    window.dispatchEvent(event)
                  }}
                  className="inline-block bg-transparent text-white px-8 py-3 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-black transition-colors"
                >
                  Get Your Launch Plan
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                <img 
                  src="/images/raghav-profile.jpg" 
                  alt="Raghav Shah"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="80"
                  height="80"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Raghav Shah</h3>
                <p className="text-gray-600 mb-4">
                  Founder of RAGSPRO. Built LAW-AI and 50+ other MVPs in 20 days or less. Passionate about helping founders launch fast and validate ideas quickly.
                </p>
                <a 
                  href="/meet-founder"
                  className="text-black font-medium hover:underline"
                >
                  Learn more about Raghav →
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-black mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a 
                href="/blog/best-mvp-agency-india"
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h4 className="text-lg font-bold text-black mb-2">Best MVP Development Agency in India</h4>
                <p className="text-gray-600 text-sm">Compare top agencies and pricing</p>
              </a>
              <a 
                href="/blog/mvp-cost-india"
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h4 className="text-lg font-bold text-black mb-2">How Much Does MVP Development Cost?</h4>
                <p className="text-gray-600 text-sm">Complete pricing breakdown</p>
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
