import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { db, users, tenants, subscriptions } from "@/lib/db"
import { eq } from "drizzle-orm"
import { stripe, createStripeCustomer } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { priceId, tenantId } = await req.json()

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 })
    }

    // Get user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number.parseInt(session.user.id)))
      .limit(1)

    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get or create tenant
    let tenant

    if (tenantId) {
      // Check if user has access to this tenant
      const userTenant = await db
        .select()
        .from(tenants)
        .where(eq(tenants.id, Number.parseInt(tenantId)))
        .limit(1)

      if (!userTenant.length || userTenant[0].ownerId !== Number.parseInt(session.user.id)) {
        return NextResponse.json({ error: "Tenant not found or access denied" }, { status: 404 })
      }

      tenant = userTenant[0]
    } else {
      // Get first tenant for user
      const userTenants = await db
        .select()
        .from(tenants)
        .where(eq(tenants.ownerId, Number.parseInt(session.user.id)))
        .limit(1)

      if (!userTenants.length) {
        return NextResponse.json({ error: "No tenant found for user" }, { status: 404 })
      }

      tenant = userTenants[0]
    }

    // Get or create Stripe customer
    let stripeCustomerId

    // Check if tenant already has a subscription
    const existingSubscription = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.tenantId, tenant.id))
      .limit(1)

    if (existingSubscription.length && existingSubscription[0].stripeCustomerId) {
      stripeCustomerId = existingSubscription[0].stripeCustomerId
    } else {
      // Create new Stripe customer
      const customer = await createStripeCustomer(user[0].name, user[0].email)
      stripeCustomerId = customer.id

      // Create subscription record
      await db.insert(subscriptions).values({
        tenantId: tenant.id,
        stripeCustomerId,
        plan: "pending",
        status: "incomplete",
      })
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/dashboard/billing?success=true`,
      cancel_url: `${req.headers.get("origin")}/dashboard/billing?canceled=true`,
      metadata: {
        tenantId: tenant.id.toString(),
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

