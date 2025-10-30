"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/income", label: "Income", icon: "💰" },
    { href: "/expenses", label: "Expenses", icon: "💸" },
    { href: "/investments", label: "Investments", icon: "📈" },
    { href: "/goals", label: "Goals", icon: "🎯" },
    { href: "/reports", label: "Reports", icon: "📋" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white h-screen fixed left-0 top-0 overflow-y-auto border-r border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BP</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Budget Planner
          </h1>
        </div>
      </div>

      <nav className="mt-8 space-y-1 px-3">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/50 text-emerald-300"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
