import { getSupabaseAdmin, getTrafficStats, isSupabaseConfigured } from '../../../utils/supabase'

export default async function handler(req, res) {
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET || 'ragspro2025'}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!isSupabaseConfigured()) {
    return res.status(503).json({ 
      error: 'Database not configured',
      message: 'Add SUPABASE credentials to enable analytics',
      configured: false
    })
  }

  try {
    const days = parseInt(req.query.days) || 30
    
    // Get traffic stats
    const traffic = await getTrafficStats(days)
    
    // Aggregate data
    const pageViews = {}
    const sourceBreakdown = {}
    const dailyViews = {}
    let totalViews = 0

    traffic.forEach(stat => {
      // By page
      pageViews[stat.page] = (pageViews[stat.page] || 0) + stat.views
      
      // By source
      sourceBreakdown[stat.source] = (sourceBreakdown[stat.source] || 0) + stat.views
      
      // By date
      dailyViews[stat.date] = (dailyViews[stat.date] || 0) + stat.views
      
      totalViews += stat.views
    })

    // Top 10 pages
    const topPages = Object.entries(pageViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([page, views]) => ({ page, views }))

    // Daily trend (last 7 days)
    const last7Days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      last7Days.push({
        date: dateStr,
        views: dailyViews[dateStr] || 0
      })
    }

    res.status(200).json({
      success: true,
      configured: true,
      totalViews,
      topPages,
      sourceBreakdown,
      dailyTrend: last7Days,
      period: `Last ${days} days`,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
}
