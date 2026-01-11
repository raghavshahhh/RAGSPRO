// Admin Comments API - Manage all blog comments
import { requireAdminAuth } from '../../../utils/adminAuth'
import { getSupabaseAdmin, logSystemEvent } from '../../../utils/supabase'

async function handler(req, res) {
  const supabase = getSupabaseAdmin()
  
  if (!supabase) {
    return res.status(200).json({ 
      comments: [],
      total: 0,
      message: 'Database not configured'
    })
  }

  // GET - List all comments
  if (req.method === 'GET') {
    try {
      const { status, blogSlug, limit = 100, offset = 0 } = req.query

      let query = supabase
        .from('comments')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (status) {
        query = query.eq('status', status)
      }

      if (blogSlug) {
        query = query.eq('blog_slug', blogSlug)
      }

      const { data: comments, error, count } = await query

      if (error) throw error

      // Get stats
      const { data: allComments } = await supabase
        .from('comments')
        .select('status')

      const stats = {
        total: allComments?.length || 0,
        approved: allComments?.filter(c => c.status === 'approved').length || 0,
        pending: allComments?.filter(c => c.status === 'pending').length || 0,
        spam: allComments?.filter(c => c.status === 'spam').length || 0,
        flagged: allComments?.filter(c => c.status === 'flagged').length || 0
      }

      return res.status(200).json({
        comments: comments || [],
        total: count || 0,
        stats
      })
    } catch (error) {
      console.error('Error fetching comments:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // PATCH - Update comment status
  if (req.method === 'PATCH') {
    try {
      const { id, status } = req.body

      if (!id || !status) {
        return res.status(400).json({ error: 'Comment ID and status required' })
      }

      const validStatuses = ['pending', 'approved', 'spam', 'flagged', 'deleted']
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' })
      }

      const { data, error } = await supabase
        .from('comments')
        .update({ status })
        .eq('id', id)
        .select()

      if (error) throw error

      await logSystemEvent('comment', 'info', `Comment status updated to ${status}`, {
        commentId: id,
        newStatus: status
      })

      return res.status(200).json({ comment: data[0] })
    } catch (error) {
      console.error('Error updating comment:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // DELETE - Delete comment permanently
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Comment ID required' })
      }

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)

      if (error) throw error

      await logSystemEvent('comment', 'info', 'Comment deleted permanently', {
        commentId: id
      })

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting comment:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default requireAdminAuth(handler)
