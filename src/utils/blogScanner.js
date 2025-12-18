import fs from 'fs'
import path from 'path'

export async function scanBlogFiles() {
  const blogsDir = path.join(process.cwd(), 'src/pages/blog')
  
  try {
    const files = fs.readdirSync(blogsDir)
    const blogFiles = files.filter(f => f.endsWith('.js') && f !== 'index.js')
    
    const blogs = await Promise.all(
      blogFiles.map(async (file) => {
        const filePath = path.join(blogsDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const stats = fs.statSync(filePath)
        
        // Extract metadata from file
        const slug = file.replace('.js', '')
        const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/i)
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : slug
        
        // Count words (approximate)
        const textContent = content.replace(/<[^>]*>/g, ' ')
        const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length
        
        // Check if AI generated (look for patterns)
        const isAIGenerated = content.includes('generateArticleSchema') || 
                             content.includes('generateFAQSchema')
        
        return {
          slug,
          title: title.substring(0, 100),
          filePath: file,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
          wordCount,
          isAIGenerated,
          status: 'published',
          url: `/blog/${slug}`
        }
      })
    )
    
    return blogs.sort((a, b) => b.createdAt - a.createdAt)
  } catch (error) {
    console.error('Error scanning blogs:', error)
    return []
  }
}

export async function getBlogStats() {
  const blogs = await scanBlogFiles()
  
  return {
    total: blogs.length,
    aiGenerated: blogs.filter(b => b.isAIGenerated).length,
    manual: blogs.filter(b => !b.isAIGenerated).length,
    totalWords: blogs.reduce((sum, b) => sum + b.wordCount, 0),
    avgWords: blogs.length > 0 ? Math.round(blogs.reduce((sum, b) => sum + b.wordCount, 0) / blogs.length) : 0,
    lastPublished: blogs[0]?.createdAt || null
  }
}
