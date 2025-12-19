import { useState } from 'react'
import { useRouter } from 'next/router'
import SEOHead from '../components/SEOHead'

export default function GetQuote() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    validation: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => router.push('/'), 3000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (submitted) {
    return (
      <>
        <SEOHead 
          title="Thank You - RAGSPRO"
          description="We'll get back to you within 24 hours"
          noindex={true}
        />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-black mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              We've received your project details. Our team will review and send you a custom roadmap within 24 hours.
            </p>
            <p className="text-sm text-gray-500">Redirecting to homepage...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEOHead 
        title="Get Your Project Roadmap - RAGSPRO"
        description="Tell us about your project and get a custom development plan"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Get Your Project Roadmap
            </h1>
            <p className="text-xl text-gray-600">
              Tell us about your project and get a custom development plan
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                What do you want to build? *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
              >
                <option value="">Select project type</option>
                <option value="saas">SaaS Web App</option>
                <option value="mobile">Mobile App</option>
                <option value="ecommerce">E-commerce Platform</option>
                <option value="ai">AI-Powered Product</option>
                <option value="marketplace">Marketplace</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                What's your budget? *
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
              >
                <option value="">Select budget range</option>
                <option value="under-85k">Under ₹85,000</option>
                <option value="85k-150k">₹85,000 - ₹1,50,000</option>
                <option value="150k-300k">₹1,50,000 - ₹3,00,000</option>
                <option value="300k+">₹3,00,000+</option>
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                When do you need it? *
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
              >
                <option value="">Select timeline</option>
                <option value="1-2-weeks">1-2 weeks (Rush)</option>
                <option value="3-4-weeks">3-4 weeks (Standard)</option>
                <option value="1-2-months">1-2 months</option>
                <option value="3+-months">3+ months</option>
              </select>
            </div>

            {/* Validation */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Have you validated your idea? *
              </label>
              <select
                name="validation"
                value={formData.validation}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg"
              >
                <option value="">Select validation status</option>
                <option value="paying-customers">Yes, I have paying customers</option>
                <option value="users-waitlist">Yes, I have users/waitlist</option>
                <option value="market-research">No, but I've done market research</option>
                <option value="just-idea">No, it's just an idea</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Tell us about your project (optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your project, target audience, key features..."
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 transition-all text-lg resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Get My Custom Roadmap →'
              )}
            </button>

            {/* Footer Note */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Free consultation • No commitment • Response within 24 hours
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
