import { supabase } from '../../../utils/supabase'

export default async function handler(req, res) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        return await getProjects(req, res)
      case 'POST':
        return await createProject(req, res)
      case 'PUT':
        return await updateProject(req, res)
      case 'DELETE':
        return await deleteProject(req, res)
      default:
        return res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Portfolio API Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

// GET - Fetch all projects
async function getProjects(req, res) {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return res.status(200).json({ success: true, projects: data })
}

// POST - Create new project
async function createProject(req, res) {
  const projectData = req.body

  const { data, error } = await supabase
    .from('portfolio_projects')
    .insert([projectData])
    .select()
    .single()

  if (error) throw error
  return res.status(201).json({ success: true, project: data })
}

// PUT - Update existing project
async function updateProject(req, res) {
  const { id, ...updateData } = req.body

  if (!id) {
    return res.status(400).json({ error: 'Project ID is required' })
  }

  const { data, error } = await supabase
    .from('portfolio_projects')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return res.status(200).json({ success: true, project: data })
}

// DELETE - Delete project
async function deleteProject(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Project ID is required' })
  }

  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', id)

  if (error) throw error
  return res.status(200).json({ success: true, message: 'Project deleted' })
}
