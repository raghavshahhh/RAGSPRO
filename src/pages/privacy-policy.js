import SEOHead from '../components/SEOHead'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - RAGSPRO | Raghav Shah Digital Agency"
        description="Privacy Policy for RAGSPRO - Raghav Shah's digital agency. Learn how we protect your data and privacy when building your startup in 20 days."
        keywords="ragspro privacy policy, raghav shah privacy, digital agency privacy, startup privacy policy, data protection, user privacy"
        url="https://ragspro.com/privacy-policy"
      />

      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  At RAGSPRO, we collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Contact us through our website forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Request a quote for our services</li>
                  <li>Communicate with us via email or phone</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Provide and improve our services</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send you updates about our services</li>
                  <li>Analyze website usage and improve user experience</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">3. Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">4. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">5. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>RAGSPRO</strong><br />
                    Email: ragsproai@gmail.com<br />
                    Phone: +918826073013<br />
                    Address: Delhi, India
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}