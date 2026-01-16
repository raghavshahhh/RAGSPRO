import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import SEOHead from '../../components/SEOHead'
import Link from 'next/link'
import { FiUsers, FiFolder, FiLogOut, FiHome, FiFileText, FiBarChart2, FiSettings, FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/?login=true')
    }
  }, [user, loading, router])

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
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/admin', active: true },
    { id: 'leads', label: 'Leads', icon: FiUsers, path: '/admin/leads' },
    { id: 'portfolio', label: 'Portfolio', icon: FiFolder, path: '/admin/portfolio' },
    { id: 'blog', label: 'Blog Posts', icon: FiFileText, path: '/blog' },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2, path: '#' },
    { id: 'settings', label: 'Settings', icon: FiSettings, path: '#' },
  ]

  return (
    <>
      <SEOHead 
        title="Admin Dashboard | RAGSPRO"
        description="Admin control panel"
        noindex={true}
      />

      <div className="flex h-screen bg-gray-50">
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
                  if (item.path !== '#') {
                    router.push(item.path)
                    setSidebarOpen(false)
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  item.active
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
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FiMenu size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
            <div className="w-6" /> {/* Spacer */}
          </div>

          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-8 py-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h2>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Leads</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FiUsers className="text-blue-600" size={24} />
                  </div>
                </div>
                <p className="text-green-600 text-sm mt-4 cursor-pointer hover:underline" onClick={() => router.push('/admin/leads')}>
                  → View all leads
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Projects</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FiFolder className="text-purple-600" size={24} />
                  </div>
                </div>
                <p className="text-green-600 text-sm mt-4 cursor-pointer hover:underline" onClick={() => router.push('/admin/portfolio')}>
                  → Manage portfolio
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Blog Posts</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FiFileText className="text-green-600" size={24} />
                  </div>
                </div>
                <p className="text-green-600 text-sm mt-4 cursor-pointer hover:underline" onClick={() => router.push('/blog')}>
                  → View all posts
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Visitors</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <FiBarChart2 className="text-orange-600" size={24} />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  → Coming soon
                </p>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Leads Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => router.push('/admin/leads')}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Leads Dashboard</h3>
                    <p className="text-blue-100 mb-4 text-sm sm:text-base">View and manage all leads from forms</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm">Real-time</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm">Auto-refresh</span>
                    </div>
                  </div>
                  <FiUsers className="text-4xl sm:text-6xl opacity-20" />
                </div>
              </motion.div>

              {/* Portfolio Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => router.push('/admin/portfolio')}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Portfolio Manager</h3>
                    <p className="text-purple-100 mb-4 text-sm sm:text-base">Add, edit, and manage projects</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm">CRUD</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm">Live preview</span>
                    </div>
                  </div>
                  <FiFolder className="text-4xl sm:text-6xl opacity-20" />
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="p-4 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="text-sm font-semibold text-gray-900">Homepage</div>
                </button>
                <button
                  onClick={() => router.push('/get-quote')}
                  className="p-4 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-sm font-semibold text-gray-900">Get Quote</div>
                </button>
                <button
                  onClick={() => router.push('/projects')}
                  className="p-4 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="text-2xl mb-2">💼</div>
                  <div className="text-sm font-semibold text-gray-900">Projects</div>
                </button>
                <button
                  onClick={() => router.push('/blog')}
                  className="p-4 text-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-sm font-semibold text-gray-900">Blog</div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
