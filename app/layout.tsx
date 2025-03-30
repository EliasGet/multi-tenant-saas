import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DevTenantSwitcher } from "@/components/dev-tenant-switcher"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Elias Getachew | Multi-Tenant SaaS Platform",
  description: "A modern, fully functional multi-tenant SaaS web application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <DevTenantSwitcher />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'