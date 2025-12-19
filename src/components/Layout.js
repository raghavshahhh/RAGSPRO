'use client'

import SEOHead from './SEOHead'
import FixedNavbar from './FixedNavbar'
import Footer from './Footer'
import ChatbotTrigger from './ChatbotTrigger'
import ReviewSubmissionBox from './ReviewSubmissionBox'

export default function Layout({ children, seoProps }) {
  return (
    <>
      <SEOHead {...seoProps} />
      
      {/* FIXED NAVBAR - ALWAYS VISIBLE */}
      <FixedNavbar />
      
      {/* PAGE CONTENT - Add padding top to account for fixed navbar */}
      <main className="pt-20">{children}</main>
      
      <Footer />
      <ChatbotTrigger />
      <ReviewSubmissionBox />
    </>
  )
}