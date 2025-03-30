import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { db } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tenant = await db.tenants.findById(Number.parseInt(params.id))

    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }

    // Check if user has access to this tenant
    if (tenant.ownerId !== Number.parseInt(session.user.id)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    return NextResponse.json({ tenant })
  } catch (error) {
    console.error("Error fetching tenant:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tenant = await db.tenants.findById(Number.parseInt(params.id))

    if (!tenant) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }

    // Check if user has access to this tenant
    if (tenant.ownerId !== Number.parseInt(session.user.id)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const { name } = await req.json()

    // Update tenant
    const updatedTenant = await db.tenants.update(Number.parseInt(params.id), {
      name,
    })

    return NextResponse.json({ tenant: updatedTenant })
  } catch (error) {
    console.error("Error updating tenant:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

