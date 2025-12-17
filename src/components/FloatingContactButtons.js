'use client'

import { useState } from 'react'
import { FaWhatsapp, FaLightbulb } from 'react-icons/fa'
import QualificationForm from './QualificationForm'
import QualificationResult from './QualificationResult'
import CalendarIntegration from './CalendarIntegration'

export default function FloatingContactButtons() {
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
      {/* FLOATING BOTTOM CENTER BUTTONS - DESKTOP ONLY */}
      <div 
        id="global-contact-buttons"
        className="hidden md:block"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2147483647,
          pointerEvents: 'auto',
        }}
      >
        <div 
          className="bg-white/95 backdrop-blur-xl rounded-full p-2 shadow-2xl border border-gray-200/50 flex gap-3 items-center"
          style={{
            animation: 'slideUp 0.5s ease-out',
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

          <button
            onClick={() => setShowQuoteForm(true)}
            className="bg-black text-white rounded-full flex items-center justify-center gap-2 px-5 py-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg font-medium text-sm"
          >
            <FaLightbulb className="text-xl" />
            <span className="whitespace-nowrap">Get Quote</span>
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
    </>
  )
}
