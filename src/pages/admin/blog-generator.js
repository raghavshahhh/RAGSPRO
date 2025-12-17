// Admin panel for manual blog generation
import { useState } from 'react'
import SEOHead from '../../components/SEOHead'

export default function BlogGenerator() {
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const suggestedTopics = [
    'AI automation tools for Indian startups in 2025',
    'How to validate your SaaS idea before building MVP',
    'Best tech stack for building SaaS products in India',
    'Complete guide to raising seed funding in India 2025',
    'Mobile app vs web app: What should startups build first',
    'How to hire developers for your startup in India',
    'ChatGPT integration guide for SaaS products',
    'Building a marketplace platform: Complete technical guide',
    'SaaS pricing strategies for Indian market',
    'No-code vs custom development: What founders should choose',
    'How to build a fintech app in India: Complete guide',
    'Best payment gateways for Indian startups',
    'Building a food delivery app: Technical architecture',
    'How to scale your SaaS product in India',
    'Complete guide to startup legal compliance in India'
  ]

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
          keywords: keywords,
          manual: true
        })
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
        setTopic('')
        setKeywords('')
      } else {
        setError(data.error || 'Failed to generate blog')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead 
        title="Blog Generator - RAGSPRO Admin"
        description="Generate AI-powered blog posts"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">
              🤖 AI Blog Generator
            </h1>
            <p className="text-gray-600">
              Generate SEO-optimized blog posts using Gemini AI
            </p>
          </div>

          {/* Generator Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Blog Topic *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., AI automation tools for Indian startups"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              {/* Keywords Input */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Target Keywords (optional)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., AI automation, startup tools, Indian startups"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Comma-separated keywords for SEO optimization
                </p>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Blog Post...
                  </span>
                ) : (
                  '✨ Generate Blog Post'
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-800">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {/* Success Result */}
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-green-900 mb-4">
                ✅ Blog Post Generated Successfully!
              </h3>
              <div className="space-y-2 text-green-800">
                <p><strong>Title:</strong> {result.title}</p>
                <p><strong>Slug:</strong> {result.slug}</p>
                <p>
                  <strong>URL:</strong>{' '}
                  <a 
                    href={result.filePath} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-green-600"
                  >
                    {result.filePath}
                  </a>
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                <a
                  href={result.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
                >
                  View Blog Post
                </a>
                <a
                  href="/blog"
                  className="inline-block bg-white text-green-600 border border-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition-colors"
                >
                  View All Blogs
                </a>
              </div>
            </div>
          )}

          {/* Suggested Topics */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-black mb-4">
              💡 Suggested Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedTopics.map((suggestedTopic, index) => (
                <button
                  key={index}
                  onClick={() => setTopic(suggestedTopic)}
                  className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  {suggestedTopic}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
              📝 How It Works
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Enter a blog topic relevant to startups and development</li>
              <li>Optionally add target keywords for SEO</li>
              <li>Click "Generate Blog Post" and wait 30-60 seconds</li>
              <li>AI will create a 1500-2000 word SEO-optimized article</li>
              <li>Blog post will be automatically added to your blog section</li>
              <li>Review and edit the generated content if needed</li>
            </ol>
          </div>

          {/* Auto-Generation Info */}
          <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-purple-900 mb-3">
              ⚡ Auto-Generation Setup
            </h3>
            <p className="text-purple-800 mb-4">
              To enable daily automatic blog generation, set up a cron job:
            </p>
            <div className="bg-purple-900 text-purple-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <p className="mb-2"># Add to vercel.json:</p>
              <pre>{`{
  "crons": [{
    "path": "/api/cron/daily-blog",
    "schedule": "0 9 * * *"
  }]
}`}</pre>
            </div>
            <p className="text-purple-800 mt-4 text-sm">
              This will generate a new blog post every day at 9:00 AM IST
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
