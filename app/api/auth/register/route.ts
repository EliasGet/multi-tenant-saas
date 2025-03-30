import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs" // Changed from bcrypt to bcryptjs
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, companyName } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email)

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const newUser = await db.users.create({
      name,
      email,
      password: hashedPassword,
    })

    // If company name is provided, create a tenant for the user
    if (companyName) {
      // Generate a subdomain from company name
      const subdomain = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 20)

      // Check if subdomain is available
      const existingTenant = await db.tenants.findBySubdomain(subdomain)

      if (!existingTenant) {
        // Create tenant
        await db.tenants.create({
          name: companyName,
          subdomain,
          ownerId: newUser.id,
          plan: "starter",
        })
      }
    }

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

