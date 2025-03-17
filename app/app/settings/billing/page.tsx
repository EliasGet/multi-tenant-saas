"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Check } from "lucide-react"

export default function BillingSettings() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </div>
            <Badge>Pro Plan</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">$29.99</span>/month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>50 team members</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>100 projects</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>100GB storage</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled>
                    Current Plan
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">$9.99</span>/month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>10 team members</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>20 projects</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>10GB storage</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Downgrade
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">$99.99</span>/month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Unlimited team members</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Unlimited projects</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>1TB storage</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Upgrade</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500">
                Your subscription renews on <span className="font-medium">April 15, 2023</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cards">
            <TabsList className="mb-4">
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="bank">Bank Account</TabsTrigger>
            </TabsList>

            <TabsContent value="cards">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6 text-gray-500" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 04/2024</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>

                <Button variant="outline">Add New Card</Button>
              </div>
            </TabsContent>

            <TabsContent value="bank">
              <div className="flex items-center justify-center p-8 border rounded-md">
                <p className="text-gray-500">No bank accounts added yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and download receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <p className="font-medium">Invoice #12345</p>
                <p className="text-sm text-gray-500">March 1, 2023</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">$29.99</Badge>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <p className="font-medium">Invoice #12344</p>
                <p className="text-sm text-gray-500">February 1, 2023</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">$29.99</Badge>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <p className="font-medium">Invoice #12343</p>
                <p className="text-sm text-gray-500">January 1, 2023</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">$29.99</Badge>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

