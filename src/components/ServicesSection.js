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

        {/* Contact Buttons Below Services */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <div 
            className="bg-white/90 backdrop-blur-2xl rounded-full p-2 shadow-2xl flex gap-3 items-center"
            style={{
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <a
              href="https://wa.me/918700048490?text=Hi%2C%20I%27m%20interested%20in%20your%20development%20services.%20Can%20we%20discuss%20my%20project%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black rounded-full flex items-center justify-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 shadow-md hover:shadow-lg font-medium text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>

            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-black text-white rounded-full flex items-center justify-center gap-2 px-5 py-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg font-medium text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <span className="whitespace-nowrap">Get Quote</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
