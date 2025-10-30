"use client"

import { useAuth } from "@/lib/context"
import { useRouter } from "next/navigation"

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="bg-slate-800/50 backdrop-blur border-b border-slate-700 fixed top-0 right-0 left-64 z-10">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-100">
          Welcome back, <span className="text-emerald-400">{user?.name}</span>
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-600/20 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg hover:bg-red-600/30 transition font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
