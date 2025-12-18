// Environment Variable Validator
// Validates all required environment variables and provides clear error messages

const ENV_VARS = {
  // Critical (required for core functionality)
  critical: {
    NEXT_PUBLIC_SITE_URL: {
      required: true,
      description: 'Public site URL',
      example: 'https://ragspro.com'
    }
  },
  
  // Database (required for dashboard and tracking)
  database: {
    NEXT_PUBLIC_SUPABASE_URL: {
      required: false,
      description: 'Supabase project URL',
      example: 'https://xxx.supabase.co'
    },
    SUPABASE_SERVICE_KEY: {
      required: false,
      description: 'Supabase service role key',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  },
  
  // AI Features (required for blog generation)
  ai: {
    GEMINI_API_KEY: {
      required: false,
      description: 'Google Gemini API key',
      example: 'AIzaSy...'
    }
  },
  
  // Email (required for notifications)
  email: {
    RESEND_API_KEY: {
      required: false,
      description: 'Resend API key for emails',
      example: 're_...'
    }
  },
  
  // Admin (required for admin access)
  admin: {
    ADMIN_SECRET: {
      required: false,
      description: 'Admin authentication secret',
      example: 'random_32_char_string'
    }
  },
  
  // Automation (optional)
  automation: {
    ENABLE_AUTO_BLOG: {
      required: false,
      description: 'Enable automatic blog generation',
      example: 'true'
    },
    CRON_SECRET: {
      required: false,
      description: 'Cron job authentication secret',
      example: 'random_string'
    }
  }
}

export function validateEnv() {
  const results = {
    valid: true,
    errors: [],
    warnings: [],
    missing: [],
    configured: []
  }
  
  // Check all environment variables
  Object.entries(ENV_VARS).forEach(([category, vars]) => {
    Object.entries(vars).forEach(([key, config]) => {
      const value = process.env[key]
      
      if (!value) {
        if (config.required) {
          results.valid = false
          results.errors.push({
            key,
            category,
            message: `Missing required environment variable: ${key}`,
            description: config.description,
            example: config.example
          })
        } else {
          results.warnings.push({
            key,
            category,
            message: `Optional environment variable not set: ${key}`,
            description: config.description,
            example: config.example
          })
        }
        results.missing.push(key)
      } else {
        results.configured.push(key)
      }
    })
  })
  
  return results
}

export function getEnvStatus() {
  const validation = validateEnv()
  
  return {
    isValid: validation.valid,
    totalVars: Object.values(ENV_VARS).reduce((sum, cat) => sum + Object.keys(cat).length, 0),
    configured: validation.configured.length,
    missing: validation.missing.length,
    errors: validation.errors.length,
    warnings: validation.warnings.length,
    details: validation
  }
}

export function logEnvStatus() {
  const status = getEnvStatus()
  
  console.log('\n=== Environment Variables Status ===')
  console.log(`Total: ${status.totalVars}`)
  console.log(`Configured: ${status.configured}`)
  console.log(`Missing: ${status.missing}`)
  console.log(`Errors: ${status.errors}`)
  console.log(`Warnings: ${status.warnings}`)
  
  if (status.errors > 0) {
    console.log('\n❌ ERRORS:')
    status.details.errors.forEach(err => {
      console.log(`  - ${err.key}: ${err.message}`)
      console.log(`    ${err.description}`)
      console.log(`    Example: ${err.example}`)
    })
  }
  
  if (status.warnings > 0) {
    console.log('\n⚠️  WARNINGS:')
    status.details.warnings.forEach(warn => {
      console.log(`  - ${warn.key}: ${warn.message}`)
    })
  }
  
  console.log('\n===================================\n')
  
  return status
}

// Check specific feature availability
export function isFeatureAvailable(feature) {
  switch (feature) {
    case 'database':
      return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY)
    case 'ai':
      return !!process.env.GEMINI_API_KEY
    case 'email':
      return !!process.env.RESEND_API_KEY
    case 'admin':
      return !!process.env.ADMIN_SECRET
    case 'automation':
      return process.env.ENABLE_AUTO_BLOG === 'true'
    default:
      return false
  }
}

export default {
  validateEnv,
  getEnvStatus,
  logEnvStatus,
  isFeatureAvailable
}
