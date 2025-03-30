// Mock database for development and deployment

import type { User, Tenant, TenantUser, Subscription } from "./db"

// Users
export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    // Password: password123
    password: "$2b$10$8OxDEuDS1V0YDGmRgKWL5e6Zz8.fwu1QJg5pBFJOUJURRzGU/Ga4G",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    // Password: password123
    password: "$2b$10$8OxDEuDS1V0YDGmRgKWL5e6Zz8.fwu1QJg5pBFJOUJURRzGU/Ga4G",
    createdAt: new Date("2023-01-15"),
  },
]

// Tenants
export const mockTenants: Tenant[] = [
  {
    id: 1,
    name: "Acme Inc",
    subdomain: "acme",
    customDomain: null,
    ownerId: 1,
    plan: "pro",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: 2,
    name: "Globex Corporation",
    subdomain: "globex",
    customDomain: null,
    ownerId: 2,
    plan: "enterprise",
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-01-20"),
  },
  {
    id: 3,
    name: "Initech",
    subdomain: "initech",
    customDomain: null,
    ownerId: 1,
    plan: "starter",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
]

// Tenant Users
export const mockTenantUsers: TenantUser[] = [
  {
    id: 1,
    tenantId: 1,
    userId: 1,
    role: "owner",
    createdAt: new Date("2023-01-05"),
  },
  {
    id: 2,
    tenantId: 2,
    userId: 2,
    role: "owner",
    createdAt: new Date("2023-01-20"),
  },
  {
    id: 3,
    tenantId: 3,
    userId: 1,
    role: "owner",
    createdAt: new Date("2023-02-10"),
  },
]

// Subscriptions
export const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    tenantId: 1,
    stripeCustomerId: "cus_mock1",
    stripeSubscriptionId: "sub_mock1",
    plan: "pro",
    status: "active",
    currentPeriodEnd: new Date("2023-12-31"),
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: 2,
    tenantId: 2,
    stripeCustomerId: "cus_mock2",
    stripeSubscriptionId: "sub_mock2",
    plan: "enterprise",
    status: "active",
    currentPeriodEnd: new Date("2023-12-31"),
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-01-20"),
  },
  {
    id: 3,
    tenantId: 3,
    stripeCustomerId: "cus_mock3",
    stripeSubscriptionId: "sub_mock3",
    plan: "starter",
    status: "active",
    currentPeriodEnd: new Date("2023-12-31"),
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
]

// Mock database operations
export const mockDb = {
  users: {
    findByEmail: (email: string) => {
      return mockUsers.find((user) => user.email === email) || null
    },
    findById: (id: number) => {
      return mockUsers.find((user) => user.id === id) || null
    },
    create: (data: Partial<User>) => {
      const newUser = {
        id: mockUsers.length + 1,
        name: data.name || "",
        email: data.email || "",
        password: data.password || "",
        createdAt: new Date(),
      }
      mockUsers.push(newUser)
      return newUser
    },
  },
  tenants: {
    findById: (id: number) => {
      return mockTenants.find((tenant) => tenant.id === id) || null
    },
    findBySubdomain: (subdomain: string) => {
      return mockTenants.find((tenant) => tenant.subdomain === subdomain) || null
    },
    findByOwnerId: (ownerId: number) => {
      return mockTenants.filter((tenant) => tenant.ownerId === ownerId)
    },
    create: (data: Partial<Tenant>) => {
      const newTenant = {
        id: mockTenants.length + 1,
        name: data.name || "",
        subdomain: data.subdomain || "",
        customDomain: data.customDomain || null,
        ownerId: data.ownerId || 0,
        plan: data.plan || "starter",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockTenants.push(newTenant)
      return newTenant
    },
    update: (id: number, data: Partial<Tenant>) => {
      const index = mockTenants.findIndex((tenant) => tenant.id === id)
      if (index !== -1) {
        mockTenants[index] = {
          ...mockTenants[index],
          ...data,
          updatedAt: new Date(),
        }
        return mockTenants[index]
      }
      return null
    },
  },
  subscriptions: {
    findByTenantId: (tenantId: number) => {
      return mockSubscriptions.find((sub) => sub.tenantId === tenantId) || null
    },
    create: (data: Partial<Subscription>) => {
      const newSubscription = {
        id: mockSubscriptions.length + 1,
        tenantId: data.tenantId || 0,
        stripeCustomerId: data.stripeCustomerId || "",
        stripeSubscriptionId: data.stripeSubscriptionId || "",
        plan: data.plan || "starter",
        status: data.status || "incomplete",
        currentPeriodEnd: data.currentPeriodEnd || new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockSubscriptions.push(newSubscription)
      return newSubscription
    },
    update: (id: number, data: Partial<Subscription>) => {
      const index = mockSubscriptions.findIndex((sub) => sub.id === id)
      if (index !== -1) {
        mockSubscriptions[index] = {
          ...mockSubscriptions[index],
          ...data,
          updatedAt: new Date(),
        }
        return mockSubscriptions[index]
      }
      return null
    },
  },
}

