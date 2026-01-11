'use client'

import SEOHead from './SEOHead'
import Navbar from './Navbar.jsx'
import Footer from './Footer'
import ChatbotTrigger from './ChatbotTrigger'
import ReviewSubmissionBox from './ReviewSubmissionBox'

export default function Layout({ children, seoProps }) {
  return (
    <>
      <SEOHead {...seoProps} />
      
      {/* NAVBAR */}
      <Navbar />
      
      {/* PAGE CONTENT */}
      <main>{children}</main>
      
      <Footer />
      <ChatbotTrigger />
      <ReviewSubmissionBox />
    </>
  )
}