import { requireAdminAuth } from '../../../utils/adminAuth'
import { getEnvStatus, isFeatureAvailable } from '../../../utils/envValidator'
import { isSupabaseConfigured } from '../../../utils/supabase'

async function handler(req, res) {
  try {
    const envStatus = getEnvStatus()
    
    const status = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      features: {
        database: {
          available: isFeatureAvailable('database'),
          configured: isSupabaseConfigured(),
          status: isSupabaseConfigured() ? 'connected' : 'not configured'
        },
        ai: {
          available: isFeatureAvailable('ai'),
          status: isFeatureAvailable('ai') ? 'ready' : 'not configured'
        },
        email: {
          available: isFeatureAvailable('email'),
          status: isFeatureAvailable('email') ? 'ready' : 'not configured'
        },
        admin: {
          available: isFeatureAvailable('admin'),
          status: isFeatureAvailable('admin') ? 'protected' : 'not configured'
        },
        automation: {
          available: isFeatureAvailable('automation'),
          status: isFeatureAvailable('automation') ? 'enabled' : 'disabled'
        }
      },
      environmentVariables: {
        total: envStatus.totalVars,
        configured: envStatus.configured,
        missing: envStatus.missing,
        errors: envStatus.errors,
        warnings: envStatus.warnings
      },
      health: {
        overall: envStatus.errors === 0 ? 'healthy' : 'degraded',
        issues: envStatus.details.errors.map(e => e.message)
      }
    }
    
    return res.status(200).json(status)
  } catch (error) {
    console.error('System status error:', error)
    return res.status(500).json({
      error: 'Failed to get system status',
      details: error.message
    })
  }
}

export default requireAdminAuth(handler)
