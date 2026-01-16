'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiCheck, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact_form',
          page: window.location.pathname,
          metadata: {
            projectType: formData.projectType,
            budget: formData.budget,
            submittedAt: new Date().toISOString()
          }
        })
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: ''
        })
      } else {
        throw new Error(data.error || 'Failed to submit')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  const projectTypes = [
    'Mobile App',
    'Web App',
    'SaaS Product',
    'E-commerce',
    'AI/Automation',
    'MVP Development',
    'Other'
  ]

  const budgetRanges = [
    'Under ₹50K',
    '₹50K - ₹1L',
    '₹1L - ₹2L',
    '₹2L - ₹5L',
    '₹5L+'
  ]

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="inline-block px-4 py-1.5 bg-black text-white text-xs font-medium rounded-full mb-4"
          >
            LET'S BUILD TOGETHER
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Start Your Project
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="text-gray-600 max-w-xl mx-auto"
          >
            Tell us about your idea and we'll get back to you within 24 hours with a custom roadmap.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <div className="bg-black text-white rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6">Quick Contact</h3>
              
              <div className="space-y-4">
                <a 
                  href="https://wa.me/918826073013?text=Hi! I want to discuss a project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <p className="font-medium">+91 87000 48490</p>
                  </div>
                </a>

                <a 
                  href="tel:+918826073013"
                  className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call Us</p>
                    <p className="font-medium">+91 87000 48490</p>
                  </div>
                </a>

                <a 
                  href="mailto:ragsproai@gmail.com"
                  className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">ragsproai@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 bg-white/10 rounded-xl">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium">New Delhi, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-gray-400 mb-2">Response Time</p>
                <p className="text-2xl font-bold">Under 24 Hours</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">Select type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map(range => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: range })}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.budget === range
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tell us about your project
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your idea, goals, and any specific requirements..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  By submitting, you agree to our Privacy Policy. We'll never share your data.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
