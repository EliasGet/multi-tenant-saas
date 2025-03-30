import { type NextRequest, NextResponse } from "next/server"

// Sample root domain - in a real app, this would be an environment variable
const SAMPLE_ROOT_DOMAIN = "localhost:3000"

// This is a simplified middleware for multi-tenancy
// In a real app, you would have more complex logic for tenant resolution
export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get("host") || ""
  const path = url.pathname

  // Define your main app domain
  const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || SAMPLE_ROOT_DOMAIN

  // Check if this is a custom domain or a subdomain
  const currentHost = hostname.replace(`.${mainDomain}`, "")

  // Exclude API routes and static files
  if (path.startsWith("/_next") || path.startsWith("/api") || path.startsWith("/static") || path.includes(".")) {
    return NextResponse.next()
  }

  // For development, simulate subdomains with path-based routing
  if (path.startsWith("/dev-tenant/")) {
    // Extract the tenant from the path
    const tenantPath = path.split("/")
    if (tenantPath.length > 2) {
      const tenant = tenantPath[2]
      const newPath = `/tenant/${tenant}${path.replace(`/dev-tenant/${tenant}`, "")}`
      url.pathname = newPath
      return NextResponse.rewrite(url)
    }
  }

  // If this is the main domain, don't rewrite
  if (hostname === mainDomain || hostname.endsWith(`.${mainDomain}`)) {
    // If it's a subdomain like "app.domain.com"
    if (currentHost !== "www" && currentHost !== "app" && currentHost !== "") {
      // Rewrite to /tenant/[tenant]/path
      url.pathname = `/tenant/${currentHost}${path}`
      return NextResponse.rewrite(url)
    }

    // For app.domain.com, serve the dashboard
    if (currentHost === "app") {
      // If not logged in, redirect to login
      // This is a simplified check - in a real app, you'd verify auth status
      const isLoggedIn = request.cookies.has("auth")

      if (!isLoggedIn && !path.startsWith("/login") && !path.startsWith("/signup")) {
        return NextResponse.redirect(new URL("/login", request.url))
      }

      // If already on login/signup page and logged in, redirect to dashboard
      if (isLoggedIn && (path.startsWith("/login") || path.startsWith("/signup"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  } else {
    // This is a custom domain, rewrite to /tenant/[domain]/path
    url.pathname = `/tenant/custom-domain/${hostname}${path}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

