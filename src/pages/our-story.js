import { motion } from 'framer-motion'
import { FiTrendingUp, FiUsers, FiStar, FiZap } from 'react-icons/fi'

export default function OurStory() {
  const achievements = [
    { name: '₹5L+ Revenue Generated', icon: <FiTrendingUp size={24} className="text-accent" />, description: 'Total revenue generated across our AI products and client projects' },
    { name: '2000+ Users', icon: <FiUsers size={24} className="text-accent" />, description: 'Active users across GLOW, LAW-AI, and other AI products' },
    { name: '98% Client Satisfaction', icon: <FiStar size={24} className="text-accent" />, description: 'Consistently high ratings from satisfied clients and users' },
    { name: '15-Day Fast Delivery', icon: <FiZap size={24} className="text-accent" />, description: 'Average project delivery time from concept to launch' },
  ]

  const expertise = [
    'AI Product Development (GLOW, LAW-AI, RAGS AI launched)',
    'Business Process Automation (100+ workflows optimized)',
    'Custom AI Assistant Development (Voice & Text based)',
    'Revenue-Generating Digital Solutions (₹5L+ generated)'
  ]

  return (
    <section className="min-h-screen bg-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-full">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                  The RAGSPRO <span className="text-accent">Story</span>
                </h1>

                <p className="text-gray-700 mb-6 max-w-3xl mx-auto text-lg">
                  RAGSPRO was founded in 2023 with one mission: turn innovative ideas into profitable AI businesses.
                </p>

                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Founded by Raghav Shah, a passionate software engineer from Delhi with a BCA degree, RAGSPRO specializes in building AI products that actually generate revenue. We've successfully launched multiple profitable AI products including GLOW, LAW-AI, and RAGS AI, helping businesses automate their processes and increase revenue.
                </p>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-black mb-4">Our Expertise:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {expertise.map((item, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl mb-8 max-w-2xl mx-auto">
                  <h2 className="text-lg font-semibold text-black mb-4">Why Choose RAGSPRO?</h2>
                  <p className="text-gray-700 mb-4">
                    We don't just build products - we build profitable businesses. Our track record includes GLOW (2000+ photo transformations), LAW-AI (50+ legal professionals using), and RAGS AI (100+ beta users). Every project is designed with revenue generation and scalability in mind.
                  </p>
                  <p className="text-accent font-medium">
                    Our Guarantee: Fast delivery (15-30 days), revenue-focused solutions, and ongoing support to ensure your success.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                      {achievement.icon}
                    </div>
                    <h3 className="font-semibold text-black mb-3">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <a
                  href="https://wa.me/918826073013?text=Hi, I'm interested in RAGSPRO's AI development services and would like to book a free consultation to discuss my project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-full transition-all"
                >
                  Book Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}