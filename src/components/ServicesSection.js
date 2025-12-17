'use client'
import { FaMobileAlt, FaLaptopCode, FaFileAlt, FaPaintBrush, FaCube, FaPalette, FaLightbulb } from 'react-icons/fa'

const services = [
  { title: "Complete Product Development (Mobile & Web)", icon: FaMobileAlt },
  { title: "Revenue-Focused Landing Pages", icon: FaLaptopCode },
  { title: "AI Automation & Integration", icon: FaLightbulb },
  { title: "Startup UX/UI Consultation", icon: FaPaintBrush },
  { title: "Growth-Ready Design Systems", icon: FaPalette },
  { title: "Business Process Automation", icon: FaCube },
  { title: "Technical Consulting for Founders", icon: FaFileAlt }
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative min-h-screen bg-white py-8 sm:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-24 items-center">
          {/* LEFT: Heading */}
          <div className="pt-20 sm:pt-0">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-normal tracking-tight leading-[1.15]">
              Startup Growth Services
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mt-4">
              <span className="text-gray-400">Everything founders need</span>
              <br />
              <span className="text-black">to launch revenue-ready</span>
              <br />
              <span className="text-black">products in 20 days.</span>
            </p>
          </div>

          {/* RIGHT: Services List */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 pt-8 sm:pt-0 pl-20 sm:pl-0">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="flex items-center gap-2 sm:gap-3 md:gap-4"
              >
                <div className="w-8 sm:w-10 md:w-11 h-8 sm:h-10 md:h-11 bg-black rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <service.icon className="text-base sm:text-lg" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-black">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Note: FloatingContactButtons now handled globally via Layout component */}
    </section>
  )
}
