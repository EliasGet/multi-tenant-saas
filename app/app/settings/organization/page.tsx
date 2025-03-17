"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function OrganizationSettings() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Manage your organization details and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="logo">Organization Logo</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Organization" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input id="name" defaultValue="Acme Inc." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex items-center">
                <span className="bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-gray-300 text-gray-500">
                  yourdomain.com/
                </span>
                <Input id="slug" defaultValue="acme" className="rounded-l-none" />
              </div>
              <p className="text-xs text-gray-500">This will be used for your organization's URL</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="min-h-[100px] w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your organization"
                defaultValue="Leading provider of innovative solutions for businesses."
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>Configure a custom domain for your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input id="domain" placeholder="app.yourdomain.com" />
              <p className="text-xs text-gray-500">Enter the domain you want to use for your organization</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Add Domain</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Delete Organization</h3>
            <p className="text-sm text-gray-500">
              Once you delete your organization, there is no going back. Please be certain.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="destructive">Delete Organization</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

