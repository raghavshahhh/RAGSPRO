// Newsletter Subscription Form Component
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi'

export default function NewsletterForm({ 
  variant = 'default', // default, compact, footer
  source = 'website',
  className = ''
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source })
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setMessage(data.message || 'Successfully subscribed!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe')
      }
    } catch (err) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <div className="relative flex-1">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading' || status === 'success'}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm disabled:bg-gray-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm font-medium whitespace-nowrap"
        >
          {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Subscribe'}
        </button>
      </form>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={className}>
        <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
        <p className="text-gray-400 text-sm mb-4">
          Get startup tips, tech insights & exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
        {message && (
          <p className={`text-sm mt-2 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white ${className}`}
    >
      <div className="max-w-xl mx-auto text-center">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiMail className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold mb-3">
          Join 5,000+ Founders & Developers
        </h3>
        <p className="text-gray-400 mb-6">
          Get weekly startup insights, tech tutorials, and exclusive resources delivered to your inbox.
        </p>

        {status === 'success' ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center gap-3 py-4"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <FiCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">You're subscribed!</p>
              <p className="text-sm text-gray-400">Check your inbox for confirmation.</p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={status === 'loading'}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Subscribing...
                  </span>
                ) : 'Subscribe Free'}
              </button>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <FiAlertCircle />
                {message}
              </div>
            )}

            <p className="text-xs text-gray-500">
              No spam, ever. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
            </p>
          </form>
        )}
      </div>
    </motion.div>
  )
}
