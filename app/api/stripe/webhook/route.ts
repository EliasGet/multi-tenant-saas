import { type NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"

// Sample webhook secret - in a real app, this would be an environment variable
const SAMPLE_WEBHOOK_SECRET = "whsec_SampleStripeWebhookSecretKeyDoNotUseInProduction"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    // For the sample project, we're using mock Stripe which doesn't validate signatures
    // In a real app, this would verify the webhook signature
    event = stripe.webhooks.constructEvent(body, signature, SAMPLE_WEBHOOK_SECRET)
  } catch (error) {
    console.error(`Webhook signature verification failed: ${error.message}`)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription

        // Find the subscription in our mock database
        const existingSubscription = await db.subscriptions.findByTenantId(
          Number.parseInt(event.data.object.metadata?.tenantId || "0"),
        )

        if (existingSubscription) {
          await db.subscriptions.update(existingSubscription.id, {
            status: subscription.status,
            plan: subscription.items.data[0].price.lookup_key || "unknown",
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            updatedAt: new Date(),
          })
        }

        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription

        // Find the subscription in our mock database
        const canceledSubscription = await db.subscriptions.findByTenantId(
          Number.parseInt(event.data.object.metadata?.tenantId || "0"),
        )

        if (canceledSubscription) {
          await db.subscriptions.update(canceledSubscription.id, {
            status: "canceled",
            updatedAt: new Date(),
          })
        }

        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(`Webhook handler failed: ${error.message}`)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

