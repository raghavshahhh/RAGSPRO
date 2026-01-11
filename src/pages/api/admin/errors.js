// Admin Errors API - View and manage error logs
import { requireAdminAuth } from '../../../utils/adminAuth'
import { getSupabaseAdmin } from '../../../utils/supabase'

async function handler(req, res) {
  const supabase = getSupabaseAdmin()
  
  if (!supabase) {
    return res.status(200).json({ 
      errors: [],
      total: 0,
      message: 'Database not configured'
    })
  }

  // GET - List errors
  if (req.method === 'GET') {
    try {
      const { level, resolved, limit = 50, offset = 0 } = req.query

      let query = supabase
        .from('error_logs')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (level) {
        query = query.eq('level', level)
      }

      if (resolved !== undefined) {
        query = query.eq('resolved', resolved === 'true')
      }

      const { data: errors, error, count } = await query

      if (error) throw error

      // Get stats
      const { data: allErrors } = await supabase
        .from('error_logs')
        .select('level, resolved')

      const stats = {
        total: allErrors?.length || 0,
        unresolved: allErrors?.filter(e => !e.resolved).length || 0,
        errors: allErrors?.filter(e => e.level === 'error').length || 0,
        warnings: allErrors?.filter(e => e.level === 'warning').length || 0,
        fatal: allErrors?.filter(e => e.level === 'fatal').length || 0
      }

      return res.status(200).json({
        errors: errors || [],
        total: count || 0,
        stats
      })
    } catch (error) {
      console.error('Error fetching errors:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // PATCH - Mark error as resolved
  if (req.method === 'PATCH') {
    try {
      const { id, resolved, notes } = req.body

      if (!id) {
        return res.status(400).json({ error: 'Error ID required' })
      }

      const { data, error } = await supabase
        .from('error_logs')
        .update({ 
          resolved: resolved !== false,
          resolution_notes: notes,
          resolved_at: resolved !== false ? new Date().toISOString() : null
        })
        .eq('id', id)
        .select()

      if (error) throw error

      return res.status(200).json({ error: data[0] })
    } catch (error) {
      console.error('Error updating error:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // DELETE - Delete old errors
  if (req.method === 'DELETE') {
    try {
      const { olderThan } = req.query // days

      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - (parseInt(olderThan) || 30))

      const { error } = await supabase
        .from('error_logs')
        .delete()
        .lt('created_at', cutoffDate.toISOString())
        .eq('resolved', true)

      if (error) throw error

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting errors:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default requireAdminAuth(handler)
