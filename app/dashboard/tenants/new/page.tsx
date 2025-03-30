"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewTenantPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [subdomain, setSubdomain] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to lowercase and remove special characters
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
    setSubdomain(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/tenants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, subdomain }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create tenant")
      }

      router.push("/dashboard/tenants")
      router.refresh()
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
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
        <h1 className="text-3xl font-bold tracking-tight">Create New Tenant</h1>
        <p className="text-muted-foreground">Set up a new tenant environment for your customer</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Tenant Details</CardTitle>
          <CardDescription>Enter the information for the new tenant</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="name">Tenant Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Acme Inc."
                required
              />
              <p className="text-sm text-muted-foreground">The name of the organization or customer</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomain</Label>
              <div className="flex items-center">
                <Input
                  id="subdomain"
                  value={subdomain}
                  onChange={handleSubdomainChange}
                  placeholder="acme"
                  className="rounded-r-none"
                  required
                />
                <div className="bg-muted px-3 py-2 border border-l-0 rounded-r-md text-muted-foreground">
                  .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                The subdomain must be unique and contain only lowercase letters, numbers, and hyphens
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Tenant"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

