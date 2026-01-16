import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import SEOHead from '../../components/SEOHead'
import Link from 'next/link'
import { FiUsers, FiFolder, FiLogOut, FiHome } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!user) return null

  const adminCards = [
    {
      title: 'Leads Dashboard',
      description: 'View and manage all leads from get-quote and contact forms',
      icon: FiUsers,
      href: '/admin/leads',
      color: 'bg-blue-500',
      stats: 'Real-time updates'
    },
    {
      title: 'Portfolio Manager',
      description: 'Add, edit, and manage portfolio projects',
      icon: FiFolder,
      href: '/admin/portfolio',
      color: 'bg-purple-500',
      stats: 'Manage projects'
    }
  ]

  return (
    <>
      <SEOHead 
        title="Admin Dashboard | RAGSPRO"
        description="Admin control panel"
        noindex={true}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-black transition-colors"
                >
                  <FiHome /> Home
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <FiLogOut /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-lg p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
            <p className="text-gray-300">
              Logged in as: <span className="font-semibold">{user.email}</span>
            </p>
          </div>

          {/* Admin Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminCards.map((card, index) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={card.href}>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className={`${card.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                        <card.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {card.description}
                        </p>
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {card.stats}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="/get-quote"
                target="_blank"
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900">Get Quote Page</p>
              </a>
              <a
                href="/projects"
                target="_blank"
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900">Projects Page</p>
              </a>
              <a
                href="/contact"
                target="_blank"
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900">Contact Page</p>
              </a>
              <a
                href="/"
                target="_blank"
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900">Homepage</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
