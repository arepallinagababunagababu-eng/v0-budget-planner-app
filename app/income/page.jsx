"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import IncomeForm from "@/components/IncomeForm"
import IncomeList from "@/components/IncomeList"
import { useState } from "react"

export default function IncomePage() {
  const [refresh, setRefresh] = useState(0)

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold text-white mb-8">Income Management</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <IncomeForm onSuccess={() => setRefresh(refresh + 1)} />
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold text-white mb-4">Income Records</h2>
                  <IncomeList refresh={refresh} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
