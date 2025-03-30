import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Detailed analytics and insights for your multi-tenant platform</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Platform Growth</CardTitle>
                <CardDescription>Tenant and user growth over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { name: "Jan", tenants: 5, users: 120 },
                    { name: "Feb", tenants: 8, users: 180 },
                    { name: "Mar", tenants: 12, users: 240 },
                    { name: "Apr", tenants: 15, users: 320 },
                    { name: "May", tenants: 18, users: 390 },
                    { name: "Jun", tenants: 20, users: 450 },
                    { name: "Jul", tenants: 22, users: 510 },
                    { name: "Aug", tenants: 23, users: 540 },
                    { name: "Sep", tenants: 24, users: 573 },
                  ]}
                  categories={["tenants", "users"]}
                  colors={["primary", "secondary"]}
                  yAxisWidth={60}
                  showLegend={true}
                  valueFormatter={(value) => `${value}`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>Breakdown by plan type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Starter", value: 10 },
                    { name: "Pro", value: 12 },
                    { name: "Enterprise", value: 2 },
                  ]}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value} tenants`}
                  colors={["primary", "secondary", "accent"]}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue breakdown by month</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart
                data={[
                  { name: "Jan", revenue: 4000 },
                  { name: "Feb", revenue: 6000 },
                  { name: "Mar", revenue: 5500 },
                  { name: "Apr", revenue: 7800 },
                  { name: "May", revenue: 8900 },
                  { name: "Jun", revenue: 9800 },
                  { name: "Jul", revenue: 11000 },
                  { name: "Aug", revenue: 10500 },
                  { name: "Sep", revenue: 12000 },
                ]}
                categories={["revenue"]}
                colors={["primary"]}
                valueFormatter={(value) => `$${value}`}
                showLegend={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Activity</CardTitle>
              <CardDescription>Active tenants by day of week</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart
                data={[
                  { name: "Monday", active: 18 },
                  { name: "Tuesday", active: 22 },
                  { name: "Wednesday", active: 24 },
                  { name: "Thursday", active: 21 },
                  { name: "Friday", active: 19 },
                  { name: "Saturday", active: 12 },
                  { name: "Sunday", active: 10 },
                ]}
                categories={["active"]}
                colors={["primary"]}
                valueFormatter={(value) => `${value} tenants`}
                showLegend={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>New users per month</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart
                data={[
                  { name: "Jan", users: 50 },
                  { name: "Feb", users: 60 },
                  { name: "Mar", users: 70 },
                  { name: "Apr", users: 80 },
                  { name: "May", users: 90 },
                  { name: "Jun", users: 100 },
                  { name: "Jul", users: 110 },
                  { name: "Aug", users: 120 },
                  { name: "Sep", users: 130 },
                ]}
                categories={["users"]}
                colors={["primary"]}
                yAxisWidth={60}
                showLegend={false}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Plan</CardTitle>
              <CardDescription>Monthly revenue breakdown by subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart
                data={[
                  { name: "Jan", starter: 1000, pro: 2000, enterprise: 1000 },
                  { name: "Feb", starter: 1200, pro: 2800, enterprise: 2000 },
                  { name: "Mar", starter: 1300, pro: 3000, enterprise: 1200 },
                  { name: "Apr", starter: 1400, pro: 3500, enterprise: 2900 },
                  { name: "May", starter: 1500, pro: 4000, enterprise: 3400 },
                  { name: "Jun", starter: 1600, pro: 4500, enterprise: 3700 },
                  { name: "Jul", starter: 1700, pro: 5000, enterprise: 4300 },
                  { name: "Aug", starter: 1800, pro: 5200, enterprise: 3500 },
                  { name: "Sep", starter: 1900, pro: 5500, enterprise: 4600 },
                ]}
                categories={["starter", "pro", "enterprise"]}
                colors={["muted", "primary", "secondary"]}
                valueFormatter={(value) => `$${value}`}
                showLegend={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

