import SEOHead from '../components/SEOHead'
import { motion } from 'framer-motion'

export default function TermsOfService() {
  return (
    <>
      <SEOHead 
        title="Terms of Service - RAGSPRO | Raghav Shah Digital Agency"
        description="Terms of Service for RAGSPRO - Raghav Shah's digital agency. Read our terms and conditions for startup development and digital services."
        keywords="ragspro terms of service, raghav shah terms, digital agency terms, startup terms conditions, service agreement"
        url="https://ragspro.com/terms-of-service"
      />

      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using RAGSPRO's services, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">2. Services Description</h2>
                <p className="text-gray-700 mb-4">
                  RAGSPRO provides digital agency services including:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Startup development and consulting</li>
                  <li>Web and mobile application development</li>
                  <li>Digital marketing and branding</li>
                  <li>AI and automation solutions</li>
                  <li>Business strategy and growth consulting</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">3. Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                  Payment terms will be specified in individual project agreements. Generally:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>50% advance payment required to start projects</li>
                  <li>Remaining payment due upon project completion</li>
                  <li>Additional charges may apply for scope changes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">4. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  Upon full payment, clients receive full ownership of the delivered work product. RAGSPRO retains the right to showcase completed work in our portfolio.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  RAGSPRO's liability is limited to the amount paid for the specific service. We are not liable for indirect, incidental, or consequential damages.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">6. Termination</h2>
                <p className="text-gray-700 mb-4">
                  Either party may terminate the agreement with written notice. Termination terms will be specified in individual project agreements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-black mb-4">7. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms of Service, contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>RAGSPRO</strong><br />
                    Email: ragsproai@gmail.com<br />
                    Phone: +918700048490<br />
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