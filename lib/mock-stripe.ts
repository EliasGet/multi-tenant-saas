// Mock Stripe implementation for the sample project

export const mockStripeProducts = [
  {
    id: "prod_mock1",
    name: "Starter",
    description: "Perfect for small teams",
    default_price: {
      id: "price_mock1",
      unit_amount: 2900,
      recurring: {
        interval: "month",
      },
    },
    metadata: {
      features: JSON.stringify(["Up to 5 team members", "Basic analytics", "5GB storage"]),
    },
  },
  {
    id: "prod_mock2",
    name: "Pro",
    description: "For growing businesses",
    default_price: {
      id: "price_mock2",
      unit_amount: 7900,
      recurring: {
        interval: "month",
      },
    },
    metadata: {
      features: JSON.stringify(["Up to 20 team members", "Advanced analytics", "20GB storage", "Priority support"]),
    },
  },
  {
    id: "prod_mock3",
    name: "Enterprise",
    description: "For large organizations",
    default_price: {
      id: "price_mock3",
      unit_amount: 19900,
      recurring: {
        interval: "month",
      },
    },
    metadata: {
      features: JSON.stringify([
        "Unlimited team members",
        "Custom analytics",
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom integrations",
      ]),
    },
  },
]

export const mockStripe = {
  customers: {
    create: async ({ name, email }: { name: string; email: string }) => {
      return {
        id: `cus_mock_${Date.now()}`,
        name,
        email,
      }
    },
  },
  subscriptions: {
    create: async ({ customer, items }: { customer: string; items: any[] }) => {
      return {
        id: `sub_mock_${Date.now()}`,
        customer,
        items: {
          data: items.map((item) => ({
            price: {
              id: item.price,
              lookup_key:
                mockStripeProducts.find((p) => p.default_price.id === item.price)?.name.toLowerCase() || "unknown",
            },
          })),
        },
        status: "active",
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
      }
    },
  },
  products: {
    list: async () => {
      return {
        data: mockStripeProducts,
      }
    },
  },
  checkout: {
    sessions: {
      create: async ({ customer, line_items, success_url, cancel_url, metadata }: any) => {
        // In a real implementation, this would create a Stripe checkout session
        // For the sample project, we'll just return a mock URL
        const sessionId = `cs_mock_${Date.now()}`
        return {
          id: sessionId,
          url: `${success_url}?session_id=${sessionId}`,
        }
      },
    },
  },
  webhooks: {
    constructEvent: (body: string, signature: string, secret: string) => {
      // In a real implementation, this would verify the webhook signature
      // For the sample project, we'll just return a mock event
      return {
        type: "customer.subscription.created",
        data: {
          object: {
            id: `sub_mock_${Date.now()}`,
            status: "active",
            items: {
              data: [
                {
                  price: {
                    lookup_key: "pro",
                  },
                },
              ],
            },
            current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
          },
        },
      }
    },
  },
}

