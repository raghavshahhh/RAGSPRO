import { requireAdminAuth } from '../../../utils/adminAuth'

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Basic stats - you can expand this with real data
    const stats = {
      website: {
        status: 'online',
        uptime: '99.9%',
        lastDeployed: new Date().toISOString(),
      },
      blogs: {
        total: 8,
        published: 8,
        scheduled: 0,
        lastPublished: '2025-12-17',
      },
      seo: {
        pagesIndexed: 34,
        schemaTypes: 6,
        targetKeywords: 15,
        aiOptimized: true,
      },
      automation: {
        dailyBlog: process.env.GEMINI_API_KEY ? 'active' : 'needs-api-key',
        emailService: process.env.RESEND_API_KEY ? 'active' : 'needs-api-key',
        paymentGateway: process.env.RAZORPAY_KEY_ID ? 'active' : 'needs-api-key',
      },
      system: {
        nextVersion: '14.2.33',
        nodeVersion: process.version,
        environment: process.env.NODE_ENV,
      },
    }

    res.status(200).json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
}

export default requireAdminAuth(handler)
