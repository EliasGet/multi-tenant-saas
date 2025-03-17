import { executeQuery } from "./db"
import { compare, hash } from "bcrypt"

export async function getUserByEmail(email: string) {
  try {
    const [user] = await executeQuery("SELECT * FROM users WHERE email = $1", [email])

    return user
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

export async function createUser(name: string, email: string, password: string) {
  try {
    const hashedPassword = await hash(password, 10)

    const [user] = await executeQuery(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
    )

    return user
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function verifyPassword(user: any, password: string) {
  try {
    return await compare(password, user.password_hash)
  } catch (error) {
    console.error("Error verifying password:", error)
    return false
  }
}

export async function getUserRole(userId: number, organizationId: number) {
  try {
    const [membership] = await executeQuery(
      "SELECT role FROM organization_members WHERE user_id = $1 AND organization_id = $2",
      [userId, organizationId],
    )

    return membership?.role || null
  } catch (error) {
    console.error("Error getting user role:", error)
    return null
  }
}

