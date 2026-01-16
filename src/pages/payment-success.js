import SEOHead from '../components/SEOHead'
import { useRouter } from 'next/router'

export default function PaymentSuccess() {
  const router = useRouter()

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <SEOHead 
        title="Payment Successful - RAGSPRO"
        description="Your payment was successful. We will contact you shortly."
      />

      <div className="max-w-md mx-auto px-6 text-center">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-xl">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. We have received your order and will contact you shortly to discuss the next steps.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </button>
            <a
              href="https://wa.me/918826073013?text=Hi, I just completed my payment"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
