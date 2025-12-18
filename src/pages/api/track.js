// Client-side analytics tracking endpoint
import { trackPageView } from '../../utils/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { page, referrer, source } = req.body
    
    if (!page) {
      return res.status(400).json({ error: 'Page is required' })
    }

    // Determine source from referrer
    let trafficSource = 'direct'
    if (referrer && referrer !== 'direct') {
      const refUrl = new URL(referrer)
      const refHost = refUrl.hostname.toLowerCase()
      
      if (refHost.includes('google')) trafficSource = 'organic'
      else if (refHost.includes('facebook') || refHost.includes('twitter') || refHost.includes('linkedin')) trafficSource = 'social'
      else if (refHost.includes('chatgpt') || refHost.includes('claude') || refHost.includes('perplexity')) trafficSource = 'ai'
      else if (refHost !== new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').hostname) trafficSource = 'referral'
    }

    // Track in database
    await trackPageView(page, source || trafficSource, {
      referrer,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString()
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Tracking error:', error)
    res.status(500).json({ error: error.message })
  }
}
