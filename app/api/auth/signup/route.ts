import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import { createUser } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, organizationName } = await req.json()

    // Check if user already exists
    const existingUser = await executeQuery("SELECT * FROM users WHERE email = $1", [email])

    if (existingUser.length > 0) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Create user
    const user = await createUser(name, email, password)

    // Create organization
    const [organization] = await executeQuery("INSERT INTO organizations (name, slug) VALUES ($1, $2) RETURNING *", [
      organizationName,
      organizationName.toLowerCase().replace(/\s+/g, "-"),
    ])

    // Add user as organization owner
    await executeQuery("INSERT INTO organization_members (organization_id, user_id, role) VALUES ($1, $2, $3)", [
      organization.id,
      user.id,
      "owner",
    ])

    // Create default domain for the organization
    await executeQuery(
      "INSERT INTO domains (domain, organization_id, verified, primary_domain) VALUES ($1, $2, $3, $4)",
      [`${organization.slug}.yourdomain.com`, organization.id, true, true],
    )

    // Create free subscription for the organization
    const [freePlan] = await executeQuery("SELECT * FROM subscription_plans WHERE name = $1", ["Free"])

    await executeQuery(
      `INSERT INTO subscriptions 
       (organization_id, plan_id, status, current_period_start, current_period_end) 
       VALUES ($1, $2, $3, $4, $5)`,
      [
        organization.id,
        freePlan.id,
        "active",
        new Date(),
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      ],
    )

    return NextResponse.json({ message: "User and organization created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "An error occurred during signup" }, { status: 500 })
  }
}

