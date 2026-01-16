import { supabase } from '../../../utils/supabase'

export default async function handler(req, res) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        return await getLeads(req, res)
      case 'PUT':
        return await updateLead(req, res)
      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Leads API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

// GET - Fetch all leads
async function getLeads(req, res) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return res.status(200).json({ success: true, leads: data })
}

// PUT - Update lead status
async function updateLead(req, res) {
  const { id, status } = req.body

  if (!id || !status) {
    return res.status(400).json({ error: 'Lead ID and status are required' })
  }

  const { data, error } = await supabase
    .from('leads')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return res.status(200).json({ success: true, lead: data })
}
