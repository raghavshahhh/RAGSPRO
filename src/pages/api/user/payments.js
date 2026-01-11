// User Payments API - Get payment history for logged in user
import { getSupabaseAdmin } from '../../../utils/supabase'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get user from auth header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Try to get from cookie/session
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseAnonKey) {
        return res.status(200).json({ payments: [] })
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: { cookie: req.headers.cookie }
        }
      })

      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        return res.status(200).json({ payments: [] })
      }

      // Get payments for this user
      const supabaseAdmin = getSupabaseAdmin()
      if (!supabaseAdmin) {
        return res.status(200).json({ payments: [] })
      }

      const { data: payments, error } = await supabaseAdmin
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching payments:', error)
        return res.status(200).json({ payments: [] })
      }

      return res.status(200).json({ payments: payments || [] })
    }

    return res.status(200).json({ payments: [] })
  } catch (error) {
    console.error('Payments API error:', error)
    return res.status(500).json({ error: error.message })
  }
}
