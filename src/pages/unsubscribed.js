// Unsubscribe Confirmation Page
import { motion } from 'framer-motion'
import Link from 'next/link'
import SEOHead from '../components/SEOHead'
import { FiMail, FiCheck } from 'react-icons/fi'

export default function Unsubscribed() {
  return (
    <>
      <SEOHead 
        title="Unsubscribed | RAGSPRO"
        description="You have been unsubscribed from RAGSPRO newsletter"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              You've Been Unsubscribed
            </h1>
            
            <p className="text-gray-600 mb-6">
              You will no longer receive newsletter emails from RAGSPRO. 
              We're sorry to see you go!
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">
                Changed your mind? You can always subscribe again from our website.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Go to Homepage
              </Link>
              
              <Link 
                href="/blog"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            If you unsubscribed by mistake, contact us at{' '}
            <a href="mailto:ragsproai@gmail.com" className="text-black hover:underline">
              ragsproai@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </>
  )
}
