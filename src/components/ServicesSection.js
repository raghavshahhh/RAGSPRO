'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMobileAlt, FaLaptopCode, FaFileAlt, FaShieldAlt, FaPaintBrush, FaCube, FaPalette, FaWhatsapp, FaLightbulb } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import RaghavAvatar from './RaghavAvatar'
import QualificationForm from './QualificationForm'
import QualificationResult from './QualificationResult'
import CalendarIntegration from './CalendarIntegration'

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
  const [containerHover, setContainerHover] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [qualificationData, setQualificationData] = useState(null)

  const handleQualified = (data) => {
    // Store qualification data
    setQualificationData(data)
    // Hide qualification form
    setShowQuoteForm(false)
    // Show result
    setShowResult(true)
  }

  const handleBookCall = () => {
    setShowResult(false)
    setShowCalendar(true)
  }

  const handleViewResources = () => {
    setShowResult(false)
    // Optionally redirect to resources page
  }

  const handleCloseAll = () => {
    setShowQuoteForm(false)
    setShowResult(false)
    setShowCalendar(false)
    setQualificationData(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // This is now handled by QualificationForm
    const emailBody = `
New Project Request from ${qualificationData?.name || 'Unknown'}

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Project Details:
- Project Type: ${projectTypeLabel}
- Budget: ${formData.budget}

Message:
${formData.message}
    `.trim()

    // Create mailto link
    const mailtoLink = `mailto:ragsproai@gmail.com?subject=New Project Request - ${projectTypeLabel}&body=${encodeURIComponent(emailBody)}`

    // Open email client
    window.location.href = mailtoLink

    // Show thank you message
    setIsSubmitted(true)

    // Reset form data
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
      budget: ''
    })

    // Auto close after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setShowQuoteForm(false)
    }, 3000)
  }

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects')
      const footer = document.querySelector('footer')

      if (projectsSection && footer) {
        const projectsRect = projectsSection.getBoundingClientRect()
        const footerRect = footer.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Show buttons only if projects section is passed AND footer is not visible
        const shouldShowButtons = projectsRect.bottom < windowHeight * 0.8 && footerRect.top > windowHeight
        setShowButtons(shouldShowButtons)
      }
    }

    const handleOpenQuoteForm = () => {
      setShowQuoteForm(true)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('openQuoteForm', handleOpenQuoteForm)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('openQuoteForm', handleOpenQuoteForm)
    }
  }, [])

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

      {/* Bottom Blur Overlay - Always Visible */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white/40 via-white/10 to-transparent backdrop-blur-[2px] pointer-events-none z-30 rounded-t-[1.25rem]" />

      {/* Floating Glass Buttons */}
      <div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-opacity duration-300 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="group bg-white/90 backdrop-blur-xl rounded-full p-1 sm:p-1.5 shadow-xl border border-gray-200/50 flex gap-1 sm:gap-1.5 md:hover:gap-2">
          <a
            href="https://wa.me/918700048490?text=Hi%2C%20I%27m%20interested%20in%20your%20development%20services.%20Can%20we%20discuss%20my%20project%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black rounded-full flex items-center justify-center gap-2 px-3 py-2 sm:py-3 hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 w-auto md:w-10 md:sm:w-12 md:group-hover:w-auto md:group-hover:px-3 md:sm:group-hover:px-4"
            style={{ transformOrigin: 'center' }}
          >
            <FaWhatsapp className="text-sm sm:text-base flex-shrink-0 hover:text-white" />
            <span className="font-medium text-sm whitespace-nowrap opacity-100 w-auto md:opacity-0 md:w-0 md:group-hover:opacity-100 md:group-hover:w-auto transition-all duration-300 overflow-hidden hover:text-white">
              WhatsApp
            </span>
          </a>

          <button
            onClick={() => setShowQuoteForm(true)}
            className="bg-white text-black rounded-full flex items-center justify-center gap-2 px-3 py-2 sm:py-3 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer border border-gray-200 w-auto md:w-10 md:sm:w-12 md:group-hover:w-auto md:group-hover:px-3 md:sm:group-hover:px-4"
            style={{ transformOrigin: 'center' }}
          >
            <FaLightbulb className="text-sm sm:text-base flex-shrink-0 hover:text-white" />
            <span className="font-medium text-sm whitespace-nowrap opacity-100 w-auto md:opacity-0 md:w-0 md:group-hover:opacity-100 md:group-hover:w-auto transition-all duration-300 overflow-hidden hover:text-white">
              Discuss your project idea
            </span>
          </button>
        </div>
      </div>

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
    </section>
  )
}
