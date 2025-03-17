"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <Card>
          <CardContent className="p-4">
            <nav className="flex flex-col space-y-1">
              <SettingsNavLink href="/app/settings/profile">Profile</SettingsNavLink>
              <SettingsNavLink href="/app/settings/organization">Organization</SettingsNavLink>
              <SettingsNavLink href="/app/settings/team">Team Members</SettingsNavLink>
              <SettingsNavLink href="/app/settings/billing">Billing</SettingsNavLink>
              <SettingsNavLink href="/app/settings/integrations">Integrations</SettingsNavLink>
              <SettingsNavLink href="/app/settings/api">API</SettingsNavLink>
            </nav>
          </CardContent>
        </Card>

        <div>{children}</div>
      </div>
    </div>
  )
}

function SettingsNavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  )
}

