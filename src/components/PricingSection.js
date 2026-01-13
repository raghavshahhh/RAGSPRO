'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PricingSection() {
  const [isHovered, setIsHovered] = useState(false)

  const infoPoints = [
    { 
      icon: (
        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
      ), 
      title: 'Request', 
      desc: 'Fill out our form and let us know what you want to build, literally anything.' 
    },
    { 
      icon: (
        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0z" />
          </svg>
        </div>
      ), 
      title: 'Meet the Team', 
      desc: 'Meet our developers and set up step-by-step clear roadmap for your startup.' 
    },
    { 
      icon: (
        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
      ), 
      title: 'Receive', 
      desc: 'Receive your app within 20 days & launch' 
    }
  ]

  const features = [
    'Custom Development',
    'Professional Design',
    'Mobile & Web Ready',
    'AI Integration',
    'Growth Analytics',
    '20-Day Launch'
  ]

  return (
    <section id="pricing" className="pt-16 sm:pt-32 pb-10 sm:pb-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Info */}
          <div className="space-y-12">
            {/* Headline */}
            <div className="mt-4 md:mt-0">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="ml-0 md:ml-0">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4">
                    Development Packages
                  </h2>
                  <div className="text-xl md:text-2xl lg:text-3xl font-medium leading-tight space-y-2">
                    <div className="text-gray-500">Transparent pricing.</div>
                    <div className="text-black">
                      Professional solutions.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Points - Centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                {infoPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center space-y-4"
                  >
                    <div className="flex justify-center">{point.icon}</div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-black text-base">{point.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stacked Cards */}
            <div className="max-w-lg">
              {/* Big White Card */}
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative">
                {/* Black Card at Top */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-3xl shadow-xl border border-gray-700/20 mb-6">
                  {/* Fast Speed Lines */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut", delay: 0 }}
                      className="absolute top-6 left-0 w-20 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                    <motion.div 
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                      className="absolute top-12 left-0 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    />
                    <motion.div 
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                      className="absolute bottom-8 left-0 w-24 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </div>
                  
                  {/* Racing Dots */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div 
                      animate={{ x: [-20, 350], scale: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-4 left-0 w-2 h-2 bg-white/60 rounded-full"
                    />
                    <motion.div 
                      animate={{ x: [-20, 350], scale: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      className="absolute bottom-4 left-0 w-1.5 h-1.5 bg-blue-400/50 rounded-full"
                    />
                  </div>

                  {/* Lightning Emoji Static */}
                  <div className="absolute top-6 right-4 text-5xl">
                    ⚡️
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-white text-base font-semibold leading-relaxed">Professional development for businesses that move fast.</p>
                  </div>
                </div>

                {/* Slots Available with Green Dot in Glass Box */}
                <div className="inline-flex items-center gap-3 mb-6 bg-white/60 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 shadow-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">Slots available</span>
                </div>
                
                {/* Main Content */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">Launch Your Project Today</h3>
                  <p className="text-base text-gray-600 leading-relaxed">Work directly with experienced developers. No agency markup, just results.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="space-y-6 mt-28">
            <div className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed -mt-28 ml-0 md:ml-8 text-center md:text-left">
              <div>Transparent pricing, no surprises.</div>
              <div>Launch your professional website</div>
              <div>in just 20 days.</div>
            </div>
            
            <div className="bg-white rounded-[28px] p-6 shadow-xl border border-gray-100 max-w-md mx-auto mt-16">
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-extrabold text-black">Professional Development</h3>
                  <p className="text-xs text-gray-500 mt-1">Custom development solutions with transparent pricing. Get your project to market in 20 days.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              <div className="py-6 border-t border-b border-gray-100">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-extrabold mb-2">Starting from ₹10K</div>
                  <div className="text-xs text-gray-500">Transparent pricing based on project complexity and features.</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-gray-700 text-xs">{feature}</span>
                  </div>
                ))}
              </div>

              <div>
                <a
                  href="/pricing"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  View Pricing
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}