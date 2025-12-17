// Cron job endpoint for daily blog generation
// This can be triggered by Vercel Cron or external cron service

export default async function handler(req, res) {
  // Verify cron secret for security
  const cronSecret = req.headers['x-cron-secret']
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // Check if auto-generation is enabled
    if (process.env.ENABLE_AUTO_BLOG !== 'true') {
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
      return res.status(200).json({
        success: true,
        message: 'Daily blog generated successfully',
        blog: result
      })
    } else {
      throw new Error(result.error || 'Blog generation failed')
    }

  } catch (error) {
    console.error('Cron job error:', error)
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
