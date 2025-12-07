import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Work', href: '/#projects' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'About', href: '/meet-founder' },
    { name: 'Still not sure?', href: '/#contact' },
  ]
  
  return (
    <motion.nav
      animate={{
        height: scrolled ? 96 : 120,
        paddingTop: scrolled ? 24 : 32,
        paddingBottom: scrolled ? 24 : 32,
      }}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled 
          ? 'bg-white/20 backdrop-blur-xl shadow-lg border-white/20' 
          : 'bg-white/10 backdrop-blur-lg border-white/10'
        }
        border-b
        h-8 sm:h-10 md:h-24 lg:h-30 xl:h-36
        py-1 sm:py-2 md:py-6 lg:py-8 xl:py-9
      `}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-10 xl:px-12 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          animate={{ scale: scrolled ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="flex items-center group">
            <span className="text-[10px] sm:text-xs md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-black group-hover:text-[#21b30b] transition-colors duration-300 cursor-pointer">
              RAGSPRO
            </span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-14">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span className="text-gray-900 font-medium hover:text-[#21b30b] transition-colors cursor-pointer text-[8px] sm:text-[10px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                {link.name}
              </span>
            </Link>
          ))}
        </div>
        
        {/* CTA Button */}
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-1 sm:px-2 md:px-6 lg:px-8 xl:px-12 2xl:px-14 py-0.5 sm:py-1 md:py-3 lg:py-4 xl:py-5 2xl:py-6 bg-black text-white rounded-full font-medium hover:bg-gray-900 transition-colors text-[6px] sm:text-[8px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
        >
          Get Started
        </button>
        
        {/* Mobile Menu Button */}

      </div>
      

    </motion.nav>
  )
}
