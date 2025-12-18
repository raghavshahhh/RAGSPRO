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
