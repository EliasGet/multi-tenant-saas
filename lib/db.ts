// Define schema types without using drizzle-orm
export type User = {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
}

export type Tenant = {
  id: number
  name: string
  subdomain: string
  customDomain: string | null
  ownerId: number
  plan: string
  createdAt: Date
  updatedAt: Date
}

export type TenantUser = {
  id: number
  tenantId: number
  userId: number
  role: string
  createdAt: Date
}

export type Subscription = {
  id: number
  tenantId: number
  stripeCustomerId: string
  stripeSubscriptionId: string
  plan: string
  status: string
  currentPeriodEnd: Date
  createdAt: Date
  updatedAt: Date
}

// Mock database operations
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    // Password: password123 (hashed with bcryptjs)
    password: "$2a$10$zPiTFbcqge/WpMUPB.Dq5eJCCMoiPBn.OW3ZkBBB5.eTnKGcdXP7C",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    // Password: password123 (hashed with bcryptjs)
    password: "$2a$10$zPiTFbcqge/WpMUPB.Dq5eJCCMoiPBn.OW3ZkBBB5.eTnKGcdXP7C",
    createdAt: new Date("2023-01-15"),
  },
]

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

const mockSubscriptions: Subscription[] = [
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

export const users = {
  findByEmail: mockDb.users.findByEmail,
  findById: mockDb.users.findById,
  create: mockDb.users.create,
}

export const tenants = {
  findById: mockDb.tenants.findById,
  findBySubdomain: mockDb.tenants.findBySubdomain,
  findByOwnerId: mockDb.tenants.findByOwnerId,
  create: mockDb.tenants.create,
  update: mockDb.tenants.update,
}

export const subscriptions = {
  findByTenantId: mockDb.subscriptions.findByTenantId,
  create: mockDb.subscriptions.create,
  update: mockDb.subscriptions.update,
}

export const db = mockDb

