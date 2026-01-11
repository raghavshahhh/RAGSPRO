// User Dashboard - View projects, payments, profile
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import SEOHead from '../../components/SEOHead'
import { 
  FiUser, FiCreditCard, FiFolder, FiSettings, FiLogOut, 
  FiMail, FiPhone, FiCalendar, FiDollarSign, FiCheckCircle,
  FiClock, FiAlertCircle, FiEdit2, FiSave
} from 'react-icons/fi'

export default function UserDashboard() {
  const router = useRouter()
  const { user, profile, loading, signOut, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [payments, setPayments] = useState([])
  const [projects, setProjects] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [editing, setEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    company: ''
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/?login=true')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchUserData()
      setProfileData({
        name: user.user_metadata?.name || '',
        phone: user.user_metadata?.phone || '',
        company: user.user_metadata?.company || ''
      })
    }
  }, [user])

  const fetchUserData = async () => {
    setLoadingData(true)
    try {
      const [paymentsRes, projectsRes] = await Promise.all([
        fetch('/api/user/payments'),
        fetch('/api/user/projects')
      ])
      
      const paymentsData = await paymentsRes.json()
      const projectsData = await projectsRes.json()
      
      setPayments(paymentsData.payments || [])
      setProjects(projectsData.projects || [])
    } catch (err) {
      console.error('Error fetching user data:', err)
    } finally {
      setLoadingData(false)
    }
  }

  const handleSaveProfile = async () => {
    const { error } = await updateProfile(profileData)
    if (!error) {
      setEditing(false)
    }
  }

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiUser },
    { id: 'payments', label: 'Payments', icon: FiCreditCard },
    { id: 'projects', label: 'Projects', icon: FiFolder },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ]

  return (
    <>
      <SEOHead 
        title="Dashboard | RAGSPRO"
        description="Manage your projects and payments"
        noindex={true}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">RAGSPRO</a>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="bg-white rounded-xl shadow-sm p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Welcome Card */}
                  <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-6">
                    <h1 className="text-2xl font-bold mb-2">
                      Welcome back, {user.user_metadata?.name || 'User'}! 👋
                    </h1>
                    <p className="text-gray-300">
                      Here's an overview of your account and projects.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <FiDollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Paid</p>
                          <p className="text-2xl font-bold">
                            ₹{payments.reduce((sum, p) => p.status === 'completed' ? sum + p.amount : sum, 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiFolder className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Active Projects</p>
                          <p className="text-2xl font-bold">
                            {projects.filter(p => p.status === 'active').length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <FiCheckCircle className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Completed</p>
                          <p className="text-2xl font-bold">
                            {projects.filter(p => p.status === 'completed').length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b">
                      <h2 className="text-lg font-semibold">Recent Payments</h2>
                    </div>
                    <div className="divide-y">
                      {payments.slice(0, 5).map((payment, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              payment.status === 'completed' ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                              {payment.status === 'completed' ? (
                                <FiCheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <FiClock className="w-5 h-5 text-yellow-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{payment.description}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(payment.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold">₹{payment.amount.toLocaleString()}</p>
                        </div>
                      ))}
                      {payments.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                          No payments yet
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm"
                >
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold">Payment History</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {payments.map((payment, idx) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {new Date(payment.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm">{payment.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              ₹{payment.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                payment.status === 'completed' 
                                  ? 'bg-green-100 text-green-800'
                                  : payment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {payment.receipt_url && (
                                <a 
                                  href={payment.receipt_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  View
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {payments.length === 0 && (
                      <div className="p-8 text-center text-gray-500">
                        No payment history
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {projects.map((project, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{project.name}</h3>
                          <p className="text-sm text-gray-500">{project.type}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          project.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : project.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-black rounded-full h-2 transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          Started: {new Date(project.start_date).toLocaleDateString()}
                        </span>
                        {project.end_date && (
                          <span className="flex items-center gap-1">
                            <FiCheckCircle className="w-4 h-4" />
                            Due: {new Date(project.end_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                      No projects yet. Start your first project with us!
                    </div>
                  )}
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm"
                >
                  <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Profile Settings</h2>
                    <button
                      onClick={() => editing ? handleSaveProfile() : setEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      {editing ? <FiSave className="w-4 h-4" /> : <FiEdit2 className="w-4 h-4" />}
                      {editing ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          disabled={!editing}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          disabled
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!editing}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none disabled:bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={profileData.company}
                          onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                          disabled={!editing}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
