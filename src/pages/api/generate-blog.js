// API endpoint to generate blog posts using Gemini AI
import { GoogleGenerativeAI } from '@google/generative-ai'
import fs from 'fs'
import path from 'path'
import { logBlogRun, logSystemEvent } from '../../utils/supabase'

// Initialize Gemini with error handling
let genAI = null
try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }
} catch (error) {
  console.error('Failed to initialize Gemini:', error)
}

// Available models in priority order
const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash'
]

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const startTime = Date.now()
  let blogSlug = null
  
  try {
    // Validate Gemini API key
    if (!genAI || !process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Gemini API not configured',
        details: 'GEMINI_API_KEY environment variable is missing'
      })
    }

    const { topic, keywords, manual } = req.body
    
    // Log start
    await logSystemEvent('ai', 'info', 'Blog generation started', { topic, keywords, manual })
    
    // Check if auto-generation is enabled (unless manual request)
    if (!manual && process.env.ENABLE_AUTO_BLOG !== 'true') {
      await logSystemEvent('ai', 'warning', 'Auto blog generation disabled', { topic })
      return res.status(403).json({ 
        error: 'Auto blog generation is disabled' 
      })
    }
    
    // Try models with fallback
    let result = null
    let usedModel = null
    let lastError = null

    for (const modelName of GEMINI_MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        usedModel = modelName
    
        const prompt = `You are a professional content writer for RAGSPRO, a startup MVP development agency in India.

Write a comprehensive blog post about: ${topic || 'trending startup development topic'}

Target keywords: ${keywords || 'MVP development, startup development, SaaS development'}

CRITICAL INSTRUCTIONS:
1. Return ONLY a valid JSON object
2. NO markdown formatting
3. NO code blocks (no \`\`\`json)
4. NO extra text before or after the JSON
5. Start with { and end with }

Required JSON structure:
{
  "title": "SEO-optimized title (60-70 characters)",
  "slug": "url-friendly-slug-without-special-chars",
  "excerpt": "Compelling excerpt (150-160 characters)",
  "category": "Startup Development",
  "readTime": "8 min read",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "content": "<h2>Introduction</h2><p>Write 1500-2000 words with proper HTML tags. Use h2 for sections, p for paragraphs. Focus on Indian startup ecosystem. Mention RAGSPRO naturally. Include pricing context (₹85K-₹3L). End with CTA.</p>"
}

Write the actual blog content and return ONLY the JSON object.`
        
        result = await model.generateContent(prompt)
        break // Success, exit loop
      } catch (error) {
        lastError = error
        console.error(`Model ${modelName} failed:`, error.message)
        
        // If it's a 503 or rate limit, try next model
        if (error.message.includes('503') || error.message.includes('overloaded') || error.message.includes('429')) {
          continue
        }
        // For other errors, throw immediately
        throw error
      }
    }

    if (!result) {
      throw new Error(`All Gemini models failed. Last error: ${lastError?.message || 'Unknown'}`)
    }

    const response = await result.response
    const text = response.text()
    
    // Parse JSON from response
    let blogData
    try {
      // Clean the response text
      let cleanText = text.trim()
      
      // Remove markdown code blocks if present
      if (cleanText.includes('```json')) {
        const jsonMatch = cleanText.match(/```json\s*\n([\s\S]*?)\n```/)
        if (jsonMatch) {
          cleanText = jsonMatch[1].trim()
        }
      } else if (cleanText.includes('```')) {
        const jsonMatch = cleanText.match(/```\s*\n([\s\S]*?)\n```/)
        if (jsonMatch) {
          cleanText = jsonMatch[1].trim()
        }
      }
      
      // Extract JSON object if there's extra text
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        cleanText = jsonMatch[0]
      }
      
      blogData = JSON.parse(cleanText)
      
      // Validate required fields
      if (!blogData.title || !blogData.slug || !blogData.content) {
        throw new Error('Missing required fields in AI response')
      }
      
      // Sanitize and validate content
      blogData.title = String(blogData.title).substring(0, 200)
      blogData.slug = String(blogData.slug).toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 100)
      blogData.excerpt = String(blogData.excerpt || '').substring(0, 300)
      blogData.category = String(blogData.category || 'Startup Development').substring(0, 50)
      blogData.readTime = String(blogData.readTime || '5 min read').substring(0, 20)
      blogData.keywords = Array.isArray(blogData.keywords) ? blogData.keywords.slice(0, 10) : []
      
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      await logSystemEvent('ai', 'failed', 'Failed to parse AI response', {
        error: parseError.message,
        rawResponse: text.substring(0, 500)
      })
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: parseError.message
      })
    }
    
    // Generate unique slug with date
    const date = new Date()
    const dateStr = date.toISOString().split('T')[0]
    const uniqueSlug = `${blogData.slug}-${dateStr}`
    blogSlug = uniqueSlug
    
    // Create blog post file
    const blogContent = generateBlogFile(blogData, uniqueSlug)
    const filePath = path.join(process.cwd(), 'src', 'pages', 'blog', `${uniqueSlug}.js`)
    
    // Write file
    fs.writeFileSync(filePath, blogContent, 'utf8')
    
    // Update blog listing
    await updateBlogListing(blogData, uniqueSlug, date)
    
    // Calculate execution time and token usage (approximate)
    const executionTime = Date.now() - startTime
    const tokenUsage = Math.ceil(text.length / 4) // Rough estimate
    
    // Log success to database
    await logBlogRun({
      slug: uniqueSlug,
      status: 'success',
      error: null,
      tokenUsage,
      prompt: topic || 'Auto-generated topic'
    })
    
    await logSystemEvent('ai', 'success', `Blog generated: ${blogData.title}`, {
      slug: uniqueSlug,
      executionTime,
      tokenUsage,
      wordCount: blogData.content.split(' ').length,
      model: usedModel
    })
    
    return res.status(200).json({
      success: true,
      message: 'Blog post generated successfully',
      slug: uniqueSlug,
      title: blogData.title,
      filePath: `/blog/${uniqueSlug}`,
      model: usedModel,
      stats: {
        executionTime,
        tokenUsage,
        wordCount: blogData.content.split(' ').length
      }
    })
    
  } catch (error) {
    console.error('Blog generation error:', error)
    
    // Log error to database
    try {
      await logBlogRun({
        slug: blogSlug || 'unknown',
        status: 'failed',
        error: error.message,
        tokenUsage: 0,
        prompt: req.body?.topic || 'Unknown'
      })
      
      await logSystemEvent('ai', 'failed', `Blog generation failed: ${error.message}`, {
        error: error.toString(),
        stack: error.stack
      })
    } catch (logError) {
      console.error('Failed to log error:', logError)
    }
    
    // Return clean JSON error (never HTML)
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Blog generation failed',
      details: error.toString(),
      timestamp: new Date().toISOString()
    })
  }
}

