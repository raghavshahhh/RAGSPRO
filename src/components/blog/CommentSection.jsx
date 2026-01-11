// Blog Comment Section Component
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { FiUser, FiMessageCircle, FiThumbsUp, FiFlag, FiTrash2, FiSend } from 'react-icons/fi'

export default function CommentSection({ blogSlug, blogTitle }) {
  const { user, isAuthenticated } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchComments()
  }, [blogSlug])

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?slug=${blogSlug}`)
      const data = await res.json()
      setComments(data.comments || [])
    } catch (err) {
      console.error('Error fetching comments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogSlug,
          blogTitle,
          content: newComment,
          authorName: user?.user_metadata?.name || 'Anonymous',
          authorEmail: user?.email || null,
          userId: user?.id || null
        })
      })

      const data = await res.json()

      if (data.success) {
        setNewComment('')
        fetchComments()
      } else {
        setError(data.error || 'Failed to post comment')
      }
    } catch (err) {
      setError('Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentId) => {
    if (!replyText.trim()) return

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blogSlug,
          blogTitle,
          content: replyText,
          parentId,
          authorName: user?.user_metadata?.name || 'Anonymous',
          authorEmail: user?.email || null,
          userId: user?.id || null
        })
      })

      const data = await res.json()

      if (data.success) {
        setReplyText('')
        setReplyTo(null)
        fetchComments()
      } else {
        setError(data.error || 'Failed to post reply')
      }
    } catch (err) {
      setError('Failed to post reply')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLike = async (commentId) => {
    try {
      await fetch('/api/comments/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId })
      })
      fetchComments()
    } catch (err) {
      console.error('Error liking comment:', err)
    }
  }

  const handleReport = async (commentId) => {
    if (!confirm('Report this comment as inappropriate?')) return

    try {
      await fetch('/api/comments/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId, userId: user?.id })
      })
      alert('Comment reported. Thank you for helping keep our community safe.')
    } catch (err) {
      console.error('Error reporting comment:', err)
    }
  }

  const handleDelete = async (commentId) => {
    if (!confirm('Delete this comment?')) return

    try {
      await fetch(`/api/comments?id=${commentId}`, {
        method: 'DELETE'
      })
      fetchComments()
    } catch (err) {
      console.error('Error deleting comment:', err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const renderComment = (comment, isReply = false) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isReply ? 'ml-12 mt-4' : 'mb-6'}`}
    >
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white font-medium">
              {comment.author_name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div>
              <p className="font-medium text-gray-900">{comment.author_name || 'Anonymous'}</p>
              <p className="text-xs text-gray-500">{formatDate(comment.created_at)}</p>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {user?.id === comment.user_id && (
              <button
                onClick={() => handleDelete(comment.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => handleReport(comment.id)}
              className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
              title="Report"
            >
              <FiFlag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Comment Content */}
        <p className="text-gray-700 mb-3 whitespace-pre-wrap">{comment.content}</p>

        {/* Comment Footer */}
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => handleLike(comment.id)}
            className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <FiThumbsUp className="w-4 h-4" />
            <span>{comment.likes || 0}</span>
          </button>
          
          {!isReply && (
            <button
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="flex items-center gap-1 text-gray-500 hover:text-black transition-colors"
            >
              <FiMessageCircle className="w-4 h-4" />
              <span>Reply</span>
            </button>
          )}
        </div>

        {/* Reply Form */}
        <AnimatePresence>
          {replyTo === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm">
                  {user?.user_metadata?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none text-sm"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setReplyTo(null)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={submitting || !replyText.trim()}
                      className="px-3 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replies */}
      {comment.replies?.map(reply => renderComment(reply, true))}
    </motion.div>
  )

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiMessageCircle className="w-6 h-6" />
        Comments ({comments.length})
      </h3>

      {/* New Comment Form */}
      <div className="mb-8">
        <form onSubmit={handleSubmitComment}>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
              {user?.user_metadata?.name?.charAt(0)?.toUpperCase() || <FiUser />}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={isAuthenticated ? "Share your thoughts..." : "Sign in to comment..."}
                rows={3}
                disabled={!isAuthenticated}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-500">
                  {isAuthenticated 
                    ? `Commenting as ${user?.user_metadata?.name || user?.email}`
                    : 'Please sign in to comment'
                  }
                </p>
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim() || !isAuthenticated}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend className="w-4 h-4" />
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mx-auto"></div>
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.filter(c => !c.parent_id).map(comment => renderComment(comment))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FiMessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  )
}
