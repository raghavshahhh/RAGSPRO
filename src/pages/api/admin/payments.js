// Admin Payments API - View all payments
import { requireAdminAuth } from '../../../utils/adminAuth'
import { getSupabaseAdmin } from '../../../utils/supabase'

async function handler(req, res) {
  const supabase = getSupabaseAdmin()
  
  if (!supabase) {
    return res.status(200).json({ 
      payments: [],
      total: 0,
      totalAmount: 0,
      message: 'Database not configured'
    })
  }

  if (req.method === 'GET') {
    try {
      const { status, limit = 100, offset = 0 } = req.query

      let query = supabase
        .from('payments')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (status) {
        query = query.eq('status', status)
      }

      const { data: payments, error, count } = await query

      if (error) throw error

      // Calculate totals
      const { data: totals } = await supabase
        .from('payments')
        .select('amount, status')

      const totalAmount = totals?.reduce((sum, p) => 
        p.status === 'completed' ? sum + (p.amount || 0) : sum, 0
      ) || 0

      const completedCount = totals?.filter(p => p.status === 'completed').length || 0
      const pendingCount = totals?.filter(p => p.status === 'pending').length || 0
      const failedCount = totals?.filter(p => p.status === 'failed').length || 0

      return res.status(200).json({
        payments: payments || [],
        total: count || 0,
        totalAmount,
        stats: {
          completed: completedCount,
          pending: pendingCount,
          failed: failedCount
        }
      })
    } catch (error) {
      console.error('Error fetching payments:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, status, notes } = req.body

      if (!id) {
        return res.status(400).json({ error: 'Payment ID required' })
      }

      const { data, error } = await supabase
        .from('payments')
        .update({ 
          status, 
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (error) throw error

      return res.status(200).json({ payment: data[0] })
    } catch (error) {
      console.error('Error updating payment:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default requireAdminAuth(handler)