// Generate Next.js blog page file
function generateBlogFile(blogData, slug) {
  // Escape special characters for JSX
  const escapeJSX = (str) => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$')
      .replace(/'/g, "\\'")
  }
  
  const safeTitle = escapeJSX(blogData.title)
  const safeExcerpt = escapeJSX(blogData.excerpt)
  const safeContent = escapeJSX(blogData.content)
  const safeCategory = escapeJSX(blogData.category)
  
  return `import SEOHead from '../../components/SEOHead'
import { useRouter } from 'next/router'
import BlogCTA from '../../components/blog/BlogCTA'

export default function ${toPascalCase(slug)}() {
  const router = useRouter()

  return (
    <>
      <SEOHead 
        title={\`${safeTitle} | RAGSPRO Blog\`}
        description={\`${safeExcerpt}\`}
        keywords="${blogData.keywords.join(', ')}"
        url="https://ragspro.com/blog/${slug}"
      />
      
      <article className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.push('/blog')}
            className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </button>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
                ${safeCategory}
              </span>
              <span className="text-gray-500">${blogData.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              ${safeTitle}
            </h1>
            
            <div className="flex items-center text-gray-600">
              <span>Published on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>

          {/* CTA After Intro */}
          <BlogCTA position="after-intro" />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: \`${safeContent}\` }} />

          {/* CTA Mid Content */}
          <BlogCTA position="mid-content" />

          {/* CTA End */}
          <BlogCTA position="end" />

          {/* Author Section */}
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                RS
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">Raghav Shah</h3>
                <p className="text-gray-600 mb-4">
                  Founder of RAGSPRO. Building startups in 20 days. Helping founders launch MVPs faster with AI automation and modern development practices.
                </p>
                <div className="flex gap-4">
                  <a href="https://github.com/ragspro" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/raghavshah" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                    LinkedIn
                  </a>
                  <a href="https://twitter.com/ragspro" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-black mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="/blog/mvp-development-process" className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-black mb-2">Our 20-Day MVP Launch Process</h3>
                <p className="text-gray-600 text-sm">Behind the scenes look at how RAGSPRO delivers complete MVPs in just 20 days.</p>
              </a>
              <a href="/blog/mvp-cost-india" className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-black mb-2">MVP Development Cost in India</h3>
                <p className="text-gray-600 text-sm">Complete breakdown of MVP development costs with transparent pricing.</p>
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
`
}

// Update blog listing page
async function updateBlogListing(blogData, slug, date) {
  const blogListPath = path.join(process.cwd(), 'src', 'pages', 'blog.js')
  let content = fs.readFileSync(blogListPath, 'utf8')
  
  // Create new blog post entry
  const newPost = `  {
    id: ${Date.now()},
    title: "${blogData.title}",
    excerpt: "${blogData.excerpt}",
    date: "${date.toISOString().split('T')[0]}",
    slug: "${slug}",
    category: "${blogData.category}",
    readTime: "${blogData.readTime}"
  },`
  
  // Insert at the beginning of blogPosts array
  content = content.replace(
    /const blogPosts = \[/,
    `const blogPosts = [\n${newPost}`
  )
  
  fs.writeFileSync(blogListPath, content, 'utf8')
}

// Convert slug to PascalCase for component name
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}
