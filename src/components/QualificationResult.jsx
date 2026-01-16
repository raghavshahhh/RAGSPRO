export default function QualificationResult({ qualification, leadData, onBookCall, onViewResources, onClose }) {
  const isQualified = qualification.qualified

  if (isQualified) {
    // Qualified leads - show calendar booking
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-black mb-2">
              {qualification.tier === 'high' ? 'Perfect Fit!' : 'Great Match!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {qualification.message}
            </p>

            {/* Project Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-black mb-3">Your Project Summary:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Type:</span>
                  <span className="font-medium text-black">{leadData.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium text-black">{leadData.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-medium text-black">{leadData.timeline}</span>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-black mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">1.</span>
                  <span>Book a 15-minute consultation call</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">2.</span>
                  <span>We'll discuss your project in detail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">3.</span>
                  <span>Get a custom 20-day development plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">4.</span>
                  <span>Receive transparent, fixed-price quote</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={onBookCall}
                className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Book Free Consultation →
              </button>
              
              <div className="flex gap-3">
                <a
                  href="https://wa.me/918826073013?text=Hi, I just filled the qualification form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors text-center text-sm"
                >
                  WhatsApp Us
                </a>
                <a
                  href="tel:+918826073013"
                  className="flex-1 bg-gray-100 text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors text-center text-sm"
                >
                  Call Now
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-gray-500 text-sm hover:text-black transition-colors"
              >
                I'll decide later
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    // Not qualified - show resources
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-8">
          <div className="text-center">
            {/* Info Icon */}
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-black mb-2">
              Thanks for Your Interest!
            </h2>
            <p className="text-gray-600 mb-6">
              {qualification.message}
            </p>

            {/* Helpful Resources */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-black mb-4">Helpful Resources to Get Started:</h3>
              <div className="space-y-3">
                <a
                  href="/blog/mvp-cost-india"
                  className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-black mb-1">MVP Cost Guide</h4>
                  <p className="text-sm text-gray-600">Learn about MVP development costs in India</p>
                </a>
                <a
                  href="/blog/build-saas-app-20-days"
                  className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-black mb-1">20-Day Development Process</h4>
                  <p className="text-sm text-gray-600">How we build MVPs in 20 days</p>
                </a>
                <a
                  href="/projects"
                  className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-black mb-1">Our Portfolio</h4>
                  <p className="text-sm text-gray-600">See startups we've built</p>
                </a>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-black mb-2">Want to discuss anyway?</h3>
              <p className="text-sm text-gray-700 mb-3">
                We're happy to chat about your project and explore options that fit your budget.
              </p>
              <a
                href="https://wa.me/918826073013?text=Hi, I want to discuss my project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors text-sm"
              >
                Chat on WhatsApp
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}
