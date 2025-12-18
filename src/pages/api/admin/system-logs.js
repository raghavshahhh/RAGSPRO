import { getSystemLogs, isSupabaseConfigured } from '../../../utils/supabase'

export default async function handler(req, res) {
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET || 'ragspro2025'}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!isSupabaseConfigured()) {
    return res.status(503).json({ 
      error: 'Database not configured',
      message: 'Add SUPABASE credentials to enable system logs',
      configured: false,
      logs: []
    })
  }

  try {
    const type = req.query.type || null
    const limit = parseInt(req.query.limit) || 100
    
    const logs = await getSystemLogs(type, limit)

    // Calculate stats
    const stats = {
      total: logs.length,
      success: logs.filter(l => l.status === 'success').length,
      failed: logs.filter(l => l.status === 'failed').length,
      info: logs.filter(l => l.status === 'info').length,
      warning: logs.filter(l => l.status === 'warning').length
    }

    // Type breakdown
    const typeBreakdown = {}
    logs.forEach(log => {
      typeBreakdown[log.type] = (typeBreakdown[log.type] || 0) + 1
    })

    res.status(200).json({
      success: true,
      configured: true,
      logs,
      stats,
      typeBreakdown,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('System logs fetch error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
}
