import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight, FiClock, FiDollarSign, FiHeadphones } from 'react-icons/fi'

export default function InvestmentPackages() {
  const [selectedPackage, setSelectedPackage] = useState(null)

  const packages = [
    {
      id: 'starter',
      name: 'Starter Package',
      price: '₹20,000',
      timeline: '2-3 days',
      description: 'Perfect for small businesses and startups',
      features: [
        'Landing Page Design',
        'Basic SEO Setup',
        'Mobile Responsive',
        'Contact Form Integration',
        '2 Revisions Included'
      ],
      support: '7 days free support',
      ideal: 'Small businesses, Personal portfolios'
    },
    {
      id: 'professional',
      name: 'Professional Package',
      price: '₹50,000',
      timeline: '3-5 days',
      description: 'Ideal for growing businesses',
      features: [
        'Multi-page Website',
        'Advanced SEO Optimization',
        'CMS Integration',
        'Payment Gateway Setup',
        'Social Media Integration',
        '3 Revisions Included'
      ],
      support: '15 days free support',
      ideal: 'Growing businesses, E-commerce',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      price: '₹1,00,000',
      timeline: '5-7 days',
      description: 'Complete business solution',
      features: [
        'Custom Web Application',
        'AI Tool Integration',
        'Database Management',
        'Admin Dashboard',
        'API Development',
        'Unlimited Revisions'
      ],
      support: '30 days free support',
      ideal: 'Large businesses, Custom solutions'
    },
    {
      id: 'ai-automation',
      name: 'AI Automation Package',
      price: '₹1,50,000',
      timeline: '7-10 days',
      description: 'AI-powered business automation',
      features: [
        'Custom AI Assistant',
        'Workflow Automation',
        'Data Analysis Tools',
        'Integration with Existing Systems',
        'Training & Documentation',
        'Ongoing Optimization'
      ],
      support: '60 days free support',
      ideal: 'Businesses seeking automation'
    }
  ]

  return (
    <section id="investment-packages" className="py-16 md:py-24 bg-gray-900/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Investment <span className="text-gradient">Packages</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the perfect package for your business needs. All packages include transparent pricing with no hidden costs.
          </p>
          
          {/* Important Notes */}
          <div className="glass-card p-6 rounded-xl max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-semibold text-white mb-4">Important Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div className="flex items-start">
                <FiDollarSign className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                <div>
                  <strong className="text-white">Transparent Pricing:</strong> Final cost may vary based on specific requirements. No hidden charges.
                </div>
              </div>
              <div className="flex items-start">
                <FiClock className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                <div>
                  <strong className="text-white">Realistic Timeline:</strong> Delivery time depends on project complexity and custom requirements.
                </div>
              </div>
              <div className="flex items-start">
                <FiHeadphones className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                <div>
                  <strong className="text-white">Post-Delivery Support:</strong> Free support period covers bug fixes and minor adjustments only.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-card p-6 rounded-2xl relative ${
                pkg.popular ? 'border-2 border-accent' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-accent mb-2">{pkg.price}</div>
                <div className="text-sm text-gray-400 mb-4">{pkg.timeline}</div>
                <p className="text-gray-300 text-sm">{pkg.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <FiCheck className="text-accent mr-2 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="text-sm text-gray-400 mb-2">
                  <strong className="text-accent">Support:</strong> {pkg.support}
                </div>
                <div className="text-sm text-gray-400">
                  <strong className="text-accent">Ideal for:</strong> {pkg.ideal}
                </div>
              </div>

              <a
                href={`https://wa.me/918826073013?text=Hi, I'm interested in the ${pkg.name} (${pkg.price}). Can we discuss the project details?`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center ${
                  pkg.popular
                    ? 'bg-accent text-black hover:bg-accent/90'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">💬</span>
                Discuss Project
              </a>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">What's Included in Every Package</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiCheck className="text-accent" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-2">Quality Assurance</h4>
                <p className="text-gray-400 text-sm">Thorough testing before delivery</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiHeadphones className="text-accent" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-2">Free Support</h4>
                <p className="text-gray-400 text-sm">Post-delivery support included</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiDollarSign className="text-accent" size={24} />
                </div>
                <h4 className="text-white font-semibold mb-2">Transparent Pricing</h4>
                <p className="text-gray-400 text-sm">No hidden costs or surprises</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}