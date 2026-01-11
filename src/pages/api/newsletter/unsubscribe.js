// Newsletter Unsubscribe API
import { getSupabaseAdmin, logSystemEvent } from '../../../utils/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const email = req.method === 'GET' ? req.query.email : req.body.email
    const token = req.method === 'GET' ? req.query.token : req.body.token

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const supabase = getSupabaseAdmin()
    
    if (!supabase) {
      return res.status(200).json({ 
        success: true, 
        message: 'You have been unsubscribed.' 
      })
    }

    // Update subscriber status
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ 
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email.toLowerCase())
      .select()

    if (error) throw error

    await logSystemEvent('newsletter', 'info', 'Subscriber unsubscribed', { email })

    // If GET request, redirect to confirmation page
    if (req.method === 'GET') {
      return res.redirect('/unsubscribed')
    }

    return res.status(200).json({ 
      success: true, 
      message: 'You have been unsubscribed successfully.' 
    })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to unsubscribe. Please try again.' 
    })
  }
}
