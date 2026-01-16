import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import SEOHead from '../../components/SEOHead'
import PortfolioManager from '../../components/admin/PortfolioManager'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function AdminPortfolio() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/?login=true')
    }
  }, [user, loading, router])

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
        title="Portfolio Manager | RAGSPRO Admin"
        description="Manage portfolio projects"
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
                  <FiArrowLeft /> Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Portfolio Manager</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PortfolioManager />
        </div>
      </div>
    </>
  )
}
