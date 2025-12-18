// Universal lead submission endpoint
import { saveLead, logSystemEvent } from '../../utils/supabase'
import { sendLeadEmail } from '../../utils/emailService'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, message, source, page, metadata } = req.body

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Save to database
    const leadData = {
      name,
      email,
      phone: phone || null,
      source: source || 'website',
      page: page || '/',
      message: message || null,
      metadata: {
        ...metadata,
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        timestamp: new Date().toISOString()
      }
    }

    const savedLead = await saveLead(leadData)

    if (!savedLead) {
      throw new Error('Failed to save lead to database')
    }

    // Log event
    await logSystemEvent('api', 'success', 'New lead captured', {
      leadId: savedLead[0]?.id,
      name,
      email,
      source,
      page
    })

    // Send email notification (async, don't wait)
    if (process.env.RESEND_API_KEY) {
      sendLeadEmail({
        name,
        email,
        phone,
        message,
        source,
        page
      }).catch(error => {
        console.error('Email send error:', error)
        logSystemEvent('email', 'failed', `Failed to send lead email: ${error.message}`, {
          leadId: savedLead[0]?.id,
          error: error.toString()
        }).catch(e => console.error('Failed to log email error:', e))
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: savedLead[0]?.id
    })
  } catch (error) {
    console.error('Lead submission error:', error)
    
    try {
      await logSystemEvent('api', 'failed', `Lead submission failed: ${error.message}`, {
        error: error.toString(),
        stack: error.stack
      })
    } catch (logError) {
      console.error('Failed to log error:', logError)
    }
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Lead submission failed',
      timestamp: new Date().toISOString()
    })
  }
}
