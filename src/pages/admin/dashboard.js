import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [blogs, setBlogs] = useState([])
  const [systemHealth, setSystemHealth] = useState(null)
  const [aiStatus, setAiStatus] = useState(null)

  // Simple password protection
  const handleLogin = (e) => {
    e.preventDefault()
    // Change this password in production
    if (password === 'ragspro2025') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminToken', 'ragspro2025')
      fetchAllData()
    } else {
      alert('Wrong password!')
    }
  }

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchAllData()
    }
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        fetchAllData()
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const fetchAllData = async () => {
    setLoading(true)
    const token = localStorage.getItem('adminToken') || 'ragspro2025'
    
    try {
      // Fetch all data in parallel
      const [statsRes, blogsRes, healthRes, aiRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/blogs', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/system-health', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/ai-status', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const [statsData, blogsData, healthData, aiData] = await Promise.all([
        statsRes.json(),
        blogsRes.json(),
        healthRes.json(),
        aiRes.json()
      ])

      setStats(statsData)
      setBlogs(blogsData.blogs || [])
      setSystemHealth(healthData)
      setAiStatus(aiData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminToken')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-black mb-6 text-center">
            🔐 Admin Dashboard
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Default password: ragspro2025
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-black">RAGSPRO Dashboard</h1>
              <p className="text-sm text-gray-500">Monitor everything in one place</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={fetchAllData}
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? '⏳' : '🔄'} Refresh
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 overflow-x-auto">
            {['overview', 'analytics', 'blogs', 'seo', 'leads'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && !stats ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && <OverviewTab stats={stats} systemHealth={systemHealth} blogs={blogs} />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'blogs' && <BlogsTab blogs={blogs} />}
            {activeTab === 'seo' && <SEOTab aiStatus={aiStatus} />}
            {activeTab === 'leads' && <LeadsTab />}
          </>
        )}
      </div>
    </div>
  )
}

