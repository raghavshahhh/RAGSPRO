import { useState } from 'react'

export default function QualificationForm({ onQualified, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    ideaValidated: '',
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.projectType) newErrors.projectType = 'Project type is required'
    if (!formData.budget) newErrors.budget = 'Budget is required'
    if (!formData.timeline) newErrors.timeline = 'Timeline is required'
    if (!formData.ideaValidated) newErrors.ideaValidated = 'Please select an option'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const qualifyLead = (data) => {
    let score = 0
    
    // Budget scoring (most important)
    if (data.budget === '3L+') score += 50
    else if (data.budget === '1.5L-3L') score += 40
    else if (data.budget === '85K-1.5L') score += 30
    else score += 10 // Under 85K
    
    // Timeline scoring
    if (data.timeline === '1-2 weeks') score += 25
    else if (data.timeline === '3-4 weeks') score += 20
    else if (data.timeline === '1-2 months') score += 15
    else score += 5 // 3+ months
    
    // Idea validation scoring
    if (data.ideaValidated === 'yes-paying') score += 25
    else if (data.ideaValidated === 'yes-users') score += 15
    else if (data.ideaValidated === 'no-research') score += 10
    else score += 5 // Just an idea
    
    // Qualification logic
    if (score >= 70) {
      return {
        qualified: true,
        tier: 'high',
        message: 'Perfect fit! Book a free consultation to discuss your project.',
        action: 'calendar'
      }
    } else if (score >= 50) {
      return {
        qualified: true,
        tier: 'medium',
        message: 'Great! Let\'s discuss your project. Book a consultation.',
        action: 'calendar'
      }
    } else if (score >= 30) {
      return {
        qualified: true,
        tier: 'low',
        message: 'We can help! Book a consultation to explore options.',
        action: 'calendar'
      }
    } else {
      return {
        qualified: false,
        tier: 'not-qualified',
        message: 'Thanks for your interest! Check out our resources to get started.',
        action: 'resources'
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Qualify the lead
      const qualification = qualifyLead(formData)
      
      // Send to backend/CRM (you can add your API call here)
      console.log('Lead Data:', { ...formData, qualification })
      
      // Call parent callback with qualification result
      if (onQualified) {
        onQualified({ ...formData, qualification })
      }
      
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                Get Your Project Roadmap
              </h2>
              <p className="text-gray-600">
                Tell us about your project and get a custom development plan
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-black text-base`}
                placeholder="John Doe"
                style={{ fontSize: '16px' }}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-black text-base`}
                  placeholder="john@example.com"
                  inputMode="email"
                  autoComplete="email"
                  style={{ fontSize: '16px' }}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-black text-base`}
                  placeholder="+91 98765 43210"
                  inputMode="tel"
                  autoComplete="tel"
                  style={{ fontSize: '16px' }}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                What do you want to build? *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.projectType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-black text-base`}
                style={{ fontSize: '16px' }}
              >
                <option value="">Select project type</option>
                <option value="saas">SaaS Web App</option>
                <option value="mobile">Mobile App</option>
                <option value="ecommerce">E-commerce Platform</option>
                <option value="ai">AI-Powered Product</option>
                <option value="marketplace">Marketplace</option>
                <option value="other">Other</option>
              </select>
              {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                What's your budget? *
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.budget ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-black text-base`}
                style={{ fontSize: '16px' }}
              >
                <option value="">Select budget range</option>
                <option value="under-85K">Under ₹85,000</option>
                <option value="85K-1.5L">₹85,000 - ₹1,50,000</option>
                <option value="1.5L-3L">₹1,50,000 - ₹3,00,000</option>
                <option value="3L+">₹3,00,000+</option>
              </select>
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                When do you need it? *
              </label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.timeline ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-black text-base`}
                style={{ fontSize: '16px' }}
              >
                <option value="">Select timeline</option>
                <option value="1-2 weeks">1-2 weeks (Rush)</option>
                <option value="3-4 weeks">3-4 weeks (Standard)</option>
                <option value="1-2 months">1-2 months</option>
                <option value="3+ months">3+ months</option>
              </select>
              {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
            </div>

            {/* Idea Validation */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Have you validated your idea? *
              </label>
              <select
                name="ideaValidated"
                value={formData.ideaValidated}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.ideaValidated ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-black text-base`}
                style={{ fontSize: '16px' }}
              >
                <option value="">Select validation status</option>
                <option value="yes-paying">Yes, I have paying customers</option>
                <option value="yes-users">Yes, I have users/waitlist</option>
                <option value="no-research">No, but I've done market research</option>
                <option value="just-idea">No, it's just an idea</option>
              </select>
              {errors.ideaValidated && <p className="text-red-500 text-sm mt-1">{errors.ideaValidated}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Tell us about your project (optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none text-base"
                placeholder="Describe your project, target users, and key features..."
                style={{ fontSize: '16px' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Get My Custom Roadmap →'}
            </button>

            <p className="text-sm text-gray-500 text-center">
              Free consultation • No commitment • Response within 24 hours
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
