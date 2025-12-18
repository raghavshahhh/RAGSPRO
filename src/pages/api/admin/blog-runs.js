import { getBlogRunHistory, isSupabaseConfigured } from '../../../utils/supabase'
import { requireAdminAuth } from '../../../utils/adminAuth'

async function handler(req, res) {

  if (!isSupabaseConfigured()) {
    return res.status(503).json({ 
      error: 'Database not configured',
      message: 'Add SUPABASE credentials to enable blog run tracking',
      configured: false,
      runs: []
    })
  }

  try {
    const limit = parseInt(req.query.limit) || 50
    const runs = await getBlogRunHistory(limit)

    // Calculate stats
    const stats = {
      total: runs.length,
      success: runs.filter(r => r.status === 'success').length,
      failed: runs.filter(r => r.status === 'failed').length,
      running: runs.filter(r => r.status === 'running').length,
      totalTokens: runs.reduce((sum, r) => sum + (r.token_usage || 0), 0),
      avgTokens: runs.length > 0 
        ? Math.round(runs.reduce((sum, r) => sum + (r.token_usage || 0), 0) / runs.length)
        : 0
    }

    // Last run info
    const lastRun = runs[0] || null
    const lastSuccess = runs.find(r => r.status === 'success') || null
    const lastFailure = runs.find(r => r.status === 'failed') || null

    res.status(200).json({
      success: true,
      configured: true,
      runs,
      stats,
      lastRun,
      lastSuccess,
      lastFailure,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Blog runs fetch error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
}

export default requireAdminAuth(handler)
