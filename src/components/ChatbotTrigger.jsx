import { useState } from 'react'
import AIChatbot from './AIChatbot'
import CalendarIntegration from './CalendarIntegration'

export default function ChatbotTrigger() {
  const [showChatbot, setShowChatbot] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [qualifiedData, setQualifiedData] = useState(null)

  const handleQualified = (data) => {
    setQualifiedData(data)
    setShowChatbot(false)
    setShowCalendar(true)
  }

  const handleCloseAll = () => {
    setShowChatbot(false)
    setShowCalendar(false)
    setQualifiedData(null)
  }

  return (
    <>
      {/* Floating Chatbot Button */}
      {!showChatbot && !showCalendar && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 z-40 bg-black text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
          aria-label="Open AI Chatbot"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-black text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap">
              Chat with RAGS AI
              <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
            </div>
          </div>
        </button>
      )}

      {/* Chatbot */}
      {showChatbot && (
        <AIChatbot
          onClose={handleCloseAll}
          onQualified={handleQualified}
        />
      )}

      {/* Calendar */}
      {showCalendar && qualifiedData && (
        <CalendarIntegration
          leadData={qualifiedData}
          onClose={handleCloseAll}
        />
      )}
    </>
  )
}
