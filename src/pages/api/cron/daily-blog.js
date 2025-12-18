// Cron job endpoint for daily blog generation
// This can be triggered by Vercel Cron or external cron service
import { logSystemEvent } from '../../../utils/supabase'

export default async function handler(req, res) {
  const startTime = Date.now()
  
  // Log cron start
  await logSystemEvent('cron', 'info', 'Daily blog cron started', {
    timestamp: new Date().toISOString(),
    headers: req.headers
  })
  
  // Verify cron authentication
  // Vercel Cron sends authorization header, external cron can use x-cron-secret
  const authHeader = req.headers.authorization
  const cronSecret = req.headers['x-cron-secret']
  
  // Allow Vercel Cron (has authorization header) or valid cron secret
  const isVercelCron = authHeader && authHeader.startsWith('Bearer ')
  const isValidSecret = cronSecret === process.env.CRON_SECRET
  
  if (!isVercelCron && !isValidSecret && process.env.CRON_SECRET) {
    await logSystemEvent('cron', 'failed', 'Cron authentication failed', {
      reason: 'Invalid authentication',
      hasAuth: !!authHeader,
      hasSecret: !!cronSecret
    })
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Check if auto-generation is enabled
    if (process.env.ENABLE_AUTO_BLOG !== 'true') {
      await logSystemEvent('cron', 'info', 'Auto blog generation disabled', {
        skipped: true
      })
      return res.status(200).json({ 
        message: 'Auto blog generation is disabled',
        skipped: true
      })
    }

    // Trending topics for Indian startup ecosystem
    const trendingTopics = [
      {
        topic: 'AI automation tools for Indian startups in 2025',
        keywords: 'AI automation, startup tools, Indian startups, automation software'
      },
      {
        topic: 'How to validate your SaaS idea before building MVP',
        keywords: 'SaaS validation, MVP development, idea validation, startup validation'
      },
      {
        topic: 'Best tech stack for building SaaS products in India',
        keywords: 'SaaS tech stack, web development, startup technology, India'
      },
      {
        topic: 'Complete guide to raising seed funding in India 2025',
        keywords: 'seed funding, startup funding, venture capital, India'
      },
      {
        topic: 'Mobile app vs web app: What should startups build first',
        keywords: 'mobile app, web app, MVP, startup development'
      },
      {
        topic: 'How to hire developers for your startup in India',
        keywords: 'hire developers, startup hiring, tech talent, India'
      },
      {
        topic: 'ChatGPT integration guide for SaaS products',
        keywords: 'ChatGPT, AI integration, SaaS, OpenAI API'
      },
      {
        topic: 'Building a marketplace platform: Complete technical guide',
        keywords: 'marketplace, platform development, two-sided marketplace, startup'
      },
      {
        topic: 'SaaS pricing strategies for Indian market',
        keywords: 'SaaS pricing, pricing strategy, Indian market, subscription'
      },
      {
        topic: 'No-code vs custom development: What founders should choose',
        keywords: 'no-code, custom development, MVP, startup development'
      }
    ]

    // Pick a random topic
    const randomTopic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)]

    // Generate blog post
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/generate-blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: randomTopic.topic,
        keywords: randomTopic.keywords,
        manual: false
      })
    })

    const result = await response.json()

    if (result.success) {
      const executionTime = Date.now() - startTime
      
      await logSystemEvent('cron', 'success', 'Daily blog generated successfully', {
        slug: result.slug,
        title: result.title,
        executionTime,
        topic: randomTopic.topic
      })
      
      return res.status(200).json({
        success: true,
        message: 'Daily blog generated successfully',
        blog: result,
        executionTime
      })
    } else {
      throw new Error(result.error || 'Blog generation failed')
    }

  } catch (error) {
    console.error('Cron job error:', error)
    
    const executionTime = Date.now() - startTime
    
    await logSystemEvent('cron', 'failed', `Daily blog cron failed: ${error.message}`, {
      error: error.toString(),
      stack: error.stack,
      executionTime
    })
    
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
