import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import SEOHead from '../../components/SEOHead'
import { FiUsers, FiFolder, FiLogOut, FiHome, FiFileText, FiBarChart2, FiSettings, FiMenu, FiX, FiRefreshCw, FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshing, setRefreshing] = useState(false)
  
  // Data states
  const [stats, setStats] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [leads, setLeads] = useState([])
  const [systemHealth, setSystemHealth] = useState(null)
  const [blogRuns, setBlogRuns] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [systemLogs, setSystemLogs] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/?login=true')
    } else if (user) {
      fetchAllData()
    }
  }, [user, loading, router])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (user) {
      const interval = setInterval(fetchAllData, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchAllData = async () => {
    if (!user) return
    setRefreshing(true)
    
    try {
      const [statsRes, blogsRes, leadsRes, healthRes, blogRunsRes, analyticsRes, logsRes] = await Promise.all([
        fetch('/api/admin/stats').catch(() => ({ json: () => ({}) })),
        fetch('/api/admin/blogs').catch(() => ({ json: () => ({ blogs: [] }) })),
        fetch('/api/admin/leads').catch(() => ({ json: () => ({ leads: [] }) })),
        fetch('/api/admin/system-health').catch(() => ({ json: () => ({}) })),
        fetch('/api/admin/blog-runs').catch(() => ({ json: () => ({ runs: [] }) })),
        fetch('/api/admin/analytics?days=30').catch(() => ({ json: () => ({}) })),
        fetch('/api/admin/system-logs?limit=50').catch(() => ({ json: () => ({ logs: [] }) }))
      ])

      const [statsData, blogsData, leadsData, healthData, blogRunsData, analyticsData, logsData] = await Promise.all([
        statsRes.json(),
        blogsRes.json(),
        leadsRes.json(),
        healthRes.json(),
        blogRunsRes.json(),
        analyticsRes.json(),
        logsRes.json()
      ])

      setStats(statsData)
      setBlogs(blogsData.blogs || [])
      setLeads(leadsData.leads || [])
      setSystemHealth(healthData)
      setBlogRuns(blogRunsData.runs || [])
      setAnalytics(analyticsData)
      setSystemLogs(logsData.logs || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setRefreshing(false)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) return null

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'leads', label: 'Leads', icon: FiUsers },
    { id: 'portfolio', label: 'Portfolio', icon: FiFolder },
    { id: 'blogs', label: 'Blogs', icon: FiFileText },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
    { id: 'seo', label: 'SEO', icon: FiSearch },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ]

  return (
    <>
      <SEOHead 
        title="Admin Dashboard | RAGSPRO"
        description="Admin control panel"
        noindex={true}
      />

      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}>
          {/* Logo */}
          <div className="p-6 border-b border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">RAGSPRO</h1>
                <p className="text-purple-300 text-sm mt-1">Admin Panel</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-purple-200"
              >
                <FiX size={24} />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-purple-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">👤</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user?.email?.split('@')[0]}</p>
                <p className="text-xs text-purple-300 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-purple-700 text-white shadow-lg'
                    : 'text-purple-200 hover:bg-purple-700/50 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-purple-700">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              <FiLogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FiMenu size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-900 capitalize">{activeTab}</h2>
            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
            >
              <FiRefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-6 hidden lg:block">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">{activeTab}</h2>
                <p className="text-gray-600 mt-1">Manage your business from one place</p>
              </div>
              <button
                onClick={fetchAllData}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <FiRefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-8">
            {activeTab === 'overview' && <OverviewTab stats={stats} systemHealth={systemHealth} blogs={blogs} leads={leads} blogRuns={blogRuns} router={router} />}
            {activeTab === 'leads' && <LeadsTab leads={leads} router={router} />}
            {activeTab === 'portfolio' && <PortfolioTab router={router} />}
            {activeTab === 'blogs' && <BlogsTab blogs={blogs} blogRuns={blogRuns} router={router} />}
            {activeTab === 'analytics' && <AnalyticsTab analytics={analytics} />}
            {activeTab === 'seo' && <SEOTab systemHealth={systemHealth} />}
            {activeTab === 'settings' && <SettingsTab user={user} />}
          </div>
        </div>
      </div>
    </>
  )
}

