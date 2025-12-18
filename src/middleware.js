import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  
  // Track page view (async, non-blocking)
  if (!request.nextUrl.pathname.startsWith('/api') && 
      !request.nextUrl.pathname.startsWith('/_next') &&
      !request.nextUrl.pathname.includes('.')) {
    
    // Get tracking data
    const trackingData = {
      path: request.nextUrl.pathname,
      referrer: request.headers.get('referer') || 'direct',
      userAgent: request.headers.get('user-agent') || 'unknown',
      timestamp: new Date().toISOString()
    }
    
    // Set cookie to track in client-side
    response.cookies.set('_track', JSON.stringify(trackingData), {
      httpOnly: false,
      maxAge: 60 // 1 minute
    })
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}
