import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Simple password protection
  const handleLogin = (e) => {
    e.preventDefault()
    // Change this password in production
    if (password === 'ragspro2025') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      fetchStats()
    } else {
      alert('Wrong password!')
    }
  }

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchStats()
    }
  }, [])

  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
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
                onClick={fetchStats}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                🔄 Refresh
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
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && <OverviewTab stats={stats} />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'blogs' && <BlogsTab />}
            {activeTab === 'seo' && <SEOTab />}
            {activeTab === 'leads' && <LeadsTab />}
          </>
        )}
      </div>
    </div>
  )
}

// Overview Tab
function OverviewTab({ stats }) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Visitors"
          value="Connect Google Analytics"
          icon="👥"
          color="blue"
        />
        <StatCard
          title="Blog Posts"
          value="8"
          icon="📝"
          color="green"
        />
        <StatCard
          title="SEO Score"
          value="Check GSC"
          icon="📊"
          color="purple"
        />
        <StatCard
          title="Leads"
          value="Track in CRM"
          icon="🎯"
          color="orange"
        />
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">System Status</h2>
        <div className="space-y-3">
          <StatusItem label="Website" status="online" />
          <StatusItem label="Blog Automation" status="configured" />
          <StatusItem label="Email Service" status="needs-api-key" />
          <StatusItem label="Payment Gateway" status="configured" />
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
function BlogsTab() {
  const blogs = [
    { title: 'Best iOS App Development Agencies India 2025', status: 'published', date: '2025-12-17' },
    { title: 'AI Automation Services for Startups', status: 'published', date: '2025-12-15' },
    { title: 'MVP Cost in India', status: 'published', date: '2025-12-14' },
    { title: 'Best MVP Agency India', status: 'published', date: '2025-12-13' },
    { title: '20 Day Startup Launch Case Study', status: 'published', date: '2025-12-12' },
    { title: 'AI Integration Startup Ideas', status: 'published', date: '2025-12-11' },
    { title: 'Build SaaS App in 20 Days', status: 'published', date: '2025-12-10' },
    { title: 'MVP Development Process', status: 'published', date: '2025-12-09' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Blog Posts</h2>
          <a
            href="/admin/blog-generator"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            + Generate New Blog
          </a>
        </div>

        <div className="space-y-3">
          {blogs.map((blog, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <h3 className="font-medium text-black">{blog.title}</h3>
                <p className="text-sm text-gray-500">{blog.date}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {blog.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Automation Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-black mb-4">Automation Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-blue-900">Daily Blog Generation</h3>
              <p className="text-sm text-blue-700">Scheduled for 10:00 AM IST</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Configured
            </span>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Setup Required:</h3>
            <p className="text-sm text-yellow-800 mb-2">
              Add GEMINI_API_KEY to Vercel environment variables to enable automation
            </p>
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              className="text-sm text-yellow-900 underline"
            >
              Get Gemini API Key →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// SEO Tab
function SEOTab() {
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
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>🔍</span>
              <span className="text-sm font-medium">Search Console</span>
            </a>
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>✨</span>
              <span className="text-sm font-medium">Rich Results Test</span>
            </a>
            <a
              href="https://pagespeed.web.dev/"
              target="_blank"
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
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">🤖 AI Optimization:</h3>
            <ul className="space-y-1 text-sm text-purple-800">
              <li>✓ About page (Wikipedia-style)</li>
              <li>✓ Founder profile page</li>
              <li>✓ llms.txt created</li>
              <li>✓ AI crawlers allowed</li>
              <li>✓ Comparative blog post</li>
              <li>✓ FAQ schema everywhere</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">⏳ Expected Timeline:</h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>• Month 1: AI recognizes name</li>
              <li>• Month 2-3: AI mentions occasionally</li>
              <li>• Month 4-6: AI recommends regularly</li>
              <li>• Month 6+: Default recommendation</li>
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
function StatCard({ title, value, icon, color }) {
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
    </div>
  )
}

function StatusItem({ label, status }) {
  const statusConfig = {
    online: { color: 'green', text: 'Online', icon: '✅' },
    configured: { color: 'blue', text: 'Configured', icon: '⚙️' },
    'needs-api-key': { color: 'yellow', text: 'Needs API Key', icon: '⚠️' },
  }

  const config = statusConfig[status]

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
