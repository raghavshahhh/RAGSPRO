// Test endpoint to check available Gemini models
import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler(req, res) {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' })
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  
  // Test different model names (updated for 2024/2025)
  const modelsToTest = [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash',
    'gemini-2.0-flash-001',
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
  ]
  
  const results = {}
  
  for (const modelName of modelsToTest) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent('Say "test"')
      const response = await result.response
      results[modelName] = {
        status: 'success',
        response: response.text()
      }
    } catch (error) {
      results[modelName] = {
        status: 'error',
        error: error.message
      }
    }
  }
  
  return res.status(200).json({
    message: 'Model test complete',
    results,
    recommendation: Object.keys(results).find(key => results[key].status === 'success')
  })
}
