import { getSupabaseAdmin, getLeads, updateLeadStatus, isSupabaseConfigured } from '../../../utils/supabase'
import { requireAdminAuth } from '../../../utils/adminAuth'

async function handler(req, res) {

  if (!isSupabaseConfigured()) {
    return res.status(503).json({ 
      error: 'Database not configured',
      message: 'Add SUPABASE credentials to enable lead tracking',
      configured: false
    })
  }

  if (req.method === 'GET') {
    try {
      const status = req.query.status || null
      const leads = await getLeads(status, 100)

      // Calculate stats
      const today = new Date().toISOString().split('T')[0]
      const todayLeads = leads.filter(l => 
        l.created_at.startsWith(today)
      ).length

      const stats = {
        total: leads.length,
        today: todayLeads,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        converted: leads.filter(l => l.status === 'converted').length,
        lost: leads.filter(l => l.status === 'lost').length
      }

      // Source breakdown
      const sourceBreakdown = {}
      leads.forEach(lead => {
        const source = lead.source || 'unknown'
        sourceBreakdown[source] = (sourceBreakdown[source] || 0) + 1
      })

      res.status(200).json({
        success: true,
        configured: true,
        leads,
        stats,
        sourceBreakdown,
        lastUpdated: new Date().toISOString()
      })
    } catch (error) {
      console.error('Leads fetch error:', error)
      res.status(500).json({ 
        success: false,
        error: error.message 
      })
    }
  } else if (req.method === 'PATCH') {
    // Update lead status
    try {
      const { id, status, notes } = req.body
      
      if (!id || !status) {
        return res.status(400).json({ 
          error: 'Missing required fields: id, status' 
        })
      }

      const result = await updateLeadStatus(id, status, notes)

      if (!result) {
        return res.status(500).json({ 
          error: 'Failed to update lead' 
        })
      }

      res.status(200).json({ 
        success: true, 
        data: result 
      })
    } catch (error) {
      console.error('Lead update error:', error)
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
