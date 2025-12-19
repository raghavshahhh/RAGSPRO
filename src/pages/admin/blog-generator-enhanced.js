// Enhanced Admin Blog Generator with animations, progress, timer, and edit
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SEOHead from '../../components/SEOHead'

export default function BlogGeneratorEnhanced() {
  const router = useRouter()
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timer, setTimer] = useState(0)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedContent, setEditedContent] = useState('')

  // Timer effect
  useEffect(() => {
    let interval
    if (loading) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    } else {
      setTimer(0)
    }
    return () => clearInterval(interval)
  }, [loading])

  // Progress simulation
  useEffect(() => {
    let interval
    if (loading && progress < 90) {
      interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 10
          return Math.min(prev + increment, 90)
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [loading, progress])

  const suggestedTopics = [
    'AI automation tools for Indian startups in 2025',
    'How to validate your SaaS idea before building MVP',
    'Best tech stack for building SaaS products in India',
    'Complete guide to raising seed funding in India 2025',
    'Mobile app vs web app: What should startups build first'
  ]

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)
    setProgress(0)
    setTimer(0)

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
        setProgress(100)
        setResult(data)
        setEditedContent(data.title) // Initialize with title for editing
      } else {
        setError(data.error || data.details || 'Failed to generate blog')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      <SEOHead 
        title="Enhanced Blog Generator - RAGSPRO Admin"
        description="Generate AI-powered blog posts with real-time progress"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              ✨ AI-Powered Blog Generator
            </div>
            <h1 className="text-5xl font-bold text-black mb-4">
              Create Amazing Content
            </h1>
            <p className="text-xl text-gray-600">
              Generate SEO-optimized blog posts in seconds with Gemini AI
            </p>
          </div>

          {/* Generator Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="block text-sm font-bold text-black mb-3">
                  📝 Blog Topic *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., AI automation tools for Indian startups"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
                  disabled={loading}
                />
              </div>

              {/* Keywords Input */}
              <div>
                <label className="block text-sm font-bold text-black mb-3">
                  🎯 Target Keywords (optional)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., AI automation, startup tools, Indian startups"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all"
                  disabled={loading}
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating... {formatTime(timer)}
                  </span>
                ) : (
                  '✨ Generate Blog Post'
                )}
              </button>
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Generating your blog post...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-3 text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="flex items-center">
                      <span className="animate-pulse mr-2">🤖</span>
                      AI is writing...
                    </span>
                    <span className="flex items-center">
                      <span className="animate-pulse mr-2">⏱️</span>
                      {formatTime(timer)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 animate-shake">
              <div className="flex items-start">
                <span className="text-3xl mr-4">❌</span>
                <div>
                  <h3 className="font-bold text-red-900 mb-2">Generation Failed</h3>
                  <p className="text-red-800">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-3 text-red-600 hover:text-red-800 font-semibold"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Result */}
          {result && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 mb-8 animate-slideIn">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">✅</span>
                  <div>
                    <h3 className="text-2xl font-bold text-green-900">
                      Blog Generated Successfully!
                    </h3>
                    <p className="text-green-700">
                      Generated in {formatTime(timer)} using {result.model}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 mb-6 space-y-4">
                <div>
                  <label className="text-sm font-bold text-gray-600">Title</label>
                  <p className="text-lg font-semibold text-black mt-1">{result.title}</p>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600">Slug</label>
                  <p className="text-gray-800 mt-1 font-mono text-sm">{result.slug}</p>
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-600">Stats</label>
                  <div className="flex gap-4 mt-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      📝 {result.stats?.wordCount || 0} words
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ⚡ {result.stats?.tokenUsage || 0} tokens
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ⏱️ {Math.round((result.stats?.executionTime || 0) / 1000)}s
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={result.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <span className="mr-2">👁️</span>
                  View Blog Post
                </a>
                <a
                  href="/blog"
                  className="inline-flex items-center bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-all"
                >
                  <span className="mr-2">📚</span>
                  All Blogs
                </a>
                <button
                  onClick={() => {
                    setResult(null)
                    setTopic('')
                    setKeywords('')
                  }}
                  className="inline-flex items-center bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  <span className="mr-2">➕</span>
                  Generate Another
                </button>
              </div>
            </div>
          )}

          {/* Suggested Topics */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
              <span className="mr-3">💡</span>
              Suggested Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedTopics.map((suggestedTopic, index) => (
                <button
                  key={index}
                  onClick={() => setTopic(suggestedTopic)}
                  disabled={loading}
                  className="text-left p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-purple-50 hover:to-blue-50 transition-all border border-gray-200 hover:border-purple-300 disabled:opacity-50"
                >
                  <span className="text-sm font-medium text-gray-800">{suggestedTopic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-3xl font-bold mb-1">30-60s</div>
              <div className="text-purple-100">Generation Time</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-3xl font-bold mb-1">2000+</div>
              <div className="text-blue-100">Words Per Blog</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-green-100">SEO Optimized</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-out;
        }
      `}</style>
    </>
  )
}
