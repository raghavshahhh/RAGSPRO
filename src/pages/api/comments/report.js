// Report Comment API
import { getSupabaseAdmin, logSystemEvent } from '../../../utils/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return res.status(200).json({ success: false, message: 'Database not configured' })
  }

  try {
    const { commentId, userId, reason } = req.body

    if (!commentId) {
      return res.status(400).json({ error: 'Comment ID required' })
    }

    // Log the report
    await supabase
      .from('comment_reports')
      .insert([{
        comment_id: commentId,
        reporter_id: userId || null,
        reason: reason || 'Inappropriate content',
        created_at: new Date().toISOString()
      }])

    // Get report count for this comment
    const { count } = await supabase
      .from('comment_reports')
      .select('*', { count: 'exact' })
      .eq('comment_id', commentId)

    // Auto-hide if reported 3+ times
    if (count >= 3) {
      await supabase
        .from('comments')
        .update({ status: 'flagged' })
        .eq('id', commentId)
    }

    await logSystemEvent('comment', 'warning', 'Comment reported', {
      commentId,
      reportCount: count,
      reason
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error reporting comment:', error)
    return res.status(500).json({ error: error.message })
  }
}
