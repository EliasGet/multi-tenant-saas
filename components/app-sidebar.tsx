"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BarChart, Home, Settings, Users } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/app/dashboard", icon: Home },
    { name: "Analytics", href: "/app/analytics", icon: BarChart },
    { name: "Users", href: "/app/users", icon: Users },
    { name: "Settings", href: "/app/settings", icon: Settings },
  ]

  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r md:border-gray-200">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/app/dashboard">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo.jpg-qzbplrqXTEu8DFaMX5BoHsuhZ90dUC.jpeg"
              alt="Elias Getchew"
              width={150}
              height={50}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div>
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Acme Inc.</p>
            <Link href="/app/settings/organization" className="text-xs font-medium text-gray-500 hover:text-gray-700">
              View organization
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

