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
  const [blogRuns, setBlogRuns] = useState([])
  const [systemLogs, setSystemLogs] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [leads, setLeads] = useState([])
  const [dbConfigured, setDbConfigured] = useState(false)

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
      const [statsRes, blogsRes, healthRes, aiRes, blogRunsRes, logsRes, analyticsRes, leadsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/blogs', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/system-health', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/ai-status', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/blog-runs', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/system-logs?limit=50', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/analytics?days=30', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/leads', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const [statsData, blogsData, healthData, aiData, blogRunsData, logsData, analyticsData, leadsData] = await Promise.all([
        statsRes.json(),
        blogsRes.json(),
        healthRes.json(),
        aiRes.json(),
        blogRunsRes.json(),
        logsRes.json(),
        analyticsRes.json(),
        leadsRes.json()
      ])

      setStats(statsData)
      setBlogs(blogsData.blogs || [])
      setSystemHealth(healthData)
      setAiStatus(aiData)
      setBlogRuns(blogRunsData.runs || [])
      setSystemLogs(logsData.logs || [])
      setAnalytics(analyticsData)
      setLeads(leadsData.leads || [])
      setDbConfigured(blogRunsData.configured || false)
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
            {['overview', 'analytics', 'blogs', 'seo', 'leads', 'logs'].map((tab) => (
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
            {activeTab === 'overview' && <OverviewTab stats={stats} systemHealth={systemHealth} blogs={blogs} blogRuns={blogRuns} leads={leads} analytics={analytics} dbConfigured={dbConfigured} />}
            {activeTab === 'analytics' && <AnalyticsTab analytics={analytics} dbConfigured={dbConfigured} />}
            {activeTab === 'blogs' && <BlogsTab blogs={blogs} blogRuns={blogRuns} dbConfigured={dbConfigured} />}
            {activeTab === 'seo' && <SEOTab aiStatus={aiStatus} />}
            {activeTab === 'leads' && <LeadsTab leads={leads} dbConfigured={dbConfigured} />}
            {activeTab === 'logs' && <SystemLogsTab logs={systemLogs} dbConfigured={dbConfigured} />}
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
function AnalyticsTab({ analytics, dbConfigured }) {
  if (!dbConfigured || !analytics?.configured) {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-900 mb-4">📊 Database Required</h2>
          <p className="text-yellow-800 mb-6">
            Analytics tracking requires Supabase database. Follow the setup guide to enable real-time analytics.
          </p>
          <a
            href="/SUPABASE_SETUP_GUIDE.md"
            target="_blank"
            className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            View Setup Guide
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-black mb-4">Google Analytics (Optional)</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📊 Setup Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Analytics</a></li>
              <li>Create a new property for ragspro.com</li>
              <li>Get your Measurement ID (G-XXXXXXXXXX)</li>
              <li>Add to Vercel environment variables: NEXT_PUBLIC_GA_ID</li>
              <li>Redeploy your site</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Traffic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Total Views</div>
          <div className="text-2xl font-bold text-black">{analytics.totalViews || 0}</div>
          <div className="text-xs text-gray-500 mt-1">{analytics.period}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Organic</div>
          <div className="text-2xl font-bold text-green-600">{analytics.sourceBreakdown?.organic || 0}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">AI Referrals</div>
          <div className="text-2xl font-bold text-purple-600">{analytics.sourceBreakdown?.ai || 0}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Direct</div>
          <div className="text-2xl font-bold text-blue-600">{analytics.sourceBreakdown?.direct || 0}</div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Top Pages</h2>
        {analytics.topPages && analytics.topPages.length > 0 ? (
          <div className="space-y-2">
            {analytics.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-black">{page.page}</span>
                <span className="text-gray-600">{page.views} views</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No traffic data yet</p>
        )}
      </div>

      {/* Daily Trend */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Last 7 Days</h2>
        {analytics.dailyTrend && analytics.dailyTrend.length > 0 ? (
          <div className="space-y-2">
            {analytics.dailyTrend.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</span>
                <span className="font-medium text-black">{day.views} views</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No trend data yet</p>
        )}
      </div>
    </div>
  )
}

// Blogs Tab
function BlogsTab({ blogs, blogRuns, dbConfigured }) {
  const aiGenerated = blogs?.filter(b => b.isAIGenerated).length || 0
  const manual = blogs?.filter(b => !b.isAIGenerated).length || 0
  const totalWords = blogs?.reduce((sum, b) => sum + b.wordCount, 0) || 0
  const avgWords = blogs?.length > 0 ? Math.round(totalWords / blogs.length) : 0

  // Blog run stats
  const totalRuns = blogRuns?.length || 0
  const successRuns = blogRuns?.filter(r => r.status === 'success').length || 0
  const failedRuns = blogRuns?.filter(r => r.status === 'failed').length || 0
  const successRate = totalRuns > 0 ? Math.round((successRuns / totalRuns) * 100) : 0

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
          <div className="text-sm text-gray-600">Success Rate</div>
          <div className="text-2xl font-bold text-green-600">{successRate}%</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Avg Words</div>
          <div className="text-2xl font-bold text-blue-600">{avgWords}</div>
        </div>
      </div>

      {/* Blog Automation History */}
      {dbConfigured && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-black mb-4">Automation History</h2>
          
          {blogRuns && blogRuns.length > 0 ? (
            <div className="space-y-2">
              {blogRuns.slice(0, 10).map((run, index) => (
                <div key={index} className={`p-4 rounded-lg ${
                  run.status === 'success' ? 'bg-green-50' : 
                  run.status === 'failed' ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          run.status === 'success' ? 'bg-green-200 text-green-800' :
                          run.status === 'failed' ? 'bg-red-200 text-red-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {run.status}
                        </span>
                        <span className="text-sm text-gray-600">
                          {new Date(run.generated_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="font-medium text-black">{run.blog_slug || 'Unknown'}</p>
                      {run.error_log && (
                        <p className="text-sm text-red-600 mt-1">Error: {run.error_log}</p>
                      )}
                      {run.token_usage > 0 && (
                        <p className="text-xs text-gray-500 mt-1">Tokens: {run.token_usage}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No automation runs yet</p>
          )}
        </div>
      )}

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
function LeadsTab({ leads, dbConfigured }) {
  if (!dbConfigured || !leads || leads.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-900 mb-4">📊 Database Required</h2>
          <p className="text-yellow-800 mb-6">
            Lead tracking requires Supabase database. Follow the setup guide to enable CRM features.
          </p>
          <a
            href="/SUPABASE_SETUP_GUIDE.md"
            target="_blank"
            className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            View Setup Guide
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-black mb-4">Lead Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-black mb-1">Contact Form</h4>
              <p className="text-sm text-gray-600">Qualification form submissions</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-black mb-1">WhatsApp</h4>
              <p className="text-sm text-gray-600">Direct WhatsApp inquiries</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]
  const todayLeads = leads.filter(l => l.created_at.startsWith(today)).length
  const newLeads = leads.filter(l => l.status === 'new').length
  const convertedLeads = leads.filter(l => l.status === 'converted').length
  const conversionRate = leads.length > 0 ? Math.round((convertedLeads / leads.length) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Lead Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Total Leads</div>
          <div className="text-2xl font-bold text-black">{leads.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Today</div>
          <div className="text-2xl font-bold text-blue-600">{todayLeads}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">New</div>
          <div className="text-2xl font-bold text-orange-600">{newLeads}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-sm text-gray-600">Conversion Rate</div>
          <div className="text-2xl font-bold text-green-600">{conversionRate}%</div>
        </div>
      </div>

      {/* Lead List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">All Leads</h2>
        <div className="space-y-2">
          {leads.slice(0, 20).map((lead, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-black">{lead.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      lead.status === 'new' ? 'bg-orange-100 text-orange-800' :
                      lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'qualified' ? 'bg-purple-100 text-purple-800' :
                      lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{lead.email} {lead.phone && `• ${lead.phone}`}</p>
                  {lead.message && (
                    <p className="text-sm text-gray-500 mt-1">{lead.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(lead.created_at).toLocaleString()} • Source: {lead.source || 'unknown'}
                  </p>
                </div>
              </div>
            </div>
          ))}
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

// System Logs Tab
function SystemLogsTab({ logs, dbConfigured }) {
  if (!dbConfigured) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-yellow-900 mb-4">📊 Database Not Configured</h2>
        <p className="text-yellow-800 mb-6">
          System logs require Supabase database. Follow the setup guide to enable real-time logging.
        </p>
        <a
          href="/SUPABASE_SETUP_GUIDE.md"
          target="_blank"
          className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          View Setup Guide
        </a>
      </div>
    )
  }

  const typeColors = {
    cron: 'bg-blue-100 text-blue-800',
    api: 'bg-green-100 text-green-800',
    ai: 'bg-purple-100 text-purple-800',
    email: 'bg-pink-100 text-pink-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-gray-100 text-gray-800'
  }

  const statusIcons = {
    success: '✅',
    failed: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">System Event Logs</h2>
        
        {logs && logs.length > 0 ? (
          <div className="space-y-2">
            {logs.map((log, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[log.type] || typeColors.info}`}>
                        {log.type}
                      </span>
                      <span className="text-lg">{statusIcons[log.status]}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-black font-medium">{log.message}</p>
                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                      <pre className="mt-2 text-xs text-gray-600 bg-white p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No logs yet</p>
        )}
      </div>
    </div>
  )
}
