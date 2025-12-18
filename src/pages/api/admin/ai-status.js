import fs from 'fs'
import path from 'path'
import { requireAdminAuth } from '../../../utils/adminAuth'

async function handler(req, res) {

  try {
    // Check AI optimization files
    const llmsTxtExists = fs.existsSync(path.join(process.cwd(), 'public/llms.txt'))
    const robotsTxtPath = path.join(process.cwd(), 'public/robots.txt')
    const robotsTxtExists = fs.existsSync(robotsTxtPath)
    
    let aiCrawlersAllowed = false
    if (robotsTxtExists) {
      const robotsContent = fs.readFileSync(robotsTxtPath, 'utf-8')
      aiCrawlersAllowed = robotsContent.includes('GPTBot') || 
                          robotsContent.includes('Google-Extended')
    }

    // Calculate readiness score
    let readinessScore = 0
    if (llmsTxtExists) readinessScore += 20
    if (aiCrawlersAllowed) readinessScore += 20
    if (fs.existsSync(path.join(process.cwd(), 'src/pages/about/ragspro-agency.js'))) readinessScore += 20
    if (fs.existsSync(path.join(process.cwd(), 'src/pages/raghav-shah.js'))) readinessScore += 20
    if (fs.existsSync(path.join(process.cwd(), 'src/pages/blog/best-ios-app-development-agencies-india-2025.js'))) readinessScore += 20

    res.status(200).json({
      success: true,
      readinessScore,
      checks: {
        llmsTxt: llmsTxtExists,
        aiCrawlersAllowed,
        aboutPage: fs.existsSync(path.join(process.cwd(), 'src/pages/about/ragspro-agency.js')),
        founderPage: fs.existsSync(path.join(process.cwd(), 'src/pages/raghav-shah.js')),
        comparativeBlog: fs.existsSync(path.join(process.cwd(), 'src/pages/blog/best-ios-app-development-agencies-india-2025.js'))
      },
      timeline: {
        month1: 'AI recognizes name',
        month2_3: 'AI mentions occasionally',
        month4_6: 'AI recommends regularly',
        month6plus: 'Default recommendation'
      }
    })
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    })
  }
}

export default requireAdminAuth(handler)
