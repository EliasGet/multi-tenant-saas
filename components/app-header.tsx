"use client"

// Main application header with responsive design
// Implements mobile-first approach with hamburger menu
// Last updated: March 2023

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Bell, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center md:justify-start">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search..." className="w-full bg-gray-100 pl-8 focus:bg-white" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell size={20} />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/app/settings/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/app/settings/organization">Organization</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/app/settings/billing">Billing</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/logout">Log out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden border-b border-gray-200 pb-4 px-4">
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Search..." className="w-full bg-gray-100 pl-8 focus:bg-white" />
          </div>
          <nav className="mt-4 flex flex-col space-y-2">
            <Link
              href="/app/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/app/dashboard"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/app/analytics"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/app/analytics"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Analytics
            </Link>
            <Link
              href="/app/users"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/app/users"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Users
            </Link>
            <Link
              href="/app/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith("/app/settings")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

