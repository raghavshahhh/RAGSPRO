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
      {/* FLOATING RIGHT BUTTONS - DESKTOP ONLY */}
      <div 
        id="global-contact-buttons"
        className="hidden md:flex"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999999,
          pointerEvents: 'auto',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <a
          href="https://wa.me/918700048490?text=Hi%2C%20I%27m%20interested%20in%20your%20development%20services.%20Can%20we%20discuss%20my%20project%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black rounded-full flex items-center justify-center gap-2 px-5 py-3 hover:bg-black hover:text-white transition-all duration-300 border border-gray-200 shadow-lg hover:shadow-xl"
        >
          <FaWhatsapp className="text-xl flex-shrink-0" />
          <span className="font-medium text-sm whitespace-nowrap">
            WhatsApp
          </span>
        </a>

        <button
          onClick={() => setShowQuoteForm(true)}
          className="bg-black text-white rounded-full flex items-center justify-center gap-2 px-5 py-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
        >
          <FaLightbulb className="text-xl flex-shrink-0" />
          <span className="font-medium text-sm whitespace-nowrap">
            Get Quote
          </span>
        </button>
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
