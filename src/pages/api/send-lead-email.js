// API endpoint to send lead notification emails
import { sendLeadNotifications } from '../../utils/emailService'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const leadData = req.body
    
    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, phone' 
      })
    }
    
    // Send emails
    const result = await sendLeadNotifications(leadData)
    
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Emails sent successfully',
        details: result
      })
    } else {
      return res.status(500).json({ 
        success: false, 
        error: result.error 
      })
    }
    
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    })
  }
}
