import SEOHead from './SEOHead'
import Footer from './Footer'
import ChatbotTrigger from './ChatbotTrigger'
import ReviewSubmissionBox from './ReviewSubmissionBox'

export default function Layout({ children, seoProps }) {
  return (
    <>
      <SEOHead {...seoProps} />
      
      {/* PAGE CONTENT */}
      <main>{children}</main>
      
      <Footer />
      <ChatbotTrigger />
      <ReviewSubmissionBox />
    </>
  )
}