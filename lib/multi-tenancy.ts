import { cookies } from "next/headers"
import { executeQuery } from "./db"

export async function getCurrentTenant() {
  // In a real app, you would get the tenant from the hostname
  // For development, we'll use a cookie
  const cookieStore = cookies()
  const tenantSlug = cookieStore.get("tenant")?.value

  if (!tenantSlug) {
    return null
  }

  try {
    // Get the organization from the database
    const [organization] = await executeQuery("SELECT * FROM organizations WHERE slug = $1", [tenantSlug])

    return organization
  } catch (error) {
    console.error("Error getting current tenant:", error)
    return null
  }
}

export async function getTenantBySlug(slug: string) {
  try {
    const [organization] = await executeQuery("SELECT * FROM organizations WHERE slug = $1", [slug])

    return organization
  } catch (error) {
    console.error("Error getting tenant by slug:", error)
    return null
  }
}

export async function getUserOrganizations(userId: number) {
  try {
    const organizations = await executeQuery(
      `SELECT o.* 
       FROM organizations o
       JOIN organization_members om ON o.id = om.organization_id
       WHERE om.user_id = $1`,
      [userId],
    )

    return organizations
  } catch (error) {
    console.error("Error getting user organizations:", error)
    return []
  }
}

