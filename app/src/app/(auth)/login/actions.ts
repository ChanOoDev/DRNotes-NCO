"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { loginSchema, type LoginInput } from "@/lib/validators/auth"

interface LoginResult {
  error?: string
}

export async function login(values: LoginInput): Promise<LoginResult> {
  // Validate input with Zod
  const validatedFields = loginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid input. Please check your email and password." }
  }

  const { email, password } = validatedFields.data

  const supabase = await createClient()

  // Attempt to sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Human-friendly error messages (never raw Supabase codes)
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Wrong email or password. Please try again." }
    }
    return { error: "Unable to sign in. Please try again later." }
  }

  // Check if user is active
  if (data.user) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("is_active")
      .eq("id", data.user.id)
      .single()

    if (userError || !userData) {
      // Sign out if we can't find the user profile
      await supabase.auth.signOut()
      return { error: "Account not found. Please contact administration." }
    }

    if (!userData.is_active) {
      // Sign out inactive users
      await supabase.auth.signOut()
      return {
        error:
          "This account has been deactivated. Please contact administration.",
      }
    }
  }

  // Fetch user roles for redirect
  const { data: roles } = await supabase
    .from("user_roles")
    .select("roles(name)")
    .eq("user_id", data.user.id)

  // Determine redirect path based on primary role
  const primaryRole = (roles?.[0] as { roles?: { name?: string } })?.roles
    ?.name || "admin"
  const redirectMap: Record<string, string> = {
    admin: "/admin",
    doctor: "/doctor",
    nurse: "/nurse",
    receptionist: "/reception",
    patient: "/patient",
  }

  revalidatePath("/", "layout")
  redirect(redirectMap[primaryRole] || "/admin")
}
