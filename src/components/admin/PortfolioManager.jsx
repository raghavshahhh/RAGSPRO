import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiEdit2, FiTrash2, FiPlus, FiX, FiSave } from 'react-icons/fi'

export default function PortfolioManager() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: [],
    image: '',
    description: '',
    technologies: [],
    live_link: '',
    github_link: '',
    display_order: 0,
    is_active: true
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/portfolio-projects')
      const data = await res.json()
      if (data.success) {
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = '/api/admin/portfolio-projects'
      const method = editingProject ? 'PUT' : 'POST'
      const body = editingProject 
        ? { ...formData, id: editingProject.id }
        : formData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()
      
      if (data.success) {
        await fetchProjects()
        setShowModal(false)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/admin/portfolio-projects?id=${id}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      if (data.success) {
        await fetchProjects()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category || [],
      image: project.image,
      description: project.description,
      technologies: project.technologies || [],
      live_link: project.live_link || '',
      github_link: project.github_link || '',
      display_order: project.display_order || 0,
      is_active: project.is_active
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      category: [],
      image: '',
      description: '',
      technologies: [],
      live_link: '',
      github_link: '',
      display_order: 0,
      is_active: true
    })
  }

  const handleArrayInput = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(Boolean)
    setFormData({ ...formData, [field]: array })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio Projects</h2>
        <button
          onClick={() => {
            resetForm()
            setShowModal(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {/* Projects List */}
      {loading && !showModal ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {!project.is_active && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded">
                    Inactive
                  </div>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiX size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category (comma-separated: web, ai, design)
                  </label>
                  <input
                    type="text"
                    value={formData.category.join(', ')}
                    onChange={(e) => handleArrayInput('category', e.target.value)}
                    placeholder="web, ai, design"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/images/projects/project.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies.join(', ')}
                    onChange={(e) => handleArrayInput('technologies', e.target.value)}
                    placeholder="Next.js, React, TailwindCSS"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Live Link
                    </label>
                    <input
                      type="url"
                      value={formData.live_link}
                      onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub Link
                    </label>
                    <input
                      type="url"
                      value={formData.github_link}
                      onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    <FiSave /> {loading ? 'Saving...' : 'Save Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      resetForm()
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
