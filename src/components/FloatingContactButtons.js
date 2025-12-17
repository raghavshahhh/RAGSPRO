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
      {/* BOTTOM CENTER BUTTONS - DESKTOP ONLY */}
      <div 
        id="global-contact-buttons"
        className="hidden md:block"
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999999,
          pointerEvents: 'auto',
        }}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-full p-2 shadow-2xl border border-gray-300/50 flex gap-2 transition-all duration-300">
          <a
            href="https://wa.me/918700048490?text=Hi%2C%20I%27m%20interested%20in%20your%20development%20services.%20Can%20we%20discuss%20my%20project%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black rounded-full flex items-center justify-center gap-2 px-4 py-3 hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 shadow-md hover:shadow-lg"
          >
            <FaWhatsapp className="text-lg flex-shrink-0" />
            <span className="font-medium text-sm whitespace-nowrap">
              WhatsApp
            </span>
          </a>

          <button
            onClick={() => setShowQuoteForm(true)}
            className="bg-white text-black rounded-full flex items-center justify-center gap-2 px-4 py-3 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer border border-gray-200 shadow-md hover:shadow-lg"
          >
            <FaLightbulb className="text-lg flex-shrink-0" />
            <span className="font-medium text-sm whitespace-nowrap">
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
    </>
  )
}
