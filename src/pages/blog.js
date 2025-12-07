import SEOHead from '../components/SEOHead'
import { useRouter } from 'next/router'

const blogPosts = [
  {
    id: 1,
    title: "Best AI Automation Services for Startups in India 2025",
    excerpt: "Complete guide to AI automation services. ChatGPT integration, workflow automation, and AI-powered features for Indian startups.",
    date: "2025-02-04",
    slug: "ai-automation-services-startups-india",
    category: "AI Services",
    readTime: "16 min read"
  },
  {
    id: 2,
    title: "20-Day Startup Launch: Complete Case Study - From Idea to ₹1.5L MRR",
    excerpt: "Real case study of LAW-AI: How we built and launched a legal tech startup in 20 days with complete timeline and results.",
    date: "2025-02-03",
    slug: "20-day-startup-launch-case-study",
    category: "Case Study",
    readTime: "18 min read"
  },
  {
    id: 3,
    title: "How Much Does MVP Development Cost in India? (2025 Pricing Guide)",
    excerpt: "Complete breakdown of MVP development costs in India. Compare pricing, hidden costs, and get transparent quotes.",
    date: "2025-02-02",
    slug: "mvp-cost-india",
    category: "Pricing",
    readTime: "12 min read"
  },
  {
    id: 4,
    title: "Best MVP Development Agency in India 2025 - Complete Comparison",
    excerpt: "Compare top MVP agencies in India. Pricing, timelines, and real results. Find the best agency for your startup.",
    date: "2025-02-01",
    slug: "best-mvp-agency-india",
    category: "Comparison",
    readTime: "15 min read"
  },
  {
    id: 5,
    title: "How to Build a SaaS App in 20 Days (Step-by-Step Guide)",
    excerpt: "Learn our proven methodology for rapid SaaS development that helps startups launch faster and cheaper.",
    date: "2025-01-25",
    slug: "build-saas-app-20-days",
    category: "Development",
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "Top 5 Startup Automation Tools in 2025",
    excerpt: "Discover the best automation tools that can streamline your startup operations and boost productivity.",
    date: "2025-01-20",
    slug: "startup-automation-tools-2025",
    category: "Automation",
    readTime: "6 min read"
  },
  {
    id: 7,
    title: "AI Integration Ideas for Founders in 2025",
    excerpt: "Practical AI integration strategies that can give your startup a competitive edge in the market.",
    date: "2025-01-15",
    slug: "ai-integration-startup-ideas",
    category: "AI",
    readTime: "10 min read"
  },
  {
    id: 8,
    title: "Our 20-Day MVP Launch Process",
    excerpt: "Behind the scenes look at how RAGSPRO delivers complete MVPs in just 20 days for startups.",
    date: "2025-01-10",
    slug: "mvp-development-process",
    category: "Process",
    readTime: "12 min read"
  }
]

export default function Blog() {
  const router = useRouter()
  return (
    <>
      <SEOHead 
        title="RAGSPRO Blog | Startup Development Tips & SaaS Building Guides"
        description="Learn how to build SaaS apps fast, startup automation tips, AI integration guides, and MVP development strategies from RAGSPRO's expert team."
        keywords="build SaaS app fast, startup automation, AI integration startup, MVP development agency, startup development tips"
        url="https://ragspro.com/blog"
      />
      
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Startup Development Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn how to build SaaS apps fast, implement AI integration, and launch your startup in 20 days with expert tips from RAGSPRO.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-black mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <button
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="text-black font-medium text-sm hover:underline cursor-pointer"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Ready to Build Your Startup?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Get your SaaS, web, or mobile app built in just 20 days with AI integration and business automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/projects"
                  className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  See all startup apps we built
                </a>
                <button
                  onClick={() => {
                    const event = new CustomEvent('openQuoteForm')
                    window.dispatchEvent(event)
                  }}
                  className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                  Get custom SaaS pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}