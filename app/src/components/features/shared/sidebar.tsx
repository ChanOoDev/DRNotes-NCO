"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, LayoutDashboard, Users, ChevronRight, X } from "lucide-react"

interface SidebarProps {
  roleName: string
  dashboardUrl: string
}

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  roles?: string[]
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "User Management",
    href: "users",
    icon: <Users className="h-5 w-5" />,
    roles: ["admin"],
  },
]

const roleLabels: Record<string, string> = {
  admin: "Administrator",
  doctor: "Doctor",
  nurse: "Nurse",
  receptionist: "Receptionist",
  patient: "Patient",
}

function SidebarContent({
  roleName,
  dashboardUrl,
  pathname,
  onItemClick,
  showHeader = true,
}: {
  roleName: string
  dashboardUrl: string
  pathname: string
  onItemClick?: () => void
  showHeader?: boolean
}) {
  const filteredNav = navItems.filter(
    (item) => !item.roles || item.roles.includes(roleName)
  )

  return (
    <>
      {/* Logo & Brand */}
      {showHeader && (
        <Link
          href={dashboardUrl}
          onClick={onItemClick}
          className="h-16 px-5 flex items-center gap-3 border-b border-sidebar-border hover:bg-sidebar-accent/30 transition-colors"
        >
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-sm shrink-0">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col min-w-0 sidebar-label">
            <span className="text-[15px] font-bold text-sidebar-foreground tracking-tight leading-none truncate">
              Dr.Note
            </span>
            <span className="text-[10px] text-sidebar-foreground/40 font-medium mt-0.5 truncate">
              Clinical Platform
            </span>
          </div>
        </Link>
      )}

      {/* Section Label */}
      <div className="px-5 pt-5 pb-2 nav-label">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/30">
          Navigation
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {filteredNav.map((item) => {
          const href = item.href
            ? `${dashboardUrl}/${item.href}`
            : dashboardUrl
          const isActive =
            item.href === ""
              ? pathname === dashboardUrl
              : pathname.startsWith(href)

          return (
            <Link
              key={item.href || "dashboard"}
              href={href}
              onClick={onItemClick}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary shadow-sm"
                  : "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/40"
              }`}
            >
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors shrink-0 ${
                  isActive
                    ? "bg-sidebar-primary/10 text-sidebar-primary"
                    : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/60"
                }`}
              >
                {item.icon}
              </div>
              <span className="flex-1 sidebar-label truncate">{item.label}</span>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-sidebar-primary/40 sidebar-label" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="h-7 w-7 rounded-lg bg-sidebar-accent flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-sidebar-foreground/50">
              {roleName?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0 sidebar-label">
            <p className="text-xs font-medium text-sidebar-foreground/70 truncate">
              {roleLabels[roleName] || roleName}
            </p>
            <p className="text-[10px] text-sidebar-foreground/30">v0.1.0</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Sidebar({ roleName, dashboardUrl }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const prevPathname = useRef(pathname)

  // Close mobile sidebar on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setMobileOpen(false)
      prevPathname.current = pathname
    }
  }, [pathname])

  // Close on escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false)
    }
    if (mobileOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-200 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-sm shrink-0">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[15px] font-bold text-sidebar-foreground tracking-tight leading-none truncate">
                Dr.Note
              </span>
              <span className="text-[10px] text-sidebar-foreground/40 font-medium mt-0.5 truncate">
                Clinical Platform
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-sidebar-foreground/50 hover:bg-sidebar-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <SidebarContent
          roleName={roleName}
          dashboardUrl={dashboardUrl}
          pathname={pathname}
          onItemClick={() => setMobileOpen(false)}
          showHeader={false}
        />
      </aside>

      {/* Tablet collapsed sidebar (icons only) */}
      <aside className="hidden md:flex lg:hidden w-16 shrink-0 bg-sidebar border-r border-sidebar-border flex-col h-screen sticky top-0 items-center py-4 gap-1">
        <Link href={dashboardUrl} className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-sm mb-4">
          <Activity className="h-5 w-5 text-primary-foreground" />
        </Link>
        <nav className="flex-1 flex flex-col items-center gap-1 w-full px-2">
          {navItems
            .filter((item) => !item.roles || item.roles.includes(roleName))
            .map((item) => {
              const href = item.href
                ? `${dashboardUrl}/${item.href}`
                : dashboardUrl
              const isActive =
                item.href === ""
                  ? pathname === dashboardUrl
                  : pathname.startsWith(href)
              return (
                <Link
                  key={item.href || "dashboard"}
                  href={href}
                  title={item.label}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent/40"
                  }`}
                >
                  {item.icon}
                </Link>
              )
            })}
        </nav>
      </aside>

      {/* Desktop full sidebar */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-sidebar border-r border-sidebar-border flex-col h-screen sticky top-0">
        <SidebarContent
          roleName={roleName}
          dashboardUrl={dashboardUrl}
          pathname={pathname}
        />
      </aside>

      {/* Mobile hamburger button (rendered in header area) */}
      <MobileMenuButton onClick={() => setMobileOpen(true)} />
    </>
  )
}

function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-3 left-3 z-30 h-10 w-10 rounded-lg bg-background border border-border shadow-sm flex items-center justify-center text-foreground md:hidden"
      aria-label="Open menu"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  )
}
