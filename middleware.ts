import { type NextRequest, NextResponse } from "next/server"

// Custom middleware to handle multi-tenant routing
// Handles subdomain routing and tenant isolation
// Author: Your Name

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get("host") || "localhost:3000"

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname

  // Special case for localhost for development
  const isLocalhost = hostname.includes("localhost:")

  // If it's localhost, we can check for a custom header or query param to simulate different tenants
  if (isLocalhost) {
    // For development, we'll use a query param to simulate different tenants
    const tenant = url.searchParams.get("tenant")
    if (tenant) {
      // Store the tenant in a cookie for subsequent requests
      const response = NextResponse.next()
      response.cookies.set("tenant", tenant)
      return response
    }

    // If no tenant is specified, use the one from the cookie if available
    const tenantCookie = req.cookies.get("tenant")?.value
    if (tenantCookie && !path.startsWith("/app")) {
      // Rewrite to the tenant's dashboard
      url.pathname = `/app/dashboard`
      return NextResponse.rewrite(url)
    }

    // If no tenant cookie and not accessing the app directly, redirect to the marketing site
    if (!path.startsWith("/app") && !path.startsWith("/auth")) {
      return NextResponse.next()
    }

    return NextResponse.next()
  }

  // Production environment routing logic
  // Maps subdomains to tenant spaces

  // For production with real subdomains
  const currentHost = hostname.replace(`.yourdomain.com`, "")

  // If it's the root domain, show the marketing site
  if (hostname === "yourdomain.com" || hostname === "www.yourdomain.com") {
    return NextResponse.next()
  }

  // If it's a subdomain, rewrite to the appropriate tenant path
  if (currentHost !== "app") {
    // Rewrite to the tenant's dashboard
    url.pathname = `/app/${currentHost}${path}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

