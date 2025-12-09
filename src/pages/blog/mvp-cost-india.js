import SEOHead from '../../components/SEOHead'
import { useRouter } from 'next/router'
import BlogCTA from '../../components/blog/BlogCTA'

export default function MVPCostIndia() {
  const router = useRouter()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "How Much Does MVP Development Cost in India? (2025 Pricing Guide)",
    "description": "Complete breakdown of MVP development costs in India. Compare pricing, timelines, and what you actually get. RAGSPRO: ₹85K-₹3L transparent pricing.",
    "image": "https://ragspro.com/images/blog/mvp-cost.jpg",
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
    "datePublished": "2025-02-02",
    "dateModified": "2025-02-02"
  }

  return (
    <>
      <SEOHead 
        title="How Much Does MVP Development Cost in India? 2025 Pricing Guide"
        description="Complete MVP development cost breakdown for India. Compare agency pricing, freelancer rates, and hidden costs. RAGSPRO: ₹85K-₹3L transparent pricing with 20-day delivery."
        keywords="MVP development cost India, MVP price India, startup development cost, MVP agency pricing, how much does MVP cost, MVP development pricing India"
        url="https://ragspro.com/blog/mvp-cost-india"
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
                Pricing
              </span>
              <span className="text-gray-500">12 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              How Much Does MVP Development Cost in India? (2025 Pricing Guide)
            </h1>
            
            <div className="flex items-center gap-4 text-gray-600">
              <span>By Raghav Shah</span>
              <span>•</span>
              <time dateTime="2025-02-02">February 2, 2025</time>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              "How much will my MVP cost?" This is the first question every founder asks. After building 50+ MVPs and analyzing 100+ agency quotes, here's the complete, honest breakdown of MVP development costs in India for 2025.
            </p>

            <BlogCTA variant="default" />

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">TL;DR - Quick Answer</h2>
            <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
              <li><strong>Freelancers:</strong> ₹30,000 - ₹1,50,000 (1-3 months, high risk)</li>
              <li><strong>RAGSPRO:</strong> ₹85,000 - ₹3,00,000 (15-20 days, transparent pricing)</li>
              <li><strong>Traditional Agencies:</strong> ₹5,00,000 - ₹50,00,000+ (3-6 months, hidden costs)</li>
            </ul>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">What Affects MVP Development Cost?</h2>
            
            <h3 className="text-2xl font-bold text-black mt-8 mb-4">1. Feature Complexity</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Simple MVP (₹85K - ₹1.5L):</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>User authentication (login/signup)</li>
              <li>Basic dashboard</li>
              <li>5-7 core features</li>
              <li>Payment integration</li>
              <li>Mobile responsive design</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Medium MVP (₹1.5L - ₹3L):</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Everything in Simple</li>
              <li>10-12 features</li>
              <li>AI integration (ChatGPT, custom models)</li>
              <li>Admin panel</li>
              <li>Analytics dashboard</li>
              <li>Email automation</li>
              <li>3rd party API integrations</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Complex MVP (₹3L - ₹10L+):</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Everything in Medium</li>
              <li>15+ features</li>
              <li>Complex AI workflows</li>
              <li>Multi-user roles & permissions</li>
              <li>Real-time features (chat, notifications)</li>
              <li>Advanced analytics</li>
              <li>Custom integrations</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">2. Technology Stack</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Modern Stack (Recommended):</strong> Next.js, React, Node.js, PostgreSQL
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Faster development = lower cost</li>
              <li>Better performance</li>
              <li>Easier to maintain</li>
              <li>More developers available</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Legacy Stack:</strong> PHP, WordPress, older frameworks
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Slower development = higher cost</li>
              <li>Limited scalability</li>
              <li>Harder to find good developers</li>
              <li>Not recommended for startups</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">3. Design Requirements</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Template-based:</strong> ₹0 - ₹20K (included in most packages)</li>
              <li><strong>Custom design:</strong> ₹50K - ₹2L (adds 2-4 weeks)</li>
              <li><strong>Premium design:</strong> ₹2L - ₹5L+ (adds 4-8 weeks)</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Pro Tip:</strong> For MVPs, use template-based designs. Save custom design for after you validate your idea and have paying customers.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">4. Timeline Urgency</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Standard (2-3 months):</strong> Base price</li>
              <li><strong>Fast (3-4 weeks):</strong> +20-30% premium</li>
              <li><strong>Rush (1-2 weeks):</strong> +50-100% premium</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>RAGSPRO Exception:</strong> We deliver in 20 days at standard pricing. No rush fees.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Detailed Cost Breakdown by Provider Type</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Option 1: Freelance Developers</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Cost Range:</strong> ₹30,000 - ₹1,50,000<br/>
              <strong>Timeline:</strong> 1-3 months<br/>
              <strong>Hourly Rate:</strong> ₹500 - ₹2,000/hour
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>What You Get:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Basic functionality</li>
              <li>Simple design</li>
              <li>Limited support</li>
              <li>Source code (usually)</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Hidden Costs:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Bug fixes after delivery: ₹10K - ₹50K</li>
              <li>Deployment and hosting setup: ₹5K - ₹15K</li>
              <li>Documentation: Usually none</li>
              <li>Training: None</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Risks:</strong>
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>30-40% abandon projects mid-way</li>
              <li>Quality varies wildly</li>
              <li>No backup if they disappear</li>
              <li>Limited technical expertise</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Best For:</strong> Very simple projects or if you have technical expertise to manage them.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Option 2: RAGSPRO (Startup-Focused Agency)</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Cost Range:</strong> ₹85,000 - ₹3,00,000<br/>
              <strong>Timeline:</strong> 15-20 days<br/>
              <strong>Pricing Model:</strong> Fixed-price packages
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Starter Package - ₹85,000:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>5-7 core features</li>
              <li>User authentication</li>
              <li>Payment integration</li>
              <li>AI chatbot</li>
              <li>Mobile responsive</li>
              <li>15-day delivery</li>
              <li>30 days support</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Growth Package - ₹1,50,000:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>10-12 features</li>
              <li>Advanced AI (GPT-4)</li>
              <li>Admin panel</li>
              <li>Analytics dashboard</li>
              <li>Email automation</li>
              <li>API integrations</li>
              <li>20-day delivery</li>
              <li>30 days support</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Scale Package - ₹3,00,000:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>15+ features</li>
              <li>Complex AI workflows</li>
              <li>Multi-user roles</li>
              <li>Advanced analytics</li>
              <li>Custom integrations</li>
              <li>Performance optimization</li>
              <li>20-day delivery</li>
              <li>60 days support</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>What's Included (All Packages):</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Complete source code ownership</li>
              <li>Deployment and hosting setup</li>
              <li>Documentation</li>
              <li>Training session</li>
              <li>Post-launch support</li>
              <li>No hidden costs</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Best For:</strong> Startups that need to launch fast, validate ideas, and start generating revenue quickly.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 my-8">
              <h4 className="text-xl font-bold text-black mb-4">Get Your Custom Quote</h4>
              <p className="text-gray-700 mb-6">
                Tell us about your MVP idea and get transparent pricing with no hidden costs. Free 15-minute consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/918700048490?text=Hi, I want to know the cost of my MVP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors text-center"
                >
                  Get Pricing on WhatsApp
                </a>
                <button
                  onClick={() => {
                    const event = new CustomEvent('openQuoteForm')
                    window.dispatchEvent(event)
                  }}
                  className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Option 3: Traditional Agencies</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Cost Range:</strong> ₹5,00,000 - ₹50,00,000+<br/>
              <strong>Timeline:</strong> 3-6 months<br/>
              <strong>Pricing Model:</strong> Time & materials or fixed-price
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>What You Get:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Large team (designers, developers, PMs)</li>
              <li>Detailed documentation</li>
              <li>Established processes</li>
              <li>Enterprise-grade quality</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Hidden Costs:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Scope changes: +20-50% of base cost</li>
              <li>Post-launch support: ₹50K - ₹2L/month</li>
              <li>Maintenance: ₹1L - ₹5L/year</li>
              <li>Training: ₹20K - ₹1L</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Best For:</strong> Enterprise projects with large budgets. Overkill for MVPs and startups.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Real MVP Cost Examples</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Example 1: GLOW (Photo Transformation App)</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Agency:</strong> RAGSPRO</li>
              <li><strong>Cost:</strong> ₹1,50,000</li>
              <li><strong>Timeline:</strong> 18 days</li>
              <li><strong>Features:</strong> AI photo editing, user galleries, payment integration, admin panel</li>
              <li><strong>Results:</strong> 2000+ users in 3 months, 4.2% conversion rate, ₹2L+ revenue</li>
              <li><strong>ROI:</strong> Recovered development cost in 45 days</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Example 2: LAW-AI (Legal Assistant)</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Agency:</strong> RAGSPRO</li>
              <li><strong>Cost:</strong> ₹2,50,000</li>
              <li><strong>Timeline:</strong> 20 days</li>
              <li><strong>Features:</strong> AI legal research, document analysis, case management, payment system</li>
              <li><strong>Results:</strong> 50+ legal professionals, ₹1.5L+ MRR</li>
              <li><strong>ROI:</strong> Recovered development cost in 60 days</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Example 3: E-commerce MVP</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Agency:</strong> Traditional Agency</li>
              <li><strong>Cost:</strong> ₹8,00,000 (initial quote ₹5L)</li>
              <li><strong>Timeline:</strong> 5 months (promised 3 months)</li>
              <li><strong>Features:</strong> Product catalog, cart, checkout, admin panel</li>
              <li><strong>Hidden Costs:</strong> ₹3L in scope changes and delays</li>
              <li><strong>Outcome:</strong> Launched too late, market moved on</li>
            </ul>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Hidden Costs to Watch Out For</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">1. Scope Creep</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Most agencies quote low to win the project, then charge extra for "scope changes." What they call scope changes are often basic features you assumed were included.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>How to Avoid:</strong> Get everything in writing. Ask for a detailed feature list. With RAGSPRO, scope is locked upfront—no surprises.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">2. Deployment and Hosting</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Domain and SSL: ₹2K - ₹5K/year</li>
              <li>Hosting: ₹5K - ₹50K/month (depends on traffic)</li>
              <li>Deployment setup: ₹10K - ₹50K (one-time)</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>RAGSPRO:</strong> Deployment setup included. We help you choose cost-effective hosting.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">3. Third-Party Services</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Payment gateway: 2-3% per transaction</li>
              <li>Email service: ₹1K - ₹10K/month</li>
              <li>SMS service: ₹0.10 - ₹0.50 per SMS</li>
              <li>AI APIs: ₹5K - ₹50K/month (usage-based)</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">4. Maintenance and Updates</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Bug fixes: ₹10K - ₹50K/month</li>
              <li>Security updates: ₹5K - ₹20K/month</li>
              <li>Feature additions: ₹25K - ₹1L per feature</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>RAGSPRO:</strong> 30-60 days of bug fixes included. Ongoing support packages start at ₹25K/month.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">How to Reduce MVP Development Costs</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">1. Start with Core Features Only</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Don't build everything at once. Identify the 5-7 features that are absolutely essential for your MVP. Add more features after you validate your idea with real users.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">2. Use Template-Based Designs</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Custom design can add ₹50K - ₹2L and 2-4 weeks to your timeline. Use template-based designs for your MVP. Invest in custom design after you have paying customers.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">3. Choose Modern Tech Stack</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Modern frameworks like Next.js and React are faster to develop with, which means lower costs. They're also easier to maintain and scale.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">4. Work with Startup-Focused Agencies</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Agencies like RAGSPRO that specialize in MVPs understand the lean startup methodology. We know what features matter and what can wait.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">5. Get Fixed-Price Quotes</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Avoid time & materials pricing. Get fixed-price quotes with clear scope. This protects you from scope creep and hidden costs.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Is It Worth Paying More for Faster Delivery?</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Absolutely. Here's why:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><strong>Opportunity Cost:</strong> Every month you're not live is a month you're not learning from users</li>
              <li><strong>Market Timing:</strong> Markets move fast. Your competitors aren't waiting</li>
              <li><strong>Runway:</strong> Faster delivery means less burn rate</li>
              <li><strong>Validation:</strong> You can validate (or invalidate) your idea faster</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Example:</strong> If RAGSPRO charges ₹1.5L for 20-day delivery vs. a freelancer charging ₹80K for 3-month delivery, you're paying ₹70K more but launching 70 days earlier. That's ₹1K per day to launch faster—totally worth it.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Frequently Asked Questions</h2>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">What's the minimum cost for an MVP in India?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              ₹30K - ₹50K with freelancers for very simple projects. But expect high risk and limited features. For a proper MVP with good quality, budget at least ₹85K - ₹1.5L.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Should I pay hourly or fixed-price?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Fixed-price is better for MVPs. It protects you from scope creep and gives you budget certainty. Hourly pricing often leads to projects going over budget.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">What payment terms should I expect?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Typical: 30-40% upfront, 30-40% at milestone, 20-30% on delivery. Avoid agencies asking for 100% upfront. RAGSPRO: 40% upfront, 30% at midpoint, 30% on delivery.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">Are there any ongoing costs after launch?</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Yes: Hosting (₹5K-₹50K/month), third-party services (₹5K-₹50K/month), maintenance (₹25K-₹1L/month). Budget ₹30K-₹1L/month for ongoing costs.
            </p>

            <h2 className="text-3xl font-bold text-black mt-12 mb-6">Final Recommendation</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For most startups, RAGSPRO's ₹85K - ₹3L packages offer the best value:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>✅ Fast delivery (15-20 days)</li>
              <li>✅ Transparent pricing (no hidden costs)</li>
              <li>✅ Modern tech stack</li>
              <li>✅ AI integration included</li>
              <li>✅ Post-launch support</li>
              <li>✅ Proven track record (50+ MVPs)</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Freelancers are too risky. Traditional agencies are too expensive and slow. RAGSPRO hits the sweet spot for startup MVPs.
            </p>

            <div className="bg-black text-white rounded-2xl p-8 my-12">
              <h3 className="text-2xl font-bold mb-4">Get Transparent Pricing for Your MVP</h3>
              <p className="text-gray-300 mb-6">
                No hidden costs. No surprises. Just honest pricing and fast delivery. Book a free consultation to discuss your MVP.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/918700048490?text=Hi, I want to know the cost of my MVP"
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
                  Get Custom Quote
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
                  Founder of RAGSPRO. Built 50+ MVPs with transparent pricing. Helped startups save money while launching faster. Based in Delhi, India.
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
                <p className="text-gray-600 text-sm">Compare top agencies and find the best fit</p>
              </a>
              <a 
                href="/blog/build-saas-app-20-days"
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h4 className="text-lg font-bold text-black mb-2">How to Build a SaaS App in 20 Days</h4>
                <p className="text-gray-600 text-sm">Our complete development process</p>
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
