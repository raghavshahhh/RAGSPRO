import { scanBlogFiles, getBlogStats } from '../../../utils/blogScanner'
import { requireAdminAuth } from '../../../utils/adminAuth'

async function handler(req, res) {

  if (req.method === 'GET') {
    try {
      const blogs = await scanBlogFiles()
      const stats = await getBlogStats()
      
      res.status(200).json({
        success: true,
        blogs,
        stats,
        scannedAt: new Date().toISOString()
      })
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

export default requireAdminAuth(handler)
