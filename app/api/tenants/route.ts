import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userTenants = await db.tenants.findByOwnerId(Number.parseInt(session.user.id))

    return NextResponse.json({ tenants: userTenants })
  } catch (error) {
    console.error("Error fetching tenants:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, subdomain } = await req.json()

    // Validate input
    if (!name || !subdomain) {
      return NextResponse.json({ error: "Name and subdomain are required" }, { status: 400 })
    }

    // Check if subdomain is available
    const existingTenant = await db.tenants.findBySubdomain(subdomain)

    if (existingTenant) {
      return NextResponse.json({ error: "Subdomain is already taken" }, { status: 400 })
    }

    // Create new tenant
    const newTenant = await db.tenants.create({
      name,
      subdomain,
      ownerId: Number.parseInt(session.user.id),
      plan: "starter",
    })

    return NextResponse.json({ tenant: newTenant }, { status: 201 })
  } catch (error) {
    console.error("Error creating tenant:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

