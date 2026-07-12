"use client"

import { LogOut, Bell, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { logout } from "../(auth)/login/actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  userName: string
  roleName: string
  dashboardUrl: string
}

const roleColors: Record<string, string> = {
  admin: "bg-red-500",
  doctor: "bg-blue-500",
  nurse: "bg-green-500",
  receptionist: "bg-purple-500",
  patient: "bg-muted-foreground",
}

const roleInitials: Record<string, string> = {
  admin: "AD",
  doctor: "DR",
  nurse: "NU",
  receptionist: "RE",
  patient: "PA",
}

const roleLabels: Record<string, string> = {
  admin: "Administrator",
  doctor: "Doctor",
  nurse: "Nurse",
  receptionist: "Receptionist",
  patient: "Patient",
}

export default function DashboardHeader({
  userName,
  roleName,
  dashboardUrl,
}: DashboardHeaderProps) {
  const pathname = usePathname()

  const pageName =
    pathname === dashboardUrl
      ? "Dashboard"
      : pathname
          .split("/")
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) || "Dashboard"

  return (
    <header className="h-14 bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Page title (mobile) / Breadcrumb (desktop) */}
      <div className="flex items-center gap-3 pl-12 md:pl-0">
        {/* Mobile: simple page title */}
        <h1 className="text-base font-semibold text-foreground md:hidden">
          {pageName}
        </h1>
        {/* Desktop: breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground/70">
            {roleLabels[roleName] || roleName}
          </span>
          <span className="text-border">/</span>
          <span className="font-medium text-foreground/90">{pageName}</span>
        </div>
      </div>

      {/* Right: Utilities + User */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <button
          className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* Help - hidden on mobile */}
        <button
          className="h-9 w-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors hidden md:flex"
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Divider - hidden on mobile */}
        <div className="w-px h-6 bg-border mx-2 hidden md:block" />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 px-1.5 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer outline-none">
            <div
              className={`h-8 w-8 rounded-full ${
                roleColors[roleName] || "bg-muted-foreground"
              } flex items-center justify-center ring-2 ring-background`}
            >
              <span className="text-xs font-semibold text-white">
                {roleInitials[roleName] || roleName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground leading-none">
                {userName}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1 capitalize">
                {roleLabels[roleName] || roleName}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {roleLabels[roleName] || roleName}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-muted-foreground cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => logout()}
              className="text-destructive cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
