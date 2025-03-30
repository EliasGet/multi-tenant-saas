import { mockStripe } from "./mock-stripe"

// Sample Stripe keys - in a real app, these would be environment variables
const SAMPLE_STRIPE_SECRET_KEY = "sk_test_51NxSampleStripeTestKeyDoNotUseInProduction"
const SAMPLE_STRIPE_WEBHOOK_SECRET = "whsec_SampleStripeWebhookSecretKeyDoNotUseInProduction"

// Use mock Stripe for all environments in this sample project
export const stripe = mockStripe as any

export async function createStripeCustomer(name: string, email: string) {
  const customer = await stripe.customers.create({
    name,
    email,
  })

  return customer
}

export async function createStripeSubscription(customerId: string, priceId: string) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
  })

  return subscription
}

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  })

  return products.data
}

