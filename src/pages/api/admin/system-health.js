import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET || 'ragspro2025'}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const health = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      checks: {
        geminiApi: {
          configured: !!process.env.GEMINI_API_KEY,
          status: process.env.GEMINI_API_KEY ? 'ready' : 'missing'
        },
        resendApi: {
          configured: !!process.env.RESEND_API_KEY,
          status: process.env.RESEND_API_KEY ? 'ready' : 'missing'
        },
        razorpay: {
          configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
          status: (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) ? 'ready' : 'missing'
        },
        llmsTxt: {
          exists: fs.existsSync(path.join(process.cwd(), 'public/llms.txt')),
          status: fs.existsSync(path.join(process.cwd(), 'public/llms.txt')) ? 'ready' : 'missing'
        },
        robotsTxt: {
          exists: fs.existsSync(path.join(process.cwd(), 'public/robots.txt')),
          status: fs.existsSync(path.join(process.cwd(), 'public/robots.txt')) ? 'ready' : 'missing'
        },
        sitemap: {
          exists: fs.existsSync(path.join(process.cwd(), 'public/sitemap.xml')),
          status: fs.existsSync(path.join(process.cwd(), 'public/sitemap.xml')) ? 'ready' : 'missing'
        }
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        env: process.env.NODE_ENV
      }
    }

    // Overall status
    const allReady = Object.values(health.checks).every(check => check.status === 'ready')
    health.status = allReady ? 'healthy' : 'degraded'

    res.status(200).json(health)
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      error: error.message 
    })
  }
}
