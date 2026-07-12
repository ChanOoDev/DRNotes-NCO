import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "./header"
import Sidebar from "@/components/features/shared/sidebar"

const roleDashboard: Record<string, string> = {
  admin: "/admin",
  doctor: "/doctor",
  nurse: "/nurse",
  receptionist: "/reception",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch user profile and role
  const { data: profile } = await supabase
    .from("users")
    .select("name, email")
    .eq("id", user.id)
    .single()

  const { data: roles } = await supabase
    .from("user_roles")
    .select("roles(name)")
    .eq("user_id", user.id)
    .limit(1)

  const roleName =
    (roles?.[0] as unknown as { roles: { name: string } | null })?.roles?.name ||
    "unknown"

  // Double-check role access (defense in depth — middleware also guards)
  const allowedPrefix = roleDashboard[roleName]
  if (!allowedPrefix) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar roleName={roleName} dashboardUrl={allowedPrefix} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          userName={profile?.name || user.email || ""}
          roleName={roleName}
          dashboardUrl={allowedPrefix}
        />
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-6 md:py-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
