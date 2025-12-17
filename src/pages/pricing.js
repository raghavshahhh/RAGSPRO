import SEOHead from '../components/SEOHead'
import { useState } from 'react'
import { initiatePayment } from '../utils/razorpay'

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState('websites')
  const [loading, setLoading] = useState(false)

  const websitePricing = [
    {
      name: "Basic Website",
      price: "₹10K - ₹20K",
      amount: 10000,
      duration: "7-10 Days",
      description: "Perfect for small businesses and personal portfolios",
      features: [
        "Up to 5 pages",
        "Responsive design",
        "Contact form",
        "Basic SEO setup",
        "Mobile optimized",
        "1 month support"
      ],
      popular: false
    },
    {
      name: "Professional Website",
      price: "₹30K - ₹50K",
      amount: 30000,
      duration: "10-15 Days",
      description: "Ideal for growing businesses and startups",
      features: [
        "Up to 10 pages",
        "Custom design",
        "Advanced SEO",
        "Blog integration",
        "Analytics setup",
        "Payment gateway",
        "3 months support",
        "Content management"
      ],
      popular: true
    },
    {
      name: "Custom Website",
      price: "₹50K - ₹80K",
      amount: 50000,
      duration: "15-20 Days",
      description: "Full-featured solution for established businesses",
      features: [
        "Unlimited pages",
        "Premium custom design",
        "Advanced functionality",
        "E-commerce ready",
        "API integrations",
        "Admin dashboard",
        "6 months support",
        "Priority updates",
        "Performance optimization"
      ],
      popular: false
    }
  ]

  const handlePayment = async (plan) => {
    setLoading(true)
    try {
      await initiatePayment({
        amount: plan.amount,
        currency: 'INR',
        name: plan.name,
        description: plan.description,
        customerName: '',
        customerEmail: '',
        customerPhone: ''
      })
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again or contact us.')
    } finally {
      setLoading(false)
    }
  }

  const additionalServices = [
    {
      category: "Web Applications",
      items: [
        { name: "SaaS Platform", price: "₹80K - ₹2L", duration: "30-45 Days" },
        { name: "Custom Web App", price: "₹60K - ₹1.5L", duration: "20-30 Days" },
        { name: "E-commerce Platform", price: "₹50K - ₹1L", duration: "20-30 Days" }
      ]
    },
    {
      category: "Mobile Applications",
      items: [
        { name: "iOS App", price: "₹80K - ₹2L", duration: "30-45 Days" },
        { name: "Android App", price: "₹80K - ₹2L", duration: "30-45 Days" },
        { name: "Cross-Platform App", price: "₹1L - ₹2.5L", duration: "35-50 Days" }
      ]
    },
    {
      category: "AI & Automation",
      items: [
        { name: "AI Chatbot Integration", price: "₹20K - ₹60K", duration: "10-15 Days" },
        { name: "Business Automation", price: "₹30K - ₹80K", duration: "15-20 Days" },
        { name: "Custom AI Solution", price: "₹60K - ₹1.5L", duration: "20-30 Days" }
      ]
    },
    {
      category: "Maintenance & Support",
      items: [
        { name: "Monthly Maintenance", price: "₹3K - ₹10K", duration: "Ongoing" },
        { name: "Priority Support", price: "₹8K - ₹20K", duration: "Per Month" },
        { name: "Feature Updates", price: "₹10K - ₹30K", duration: "Per Feature" }
      ]
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="Pricing - RAGSPRO | Transparent Development Costs"
        description="Clear, transparent pricing for web development, mobile apps, AI automation, and more. Starting from ₹10K. No hidden costs."
      />

      {/* Hero Section */}
      <section className="pt-32 md:pt-24 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              No hidden fees. No surprises. Just honest pricing for quality development work.
            </p>
          </div>
        </div>
      </section>

      {/* Website Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Website Development</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {websitePricing.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/70 backdrop-blur-md rounded-3xl p-5 border transition-all hover:shadow-2xl hover:-translate-y-1 ${
                  plan.popular 
                    ? 'border-black/20 shadow-xl scale-105' 
                    : 'border-white/30 hover:border-gray-300/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-gray-600 text-xs mb-3">{plan.description}</p>
                  <div className="text-3xl font-bold mb-1">{plan.price}</div>
                  <div className="text-xs text-gray-500">{plan.duration}</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePayment(plan)}
                  disabled={loading}
                  className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400'
                      : 'bg-gray-100 text-black hover:bg-gray-200 disabled:bg-gray-300'
                  }`}
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Additional Services</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-md rounded-3xl p-5 border border-white/30 hover:shadow-xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold mb-4">{service.category}</h3>
                <div className="space-y-3">
                  {service.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.duration}</div>
                      </div>
                      <div className="text-base font-bold">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Pricing FAQs</h2>
          
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:shadow-lg transition-all">
              <h3 className="text-base font-semibold mb-2">What's included in the price?</h3>
              <p className="text-gray-600 text-sm">All prices include design, development, testing, deployment, and the specified support period. No hidden costs.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:shadow-lg transition-all">
              <h3 className="text-base font-semibold mb-2">Do you offer payment plans?</h3>
              <p className="text-gray-600 text-sm">Yes! We offer flexible payment plans. Typically 50% upfront and 50% on delivery. Custom plans available for larger projects.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:shadow-lg transition-all">
              <h3 className="text-base font-semibold mb-2">What if I need something custom?</h3>
              <p className="text-gray-600 text-sm">We love custom projects! Contact us with your requirements and we'll provide a detailed quote within 24 hours.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/30 hover:shadow-lg transition-all">
              <h3 className="text-base font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-gray-600 text-sm">We offer a satisfaction guarantee. If you're not happy with the initial design, we'll refund your deposit minus any work completed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-400">Ready to Start Your Project?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Get a custom quote tailored to your specific needs. No obligations, just honest advice.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                const event = new CustomEvent('openQuoteForm')
                window.dispatchEvent(event)
              }}
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Custom Quote
            </button>
            <a
              href="https://wa.me/918700048490?text=Hi, I'd like to discuss pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
