import SEOHead from './SEOHead'
import Footer from './Footer'
import ReviewSubmissionBox from './ReviewSubmissionBox'
import LoginModal from './auth/LoginModal'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children, seoProps }) {
  const [showLogin, setShowLogin] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // Listen for login modal open event
    const handleOpenLogin = () => setShowLogin(true)
    window.addEventListener('openLoginModal', handleOpenLogin)
    
    // Check URL parameter for login
    if (router.query.login === 'true') {
      setShowLogin(true)
    }
    
    return () => window.removeEventListener('openLoginModal', handleOpenLogin)
  }, [router.query])

  // Redirect to admin after successful login
  useEffect(() => {
    if (user && showLogin) {
      setShowLogin(false)
      router.push('/admin')
    }
  }, [user, showLogin, router])

  return (
    <>
      <SEOHead {...seoProps} />
      
      {/* PAGE CONTENT */}
      <main>{children}</main>
      
      <Footer />
      <ReviewSubmissionBox />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  )
}