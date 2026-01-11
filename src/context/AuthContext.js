// Auth Context Provider for global auth state
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  getSupabaseClient, 
  getCurrentUser, 
  signIn, 
  signUp, 
  signOut, 
  signInWithGoogle,
  resetPassword,
  updatePassword,
  updateProfile,
  onAuthStateChange,
  getUserProfile
} from '../utils/auth'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check active session
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        const userProfile = await getUserProfile(session.user.id)
        setProfile(userProfile)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
      } else if (event === 'USER_UPDATED' && session?.user) {
        setUser(session.user)
      }
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        const userProfile = await getUserProfile(currentUser.id)
        setProfile(userProfile)
      }
    } catch (err) {
      console.error('Error checking user:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignUp(email, password, metadata) {
    setError(null)
    const { data, error } = await signUp(email, password, metadata)
    if (error) {
      setError(error.message)
      return { error }
    }
    return { data }
  }

  async function handleSignIn(email, password) {
    setError(null)
    const { data, error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      return { error }
    }
    if (data?.user) {
      setUser(data.user)
      const userProfile = await getUserProfile(data.user.id)
      setProfile(userProfile)
    }
    return { data }
  }

  async function handleSignInWithGoogle() {
    setError(null)
    const { data, error } = await signInWithGoogle()
    if (error) {
      setError(error.message)
      return { error }
    }
    return { data }
  }

  async function handleSignOut() {
    setError(null)
    const { error } = await signOut()
    if (error) {
      setError(error.message)
      return { error }
    }
    setUser(null)
    setProfile(null)
    return {}
  }

  async function handleResetPassword(email) {
    setError(null)
    const { data, error } = await resetPassword(email)
    if (error) {
      setError(error.message)
      return { error }
    }
    return { data }
  }

  async function handleUpdatePassword(newPassword) {
    setError(null)
    const { data, error } = await updatePassword(newPassword)
    if (error) {
      setError(error.message)
      return { error }
    }
    return { data }
  }

  async function handleUpdateProfile(updates) {
    setError(null)
    const { data, error } = await updateProfile(updates)
    if (error) {
      setError(error.message)
      return { error }
    }
    if (data?.user) {
      setUser(data.user)
    }
    return { data }
  }

  const value = {
    user,
    profile,
    loading,
    error,
    isAuthenticated: !!user,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInWithGoogle: handleSignInWithGoogle,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
    updatePassword: handleUpdatePassword,
    updateProfile: handleUpdateProfile,
    refreshUser: checkUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
