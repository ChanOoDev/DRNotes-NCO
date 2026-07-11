"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { logout } from "../(auth)/login/actions"

interface DashboardHeaderProps {
  userName: string
  roleName: string
  dashboardUrl: string
}

export default function DashboardHeader({
  userName,
  roleName,
  dashboardUrl,
}: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={dashboardUrl} className="text-xl font-semibold hover:text-primary">
            Dr.Note
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            {roleName === "admin" && (
              <Link href="/admin/users" className="text-gray-600 hover:text-primary">
                User Management
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{userName}</span>
          <Badge>{roleName}</Badge>
          <Button variant="outline" size="sm" onClick={() => logout()}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
