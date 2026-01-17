'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiExternalLink, FiGithub, FiArrowLeft } from 'react-icons/fi'
import SEOHead from '../components/SEOHead'

export default function AllProjects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Fetch projects from database
    fetchProjects()
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/portfolio-projects')
      const data = await res.json()
      if (data.success && data.projects && data.projects.length > 0) {
        // Transform database format to match component format
        const transformedProjects = data.projects.map(p => ({
          id: p.id,
          title: p.title,
          category: p.category || [],
          image: p.image,
          description: p.description,
          technologies: p.technologies || [],
          liveLink: p.live_link,
          githubLink: p.github_link
        }))
        setProjects(transformedProjects)
      } else {
        // Fallback to hardcoded projects if database is empty
        setProjects(getHardcodedProjects())
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback to hardcoded projects on error
      setProjects(getHardcodedProjects())
    } finally {
      setLoading(false)
    }
  }

  const getHardcodedProjects = () => {
    return [
      {
        id: 1,
        title: 'Lawai - AI Legal Assistant',
        category: ['ai', 'web'],
        image: '/images/projects/lawai.jpg',
        description: 'AI-powered legal assistant helping users understand Indian laws and regulations with instant answers.',
        technologies: ['Next.js', 'OpenAI', 'Tailwind CSS'],
        liveLink: 'https://lawai.ragspro.com',
        githubLink: '#'
      },
      {
        id: 2,
        title: 'Glow - AI Photo Editor',
        category: ['ai', 'web'],
        image: '/images/projects/glow.png',
        description: 'Professional AI photo editing tool with advanced filters, background removal, and enhancement features.',
        technologies: ['React', 'TensorFlow.js', 'Canvas API'],
        liveLink: 'https://glow.ragspro.com',
        githubLink: '#'
      },
      {
        id: 3,
        title: 'Himshakti - E-commerce Platform',
        category: ['web'],
        image: '/images/projects/himshakti.jpg',
        description: 'Full-featured e-commerce platform for Himalayan products with payment integration and order management.',
        technologies: ['Next.js', 'Stripe', 'MongoDB'],
        liveLink: 'https://himshakti.ragspro.com',
        githubLink: '#'
      },
      {
        id: 4,
        title: 'Elito - Premium Maid Services',
        category: ['web'],
        image: '/images/projects/elito.jpg',
        description: 'Premium maid service booking platform with real-time availability and secure payments.',
        technologies: ['Next.js', 'Razorpay', 'PostgreSQL'],
        liveLink: 'https://elito.ragspro.com',
        githubLink: '#'
      },
      {
        id: 5,
        title: 'SAPD - Subtitle Generator',
        category: ['ai', 'web'],
        image: '/images/projects/subtitle.jpg',
        description: 'AI-powered subtitle generation and translation tool for video content creators.',
        technologies: ['Python', 'Whisper AI', 'React'],
        liveLink: 'https://sapd.ragspro.com',
        githubLink: '#'
      },
      {
        id: 6,
        title: 'Restaurant Management System',
        category: ['web'],
        image: '/images/projects/restaurant.jpg',
        description: 'Complete restaurant management solution with POS, inventory, and table booking features.',
        technologies: ['Vue.js', 'Node.js', 'MySQL'],
        liveLink: '#',
        githubLink: '#'
      },
      {
        id: 7,
        title: 'Lead Generator Pro',
        category: ['ai', 'web'],
        image: '/images/projects/lead-generator.jpg',
        description: 'AI-powered lead generation tool that finds and qualifies potential customers automatically.',
        technologies: ['Next.js', 'OpenAI', 'Supabase'],
        liveLink: '#',
        githubLink: '#'
      },
      {
        id: 8,
        title: 'Shoe Store E-commerce',
        category: ['web', 'design'],
        image: '/images/projects/shoes.jpg',
        description: 'Modern e-commerce platform for shoe retailers with AR try-on feature.',
        technologies: ['React', 'Three.js', 'Stripe'],
        liveLink: '#',
        githubLink: '#'
      }
    ]
  }
  
  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'ai', name: 'AI Projects' },
    { id: 'design', name: 'UI/UX Design' }
  ]
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter))
  
  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title="Our Startup Apps Portfolio | SaaS & AI Development Projects by RAGSPRO"
        description="See all startup apps we built - SaaS platforms, AI solutions, and web applications. RAGSPRO's complete portfolio of successful startup development projects."
        keywords="startup apps portfolio, SaaS development projects, AI app development, web application portfolio, startup development agency, MVP development examples"
        url="https://ragspro.com/projects"
      />
      
      {/* Hero Section */}
      <section className="min-h-screen bg-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <FiArrowLeft /> Back to Home
            </Link>
          </motion.div>
          
          {/* Simple Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-black">
              Latest Projects
            </h1>
          </motion.div>
          
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter.id 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No projects found in this category.</p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  View All Projects
                </button>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="group cursor-pointer"
                  onClick={() => window.open(project.liveLink, '_blank')}
                >
                  <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden mb-3">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Click indicator overlay */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <FiExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-bold text-black group-hover:text-[#22c55e] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-4 pt-1">
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-black hover:text-[#22c55e] transition-colors text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink size={14} /> Live
                      </a>
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-black hover:text-[#22c55e] transition-colors text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub size={14} /> Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          

        </div>
      </section>
    </div>
  )
}