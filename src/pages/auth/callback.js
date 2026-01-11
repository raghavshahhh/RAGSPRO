// OAuth Callback Handler
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSupabaseClient } from '../../utils/auth'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = getSupabaseClient()
      if (!supabase) {
        router.push('/')
        return
      }

      // Get the session from URL
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Auth callback error:', error)
        router.push('/?error=auth_failed')
        return
      }

      if (session) {
        // Redirect to dashboard or home
        router.push('/user/dashboard')
      } else {
        router.push('/')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Completing sign in...</p>
      </div>
    </div>
  )
}
