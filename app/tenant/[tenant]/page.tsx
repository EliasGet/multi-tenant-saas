import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart3, Settings, Users } from "lucide-react"

// This would typically come from a database
const getTenantData = (tenant: string) => {
  // Mock data for demonstration
  return {
    name: tenant.charAt(0).toUpperCase() + tenant.slice(1),
    description: "Welcome to your tenant portal",
  }
}

export default function TenantPage({ params }: { params: { tenant: string } }) {
  const tenant = params.tenant
  const tenantData = getTenantData(tenant)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to {tenantData.name} Portal</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{tenantData.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View your usage analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/tenant/${tenant}/analytics`}>
                <Button variant="outline" className="w-full justify-between">
                  View Analytics
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your team and user permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/tenant/${tenant}/users`}>
                <Button variant="outline" className="w-full justify-between">
                  Manage Users
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your tenant settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/tenant/${tenant}/settings`}>
                <Button variant="outline" className="w-full justify-between">
                  Configure Settings
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

