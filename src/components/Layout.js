import SEOHead from './SEOHead'
import FloatingBrand from './FloatingBrand'
import Footer from './Footer'
import ChatbotTrigger from './ChatbotTrigger'
import MobileContactButtons from './MobileContactButtons'
import ReviewSubmissionBox from './ReviewSubmissionBox'

export default function Layout({ children, seoProps }) {
  return (
    <>
      <SEOHead {...seoProps} />
      
      <FloatingBrand />
      <main>{children}</main>
      <Footer />
      <ChatbotTrigger />
      <MobileContactButtons />
      <ReviewSubmissionBox />
    </>
  )
}