import { useEffect } from 'react'

export default function CalendarIntegration({ leadData, onClose }) {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      document.body.removeChild(script)
    }
  }, [])

  // Calendly URL - Replace with your actual Calendly link
  const calendlyUrl = 'https://calendly.com/ragspro/mvp-consultation'
  
  // Prefill data from qualification form
  const prefillData = {
    name: leadData?.name || '',
    email: leadData?.email || '',
    customAnswers: {
      a1: leadData?.phone || '',
      a2: leadData?.projectType || '',
      a3: leadData?.budget || '',
      a4: leadData?.timeline || ''
    }
  }

  const calendlyUrlWithPrefill = `${calendlyUrl}?name=${encodeURIComponent(prefillData.name)}&email=${encodeURIComponent(prefillData.email)}`

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-black">Book Your Free Consultation</h2>
            <p className="text-sm text-gray-600">Choose a time that works for you</p>
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
        
        <div className="h-[600px] overflow-y-auto">
          {/* Calendly Inline Widget */}
          <div
            className="calendly-inline-widget"
            data-url={calendlyUrlWithPrefill}
            style={{ minWidth: '320px', height: '600px' }}
          />
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>15-minute call</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Custom roadmap</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
