import { useState, useEffect } from 'react'
import { FaStar, FaPaperPlane } from 'react-icons/fa'

export default function ReviewSubmissionBox({ isOpen, onClose, onReviewSubmit, editData }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    review: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Load edit data when provided
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        company: editData.title?.split(' at ')[1] || '',
        role: editData.title?.split(' at ')[0] || '',
        review: editData.quote || '',
        email: ''
      })
      setRating(5) // Default to 5 stars for edit
    } else {
      // Reset form when not editing
      setFormData({
        name: '',
        company: '',
        role: '',
        review: '',
        email: ''
      })
      setRating(0)
    }
  }, [editData, isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!rating || !formData.name || !formData.review) {
      alert('Please fill in all required fields and select a rating')
      return
    }

    setIsSubmitting(true)

    try {
      // Here you can add your API call to save the review
      const reviewData = {
        ...formData,
        rating,
        submittedAt: new Date().toISOString()
      }
      
      console.log('Review submitted:', reviewData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Call parent callback to add review
      if (onReviewSubmit) {
        onReviewSubmit(formData)
      }

      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        onClose()
        setRating(0)
        setFormData({
          name: '',
          company: '',
          role: '',
          review: '',
          email: ''
        })
      }, 3000)

    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        {/* Modal Container */}
        <div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg my-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div>
            {isSubmitted ? (
              // Success Message
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Thank You!</h3>
                <p className="text-gray-600">Your review has been submitted successfully.</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-black text-white p-4 rounded-t-2xl">
                  <h3 className="text-lg font-bold text-gray-400">
                    {editData ? 'Edit Review' : 'Write a Review'}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {editData ? 'Update your review' : 'Share your experience with RAGSPRO'}
                  </p>
                </div>

                {/* Form - Compact Version */}
                <form onSubmit={handleSubmit} className="p-5 space-y-3">
                  {/* Star Rating */}
                  <div>
                    <label className="block text-xs font-medium text-black mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-2xl transition-all hover:scale-110"
                        >
                          <FaStar
                            className={
                              star <= (hoverRating || rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Two Column Layout for Name & Company */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-black mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
                        placeholder="John Doe"
                        style={{ fontSize: '16px' }}
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-medium text-black mb-1.5">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
                        placeholder="Your Company"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                  </div>

                  {/* Two Column Layout for Role & Email */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Role */}
                    <div>
                      <label className="block text-xs font-medium text-black mb-1.5">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
                        placeholder="Founder"
                        style={{ fontSize: '16px' }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-black mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black text-sm"
                        placeholder="email@example.com"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                  </div>

                  {/* Review */}
                  <div>
                    <label className="block text-xs font-medium text-black mb-1.5">
                      Your Review *
                    </label>
                    <textarea
                      name="review"
                      value={formData.review}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none text-sm"
                      placeholder="Tell us about your experience..."
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <FaPaperPlane className="w-3.5 h-3.5" />
                        Submit Review
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-gray-500 text-center">
                    Your review will be reviewed before being published
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
