import { useState } from 'react'
import { FaCheckCircle, FaRocket, FaClock, FaMoneyBillWave, FaWhatsapp } from 'react-icons/fa'
import QualificationForm from './QualificationForm'
import QualificationResult from './QualificationResult'
import CalendarIntegration from './CalendarIntegration'
import ServiceSchema from './schema/ServiceSchema'
import FAQSchema from './schema/FAQSchema'

export default function TransactionalLandingPage({
  service,
  title,
  subtitle,
  description,
  benefits,
  pricing,
  process,
  faqs,
  cta
}) {
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [qualificationData, setQualificationData] = useState(null)

  const handleQualified = (data) => {
    setQualificationData(data)
    setShowQuoteForm(false)
    setShowResult(true)
  }

  const handleBookCall = () => {
    setShowResult(false)
    setShowCalendar(true)
  }

  const handleViewResources = () => {
    setShowResult(false)
  }

  const handleCloseAll = () => {
    setShowQuoteForm(false)
    setShowResult(false)
    setShowCalendar(false)
    setQualificationData(null)
  }

  return (
    <>
      {/* Schema Markup */}
      <ServiceSchema
        name={service}
        description={description}
        provider="RAGSPRO"
        areaServed={["Delhi", "India"]}
        priceRange={pricing.range}
      />
      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-black text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowQuoteForm(true)}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                {cta.primary}
              </button>
              <a
                href="https://wa.me/918826073013?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors flex items-center gap-2"
              >
                <FaWhatsapp />
                {cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Why Choose Our {service}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4">
                  <benefit.icon className="text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {pricing.description}
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="text-5xl font-bold mb-4">{pricing.range}</div>
              <p className="text-gray-600 mb-6">{pricing.note}</p>
              <ul className="text-left space-y-3 mb-8">
                {pricing.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book a free consultation and get your custom roadmap in 24 hours
          </p>
          <button
            onClick={() => setShowQuoteForm(true)}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            {cta.primary}
          </button>
        </div>
      </section>

      {/* Qualification Form */}
      {showQuoteForm && (
        <QualificationForm
          onQualified={handleQualified}
          onClose={handleCloseAll}
        />
      )}

      {/* Qualification Result */}
      {showResult && qualificationData && (
        <QualificationResult
          qualification={qualificationData.qualification}
          leadData={qualificationData}
          onBookCall={handleBookCall}
          onViewResources={handleViewResources}
          onClose={handleCloseAll}
        />
      )}

      {/* Calendar Integration */}
      {showCalendar && qualificationData && (
        <CalendarIntegration
          leadData={qualificationData}
          onClose={handleCloseAll}
        />
      )}
    </>
  )
}
