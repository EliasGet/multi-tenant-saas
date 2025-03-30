import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, ExternalLink } from "lucide-react"

// Mock data for tenants
const tenants = [
  {
    id: "1",
    name: "Acme Inc",
    domain: "acme.example.com",
    plan: "Pro",
    status: "active",
    users: 24,
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Globex Corporation",
    domain: "globex.example.com",
    plan: "Enterprise",
    status: "active",
    users: 87,
    createdAt: "2023-02-22",
  },
  {
    id: "3",
    name: "Initech",
    domain: "initech.example.com",
    plan: "Starter",
    status: "active",
    users: 12,
    createdAt: "2023-03-10",
  },
  {
    id: "4",
    name: "Umbrella Corp",
    domain: "umbrella.example.com",
    plan: "Pro",
    status: "active",
    users: 35,
    createdAt: "2023-04-05",
  },
  {
    id: "5",
    name: "Stark Industries",
    domain: "stark.example.com",
    plan: "Enterprise",
    status: "active",
    users: 142,
    createdAt: "2023-05-18",
  },
]

export default function TenantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenants</h1>
          <p className="text-muted-foreground">Manage your multi-tenant environments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Tenant
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <CardDescription>A list of all tenants in your SaaS platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.domain}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tenant.plan === "Enterprise" ? "default" : tenant.plan === "Pro" ? "outline" : "secondary"
                      }
                    >
                      {tenant.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" className="bg-green-500">
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{tenant.users}</TableCell>
                  <TableCell>{tenant.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/tenants/${tenant.id}`} className="flex w-full items-center">
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`https://${tenant.domain}`} className="flex w-full items-center" target="_blank">
                            Visit site <ExternalLink className="ml-2 h-3 w-3" />
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit settings</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Suspend tenant</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

