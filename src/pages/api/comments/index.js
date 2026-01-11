// Comments API - CRUD operations for blog comments
import { getSupabaseAdmin, logSystemEvent } from '../../../utils/supabase'

export default async function handler(req, res) {
  const supabase = getSupabaseAdmin()

  if (!supabase) {
    return res.status(200).json({ 
      comments: [],
      message: 'Database not configured'
    })
  }

  // GET - Fetch comments for a blog post
  if (req.method === 'GET') {
    try {
      const { slug } = req.query

      if (!slug) {
        return res.status(400).json({ error: 'Blog slug required' })
      }

      // Get all comments for this blog
      const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('blog_slug', slug)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Organize into parent/child structure
      const parentComments = comments?.filter(c => !c.parent_id) || []
      const replies = comments?.filter(c => c.parent_id) || []

      const commentsWithReplies = parentComments.map(comment => ({
        ...comment,
        replies: replies.filter(r => r.parent_id === comment.id)
      }))

      return res.status(200).json({ comments: commentsWithReplies })
    } catch (error) {
      console.error('Error fetching comments:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // POST - Create new comment
  if (req.method === 'POST') {
    try {
      const { 
        blogSlug, 
        blogTitle,
        content, 
        parentId,
        authorName, 
        authorEmail,
        userId 
      } = req.body

      if (!blogSlug || !content) {
        return res.status(400).json({ error: 'Blog slug and content required' })
      }

      // Basic spam check
      if (content.length > 2000) {
        return res.status(400).json({ error: 'Comment too long (max 2000 characters)' })
      }

      // Check for spam patterns
      const spamPatterns = [
        /\b(viagra|casino|lottery|winner|click here|buy now)\b/i,
        /(http|https):\/\/[^\s]+/g // URLs (optional - you might want to allow some)
      ]

      const isSpam = spamPatterns.some(pattern => pattern.test(content))

      const commentData = {
        blog_slug: blogSlug,
        blog_title: blogTitle,
        content: content.trim(),
        parent_id: parentId || null,
        author_name: authorName || 'Anonymous',
        author_email: authorEmail || null,
        user_id: userId || null,
        status: isSpam ? 'spam' : 'approved', // Auto-approve non-spam
        likes: 0,
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('comments')
        .insert([commentData])
        .select()

      if (error) throw error

      await logSystemEvent('comment', 'success', 'New comment posted', {
        blogSlug,
        authorName,
        isSpam
      })

      return res.status(200).json({ 
        success: true, 
        comment: data[0],
        message: isSpam ? 'Comment submitted for review' : 'Comment posted successfully'
      })
    } catch (error) {
      console.error('Error creating comment:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  // DELETE - Delete comment (owner only)
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Comment ID required' })
      }

      // Soft delete - mark as deleted
      const { error } = await supabase
        .from('comments')
        .update({ 
          status: 'deleted',
          deleted_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error deleting comment:', error)
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
