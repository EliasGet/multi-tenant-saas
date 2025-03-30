import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { db } from "@/lib/db"
import { getStripeProducts } from "@/lib/stripe"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get Stripe products
    const products = await getStripeProducts()

    // Format plans
    const plans = products.map((product) => {
      const price = product.default_price as any

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price.unit_amount / 100,
        interval: price.recurring.interval,
        features: product.metadata.features ? JSON.parse(product.metadata.features) : [],
        priceId: price.id,
      }
    })

    // Get current subscription
    const tenantId = req.nextUrl.searchParams.get("tenantId")
    let currentPlan = null

    if (tenantId) {
      // Check if user has access to this tenant
      const userTenant = await db.tenants.findById(Number.parseInt(tenantId))

      if (userTenant && userTenant.ownerId === Number.parseInt(session.user.id)) {
        // Get subscription for this tenant
        const subscription = await db.subscriptions.findByTenantId(Number.parseInt(tenantId))

        if (subscription && subscription.status === "active") {
          // Find product ID from plan name
          const planProduct = products.find((product) => product.name.toLowerCase() === subscription.plan.toLowerCase())

          if (planProduct) {
            currentPlan = planProduct.id
          }
        }
      }
    }

    return NextResponse.json({ plans, currentPlan })
  } catch (error) {
    console.error("Error fetching plans:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

