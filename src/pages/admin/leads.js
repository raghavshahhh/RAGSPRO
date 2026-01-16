import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import SEOHead from '../../components/SEOHead'
import Link from 'next/link'
import { FiArrowLeft, FiRefreshCw, FiMail, FiPhone, FiUser, FiCalendar, FiMessageSquare } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function AdminLeads() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [leads, setLeads] = useState([])
  const [loadingLeads, setLoadingLeads] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/?login=true')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchLeads()
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchLeads, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads')
      const data = await res.json()
      if (data.success) {
        setLeads(data.leads)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoadingLeads(false)
    }
  }

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus })
      })
      
      if (res.ok) {
        fetchLeads()
      }
    } catch (error) {
      console.error('Error updating lead:', error)
    }
  }

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter)

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-green-100 text-green-800',
      converted: 'bg-purple-100 text-purple-800',
      lost: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <>
      <SEOHead 
        title="Leads Dashboard | RAGSPRO Admin"
        description="Manage leads and inquiries"
        noindex={true}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/"
                  className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                >
                  <FiArrowLeft /> Back
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Leads Dashboard</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {leads.length} Total
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={fetchLeads}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-black transition-colors"
                >
                  <FiRefreshCw className={loadingLeads ? 'animate-spin' : ''} />
                  Refresh
                </button>
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filter === status
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status !== 'all' && (
                  <span className="ml-2 text-xs opacity-75">
                    ({leads.filter(l => l.status === status).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Leads List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {loadingLeads ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No leads found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Lead Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <FiUser className="text-gray-400" />
                            {lead.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                              {lead.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {lead.source || 'website'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {lead.email && (
                          <a 
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-black"
                          >
                            <FiMail className="flex-shrink-0" />
                            <span className="truncate">{lead.email}</span>
                          </a>
                        )}
                        {lead.phone && (
                          <a 
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-black"
                          >
                            <FiPhone className="flex-shrink-0" />
                            {lead.phone}
                          </a>
                        )}
                      </div>

                      {lead.message && (
                        <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          <FiMessageSquare className="flex-shrink-0 mt-0.5" />
                          <p className="flex-1">{lead.message}</p>
                        </div>
                      )}

                      {lead.metadata && Object.keys(lead.metadata).length > 0 && (
                        <div className="flex flex-wrap gap-2 text-xs">
                          {lead.metadata.projectType && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                              {lead.metadata.projectType}
                            </span>
                          )}
                          {lead.metadata.budget && (
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded">
                              {lead.metadata.budget}
                            </span>
                          )}
                          {lead.metadata.timeline && (
                            <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">
                              {lead.metadata.timeline}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FiCalendar />
                        {new Date(lead.created_at).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                      
                      <a
                        href={`https://wa.me/91${lead.phone?.replace(/\D/g, '')}?text=Hi ${lead.name}, this is Raghav from RAGSPRO`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
