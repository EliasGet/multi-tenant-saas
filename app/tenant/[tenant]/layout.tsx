import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// This would typically come from a database
const getTenantData = (tenant: string) => {
  // Mock data for demonstration
  return {
    name: tenant.charAt(0).toUpperCase() + tenant.slice(1),
    logo: "/images/logo.jpg",
    primaryColor: "#4f46e5",
  }
}

export default function TenantLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { tenant: string }
}) {
  const tenant = params.tenant
  const tenantData = getTenantData(tenant)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-36">
              <Image
                src={tenantData.logo || "/placeholder.svg"}
                alt={tenantData.name}
                width={140}
                height={40}
                className="h-auto"
              />
            </div>
            <span className="text-lg font-semibold">{tenantData.name} Portal</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href={`/tenant/${tenant}`} className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href={`/tenant/${tenant}/dashboard`} className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href={`/tenant/${tenant}/settings`} className="text-sm font-medium hover:text-primary">
              Settings
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/app/dashboard">
              <Button variant="outline">Admin Portal</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-36 mb-4 md:mb-0">
              <Image
                src={tenantData.logo || "/placeholder.svg"}
                alt={tenantData.name}
                width={140}
                height={40}
                className="h-auto"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {tenantData.name}. Powered by Elias Getachew.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

