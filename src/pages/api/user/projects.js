// User Projects API - Get projects for logged in user
import { getSupabaseAdmin } from '../../../utils/supabase'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(200).json({ projects: [] })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { cookie: req.headers.cookie }
      }
    })

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return res.status(200).json({ projects: [] })
    }

    // Get projects for this user
    const supabaseAdmin = getSupabaseAdmin()
    if (!supabaseAdmin) {
      return res.status(200).json({ projects: [] })
    }

    const { data: projects, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching projects:', error)
      return res.status(200).json({ projects: [] })
    }

    return res.status(200).json({ projects: projects || [] })
  } catch (error) {
    console.error('Projects API error:', error)
    return res.status(500).json({ error: error.message })
  }
}
