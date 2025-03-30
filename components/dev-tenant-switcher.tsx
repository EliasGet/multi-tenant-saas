"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTenants } from "@/lib/db"

// Sample root domain - in a real app, this would be an environment variable
const SAMPLE_ROOT_DOMAIN = "localhost:3000"

export function DevTenantSwitcher() {
  const router = useRouter()
  const [customTenant, setCustomTenant] = useState("")

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 opacity-80 hover:opacity-100 transition-opacity">
      <CardHeader className="p-4">
        <CardTitle className="text-sm">Development Tenant Switcher</CardTitle>
        <CardDescription className="text-xs">For sample project only</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="custom-tenant" className="text-xs">
            Custom Tenant
          </Label>
          <div className="flex gap-2">
            <Input
              id="custom-tenant"
              value={customTenant}
              onChange={(e) => setCustomTenant(e.target.value)}
              placeholder="tenant-name"
              className="h-8 text-sm"
            />
            <Button
              size="sm"
              className="h-8"
              onClick={() => {
                if (customTenant) {
                  router.push(`/dev-tenant/${customTenant}`)
                }
              }}
            >
              Go
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Sample Tenants</Label>
          <div className="grid grid-cols-2 gap-2">
            {mockTenants.map((tenant) => (
              <Button
                key={tenant.id}
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => router.push(`/dev-tenant/${tenant.subdomain}`)}
              >
                {tenant.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

