// Like Comment API
import { getSupabaseAdmin } from '../../../utils/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return res.status(200).json({ success: false, message: 'Database not configured' })
  }

  try {
    const { commentId } = req.body

    if (!commentId) {
      return res.status(400).json({ error: 'Comment ID required' })
    }

    // Get current likes
    const { data: comment, error: fetchError } = await supabase
      .from('comments')
      .select('likes')
      .eq('id', commentId)
      .single()

    if (fetchError) throw fetchError

    // Increment likes
    const { error: updateError } = await supabase
      .from('comments')
      .update({ likes: (comment.likes || 0) + 1 })
      .eq('id', commentId)

    if (updateError) throw updateError

    return res.status(200).json({ success: true, likes: (comment.likes || 0) + 1 })
  } catch (error) {
    console.error('Error liking comment:', error)
    return res.status(500).json({ error: error.message })
  }
}
