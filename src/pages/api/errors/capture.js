// Error Capture API - Store errors in database
import { getSupabaseAdmin, logSystemEvent } from '../../../utils/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      message,
      stack,
      name,
      level,
      timestamp,
      url,
      userAgent,
      context
    } = req.body

    const errorData = {
      message,
      stack,
      error_name: name,
      level: level || 'error',
      url,
      user_agent: userAgent,
      context: context || {},
      created_at: timestamp || new Date().toISOString(),
      resolved: false
    }

    const supabase = getSupabaseAdmin()

    if (supabase) {
      // Save to errors table
      const { data, error } = await supabase
        .from('error_logs')
        .insert([errorData])
        .select()

      if (error) {
        console.error('Failed to save error:', error)
      }

      // Also log as system event
      await logSystemEvent('error', level || 'error', message, {
        stack: stack?.substring(0, 500),
        url,
        context
      })
    } else {
      // Fallback: just log to console
      console.error('Error captured (no DB):', errorData)
    }

    // Send to external service if configured (Sentry, LogRocket, etc.)
    if (process.env.SENTRY_DSN) {
      // You can add Sentry server-side capture here
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error capture API error:', error)
    return res.status(500).json({ error: 'Failed to capture error' })
  }
}
