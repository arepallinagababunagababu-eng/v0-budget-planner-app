"use client"

import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import InvestmentForm from "@/components/InvestmentForm"
import InvestmentList from "@/components/InvestmentList"
import { useState } from "react"

export default function InvestmentsPage() {
  const [refresh, setRefresh] = useState(0)

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="mt-20 p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Investment Management</h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <InvestmentForm onSuccess={() => setRefresh(refresh + 1)} />
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Your Investments</h2>
                  <InvestmentList refresh={refresh} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