// Overview Tab Component
function OverviewTab({ stats, systemHealth, blogs, leads, blogRuns, router }) {
  const blogCount = blogs?.length || 0
  const aiGenerated = blogs?.filter(b => b.isAIGenerated).length || 0
  const leadsCount = leads?.length || 0
  const newLeads = leads?.filter(l => l.status === 'new').length || 0

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Leads</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{leadsCount}</p>
              <p className="text-green-600 text-sm mt-1">{newLeads} new</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiUsers className="text-blue-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Blog Posts</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{blogCount}</p>
              <p className="text-purple-600 text-sm mt-1">{aiGenerated} AI generated</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiFileText className="text-purple-600" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">System Health</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {systemHealth?.status === 'healthy' ? '100%' : 'OK'}
              </p>
              <p className="text-green-600 text-sm mt-1">All systems operational</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <span className="text-2xl">💚</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Last Updated</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-gray-500 text-sm mt-1">Auto-refresh: 30s</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <FiRefreshCw className="text-orange-600" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => router.push('/admin/leads')}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-bold mb-2">Manage Leads</h3>
              <p className="text-blue-100 mb-4 text-sm">View and manage all customer inquiries</p>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Real-time</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">{leadsCount} total</span>
              </div>
            </div>
            <FiUsers className="text-4xl opacity-20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => router.push('/admin/portfolio')}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="text-xl font-bold mb-2">Portfolio Manager</h3>
              <p className="text-purple-100 mb-4 text-sm">Add, edit, and manage projects</p>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">CRUD</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Live preview</span>
              </div>
            </div>
            <FiFolder className="text-4xl opacity-20" />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Leads</h3>
          <div className="space-y-3">
            {leads?.slice(0, 5).map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{lead.name}</p>
                  <p className="text-sm text-gray-500 truncate">{lead.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.status === 'new' ? 'bg-green-100 text-green-800' :
                  lead.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
            {leads?.length === 0 && (
              <p className="text-center text-gray-500 py-4">No leads yet</p>
            )}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Blog Posts</h3>
          <div className="space-y-3">
            {blogs?.slice(0, 5).map((blog, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{blog.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                    {blog.isAIGenerated && ' • 🤖 AI'}
                  </p>
                </div>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
                >
                  View
                </a>
              </div>
            ))}
            {blogs?.length === 0 && (
              <p className="text-center text-gray-500 py-4">No blogs yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Placeholder tabs - will be implemented
function LeadsTab({ leads, router }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Leads</h2>
        <button
          onClick={() => router.push('/admin/leads')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Open Full Dashboard
        </button>
      </div>
      <p className="text-gray-600">Click "Open Full Dashboard" to manage leads with advanced features.</p>
    </div>
  )
}

function PortfolioTab({ router }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio Management</h2>
        <button
          onClick={() => router.push('/admin/portfolio')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Open Portfolio Manager
        </button>
      </div>
      <p className="text-gray-600">Click "Open Portfolio Manager" to add, edit, and manage projects.</p>
    </div>
  )
}

function BlogsTab({ blogs, blogRuns, router }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <button
            onClick={() => router.push('/admin/blog-generator')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Generate New Blog
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium">Total Posts</p>
            <p className="text-3xl font-bold text-purple-900 mt-2">{blogs?.length || 0}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">AI Generated</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">
              {blogs?.filter(b => b.isAIGenerated).length || 0}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">Success Rate</p>
            <p className="text-3xl font-bold text-green-900 mt-2">
              {blogRuns?.length > 0 
                ? Math.round((blogRuns.filter(r => r.status === 'success').length / blogRuns.length) * 100)
                : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsTab({ analytics }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
      <p className="text-gray-600">Analytics data will appear here once Supabase is configured.</p>
    </div>
  )
}

function SEOTab({ systemHealth }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <p className="font-semibold text-gray-900">Google Search Console</p>
          <p className="text-sm text-gray-600 mt-1">Monitor search performance</p>
        </a>
        <a
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <p className="font-semibold text-gray-900">Google Analytics</p>
          <p className="text-sm text-gray-600 mt-1">Track website traffic</p>
        </a>
      </div>
    </div>
  )
}

function SettingsTab({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input
            type="text"
            value="Admin"
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>
      </div>
    </div>
  )
}
