// Error Monitoring System - Lightweight Sentry-like implementation
// Can be replaced with actual Sentry SDK if needed

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

// Error levels
export const ErrorLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  FATAL: 'fatal'
}

// Initialize error monitoring
export function initErrorMonitoring() {
  if (typeof window === 'undefined') return

  // Global error handler
  window.onerror = (message, source, lineno, colno, error) => {
    captureException(error || new Error(message), {
      source,
      lineno,
      colno
    })
    return false
  }

  // Unhandled promise rejection handler
  window.onunhandledrejection = (event) => {
    captureException(event.reason, {
      type: 'unhandledrejection'
    })
  }

  console.log('Error monitoring initialized')
}

// Capture exception
export async function captureException(error, context = {}) {
  const errorData = {
    message: error?.message || String(error),
    stack: error?.stack,
    name: error?.name,
    level: ErrorLevel.ERROR,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    context
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Captured Exception:', errorData)
  }

  // Send to backend
  try {
    await fetch('/api/errors/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    })
  } catch (e) {
    console.error('Failed to send error to backend:', e)
  }

  // Send to Sentry if configured
  if (SENTRY_DSN && typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureException(error, { extra: context })
  }

  return errorData
}

// Capture message (for non-error events)
export async function captureMessage(message, level = ErrorLevel.INFO, context = {}) {
  const messageData = {
    message,
    level,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    context
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('Captured Message:', messageData)
  }

  try {
    await fetch('/api/errors/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    })
  } catch (e) {
    console.error('Failed to send message to backend:', e)
  }

  return messageData
}

// Set user context
export function setUser(user) {
  if (typeof window !== 'undefined') {
    window.__errorMonitoringUser = user
  }
}

// Add breadcrumb (for tracking user actions)
export function addBreadcrumb(breadcrumb) {
  if (typeof window !== 'undefined') {
    window.__errorMonitoringBreadcrumbs = window.__errorMonitoringBreadcrumbs || []
    window.__errorMonitoringBreadcrumbs.push({
      ...breadcrumb,
      timestamp: new Date().toISOString()
    })
    
    // Keep only last 50 breadcrumbs
    if (window.__errorMonitoringBreadcrumbs.length > 50) {
      window.__errorMonitoringBreadcrumbs.shift()
    }
  }
}

// Performance monitoring
export function measurePerformance(name, fn) {
  const start = performance.now()
  const result = fn()
  const duration = performance.now() - start

  captureMessage(`Performance: ${name}`, ErrorLevel.DEBUG, {
    duration: `${duration.toFixed(2)}ms`
  })

  return result
}

// API error wrapper
export function withErrorHandling(fn, context = {}) {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      await captureException(error, { ...context, args })
      throw error
    }
  }
}

// React Error Boundary helper
export function captureReactError(error, errorInfo) {
  captureException(error, {
    componentStack: errorInfo?.componentStack,
    type: 'react_error_boundary'
  })
}
