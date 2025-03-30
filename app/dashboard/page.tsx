import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { ArrowUpRight, Users, Building, CreditCard, ArrowDownRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your multi-tenant SaaS platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> 12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> 8%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3" /> 18%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="h-3 w-3" /> 0.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={[
                    { name: "Jan", value: 4000 },
                    { name: "Feb", value: 6000 },
                    { name: "Mar", value: 5500 },
                    { name: "Apr", value: 7800 },
                    { name: "May", value: 8900 },
                    { name: "Jun", value: 9800 },
                    { name: "Jul", value: 11000 },
                    { name: "Aug", value: 10500 },
                    { name: "Sep", value: 12000 },
                    { name: "Oct", value: 12234 },
                    { name: "Nov", value: 0 },
                    { name: "Dec", value: 0 },
                  ]}
                  categories={["value"]}
                  colors={["primary"]}
                  yAxisWidth={60}
                  showLegend={false}
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Tenant Distribution</CardTitle>
                <CardDescription>Breakdown by subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "Starter", value: 10 },
                    { name: "Pro", value: 12 },
                    { name: "Enterprise", value: 2 },
                  ]}
                  categories={["value"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `${value} tenants`}
                  showLegend={false}
                  showYAxis={false}
                  showXAxis={true}
                  layout="vertical"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly user growth over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart
                data={[
                  { name: "Jan", value: 100 },
                  { name: "Feb", value: 150 },
                  { name: "Mar", value: 200 },
                  { name: "Apr", value: 280 },
                  { name: "May", value: 320 },
                  { name: "Jun", value: 390 },
                  { name: "Jul", value: 420 },
                  { name: "Aug", value: 490 },
                  { name: "Sep", value: 530 },
                  { name: "Oct", value: 573 },
                ]}
                categories={["value"]}
                colors={["primary"]}
                yAxisWidth={60}
                showLegend={false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>View and download detailed reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Report content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

