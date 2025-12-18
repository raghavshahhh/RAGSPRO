// Admin authentication utility
// Use this in all admin API routes

export function verifyAdminAuth(req) {
  const authHeader = req.headers.authorization
  const adminSecret = process.env.ADMIN_SECRET || 'ragspro2025'
  
  // Check Bearer token
  if (authHeader === `Bearer ${adminSecret}`) {
    return { authorized: true }
  }
  
  // Check query param (for testing)
  if (req.query.secret === adminSecret) {
    return { authorized: true }
  }
  
  return { authorized: false, error: 'Unauthorized' }
}

export function requireAdminAuth(handler) {
  return async (req, res) => {
    const auth = verifyAdminAuth(req)
    
    if (!auth.authorized) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    return handler(req, res)
  }
}
