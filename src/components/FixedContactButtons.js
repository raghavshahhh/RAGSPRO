'use client'

import { useState, useEffect } from 'react'
import { FaWhatsapp, FaLightbulb } from 'react-icons/fa'
import QualificationForm from './QualificationForm'
import QualificationResult from './QualificationResult'
import CalendarIntegration from './CalendarIntegration'

export default function FixedContactButtons() {
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [qualificationData, setQualificationData] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  // Don't render on mobile
  if (isMobile) return null

  return (
    <>
      {/* FIXED BOTTOM CENTER BUTTONS - DESKTOP ONLY */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998]"
        style={{
          position: 'fixed', // Force fixed positioning
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto',
        }}
      >
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
            <FaWhatsapp className="text-xl" />
            <span className="whitespace-nowrap">WhatsApp</span>
          </a>

          <a
            href="/get-quote"
            className="bg-black text-white rounded-full flex items-center justify-center gap-2 px-5 py-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg font-medium text-sm"
          >
            <FaLightbulb className="text-xl" />
            <span className="whitespace-nowrap">Get Quote</span>
          </a>
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
    </>
  )
}
