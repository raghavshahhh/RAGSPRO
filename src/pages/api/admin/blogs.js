import { scanBlogFiles, getBlogStats } from '../../../utils/blogScanner'

export default async function handler(req, res) {
  // Simple auth check
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET || 'ragspro2025'}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

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
