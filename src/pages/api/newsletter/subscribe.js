// Newsletter Subscribe API
import { getSupabaseAdmin, logSystemEvent } from '../../../utils/supabase'
import { sendWelcomeEmail } from '../../../utils/emailService'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, source = 'website', name = null } = req.body

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const supabase = getSupabaseAdmin()
    
    if (!supabase) {
      // Fallback: just log and return success
      console.log('Newsletter subscription (no DB):', email)
      return res.status(200).json({ 
        success: true, 
        message: 'Thanks for subscribing!' 
      })
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      if (existing.status === 'unsubscribed') {
        // Re-subscribe
        await supabase
          .from('newsletter_subscribers')
          .update({ 
            status: 'active',
            resubscribed_at: new Date().toISOString()
          })
          .eq('id', existing.id)

        return res.status(200).json({ 
          success: true, 
          message: 'Welcome back! You\'ve been re-subscribed.' 
        })
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'You\'re already subscribed!' 
      })
    }

    // Create new subscriber
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        email: email.toLowerCase(),
        name,
        source,
        status: 'active',
        subscribed_at: new Date().toISOString(),
        metadata: {
          userAgent: req.headers['user-agent'],
          ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress
        }
      }])
      .select()

    if (error) throw error

    // Log event
    await logSystemEvent('newsletter', 'success', 'New subscriber', {
      email,
      source
    })

    // Send welcome email (async)
    if (process.env.RESEND_API_KEY) {
      sendWelcomeEmail({ email, name }).catch(err => {
        console.error('Failed to send welcome email:', err)
      })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed! Check your inbox.',
      subscriber: data?.[0]
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    await logSystemEvent('newsletter', 'error', `Subscription failed: ${error.message}`, {
      error: error.toString()
    }).catch(() => {})

    return res.status(500).json({ 
      success: false, 
      error: 'Failed to subscribe. Please try again.' 
    })
  }
}
