// Admin Subscribers API - Manage newsletter subscribers
import { requireAdminAuth } from '../../../utils/adminAuth'
import { getSupabaseAdmin } from '../../../utils/supabase'

async function handler(req, res) {
  const supabase = getSupabaseAdmin()
  
  if (!supabase) {
    return res.status(200).json({ 
      subscribers: [],
      total: 0,
      message: 'Database not configured'
    })
  }

  // GET - List subscribers
  if (req.method === 'GET') {
    try {
      const { status, limit = 100, offset = 0, search } = req.query

      let query = supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact' })
        .order('subscribed_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (status) {
        query = query.eq('status', status)
      }

      if (search) {
        query = query.ilike('email', `%${search}%`)
      }

      const { data: subscribers, error, count } = await query

      if (error) throw error

      // Get stats
      const { data: allSubs } = await supabase
        .from('newsletter_subscribers')
        .select('status')

      const stats = {
        total: allSubs?.length || 0,
        active: allSubs?.filter(s => s.status === 'active').length || 0,
        unsubscribed: allSubs?.filter(s => s.status === 'unsubscribed').length || 0
      }

      return res.status(200).json({
        subscribers: subscribers || [],
        total: count || 0,
        stats
      })
    } catch (error) {
      console.error('Error fetching subscribers:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // POST - Export subscribers
  if (req.method === 'POST') {
    try {
      const { action } = req.body

      if (action === 'export') {
        const { data: subscribers, error } = await supabase
          .from('newsletter_subscribers')
          .select('email, name, status, source, subscribed_at')
          .eq('status', 'active')
          .order('subscribed_at', { ascending: false })

        if (error) throw error

        // Convert to CSV
        const headers = ['Email', 'Name', 'Status', 'Source', 'Subscribed At']
        const csv = [
          headers.join(','),
          ...subscribers.map(s => [
            s.email,
            s.name || '',
            s.status,
            s.source || '',
            s.subscribed_at
          ].join(','))
        ].join('\n')

        return res.status(200).json({ 
          success: true, 
          csv,
          count: subscribers.length
        })
      }

      return res.status(400).json({ error: 'Invalid action' })
    } catch (error) {
      console.error('Error exporting subscribers:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // DELETE - Remove subscriber
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Subscriber ID required' })
      }

      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id)

      if (error) throw error

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting subscriber:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default requireAdminAuth(handler)
