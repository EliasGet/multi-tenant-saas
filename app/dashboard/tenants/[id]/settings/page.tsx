"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Globe, Server } from "lucide-react"
import Link from "next/link"

interface TenantSettings {
  id: number
  name: string
  subdomain: string
  customDomain: string | null
}

export default function TenantSettingsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [settings, setSettings] = useState<TenantSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [customDomain, setCustomDomain] = useState("")

  useEffect(() => {
    const fetchTenantSettings = async () => {
      try {
        const response = await fetch(`/api/tenants/${params.id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch tenant settings")
        }

        const data = await response.json()
        setSettings(data.tenant)
        setCustomDomain(data.tenant.customDomain || "")
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTenantSettings()
  }, [params.id])

  const handleSaveCustomDomain = async () => {
    setIsSaving(true)

    try {
      const response = await fetch(`/api/tenants/${params.id}/domain`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customDomain }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update custom domain")
      }

      const data = await response.json()
      setSettings(data.tenant)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/tenants"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to tenants
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tenant Settings</h1>
        <p className="text-muted-foreground">Configure settings for {settings?.name}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic information about this tenant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tenant Name</Label>
                <Input id="name" value={settings?.name} readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex items-center">
                  <Input id="subdomain" value={settings?.subdomain} readOnly className="rounded-r-none" />
                  <div className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-muted-foreground">
                    .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={18} />
                Custom Domain
              </CardTitle>
              <CardDescription>Configure a custom domain for this tenant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="app.yourdomain.com"
                />
                <p className="text-sm text-muted-foreground">
                  Enter a custom domain to use for this tenant (e.g., app.yourdomain.com)
                </p>
              </div>

              {settings?.customDomain && (
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Current Custom Domain</h4>
                  <p className="text-sm">{settings.customDomain}</p>
                </div>
              )}

              <div className="bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium mb-2">DNS Configuration</h4>
                <p className="text-sm mb-2">To use a custom domain, you need to configure your DNS settings:</p>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-medium">Type</div>
                    <div className="font-medium">Name</div>
                    <div className="font-medium">Value</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>CNAME</div>
                    <div>{customDomain || "app.yourdomain.com"}</div>
                    <div>cname.{process.env.NEXT_PUBLIC_ROOT_DOMAIN}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveCustomDomain} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Custom Domain"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server size={18} />
                Advanced Settings
              </CardTitle>
              <CardDescription>Advanced configuration options for this tenant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-destructive/10 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-destructive mb-2">Danger Zone</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    These actions are destructive and cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Tenant</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

