// User Authentication System using Supabase Auth
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Client-side Supabase client (for auth)
let supabaseClient = null

export function getSupabaseClient() {
  if (!supabaseClient && supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  }
  return supabaseClient
}

// Sign up with email and password
export async function signUp(email, password, metadata = {}) {
  const supabase = getSupabaseClient()
  if (!supabase) return { error: { message: 'Auth not configured' } }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })

  return { data, error }
}

// Sign in with email and password
export async function signIn(email, password) {
  const supabase = getSupabaseClient()
  if (!supabase) return { error: { message: 'Auth not configured' } }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  return { data, error }
}

// Sign in with Google
export async function signInWithGoogle() {
  const supabase = getSupabaseClient()
  if (!supabase) return { error: { message: 'Auth not configured' } }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    }
  })

  return { data, error }
}

// Sign out
export async function signOut() {
  const supabase = getSupabaseClient()
  if (!supabase) return { error: { message: 'Auth not configured' } }

  const { error } = await supabase.auth.signOut()
  return { error }
}

// Get current user
export async function getCurrentUser() {
  const supabase = getSupabaseClient()
  if (!supabase) return null

  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Get current session
export async function getSession() {
  const supabase = getSupabaseClient()
  if (!supabase) return null

  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Reset password
export async function resetPassword(email) {
  const supabase = getSupabaseClient()
  if (!supabase) return { error: { message: 'Auth not configured' } }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
  })

  return { data, error }
}

// Update password
export async function updatePassword(newPassword) {
  const supabase = getSupabaseClient()
  if (!supabase) return { error: { message: 'Auth not configured' } }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  return { data, error }
}

// Update user profile
export async function updateProfile(updates) {
  const supabase = getSupabaseClient()
  if (!supabase) return { error: { message: 'Auth not configured' } }

  const { data, error } = await supabase.auth.updateUser({
    data: updates
  })

  return { data, error }
}

// Listen to auth state changes
export function onAuthStateChange(callback) {
  const supabase = getSupabaseClient()
  if (!supabase) return { data: { subscription: null } }

  return supabase.auth.onAuthStateChange(callback)
}

// Get user profile from database
export async function getUserProfile(userId) {
  const supabase = getSupabaseClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return null
  return data
}

// Update user profile in database
export async function updateUserProfile(userId, updates) {
  const supabase = getSupabaseClient()
  if (!supabase) return { error: { message: 'Auth not configured' } }

  const { data, error } = await supabase
    .from('user_profiles')
    .upsert({
      id: userId,
      ...updates,
      updated_at: new Date().toISOString()
    })
    .select()

  return { data, error }
}