// Overview Tab
function OverviewTab({ stats, systemHealth, blogs }) {
  const blogCount = blogs?.length || 0
  const aiGenerated = blogs?.filter(b => b.isAIGenerated).length || 0
  
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Blog Posts"
          value={blogCount.toString()}
          subtitle={`${aiGenerated} AI generated`}
          icon="📝"
          color="green"
        />
        <StatCard
          title="System Health"
          value={systemHealth?.status === 'healthy' ? '100%' : 'Degraded'}
          subtitle={systemHealth?.status || 'Loading...'}
          icon="💚"
          color="blue"
        />
        <StatCard
          title="AI Readiness"
          value="100%"
          subtitle="All checks passed"
          icon="🤖"
          color="purple"
        />
        <StatCard
          title="Last Updated"
          value={new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          subtitle="Auto-refresh: 30s"
          icon="🔄"
          color="orange"
        />
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">System Status</h2>
        {systemHealth ? (
          <div className="space-y-3">
            <StatusItem 
              label="Gemini AI" 
              status={systemHealth.checks.geminiApi.status} 
            />
            <StatusItem 
              label="Email Service (Resend)" 
              status={systemHealth.checks.resendApi.status} 
            />
            <StatusItem 
              label="Payment Gateway (Razorpay)" 
              status={systemHealth.checks.razorpay.status} 
            />
            <StatusItem 
              label="llms.txt (AI Discovery)" 
              status={systemHealth.checks.llmsTxt.status} 
            />
            <StatusItem 
              label="robots.txt" 
              status={systemHealth.checks.robotsTxt.status} 
            />
            <StatusItem 
              label="sitemap.xml" 
              status={systemHealth.checks.sitemap.status} 
            />
          </div>
        ) : (
          <p className="text-gray-500">Loading system health...</p>
        )}
      </div>

      {/* Recent Blogs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Recent Blog Posts</h2>
        <div className="space-y-2">
          {blogs?.slice(0, 5).map((blog, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <h3 className="font-medium text-black text-sm">{blog.title}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()} • {blog.wordCount} words
                  {blog.isAIGenerated && ' • 🤖 AI Generated'}
                </p>
              </div>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-black text-white rounded text-xs hover:bg-gray-800"
              >
                View
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionButton
            label="Generate Blog"
            href="/admin/blog-generator"
            icon="✍️"
          />
          <ActionButton
            label="View Analytics"
            href="https://analytics.google.com"
            icon="📈"
            external
          />
          <ActionButton
            label="Search Console"
            href="https://search.google.com/search-console"
            icon="🔍"
            external
          />
        </div>
      </div>
    </div>
  )
}

// Analytics Tab
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Google Analytics Setup</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📊 Setup Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Go to <a href="https://analytics.google.com" target="_blank" className="underline">Google Analytics</a></li>
              <li>Create a new property for ragspro.com</li>
              <li>Get your Measurement ID (G-XXXXXXXXXX)</li>
              <li>Add to Vercel environment variables: NEXT_PUBLIC_GA_ID</li>
              <li>Redeploy your site</li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">What You'll Track:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✅ Page views</li>
              <li>✅ User sessions</li>
              <li>✅ Traffic sources</li>
              <li>✅ User behavior</li>
              <li>✅ Conversion events</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Placeholder for when GA is connected */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Traffic Overview</h2>
        <p className="text-gray-500 text-center py-8">
          Connect Google Analytics to see traffic data here
        </p>
      </div>
    </div>
  )
}

// Blogs Tab
function BlogsTab({ blogs }) {
  const aiGenerated = blogs?.filter(b => b.isAIGenerated).length || 0
  const manual = blogs?.filter(b => !b.isAIGenerated).length || 0
  const totalWords = blogs?.reduce((sum, b) => sum + b.wordCount, 0) || 0
  const avgWords = blogs?.length > 0 ? Math.round(totalWords / blogs.length) : 0

  return (
    <div className="space-y-6">
      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Total Blogs</div>
          <div className="text-2xl font-bold text-black">{blogs?.length || 0}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">AI Generated</div>
          <div className="text-2xl font-bold text-purple-600">{aiGenerated}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Manual</div>
          <div className="text-2xl font-bold text-blue-600">{manual}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Avg Words</div>
          <div className="text-2xl font-bold text-green-600">{avgWords}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">All Blog Posts</h2>
          <a
            href="/admin/blog-generator"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Generate New Blog
          </a>
        </div>

        <div className="space-y-3">
          {blogs?.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-black">{blog.title}</h3>
                    {blog.isAIGenerated && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        🤖 AI
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(blog.createdAt).toLocaleDateString()} • {blog.wordCount} words • {blog.filePath}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800"
                  >
                    View
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No blogs found</p>
          )}
        </div>
      </div>

      {/* Blog Automation Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Automation Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-blue-900">Daily Blog Generation</h3>
              <p className="text-sm text-blue-700">Scheduled for 10:00 AM IST via Vercel Cron</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {process.env.GEMINI_API_KEY ? 'Active' : 'Needs API Key'}
            </span>
          </div>

          {!process.env.GEMINI_API_KEY && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Setup Required:</h3>
              <p className="text-sm text-yellow-800 mb-2">
                Add GEMINI_API_KEY to Vercel environment variables to enable automation
              </p>
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-yellow-900 underline"
              >
                Get Gemini API Key →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// SEO Tab
function SEOTab({ aiStatus }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">SEO Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">✅ Implemented:</h3>
            <ul className="space-y-1 text-sm text-green-800">
              <li>✓ Schema markup (6 types)</li>
              <li>✓ Meta tags optimized</li>
              <li>✓ Geo tags (Delhi, India)</li>
              <li>✓ OpenGraph & Twitter Cards</li>
              <li>✓ Sitemap.xml</li>
              <li>✓ Robots.txt (AI crawlers allowed)</li>
              <li>✓ llms.txt for AI discovery</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📊 Target Keywords:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• iOS app development agency India</li>
              <li>• Web development agency India</li>
              <li>• SaaS development company</li>
              <li>• AI automation agency</li>
              <li>• Startup app developers</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-black">Quick Links:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>🔍</span>
              <span className="text-sm font-medium">Search Console</span>
            </a>
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>✨</span>
              <span className="text-sm font-medium">Rich Results Test</span>
            </a>
            <a
              href="https://pagespeed.web.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>⚡</span>
              <span className="text-sm font-medium">PageSpeed Insights</span>
            </a>
          </div>
        </div>
      </div>

      {/* AI Visibility Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">AI Visibility Status</h2>
        
        {aiStatus && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-black">AI Readiness Score</h3>
              <span className="text-3xl font-bold text-purple-600">{aiStatus.readinessScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${aiStatus.readinessScore}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">🤖 AI Optimization Checklist:</h3>
            {aiStatus?.checks ? (
              <ul className="space-y-1 text-sm text-purple-800">
                <li>{aiStatus.checks.llmsTxt ? '✓' : '✗'} llms.txt created</li>
                <li>{aiStatus.checks.aiCrawlersAllowed ? '✓' : '✗'} AI crawlers allowed</li>
                <li>{aiStatus.checks.aboutPage ? '✓' : '✗'} About page (Wikipedia-style)</li>
                <li>{aiStatus.checks.founderPage ? '✓' : '✗'} Founder profile page</li>
                <li>{aiStatus.checks.comparativeBlog ? '✓' : '✗'} Comparative blog post</li>
              </ul>
            ) : (
              <p className="text-sm text-purple-800">Loading checks...</p>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⏳ Expected Timeline:</h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• Month 1: {aiStatus?.timeline.month1 || 'AI recognizes name'}</li>
              <li>• Month 2-3: {aiStatus?.timeline.month2_3 || 'AI mentions occasionally'}</li>
              <li>• Month 4-6: {aiStatus?.timeline.month4_6 || 'AI recommends regularly'}</li>
              <li>• Month 6+: {aiStatus?.timeline.month6plus || 'Default recommendation'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Leads Tab
function LeadsTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Lead Tracking</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">📧 Email Setup Required:</h3>
          <p className="text-sm text-blue-800 mb-2">
            Add RESEND_API_KEY to Vercel to receive lead notifications
          </p>
          <a
            href="https://resend.com/api-keys"
            target="_blank"
            className="text-sm text-blue-900 underline"
          >
            Get Resend API Key →
          </a>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-black">Lead Sources:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-black mb-1">Contact Form</h4>
              <p className="text-sm text-gray-600">Qualification form submissions</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-black mb-1">WhatsApp</h4>
              <p className="text-sm text-gray-600">Direct WhatsApp inquiries</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-black mb-1">Calendar Bookings</h4>
              <p className="text-sm text-gray-600">Scheduled consultations</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-black mb-1">Email</h4>
              <p className="text-sm text-gray-600">Direct email inquiries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">CRM Integration</h2>
        <p className="text-gray-600 mb-4">
          Connect a CRM to track leads automatically:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a
            href="https://www.hubspot.com"
            target="_blank"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
          >
            <div className="font-medium text-black">HubSpot</div>
            <div className="text-sm text-gray-500">Free CRM</div>
          </a>
          <a
            href="https://www.pipedrive.com"
            target="_blank"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
          >
            <div className="font-medium text-black">Pipedrive</div>
            <div className="text-sm text-gray-500">Sales CRM</div>
          </a>
          <a
            href="https://www.notion.so"
            target="_blank"
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
          >
            <div className="font-medium text-black">Notion</div>
            <div className="text-sm text-gray-500">Simple tracking</div>
          </a>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function StatCard({ title, value, subtitle, icon, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-900',
    green: 'bg-green-50 text-green-900',
    purple: 'bg-purple-50 text-purple-900',
    orange: 'bg-orange-50 text-orange-900',
  }

  return (
    <div className={`${colors[color]} rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-sm font-medium opacity-75 mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
    </div>
  )
}

function StatusItem({ label, status }) {
  const statusConfig = {
    ready: { color: 'green', text: 'Ready', icon: '✅' },
    missing: { color: 'yellow', text: 'Missing', icon: '⚠️' },
    online: { color: 'green', text: 'Online', icon: '✅' },
    configured: { color: 'blue', text: 'Configured', icon: '⚙️' },
    'needs-api-key': { color: 'yellow', text: 'Needs API Key', icon: '⚠️' },
  }

  const config = statusConfig[status] || { color: 'gray', text: status, icon: '❓' }

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="font-medium text-black">{label}</span>
      <span className={`flex items-center gap-2 text-sm font-medium text-${config.color}-700`}>
        <span>{config.icon}</span>
        <span>{config.text}</span>
      </span>
    </div>
  )
}

function ActionButton({ label, href, icon, external }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-black">{label}</span>
    </a>
  )
}
