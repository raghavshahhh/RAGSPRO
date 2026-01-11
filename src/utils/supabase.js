import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

let supabase = null

export function getSupabaseAdmin() {
  if (!supabase && supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return supabase
}

// Blog automation logs
export async function logBlogRun(data) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data: result, error } = await supabase
    .from('blog_runs')
    .insert([{
      blog_slug: data.slug,
      status: data.status,
      error_log: data.error,
      token_usage: data.tokenUsage,
      prompt: data.prompt,
      generated_at: new Date().toISOString()
    }])
    .select()
  
  if (error) console.error('Error logging blog run:', error)
  return result
}

// System logs
export async function logSystemEvent(type, status, message, metadata = {}) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('system_logs')
    .insert([{ 
      type, 
      status, 
      message, 
      metadata,
      created_at: new Date().toISOString()
    }])
    .select()
  
  if (error) console.error('Error logging system event:', error)
  return data
}

// Track page views
export async function trackPageView(page, source = 'direct', metadata = {}) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const today = new Date().toISOString().split('T')[0]
  
  // Try to increment existing record
  const { data: existing } = await supabase
    .from('traffic_stats')
    .select('*')
    .eq('date', today)
    .eq('page', page)
    .eq('source', source)
    .single()
  
  if (existing) {
    const { data, error } = await supabase
      .from('traffic_stats')
      .update({ views: existing.views + 1 })
      .eq('id', existing.id)
      .select()
    
    if (error) console.error('Error updating page view:', error)
    return data
  } else {
    const { data, error } = await supabase
      .from('traffic_stats')
      .insert([{ date: today, page, source, views: 1, metadata }])
      .select()
    
    if (error) console.error('Error tracking page view:', error)
    return data
  }
}

// Save lead
export async function saveLead(leadData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      source: leadData.source,
      page: leadData.page,
      message: leadData.message,
      status: 'new',
      metadata: leadData.metadata || {},
      created_at: new Date().toISOString()
    }])
    .select()
  
  if (error) console.error('Error saving lead:', error)
  return data
}

// Get blog run history
export async function getBlogRunHistory(limit = 50) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  
  const { data, error } = await supabase
    .from('blog_runs')
    .select('*')
    .order('generated_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching blog runs:', error)
    return []
  }
  
  return data || []
}

// Get system logs
export async function getSystemLogs(type = null, limit = 100) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  
  let query = supabase
    .from('system_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (type) {
    query = query.eq('type', type)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching system logs:', error)
    return []
  }
  
  return data || []
}

// Get traffic stats
export async function getTrafficStats(days = 30) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  
  const { data, error } = await supabase
    .from('traffic_stats')
    .select('*')
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: false })
  
  if (error) {
    console.error('Error fetching traffic stats:', error)
    return []
  }
  
  return data || []
}

// Get leads
export async function getLeads(status = null, limit = 100) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }
  
  return data || []
}

// Update lead status
export async function updateLeadStatus(leadId, status, notes = null) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const updateData = { status }
  if (notes) {
    updateData.metadata = { notes }
  }
  
  const { data, error } = await supabase
    .from('leads')
    .update(updateData)
    .eq('id', leadId)
    .select()
  
  if (error) {
    console.error('Error updating lead:', error)
    return null
  }
  
  return data
}

// Check if Supabase is configured
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabaseKey)
}

// Save payment
export async function savePayment(paymentData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('payments')
    .insert([{
      razorpay_order_id: paymentData.razorpay_order_id,
      razorpay_payment_id: paymentData.razorpay_payment_id,
      razorpay_signature: paymentData.razorpay_signature,
      amount: paymentData.amount,
      currency: paymentData.currency || 'INR',
      status: paymentData.status || 'completed',
      description: paymentData.description,
      user_id: paymentData.user_id,
      customer_name: paymentData.customer_name,
      customer_email: paymentData.customer_email,
      customer_phone: paymentData.customer_phone,
      metadata: paymentData.metadata || {},
      created_at: new Date().toISOString()
    }])
    .select()
  
  if (error) console.error('Error saving payment:', error)
  return data
}

// Get payments
export async function getPayments(userId = null, limit = 100) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  
  let query = supabase
    .from('payments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (userId) {
    query = query.eq('user_id', userId)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching payments:', error)
    return []
  }
  
  return data || []
}

// Save comment
export async function saveComment(commentData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('comments')
    .insert([commentData])
    .select()
  
  if (error) console.error('Error saving comment:', error)
  return data
}

// Get comments for blog
export async function getComments(blogSlug, status = 'approved') {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('blog_slug', blogSlug)
    .eq('status', status)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching comments:', error)
    return []
  }
  
  return data || []
}

// Save newsletter subscriber
export async function saveSubscriber(subscriberData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([subscriberData])
    .select()
  
  if (error) console.error('Error saving subscriber:', error)
  return data
}

// Get subscribers
export async function getSubscribers(status = 'active', limit = 100) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  
  let query = supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })
    .limit(limit)
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching subscribers:', error)
    return []
  }
  
  return data || []
}

// Save error log
export async function saveErrorLog(errorData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('error_logs')
    .insert([{
      message: errorData.message,
      stack: errorData.stack,
      error_name: errorData.name,
      level: errorData.level || 'error',
      url: errorData.url,
      user_agent: errorData.userAgent,
      context: errorData.context || {},
      resolved: false,
      created_at: new Date().toISOString()
    }])
    .select()
  
  if (error) console.error('Error saving error log:', error)
  return data
}

// Get error logs
export async function getErrorLogs(resolved = null, limit = 100) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return []
  
  let query = supabase
    .from('error_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (resolved !== null) {
    query = query.eq('resolved', resolved)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching error logs:', error)
    return []
  }
  
  return data || []
}

// Save user profile
export async function saveUserProfile(profileData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert([{
      id: profileData.id,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      company: profileData.company,
      avatar_url: profileData.avatar_url,
      metadata: profileData.metadata || {},
      updated_at: new Date().toISOString()
    }])
    .select()
  
  if (error) console.error('Error saving user profile:', error)
  return data
}

// Save project
export async function saveProject(projectData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('projects')
    .insert([{
      user_id: projectData.user_id,
      name: projectData.name,
      type: projectData.type,
      description: projectData.description,
      status: projectData.status || 'pending',
      progress: projectData.progress || 0,
      start_date: projectData.start_date,
      end_date: projectData.end_date,
      metadata: projectData.metadata || {},
      created_at: new Date().toISOString()
    }])
    .select()
  
  if (error) console.error('Error saving project:', error)
  return data
}
