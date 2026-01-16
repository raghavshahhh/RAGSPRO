import { useState, useEffect } from 'react'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'

export default function MobileContactButtons() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show buttons after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 md:hidden">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918826073013?text=Hi%2C%20I%27m%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* Phone Button */}
      <a
        href="tel:+918826073013"
        className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all hover:scale-110"
        aria-label="Call us"
      >
        <FaPhone className="text-xl" />
      </a>
    </div>
  )
}
